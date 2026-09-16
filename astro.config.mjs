import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical origin. Change here only; every canonical, Open Graph and
// JSON-LD URL derives from it.
export default defineConfig({
  site: 'https://thegubbi.com',
  output: 'static',
  trailingSlash: 'never',
  build: { assets: '_gubbi', format: 'file' },
  integrations: [sitemap({ filter: page => !/\/(checkout|404)$/.test(page) })],
});
