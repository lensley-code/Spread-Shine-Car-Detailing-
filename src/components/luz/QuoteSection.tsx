import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowLeft, Car, Home, Check, Phone } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const PHONE = "(954) 204-6940";
const PHONE_HREF = "tel:9542046940";
const WHATSAPP_HREF = "https://wa.me/19542046940";

const CATEGORIES = [
  { id: "Auto Detailing", label: "Auto Detailing", icon: Car },
  { id: "Exterior Home Care", label: "Exterior Home Care", icon: Home },
] as const;

const SUBS: Record<string, { question: string; options: string[] }> = {
  "Auto Detailing": {
    question: "What does your vehicle need?",
    options: ["Full Detail", "Interior", "Exterior", "Not Sure"],
  },
  "Exterior Home Care": {
    question: "What can we help clean?",
    options: ["Driveway", "Patio", "Exterior", "Other"],
  },
};

const TOTAL_STEPS = 4;

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your first name").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(30),
});

const QuoteSection = () => {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0); // 0..3, 4 = success
  const [dir, setDir] = useState(1);
  const [category, setCategory] = useState("");
  const [sub, setSub] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const go = (next: number, direction: number) => {
    setDir(direction);
    setFieldError("");
    setStep(next);
  };

  const selectCategory = (id: string) => {
    setCategory(id);
    if (sub && !SUBS[id].options.includes(sub)) setSub("");
    setTimeout(() => go(1, 1), reduceMotion ? 0 : 180);
  };

  const selectSub = (opt: string) => {
    setSub(opt);
    setTimeout(() => go(2, 1), reduceMotion ? 0 : 180);
  };

  const submit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const { error } = await supabase.functions.invoke("submit-quote-request", {
        body: {
          full_name: name.trim(),
          phone: phone.trim(),
          service_needed: `${category} — ${sub}`,
          project_details: details.trim() || "No additional details provided.",
        },
      });
      if (error) throw error;
      setDone(true);
    } catch (err) {
      console.error("[quote] submit failed", err);
      setSubmitError("We couldn't send your request. Your information is still here — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setDone(false);
    setCategory("");
    setSub("");
    setName("");
    setPhone("");
    setDetails("");
    go(0, -1);
  };

  const cardBase =
    "w-full flex items-center gap-4 rounded-2xl border border-[#E7E7E7] bg-white px-5 py-5 text-left transition-all duration-200 hover:border-primary hover:shadow-[0_8px_24px_-16px_rgba(0,0,0,0.35)] active:scale-[0.99]";
  const inputBase =
    "w-full rounded-xl px-4 py-3.5 min-h-[52px] text-base outline-none transition-all duration-200 bg-white border border-[#E7E7E7] text-[#1F2937] placeholder:text-[#9CA3AF] focus:border-primary focus:ring-2 focus:ring-primary/25";
  const primaryBtn =
    "group inline-flex w-full items-center justify-center gap-2 rounded-full h-14 px-8 text-base font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:translate-y-0";

  const variants = {
    enter: (d: number) => (reduceMotion ? { opacity: 0 } : { opacity: 0, x: d > 0 ? 28 : -28 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => (reduceMotion ? { opacity: 0 } : { opacity: 0, x: d > 0 ? -28 : 28 }),
  };

  const question = (() => {
    switch (step) {
      case 0:
        return {
          title: "What can we help you with?",
          hint: "Tell us what you need. It takes less than a minute.",
        };
      case 1:
        return { title: SUBS[category]?.question ?? "", hint: "Pick the closest option." };
      case 2:
        return {
          title: "Where should Johnny send your quote?",
          hint: "Enter the best number to reach you.",
        };
      default:
        return {
          title: "Anything you'd like Johnny to know?",
          hint: "A few details will help us understand the job.",
        };
    }
  })();

  return (
    <section id="quote" className="surface-white relative py-16 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-10">
      <div className="container mx-auto max-w-2xl">
        {!done ? (
          <>
            <div className="text-center mb-8 sm:mb-10">
              <p className="text-primary text-[11px] sm:text-xs tracking-[0.35em] uppercase font-semibold mb-4">
                Get Your Free Quote
              </p>
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.div
                  key={`head-${step}`}
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  <h2 className="font-heading text-2xl sm:text-4xl font-semibold text-[#111111] leading-tight mb-3">
                    {question.title}
                  </h2>
                  <p className="text-sm sm:text-base text-[#666666]">{question.hint}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* progress */}
            <div className="flex items-center justify-center gap-2 mb-8" aria-hidden="true">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i <= step ? "w-8 bg-primary" : "w-4 bg-[#E7E7E7]"
                  }`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.div
                key={`step-${step}`}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="space-y-3"
              >
                {step === 0 &&
                  CATEGORIES.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => selectCategory(id)}
                      className={`${cardBase} ${category === id ? "border-primary ring-2 ring-primary/20" : ""}`}
                    >
                      <span className="inline-flex w-11 h-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Icon size={20} className="text-primary" />
                      </span>
                      <span className="flex-1 text-[#111111] font-semibold text-base sm:text-lg">{label}</span>
                      <ArrowRight size={18} className="text-[#9CA3AF]" />
                    </button>
                  ))}

                {step === 1 &&
                  (SUBS[category]?.options ?? []).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => selectSub(opt)}
                      className={`${cardBase} ${sub === opt ? "border-primary ring-2 ring-primary/20" : ""}`}
                    >
                      <span className="flex-1 text-[#111111] font-medium text-base">{opt}</span>
                      <ArrowRight size={18} className="text-[#9CA3AF]" />
                    </button>
                  ))}

                {step === 2 && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const parsed = contactSchema.safeParse({ name, phone });
                      if (!parsed.success) {
                        setFieldError(parsed.error.errors[0]?.message ?? "Please review your details.");
                        return;
                      }
                      go(3, 1);
                    }}
                    className="space-y-4"
                  >
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={100}
                      autoComplete="given-name"
                      aria-label="First name"
                      placeholder="First name"
                      className={inputBase}
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength={30}
                      inputMode="tel"
                      autoComplete="tel"
                      aria-label="Phone number"
                      placeholder="(954) 555-5555"
                      className={inputBase}
                    />
                    {fieldError && <p className="text-sm text-destructive">{fieldError}</p>}
                    <button type="submit" className={primaryBtn}>
                      Continue
                      <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </form>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <textarea
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      rows={5}
                      maxLength={2000}
                      aria-label="Project details"
                      placeholder="Tell us about the vehicle or project…"
                      className={`${inputBase} resize-none min-h-[140px]`}
                    />
                    {submitError && <p className="text-sm text-destructive">{submitError}</p>}
                    <button type="button" onClick={submit} disabled={submitting} className={primaryBtn}>
                      {submitting ? "Sending…" : submitError ? "Try Again" : "Send My Request"}
                      {!submitting && (
                        <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                      )}
                    </button>
                    {!submitError && (
                      <button
                        type="button"
                        onClick={submit}
                        disabled={submitting}
                        className="w-full text-sm text-[#666666] hover:text-[#111111] transition-colors py-2"
                      >
                        Skip for now
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {step > 0 && (
              <button
                type="button"
                onClick={() => go(step - 1, -1)}
                className="mt-6 inline-flex items-center gap-1.5 text-sm text-[#666666] hover:text-[#111111] transition-colors"
              >
                <ArrowLeft size={16} /> Back
              </button>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="text-center py-6"
          >
            <motion.span
              initial={{ scale: reduceMotion ? 1 : 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.08, duration: 0.3 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/15 mb-6"
            >
              <Check className="text-primary" size={30} />
            </motion.span>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-[#111111] mb-3">You're all set.</h2>
            <p className="text-base font-medium text-[#111111] mb-2">Johnny received your request.</p>
            <p className="text-sm sm:text-base text-[#666666] max-w-sm mx-auto leading-relaxed mb-8">
              We'll reach out shortly about your {category || "service"} quote.
            </p>
            <button type="button" onClick={reset} className={`${primaryBtn} max-w-xs mx-auto`}>
              Done
            </button>
            <div className="mt-10 pt-8 border-t border-[#E7E7E7] max-w-sm mx-auto">
              <p className="text-sm text-[#666666] mb-4">Need help now?</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={PHONE_HREF}
                  aria-label={`Call SoSpreadShine at ${PHONE}`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full h-12 px-6 text-sm font-semibold border border-[#E7E7E7] bg-white text-[#232323] hover:border-primary transition-colors"
                >
                  <Phone size={17} className="text-primary" /> Call Johnny
                </a>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with SoSpreadShine on WhatsApp"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full h-12 px-6 text-sm font-semibold border border-[#E7E7E7] bg-white text-[#232323] hover:border-[#25D366] transition-colors"
                >
                  <WhatsAppIcon size={17} className="text-[#25D366]" /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default QuoteSection;
