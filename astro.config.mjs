// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Production domain: canonical URLs, OG images, JSON-LD and /sitemap.xml are built from it.
  site: 'https://prodhub.io.vn',
  vite: {
    plugins: [tailwindcss()],
  },
});
