// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: set to your production domain (used for canonical URLs / sitemap).
  site: 'https://example.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
