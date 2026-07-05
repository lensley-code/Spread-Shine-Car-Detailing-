import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { setPageSeo } from "@/lib/seo";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

type State =
  | "validating"
  | "ready"
  | "saving"
  | "saved"
  | "unsubscribing"
  | "unsubscribed"
  | "already"
  | "invalid"
  | "error";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: i * 0.1,
    },
  }),
};

const PREFERENCE_OPTIONS = [
  {
    id: "spiritual_insights",
    label: "Spiritual insights & reflections",
    description: "Thoughtful notes on seasons, alignment, and faith.",
  },
  {
    id: "guide_releases",
    label: "New guide releases",
    description: "Be first to know when new spiritual guides go out.",
  },
  {
    id: "reading_updates",
    label: "Reading updates / offerings",
    description: "Occasional updates about new sessions and openings.",
  },
] as const;

export default function Unsubscribe() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>("validating");
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    spiritual_insights: true,
    guide_releases: true,
    reading_updates: true,
  });

  useEffect(() => {
    setPageSeo({
      path: "/unsubscribe",
      title: "Manage Your Email Preferences · Luz Astrology",
      description:
        "Manage your Luz Astrology email preferences or unsubscribe at any time.",
    });
  }, []);

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } },
        );
        const data = await res.json();
        if (data?.valid) {
          if (data.preferences) {
            setPrefs({
              spiritual_insights: data.preferences.spiritual_insights !== false,
              guide_releases: data.preferences.guide_releases !== false,
              reading_updates: data.preferences.reading_updates !== false,
            });
          }
          if (data.already_unsubscribed) setState("already");
          else setState("ready");
        } else if (data?.reason === "already_unsubscribed") {
          setState("already");
        } else {
          setState("invalid");
        }
      } catch {
        setState("error");
      }
    })();
  }, [token]);

  const togglePref = (id: string) =>
    setPrefs((p) => ({ ...p, [id]: !p[id] }));

  const onSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    const allOff = Object.values(prefs).every((v) => !v);
    if (allOff) {
      // No preferences selected = same as full unsubscribe
      await onUnsubscribeAll();
      return;
    }
    setState("saving");
    try {
      const res = await fetch(
        `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({
            token,
            action: "save_preferences",
            preferences: prefs,
          }),
        },
      );
      const data = await res.json();
      if (data?.success) setState("saved");
      else setState("error");
    } catch {
      setState("error");
    }
  };

  const onUnsubscribeAll = async () => {
    if (!token) return;
    setState("unsubscribing");
    try {
      const res = await fetch(
        `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({ token }),
        },
      );
      const data = await res.json();
      if (data?.success) setState("unsubscribed");
      else if (data?.reason === "already_unsubscribed") setState("already");
      else setState("error");
    } catch {
      setState("error");
    }
  };

  const isInvalidState = state === "invalid" || state === "error";

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-bg)", color: "var(--color-text)" }}
    >
      <Navbar />

      {/* Hero — mirrors Contact page */}
      <section
        className="relative pt-24 pb-10 sm:pt-28 sm:pb-14 lg:pt-36 lg:pb-20 text-center overflow-hidden"
        style={{ background: "var(--color-white)" }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(200,168,78,0.08) 0%, transparent 70%)",
          }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-1/3 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(200,168,78,0.25) 50%, transparent 100%)",
          }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
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
              transition={{
                duration: 5 + (i % 4),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
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
            Email Preferences
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
            Manage Your Email Preferences
          </motion.h1>
          <motion.div
            variants={fadeUp}
            custom={2}
            className="flex items-center justify-center gap-3 mb-6"
            aria-hidden
          >
            <span
              className="block h-px w-10"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(200,168,78,0.6))",
              }}
            />
            <span style={{ color: "var(--color-gold)", fontSize: "0.85rem" }}>
              ✦
            </span>
            <span
              className="block h-px w-10"
              style={{
                background:
                  "linear-gradient(90deg, rgba(200,168,78,0.6), transparent)",
              }}
            />
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
            We respect your inbox. Update your preferences below or unsubscribe
            at any time.
          </motion.p>
        </motion.div>
      </section>

      {/* Card */}
      <section
        className="py-10 sm:py-16 lg:py-24"
        style={{ background: "var(--color-bg)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
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
                boxShadow:
                  "0 12px 40px -12px rgba(15,23,42,0.12), 0 2px 8px rgba(200,168,78,0.04)",
              }}
            >
              {state === "validating" && (
                <div className="flex flex-col items-center gap-4 py-10">
                  <Loader2
                    className="animate-spin"
                    style={{ color: "var(--color-gold)" }}
                  />
                  <p
                    className="font-body text-sm"
                    style={{ color: "var(--color-text-light)" }}
                  >
                    Verifying your link…
                  </p>
                </div>
              )}

              {(state === "ready" || state === "saving" || state === "unsubscribing") && (
                <form onSubmit={onSavePreferences} className="space-y-7">
                  <div className="space-y-4">
                    {PREFERENCE_OPTIONS.map((opt) => {
                      const checked = !!prefs[opt.id];
                      return (
                        <label
                          key={opt.id}
                          htmlFor={opt.id}
                          className="flex items-start gap-4 cursor-pointer rounded-2xl px-4 py-4 transition-all duration-300"
                          style={{
                            background: checked
                              ? "rgba(200,168,78,0.06)"
                              : "var(--color-bg)",
                            border: `1.5px solid ${
                              checked
                                ? "rgba(200,168,78,0.5)"
                                : "var(--color-border)"
                            }`,
                          }}
                        >
                          <input
                            id={opt.id}
                            type="checkbox"
                            checked={checked}
                            onChange={() => togglePref(opt.id)}
                            className="mt-1 h-4 w-4 accent-[color:var(--color-gold)] cursor-pointer"
                          />
                          <div className="flex-1">
                            <p
                              className="font-body text-sm font-semibold mb-1"
                              style={{ color: "var(--color-navy)" }}
                            >
                              {opt.label}
                            </p>
                            <p
                              className="font-body text-xs"
                              style={{
                                color: "var(--color-text-light)",
                                lineHeight: 1.6,
                              }}
                            >
                              {opt.description}
                            </p>
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={state !== "ready"}
                      className="group inline-flex items-center justify-center gap-2 rounded-full px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 font-body hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-8px_rgba(200,168,78,0.55)] disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{
                        background: "var(--color-gold)",
                        color: "var(--color-white)",
                        boxShadow: "0 2px 12px rgba(200,168,78,0.2)",
                      }}
                    >
                      {state === "saving" ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          Saving…
                        </>
                      ) : (
                        <>
                          <Sparkles size={15} />
                          Save Preferences
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={onUnsubscribeAll}
                      disabled={state !== "ready"}
                      className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 font-body hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{
                        background: "transparent",
                        color: "var(--color-navy)",
                        border: "1.5px solid var(--color-border)",
                      }}
                    >
                      {state === "unsubscribing" ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          Processing…
                        </>
                      ) : (
                        "Unsubscribe From All Emails"
                      )}
                    </button>
                  </div>

                  <p
                    className="text-xs font-body pt-1"
                    style={{
                      color: "var(--color-text-light)",
                      fontStyle: "italic",
                    }}
                  >
                    You may return anytime to update your preferences.
                  </p>
                </form>
              )}

              {state === "saved" && (
                <SuccessState
                  title="Preferences saved"
                  body="Thank you. Your email preferences have been updated."
                />
              )}

              {(state === "unsubscribed" || state === "already") && (
                <SuccessState
                  title={
                    state === "unsubscribed"
                      ? "You have been unsubscribed"
                      : "You're already unsubscribed"
                  }
                  body="You will no longer receive emails from Luz Astrology. We're grateful for the time you spent with us."
                />
              )}

              {isInvalidState && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-6"
                >
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5"
                    style={{ background: "rgba(200,168,78,0.12)" }}
                  >
                    <span
                      style={{
                        color: "var(--color-gold)",
                        fontSize: "1.5rem",
                      }}
                    >
                      ✦
                    </span>
                  </div>
                  <h2
                    className="font-heading font-light mb-3"
                    style={{ fontSize: "1.6rem", color: "var(--color-navy)" }}
                  >
                    We couldn't verify this preference link.
                  </h2>
                  <p
                    className="font-body text-sm mb-8 max-w-sm mx-auto"
                    style={{
                      lineHeight: 1.7,
                      color: "var(--color-text-light)",
                    }}
                  >
                    The link may have expired or already been used. You can
                    return home or reach out and we'll help you directly.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                      to="/"
                      className="inline-flex items-center justify-center rounded-xl px-7 py-3 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 font-body hover:-translate-y-0.5"
                      style={{
                        background: "transparent",
                        color: "var(--color-gold)",
                        border: "1.5px solid var(--color-gold)",
                      }}
                    >
                      Return Home
                    </Link>
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 font-body hover:-translate-y-0.5"
                      style={{
                        background: "var(--color-gold)",
                        color: "var(--color-white)",
                        boxShadow: "0 2px 8px rgba(200,168,78,0.15)",
                      }}
                    >
                      Contact Support <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function SuccessState({ title, body }: { title: string; body: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-6"
    >
      <div
        className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5"
        style={{ background: "rgba(200,168,78,0.12)" }}
      >
        <CheckCircle2 size={28} style={{ color: "var(--color-gold)" }} />
      </div>
      <h2
        className="font-heading font-light mb-3"
        style={{ fontSize: "1.75rem", color: "var(--color-navy)" }}
      >
        {title}
      </h2>
      <p
        className="font-body text-sm mb-8 max-w-sm mx-auto"
        style={{ lineHeight: 1.7, color: "var(--color-text-light)" }}
      >
        {body}
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-xl px-7 py-3 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 font-body hover:-translate-y-0.5"
        style={{
          background: "transparent",
          color: "var(--color-gold)",
          border: "1.5px solid var(--color-gold)",
        }}
      >
        Return Home
      </Link>
    </motion.div>
  );
}