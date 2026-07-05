import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Check, ChevronDown, Clock, Sparkles, ShieldCheck, Loader2 } from 'lucide-react'
import Cal from '@calcom/embed-react'
import { setPageSeo } from '@/lib/seo'
import {
  OFFERINGS,
  SERVICE_MAP,
  iconMap,
  preloadAllCalApis,
  preloadCalApi,
  type ServiceId,
} from '@/components/luz/booking/bookingData'
import TermsAgreementModal from '@/components/luz/booking/TermsAgreementModal'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const isServiceId = (v: string | null): v is ServiceId =>
  !!v && Object.prototype.hasOwnProperty.call(SERVICE_MAP, v)

type Step = 1 | 2 | 3

const STEP_LABELS: Record<1 | 2 | 3 | 4, string> = {
  1: 'Choose Reading',
  2: 'Agree to Terms',
  3: 'Pick Time',
  4: 'Confirmed',
}

const SERVICE_LENGTHS: Record<ServiceId, string> = {
  'natal-chart-reading': '60 minutes',
  'biblical-guidance': '90 minutes',
  'transits-profections': '60 minutes',
}

const INCLUDES = [
  'Personalized guidance',
  'Faith-rooted insight',
  'Live online consultation',
  'Secure booking',
]

/* ────────────── Page palette (matches /booking-confirmed) ────────────── */
const PAGE_BG = '#F8F6F1'
const CARD_BG = '#FFFFFF'
const CARD_BORDER = '#E7DFC9'
const CARD_SHADOW = '0 12px 35px rgba(34,28,17,.08)'
const TEXT = 'var(--color-text)'
const TEXT_LIGHT = 'var(--color-text-light)'
const GOLD = 'var(--color-gold)'

