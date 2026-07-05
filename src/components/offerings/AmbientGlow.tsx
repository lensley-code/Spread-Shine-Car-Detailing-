import { motion } from "framer-motion";

const AmbientGlow = () => (
  <>
    {/* Warm glow behind featured card */}
    <motion.div
      animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.45, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]
        rounded-full bg-primary/10 blur-[120px] pointer-events-none"
    />
    {/* Secondary accent */}
    <motion.div
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute top-1/4 right-0 w-[300px] h-[300px]
        rounded-full bg-primary/5 blur-[100px] pointer-events-none"
    />
  </>
);

export default AmbientGlow;
