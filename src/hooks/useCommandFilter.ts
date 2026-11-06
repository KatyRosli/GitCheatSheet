import { useMemo, useState } from 'react';
import { COMMAND_FILTERS, DEFAULT_FILTER_ID, type FilterId } from '../config/commandFilters';
import { searchCommands } from '../lib/commandSearch';
import type { GitCommand } from '../types/command';

/**
 * Search text + the single active filter button, and the commands they select.
 * Typing a search switches the filter back to "All" so search always covers every command.
 */
export function useCommandFilter(commands: readonly GitCommand[], bookmarkedIds: ReadonlySet<string>) {
  const [query, setQueryState] = useState('');
  const [activeFilterId, setActiveFilterId] = useState<FilterId>(DEFAULT_FILTER_ID);

  const activeFilter = COMMAND_FILTERS.find((f) => f.id === activeFilterId) ?? COMMAND_FILTERS[0];

  const results = useMemo(() => {
    const inFilter = commands.filter((c) => activeFilter.matches(c, { bookmarkedIds }));
    return searchCommands(inFilter, query);
  }, [commands, activeFilter, bookmarkedIds, query]);

  const countsByFilter = useMemo(
    () =>
      Object.fromEntries(
        COMMAND_FILTERS.map((f) => [f.id, commands.filter((c) => f.matches(c, { bookmarkedIds })).length])
      ) as Record<FilterId, number>,
    [commands, bookmarkedIds]
  );

  const setQuery = (next: string) => {
    setQueryState(next);
    if (next.trim()) setActiveFilterId(DEFAULT_FILTER_ID);
  };

  const reset = () => {
    setQueryState('');
    setActiveFilterId(DEFAULT_FILTER_ID);
  };

  return { query, setQuery, activeFilterId, setActiveFilterId, results, countsByFilter, reset };
}
