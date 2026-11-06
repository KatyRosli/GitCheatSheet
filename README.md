# Git Cheat Sheet

A searchable Git command reference with copy-ready snippets, flags and cautions, grouped into **Actions**, **Inspect**, **Utilities** and **Undo & Recovery**. Visit website here: https://git-cheat-sheet-two.vercel.app/ .

Built with React 19, TypeScript (strict), Vite and Tailwind CSS v4.

## Getting started

Requires Node.js 20 or later.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | What it does                         |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the dev server                 |
| `npm run build`     | Type-check, then build to `dist/`    |
| `npm run preview`   | Serve the production build locally   |
| `npm run typecheck` | Type-check only                      |
| `npm run clean`     | Delete `dist/`                       |

## Project structure

```
public/                     Static files served as-is at the site root
├── favicon.png             Browser tab icon
└── og-image.png            Link-preview image, 1200×630

vite-plugins/seo.ts         Build-time SEO: prerenders commands into index.html and
                            generates robots.txt, sitemap.xml and llms.txt from the data

src/
├── App.tsx                 Composes the page; holds no business logic
├── main.tsx                Entry point
├── types/command.ts        Domain types (GitCommand, CommandSnippet, …)
├── data/commands.ts        The command content
├── config/commandFilters.ts  Category labels + filter buttons (config-driven)
├── lib/                    Pure helpers, no React
│   ├── commandSearch.ts    Search matching + relevance ranking
│   └── scrollToCommand.ts  Scroll to / highlight a card
├── hooks/                  State
│   ├── useCommandFilter.ts Search text + active filter → results and counts
│   ├── useBookmarks.ts     Bookmarks, persisted to localStorage
│   └── useTheme.ts         Dark/light theme, persisted to localStorage
├── components/
│   ├── commands/           CommandList → CommandCard → snippet, details, caution
│   ├── search/             SearchBar, FilterBar, NoResults
│   ├── layout/             SiteHeader, SiteFooter, StickyToolbar, AmbientBackground
│   ├── ornaments/          Decorative SVGs for the header frame
│   └── ui/                 Small shared controls (ThemeToggle)
├── styles/globals.css      Theme variables and global styles
└── assets/images/          Background images
```

Dependencies point one way: `components → hooks → lib → config / data → types`.

# GitCheatSheet
