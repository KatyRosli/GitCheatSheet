import { CATEGORY_LABELS, COMMAND_FILTERS } from './config/commandFilters';
import { GIT_COMMANDS } from './data/commands';
import { useBookmarks } from './hooks/useBookmarks';
import { useCommandFilter } from './hooks/useCommandFilter';
import { useTheme } from './hooks/useTheme';
import { scrollToCommand } from './lib/scrollToCommand';
import { CommandList } from './components/commands/CommandList';
import { AmbientBackground } from './components/layout/AmbientBackground';
import { SiteFooter } from './components/layout/SiteFooter';
import { SiteHeader } from './components/layout/SiteHeader';
import { StickyToolbar } from './components/layout/StickyToolbar';
import { FilterBar } from './components/search/FilterBar';
import { NoResults } from './components/search/NoResults';
import { SearchBar } from './components/search/SearchBar';
import { ThemeToggle } from './components/ui/ThemeToggle';

const CATEGORY_NAMES = Object.values(CATEGORY_LABELS);

export default function App() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { bookmarkedIds, toggleBookmark } = useBookmarks();
  const { query, setQuery, activeFilterId, setActiveFilterId, results, countsByFilter, reset } = useCommandFilter(
    GIT_COMMANDS,
    bookmarkedIds
  );

  // Enter in the search box: jump to the best match.
  const jumpToBestMatch = () => {
    if (results[0]) scrollToCommand(results[0].id, { highlight: true });
  };

  // "See also" links: show everything, then scroll to the related card.
  const showRelated = (commandId: string) => {
    reset();
    scrollToCommand(commandId, { highlight: true });
  };

  return (
    <div className="min-h-screen overflow-x-clip flex flex-col bg-[var(--bg)] text-[var(--ink)] selection:bg-[var(--gold)]/30 selection:text-[#FEDEB2] transition-colors duration-250 relative">
      <AmbientBackground />

      <main className="relative z-10 flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-14 py-8 space-y-8">
        <SiteHeader commandCount={GIT_COMMANDS.length} categoryNames={CATEGORY_NAMES} />

        <StickyToolbar>
          <SearchBar
            query={query}
            onQueryChange={setQuery}
            onSubmit={jumpToBestMatch}
            resultCount={results.length}
            totalCount={GIT_COMMANDS.length}
          />
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <FilterBar
              filters={COMMAND_FILTERS}
              activeId={activeFilterId}
              counts={countsByFilter}
              onSelect={setActiveFilterId}
            />
            <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
          </div>
        </StickyToolbar>

        {results.length === 0 ? (
          <NoResults query={query} onReset={reset} />
        ) : (
          <CommandList
            commands={results}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={toggleBookmark}
            onSelectRelated={showRelated}
          />
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
