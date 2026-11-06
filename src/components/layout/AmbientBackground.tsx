import libraryShelves from '../../assets/images/library-shelves.jpg';

/** Fixed, slowly drifting library photo with colour washes behind the whole page. */
export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      <div
        className="absolute inset-[-4%] w-[108%] h-[108%] animate-subtle-drift"
        style={{
          backgroundImage: `url(${libraryShelves})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          opacity: 0.22,
          filter: 'blur(1px) saturate(0.85)',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/80 via-[var(--bg)]/92 to-[var(--bg)]" />

      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 15%, rgba(222, 197, 145, 0.12) 0%, transparent 60%),
            radial-gradient(circle at 10% 40%, rgba(62, 77, 118, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 90% 70%, rgba(104, 72, 109, 0.18) 0%, transparent 50%)
          `,
        }}
      />

      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[var(--bg)] to-transparent opacity-80" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[var(--bg)] to-transparent" />
    </div>
  );
}
