// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://homerunn.com',

  vite: {
    plugins: [tailwindcss()]
  },

  // case-study is noindex on purpose (client protection), so keep it out of the sitemap too
  integrations: [sitemap({ filter: (page) => !page.includes('/case-study') })]
});