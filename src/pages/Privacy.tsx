import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { setPageSeo } from "@/lib/seo";

interface PrivacySection {
  number: number;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  afterBullets?: string;
}

const sections: PrivacySection[] = [
  {
    number: 1,
    heading: "Information We Collect",
    paragraphs: [
      "We only collect the information needed to provide you with a meaningful, personalized experience. This may include your name, email address, date and place of birth (when relevant to a reading), and any details you choose to share when contacting us or booking a session.",
    ],
  },
  {
    number: 2,
    heading: "How We Use Your Information",
    paragraphs: [
      "Your information helps us prepare your readings, respond to your questions, and keep you informed about your bookings. We use it solely to deliver the services you have requested and to maintain a thoughtful, personal experience.",
    ],
  },
  {
    number: 3,
    heading: "Email & Newsletter Signups",
    paragraphs: [
      "If you join our email list or download a free guide, we will send you occasional updates, reflections, and astrological insights. You can unsubscribe at any time using the link at the bottom of any email — no questions asked.",
    ],
  },
  {
    number: 4,
    heading: "Booking & Payment Information",
    paragraphs: [
      "Payments are processed securely through trusted third-party providers (such as Stripe). We never see, store, or have access to your full credit card details. Only the information necessary to confirm and manage your booking is retained on our side.",
    ],
  },
  {
    number: 5,
    heading: "Cookies & Website Analytics",
    paragraphs: [
      "Our website uses basic cookies and analytics tools to understand how visitors interact with our pages. This helps us improve the experience and ensure things run smoothly. The data collected is anonymous and is never used to identify you personally.",
    ],
  },
  {
    number: 6,
    heading: "How We Protect Your Information",
    paragraphs: [
      "We take your privacy seriously and use industry-standard practices to keep your information safe. Sensitive data is encrypted in transit, access is limited, and we never sell or rent your personal details to anyone — ever.",
    ],
  },
  {
    number: 7,
    heading: "Third-Party Services",
    intro: "We rely on a small number of trusted services to run our practice, including:",
    bullets: [
      "Email delivery and newsletter providers",
      "Secure payment processors (such as Stripe)",
      "Scheduling and video tools used for sessions (such as Zoom)",
      "Privacy-friendly website analytics",
    ],
    afterBullets:
      "Each of these providers maintains their own privacy practices, and we only share the minimum information required to deliver the service.",
  } as PrivacySection & { intro?: string },
  {
    number: 8,
    heading: "Your Choices",
    paragraphs: [
      "You are always in control of your information. You can request to update or delete your details, unsubscribe from emails, or ask any question about how your data is handled. We will respond promptly and respectfully.",
    ],
  },
  {
    number: 9,
    heading: "Contact Us",
    paragraphs: [
      "If you have any questions about this Privacy Policy or how your information is used, please reach out at support@luz-astrology.com. We are happy to clarify anything and to make sure you feel completely at ease.",
    ],
  },
];

