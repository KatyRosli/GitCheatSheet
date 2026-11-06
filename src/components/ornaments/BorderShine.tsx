interface BorderShineProps {
  /** Distance from the container edge in px (0 = outer border, 8 = inner frame line). */
  inset?: number;
  strokeWidth?: number;
  /** The inner ring uses a shorter beam and a slight delay. */
  isInner?: boolean;
}

/** A gold highlight that travels clockwise around its positioned parent. */
export function BorderShine({ inset = 0, strokeWidth = 1.8, isInner = false }: BorderShineProps) {
  const key = `${inset}-${isInner ? 'inner' : 'outer'}`;
  const filterId = `border-shine-glow-${key}`;
  const gradientId = `border-shine-gradient-${key}`;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF7E6" stopOpacity="1" />
          <stop offset="50%" stopColor="#DEC591" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#C9A36A" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      <rect
        x={inset + strokeWidth / 2}
        y={inset + strokeWidth / 2}
        width={`calc(100% - ${inset * 2 + strokeWidth}px)`}
        height={`calc(100% - ${inset * 2 + strokeWidth}px)`}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray={isInner ? '16 84' : '22 78'}
        className={isInner ? 'animate-clockwise-shine-inner' : 'animate-clockwise-shine'}
        filter={`url(#${filterId})`}
      />
    </svg>
  );
}
