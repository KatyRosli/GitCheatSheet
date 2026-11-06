import { Search, X } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  /** Called on Enter. */
  onSubmit: () => void;
  resultCount: number;
  totalCount: number;
}

export function SearchBar({ query, onQueryChange, onSubmit, resultCount, totalCount }: SearchBarProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-[var(--gold)]/5 rounded pointer-events-none transition-all group-focus-within:bg-[var(--gold)]/10 group-focus-within:shadow-[0_0_24px_rgba(201,163,106,0.18)]" />

      <div className="relative flex items-center bg-[var(--card-bg)] border border-[var(--border-gold)] group-focus-within:border-[var(--gold)] rounded px-4 py-3 shadow-[inset_0_0_0_1px_var(--border-inner)] transition-colors">
        <Search className="w-5 h-5 text-[var(--gold)] opacity-85 shrink-0 mr-3" aria-hidden="true" />

        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onSubmit();
            } else if (e.key === 'Escape') {
              onQueryChange('');
            }
          }}
          enterKeyHint="search"
          aria-label="Search commands"
          placeholder="Seek command, flag, or operation..."
          className="w-full bg-transparent font-serif italic text-base lg:text-lg text-[var(--ink)] placeholder:text-[var(--muted)]/60 placeholder:font-serif placeholder:italic focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />

        {query && (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            className="p-1 text-[var(--muted)] hover:text-[var(--ink)] mr-2 cursor-pointer"
            title="Clear search"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-2 border-l border-[var(--border-inner)] pl-3 shrink-0">
          <span className="font-mono text-[11pt] text-[var(--muted)] tabular-nums hidden sm:inline" aria-live="polite">
            {resultCount} of {totalCount} entries
          </span>
        </div>
      </div>
    </div>
  );
}
