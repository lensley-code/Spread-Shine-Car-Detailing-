import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Loader2, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { setPageSeo } from "@/lib/seo";
import bookCover from "@/assets/spiritual-astrology-book-cover.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: 0.05 + i * 0.08,
    },
  }),
};

function GuideMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[400px]"
      style={{ perspective: "1600px" }}
    >
      {/* Soft ambient glow */}
      <div
        aria-hidden
        className="absolute -inset-12 -z-10 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(200,168,78,0.22), transparent 65%)",
          filter: "blur(28px)",
        }}
      />

      {/* 3D book wrapper */}
      <motion.div
        whileHover={{ rotateY: -18 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateY(-22deg) rotateX(4deg)",
          aspectRatio: "3/4",
        }}
      >
        {/* Book pages edge (right side, behind cover) */}
        <div
          aria-hidden
          className="absolute top-[1.5%] right-[-14px] bottom-[1.5%] w-[14px] rounded-r-sm"
          style={{
            background:
              "linear-gradient(90deg, #f3ecdc 0%, #e8dfc7 40%, #d8cba8 100%)",
            transform: "translateZ(-6px) rotateY(8deg)",
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.15)",
          }}
        />

        {/* Spine (left side) */}
        <div
          aria-hidden
          className="absolute top-0 left-0 bottom-0 w-[22px] rounded-l-sm"
          style={{
            background:
              "linear-gradient(90deg, #0f1a33 0%, #1a2a4a 60%, #15233f 100%)",
            transform: "translateX(-11px) rotateY(-90deg)",
            transformOrigin: "right center",
            boxShadow: "inset -2px 0 4px rgba(0,0,0,0.4)",
          }}
        />

        {/* Front cover */}
        <div
          className="relative w-full h-full rounded-r-md rounded-l-sm overflow-hidden"
          style={{
            boxShadow:
              "0 40px 80px -30px rgba(26,26,46,0.55), 0 18px 30px -18px rgba(26,26,46,0.35)",
          }}
        >
          <img
            src={bookCover}
            alt="Spiritual Astrology & God's Voice and Purposes in the Stars — book cover"
            width={1024}
            height={1024}
            className="w-full h-full object-cover select-none"
            draggable={false}
          />

          {/* Gloss highlight */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 28%, rgba(255,255,255,0) 72%, rgba(255,255,255,0.06) 100%)",
            }}
          />

          {/* Inner spine shadow */}
          <div
            aria-hidden
            className="absolute top-0 left-0 bottom-0 w-[18px] pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.18) 60%, transparent 100%)",
            }}
          />

          {/* Subtle gold edge sheen */}
          <div
            aria-hidden
            className="absolute top-0 right-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(200,168,78,0.5), transparent)",
            }}
          />
        </div>
      </motion.div>

      {/* Floor reflection / shadow */}
      <div
        aria-hidden
        className="absolute left-1/2 -bottom-6 h-6 w-[78%] -translate-x-1/2 rounded-[50%]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(26,26,46,0.35), transparent 70%)",
          filter: "blur(10px)",
        }}
      />

      {/* Complimentary ribbon */}
      <div
        className="absolute -top-3 -right-2 px-3 py-1.5 rounded-full text-[0.6rem] tracking-[0.22em] uppercase font-semibold"
        style={{
          background: "var(--color-navy)",
          color: "var(--color-gold)",
          boxShadow: "0 8px 24px -10px rgba(26,26,46,0.55)",
          border: "1px solid rgba(200,168,78,0.45)",
        }}
      >
        ✦ Complimentary
      </div>
    </motion.div>
  );
}

