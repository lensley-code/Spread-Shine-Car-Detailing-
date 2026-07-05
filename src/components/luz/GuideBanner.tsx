import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, BookOpen, Compass, Star } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: 0.05 + i * 0.08,
    },
  }),
};

const insideCards = [
  {
    icon: Compass,
    title: "Spiritual Seasons",
    body: "Learn how cycles and timing shape the season you are walking through right now.",
  },
  {
    icon: Star,
    title: "Natal Insight",
    body: "Understand the key themes written into your celestial blueprint at birth.",
  },
  {
    icon: BookOpen,
    title: "Biblical Reflection",
    body: "Scripture-centered wisdom to ground your discernment and growth.",
  },
];

function CelestialIcon() {
  return (
    <div
      className="relative mx-auto mb-7 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full"
      style={{
        background:
          "radial-gradient(circle at 30% 30%, rgba(200,168,78,0.25), rgba(200,168,78,0.06) 70%)",
        border: "1px solid rgba(200,168,78,0.35)",
        boxShadow:
          "0 0 0 6px rgba(200,168,78,0.06), 0 18px 50px -20px rgba(200,168,78,0.45)",
      }}
    >
      <Sparkles size={32} style={{ color: "var(--color-gold)" }} />
      <motion.span
        className="absolute"
        style={{ top: 8, right: 10, color: "var(--color-gold)", opacity: 0.7 }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        ✦
      </motion.span>
      <motion.span
        className="absolute text-xs"
        style={{ bottom: 10, left: 10, color: "var(--color-gold)", opacity: 0.55 }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      >
        ✦
      </motion.span>
    </div>
  );
}

export default function GuideBanner() {
  return (
    <section className="pt-16 sm:pt-20 lg:pt-24 pb-10 sm:pb-12 lg:pb-14" style={{ background: "var(--color-bg)" }}>
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden p-8 sm:p-10 lg:p-12"
          style={{
            background: "var(--color-white)",
            border: "1px solid var(--color-border)",
            boxShadow:
              "0 24px 60px -30px rgba(26,26,46,0.18), 0 6px 20px -10px rgba(26,26,46,0.08)",
          }}
        >
          {/* Top gold accent line */}
          <div
            aria-hidden
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--color-gold), transparent)",
              opacity: 0.7,
            }}
          />

          {/* Soft ambient glow */}
          <div
            aria-hidden
            className="absolute -right-20 -top-20 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(200,168,78,0.15), transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          <div className="relative grid md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} style={{ color: "var(--color-gold)" }} />
                <p
                  className="text-xs uppercase tracking-[0.25em] font-semibold font-body"
                  style={{ color: "var(--color-gold)", fontSize: "0.7rem" }}
                >
                  Free Spiritual Guide
                </p>
              </div>
              <h2
                className="font-heading font-light mb-3"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
                  color: "var(--color-navy)",
                  lineHeight: 1.2,
                }}
              >
                Not ready to book?<br className="hidden sm:block" />{" "}
                Begin with a free spiritual guide.
              </h2>
              <p
                className="font-body max-w-xl"
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  color: "var(--color-text-light)",
                  fontStyle: "italic",
                  fontFamily: "var(--font-serif)",
                  fontWeight: 300,
                }}
              >
                A beautifully written introduction to spiritual seasons, natal
                insight, and biblical reflection — sent straight to your inbox.
              </p>
            </div>

            <Link
              to="/guide"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 font-body hover:-translate-y-0.5 whitespace-nowrap"
              style={{
                background: "var(--color-gold)",
                color: "var(--color-white)",
                boxShadow: "0 2px 12px rgba(200,168,78,0.25)",
              }}
            >
              Get My Free Guide <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
