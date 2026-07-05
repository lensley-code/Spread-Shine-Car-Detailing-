import { useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { setPageSeo } from '@/lib/seo'
import {
  Check,
  Sparkles,
  Mail,
  CalendarPlus,
  ArrowLeft,
  Music2,
  Instagram,
  Sparkle,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  OFFERINGS,
  SERVICE_MAP,
  type ServiceId,
} from '@/components/luz/booking/bookingData'

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

const isServiceId = (v: string | null): v is ServiceId =>
  !!v && Object.prototype.hasOwnProperty.call(SERVICE_MAP, v)

/**
 * Cal.com's "Redirect on booking" forwards a number of query params, including
 * the event-type slug. Map those slugs back to our internal ServiceId.
 */
const SLUG_TO_SERVICE_ID: Record<string, ServiceId> = Object.entries(SERVICE_MAP).reduce(
  (acc, [id, svc]) => {
    const slug = svc.calLink.split('/').pop()
    if (slug) acc[slug] = id as ServiceId
    return acc
  },
  {} as Record<string, ServiceId>,
)

function resolveServiceId(params: URLSearchParams): ServiceId | null {
  const direct = params.get('service')
  if (isServiceId(direct)) return direct
  const slug =
    params.get('eventTypeSlug') ||
    params.get('eventType') ||
    params.get('event_type_slug') ||
    params.get('event')
  if (slug && SLUG_TO_SERVICE_ID[slug]) return SLUG_TO_SERVICE_ID[slug]
  return null
}

function formatDateTime(iso: string | null) {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  const date = d.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const time = d.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  })
  // Resolve a friendly TZ label
  const tz =
    Intl.DateTimeFormat(undefined, { timeZoneName: 'short' })
      .formatToParts(d)
      .find((p) => p.type === 'timeZoneName')?.value ?? ''
  return { date, time, tz }
}

