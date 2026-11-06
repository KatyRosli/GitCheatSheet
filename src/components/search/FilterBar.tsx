import type { CommandFilter, FilterId } from '../../config/commandFilters';

interface FilterBarProps {
  filters: readonly CommandFilter[];
  activeId: FilterId;
  counts: Record<FilterId, number>;
  onSelect: (id: FilterId) => void;
}

const ACTIVE_STYLE = {
  default: 'bg-[var(--gold)] text-[var(--bg)] font-semibold shadow-xs',
  danger: 'bg-[var(--rust)] text-[var(--ink)] font-semibold shadow-xs',
} as const;

/** Single-select row of filter buttons with a count on each. */
export function FilterBar({ filters, activeId, counts, onSelect }: FilterBarProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Command category"
      className="flex flex-wrap items-center gap-1.5 p-1 bg-[var(--card-bg)] border border-[var(--border-gold)] rounded"
    >
      {filters.map(({ id, label, hint, icon: Icon, tone = 'default' }) => {
        const isActive = activeId === id;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onSelect(id)}
            title={hint}
            className={`px-2.5 py-1 text-[11pt] font-serif font-medium rounded transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              isActive ? ACTIVE_STYLE[tone] : 'text-[var(--muted)] hover:text-[var(--ink)]'
            }`}
          >
            {Icon && <Icon className="w-3.5 h-3.5" aria-hidden="true" />}
            <span>{label}</span>
            <span
              className={`font-mono text-[11pt] tabular-nums px-1.5 rounded-full ${
                isActive ? 'bg-black/15' : 'bg-[var(--recess-bg)] text-[var(--gold)]'
              }`}
            >
              {counts[id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