function LeadForm() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [optIn, setOptIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (website) return "Spam detected";
    if (!email.trim()) return "Please enter your email.";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email.trim())) return "Please enter a valid email address.";
    if (firstName.length > 80) return "First name is too long.";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanName = firstName.trim();

      const { error: submitError } = await supabase.functions.invoke("submit-guide-lead", {
        body: {
          email: cleanEmail,
          name: cleanName || undefined,
          website,
        },
      });
      if (submitError) throw submitError;


      navigate(
        `/guide-confirmation?email=${encodeURIComponent(cleanEmail)}${
          cleanName ? `&name=${encodeURIComponent(cleanName)}` : ""
        }`,
      );
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    background: "var(--color-bg)",
    border: "1.5px solid var(--color-border)",
    color: "var(--color-text)",
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
        aria-hidden
      />

      <div>
        <label
          htmlFor="guide-name"
          className="block text-xs uppercase tracking-[0.15em] mb-2 font-semibold font-body"
          style={{ color: "var(--color-navy)", fontSize: "0.7rem" }}
        >
          First Name
        </label>
        <input
          id="guide-name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Your first name"
          maxLength={80}
          className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none transition-all duration-300"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-gold)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
        />
      </div>

      <div>
        <label
          htmlFor="guide-email"
          className="block text-xs uppercase tracking-[0.15em] mb-2 font-semibold font-body"
          style={{ color: "var(--color-navy)", fontSize: "0.7rem" }}
        >
          Email
        </label>
        <input
          id="guide-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          maxLength={255}
          className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none transition-all duration-300"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-gold)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
        />
      </div>

      <label
        className="flex items-start gap-3 cursor-pointer text-sm font-body"
        style={{ color: "var(--color-text-light)" }}
      >
        <input
          type="checkbox"
          checked={optIn}
          onChange={(e) => setOptIn(e.target.checked)}
          className="mt-1 accent-[color:var(--color-gold)]"
        />
        <span style={{ lineHeight: 1.6 }}>
          I'd like spiritual insights and occasional updates
        </span>
      </label>

      {error && (
        <p
          role="alert"
          className="text-sm font-body"
          style={{ color: "#b94a4a" }}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 font-body hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
        style={{
          background: "var(--color-gold)",
          color: "var(--color-white)",
          boxShadow: "0 2px 12px rgba(200,168,78,0.25)",
        }}
      >
        {loading ? (
          <>
            <Loader2 size={15} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            Send My Free Book <ArrowRight size={15} />
          </>
        )}
      </button>

      <p
        className="text-xs text-center font-body"
        style={{ color: "var(--color-text-light)", fontStyle: "italic" }}
      >
        Your email is respected. Unsubscribe anytime.
      </p>
    </form>
  );
}

export default function Guide() {
  useEffect(() => {
    setPageSeo({
      path: "/guide",
      title: "Free Spiritual Guide · Luz Astrology",
      description:
        "Receive your free Spiritual Guide from Luz Astrology — natal chart wisdom, spiritual seasons, and biblical reflection delivered to your inbox.",
    });
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-bg)", color: "var(--color-text)" }}
    >
      <Navbar />

      {/* SINGLE FOCUSED SECTION */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT: visual mockup */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 lg:order-1"
            >
              <GuideMockup />
            </motion.div>

            {/* RIGHT: lead capture */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 lg:order-2"
            >
              {/* Eyebrow */}
              <p
                className="text-[0.65rem] tracking-[0.28em] uppercase font-semibold mb-3 font-body"
                style={{ color: "var(--color-gold)" }}
              >
                Complimentary Spiritual Book
              </p>

              {/* Headline */}
              <h1
                className="font-heading font-light mb-4"
                style={{
                  fontSize: "clamp(1.75rem, 3.2vw, 2.4rem)",
                  color: "var(--color-navy)",
                  lineHeight: 1.15,
                }}
              >
                Receive Your Free Spiritual Book
              </h1>

              {/* Subtext */}
              <p
                className="font-body mb-6"
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  color: "var(--color-text-light)",
                  fontStyle: "italic",
                  fontFamily: "var(--font-serif)",
                  fontWeight: 300,
                }}
              >
                Begin your journey with <em>“Spiritual Astrology &amp; God’s Voice and Purposes in the Stars”</em> — a thoughtful guide for truth-seeking hearts exploring spiritual insight, biblical reflection, and meaning written in the heavens.
              </p>

              {/* Bullets */}
              <ul className="space-y-3 mb-8">
                {[
                  "Learn foundational spiritual astrology",
                  "Understand seasons, purpose, and alignment",
                  "Receive biblical reflection + spiritual wisdom",
                ].map((text, i) => (
                  <motion.li
                    key={text}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <span
                      className="flex items-center justify-center w-5 h-5 rounded-full text-xs"
                      style={{
                        background: "rgba(200,168,78,0.12)",
                        color: "var(--color-gold)",
                      }}
                    >
                      <Check size={12} />
                    </span>
                    <span
                      className="font-body text-sm"
                      style={{ color: "var(--color-text)" }}
                    >
                      {text}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Form */}
              <LeadForm />

              {/* Trust line */}
              <p
                className="text-xs text-center mt-5 font-body"
                style={{ color: "var(--color-text-light)", fontStyle: "italic" }}
              >
                Join seekers receiving thoughtful spiritual insight.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