function SectionCard({ section }: { section: PrivacySection & { intro?: string } }) {
  return (
    <div
      className="rounded-xl overflow-hidden px-6 py-6 sm:px-8 sm:py-8"
      style={{
        background: "#FFFDF9",
        border: "1px solid rgba(200, 168, 78, 0.15)",
        boxShadow: "0 1px 2px rgba(36,52,90,0.04), 0 12px 32px -16px rgba(36,52,90,0.10)",
      }}
    >
      <p
        className="text-xs uppercase tracking-[0.25em] mb-3 font-semibold font-body"
        style={{ color: "var(--color-gold)", fontSize: "0.65rem" }}
      >
        Section {section.number}
      </p>
      <h3
        className="font-heading font-light mb-4"
        style={{ fontSize: "clamp(1.15rem, 2.5vw, 1.5rem)", color: "var(--color-navy)" }}
      >
        {section.heading}
      </h3>

      {section.intro && (
        <p
          className="font-body text-sm leading-relaxed mb-4"
          style={{ lineHeight: 1.85, color: "var(--color-text-light)" }}
        >
          {section.intro}
        </p>
      )}

      {section.paragraphs?.map((p, i) => (
        <p
          key={i}
          className="font-body text-sm sm:text-[0.95rem] leading-relaxed mb-4 last:mb-0"
          style={{ lineHeight: 1.85, color: "var(--color-text-light)" }}
        >
          {p}
        </p>
      ))}

      {section.bullets && (
        <ul className="list-none space-y-2 pl-1 mb-4">
          {section.bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-2 font-body text-sm sm:text-[0.95rem]"
              style={{ lineHeight: 1.85, color: "var(--color-text-light)" }}
            >
              <span style={{ color: "var(--color-gold)" }} className="mt-0.5 shrink-0">✦</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {section.afterBullets && (
        <p
          className="font-body text-sm sm:text-[0.95rem] leading-relaxed"
          style={{ lineHeight: 1.85, color: "var(--color-text-light)" }}
        >
          {section.afterBullets}
        </p>
      )}
    </div>
  );
}

const Privacy = () => {
  useEffect(() => {
    setPageSeo({
      path: "/privacy",
      title: "Privacy Policy · Luz Astrology",
      description:
        "How Luz Astrology collects, uses, and protects your personal information — written with care, clarity, and respect.",
    });
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#F8F5EF", color: "var(--color-text)" }}>
      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-28 pb-14 lg:pt-36 lg:pb-20 text-center overflow-hidden"
        style={{ background: "#FFFDF9" }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(600px 300px at 50% 30%, rgba(200,168,78,0.10), transparent 70%), radial-gradient(800px 400px at 50% 80%, rgba(44,62,107,0.04), transparent 70%)",
          }}
        />
        <div className="relative container mx-auto px-6 lg:px-8 max-w-3xl">
          <p
            className="text-sm tracking-[0.25em] uppercase mb-4 font-semibold font-body"
            style={{ color: "var(--color-gold)", fontSize: "0.7rem" }}
          >
            Your Privacy Matters
          </p>
          <h1
            className="font-heading font-light mb-4"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", color: "var(--color-navy)" }}
          >
            Privacy Policy
          </h1>
          <div className="flex items-center justify-center gap-3 mb-5" aria-hidden>
            <span
              style={{
                height: "1px",
                width: "48px",
                background: "linear-gradient(90deg, transparent, rgba(200,168,78,0.5), transparent)",
              }}
            />
            <span style={{ color: "var(--color-gold)", fontSize: "0.85rem" }}>✦</span>
            <span
              style={{
                height: "1px",
                width: "48px",
                background: "linear-gradient(90deg, transparent, rgba(200,168,78,0.5), transparent)",
              }}
            />
          </div>
          <p
            className="font-body max-w-lg mx-auto"
            style={{
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "var(--color-text-light)",
              fontStyle: "italic",
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
            }}
          >
            Your trust means everything. This page explains — simply and clearly — how your
            information is collected, used, and kept safe at Luz Astrology.
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="pb-16 lg:pb-24 pt-10 lg:pt-14" style={{ background: "#F8F5EF" }}>
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl space-y-8">
          {sections.map((section) => (
            <SectionCard key={section.number} section={section} />
          ))}

          {/* Disclaimer */}
          <p
            className="font-body text-xs sm:text-sm text-center max-w-xl mx-auto pt-4"
            style={{ color: "var(--color-text-light)", opacity: 0.8, fontStyle: "italic", lineHeight: 1.7 }}
          >
            This policy is provided for general informational purposes and may be updated as Luz
            Astrology's services evolve.
          </p>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="pb-20 lg:pb-28" style={{ background: "var(--color-bg)" }}>
        <div className="container mx-auto px-6 lg:px-8 max-w-2xl text-center">
          <h2
            className="font-heading font-light mb-4"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "var(--color-navy)" }}
          >
            Still have questions?
          </h2>
          <p
            className="font-body mb-10 max-w-md mx-auto"
            style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--color-text-light)" }}
          >
            If anything here is unclear, reach out anytime. We are happy to walk you through it.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-lg px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 font-body hover:-translate-y-0.5"
            style={{
              minHeight: "48px",
              background: "var(--color-gold)",
              color: "var(--color-white)",
              border: "1.5px solid var(--color-gold)",
              boxShadow: "0 2px 8px rgba(200,168,78,0.15)",
            }}
          >
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;