/* ────────────── Refined Stepper (4 steps, thin gold connector) ────────────── */
function Stepper({ current }: { current: Step }) {
  const steps: (1 | 2 | 3 | 4)[] = [1, 2, 3, 4]
  return (
    <ol className="flex items-start justify-between gap-1 sm:gap-3 max-w-2xl mx-auto px-3 sm:px-1">
      {steps.map((s, i) => {
        const completed = s < current
        const active = s === current
        const isFinal = s === 4
        return (
          <li key={s} className="flex items-start flex-1 last:flex-none min-w-0">
            <div className="flex flex-col items-center gap-2 min-w-0 w-full">
              <div
                className="flex items-center justify-center rounded-full transition-all"
                style={{
                  width: 28,
                  height: 28,
                  background: completed
                    ? GOLD
                    : active
                      ? 'rgba(200,168,78,0.10)'
                      : CARD_BG,
                  border: `1px solid ${completed || active ? GOLD : CARD_BORDER}`,
                  color: completed ? '#1a1a2e' : active ? GOLD : 'var(--color-text-light)',
                  boxShadow: active
                    ? '0 0 0 4px rgba(200,168,78,0.10)'
                    : 'none',
                }}
              >
                {completed ? (
                  <Check size={14} strokeWidth={2.5} />
                ) : (
                  <span className="text-[11px] font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>
                    {s}
                  </span>
                )}
              </div>
              <span
                className="text-[10px] sm:text-[11px] tracking-[0.05em] sm:tracking-[0.18em] uppercase text-center leading-tight break-words sm:whitespace-nowrap w-full"
                style={{
                  color: active ? GOLD : completed ? TEXT : TEXT_LIGHT,
                  fontWeight: active || completed ? 600 : 400,
                  fontFamily: 'var(--font-sans)',
                  opacity: isFinal && !completed && !active ? 0.55 : 1,
                }}
              >
                {STEP_LABELS[s]}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="hidden sm:block flex-1 mx-1 sm:mx-3"
                style={{
                  height: 1,
                  marginTop: 14,
                  background:
                    s < current
                      ? GOLD
                      : 'linear-gradient(90deg, rgba(200,168,78,0.35), rgba(200,168,78,0.12))',
                  opacity: s < current ? 0.85 : 0.5,
                }}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}

/* ────────────── Step 1: Reading option cards ────────────── */
function ChooseReading({
  selected,
  onSelect,
}: {
  selected: ServiceId | null
  onSelect: (id: ServiceId) => void
}) {
  const [expanded, setExpanded] = useState<ServiceId | null>(selected)

  return (
    <div className="space-y-3">
      {OFFERINGS.map((o) => {
        const Icon = iconMap[o.icon]
        const isSelected = selected === o.id
        const isExpanded = expanded === o.id
        return (
          <div
            key={o.id}
            className="group rounded-2xl overflow-hidden transition-all duration-300"
            style={{
              background: isSelected ? 'rgba(200,168,78,0.06)' : CARD_BG,
              border: `1px solid ${isSelected ? GOLD : CARD_BORDER}`,
              boxShadow: isSelected
                ? '0 0 0 1px rgba(200,168,78,0.4), 0 14px 40px -18px rgba(200,168,78,0.35)'
                : '0 4px 14px rgba(34,28,17,0.04)',
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow =
                  '0 12px 30px -12px rgba(200,168,78,0.25), 0 4px 14px rgba(34,28,17,0.06)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(34,28,17,0.04)'
              }
            }}
          >
            <button
              type="button"
              onClick={() => {
                onSelect(o.id)
                setExpanded(isExpanded ? null : o.id)
              }}
              className="w-full flex items-start gap-4 p-4 sm:p-5 text-left"
            >
              <span
                className="mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all"
                style={{
                  border: `2px solid ${isSelected ? GOLD : 'rgba(107,107,107,0.35)'}`,
                }}
              >
                {isSelected && (
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: GOLD }}
                  />
                )}
              </span>

              <span
                className="hidden sm:flex flex-shrink-0 w-10 h-10 rounded-full items-center justify-center transition-colors"
                style={{
                  background: isSelected ? 'rgba(200,168,78,0.12)' : 'rgba(34,28,17,0.04)',
                  color: isSelected ? GOLD : TEXT_LIGHT,
                }}
              >
                {Icon && <Icon size={18} strokeWidth={1.5} />}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <h3
                    className="leading-tight"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 500,
                      fontSize: '1.2rem',
                      color: TEXT,
                    }}
                  >
                    {o.name}
                  </h3>
                  <span
                    className="text-base sm:text-lg font-semibold"
                    style={{ color: GOLD, fontFamily: 'var(--font-serif)' }}
                  >
                    {o.price}
                  </span>
                  {o.featured && (
                    <span
                      className="ml-1 text-[10px] tracking-[0.18em] uppercase font-semibold rounded-full px-2 py-0.5"
                      style={{
                        color: GOLD,
                        border: `1px solid ${GOLD}`,
                        background: 'rgba(200,168,78,0.06)',
                      }}
                    >
                      Recommended
                    </span>
                  )}
                </div>
                <p
                  className="mt-1.5 text-sm leading-relaxed line-clamp-2"
                  style={{ color: TEXT_LIGHT }}
                >
                  {o.description}
                </p>
              </div>

              <ChevronDown
                size={18}
                className="flex-shrink-0 mt-1 transition-transform duration-300"
                style={{
                  color: isExpanded ? GOLD : TEXT_LIGHT,
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ${
                isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className="px-5 pb-5 sm:pl-[4.75rem] sm:pr-12"
                  style={{ borderTop: `1px solid ${CARD_BORDER}` }}
                >
                  <ul className="space-y-1.5 pt-4">
                    {o.features.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm"
                        style={{ color: TEXT }}
                      >
                        <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: GOLD }} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ────────────── Step 2: Terms ────────────── */
function TermsStep({
  accepted,
  onOpenModal,
  serviceName,
}: {
  accepted: boolean
  onOpenModal: () => void
  serviceName?: string
}) {
  return (
    <div className="space-y-5">
      <div
        className="rounded-2xl p-6 sm:p-8 space-y-5"
        style={{
          background: CARD_BG,
          border: `1px solid ${CARD_BORDER}`,
          boxShadow: '0 4px 14px rgba(34,28,17,0.04)',
        }}
      >
        <div>
          <h3
            className="mb-2"
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              fontSize: '1.5rem',
              color: TEXT,
            }}
          >
            Review & accept our Terms
          </h3>
          <p
            className="text-sm sm:text-base leading-relaxed"
            style={{ color: TEXT_LIGHT, fontFamily: 'var(--font-serif)' }}
          >
            Before continuing, please review and accept our Terms & Conditions
            {serviceName ? (
              <>
                {' '}for <span style={{ color: TEXT, fontWeight: 500 }}>{serviceName}</span>
              </>
            ) : null}
            .
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <button
            type="button"
            onClick={onOpenModal}
            className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors"
            style={{
              background: 'rgba(200,168,78,0.08)',
              border: `1px solid ${GOLD}`,
              color: GOLD,
              fontFamily: 'var(--font-sans)',
              letterSpacing: '0.04em',
            }}
          >
            {accepted ? 'Review Terms again' : 'Review Terms & Conditions'}
          </button>

          {accepted && (
            <span
              className="inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: GOLD }}
            >
              <Check size={16} strokeWidth={2.5} />
              Terms accepted
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

/* ────────────── Step 3: Calendar (luxury Cal embed shell) ────────────── */
function PickTimeStep({ serviceId }: { serviceId: ServiceId }) {
  const svc = SERVICE_MAP[serviceId]
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    preloadCalApi(svc.namespace).then((cal) => {
      if (cancelled) return
      const onReady = () => setReady(true)
      cal('on', { action: 'linkReady', callback: onReady })
      cal('on', { action: '__windowLoadComplete', callback: onReady })
    })
    return () => {
      cancelled = true
    }
  }, [svc.namespace, serviceId])

  return (
    <div className="space-y-5">
      <div
        className="rounded-2xl overflow-hidden relative"
        style={{
          background: CARD_BG,
          border: `1px solid ${CARD_BORDER}`,
          boxShadow: CARD_SHADOW,
          minHeight: 640,
          padding: 8,
        }}
      >
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)',
            opacity: 0.55,
          }}
        />
        {!ready && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{ color: TEXT_LIGHT }}
          >
            <Loader2 className="animate-spin" size={28} style={{ color: GOLD }} />
            <p className="text-sm" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              Loading your calendar…
            </p>
          </div>
        )}
        <div
          style={{
            opacity: ready ? 1 : 0,
            transition: 'opacity 0.3s ease',
            borderRadius: 18,
            overflow: 'hidden',
          }}
        >
          <Cal
            namespace={svc.namespace}
            calLink={svc.calLink}
            config={{
              layout: 'month_view',
              useSlotsViewOnSmallScreen: 'true',
            }}
            style={{ width: '100%', height: '100%', minHeight: 624, overflow: 'auto' }}
          />
        </div>
      </div>
    </div>
  )
}

/* ────────────── Sticky Summary Panel ────────────── */
function SummaryPanel({ serviceId }: { serviceId: ServiceId | null }) {
  const offering = serviceId ? OFFERINGS.find((o) => o.id === serviceId) : null
  const Icon = offering ? iconMap[offering.icon] : null

  return (
    <aside className="hidden lg:block">
      <div
        className="sticky top-28 rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: CARD_BG,
          border: `1px solid ${CARD_BORDER}`,
          boxShadow: CARD_SHADOW,
        }}
      >
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)',
            opacity: 0.55,
          }}
        />
        <p
          className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-4"
          style={{ color: GOLD, fontFamily: 'var(--font-sans)' }}
        >
          Your Booking
        </p>

        {offering ? (
          <>
            <div className="flex items-start gap-3 mb-5">
              <span
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(200,168,78,0.12)', color: GOLD }}
              >
                {Icon && <Icon size={18} strokeWidth={1.5} />}
              </span>
              <div className="min-w-0">
                <h4
                  className="leading-tight"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 500,
                    fontSize: '1.15rem',
                    color: TEXT,
                  }}
                >
                  {offering.name}
                </h4>
                <div className="flex items-center gap-3 mt-1 text-sm">
                  <span
                    style={{ color: GOLD, fontWeight: 600, fontFamily: 'var(--font-serif)' }}
                  >
                    {offering.price}
                  </span>
                  <span
                    className="inline-flex items-center gap-1"
                    style={{ color: TEXT_LIGHT }}
                  >
                    <Clock size={12} />
                    {SERVICE_LENGTHS[offering.id]}
                  </span>
                </div>
              </div>
            </div>
            <div className="h-px my-5" style={{ background: CARD_BORDER }} />
          </>
        ) : (
          <div className="flex items-center gap-3 mb-5" style={{ color: TEXT_LIGHT }}>
            <Sparkles size={18} style={{ color: GOLD }} />
            <p className="text-sm" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              Select a reading to begin.
            </p>
          </div>
        )}

        <p
          className="text-[10px] uppercase tracking-[0.22em] mb-3"
          style={{ color: TEXT_LIGHT, fontFamily: 'var(--font-sans)', fontWeight: 600 }}
        >
          Includes
        </p>
        <ul className="space-y-2">
          {INCLUDES.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm"
              style={{ color: TEXT }}
            >
              <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: GOLD }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div
          className="mt-6 pt-5 flex items-center gap-2 text-xs"
          style={{ borderTop: `1px solid ${CARD_BORDER}`, color: TEXT_LIGHT }}
        >
          <ShieldCheck size={14} style={{ color: GOLD }} />
          <span>Secure & confidential booking</span>
        </div>
      </div>
    </aside>
  )
}

