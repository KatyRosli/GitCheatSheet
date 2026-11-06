import { Search } from 'lucide-react';

interface NoResultsProps {
  query: string;
  onReset: () => void;
}

export function NoResults({ query, onReset }: NoResultsProps) {
  return (
    <div className="folio-card rounded p-12 text-center max-w-lg mx-auto space-y-3">
      <Search className="w-8 h-8 text-[var(--gold)]/50 mx-auto" aria-hidden="true" />
      <h3 className="font-display text-xl text-[var(--ink)] font-normal">No Canons Satisfy This Query</h3>
      <p className="font-serif italic text-[11pt] text-[var(--muted)]">
        {query
          ? `The library archives hold no record matching "${query}".`
          : 'No commands in this category yet.'}{' '}
        Reset filters to survey the full corpus.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="px-3 py-1.5 text-[11pt] font-serif font-medium text-[var(--bg)] bg-[var(--gold)] rounded cursor-pointer mt-2"
      >
        Clear All Restrictions
      </button>
    </div>
  );
}
