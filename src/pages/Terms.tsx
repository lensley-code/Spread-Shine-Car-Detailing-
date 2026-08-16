import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { setPageSeo } from "@/lib/seo";

interface LegalSection {
  number: number;
  heading: string;
  intro?: string;
  bullets?: string[];
  paragraphs?: string[];
  afterBullets?: string;
}

const legalSections: LegalSection[] = [
  {
    number: 1,
    heading: "Nature of Services & Disclaimer",
    intro:
      "Luke is a Christian astrologer who provides insights, guidance, and perspective rooted in astrological principles and faith-based values. The client acknowledges the following:",
    bullets: [
      "Astrology is not a scientifically proven method. All insights and projections are interpretive in nature and intended as spiritual and reflective guidance.",
      "All consultations, readings, and related content are provided for personal enrichment, spiritual reflection, and entertainment purposes only.",
      "Luke is not a licensed therapist, financial advisor, medical professional, or legal counsel. No information provided during a consultation constitutes professional advice in any of these domains.",
      "The client is strongly encouraged to seek qualified professional guidance for any matters requiring licensed expertise, including medical, psychological, financial, or legal matters.",
    ],
  },
  {
    number: 2,
    heading: "Client Responsibility & Limitation of Liability",
    intro: "The client acknowledges and agrees that:",
    bullets: [
      "All decisions, actions, or choices made by the client based on insights or projections provided by Luke are solely the client's own responsibility.",
      "Luke and Luz Astrology shall not be held liable for any consequences, damages, losses, or adverse outcomes arising from the client's interpretation or application of any information provided.",
      "Astrological insights are inherently subject to interpretation. Luke cannot guarantee the accuracy, completeness, or future reliability of any insight, projection, or guidance offered.",
      "The client agrees to exercise independent judgment and personal discernment when considering or acting upon information received from Luz Astrology.",
    ],
  },
  {
    number: 3,
    heading: "Indemnification",
    paragraphs: [
      "The client agrees to indemnify and hold harmless Luke, Luz Astrology, its affiliates, representatives, and agents from any and all claims, demands, liabilities, damages, or expenses — including reasonable legal fees — arising out of or related to the client's use of or reliance on any consultation, service, or information provided by Luz Astrology.",
    ],
  },
  {
    number: 4,
    heading: "Rescheduling Policy",
    intro:
      "The client may reschedule a session under the following conditions:",
    bullets: [
      'Free rescheduling: Available when requested more than 48 hours prior to the scheduled appointment. Use the "Change / Cancel Appointment" link in your booking confirmation email.',
      "$25 rescheduling fee: Applies if rescheduling is requested within 48 hours of the scheduled appointment. Contact Luke directly by email for a rescheduling link.",
      "No fee: No rescheduling fee will be charged if Luke initiates the reschedule, or if a verified technological interruption affects more than one-quarter of the scheduled session time.",
    ],
  },
  {
    number: 5,
    heading: "Cancellation & Refund Policy",
    intro: "Refunds are issued according to the following schedule:",
    bullets: [
      "Full refund: Cancellations made more than 48 hours before the scheduled appointment.",
      "50% refund: Cancellations made within 48 hours of the appointment, or following a prior reschedule.",
      "No refund: Cancellations of appointments booked with gift certificates are non-refundable under any circumstances.",
    ],
    afterBullets:
      "Refunds are processed manually and may take 7–10 business days to appear. For purchases made with cryptocurrency, refunds will be issued based on the original USD value at the time of purchase. The client accepts the inherent risk associated with cryptocurrency price volatility.",
  },
  {
    number: 6,
    heading: "Lateness & No-Show Policy",
    bullets: [
      "If you anticipate being late, please notify Luke in advance. Sessions may be shortened or adjusted accordingly, with no guarantee of extension.",
      "If you are more than 5 minutes late, an email reminder will be sent. Please respond or arrive within 10 minutes of the scheduled start time to honor the remaining session.",
      "No-shows: No refund or rescheduling option is available for no-shows. A new appointment must be booked and paid in full.",
    ],
  },
  {
    number: 7,
    heading: "Confidentiality & Session Privacy",
    paragraphs: [
      "All information shared by the client during a consultation is treated with the utmost care and confidentiality. Luz Astrology will not disclose personal information shared in sessions to third parties without the client's explicit consent, except as required by law.",
      "Sessions may not be recorded by the client without prior written consent from Luke. Luke reserves the right to decline or discontinue a session that does not align with the values and mission of Luz Astrology.",
    ],
  },
  {
    number: 8,
    heading: "Governing Law & Dispute Resolution",
    paragraphs: [
      "These Terms & Conditions shall be governed by and interpreted in accordance with applicable law. In the event of any dispute arising from a consultation or service, both parties agree to first attempt resolution in good faith through direct communication before pursuing any formal legal remedy.",
    ],
  },
];

