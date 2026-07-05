import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import OfferingFeatures from "./OfferingFeatures";
import BookingButton from "./BookingButton";

interface OfferingCardProps {
  icon: LucideIcon;
  title: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
  ctaLabel?: string;
  index?: number;
}

const OfferingCard = ({
  icon: Icon,
  title,
  price,
  description,
  features,
  featured = false,
  ctaLabel = "Book Now",
  index = 0,
}: OfferingCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -6 }}
    className={`relative flex flex-col rounded-2xl p-8 lg:p-10 transition-all duration-500 group
      ${featured
        ? "border-2 border-primary/40 bg-card shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.2),0_8px_24px_-8px_rgba(0,0,0,0.3)]"
        : "border border-border/30 bg-card/80 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.25)]"
      }
      hover:shadow-[0_24px_64px_-16px_hsl(var(--primary)/0.25),0_12px_32px_-8px_rgba(0,0,0,0.3)]
      hover:border-primary/30`}
  >
    {/* Featured glow */}
    {featured && (
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-primary/20 via-transparent to-primary/10 -z-10 blur-sm" />
    )}

    {/* Icon */}
    <div className="flex justify-center mb-5">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center
        ${featured ? "text-primary" : "text-muted-foreground"}
        transition-colors duration-300 group-hover:text-primary`}>
        <Icon size={24} strokeWidth={1.5} />
      </div>
    </div>

    {/* Title */}
    <h3 className="font-heading text-xl lg:text-2xl text-center text-foreground mb-2">
      {title}
    </h3>

    {/* Price */}
    <p className={`font-heading text-2xl lg:text-3xl text-center mb-5
      ${featured ? "text-primary" : "text-foreground/80"}`}>
      {price}
    </p>

    {/* Description */}
    <p className="text-sm text-muted-foreground text-center leading-relaxed mb-6 max-w-[280px] mx-auto">
      {description}
    </p>

    {/* Features */}
    <div className="flex-1 mb-8">
      <OfferingFeatures features={features} />
    </div>

    {/* CTA */}
    <BookingButton
      label={ctaLabel}
      variant={featured ? "gold" : "gold-outline"}
    />
  </motion.div>
);

export default OfferingCard;
