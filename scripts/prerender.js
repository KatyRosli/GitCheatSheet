/**
 * Post-build step: injects the server-rendered app into dist/index.html.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server entry → dist-ssr/).
 * See the "build" script in package.json.
 */
import { readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const htmlPath = `${root}dist/index.html`;
const ssrDir = `${root}dist-ssr`;
const MARKER = '<!--app-html-->';

const { render } = await import(`${ssrDir}/entry-server.js`);
const html = await readFile(htmlPath, 'utf8');

if (!html.includes(MARKER)) {
  throw new Error(`prerender: ${MARKER} not found in dist/index.html`);
}

await writeFile(htmlPath, html.replace(MARKER, render()));
await rm(ssrDir, { recursive: true, force: true });

console.log('prerender: dist/index.html now contains the rendered app');
