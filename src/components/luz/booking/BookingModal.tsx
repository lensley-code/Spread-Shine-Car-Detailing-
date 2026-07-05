import { useCallback, useEffect, useRef, useState } from 'react'
import { Loader2, X, ShieldCheck, Mail, CalendarClock, Lock, Sparkles } from 'lucide-react'
import Cal from '@calcom/embed-react'
import {
  SERVICE_MAP,
  OFFERINGS,
  preloadCalApi,
  type ServiceId,
  type Offering,
} from './bookingData'
import TermsAgreementModal from './TermsAgreementModal'

const SERVICE_DURATIONS: Record<ServiceId, string> = {
  'natal-chart-reading': '60 minutes',
  'biblical-guidance': '90 minutes',
  'transits-profections': '60 minutes',
}

function CalendarLoading({ slow }: { slow?: boolean }) {
  return (
    <div className="calendar-loading">
      <Loader2 className="calendar-loading-spinner" size={32} strokeWidth={1.5} />
      <p className="calendar-loading-text">Preparing your secure checkout…</p>
      {slow && (
        <p className="calendar-loading-subtext">This is taking longer than usual…</p>
      )}
    </div>
  )
}

function CalendarError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="calendar-loading">
      <p className="calendar-loading-text">Unable to load checkout.</p>
      <p className="calendar-loading-subtext">Please check your connection and try again.</p>
      <button className="book-btn" style={{ marginTop: '1rem', fontSize: '0.85rem' }} onClick={onRetry}>
        Try Again
      </button>
    </div>
  )
}

