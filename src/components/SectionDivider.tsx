interface SectionDividerProps {
  /** Color of the section above the divider (the curve fill). */
  from: string;
  /** Color of the section below the divider (the divider background). */
  to: string;
  /** Height of the curve on desktop. Mobile scales down automatically. */
  height?: number;
  className?: string;
}

/**
 * Subtle full-width curved transition between two sections.
 * Renders the "from" color as a gentle arc dipping into the "to" color.
 */
const SectionDivider = ({
  from,
  to,
  height = 80,
  className = "",
}: SectionDividerProps) => {
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
        {/* Fills the top portion with `from`, arcing gently down into `to`. */}
        <path
          d="M0,0 L1440,0 L1440,36 C1080,80 360,80 0,36 Z"
          fill={from}
        />
      </svg>
    </div>
  );
};

export default SectionDivider;
