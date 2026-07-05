import { motion } from "framer-motion";

interface SectionDividerProps {
  /** Color of the section above the divider. */
  from: string;
  /** Color of the section below the divider. */
  to: string;
  /** Height of the divider in px on desktop. */
  height?: number;
  className?: string;
  /** Visual style:
   *  - "soft": subtle vertical gradient (nearly invisible fade).
   *  - "curve": gentle organic SVG curve, blends `from` into `to`.
   *  - "arc":  legacy pronounced arc (used for dark ↔ light seams). */
  variant?: "soft" | "curve" | "arc";
  /**
   * Curve direction (only for variant="curve"):
   *  - "up":   the `to` section rises up into the `from` section (invites the eye downward)
   *  - "down": the `to` section dips down away from the `from` section
   */
  direction?: "up" | "down";
  /** Back-compat: `soft={false}` = legacy arc. */
  soft?: boolean;
}

/**
 * Section transition. Renders a subtle fade-in on scroll.
 */
const SectionDivider = ({
  from,
  to,
  height = 80,
  className = "",
  variant,
  direction = "up",
  soft,
}: SectionDividerProps) => {
  // Back-compat: `soft={false}` maps to the legacy arc.
  const resolved: "soft" | "curve" | "arc" =
    variant ?? (soft === false ? "arc" : "curve");

  if (resolved === "soft") {
    return (
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full ${className}`}
        style={{
          height,
          background: `linear-gradient(to bottom, ${from} 0%, ${to} 100%)`,
        }}
      />
    );
  }

  if (resolved === "arc") {
    return (
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`relative w-full overflow-hidden leading-[0] ${className}`}
        style={{ backgroundColor: to }}
      >
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="block w-full h-[36px] sm:h-[56px] md:h-[72px]"
          style={{ maxHeight: height }}
        >
          <path d="M0,0 L1440,0 L1440,36 C1080,80 360,80 0,36 Z" fill={from} />
        </svg>
      </motion.div>
    );
  }

  // "curve" — gentle organic SVG curve between two light sections.
  // We draw the `from` color as the top shape with a subtle curve, over a `to` background.
  // direction "up"   -> curve gently dips down at center (eye flows into next section)
  // direction "down" -> curve gently rises at center
  const path =
    direction === "up"
      ? // Top color occupies most; center dips ~24/80 lower — subtle organic curve.
        "M0,0 L1440,0 L1440,40 C1080,72 360,72 0,40 Z"
      : "M0,0 L1440,0 L1440,40 C1080,8 360,8 0,40 Z";

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-full overflow-hidden leading-[0] ${className}`}
      style={{ backgroundColor: to }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block w-full"
        style={{ height, maxHeight: height }}
      >
        <path d={path} fill={from} />
      </svg>
    </motion.div>
  );
};

export default SectionDivider;
