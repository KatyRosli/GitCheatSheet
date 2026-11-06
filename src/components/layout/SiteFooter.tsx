const AUTHOR = { name: 'Katy Rosli', url: 'https://github.com/katyrosli' };
const YEAR = 2026;

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-[var(--border-inner)] bg-[var(--recess-bg)]/90 backdrop-blur-xs text-[var(--muted)] py-8 px-4 sm:px-6 lg:px-14 text-[11pt] font-serif">
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-display font-normal text-[var(--gold)] text-base">Git Cheat Sheet</span>
          <span aria-hidden="true">·</span>
          <span>Where art and code meet after dark</span>
        </div>

        <div className="flex items-center gap-2">
          <span>© {YEAR}</span>
          <a
            href={AUTHOR.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--gold)] underline underline-offset-4 decoration-[var(--gold)]/40 hover:decoration-[var(--gold)] transition-colors"
          >
            {AUTHOR.name}
          </a>
        </div>
      </div>
    </footer>
  );
}
