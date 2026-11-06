import { AlertOctagon } from 'lucide-react';
import type { CommandCaution } from '../../types/command';

export function CautionCallout({ caution }: { caution: CommandCaution }) {
  return (
    <aside className="mb-4 p-3 rounded border border-[var(--rust)]/60 bg-[var(--rust)]/15 text-[var(--ink)]" role="note">
      <div className="flex items-center gap-2 mb-1 text-[var(--rust)] font-mono text-[11pt] uppercase font-bold tracking-wider">
        <AlertOctagon className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>Caution — {caution.title}</span>
      </div>
      <p className="font-serif italic text-[11pt] leading-relaxed opacity-90 pl-6">— {caution.details}</p>
    </aside>
  );
}
