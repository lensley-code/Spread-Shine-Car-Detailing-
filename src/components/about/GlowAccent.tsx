import { motion } from "framer-motion";

const GlowAccent = () => (
  <>
    {/* Primary glow behind portrait */}
    <motion.div
      className="absolute -inset-8 rounded-full bg-primary/10 blur-3xl"
      animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.6, 0.4] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Secondary warm glow */}
    <motion.div
      className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary/8 blur-2xl"
      animate={{ x: [0, 8, 0], y: [0, -6, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  </>
);

export default GlowAccent;
