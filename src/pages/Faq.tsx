import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { setPageSeo } from "@/lib/seo";

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

interface FaqSection {
  label: string;
  items: FaqItem[];
}

const faqSections: FaqSection[] = [
  {
    label: "The Big Question",
    items: [
      {
        question: "Can you be a Christian and practice astrology?",
        answer: (
          <div className="space-y-4">
            <p>This is the question I get most often, and it deserves an honest, direct answer.</p>
            <p>
              My faith is not separate from my practice — it is the foundation of it. I approach
              astrology as a lens for understanding the rhythms and seasons of life, not as a
              replacement for God, scripture, or prayer. The heavens that astrology studies are the
              same heavens declared in Psalm 19:1 — "The heavens declare the glory of God; the skies
              proclaim the work of his hands."
            </p>
            <p>
              I do not practice divination, fortune-telling, or any occult tradition. I do not claim
              to predict the future or override free will. What I offer is a thoughtful, spiritually
              grounded framework for self-reflection — one that helps people understand their
              tendencies, timing, and purpose more clearly.
            </p>
            <p>
              I hold my practice with humility, and I understand that not every believer will share my
              convictions on this. If you have sincere concerns or questions about faith and astrology,
              I welcome that conversation before you book.
            </p>
          </div>
        ),
      },
    ],
  },
  {
    label: "About Sessions",
    items: [
      {
        question: "What exactly happens in a session?",
        answer: (
          <div className="space-y-4">
            <p>
              Every session is a one-on-one conversation between you and me, conducted over Zoom. I
              prepare your birth chart in advance using your date, time, and place of birth, and I
              walk you through what I see — your strengths, your patterns, the seasons you may be
              moving through, and the areas of life currently activated by planetary movement.
            </p>
            <p>
              Sessions are conversational. I encourage you to ask questions, push back, and engage.
              This is not a monologue — it is a guided exploration of your chart together.
            </p>
          </div>
        ),
      },
      {
        question: "What do I need to bring to a session?",
        answer: (
          <div className="space-y-4">
            <p>Just yourself and an open mind. Before your session, I will ask for your:</p>
            <ul className="list-none space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span style={{ color: "var(--color-gold)" }} className="mt-0.5">✦</span>
                Date of birth
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "var(--color-gold)" }} className="mt-0.5">✦</span>
                Exact time of birth (check your birth certificate if unsure — this matters)
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "var(--color-gold)" }} className="mt-0.5">✦</span>
                City and country of birth
              </li>
            </ul>
            <p>
              If you do not know your exact birth time, we can still work together using a noon chart,
              though some areas of interpretation will be less precise. Let me know in your booking
              notes and I will plan accordingly.
            </p>
          </div>
        ),
      },
      {
        question: "How long is a session?",
        answer: (
          <p>
            Sessions are typically 60 minutes. Extended 90-minute sessions are available for those
            who want to go deeper — particularly for first-time clients or those navigating a
            significant life transition. Session lengths and pricing are listed on the booking page.
          </p>
        ),
      },
    ],
  },
  {
    label: "Booking & Payment",
    items: [
      {
        question: "How do I book a session?",
        answer: (
          <p>
            You can book directly through the booking page on this website. Choose your session type,
            select an available time slot, review and agree to the Terms & Conditions, and complete
            payment — all in one place. You will receive a confirmation email with your Zoom link and
            calendar invite.
          </p>
        ),
      },
      {
        question: "What forms of payment do you accept?",
        answer: (
          <p>
            All major credit and debit cards are accepted through Stripe, our secure payment
            processor. Session fees are collected at the time of booking. Gift certificates are also
            available — contact me directly for details.
          </p>
        ),
      },
      {
        question: "Can I reschedule or cancel my session?",
        answer: (
          <div className="space-y-4">
            <p>Yes, with notice. Here is a quick summary:</p>
            <ul className="list-none space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span style={{ color: "var(--color-gold)" }} className="mt-0.5">✦</span>
                Free rescheduling if done more than 48 hours before your appointment.
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "var(--color-gold)" }} className="mt-0.5">✦</span>
                $25 rescheduling fee if done within 48 hours. Email me directly.
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "var(--color-gold)" }} className="mt-0.5">✦</span>
                Full refund for cancellations made more than 48 hours in advance.
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "var(--color-gold)" }} className="mt-0.5">✦</span>
                50% refund for cancellations within 48 hours.
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "var(--color-gold)" }} className="mt-0.5">✦</span>
                No refunds for no-shows or gift certificate bookings.
              </li>
            </ul>
            <p>The full policy is available on the Terms & Conditions page.</p>
          </div>
        ),
      },
      {
        question: "What if I am late to my session?",
        answer: (
          <p>
            Please let me know ahead of time if you are running late. The session will begin at the
            scheduled time and end at the scheduled time — I cannot guarantee extra time if you arrive
            late. If you are more than 15 minutes late without any contact, the session will be
            considered a no-show. Please see the Terms & Conditions for the full lateness policy.
          </p>
        ),
      },
    ],
  },
  {
    label: "Astrology Basics",
    items: [
      {
        question: "I know nothing about astrology. Is that okay?",
        answer: (
          <p>
            Absolutely. In fact, some of my most meaningful sessions are with people who come in
            completely fresh. You do not need to know your rising sign, understand houses, or have any
            prior knowledge. I will explain everything as we go. All you need is curiosity.
          </p>
        ),
      },
      {
        question: "What is the difference between a natal chart reading and a transit reading?",
        answer: (
          <div className="space-y-4">
            <p>
              A natal chart reading is your foundation — it looks at the positions of the planets at
              the exact moment of your birth and what that reveals about your personality, strengths,
              patterns, and life path. Think of it as your cosmic blueprint.
            </p>
            <p>
              A transit reading looks at where the planets are right now and how they are interacting
              with your natal chart. It is more about timing — what themes are being activated in your
              life in this current season, and what to pay attention to.
            </p>
            <p>
              If you are new, I recommend starting with a natal chart reading. If you have had a natal
              reading before and want insight into a current situation or upcoming period, a transit
              reading may be more useful.
            </p>
          </div>
        ),
      },
      {
        question: "Is astrology a form of divination or witchcraft?",
        answer: (
          <div className="space-y-4">
            <p>
              Not in my practice. I understand why this question comes up — astrology has been
              associated with occult traditions in various cultural contexts. But astrology itself is a
              system of observation and interpretation, not a supernatural practice. I do not channel
              spirits, read tarot, cast spells, or engage with any tradition that conflicts with my
              Christian faith.
            </p>
            <p>
              My practice is rooted in the belief that God created an ordered universe, and that the
              heavens — as scripture itself acknowledges — carry meaning and speak to the nature of
              time, seasons, and human experience. I interpret that meaning through an astrological
              framework, always in submission to my faith.
            </p>
            <p>
              If you are still uncertain after reading this, I would rather you reach out and talk with
              me than book a session you are not at peace about.
            </p>
          </div>
        ),
      },
    ],
  },
];

function AccordionItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className="faq-accordion-item"
      style={{
        borderBottom: "1px solid rgba(200, 168, 78, 0.14)",
        transition: "background-color 0.25s ease, box-shadow 0.25s ease",
        background: isOpen ? "#FFFDF9" : "transparent",
        boxShadow: isOpen ? "0 8px 28px -18px rgba(36, 52, 90, 0.18)" : "none",
        borderRadius: isOpen ? "10px" : "0",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-3 text-left cursor-pointer group transition-all duration-200 hover:-translate-y-[1px] rounded-lg hover:bg-[rgba(244,239,230,0.5)]"
      >
        <span
          className="pr-4 font-heading text-lg transition-colors duration-200"
          style={{
            fontWeight: 600,
            color: isOpen ? "var(--color-gold)" : "var(--color-navy)",
          }}
        >
          {item.question}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 transition-transform duration-500 ease-out ${isOpen ? "rotate-180" : ""}`}
          style={{ color: "var(--color-gold)" }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? "1000px" : "0",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div
          className="mb-5 mt-1 mx-1 font-body text-[0.95rem]"
          style={{
            background: "linear-gradient(180deg, #F4EFE6 0%, #F2EDE4 100%)",
            borderLeft: "2px solid rgba(200, 168, 78, 0.55)",
            borderRadius: "0 10px 10px 0",
            padding: "1.5rem 1.75rem",
            lineHeight: 1.85,
            color: "#3a3a3a",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 2px rgba(36,52,90,0.04)",
          }}
        >
          {item.answer}
        </div>
      </div>
    </div>
  );
}

const Faq = () => {
  useEffect(() => {
    setPageSeo({
      path: "/faq",
      title: "FAQ · Luz Astrology | Faith & Alignment Through the Stars",
      description:
        "Answers about readings, sessions, and the spiritually grounded approach behind Luz Astrology.",
    });
  }, []);
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenIndex((prev) => (prev === key ? null : key));
  };

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
            Got Questions?
          </p>
          <h1
            className="font-heading font-light mb-4"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", color: "var(--color-navy)" }}
          >
            Frequently Asked Questions
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
            style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--color-text-light)", fontStyle: "italic", fontFamily: "var(--font-serif)", fontWeight: 300 }}
          >
            Everything you need to know before booking a session with Luz Astrology.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="pb-16 lg:pb-24 pt-8 lg:pt-12" style={{ background: "#F8F5EF" }}>
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          {faqSections.map((section, si) => (
            <div key={si} className="mb-14 last:mb-0">
              <p
                className="text-xs uppercase tracking-[0.25em] mb-6 font-semibold font-body"
                style={{ color: "var(--color-gold)", fontSize: "0.7rem", letterSpacing: "0.25em" }}
              >
                {section.label}
              </p>
              <div
                className="rounded-2xl overflow-hidden px-6"
                style={{
                  background: "#FFFDF9",
                  border: "1px solid rgba(200, 168, 78, 0.15)",
                  boxShadow:
                    "0 1px 2px rgba(36,52,90,0.04), 0 12px 32px -16px rgba(36,52,90,0.10)",
                }}
              >
                {section.items.map((item, fi) => (
                  <AccordionItem
                    key={`${si}-${fi}`}
                    item={item}
                    isOpen={openIndex === `${si}-${fi}`}
                    onToggle={() => toggleItem(`${si}-${fi}`)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="pb-20 lg:pb-28" style={{ background: "var(--color-bg)" }}>
        <div className="container mx-auto px-6 lg:px-8 max-w-2xl text-center">
          <h2
            className="font-heading font-light mb-4"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "var(--color-navy)" }}
          >
            Did not find your answer?
          </h2>
          <p
            className="font-body mb-10 max-w-md mx-auto"
            style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--color-text-light)" }}
          >
            I would rather answer your question directly than have you wonder. Send me a message
            before you book — no question is too basic or too theological.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
              Get in Touch
            </Link>
             <Link
               to="/book"
               className="inline-flex items-center justify-center rounded-lg px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 font-body hover:-translate-y-0.5"
               style={{
                 minHeight: "48px",
                 background: "transparent",
                 color: "var(--color-gold)",
                 border: "1.5px solid var(--color-gold)",
               }}
             >
               Book a Session
             </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Faq;