function SectionCard({ section }: { section: LegalSection }) {
  return (
    <div
      className="rounded-xl overflow-hidden px-6 py-6 sm:px-8 sm:py-8"
      style={{
        background: "var(--color-white)",
        border: "1px solid var(--color-border)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
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
          style={{ lineHeight: 1.8, color: "var(--color-text-light)" }}
        >
          {section.intro}
        </p>
      )}

      {section.bullets && (
        <ul className="space-y-3 mb-4">
          {section.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm font-body" style={{ lineHeight: 1.8, color: "var(--color-text-light)" }}>
              <span style={{ color: "var(--color-gold)" }} className="mt-0.5 shrink-0">✦</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {section.afterBullets && (
        <p
          className="font-body text-sm leading-relaxed mt-4"
          style={{ lineHeight: 1.8, color: "var(--color-text-light)" }}
        >
          {section.afterBullets}
        </p>
      )}

      {section.paragraphs?.map((p, i) => (
        <p
          key={i}
          className="font-body text-sm leading-relaxed mb-4 last:mb-0"
          style={{ lineHeight: 1.8, color: "var(--color-text-light)" }}
        >
          {p}
        </p>
      ))}
    </div>
  );
}

const Terms = () => {
  useEffect(() => {
    setPageSeo({
      path: "/terms",
      title: "Terms & Conditions · Luz Astrology",
      description:
        "Terms, conditions, and policies for sessions and services offered through Luz Astrology.",
    });
  }, []);
  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)", color: "var(--color-text)" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-14 lg:pt-36 lg:pb-20 text-center" style={{ background: "var(--color-white)" }}>
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <p
            className="text-sm tracking-[0.25em] uppercase mb-4 font-semibold font-body"
            style={{ color: "var(--color-gold)", fontSize: "0.7rem" }}
          >
            Legal Notice
          </p>
          <h1
            className="font-heading font-light mb-5"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", color: "var(--color-navy)" }}
          >
            Terms & Conditions of Service
          </h1>
          <p
            className="font-body max-w-lg mx-auto mb-4"
            style={{
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "var(--color-text-light)",
              fontStyle: "italic",
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
            }}
          >
            Please read the following terms carefully before booking a session with Luz Astrology.
          </p>
          <p
            className="font-body text-xs tracking-wide"
            style={{ color: "var(--color-text-light)", opacity: 0.7 }}
          >
            Effective Date: May, 2026 · Astrologer: Luke, Luz Astrology
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="pt-10 lg:pt-14" style={{ background: "var(--color-bg)" }}>
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <div
            className="rounded-xl px-6 py-5 sm:px-8 sm:py-6 mb-8"
            style={{
              background: "var(--color-white)",
              border: "2px solid var(--color-gold)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            <p
              className="text-xs uppercase tracking-[0.25em] mb-2 font-semibold font-body"
              style={{ color: "var(--color-gold)", fontSize: "0.65rem" }}
            >
              Age Requirement
            </p>
            <p
              className="font-body text-sm sm:text-base leading-relaxed"
              style={{ lineHeight: 1.8, color: "var(--color-navy)", fontWeight: 500 }}
            >
              All clients must be <strong>18 years of age or older</strong> to sign up for chart
              reading sessions. By booking a session with Luz Astrology, you confirm that you meet
              this age requirement.
            </p>
          </div>
          <p
            className="font-body text-sm sm:text-base leading-relaxed"
            style={{ lineHeight: 1.85, color: "var(--color-text-light)" }}
          >
            By purchasing a consultation or service with Luz Astrology, you acknowledge that you have
            read, understood, and agree to the following Terms & Conditions in their entirety. These
            terms govern the professional relationship between you and Luke, astrologer at Luz
            Astrology.
          </p>
        </div>
      </section>

      {/* Legal Sections */}
      <section className="pb-16 lg:pb-24 pt-10 lg:pt-14" style={{ background: "var(--color-bg)" }}>
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl space-y-8">
          {legalSections.map((section) => (
            <SectionCard key={section.number} section={section} />
          ))}
        </div>
      </section>

      {/* Closing Note */}
      <section className="pb-20 lg:pb-28" style={{ background: "var(--color-bg)" }}>
        <div className="container mx-auto px-6 lg:px-8 max-w-2xl text-center">
          <div
            className="rounded-xl px-6 py-8 sm:px-10 sm:py-10"
            style={{
              background: "var(--color-white)",
              border: "1px solid var(--color-border)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
            }}
          >
            <p
              className="font-body text-sm mb-3"
              style={{ lineHeight: 1.8, color: "var(--color-text-light)" }}
            >
              Questions about these terms? Reach out before booking — we're happy to clarify
              anything.
            </p>
            <p className="font-body text-xs" style={{ color: "var(--color-gold)" }}>
              lensley.stfelix@gmail.com
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
