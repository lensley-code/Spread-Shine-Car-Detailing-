import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, ArrowLeft, Sparkles, BookOpen } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { setPageSeo } from '@/lib/seo'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: 0.05 + i * 0.08,
    },
  }),
}

export default function GuideConfirmation() {
  const [params] = useSearchParams()
  const email = (params.get('email') || '').trim()

  useEffect(() => {
    setPageSeo({
      path: '/guide-confirmation',
      title: 'Your free book is ready · Luz Astrology',
      description:
        'Your free Luz Astrology spiritual book is ready to download.',
    })
  }, [])

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(900px 500px at 50% -10%, rgba(200,168,78,0.10), transparent 60%), radial-gradient(700px 500px at 90% 10%, rgba(91, 116, 168, 0.08), transparent 60%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1px]"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(200,168,78,0.35), transparent)',
        }}
      />

      <Navbar />

      <main className="px-5 sm:px-6 pt-20 sm:pt-28 pb-16 sm:pb-20">
        <section className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mx-auto mb-5 sm:mb-7 flex items-center justify-center"
          >
            <div
              className="relative flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(200,168,78,0.25), rgba(200,168,78,0.06) 70%)',
                border: '1px solid rgba(200,168,78,0.35)',
                boxShadow:
                  '0 0 0 6px rgba(200,168,78,0.06), 0 18px 50px -20px rgba(200,168,78,0.45)',
              }}
            >
              <Mail size={26} strokeWidth={1.6} style={{ color: 'var(--color-gold)' }} className="sm:[width:32px] sm:[height:32px]" />
              <Sparkles
                size={14}
                className="absolute"
                style={{ top: 8, right: 10, color: 'var(--color-gold)', opacity: 0.7 }}
              />
              <Sparkles
                size={10}
                className="absolute"
                style={{ bottom: 12, left: 8, color: 'var(--color-gold)', opacity: 0.55 }}
              />
            </div>
          </motion.div>

          <motion.p
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-[0.7rem] tracking-[0.28em] uppercase font-semibold mb-3"
            style={{ color: 'var(--color-gold)' }}
          >
            Your Free Book Is Ready
          </motion.p>

          <motion.h1
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-serif font-medium leading-tight mb-4"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.7rem, 5vw, 3rem)',
              color: 'var(--color-text)',
            }}
          >
            Your free book is ready
          </motion.h1>

          <motion.p
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-xl mx-auto leading-relaxed px-2"
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: '1rem',
              color: 'var(--color-text-light)',
            }}
          >
            Thank you for signing up. You can download your complimentary spiritual book below. We'll also send a copy to your inbox{email ? <> at <span style={{ color: 'var(--color-text)', fontWeight: 500 }}>{email}</span></> : ''}.
          </motion.p>

          <motion.div
            custom={3.5}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-7 sm:mt-8 flex flex-col items-center gap-3"
          >
            <Link
              to="/download/spiritual-book"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[0.82rem] sm:text-sm font-semibold tracking-wide transition-transform hover:scale-[1.02]"
              style={{
                background: 'var(--color-gold)',
                color: '#1a1a2e',
                border: '1.5px solid var(--color-gold)',
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.06em',
                boxShadow: '0 12px 30px -14px rgba(200,168,78,0.55)',
              }}
            >
              <BookOpen size={15} /> Download My Free Book <ArrowRight size={15} />
            </Link>
            <p
              className="text-xs"
              style={{
                color: 'var(--color-text-light)',
                fontFamily: 'var(--font-sans)',
                fontStyle: 'italic',
              }}
            >
              If you don't see the email, check spam or promotions.
            </p>
          </motion.div>
        </section>

        {/* Soft inbox-tip card */}
        <motion.section
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-10 sm:mt-12 max-w-2xl mx-auto"
        >
          <div
            className="rounded-2xl p-6 sm:p-8 relative overflow-hidden"
            style={{
              background: 'var(--color-white, #ffffff)',
              border: '1px solid var(--color-border)',
              boxShadow:
                '0 24px 60px -30px rgba(26, 26, 46, 0.18), 0 6px 20px -10px rgba(26,26,46,0.08)',
            }}
          >
            <div
              aria-hidden
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background:
                  'linear-gradient(90deg, transparent, var(--color-gold), transparent)',
                opacity: 0.6,
              }}
            />
            <p
              className="text-[0.65rem] tracking-[0.22em] uppercase font-semibold mb-2"
              style={{ color: 'var(--color-gold)' }}
            >
              A Small Tip
            </p>
            <h2
              className="text-xl sm:text-2xl mb-2"
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 500,
                color: 'var(--color-text)',
              }}
            >
              Can't find it?
            </h2>
            <p
              className="text-sm sm:text-base leading-relaxed"
              style={{ color: 'var(--color-text-light)', fontFamily: 'var(--font-sans)' }}
            >
              Please check your spam or promotions folder, and add Luz Astrology to your
              contacts so future insights arrive safely in your inbox.
            </p>
          </div>
        </motion.section>

        {/* Soft secondary CTA */}
        <motion.section
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-14 max-w-2xl mx-auto text-center"
        >
          <p
            className="mb-5 text-[1.02rem]"
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'var(--color-text-light)',
            }}
          >
            Ready for deeper clarity?
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3">
            <Link
              to="/book"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-transform hover:scale-[1.02]"
              style={{
                background: 'var(--color-gold)',
                color: '#1a1a2e',
                border: '1.5px solid var(--color-gold)',
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.05em',
              }}
            >
              Book a Reading <ArrowRight size={16} />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-colors"
              style={{
                background: 'transparent',
                color: 'var(--color-text)',
                border: '1.5px solid var(--color-border)',
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.05em',
              }}
            >
              <ArrowLeft size={16} /> Return Home
            </Link>
          </div>
        </motion.section>

        <motion.p
          custom={6}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-16 text-center max-w-xl mx-auto"
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '1.05rem',
            color: 'var(--color-gold)',
          }}
        >
          May your season unfold with clarity and peace.
        </motion.p>
      </main>

      <Footer />
    </div>
  )
}
