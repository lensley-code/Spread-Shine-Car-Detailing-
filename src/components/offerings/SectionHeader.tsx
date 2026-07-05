import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow: string;
  headline: string;
  subtitle?: string;
}

const SectionHeader = ({ eyebrow, headline, subtitle }: SectionHeaderProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className="text-center mb-16 lg:mb-20"
  >
    <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-body font-medium">
      {eyebrow}
    </p>
    <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-foreground">
      {headline}
    </h2>
    {subtitle && (
      <p className="mt-5 text-muted-foreground text-base lg:text-lg max-w-xl mx-auto font-body leading-relaxed">
        {subtitle}
      </p>
    )}
  </motion.div>
);

export default SectionHeader;
