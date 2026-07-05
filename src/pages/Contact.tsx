import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, Globe, MapPin, Clock, Check } from "lucide-react";
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

const trustBadges = [
  "Fast Response",
  "Free Estimates",
  "Honest Pricing",
  "Professional Service",
];

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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.08 },
  }),
};

const Contact = () => {
  useEffect(() => {
    setPageSeo({
      path: "/contact",
      title: "Request a Free Quote · SoSpreadShine Auto & Home Cleaning",
      description:
        "Get a free, no-obligation quote from SoSpreadShine for auto detailing, pressure washing, roof cleaning, and exterior home cleaning in South Florida.",
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
        form.message || "(No additional message provided)",
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
    "w-full rounded-xl px-4 py-3 font-body text-sm outline-none transition-all duration-300 bg-background border border-border text-foreground focus:border-primary focus:ring-2 focus:ring-primary/30";
  const labelBase =
    "block text-xs uppercase tracking-[0.15em] mb-2 font-semibold text-muted-foreground";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header */}
      <section className="relative pt-28 pb-10 lg:pt-36 lg:pb-14 text-center overflow-hidden">
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
            className="font-heading font-semibold mb-4 tracking-tight"
            style={{ fontSize: "clamp(2.25rem, 5.5vw, 4rem)", lineHeight: 1.05 }}
          >
            Request Your <span className="text-primary">Free Quote</span>
          </motion.h1>
        </motion.div>
      </section>

      {/* Main */}
      <section className="pb-16 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 items-start">
            {/* LEFT — Form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl p-6 sm:p-9 bg-card border border-border shadow-2xl shadow-black/30"
            >
              <div className="mb-8 space-y-3">
                <p className="text-lg text-primary font-medium">Ready to bring back the shine?</p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Whether you need professional auto detailing or exterior home cleaning, we're here to help.
                  Fill out the form below and we'll get back to you with a free, no-obligation quote.
                </p>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
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

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className={labelBase}>Email Address</label>
                      <input id="email" name="email" type="email" maxLength={255}
                        value={form.email} onChange={handleChange} className={inputBase} placeholder="you@email.com" />
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
                  </div>

                  <div>
                    <label htmlFor="address" className={labelBase}>Property Address</label>
                    <input id="address" name="address" type="text" maxLength={200}
                      value={form.address} onChange={handleChange} className={inputBase}
                      placeholder="Street, City, ZIP" />
                  </div>

                  <div>
                    <label htmlFor="message" className={labelBase}>Message</label>
                    <textarea id="message" name="message" rows={4} maxLength={2000}
                      value={form.message} onChange={handleChange}
                      className={`${inputBase} resize-none`}
                      placeholder="Tell us a bit about your project..." />
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

            {/* RIGHT — Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col gap-5"
            >
              <div className="rounded-3xl p-6 sm:p-8 bg-card border border-border shadow-xl shadow-black/20">
                {/* Call */}
                <div className="pb-6 border-b border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Phone size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold">Call Us</p>
                      <a
                        href={PHONE_HREF}
                        aria-label="Call SoSpreadShine at 954-204-6940"
                        className="font-heading text-lg font-semibold hover:text-primary transition-colors"
                      >
                        {PHONE}
                      </a>
                    </div>
                  </div>
                  <a
                    href={PHONE_HREF}
                    aria-label="Call SoSpreadShine at 954-204-6940"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <Phone size={15} /> Call Now
                  </a>
                </div>

                {/* Email */}
                <InfoRow icon={<Mail size={18} className="text-primary" />} label="Email">
                  <a href={`mailto:${EMAIL}`} className="hover:text-primary transition-colors break-all">
                    {EMAIL}
                  </a>
                </InfoRow>

                {/* Website */}
                <InfoRow icon={<Globe size={18} className="text-primary" />} label="Website">
                  <a href={`https://${WEBSITE}`} className="hover:text-primary transition-colors">{WEBSITE}</a>
                </InfoRow>

                {/* Service Area */}
                <InfoRow icon={<MapPin size={18} className="text-primary" />} label="Service Area">
                  Proudly Serving South Florida
                </InfoRow>

                {/* Hours */}
                <InfoRow icon={<Clock size={18} className="text-primary" />} label="Business Hours" last>
                  <div className="space-y-1">
                    <div className="flex justify-between gap-4">
                      <span>Monday–Saturday</span>
                      <span className="text-muted-foreground">8:00 AM – 6:00 PM</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Sunday</span>
                      <span className="text-muted-foreground">By Appointment</span>
                    </div>
                  </div>
                </InfoRow>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-3">
                {trustBadges.map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-2 rounded-xl bg-card border border-border px-4 py-3 hover:border-primary/50 transition-colors"
                  >
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

      {/* Final CTA */}
      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden text-center px-6 sm:px-12 py-14 sm:py-20 bg-card border border-primary/20"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 80% 70% at 50% 0%, hsl(46 65% 52% / 0.15) 0%, transparent 60%)",
            }}
          >
            <h2 className="font-heading font-semibold mb-3 tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.15 }}>
              Your Vehicle and Home Deserve the Best.
            </h2>
            <p className="text-lg sm:text-xl text-primary font-medium mb-10">
              Let's Bring Back the Shine.
            </p>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("name")?.focus();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center rounded-full px-10 py-4 text-sm font-semibold uppercase tracking-[0.1em] bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Started Today
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const InfoRow = ({
  icon,
  label,
  children,
  last,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) => (
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

export default Contact;
