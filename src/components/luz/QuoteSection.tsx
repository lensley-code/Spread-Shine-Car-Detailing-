import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MapPin, Clock, Zap, Check } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";


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

const PHONE = "(954) 204-6940";
const PHONE_HREF = "tel:9542046940";
const WHATSAPP_HREF = "https://wa.me/19542046940";

const quoteSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(7, "Valid phone required").max(30),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
  service: z.string().min(1, "Select a service"),
  address: z.string().trim().max(200).optional(),
  message: z.string().trim().min(1, "Please tell us about your project").max(2000),
});



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
      const payload = {
        full_name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() ? form.email.trim().toLowerCase() : undefined,
        service_needed: form.service,
        property_address: form.address.trim() || undefined,
        project_details: form.message.trim(),
      };
      const { error } = await supabase.functions.invoke("submit-quote-request", { body: payload });
      if (error) throw error;
      setForm({ name: "", phone: "", email: "", service: "", address: "", message: "" });
      setSubmitted(true);
    } catch (err) {
      console.error("[quote] submit failed", err);
      toast.error("Something went wrong. Please try again or call (954) 204-6940.");
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
                  <textarea id="q-message" name="message" rows={4} required maxLength={2000}
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

            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/15 mb-5">
                  <Check className="text-primary" size={26} />
                </div>
                <h3 className="font-heading text-2xl font-semibold mb-3">Thank you!</h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  Your quote request has been received. SoSpreadShine will contact you soon.
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
            <div className="rounded-3xl p-8 sm:p-10 bg-card border border-border shadow-xl shadow-black/20 text-center">
              <h3 className="font-heading text-2xl sm:text-3xl font-semibold mb-3">Prefer to Talk?</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 max-w-sm mx-auto">
                Need an immediate response? Give us a call and we'll be happy to help.
              </p>

              <div className="flex flex-col items-center gap-2 mb-8">
                <span className="inline-flex w-14 h-14 items-center justify-center rounded-full bg-primary/15">
                  <Phone size={22} className="text-primary" />
                </span>
                <a
                  href={PHONE_HREF}
                  aria-label="Call SoSpreadShine at 954-204-6940"
                  className="font-heading text-2xl sm:text-3xl font-semibold hover:text-primary transition-colors"
                >
                  {PHONE}
                </a>
              </div>

              <div className="flex flex-col gap-3 mb-8">
                <a
                  href={PHONE_HREF}
                  aria-label="Call SoSpreadShine at 954-204-6940"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full h-14 px-8 text-base font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Phone size={18} /> Call Now
                </a>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with SoSpreadShine on WhatsApp"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full h-14 px-8 text-base font-semibold bg-[#25D366] text-white shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <WhatsAppIcon size={18} /> Chat on WhatsApp
                </a>
              </div>

              <div className="pt-6 border-t border-border space-y-4 text-left max-w-xs mx-auto">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Proudly Serving South Florida</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-primary shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <div>Monday–Saturday</div>
                    <div className="text-muted-foreground">8:00 AM – 6:00 PM</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap size={18} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Fast Response Times</span>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
