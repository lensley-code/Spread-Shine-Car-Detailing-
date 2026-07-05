import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface FloatingAstrologyBadgeProps {
  label: string;
  icon?: React.ReactNode;
  className?: string;
  delay?: number;
}

const FloatingAstrologyBadge = ({
  label,
  icon,
  className = "",
  delay = 0,
}: FloatingAstrologyBadgeProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    animate={{ y: [0, -6, 0] }}
    className={`absolute z-20 ${className}`}
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl
        bg-white/80 backdrop-blur-md border border-[hsl(40_60%_55%)]/20
        shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)]
        hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.18)]
        transition-shadow duration-300"
    >
      <span className="text-[hsl(40_60%_45%)]">
        {icon || <Sparkles size={14} />}
      </span>
      <span className="text-xs font-body font-medium text-[hsl(222_30%_20%)] tracking-wide">
        {label}
      </span>
    </motion.div>
  </motion.div>
);

export default FloatingAstrologyBadge;
