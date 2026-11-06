type CornerPosition = 'tl' | 'tr' | 'bl' | 'br';

/** Decorative corner scroll for the header frame; mirrored per corner via CSS. */
export function CornerFlourish({ position }: { position: CornerPosition }) {
  return (
    <svg className={`corner ${position}`} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M4 60V20C4 11 11 4 20 4h40" />
      <path d="M12 52V24c0-7 5-12 12-12h28" />
      <path d="M20 20c6 0 9 3 9 8 0 4-3 6-6 6s-4-2-4-4 1-3 3-3" />
      <path d="M4 4l8 8M8 4l-4 4" />
    </svg>
  );
}
