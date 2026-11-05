# Snow Screen — Design System

Design reference for the Snow Screen pages in this folder. Extracted from the
original site <https://snowscreen.pages.dev/> (`css/style.css`, `js/snow.js`)
and ported 1:1 into Astro.

> These pages intentionally **do not** use the hub's Tailwind theme
> (`src/styles/global.css`) or `BaseLayout`. Everything they need lives here:
>
> | File | Role |
> |---|---|
> | `_SnowLayout.astro` | HTML shell: `<head>`, font, snow canvas, footer |
> | `_snow.css` | The whole stylesheet (tokens + components) |
> | `_snow.ts` | Background snowfall animation |
> | `index.astro` | Landing page → `/snow-screen/` |
> | `privacy.astro` | Privacy policy → `/snow-screen/privacy/` |
>
> Files prefixed with `_` are not routes — that is why this doc is `_design.md`:
> a plain `design.md` inside `src/pages/` would be published as `/snow-screen/design/`.

---

## 1. Personality

Night-sky winter, calm and premium. Deep navy background, frosted cards, icy
cyan glow. Content is centered and generous; emoji act as the icon set.

## 2. Color tokens

Defined on `:root` in `_snow.css`.

| Token | Value | Use |
|---|---|---|
| `--bg-dark` | `#0B132B` | Page background (also `theme-color`) |
| `--bg-card` | `#1C2541` | Feature cards, privacy card |
| `--bg-card-hover` | `#232F4E` | Feature card hover |
| `--accent-cyan` | `#00BCD4` | Brand cyan, tints & borders |
| `--accent-ice` | `#80D8FF` | Highlight text, links, badges, h2 in policy |
| `--text-light` | `#E0F7FA` | Primary text |
| `--text-muted` | `#94A3B8` | Body copy, subtitles, nav links |
| — | `#FFFFFF` | Headings (brand, card titles, pro title) |
| — | `#0F172A` | Text on cyan buttons |
| — | `#00E5FF` | Gradient end / glow color |

### Gradients & translucent fills

| Name | Value |
|---|---|
| Primary button | `linear-gradient(135deg, #00BCD4 0%, #00E5FF 100%)` |
| Hero title text | `linear-gradient(180deg, #FFFFFF 0%, #80D8FF 100%)` clipped to text |
| Pro banner | `linear-gradient(135deg, rgba(0,188,212,.15) 0%, rgba(30,41,59,.8) 100%)` |
| Cyan tint (badge / icon bg / pill) | `rgba(0,188,212, .10 – .15)` |
| Hairline border | `rgba(255,255,255, .05 – .15)` |
| Accent border | `rgba(0,188,212,.3)` / `rgba(0,229,255,.3)` |

## 3. Typography

- **Font:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) 400/500/600/700/800
  (Google Fonts), fallback `-apple-system, BlinkMacSystemFont, sans-serif`.
- **Body line-height:** 1.6

| Element | Size | Weight | Notes |
|---|---|---|---|
| Hero title `.hero-title` | 56px (40px ≤768px) | 800 | lh 1.15, ls −1.5px, gradient text |
| Section title `.section-title` | 36px | 800 | centered, ls −0.5px |
| Pro title `.pro-title` | 32px | 800 | white |
| Policy h1 | 32px | 800 | white, ls −0.5px |
| Brand `.brand` | 24px | 800 | white, ls −0.5px |
| Feature title | 22px | 700 | white |
| Policy h2 | 20px | 700 | `--accent-ice` |
| Hero subtitle | 20px (17px ≤768px) | 500 | muted |
| Section subtitle | 18px | 400 | muted, centered |
| Primary button | 18px | 800 | |
| Secondary button | 17px | 700 | |
| Shape name | 16px | 700 | |
| Body / feature desc / policy text | 15px | 400 | muted, lh 1.6–1.7 |
| Nav link | 15px | 600 | muted → ice on hover |
| Badge, header button | 14px | 600 / 700 | |
| Shape desc | 13px | 400 | muted |

## 4. Layout & spacing

- **Container:** `max-width: 1100px`, side padding `24px`, centered.
- **Nav:** flex, space-between, `32px 0` padding. Links hidden ≤768px (only brand stays).
- **Hero:** centered, `max-width: 850px`, padding `80px 0 100px`.
- **Section rhythm:** `100px` bottom margin between major blocks; section subtitle `60px` below.
- **Features grid:** `repeat(auto-fit, minmax(320px, 1fr))`, gap `24px`.
- **Shapes grid:** `repeat(auto-fit, minmax(220px, 1fr))`, gap `20px`.
- **Radii:** `--radius-lg: 24px` (cards, panels) · `--radius-md: 16px` (buttons, shape items, icon tiles) · `12px` header button · `100px` pills.
- **Panel padding:** 48px desktop → `28px 20px` ≤768px (shapes, pro, privacy card).

