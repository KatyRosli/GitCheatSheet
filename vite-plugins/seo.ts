/**
 * Build-time SEO.
 *
 * - Fills every %SITE_URL% in index.html (link previews and structured data need absolute URLs).
 * - Emits robots.txt, sitemap.xml and llms.txt from the command data, so they never drift.
 *
 * The page content itself is prerendered by scripts/prerender.js.
 */
import type { Plugin } from 'vite';
import { CATEGORY_LABELS } from '../src/config/commandFilters.ts';
import { GIT_COMMANDS } from '../src/data/commands.ts';
import type { CommandCategory } from '../src/types/command.ts';

const CATEGORY_ORDER = Object.keys(CATEGORY_LABELS) as CommandCategory[];

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
    const lines = GIT_COMMANDS.filter((c) => c.category === category).map((c) => `- \`${c.command}\`: ${c.summary}`);
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

    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl),

    generateBundle() {
      // Only for the client build; the SSR build (dist-ssr/) is temporary.
      if (this.environment?.config.consumer === 'server') return;
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt(siteUrl) });
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml(siteUrl) });
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: llmsTxt(siteUrl) });
    },
  };
}
