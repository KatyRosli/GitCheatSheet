import type { GitCommand } from '../../types/command';

interface CommandDetailsProps {
  command: GitCommand;
  onSelectRelated: (commandId: string) => void;
}

/** Flags, tip and related commands, shown when a card is expanded. */
export function CommandDetails({ command, onSelectRelated }: CommandDetailsProps) {
  const headingClass =
    'font-serif text-[11pt] font-semibold uppercase tracking-wider text-[var(--gold)] [font-variant:small-caps]';

  return (
    <div className="space-y-3 text-[11pt] font-serif pt-2 border-t border-[var(--border-inner)]">
      <div>
        <h4 className={`${headingClass} mb-1.5`}>Principal Flags &amp; Invocations</h4>
        <ul className="space-y-1.5 font-mono text-[11pt]">
          {command.flags.map((f) => (
            <li
              key={f.flag}
              className="flex items-start gap-2 bg-[var(--recess-bg)] p-1.5 rounded border border-[var(--border-inner)]"
            >
              <span className={`font-bold shrink-0 ${f.danger ? 'text-[var(--rust)]' : 'text-[var(--gold)]'}`}>
                {f.flag}
              </span>
              <span className="font-serif text-[var(--muted)] text-[11pt]">{f.description}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-[var(--card-bg)] p-2.5 rounded border border-[var(--border-inner)]">
        <h4 className={`${headingClass} block mb-1`}>Historical Commentary</h4>
        <p className="font-serif italic text-[11pt] leading-relaxed text-[var(--muted)]">{command.tip}</p>
      </div>

      {command.seeAlso.length > 0 && (
        <div className="text-[11pt] text-[var(--muted)] flex flex-wrap items-center gap-2 pt-1 font-serif">
          <span className="italic">See also:</span>
          {command.seeAlso.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => onSelectRelated(id)}
              className="font-mono text-[var(--gold)] hover:underline cursor-pointer"
            >
              {id}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
