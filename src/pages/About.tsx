import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import lukePortrait from "@/assets/luke-portrait.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { setPageSeo } from "@/lib/seo";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const About = () => {
  useEffect(() => {
    setPageSeo({
      path: "/about",
      title: "About · Luz Astrology | Faith & Alignment Through the Stars",
      description:
        "Meet Luz Astrology — a faith-rooted approach to astrology, helping seekers explore clarity, meaning, and purpose through their unique design.",
    });
  }, []);
  return (
    <div className="min-h-screen" style={{ background: "#F7F5F2", color: "#1E2A38" }}>
      <Navbar />

      {/* Hero — Two Column */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
            {/* Image — Left */}
            <motion.div
              className="lg:col-span-2 flex justify-center lg:justify-start"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeUp}
            >
              <div
                className="relative overflow-hidden rounded-2xl w-full max-w-[380px] transition-transform duration-500 hover:scale-[1.03]"
                style={{
                  boxShadow: "0 20px 50px -14px rgba(0,0,0,0.18)",
                }}
              >
                <img
                  src={lukePortrait}
                  alt="Luke — Christian Astrologer"
                  className="w-full h-auto object-cover aspect-[3/4] object-[50%_15%]"
                />
              </div>
            </motion.div>

            {/* Text — Right */}
            <motion.div
              className="lg:col-span-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.15}
              variants={fadeUp}
            >
              <p
                className="text-xs uppercase tracking-[0.2em] mb-4 font-semibold"
                style={{ fontFamily: "var(--font-sans)", color: "#C8A84E" }}
              >
                Learn More
              </p>
              <h1
                className="font-light leading-tight mb-6"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(32px, 4vw, 44px)",
                  color: "#1E2A38",
                  lineHeight: 1.15,
                }}
              >
                A faith-rooted approach to astrology and personal insight.
              </h1>
              <p
                className="max-w-[560px] mb-5"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "15.5px",
                  lineHeight: 1.75,
                  color: "#5F6B7A",
                }}
              >
                Welcome to your new journey of revelation and insight. No matter your background
                spiritually, I believe God has something to say to you. My name is Luke and I am
                a Christian astrologer.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* My Belief */}
      <section className="py-16 lg:py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <h2
              className="font-light mb-8"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(28px, 3.5vw, 40px)",
                color: "#1E2A38",
                lineHeight: 1.2,
              }}
            >
              God has written your story in the stars.
            </h2>
            <div
              className="space-y-5"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15.5px",
                lineHeight: 1.75,
                color: "#5F6B7A",
              }}
            >
              <p>
                I believe that God has written the story of each and every one of our lives in the
                stars — and that story can be seen in your natal chart. All that is needed is your
                date and time of birth. The natal chart shows where the planets were at the exact
                moment you were born. There is a great deal that can be learned from the planetary
                positions, aspects, houses, and signs.
              </p>
              <p>
                My philosophy as a Christian astrologer — I know, rare — is rooted in the words of
                 Jesus himself, who said there will be signs in the Sun, moon, and stars. It is in
                 the scripture, so I think it should be noted and understood. God speaks through
                 his creation. So I take an approach of Christian counsel and spiritual advice
                 combined with what God is revealing about your individual life in the starry skies.
              </p>
              <p>
                I do not worship the Sun, Moon, or stars. But as the Prophets, Sages, Patriarchs,
                and Men of God of old — let us understand God's message to us through his creation,
                alongside the holy scriptures he has given us for self-edification.
              </p>
            </div>

            {/* Scripture Quote */}
            <blockquote
              className="mt-12 py-5 pl-7"
              style={{
                borderLeft: "2px solid #C8A84E",
              }}
            >
              <p
                className="italic mb-2"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "17px",
                  lineHeight: 1.7,
                  color: "#3E4A5A",
                }}
              >
                "The heavens declare the glory of God; and the firmament sheweth his handywork.
                Day unto day uttereth speech, and night unto night sheweth knowledge."
              </p>
              <cite
                className="not-italic font-medium text-sm tracking-widest"
                style={{ fontFamily: "var(--font-sans)", color: "#C8A84E" }}
              >
                — Psalm 19:1–4
              </cite>
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Training & Credentials */}
      <section
        className="py-16 lg:py-24 px-6 md:px-12"
        style={{ background: "rgba(200, 168, 78, 0.04)" }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <h2
              className="font-light mb-4"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(28px, 3.5vw, 40px)",
                color: "#1E2A38",
                lineHeight: 1.2,
              }}
            >
              Formally trained in Hellenistic and Traditional Astrology.
            </h2>
            <p
              className="mb-10 max-w-2xl"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15.5px",
                lineHeight: 1.75,
                color: "#5F6B7A",
              }}
            >
              I take my craft seriously. Astrology is one of the oldest bodies of knowledge in
              human history, and I have invested deeply in understanding its classical roots —
              not just its modern interpretations.
            </p>
          </motion.div>

          {/* Mobile: horizontal scroll cards with swipe hint */}
          <div className="relative">
            <div
              className="flex gap-5 md:grid md:grid-cols-2 mb-10 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0"
              style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
            >
              {[
                {
                  label: "Certification",
                  badge: "✦ Certified Practitioner",
                  title: "Hellenistic Astrology — Chris Brennan",
                  text: `Trained and certified through Chris Brennan's Hellenistic Astrology Course, the most comprehensive program available for the study of ancient Greek astrological techniques. Chris Brennan is the author of Hellenistic Astrology: The Study of Fate and Fortune and one of the foremost scholars of traditional astrological methods in the world today.`,
                  delay: 0.1,
                },
                {
                  label: "Studies",
                  badge: "✦ Advanced Study",
                  title: "Traditional Astrology — Demetra George",
                  text: `Studied under Demetra George, a leading scholar and teacher of ancient and traditional astrology, and author of Ancient Astrology in Theory and Practice. Her work bridges the classical texts of Hellenistic and Medieval astrology with practical modern application.`,
                  delay: 0.2,
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-2xl p-7 md:p-8 flex flex-col snap-center shrink-0 w-[85vw] md:w-auto"
                  style={{
                    background: "#ffffff",
                    border: "1px solid rgba(200,168,78,0.12)",
                    boxShadow: "0 2px 16px -4px rgba(0,0,0,0.04), 0 8px 32px -8px rgba(200,168,78,0.06)",
                  }}
                >
                  {/* Badge */}
                  <span
                    className="inline-block self-start rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-semibold mb-4"
                    style={{
                      fontFamily: "var(--font-sans)",
                      background: "rgba(200,168,78,0.08)",
                      color: "#C8A84E",
                      border: "1px solid rgba(200,168,78,0.15)",
                    }}
                  >
                    {card.badge}
                  </span>

                  <p
                    className="text-xs uppercase tracking-[0.2em] mb-2 font-semibold"
                    style={{ fontFamily: "var(--font-sans)", color: "#C8A84E" }}
                  >
                    {card.label}
                  </p>
                  <h3
                    className="mb-4 font-medium"
                    style={{
                      fontFamily: "var(--font-serif)",
                      color: "#1E2A38",
                      fontSize: "clamp(18px, 2.5vw, 22px)",
                      lineHeight: 1.3,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed flex-1"
                    style={{ fontFamily: "var(--font-sans)", color: "#5F6B7A", lineHeight: 1.75 }}
                  >
                    {card.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Swipe indicator — mobile only */}
            <div className="flex justify-center gap-2 md:hidden mt-1">
              <span className="w-6 h-1 rounded-full" style={{ background: "#C8A84E", opacity: 0.5 }} />
              <span className="w-6 h-1 rounded-full" style={{ background: "#C8A84E", opacity: 0.2 }} />
            </div>
          </div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.3}
            variants={fadeUp}
            className="max-w-3xl"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "15.5px",
              lineHeight: 1.75,
              color: "#5F6B7A",
            }}
          >
            This training grounds everything I do in the oldest and most rigorous astrological
            tradition — one that predates the modern psychological interpretations most people
            are familiar with. Hellenistic astrology is precise, systematic, and rooted in a
            worldview that sees the cosmos as an ordered, meaningful creation. That resonates
            deeply with my faith.
          </motion.p>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 lg:py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <h2
              className="font-light mb-8"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(28px, 3.5vw, 40px)",
                color: "#1E2A38",
                lineHeight: 1.2,
              }}
            >
              What working with me looks like.
            </h2>
            <div
              className="space-y-5"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15.5px",
                lineHeight: 1.75,
                color: "#5F6B7A",
              }}
            >
              <p>
                Every session is a one-on-one Zoom conversation. I prepare your birth chart in
                advance and walk you through what I see — your strengths, your patterns, the
                season of life you may be moving through, and what the current planetary movements
                are activating in your chart.
              </p>
              <p>
                Sessions are conversational, not a monologue. I want you to engage, ask questions,
                and push back. I bring my faith, my training, and my genuine care for the person
                in front of me into every reading.
              </p>
              <p>
                Whether you are a lifelong believer, spiritually curious, or somewhere in between —
                I believe God has something to say to you through the story written in your chart.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 lg:py-24 px-6 md:px-12"
        style={{ background: "rgba(200, 168, 78, 0.04)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <h2
              className="font-light mb-4"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(28px, 3.5vw, 40px)",
                color: "#1E2A38",
                lineHeight: 1.2,
              }}
            >
              Not sure where to start?
            </h2>
            <p
              className="mb-10 max-w-lg mx-auto"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15.5px",
                lineHeight: 1.75,
                color: "#5F6B7A",
              }}
            >
              If you have questions about my approach — especially about faith and astrology —
              I would rather answer them directly than have you wonder. Read through the FAQ or
              reach out before you book.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/faq"
                className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-200 min-h-[48px]"
                style={{
                  fontFamily: "var(--font-sans)",
                  border: "1.5px solid #C8A84E",
                  color: "#C8A84E",
                  background: "transparent",
                }}
              >
                Read the FAQ
              </Link>
               <Link
                 to="/book"
                 className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-200 min-h-[48px]"
                 style={{
                   fontFamily: "var(--font-sans)",
                   background: "#C8A84E",
                   color: "#ffffff",
                   border: "1.5px solid #C8A84E",
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

export default About;
