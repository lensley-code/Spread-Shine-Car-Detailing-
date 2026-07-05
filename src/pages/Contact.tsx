import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram, Twitter, Send, ArrowRight, Sparkles, Heart, Clock } from "lucide-react";
import { SOCIAL_PROFILES } from "@/config/latestSocialPosts";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Inline TikTok icon (Lucide doesn't ship one) — matches Lucide style
const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { setPageSeo } from "@/lib/seo";

const inquiryOptions = [
  "Question before booking",
  "Faith & astrology — I have concerns or questions",
  "Technical issue with my appointment",
  "Gift certificates",
  "Something else",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.1 },
  }),
};

const Contact = () => {
  useEffect(() => {
    setPageSeo({
      path: "/contact",
      title: "Contact · Luz Astrology | Faith & Alignment Through the Stars",
      description:
        "Reach out to Luz Astrology for readings, questions, and spiritual guidance rooted in faith and alignment.",
    });
  }, []);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-contact", { body: form });
      if (error) throw error;
      console.log("[contact] submitted", data);
      setSubmitted(true);
    } catch (err) {
      console.error("[contact] submit failed", err);
      toast.error("Could not send your message. Please try again or email contact@luz-astrology.com directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)", color: "var(--color-text)" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-10 sm:pt-28 sm:pb-14 lg:pt-36 lg:pb-20 text-center overflow-hidden" style={{ background: "var(--color-white)" }}>
        {/* Soft radial glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(200,168,78,0.08) 0%, transparent 70%)",
          }}
        />
        {/* Animated shimmer band */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/3 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(200,168,78,0.25) 50%, transparent 100%)",
          }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Faint star particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(9)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute"
              style={{
                color: "var(--color-gold)",
                opacity: 0.12,
                fontSize: i % 3 === 0 ? "0.7rem" : "0.5rem",
                left: `${8 + i * 10}%`,
                top: `${15 + (i % 4) * 20}%`,
              }}
              animate={{ y: [0, -6, 0], opacity: [0.08, 0.22, 0.08] }}
              transition={{ duration: 5 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            >
              ✦
            </motion.span>
          ))}
        </div>

        <motion.div
          className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-3xl relative z-10"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-sm tracking-[0.25em] uppercase mb-4 font-semibold font-body"
            style={{ color: "var(--color-gold)", fontSize: "0.7rem" }}
          >
            Get in Touch
          </motion.p>
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="font-heading font-light mb-5"
            style={{
              fontSize: "clamp(2.25rem, 5.5vw, 4rem)",
              color: "var(--color-navy)",
              fontFamily: "var(--font-serif)",
              letterSpacing: "-0.01em",
              lineHeight: 1.05,
            }}
          >
            Let's Talk
          </motion.h1>
          {/* Gold divider star */}
          <motion.div
            variants={fadeUp}
            custom={2}
            className="flex items-center justify-center gap-3 mb-6"
            aria-hidden="true"
          >
            <span className="block h-px w-10" style={{ background: "linear-gradient(90deg, transparent, rgba(200,168,78,0.6))" }} />
            <span style={{ color: "var(--color-gold)", fontSize: "0.85rem" }}>✦</span>
            <span className="block h-px w-10" style={{ background: "linear-gradient(90deg, rgba(200,168,78,0.6), transparent)" }} />
          </motion.div>
          <motion.p
            variants={fadeUp}
            custom={3}
            className="font-body max-w-md mx-auto"
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.75,
              color: "var(--color-text)",
              opacity: 0.85,
              fontStyle: "italic",
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
            }}
          >
            Whether you have a question before booking, need help with your appointment, or want clarity on faith and astrology — I'm here to help.
          </motion.p>
        </motion.div>
      </section>

      {/* Main Contact Section */}
      <section className="py-10 sm:py-16 lg:py-24" style={{ background: "var(--color-bg)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid lg:grid-cols-[1fr_340px] gap-8 lg:gap-14">
            {/* Left — Form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="rounded-3xl p-6 sm:p-9 backdrop-blur-sm"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "0 12px 40px -12px rgba(15,23,42,0.12), 0 2px 8px rgba(200,168,78,0.04)",
                }}
              >
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-7">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs uppercase tracking-[0.15em] mb-2 font-semibold font-body"
                        style={{ color: "var(--color-navy)", fontSize: "0.7rem" }}
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        maxLength={100}
                        value={form.name}
                        onChange={handleChange}
                        className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none transition-all duration-300"
                        style={{
                          background: "var(--color-bg)",
                          border: "1.5px solid var(--color-border)",
                          color: "var(--color-text)",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-gold)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                        placeholder="Your name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs uppercase tracking-[0.15em] mb-2 font-semibold font-body"
                        style={{ color: "var(--color-navy)", fontSize: "0.7rem" }}
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        maxLength={255}
                        value={form.email}
                        onChange={handleChange}
                        className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none transition-all duration-300"
                        style={{
                          background: "var(--color-bg)",
                          border: "1.5px solid var(--color-border)",
                          color: "var(--color-text)",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-gold)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                        placeholder="you@email.com"
                      />
                    </div>

                    {/* Topic */}
                    <div>
                      <label
                        htmlFor="topic"
                        className="block text-xs uppercase tracking-[0.15em] mb-2 font-semibold font-body"
                        style={{ color: "var(--color-navy)", fontSize: "0.7rem" }}
                      >
                        What's this about?
                      </label>
                      <select
                        id="topic"
                        name="topic"
                        required
                        value={form.topic}
                        onChange={handleChange}
                        className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none transition-all duration-300 appearance-none cursor-pointer"
                        style={{
                          background: "var(--color-bg)",
                          border: "1.5px solid var(--color-border)",
                          color: form.topic ? "var(--color-text)" : "var(--color-text-light)",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-gold)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                      >
                        <option value="" disabled>
                          Select a topic
                        </option>
                        {inquiryOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs uppercase tracking-[0.15em] mb-2 font-semibold font-body"
                        style={{ color: "var(--color-navy)", fontSize: "0.7rem" }}
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        maxLength={2000}
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none transition-all duration-300 resize-none"
                        style={{
                          background: "var(--color-bg)",
                          border: "1.5px solid var(--color-border)",
                          color: "var(--color-text)",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-gold)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                        placeholder="What's on your mind?"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 font-body hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-8px_rgba(200,168,78,0.55)] cursor-pointer"
                      style={{
                        background: "var(--color-gold)",
                        color: "var(--color-white)",
                        boxShadow: "0 2px 12px rgba(200,168,78,0.2)",
                        opacity: submitting ? 0.7 : 1,
                      }}
                    >
                      <Send size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                      {submitting ? "Sending…" : "Send Message"}
                    </button>
                    <p
                      className="text-xs font-body mt-2"
                      style={{ color: "var(--color-text-light)", fontStyle: "italic" }}
                    >
                      I personally read every message. You'll hear back from me directly.
                    </p>
                  </form>
                ) : (
                  /* Success State */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-8"
                  >
                    <div
                      className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5"
                      style={{ background: "rgba(200,168,78,0.12)" }}
                    >
                      <span style={{ color: "var(--color-gold)", fontSize: "1.5rem" }}>✦</span>
                    </div>
                    <h2
                      className="font-heading font-light mb-3"
                      style={{ fontSize: "1.75rem", color: "var(--color-navy)" }}
                    >
                      Message received
                    </h2>
                    <p
                      className="font-body text-sm mb-8 max-w-sm mx-auto"
                      style={{ lineHeight: 1.7, color: "var(--color-text-light)" }}
                    >
                      Thank you for reaching out. I've received your message and will be in touch soon.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <Link
                        to="/faq"
                        className="inline-flex items-center justify-center rounded-xl px-7 py-3 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 font-body hover:-translate-y-0.5"
                        style={{
                          background: "transparent",
                          color: "var(--color-gold)",
                          border: "1.5px solid var(--color-gold)",
                        }}
                      >
                        View FAQ
                      </Link>
                       <Link
                         to="/book"
                         className="inline-flex items-center justify-center rounded-xl px-7 py-3 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 font-body hover:-translate-y-0.5"
                         style={{
                           background: "var(--color-gold)",
                           color: "var(--color-white)",
                           boxShadow: "0 2px 8px rgba(200,168,78,0.15)",
                         }}
                       >
                         Book a Session
                       </Link>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Right — Social */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col gap-5"
            >
              {/* Instagram Card */}
              {/* Follow Luz Astrology Card */}
              <div
                className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_-14px_rgba(15,23,42,0.18)] group"
                style={{
                  background: "var(--color-white)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(200,168,78,0.1)" }}
                  >
                    <Sparkles size={18} style={{ color: "var(--color-gold)" }} />
                  </div>
                  <div>
                    <p className="font-heading text-base font-medium" style={{ color: "var(--color-navy)" }}>
                      Follow Luz Astrology
                    </p>
                    <p className="text-xs font-body" style={{ color: "var(--color-text-light)" }}>
                      @prophluz
                    </p>
                  </div>
                </div>
                <p className="text-sm font-body mb-5" style={{ lineHeight: 1.7, color: "var(--color-text-light)" }}>
                  Astrological insight, biblical reflection, and spiritual wisdom — shared regularly across social platforms.
                </p>

                <div className="flex items-center gap-3 mb-5">
                  {[
                    { href: SOCIAL_PROFILES.instagram, label: "Instagram", icon: <Instagram size={16} /> },
                    { href: SOCIAL_PROFILES.tiktok, label: "TikTok", icon: <TikTokIcon size={16} /> },
                    { href: SOCIAL_PROFILES.x, label: "X (Twitter)", icon: <Twitter size={16} /> },
                  ].map(({ href, label, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:-translate-y-0.5"
                      style={{
                        background: "rgba(200,168,78,0.08)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-navy)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(200,168,78,0.18)";
                        e.currentTarget.style.borderColor = "rgba(200,168,78,0.5)";
                        e.currentTarget.style.color = "var(--color-gold)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(200,168,78,0.08)";
                        e.currentTarget.style.borderColor = "var(--color-border)";
                        e.currentTarget.style.color = "var(--color-navy)";
                      }}
                    >
                      {icon}
                    </a>
                  ))}
                </div>

                <a
                  href={SOCIAL_PROFILES.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] font-body transition-colors duration-300"
                  style={{ color: "var(--color-gold)" }}
                >
                  Follow Luz Astrology <ArrowRight size={13} />
                </a>
              </div>

              {/* What to Expect Card */}
              <div
                className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_-14px_rgba(15,23,42,0.18)]"
                style={{
                  background: "var(--color-white)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                }}
              >
                <p
                  className="text-xs uppercase tracking-[0.2em] font-semibold font-body mb-4"
                  style={{ color: "var(--color-gold)", fontSize: "0.68rem" }}
                >
                  What to Expect
                </p>
                <ul className="space-y-3.5">
                  {[
                    { icon: Sparkles, text: "A thoughtful, personal response" },
                    { icon: Heart, text: "Spiritually grounded guidance" },
                    { icon: Clock, text: "Replies within 2–3 business days" },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-3">
                      <span
                        className="shrink-0 mt-0.5 inline-flex items-center justify-center w-7 h-7 rounded-full"
                        style={{ background: "rgba(200,168,78,0.12)" }}
                      >
                        <Icon size={13} style={{ color: "var(--color-gold)" }} />
                      </span>
                      <span
                        className="font-body text-sm"
                        style={{ color: "var(--color-text)", lineHeight: 1.6 }}
                      >
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Orbit decoration */}
              <div className="hidden lg:flex items-center justify-center py-4">
                <motion.div
                  className="relative w-28 h-28"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{ border: "1px dashed var(--color-border)" }}
                  />
                  <div
                    className="absolute inset-3 rounded-full"
                    style={{ border: "1px dashed rgba(200,168,78,0.25)" }}
                  />
                  <motion.span
                    className="absolute text-xs"
                    style={{ color: "var(--color-gold)", top: "-4px", left: "50%", transform: "translateX(-50%)" }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    ✦
                  </motion.span>
                  <motion.span
                    className="absolute text-xs"
                    style={{ color: "var(--color-gold)", bottom: "-4px", left: "50%", transform: "translateX(-50%)" }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    ✦
                  </motion.span>
                  <motion.span
                    className="absolute text-[0.6rem]"
                    style={{ color: "var(--color-gold)", top: "50%", left: "-4px", transform: "translateY(-50%)" }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    ✦
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="pb-20 lg:pb-28 pt-4" style={{ background: "var(--color-bg)" }}>
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden text-center px-6 sm:px-12 py-14 sm:py-20"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 50% 0%, rgba(200,168,78,0.08) 0%, transparent 60%), var(--color-white)",
              border: "1px solid var(--color-border)",
              boxShadow: "0 20px 60px -30px rgba(15,23,42,0.18)",
            }}
          >
            {/* Celestial divider above heading */}
            <div className="flex items-center justify-center gap-3 mb-6" aria-hidden="true">
              <span className="block h-px w-12" style={{ background: "linear-gradient(90deg, transparent, rgba(200,168,78,0.5))" }} />
              <span style={{ color: "var(--color-gold)", fontSize: "0.85rem" }}>✦</span>
              <span className="block h-px w-12" style={{ background: "linear-gradient(90deg, rgba(200,168,78,0.5), transparent)" }} />
            </div>
            <h2
              className="font-heading font-light mb-4"
              style={{
                fontSize: "clamp(1.65rem, 3.2vw, 2.4rem)",
                color: "var(--color-navy)",
                fontFamily: "var(--font-serif)",
              }}
            >
              Not ready to reach out yet?
            </h2>
            <p
              className="font-body mb-10 max-w-md mx-auto"
              style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--color-text-light)" }}
            >
              You might find what you're looking for in the FAQ — especially if you have questions about faith and astrology.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/faq"
                className="inline-flex items-center justify-center rounded-full px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 font-body hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-8px_rgba(200,168,78,0.55)]"
                style={{
                  background: "var(--color-gold)",
                  color: "var(--color-white)",
                  border: "1.5px solid var(--color-gold)",
                  boxShadow: "0 2px 8px rgba(200,168,78,0.15)",
                }}
              >
                Read the FAQ
              </Link>
               <Link
                 to="/book"
                 className="inline-flex items-center justify-center rounded-full px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 font-body hover:-translate-y-0.5 hover:bg-[rgba(200,168,78,0.06)]"
                 style={{
                   background: "transparent",
                   color: "var(--color-gold)",
                   border: "1.5px solid var(--color-gold)",
                 }}
               >
                 Book a Session
               </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
