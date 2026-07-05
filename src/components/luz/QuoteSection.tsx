import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail, Globe, MapPin, Clock, Check } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const serviceOptions = [
  "Auto Detailing",
  "Home Exterior Cleaning",
  "Roof Cleaning",
  "Driveway Cleaning",
  "House Washing",
  "Painting",
  "Lawn Care",
  "Oil Change",
  "Brake Pad Replacement",
  "Other",
];

const trustBadges = ["Fast Response", "Free Estimates", "Honest Pricing", "Professional Service"];

const PHONE = "(954) 204-6940";
const PHONE_HREF = "tel:9542046940";
const EMAIL = "jhonnyjb@sospreadshine.com";
const WEBSITE = "www.sospreadshine.com";

const quoteSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(7, "Valid phone required").max(30),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
  service: z.string().min(1, "Select a service"),
  address: z.string().trim().max(200).optional(),
  message: z.string().trim().max(2000).optional(),
});

const InfoRow = ({
  icon, label, children, last,
}: { icon: React.ReactNode; label: string; children: React.ReactNode; last?: boolean }) => (
  <div className={`py-5 ${last ? "" : "border-b border-border"}`}>
    <div className="flex items-start gap-3">
      <div className="w-11 h-11 shrink-0 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-1">{label}</p>
        <div className="text-sm sm:text-base font-medium">{children}</div>
      </div>
    </div>
  </div>
);

const QuoteSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", address: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    const parsed = quoteSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message ?? "Please review the form.");
      return;
    }
    setSubmitting(true);
    try {
      const composedMessage = [
        `Service Needed: ${form.service}`,
        `Phone: ${form.phone}`,
        form.address ? `Property Address: ${form.address}` : null,
        "",
        form.message || "(No additional message provided)",
      ].filter(Boolean).join("\n");
      const payload = {
        name: form.name.trim(),
        email: (form.email.trim() || `noreply+${Date.now()}@sospreadshine.local`).toLowerCase(),
        topic: form.service,
        message: composedMessage,
      };
      const { error } = await supabase.functions.invoke("submit-contact", { body: payload });
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error("[quote] submit failed", err);
      toast.error("Could not send your request. Please call (954) 204-6940 directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase =
    "w-full rounded-xl px-4 py-3.5 min-h-[52px] font-body text-base sm:text-sm outline-none transition-all duration-200 bg-white border border-[#E7E7E7] text-[#1F2937] placeholder:text-[#9CA3AF] focus:border-primary focus:ring-2 focus:ring-primary/25";
  const labelBase =
    "block text-sm mb-2 font-medium text-[#374151]";


  return (
    <section id="quote" className="surface-white relative py-16 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-10">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <p className="text-primary text-[11px] sm:text-xs tracking-[0.35em] uppercase font-semibold mb-4">
            Get In Touch
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-5">
            Request Your <span className="text-primary">Free Quote</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Tell us a little about your project and we'll get back to you with a free, no-obligation quote.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-6 sm:p-9 bg-white border border-[#E7E7E7] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]"
          >
            {!submitted ? (
              <>
                {/* Phone callout */}
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-4 rounded-2xl border border-primary/30 bg-primary/5 px-4 py-3.5 mb-6 hover:bg-primary/10 transition-colors"
                >
                  <span className="inline-flex w-11 h-11 shrink-0 items-center justify-center rounded-full bg-primary/15">
                    <Phone size={18} className="text-primary" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-xs text-[#6B7280]">Need a faster response?</span>
                    <span className="block text-base font-semibold text-[#1F2937]">Call (954) 204-6940</span>
                  </span>
                  <ArrowRight size={18} className="text-primary shrink-0" />
                </a>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="q-name" className={labelBase}>Name</label>
                    <input id="q-name" name="name" type="text" required maxLength={100}
                      autoComplete="name"
                      value={form.name} onChange={handleChange} className={inputBase} placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="q-phone" className={labelBase}>Phone number</label>
                    <input id="q-phone" name="phone" type="tel" required maxLength={30}
                      inputMode="tel" autoComplete="tel"
                      value={form.phone} onChange={handleChange} className={inputBase} placeholder="(555) 555-5555" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="q-email" className={labelBase}>Email address <span className="text-[#9CA3AF] font-normal">(optional)</span></label>
                    <input id="q-email" name="email" type="email" maxLength={255}
                      inputMode="email" autoComplete="email" autoCapitalize="off" spellCheck={false}
                      value={form.email} onChange={handleChange} className={inputBase} placeholder="you@email.com" />
                  </div>
                  <div>
                    <label htmlFor="q-service" className={labelBase}>What service do you need?</label>
                    <select id="q-service" name="service" required value={form.service}
                      onChange={handleChange}
                      className={`${inputBase} appearance-none cursor-pointer ${form.service ? "" : "text-[#9CA3AF]"}`}>
                      <option value="" disabled>Select a service</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt} className="text-[#1F2937] bg-white">{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="q-address" className={labelBase}>Property address <span className="text-[#9CA3AF] font-normal">(optional)</span></label>
                  <input id="q-address" name="address" type="text" maxLength={200}
                    autoComplete="street-address"
                    value={form.address} onChange={handleChange} className={inputBase} placeholder="Street, City, ZIP" />
                </div>
                <div>
                  <label htmlFor="q-message" className={labelBase}>Tell us about your project</label>
                  <textarea id="q-message" name="message" rows={4} maxLength={2000}
                    value={form.message} onChange={handleChange}
                    className={`${inputBase} resize-none min-h-[120px]`}
                    placeholder="A few details help us prepare an accurate quote..." />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="group w-full inline-flex items-center justify-center gap-2 rounded-full h-14 px-8 text-base font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70"
                >
                  {submitting ? "Sending…" : "Get My Free Quote"}
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/15 mb-5">
                  <Check className="text-primary" size={26} />
                </div>
                <h3 className="font-heading text-2xl font-semibold mb-3">Quote request received</h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  Thanks for reaching out. We'll be in touch shortly with your free, no-obligation quote.
                </p>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-5"
          >
            <div className="rounded-3xl p-6 sm:p-8 bg-card border border-border shadow-xl shadow-black/20">
              <div className="pb-6 border-b border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Phone size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold">Call Us</p>
                    <p className="font-heading text-lg font-semibold">{PHONE}</p>
                  </div>
                </div>
                <a href={PHONE_HREF}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  <Phone size={15} /> Call Now
                </a>
              </div>
              <InfoRow icon={<Mail size={18} className="text-primary" />} label="Email">
                <a href={`mailto:${EMAIL}`} className="hover:text-primary transition-colors break-all">{EMAIL}</a>
              </InfoRow>
              <InfoRow icon={<Globe size={18} className="text-primary" />} label="Website">
                <a href={`https://${WEBSITE}`} className="hover:text-primary transition-colors">{WEBSITE}</a>
              </InfoRow>
              <InfoRow icon={<MapPin size={18} className="text-primary" />} label="Service Area">
                Proudly Serving South Florida
              </InfoRow>
              <InfoRow icon={<Clock size={18} className="text-primary" />} label="Business Hours" last>
                <div className="space-y-1">
                  <div className="flex justify-between gap-4"><span>Monday–Saturday</span><span className="text-muted-foreground">8:00 AM – 6:00 PM</span></div>
                  <div className="flex justify-between gap-4"><span>Sunday</span><span className="text-muted-foreground">By Appointment</span></div>
                </div>
              </InfoRow>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {trustBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-2 rounded-xl bg-card border border-border px-4 py-3 hover:border-primary/50 transition-colors">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/15">
                    <Check size={13} className="text-primary" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium">{badge}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
