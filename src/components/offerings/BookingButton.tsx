import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface BookingButtonProps {
  label?: string;
  variant?: "gold" | "gold-outline";
  onClick?: () => void;
}

const BookingButton = ({ label = "Book Now", variant = "gold-outline", onClick }: BookingButtonProps) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.97 }}
    className="w-full"
  >
    <Button
      variant={variant}
      onClick={onClick}
      className="w-full rounded-lg h-12 text-sm uppercase tracking-[0.15em] font-body font-semibold
        transition-all duration-300
        hover:shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.4)]"
    >
      {label}
    </Button>
  </motion.div>
);

export default BookingButton;
