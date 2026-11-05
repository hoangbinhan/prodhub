/**
 * Background snowfall — ported from https://snowscreen.pages.dev/js/snow.js.
 * Same look (60 glowing flakes, sine drift). Additions: skipped when the user
 * prefers reduced motion, and the canvas is sized for high-DPI screens.
 */
export function startSnow(canvasId: string, count = 60) {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize);

  class Flake {
    x = 0;
    y = 0;
    radius = 0;
    speed = 0;
    wind = 0;
    opacity = 0;

    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * -height;
      this.radius = Math.random() * 3 + 1;
      this.speed = Math.random() * 1.2 + 0.8;
      this.wind = Math.random() * 0.8 - 0.4;
      this.opacity = Math.random() * 0.7 + 0.3;
    }

    update() {
      this.y += this.speed;
      this.x += this.wind + Math.sin(this.y * 0.01) * 0.3;
      if (this.y > height) {
        this.reset();
        this.y = 0;
      }
    }

    draw(c: CanvasRenderingContext2D) {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      c.fillStyle = `rgba(224, 247, 250, ${this.opacity})`;
      c.shadowBlur = 6;
      c.shadowColor = 'rgba(0, 229, 255, 0.8)';
      c.fill();
    }
  }

  const flakes = Array.from({ length: count }, () => new Flake());

  const animate = () => {
    ctx.clearRect(0, 0, width, height);
    for (const flake of flakes) {
      flake.update();
      flake.draw(ctx);
    }
    requestAnimationFrame(animate);
  };
  animate();
}