## 5. Components

| Component | Class | Spec |
|---|---|---|
| Brand | `.brand` + `img.brand-icon` | App icon 36×36, r9, with `drop-shadow(0 0 8px rgba(0,188,212,.6))` + name |
| Header CTA | `.btn-header` | cyan gradient, `10px 20px`, r12; hover lift −2px + glow |
| Primary button | `.btn-primary` | cyan gradient, `16px 36px`, r16, glow `0 10px 30px rgba(0,229,255,.25)`; hover −3px, stronger glow |
| Secondary button | `.btn-secondary` | white 5% fill, 15% border, `16px 32px`, r16; hover 10% fill, −2px |
| Hero badge | `.hero-badge` | pill, cyan 12% fill, cyan 30% border, ice text |
| Feature card | `.feature-card` | `--bg-card`, 8% border, r24, p32; hover bg lighter, −4px, cyan border |
| Feature icon | `.feature-icon` | 56×56, r16, cyan 15% fill, emoji 28px |
| Shapes panel | `.shapes-section` | navy 50% fill, `backdrop-filter: blur(10px)`, r24 |
| Shape item | `.shape-item` | dark 60% fill, r16, p20, emoji 32px + name/desc |
| Pro banner | `.pro-banner` | diagonal cyan→slate gradient, cyan 30% border, centered |
| Pro pill | `.pro-item` | ice text, cyan 10% fill, `10px 20px`, pill, prefixed “✓” |
| Policy card | `.privacy-container` | `--bg-card`, r24, p48, `0 20px 40px rgba(0,0,0,.3)` shadow, max 850px |
| Back link | `.back-link` | ice, 700; hover slides −4px + underline |
| Footer | `footer` | top hairline, centered 14px muted, ice links |

## 6. Motion

- **Snowfall canvas** (`_snow.ts`): fixed full-viewport canvas under content
  (`z-index: 10`, content `z-index: 20`, `pointer-events: none`).
  60 flakes, radius 1–4px, speed 0.8–2.0px/frame, wind ±0.4 + `sin(y·0.01)·0.3` sway,
  fill `rgba(224,247,250, 0.3–1.0)`, glow `shadowBlur 6` `rgba(0,229,255,.8)`.
- **Hover:** lifts of 2–4px, `0.2–0.3s ease` transitions, cyan glow on CTAs.

## 7. Content structure

**Landing (`/snow-screen/`):** Nav → Hero (badge, gradient title, subtitle,
CTAs `#download`: Google Play [primary] · Add to Chrome [secondary] · Privacy [secondary])
→ Features (6 cards, `#features`) → Snowflake crystals (8 items, `#shapes`)
→ Pro banner (4 pills, CTA, `#pro`) → Footer.

**Privacy (`/snow-screen/privacy/`):** single centered card — brand, title,
“Last updated”, numbered h2 sections, back link → Footer.

| Store | URL |
|---|---|
| Google Play (Android app) | `https://play.google.com/store/apps/details?id=com.hoangbinhan.snowscreen` |
| Chrome Web Store (extension) | `https://chromewebstore.google.com/detail/snowscreen-%E2%80%94-snow-on-the/gocpcgpipopgcechclgjmcaibffopgko` |

## 8. Assets

| File | Size | Use |
|---|---|---|
| `public/icons/snowscreen.png` | 512×512, ~284 KB | Source icon · `apple-touch-icon` · `og:image` |
| `public/icons/snowscreen-128.png` | 128×128, ~4.5 KB | Brand icon, favicon, hub home card (generated from the source) |

Icon look: white rounded-stroke snowflake on a diagonal blue gradient square
(roughly `#2196F3` → `#1565C0`).

## 9. Differences from the original site

Kept visually identical, except the brand mark now uses the real app icon
instead of the ❄️ emoji, and the hero has an extra **Add to Chrome** button.
Other changes are small, non-visual or accessibility fixes:

1. Internal links use clean routes (`/snow-screen/`, `/snow-screen/privacy/`) instead of `index.html` / `privacy.html`.
2. Snowfall is skipped and hover lifts disabled when the OS asks for **reduced motion**.
3. Canvas renders at device pixel ratio (sharper flakes on high-DPI screens).
4. Added a visible keyboard **focus ring** (`--accent-ice` outline) on links.
5. Policy-body links use `--accent-ice` (the original fell back to browser-default blue).
6. Grids use `minmax(min(320px, 100%), 1fr)` so cards never overflow on very narrow phones.
7. Emoji used as decoration are `aria-hidden`; external links get `rel="noopener"`.
8. Added `theme-color`, canonical/OG meta, and the app icon as favicon / touch icon / OG image.
