import { useState, type MouseEvent } from 'react';
import { BookOpen, Bookmark, ChevronDown, ChevronUp, Maximize2, X } from 'lucide-react';
import { commandLabel } from '../../lib/commandSearch';
import { commandElementId } from '../../lib/scrollToCommand';
import type { GitCommand } from '../../types/command';
import { CautionCallout } from './CautionCallout';
import { CommandDetails } from './CommandDetails';
import { CommandSnippet } from './CommandSnippet';

/** Matches Tailwind's `md` breakpoint, where the grid shows 2–3 cards per row. */
const MULTI_COLUMN_QUERY = '(min-width: 48rem)';
/** Clicks on these should do their own thing, not open the card. */
const INTERACTIVE_SELECTOR = 'button, a, input, label, select, textarea';

interface CommandCardProps {
  command: GitCommand;
  isBookmarked: boolean;
  onToggleBookmark: (commandId: string) => void;
  onSelectRelated: (commandId: string) => void;
  /** `grid`: compact card in the list. `fullscreen`: inside the pop-up, details open. */
  variant?: 'grid' | 'fullscreen';
  /** Grid only: open this card full-screen. */
  onExpand?: () => void;
  /** Fullscreen only: close the pop-up. */
  onClose?: () => void;
}

const iconButtonClass =
  'p-2 rounded transition-colors cursor-pointer text-[var(--muted)] hover:text-[var(--gold)] hover:bg-[var(--recess-bg)]';

export function CommandCard({
  command,
  isBookmarked,
  onToggleBookmark,
  onSelectRelated,
  variant = 'grid',
  onExpand,
  onClose,
}: CommandCardProps) {
  const isFullscreen = variant === 'fullscreen';
  const [isExpanded, setIsExpanded] = useState(isFullscreen);
  const detailsId = `${commandElementId(command.id)}-details${isFullscreen ? '-fullscreen' : ''}`;

  // Clicking the card body opens it full-screen, but only in the multi-column layout,
  // and not when the click was on a control or the user was selecting text.
  const handleCardClick = (event: MouseEvent<HTMLElement>) => {
    if (!onExpand || isFullscreen) return;
    if (!window.matchMedia(MULTI_COLUMN_QUERY).matches) return;
    if ((event.target as HTMLElement).closest(INTERACTIVE_SELECTOR)) return;
    if (window.getSelection()?.toString()) return;
    onExpand();
  };

  return (
    <article
      id={isFullscreen ? undefined : commandElementId(command.id)}
      onClick={handleCardClick}
      className={`folio-card rounded relative flex flex-col justify-between transition-all duration-200 ${
        isFullscreen ? 'p-6 sm:p-10' : 'p-5 sm:p-6 md:cursor-zoom-in'
      }`}
    >
      <div>
        <header className="flex items-start justify-between gap-4 mb-2">
          <div>
            <p className="font-serif text-[11pt] font-semibold uppercase tracking-[0.18em] text-[var(--gold)] mb-1 [font-variant:small-caps]">
              {commandLabel(command)}
            </p>
            <h3
              id={isFullscreen ? `${commandElementId(command.id)}-dialog-title` : undefined}
              className={`font-display font-normal text-[var(--ink)] tracking-normal flex flex-wrap items-baseline gap-x-3 ${
                isFullscreen ? 'text-4xl sm:text-5xl' : 'text-2xl sm:text-3xl'
              }`}
            >
              <span>{command.title}</span>
              <span className="font-mono text-[11pt] text-[var(--muted)] font-normal">{command.command}</span>
            </h3>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {!isFullscreen && onExpand && (
              <button
                type="button"
                onClick={onExpand}
                className={`hidden md:inline-flex ${iconButtonClass}`}
                title="Open full screen"
                aria-label={`Open ${command.command} full screen`}
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={() => onToggleBookmark(command.id)}
              className={`p-2 rounded transition-colors cursor-pointer ${
                isBookmarked
                  ? 'text-[var(--gold)] bg-[var(--recess-bg)]'
                  : 'text-[var(--muted)] hover:text-[var(--gold)] hover:bg-[var(--recess-bg)]'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark this command'}
              aria-label={isBookmarked ? `Remove ${command.command} bookmark` : `Bookmark ${command.command}`}
              aria-pressed={isBookmarked}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[var(--gold)]' : ''}`} />
            </button>

            {isFullscreen && onClose && (
              <button type="button" onClick={onClose} className={iconButtonClass} title="Close (Esc)" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </header>

        {/* Plain-language summary: what the command does, in the words people search for */}
        <p className="font-serif text-[11pt] leading-relaxed text-[var(--ink)] mb-2">{command.summary}</p>

        <p className="font-serif italic text-[11pt] text-[var(--muted)] mb-3 border-b border-[var(--border-inner)] pb-2.5">
          {command.etymology}
        </p>

        <p className="font-serif text-[11pt] leading-relaxed text-[var(--ink)] opacity-95 mb-5 font-normal">
          {command.description}
        </p>

        <div className={`mb-4 ${isFullscreen ? 'grid gap-3 lg:grid-cols-2' : 'space-y-3'}`}>
          {command.snippets.map((snippet) => (
            <CommandSnippet key={snippet.id} snippet={snippet} />
          ))}
        </div>

        {command.caution && <CautionCallout caution={command.caution} />}
      </div>

      <div className="border-t border-[var(--border-inner)] pt-3 mt-2">
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          aria-controls={detailsId}
          className="w-full flex items-center justify-between text-[11pt] font-serif text-[var(--gold)] hover:text-[var(--ink)] py-1 cursor-pointer transition-colors"
        >
          <span className="flex items-center gap-1.5 italic font-serif">
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{isExpanded ? 'Conceal Monastic Annotations' : 'Examine Scribe Flags & Historical Gloss'}</span>
          </span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {isExpanded && (
          <div id={detailsId}>
            <CommandDetails command={command} onSelectRelated={onSelectRelated} />
          </div>
        )}
      </div>
    </article>
  );
}
