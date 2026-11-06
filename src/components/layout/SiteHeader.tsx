import illuminatedBooks from '../../assets/images/illuminated-books.jpg';
import { BorderShine } from '../ornaments/BorderShine';
import { CornerFlourish } from '../ornaments/CornerFlourish';
import { DividerOrnament } from '../ornaments/DividerOrnament';

const OVERLINE = 'LIBER DE ARTE MERCURII · VOL. I · WHERE ART & CODE MEET AFTER DARK';
const TAGLINE = 'The Velvet Hour · Commands Rooted in Depth & Discipline';

interface SiteHeaderProps {
  commandCount: number;
  categoryNames: readonly string[];
}

/** The framed title block at the top of the page. */
export function SiteHeader({ commandCount, categoryNames }: SiteHeaderProps) {
  const categoryList = new Intl.ListFormat('en', { type: 'conjunction' }).format(categoryNames);

  return (
    <section className="frame w-full my-4 select-none relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-18 animate-frame-glow"
          style={{
            backgroundImage: `url(${illuminatedBooks})`,
            filter: 'contrast(1.15) brightness(0.85)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/70 to-[var(--bg)]" />
      </div>

      <BorderShine inset={0} strokeWidth={1.8} />
      <BorderShine inset={8} strokeWidth={1.2} isInner />

      <CornerFlourish position="tl" />
      <CornerFlourish position="tr" />
      <CornerFlourish position="bl" />
      <CornerFlourish position="br" />

      <div className="relative z-10 flex flex-col items-center gap-[18px] text-center w-full">
        <p className="overline text-[11pt] font-serif">{OVERLINE}</p>

        <h1 className="font-display">
          <span>Git Cheat Sheet</span>
        </h1>

        <DividerOrnament />

        <p className="tagline text-[11pt] font-serif">{TAGLINE}</p>

        <p className="font-serif text-[11pt] sm:text-base text-[var(--muted)] max-w-2xl mx-auto leading-relaxed mt-1 normal-case">
          An archival illuminated compendium treating version control as an enduring midnight lexicon. Browse
          every command by category: {categoryList}.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-3 text-[11pt] tracking-widest text-[var(--gold)] font-serif uppercase opacity-90">
          <span>{categoryNames.length} Categories</span>
          <span aria-hidden="true" className="opacity-50">·</span>
          <span>{commandCount} Commands</span>
          <span aria-hidden="true" className="opacity-50">·</span>
          <span>Cryptographic Directed Acyclic Graph</span>
        </div>
      </div>
    </section>
  );
}
