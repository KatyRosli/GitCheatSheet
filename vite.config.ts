import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { seo } from './vite-plugins/seo.ts';

/** The public address of the live site, with no trailing slash. */
const SITE_URL = 'https://git-cheat-sheet-two.vercel.app';

export default defineConfig({
  plugins: [react(), tailwindcss(), seo({ siteUrl: SITE_URL })],
});