/* ────────────── Page ────────────── */
const Book = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initial = searchParams.get('service')

  const [selected, setSelected] = useState<ServiceId | null>(
    isServiceId(initial) ? initial : null,
  )
  const [step, setStep] = useState<Step>(1)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [termsModalOpen, setTermsModalOpen] = useState(false)

  useEffect(() => {
    preloadAllCalApis()
  }, [])

  useEffect(() => {
    setPageSeo({
      path: '/book',
      title: 'Book a Reading | Luz Astrology',
      description:
        'Book a faith-rooted astrology reading with Luz Astrology.',
    })
  }, [])

  useEffect(() => {
    const s = searchParams.get('service')
    if (isServiceId(s)) setSelected(s)
  }, [searchParams])

  const offering = useMemo(
    () => (selected ? OFFERINGS.find((o) => o.id === selected) ?? null : null),
    [selected],
  )

  const handleSelect = (id: ServiceId) => {
    setSelected(id)
    setSearchParams({ service: id }, { replace: true })
  }

  const canContinue =
    (step === 1 && !!selected) ||
    (step === 2 && termsAccepted) ||
    step === 3

  const handleContinue = () => {
    if (!canContinue) return
    if (step < 3) setStep((s) => (s + 1) as Step)
  }
  const handleBack = () => {
    if (step > 1) setStep((s) => (s - 1) as Step)
  }

  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: PAGE_BG, color: TEXT }}
    >
      {/* Soft celestial backdrop (matches /booking-confirmed) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(900px 500px at 50% -10%, rgba(200,168,78,0.10), transparent 60%), radial-gradient(700px 500px at 90% 10%, rgba(91, 116, 168, 0.06), transparent 60%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(200,168,78,0.35), transparent)',
        }}
      />

      <Navbar />

      {/* Hero / page header */}
      <section className="pt-28 pb-8 px-5 lg:px-10 text-center max-w-3xl mx-auto">
        <p
          className="text-[0.7rem] tracking-[0.28em] uppercase font-semibold mb-3"
          style={{ color: GOLD, fontFamily: 'var(--font-sans)' }}
        >
          Book Your Reading
        </p>
        <h1
          className="leading-tight mb-4"
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 500,
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: TEXT,
          }}
        >
          A guided booking experience.
        </h1>
        <p
          className="leading-relaxed max-w-xl mx-auto"
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '1.05rem',
            color: TEXT_LIGHT,
          }}
        >
          Four calm steps — choose your reading, agree to the terms, pick your time, confirm.
        </p>
      </section>

      {/* Stepper */}
      <div className="px-5 lg:px-10 pb-10">
        <Stepper current={step} />
      </div>

      {/* Main grid */}
      <main className="flex-1 px-5 lg:px-10 pb-32 lg:pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-10">
          <div>
            <div
              className="rounded-[28px] p-5 sm:p-8 relative overflow-hidden"
              style={{
                background: CARD_BG,
                border: `1px solid ${CARD_BORDER}`,
                boxShadow: CARD_SHADOW,
              }}
            >
              <div
                aria-hidden
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, var(--color-gold), transparent)',
                  opacity: 0.55,
                }}
              />
              {step === 1 && <ChooseReading selected={selected} onSelect={handleSelect} />}
              {step === 2 && (
                <TermsStep
                  accepted={termsAccepted}
                  onOpenModal={() => setTermsModalOpen(true)}
                  serviceName={offering?.name}
                />
              )}
              {step === 3 && selected && <PickTimeStep serviceId={selected} />}
            </div>

            {/* Desktop nav buttons */}
            <div className="hidden lg:flex items-center justify-between mt-6">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 1}
                className="text-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  color: TEXT_LIGHT,
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '0.04em',
                }}
              >
                ← Back
              </button>
              {step < 3 && (
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!canContinue}
                  className="rounded-full px-7 h-11 text-sm font-semibold tracking-wide transition-transform hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    background: GOLD,
                    color: '#1a1a2e',
                    border: `1.5px solid ${GOLD}`,
                    fontFamily: 'var(--font-sans)',
                    letterSpacing: '0.05em',
                    boxShadow: '0 8px 24px -10px rgba(200,168,78,0.55)',
                  }}
                >
                  Continue →
                </button>
              )}
              {step === 3 && (
                <p
                  className="text-xs italic"
                  style={{ color: TEXT_LIGHT, fontFamily: 'var(--font-serif)' }}
                >
                  Pick a time above — Cal.com will confirm your booking.
                </p>
              )}
            </div>
          </div>

          <SummaryPanel serviceId={selected} />
        </div>
      </main>

      {/* Mobile sticky CTA */}
      <div
        className="lg:hidden fixed bottom-0 inset-x-0 z-30 px-5 py-3 flex items-center gap-3"
        style={{
          background: 'rgba(248,246,241,0.96)',
          backdropFilter: 'blur(12px)',
          borderTop: `1px solid ${CARD_BORDER}`,
        }}
      >
        {step > 1 && step < 3 && (
          <button
            type="button"
            onClick={handleBack}
            className="text-sm px-3 h-11"
            style={{ color: TEXT_LIGHT, fontFamily: 'var(--font-sans)' }}
          >
            ← Back
          </button>
        )}
        {step < 3 ? (
          <button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            className="flex-1 rounded-full h-12 text-sm font-semibold tracking-wide disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: GOLD,
              color: '#1a1a2e',
              border: `1.5px solid ${GOLD}`,
              fontFamily: 'var(--font-sans)',
              letterSpacing: '0.05em',
              boxShadow: '0 8px 24px -10px rgba(200,168,78,0.55)',
            }}
          >
            Continue →
          </button>
        ) : (
          <p
            className="flex-1 text-center text-xs italic"
            style={{ color: TEXT_LIGHT, fontFamily: 'var(--font-serif)' }}
          >
            Select a time to confirm your booking.
          </p>
        )}
      </div>

      <Footer />

      {termsModalOpen && (
        <TermsAgreementModal
          serviceName={offering?.name}
          onClose={() => setTermsModalOpen(false)}
          onAccept={() => {
            setTermsAccepted(true)
            setTermsModalOpen(false)
          }}
          acceptLabel="Accept & Continue"
        />
      )}
    </div>
  )
}

export default Book