/* ── Left panel: branded summary ── */
function SummaryPanel({ offering }: { offering: Offering }) {
  const duration = SERVICE_DURATIONS[offering.id]

  return (
    <aside className="checkout-summary">
      <div className="checkout-summary-inner">
        <p className="checkout-eyebrow">Your Reservation</p>
        <h3 className="checkout-summary-title">{offering.name}</h3>
        <p className="checkout-summary-desc">{offering.description}</p>

        <div className="checkout-meta">
          <div className="checkout-meta-row">
            <span className="checkout-meta-label">Duration</span>
            <span className="checkout-meta-value">{duration}</span>
          </div>
          <div className="checkout-meta-row">
            <span className="checkout-meta-label">Format</span>
            <span className="checkout-meta-value">Live online consultation</span>
          </div>
          <div className="checkout-meta-row">
            <span className="checkout-meta-label">Schedule</span>
            <span className="checkout-meta-value">Selected on the right</span>
          </div>
        </div>

        <div className="checkout-divider" />

        <p className="checkout-includes-label">What's included</p>
        <ul className="checkout-includes">
          {offering.features.map((f) => (
            <li key={f}>
              <Sparkles size={12} className="checkout-includes-icon" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="checkout-total">
          <span className="checkout-total-label">Total</span>
          <span className="checkout-total-value">{offering.price}</span>
        </div>

        <div className="checkout-secure-badge">
          <Lock size={13} />
          <span>Secure booking</span>
        </div>

        <p className="checkout-reassurance">
          Your payment securely reserves your session.
        </p>

        <ul className="checkout-trust">
          <li>
            <ShieldCheck size={14} className="checkout-trust-icon" />
            Secure encrypted payment
          </li>
          <li>
            <Mail size={14} className="checkout-trust-icon" />
            Instant confirmation email
          </li>
          <li>
            <CalendarClock size={14} className="checkout-trust-icon" />
            Reschedule up to 48 hours prior
          </li>
        </ul>
      </div>
    </aside>
  )
}

/* ── Right panel: Cal embed ── */
function CalendarStep({
  serviceId,
  offering,
  onClose,
  onBack,
}: {
  serviceId: ServiceId
  offering: Offering
  onClose: () => void
  onBack: () => void
}) {
  const svc = SERVICE_MAP[serviceId]
  const [status, setStatus] = useState<'loading' | 'slow' | 'ready' | 'error'>('loading')
  const slowTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const errorTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    slowTimer.current = setTimeout(() => {
      setStatus((s) => (s === 'loading' ? 'slow' : s))
    }, 6000)

    errorTimer.current = setTimeout(() => {
      setStatus((s) => (s === 'loading' || s === 'slow' ? 'error' : s))
    }, 20000)

    preloadCalApi(svc.namespace).then((cal) => {
      const handleEvent = () => setStatus('ready')
      cal('on', { action: 'linkReady', callback: handleEvent })
      cal('on', { action: '__windowLoadComplete', callback: handleEvent })
    })

    return () => {
      if (slowTimer.current) clearTimeout(slowTimer.current)
      if (errorTimer.current) clearTimeout(errorTimer.current)
    }
  }, [svc.namespace, serviceId])

  const handleRetry = useCallback(() => {
    setStatus('loading')
    if (slowTimer.current) clearTimeout(slowTimer.current)
    if (errorTimer.current) clearTimeout(errorTimer.current)
    slowTimer.current = setTimeout(() => {
      setStatus((s) => (s === 'loading' ? 'slow' : s))
    }, 6000)
    errorTimer.current = setTimeout(() => {
      setStatus((s) => (s === 'loading' || s === 'slow' ? 'error' : s))
    }, 20000)
    preloadCalApi(svc.namespace)
  }, [svc.namespace])

  const isReady = status === 'ready'
  const isError = status === 'error'

  return (
    <div className="checkout-shell">
      {/* Compact branded header */}
      <header className="checkout-header">
        <div className="checkout-header-brand">
          <p className="checkout-header-eyebrow">Luz Astrology</p>
          <h2 className="checkout-header-title">Secure Checkout</h2>
          <p className="checkout-header-subtitle">Your session is almost reserved.</p>
        </div>
        <button
          className="checkout-close"
          onClick={onClose}
          aria-label="Close checkout"
        >
          <X size={18} strokeWidth={1.75} />
        </button>
      </header>

      {/* Mobile compact summary bar */}
      <div className="checkout-mobile-summary">
        <div className="checkout-mobile-summary-text">
          <p className="checkout-mobile-summary-name">{offering.name}</p>
          <p className="checkout-mobile-summary-meta">
            {SERVICE_DURATIONS[serviceId]} · Live online
          </p>
        </div>
        <span className="checkout-mobile-summary-price">{offering.price}</span>
      </div>

      <div className="checkout-body">
        <SummaryPanel offering={offering} />

        <section className="checkout-payment">
          <div className="checkout-payment-inner">
            {!isReady && !isError && <CalendarLoading slow={status === 'slow'} />}
            {isError && <CalendarError onRetry={handleRetry} />}

            {!isError && (
              <div
                className="calendar-embed-frame"
                style={{
                  opacity: isReady ? 1 : 0,
                  visibility: isReady ? 'visible' : 'hidden',
                  pointerEvents: isReady ? undefined : ('none' as const),
                  transition: 'opacity 0.3s ease',
                }}
              >
                <Cal
                  namespace={svc.namespace}
                  calLink={svc.calLink}
                  config={{
                    layout: 'month_view',
                    useSlotsViewOnSmallScreen: 'true',
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'auto',
                  }}
                />
              </div>
            )}

            <button
              type="button"
              className="checkout-back-btn text-center"
              onClick={onBack}
              aria-label="Back"
            >
              ← Back
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

/* ── Main Booking Modal: Agreement → Checkout ── */
export default function BookingModal({
  serviceId,
  onClose,
}: {
  serviceId: ServiceId
  onClose: () => void
}) {
  const [step, setStep] = useState<'agreement' | 'calendar'>('agreement')
  const [termsAgreed, setTermsAgreed] = useState(false)

  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  const offering = OFFERINGS.find((o) => o.id === serviceId)
  if (!offering) return null

  if (step === 'agreement') {
    return (
      <TermsAgreementModal
        serviceName={offering.name}
        onAccept={() => {
          setTermsAgreed(true)
          setStep('calendar')
        }}
        onClose={onClose}
        initialAgreed={termsAgreed}
        onAgreedChange={setTermsAgreed}
      />
    )
  }

  return (
    <div className="checkout-overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <CalendarStep
          serviceId={serviceId}
          offering={offering}
          onClose={onClose}
          onBack={() => {
            setStep('agreement')
            requestAnimationFrame(() => {
              document
                .querySelector('.modal-content')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            })
          }}
        />
      </div>
    </div>
  )
}
