/**
 * Build-time SEO for a client-rendered app.
 *
 * - Fills every %SITE_URL% in index.html (link previews and structured data need absolute URLs).
 * - Prerenders all commands as plain HTML inside #root, so search engines and AI agents that
 *   don't run JavaScript still see the full content. React replaces it on load.
 * - Emits robots.txt, sitemap.xml and llms.txt from the same command data, so they never drift.
 */
import type { Plugin } from 'vite';
import { CATEGORY_LABELS } from '../src/config/commandFilters.ts';
import { GIT_COMMANDS } from '../src/data/commands.ts';
import type { CommandCategory, GitCommand } from '../src/types/command.ts';

const PRERENDER_MARKER = '<!--prerendered-commands-->';

const escapeHtml = (text: string): string =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const CATEGORY_ORDER = Object.keys(CATEGORY_LABELS) as CommandCategory[];

const commandsIn = (category: CommandCategory): GitCommand[] =>
  GIT_COMMANDS.filter((command) => command.category === category);

function prerenderCommands(): string {
  return CATEGORY_ORDER.map((category) => {
    const items = commandsIn(category)
      .map(
        (command) => `
        <article id="command-${command.id}">
          <h3>${escapeHtml(command.command)}: ${escapeHtml(command.title)}</h3>
          <p>${escapeHtml(command.summary)}</p>
          <ul>${command.snippets
            .map((s) => `<li><code>${escapeHtml(s.command)}</code> ${escapeHtml(s.description)}</li>`)
            .join('')}</ul>${command.caution ? `\n          <p><strong>Caution:</strong> ${escapeHtml(command.caution.details)}</p>` : ''}
        </article>`
      )
      .join('');
    return `
      <section>
        <h2>${escapeHtml(CATEGORY_LABELS[category])}</h2>${items}
      </section>`;
  }).join('');
}

function robotsTxt(siteUrl: string): string {
  return `# Allow all search engines and AI crawlers to index the cheat sheet.
User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
}

function sitemapXml(siteUrl: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
}

function llmsTxt(siteUrl: string): string {
  const sections = CATEGORY_ORDER.map((category) => {
    const lines = commandsIn(category).map((c) => `- \`${c.command}\`: ${c.summary}`);
    return `## ${CATEGORY_LABELS[category]}\n\n${lines.join('\n')}`;
  });
  return `# Git Cheat Sheet

> Dedicated to making developers' lives easier: all Git commands in one place.

${siteUrl}/

A free, searchable reference of everyday Git commands with copy-ready examples, important flags, and warnings for commands that can lose work. By Katy Rosli (https://github.com/katyrosli).

${sections.join('\n\n')}
`;
}

export function seo({ siteUrl }: { siteUrl: string }): Plugin {
  return {
    name: 'seo',

    transformIndexHtml(html) {
      if (!html.includes(PRERENDER_MARKER)) {
        this.warn?.(`index.html is missing ${PRERENDER_MARKER}; commands were not prerendered.`);
      }
      return html.replaceAll('%SITE_URL%', siteUrl).replace(PRERENDER_MARKER, prerenderCommands());
    },

    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt(siteUrl) });
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml(siteUrl) });
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: llmsTxt(siteUrl) });
    },
  };
}
