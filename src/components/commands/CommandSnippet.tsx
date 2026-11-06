import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import type { CommandSnippet as Snippet } from '../../types/command';

const COPIED_MS = 2000;
const PLACEHOLDER = /(<[^>]+>)/g;
const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** One copy-ready example, with inputs to fill in its `<placeholders>`. */
export function CommandSnippet({ snippet }: { snippet: Snippet }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [isCopied, setIsCopied] = useState(false);

  const filledCommand = snippet.parameters.reduce(
    (cmd, p) => cmd.replace(new RegExp(escapeRegExp(p.name), 'g'), values[p.name] || p.defaultValue),
    snippet.command
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(filledCommand);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), COPIED_MS);
    } catch {
      // Clipboard can be blocked (insecure origin, permissions); the command stays visible to copy by hand.
    }
  };

  return (
    <div className="recessed-slate rounded p-3 text-[11pt] font-mono group hover:border-[var(--gold)] transition-colors">
      <div className="flex items-center gap-2 text-[11pt] text-[var(--muted)] mb-2 font-serif">
        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[11pt] font-mono font-bold text-[var(--gold)] bg-[var(--card-bg)] border border-[var(--border-gold)] shrink-0">
          {snippet.sequenceNum}
        </span>
        <span className="italic text-[var(--ink)] opacity-90">{snippet.description}</span>
      </div>

      <div className="bg-[var(--recess-bg)] px-3 py-2 rounded border border-[var(--border-inner)] flex items-center justify-between gap-3">
        <div className="overflow-x-auto flex-1 py-0.5">
          <code className="text-[var(--ink)] font-mono text-[11pt] whitespace-nowrap block">
            {snippet.command.split(PLACEHOLDER).map((token, i) =>
              token.startsWith('<') && token.endsWith('>') ? (
                <span
                  key={i}
                  className="text-[var(--gold)] italic font-normal px-1 bg-[var(--border-inner)] rounded mx-0.5 inline-block"
                  title={`Placeholder: ${token}`}
                >
                  {values[token] || token}
                </span>
              ) : (
                <span key={i}>{token}</span>
              )
            )}
          </code>
        </div>

        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1.5 text-[11pt] font-mono text-[var(--gold)] hover:text-[var(--ink)] bg-[var(--card-bg)] hover:bg-[var(--recess-bg)] border border-[var(--border-gold)]/60 hover:border-[var(--gold)] px-2 py-1 rounded transition-all cursor-pointer shrink-0 shadow-xs"
          title="Copy command to clipboard"
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
              <span className="text-emerald-400 font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {snippet.parameters.length > 0 && (
        <div className="mt-2 pt-2 border-t border-[var(--border-inner)] flex flex-wrap items-center gap-2 text-[11pt]">
          <span className="font-serif italic text-[var(--muted)]">Tune Parameters:</span>
          {snippet.parameters.map((param) => (
            <label key={param.name} className="flex items-center gap-1">
              <span className="text-[var(--gold)] font-mono text-[11pt]">{param.name}:</span>
              <input
                type="text"
                defaultValue={param.defaultValue}
                placeholder={param.defaultValue}
                title={param.description}
                onChange={(e) => setValues((prev) => ({ ...prev, [param.name]: e.target.value }))}
                className="bg-[var(--card-bg)] border border-[var(--border-gold)] rounded px-1.5 py-0.5 text-[var(--ink)] font-mono text-[11pt] w-28 focus:border-[var(--gold)] focus:outline-none"
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
