import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Globe, Sun, BookOpen, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Cal, { getCalApi } from "@calcom/embed-react";

const offerings = [
  {
    icon: Globe,
    title: "The Natal Promise",
    price: "$195",
    description:
      "A foundational reading exploring your inherent gifts, struggles, and life purpose as designed by the Creator.",
    features: [
      "75-minute live consultation",
      "Deep dive into core placements",
      "Identification of lifelong themes",
      "Video & Audio recording provided",
    ],
    ctaLabel: "Book Now",
    bookable: true,
    calLink: "luzastrology/natalchartreading",
    calNamespace: "natalchartreading",
  },
  {
    icon: Sun,
    title: "Current Season",
    price: "$150",
    description:
      "For returning clients. An analysis of the planetary movements currently activating your chart.",
    features: [
      "60-minute live consultation",
      "Focus on transits & progressions",
      "Navigating immediate life questions",
      "Video & Audio recording provided",
    ],
    featured: true,
    ctaLabel: "Book Now",
    bookable: true,
    calLink: "luzastrology/chart-reading",
    calNamespace: "chart-reading",
  },
  {
    icon: BookOpen,
    title: "Chart Reading w/ Transits and Profections",
    price: "$99",
    description:
      "A chart reading focused on current transits and profections — understanding what the planets are activating in your life right now.",
    features: [
      "60-minute live consultation",
      "Focus on current planetary transits",
      "Annual profections breakdown",
      "Navigating your present season",
    ],
    ctaLabel: "Book Now",
    bookable: true,
    calLink: "luzastrology/chart-reading-transit-profections",
    calNamespace: "chart-reading-transit-profections",
  },
];

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 60,
    rotateX: 8,
    scale: 0.95,
    x: i === 0 ? -30 : i === 2 ? 30 : 0,
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    x: 0,
    transition: {
      duration: 1.2,
      delay: i * 0.15,
      ease: "linear" as const,
    },
  }),
};

const CalEmbed = ({
  calLink,
  calNamespace,
}: {
  calLink: string
  calNamespace: string
}) => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: calNamespace });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#5B8CFF" },
          dark: { "cal-brand": "#D4A63A" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, [calNamespace]);

  return (
    <Cal
      namespace={calNamespace}
      calLink={calLink}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{
        layout: "month_view",
        useSlotsViewOnSmallScreen: "true",
      }}
    />
  );
};

