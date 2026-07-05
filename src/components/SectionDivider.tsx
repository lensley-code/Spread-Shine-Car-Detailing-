interface SectionDividerProps {
  /** Color of the section above the divider. */
  from: string;
  /** Color of the section below the divider. */
  to: string;
  /** Height of the divider in px on desktop. */
  height?: number;
  className?: string;
  /** If true (default), render as a soft vertical gradient fade with no curve.
   *  Set to false to render the legacy curved arc (used for dark ↔ light transitions). */
  soft?: boolean;
}

/**
 * Section transition. Two modes:
 *  - soft (default): a very subtle vertical gradient from `from` → `to`. Feels
 *    almost invisible; best between two light sections.
 *  - curved: a gentle full-width arc — used when transitioning between dark
 *    and light surfaces where a clean seam is desirable.
 */
const SectionDivider = ({
  from,
  to,
  height = 64,
  className = "",
  soft = true,
}: SectionDividerProps) => {
  if (soft) {
    return (
      <div
        aria-hidden="true"
        className={`w-full ${className}`}
        style={{
          height,
          background: `linear-gradient(to bottom, ${from} 0%, ${to} 100%)`,
        }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden leading-[0] ${className}`}
      style={{ backgroundColor: to }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block w-full h-[36px] sm:h-[56px] md:h-[72px]"
        style={{ maxHeight: height }}
      >
        <path
          d="M0,0 L1440,0 L1440,36 C1080,80 360,80 0,36 Z"
          fill={from}
        />
      </svg>
    </div>
  );
};

export default SectionDivider;
