import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, MapPin, Clock, Check, ClipboardList, Search, Sparkles } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { setPageSeo } from "@/lib/seo";

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

const quoteSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(7, "Valid phone required").max(30),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
  service: z.string().min(1, "Select a service"),
  address: z.string().trim().max(200).optional(),
  message: z.string().trim().min(1, "Please share a few project details").max(2000),
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.08 },
  }),
};

const steps = [
  {
    icon: ClipboardList,
    title: "Submit your quote request",
    body: "Share a few details about the project so we understand exactly what you need.",
  },
  {
    icon: Search,
    title: "We'll review and contact you",
    body: "Our team looks over your request and reaches out to confirm the details.",
  },
  {
    icon: Sparkles,
    title: "Receive your free quote",
    body: "Get transparent pricing and schedule your service at a time that works for you.",
  },
];

const Contact = () => {
  useEffect(() => {
    setPageSeo({
      path: "/contact",
      title: "Let's Talk About Your Project · SoSpreadShine",
      description:
        "Tell us about your auto detailing or home exterior cleaning project and receive a free, no-obligation quote from SoSpreadShine in South Florida.",
    });
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    address: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
        form.message,
      ]
        .filter(Boolean)
        .join("\n");

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
    "w-full rounded-xl px-4 py-3.5 font-body text-sm outline-none transition-all duration-300 bg-background border border-border text-foreground focus:border-primary focus:ring-2 focus:ring-primary/30";
  const labelBase =
    "block text-xs uppercase tracking-[0.15em] mb-2 font-semibold text-muted-foreground";

  // South Florida centered map (Fort Lauderdale / Broward area)
  const mapSrc =
    "https://www.google.com/maps?q=South+Florida&t=&z=8&ie=UTF8&iwloc=&output=embed";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-10 lg:pt-36 lg:pb-16 text-center overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 30%, hsl(46 65% 52% / 0.12) 0%, transparent 70%)",
          }}
        />
        <motion.div
          className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-3xl relative z-10"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-xs tracking-[0.25em] uppercase mb-4 font-semibold text-primary"
          >
            Get In Touch
          </motion.p>
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="font-heading font-semibold mb-5 tracking-tight"
            style={{ fontSize: "clamp(2.25rem, 5.5vw, 4rem)", lineHeight: 1.05 }}
          >
            Let's Talk About <span className="text-primary">Your Project</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            Whether you need your vehicle detailed or your home's exterior refreshed, we'd love to hear about your project.
            Tell us a little about your needs and we'll provide a free, no-obligation quote.
          </motion.p>
          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-8 flex flex-col items-center gap-1"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
              Prefer to talk?
            </p>
            <a
              href={PHONE_HREF}
              aria-label="Call SoSpreadShine at 954-204-6940"
              className="font-heading text-2xl sm:text-3xl font-semibold text-primary hover:opacity-80 transition-opacity"
            >
              {PHONE}
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Main */}
      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-[1.7fr_1fr] gap-8 lg:gap-10 items-start">
            {/* LEFT — Form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl p-6 sm:p-10 lg:p-12 bg-card border border-border shadow-2xl shadow-black/30"
            >
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className={labelBase}>Full Name *</label>
                      <input id="name" name="name" type="text" required maxLength={100}
                        value={form.name} onChange={handleChange} className={inputBase} placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelBase}>Phone Number *</label>
                      <input id="phone" name="phone" type="tel" required maxLength={30}
                        value={form.phone} onChange={handleChange} className={inputBase} placeholder="(555) 555-5555" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className={labelBase}>Service Needed *</label>
                    <select id="service" name="service" required value={form.service}
                      onChange={handleChange}
                      className={`${inputBase} appearance-none cursor-pointer ${form.service ? "" : "text-muted-foreground"}`}>
                      <option value="" disabled>Select a service</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt} className="text-foreground bg-background">{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelBase}>Project Details *</label>
                    <textarea id="message" name="message" rows={5} required maxLength={2000}
                      value={form.message} onChange={handleChange}
                      className={`${inputBase} resize-none`}
                      placeholder="Tell us a bit about your project..." />
                  </div>

                  <div className="pt-2">
                    <p className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground mb-4">
                      Optional
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className={labelBase}>Email Address</label>
                        <input id="email" name="email" type="email" maxLength={255}
                          value={form.email} onChange={handleChange} className={inputBase} placeholder="you@email.com" />
                      </div>
                      <div>
                        <label htmlFor="address" className={labelBase}>Property Address</label>
                        <input id="address" name="address" type="text" maxLength={200}
                          value={form.address} onChange={handleChange} className={inputBase}
                          placeholder="Street, City, ZIP" />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group w-full inline-flex items-center justify-center gap-2 rounded-full px-9 py-4 text-sm font-semibold uppercase tracking-[0.1em] bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70"
                  >
                    <Send size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    {submitting ? "Sending…" : "Get My Free Quote"}
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/15 mb-5">
                    <Check className="text-primary" size={26} />
                  </div>
                  <h2 className="font-heading text-2xl font-semibold mb-3">Quote request received</h2>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                    Thanks for reaching out. We'll be in touch shortly with your free, no-obligation quote.
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* RIGHT — Contact card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-3xl p-8 sm:p-10 bg-card border border-border shadow-xl shadow-black/20"
            >
              <h2 className="font-heading text-2xl font-semibold mb-8 tracking-tight">
                Need Help Right Away?
              </h2>

              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <Phone size={22} className="text-primary" />
                </div>
                <a
                  href={PHONE_HREF}
                  aria-label="Call SoSpreadShine at 954-204-6940"
                  className="font-heading text-2xl font-semibold mb-6 hover:text-primary transition-colors"
                >
                  {PHONE}
                </a>
                <a
                  href={PHONE_HREF}
                  aria-label="Call SoSpreadShine at 954-204-6940"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold uppercase tracking-[0.1em] bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Phone size={15} /> Call Now
                </a>
                <p className="text-xs text-muted-foreground mt-4 italic">
                  Usually responds within one business day.
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-border space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Proudly Serving South Florida</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-primary shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Monday–Saturday</p>
                    <p className="text-muted-foreground">8:00 AM – 6:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xs tracking-[0.25em] uppercase mb-3 font-semibold text-primary">
              The Process
            </p>
            <h2
              className="font-heading font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.15 }}
            >
              What Happens Next?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative rounded-3xl p-8 bg-card border border-border text-center"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-5">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] font-semibold text-primary mb-2">
                    Step {i + 1}
                  </p>
                  <h3 className="font-heading text-lg font-semibold mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-sm text-muted-foreground mt-10 italic"
          >
            Most inquiries receive a response within one business day.
          </motion.p>
        </div>
      </section>

      {/* Map */}
      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <p className="text-xs tracking-[0.25em] uppercase mb-3 font-semibold text-primary">
              Service Area
            </p>
            <h2
              className="font-heading font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.15 }}
            >
              Proudly Serving South Florida
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl overflow-hidden border border-border shadow-xl shadow-black/20"
          >
            <iframe
              title="SoSpreadShine service area in South Florida"
              src={mapSrc}
              width="100%"
              height="420"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