const BookingPanel = ({
  title,
  price,
  bookable,
  calLink,
  calNamespace,
  onClose,
}: {
  title: string;
  price: string;
  bookable: boolean;
  calLink: string;
  calNamespace: string;
  onClose: () => void;
}) => {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[3px]" />

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full rounded-2xl p-5 sm:p-8 lg:p-10 overflow-hidden"
        style={{
          maxWidth: bookable ? "min(90vw, 820px)" : "min(90vw, 420px)",
          width: "100%",
          maxHeight: "90vh",
          background: "rgba(255,255,255,0.98)",
          border: "1px solid #e5e7eb",
          boxShadow:
            "0 25px 60px -12px rgba(0,0,0,0.15), 0 10px 24px -8px rgba(0,0,0,0.08)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer hover:bg-black/5"
          style={{ color: "#9ca3af" }}
          aria-label="Close booking panel"
        >
          <X size={16} strokeWidth={2} />
        </button>

        <div className="mb-5">
          <p
            className="text-xs uppercase tracking-[0.15em] font-body font-medium mb-1.5"
            style={{ color: "#3b82f6" }}
          >
            Selected Service
          </p>
          <h4
            className="font-body font-normal text-lg mb-1"
            style={{ color: "#111827" }}
          >
            {title}
          </h4>
          <p
            className="font-body font-semibold text-lg"
            style={{ color: "#3b82f6" }}
          >
            {price}
          </p>
        </div>

        <div
          className="w-full mb-5"
          style={{ height: "1px", background: "#e5e7eb" }}
        />

        {bookable ? (
          <>
            <div
              className="w-full rounded-xl overflow-hidden"
              style={{
                height: "min(62vh, 560px)",
                minHeight: "380px",
                border: "1px solid #e5e7eb",
              }}
            >
              <CalEmbed calLink={calLink} calNamespace={calNamespace} />
            </div>
          </>
        ) : (
          <div
            className="rounded-xl flex flex-col items-center justify-center py-10 px-4"
            style={{
              background: "rgba(59,130,246,0.03)",
              border: "1.5px dashed #d1d5db",
            }}
          >
            <p
              className="font-body font-medium text-center mb-1"
              style={{ fontSize: "15px", color: "#374151" }}
            >
              Written Synthesis Request
            </p>
            <p
              className="font-body text-center max-w-xs"
              style={{ fontSize: "13px", color: "#9ca3af" }}
            >
              Request form will appear here in the next step
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>,
    document.body,
  );
};

const OfferingsSection = () => {
  const [openBooking, setOpenBooking] = useState<string | null>(null);

  useEffect(() => {
    if (openBooking) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [openBooking]);

  const handleBookClick = (title: string) => {
    setOpenBooking((prev) => (prev === title ? null : title));
  };

  const activeOffering = offerings.find((o) => o.title === openBooking);

  return (
    <section
      id="offerings"
      className="relative py-28 lg:py-36 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(var(--background)) 0%, #f8f9fb 6%, #f8f9fb 94%, hsl(var(--background)) 100%)",
      }}
    >
      {/* Header */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-6 mb-16 lg:mb-20">
        <p
          className="text-sm tracking-[0.25em] uppercase mb-4 font-body font-medium"
          style={{ color: "#3b82f6" }}
        >
          Offerings
        </p>
        <h2
          className="font-body font-normal leading-tight mb-5"
          style={{ fontSize: "clamp(32px, 4vw, 40px)", color: "#111827" }}
        >
          Guidance for Every Season
        </h2>
        <p
          className="font-body leading-relaxed max-w-xl mx-auto"
          style={{ fontSize: "16px", color: "#6b7280" }}
        >
          Each reading is a sacred conversation — rooted in faith, guided by the
          stars, and crafted with care for your unique journey.
        </p>
      </div>

      {/* Cards */}
      <div
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto px-6 md:px-12"
        style={{ perspective: "1200px" }}
      >
        {offerings.map((offering, i) => {
          const Icon = offering.icon;
          const featured = offering.featured ?? false;
          

          return (
            <motion.div
              key={offering.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="relative flex flex-col"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="flex flex-col flex-1 rounded-2xl p-8 lg:p-10 transition-shadow duration-300"
                style={{
                  background: featured
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.8)",
                  border: featured
                    ? "1.5px solid #3b82f6"
                    : "1px solid #e5e7eb",
                  boxShadow: featured
                    ? "0 25px 50px -12px rgba(59,130,246,0.15), 0 8px 24px -8px rgba(0,0,0,0.08)"
                    : "0 20px 40px -12px rgba(0,0,0,0.08), 0 4px 16px -4px rgba(0,0,0,0.04)",
                }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-5">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      color: featured ? "#3b82f6" : "#9ca3af",
                      background: featured
                        ? "rgba(59,130,246,0.08)"
                        : "rgba(0,0,0,0.03)",
                    }}
                  >
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="font-body font-normal text-center mb-2"
                  style={{ fontSize: "22px", color: "#111827" }}
                >
                  {offering.title}
                </h3>

                {/* Price */}
                <p
                  className="font-body font-semibold text-center mb-5"
                  style={{
                    fontSize: "28px",
                    color: featured ? "#3b82f6" : "#111827",
                  }}
                >
                  {offering.price}
                </p>

                {/* Description */}
                <p
                  className="text-center leading-relaxed mb-6 max-w-[280px] mx-auto font-body"
                  style={{ fontSize: "14px", color: "#6b7280" }}
                >
                  {offering.description}
                </p>

                {/* Divider */}
                <div
                  className="w-full mb-6"
                  style={{ height: "1px", background: "#e5e7eb" }}
                />

                {/* Features */}
                <ul className="flex-1 space-y-3 mb-8">
                  {offering.features.map((f, fi) => (
                    <li
                      key={fi}
                      className="flex items-start gap-2.5 font-body"
                      style={{ fontSize: "14px", color: "#374151" }}
                    >
                      <span
                        className="mt-0.5 shrink-0"
                        style={{ color: featured ? "#3b82f6" : "#9ca3af" }}
                      >
                        ✦
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() =>
                    handleBookClick(offering.title)
                  }
                  className="w-full rounded-lg h-12 text-sm uppercase tracking-[0.12em] font-body font-semibold transition-all duration-300 cursor-pointer"
                  style={
                    featured
                      ? {
                          background: "#3b82f6",
                          color: "#ffffff",
                          border: "none",
                          boxShadow: "0 4px 14px -3px rgba(59,130,246,0.4)",
                        }
                      : {
                          background: "transparent",
                          color: "#3b82f6",
                          border: "1.5px solid #3b82f6",
                        }
                  }
                >
                  {offering.ctaLabel}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Centered Booking Overlay - outside grid to avoid transform containment */}
      <AnimatePresence>
        {activeOffering && (
          <BookingPanel
            title={activeOffering.title}
            price={activeOffering.price}
            bookable={activeOffering.bookable ?? false}
            calLink={activeOffering.calLink ?? "luzastrology/natalchartreading"}
            calNamespace={activeOffering.calNamespace ?? "natalchartreading"}
            onClose={() => setOpenBooking(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default OfferingsSection;
