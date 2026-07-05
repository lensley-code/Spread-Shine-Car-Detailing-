import { motion } from "framer-motion";
import astroChartWarm from "@/assets/astro-chart-warm.jpg";
import celestialPattern from "@/assets/celestial-pattern.jpg";

const FloatingAstroVisual = () => (
  <>
    {/* Left decorative — celestial pattern */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.06 }}
      viewport={{ once: true }}
      animate={{ y: [0, -12, 0] }}
      transition={{ y: { duration: 10, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 1.5 } }}
      className="absolute -left-20 top-20 w-[340px] h-[420px] pointer-events-none hidden lg:block"
    >
      <img
        src={celestialPattern}
        alt=""
        className="w-full h-full object-cover rounded-3xl"
        loading="lazy"
      />
    </motion.div>

    {/* Right decorative — warm chart */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.08 }}
      viewport={{ once: true }}
      animate={{ y: [0, 10, 0] }}
      transition={{ y: { duration: 12, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 1.5 } }}
      className="absolute -right-16 bottom-16 w-[280px] h-[280px] pointer-events-none hidden lg:block"
    >
      <img
        src={astroChartWarm}
        alt=""
        className="w-full h-full object-cover rounded-full blur-[2px]"
        loading="lazy"
      />
    </motion.div>
  </>
);

export default FloatingAstroVisual;
