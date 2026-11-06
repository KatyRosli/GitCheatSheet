# Git Cheat Sheet

A searchable Git command reference with copy-ready snippets, flags and cautions, grouped into **Actions**, **Inspect**, **Utilities** and **Undo & Recovery**.

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

## Common changes

**Add a command:** add an entry to `GIT_COMMANDS` in `src/data/commands.ts`. Give it the next `number`, and make sure every id in `seeAlso` exists.

**Add or rename a category:** update `CommandCategory` in `src/types/command.ts` and `CATEGORY_LABELS` in `src/config/commandFilters.ts`. Card labels, filter buttons and header counts update from there.

**Add a filter button:** add an entry to `COMMAND_FILTERS` in `src/config/commandFilters.ts`. No component changes are needed.

**Change colours:** edit the CSS variables at the top of `src/styles/globals.css`. Dark is the default; `html.light` overrides it.
# GitCheatSheet
