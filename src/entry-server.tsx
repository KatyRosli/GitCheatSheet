import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

/**
 * Renders the app to an HTML string at build time (see scripts/prerender.js).
 * Visitors get the fully styled page before any JavaScript runs, and crawlers
 * that don't run JavaScript still see every command.
 */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