function buildICS({
  title,
  start,
  end,
  description,
}: {
  title: string
  start: string
  end: string
  description: string
}) {
  const fmt = (s: string) =>
    new Date(s).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Luz Astrology//Booking//EN',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@luzastrology`,
    `DTSTAMP:${fmt(new Date().toISOString())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  return ics
}

export default function BookingConfirmed() {
  const [params] = useSearchParams()
  const resolvedServiceId = useMemo(() => resolveServiceId(params), [params])
  const startParam = params.get('startTime') || params.get('start')
  const endParam = params.get('endTime') || params.get('end')
  const guestName = (params.get('name') || params.get('guestName') || '').trim()
  const guestEmail = (params.get('email') || params.get('guestEmail') || '').trim()

  const offering = useMemo(() => {
    if (!resolvedServiceId) return null
    return OFFERINGS.find((o) => o.id === resolvedServiceId) ?? null
  }, [resolvedServiceId])

  const resolvedStart = startParam
  const resolvedEnd = endParam
  const when = formatDateTime(resolvedStart)

  useEffect(() => {
    setPageSeo({
      path: '/booking-confirmed',
      title: 'Your session is booked · Luz Astrology',
      description: 'Your Luz Astrology session is confirmed.',
    })
  }, [])

  const sessionTitle = offering?.name ?? 'Your Reading'
  const firstName = guestName ? guestName.split(/\s+/)[0] : ''

  const handleAddToCalendar = () => {
    if (!resolvedStart || !resolvedEnd) return
    const ics = buildICS({
      title: `${sessionTitle} · Luz Astrology`,
      start: resolvedStart,
      end: resolvedEnd,
      description:
        'Your session with Luz Astrology. Meeting link details will arrive by email.',
    })
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'luz-astrology-session.ics'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const canAddToCal = !!(resolvedStart && resolvedEnd)

  const nextSteps = [
    'Check your email for confirmation and meeting details.',
    'Add your session to your personal calendar.',
    'Prepare your notes and birth details ahead of time.',
  ]

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}
    >
      {/* Celestial ambient backdrop */}
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

      <main className="px-5 sm:px-6 pt-24 sm:pt-28 pb-20">
        {/* Hero */}
        <section className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mx-auto mb-7 flex items-center justify-center"
          >
            <div
              className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(200,168,78,0.25), rgba(200,168,78,0.06) 70%)',
                border: '1px solid rgba(200,168,78,0.35)',
                boxShadow:
                  '0 0 0 6px rgba(200,168,78,0.06), 0 18px 50px -20px rgba(200,168,78,0.45)',
              }}
            >
              <Check
                size={36}
                strokeWidth={2}
                style={{ color: 'var(--color-gold)' }}
              />
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
            Booking Confirmed
          </motion.p>

          <motion.h1
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-serif font-medium leading-tight mb-4"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: 'var(--color-text)',
            }}
          >
            {firstName ? `Your reading is reserved, ${firstName}` : 'Your reading is reserved'}
          </motion.h1>

          <motion.p
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-xl mx-auto leading-relaxed"
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: '1.05rem',
              color: 'var(--color-text-light)',
            }}
          >
            Thank you for booking with Luz Astrology.
            <br />
            A confirmation email and calendar invitation are on the way.
          </motion.p>
        </section>

        {/* Confirmation summary card */}
        <motion.section
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-12 max-w-2xl mx-auto"
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

            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p
                  className="text-[0.65rem] tracking-[0.22em] uppercase font-semibold mb-1.5"
                  style={{ color: 'var(--color-gold)' }}
                >
                  Selected Reading
                </p>
                <h2
                  className="text-xl sm:text-2xl"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 500,
                    color: 'var(--color-text)',
                  }}
                >
                  {sessionTitle}
                </h2>
              </div>
              {offering && (
                <span
                  className="shrink-0 px-3 py-1 rounded-full text-sm"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 500,
                    color: 'var(--color-gold)',
                    background: 'rgba(200,168,78,0.08)',
                    border: '1px solid rgba(200,168,78,0.25)',
                  }}
                >
                  {offering.price}
                </span>
              )}
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 py-4 border-t border-b"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <SummaryItem label="Date" value={when?.date ?? 'Sent to your inbox'} />
              <SummaryItem label="Time" value={when?.time ?? '—'} />
              <SummaryItem label="Timezone" value={when?.tz ?? ''} />
            </div>

            <div
              className="mt-5 flex items-start gap-3 rounded-xl p-4"
              style={{
                background: 'rgba(91, 116, 168, 0.05)',
                border: '1px solid rgba(91, 116, 168, 0.15)',
              }}
            >
              <Mail size={18} className="mt-0.5 shrink-0" style={{ color: '#5b74a8' }} />
              <div className="text-sm leading-relaxed" style={{ color: 'var(--color-text-light)' }}>
                A confirmation email is on its way{guestEmail ? <> to <span style={{ color: 'var(--color-text)', fontWeight: 500 }}>{guestEmail}</span></> : ''}. Your meeting link and any final
                details will arrive by email.
              </div>
            </div>
          </div>
        </motion.section>

        {/* Next steps checklist */}
        <motion.section
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-14 max-w-2xl mx-auto"
        >
          <SectionEyebrow>Next Steps</SectionEyebrow>
          <ul className="mt-6 space-y-3">
            {nextSteps.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl p-4"
                style={{
                  background: 'var(--color-white, #ffffff)',
                  border: '1px solid var(--color-border)',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 400,
                  color: 'var(--color-text)',
                }}
              >
                <span
                  className="mt-0.5 flex items-center justify-center w-6 h-6 rounded-full shrink-0"
                  style={{
                    background: 'rgba(200,168,78,0.1)',
                    border: '1px solid rgba(200,168,78,0.4)',
                    color: 'var(--color-gold)',
                  }}
                >
                  <Check size={13} strokeWidth={2.5} />
                </span>
                <span className="text-sm sm:text-base leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* CTAs */}
        <motion.section
          custom={7}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-14 max-w-2xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-transform hover:scale-[1.02]"
              style={{
                background: 'var(--color-gold)',
                color: '#1a1a2e',
                border: '1.5px solid var(--color-gold)',
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.05em',
              }}
            >
              <ArrowLeft size={16} /> Return Home
            </Link>

             <Link
               to="/book"
               className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-colors"
               style={{
                 background: 'transparent',
                 color: 'var(--color-text)',
                 border: '1.5px solid var(--color-border)',
                 fontFamily: 'var(--font-sans)',
                 letterSpacing: '0.05em',
               }}
             >
               <Sparkle size={16} /> Explore Services
             </Link>

            {canAddToCal && (
              <button
                onClick={handleAddToCalendar}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-colors"
                style={{
                  background: 'transparent',
                  color: 'var(--color-text)',
                  border: '1.5px solid var(--color-border)',
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '0.05em',
                }}
              >
                <CalendarPlus size={16} /> Add to Calendar
              </button>
            )}

            <a
              href="https://www.tiktok.com/@luzastrology"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-colors"
              style={{
                background: 'transparent',
                color: 'var(--color-text)',
                border: '1.5px solid var(--color-border)',
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.05em',
              }}
            >
              <Music2 size={16} /> Follow on TikTok
            </a>

            <a
              href="https://www.instagram.com/luzastrology"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-colors"
              style={{
                background: 'transparent',
                color: 'var(--color-text)',
                border: '1.5px solid var(--color-border)',
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.05em',
              }}
            >
              <Instagram size={16} /> Follow on Instagram
            </a>
          </div>
        </motion.section>

        {/* Closing line */}
        <motion.p
          custom={8}
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
            letterSpacing: '0.02em',
          }}
        >
          May this season bring clarity, wisdom, and peace.
        </motion.p>
      </main>

      <Footer />
    </div>
  )
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center sm:text-left">
      <p
        className="text-[0.6rem] tracking-[0.22em] uppercase font-semibold mb-1"
        style={{ color: 'var(--color-text-light)' }}
      >
        {label}
      </p>
      <p
        className="text-base"
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 500,
          color: 'var(--color-text)',
        }}
      >
        {value || '—'}
      </p>
    </div>
  )
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="h-px flex-1"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(200,168,78,0.4))',
        }}
      />
      <p
        className="text-[0.65rem] tracking-[0.28em] uppercase font-semibold"
        style={{ color: 'var(--color-gold)' }}
      >
        {children}
      </p>
      <span
        className="h-px flex-1"
        style={{
          background:
            'linear-gradient(90deg, rgba(200,168,78,0.4), transparent)',
        }}
      />
    </div>
  )
}