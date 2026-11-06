import type { ReactNode } from 'react';

/** Full-bleed bar that sticks to the top of the viewport while the page scrolls. */
export function StickyToolbar({ children }: { children: ReactNode }) {
  return (
    <div className="sticky top-0 z-30 mx-[calc(50%-50vw)] px-4 sm:px-6 lg:px-14 py-3 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border-inner)] shadow-[0_4px_12px_rgba(0,0,0,0.12)]">
      <div className="w-full max-w-4xl mx-auto space-y-4">{children}</div>
    </div>
  );
}
