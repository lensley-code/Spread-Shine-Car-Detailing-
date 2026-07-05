import { useState, useEffect, useCallback } from 'react'

const POPUP_DELAY_MS = 30000
const STORAGE_KEY = 'luz_popup_dismissed'

export default function LeadPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return

    const timer = setTimeout(() => setVisible(true), POPUP_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (visible) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
    return () => document.body.classList.remove('modal-open')
  }, [visible])

  const dismiss = useCallback(() => {
    setVisible(false)
    sessionStorage.setItem(STORAGE_KEY, '1')
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
    sessionStorage.setItem(STORAGE_KEY, '1')
  }, [email])

  if (!visible) return null

  return (
    <div className="lead-overlay" onClick={dismiss}>
      <div className="lead-popup" onClick={(e) => e.stopPropagation()}>
        <button className="lead-close" onClick={dismiss}>✕</button>

        {/* Left: zodiac image panel */}
        <div className="lead-image-panel">
          <div className="lead-image-stars" />
          <div className="lead-zodiac-art">
            <div className="zodiac-ring zodiac-ring-outer" />
            <div className="zodiac-ring zodiac-ring-inner" />
            <span className="zodiac-center-star">✦</span>
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="zodiac-line"
                style={{ transform: `rotate(${i * 30}deg)` }}
              />
            ))}
          </div>
        </div>

        {/* Right: content panel */}
        <div className="lead-content-panel">
          <p className="lead-stars-row">★★★★★</p>
          <h2 className="lead-title">Receive Your Free Spiritual Guide</h2>
          <p className="lead-description">
            Enter your email below to unlock your personalized astrological chart reading
            and our 2024 celestial handbook.
          </p>

          {!submitted ? (
            <form className="lead-form" onSubmit={handleSubmit}>
              <input
                className="lead-input"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <button className="lead-submit" type="submit">
                Get My Free Book
              </button>
              <p className="lead-disclaimer">
                By signing up, you agree to receive spiritual insights and updates.
                You can unsubscribe at any time.
              </p>
            </form>
          ) : (
            <div className="lead-success">
              <p className="lead-success-icon">✦</p>
              <p className="lead-success-text">
                Thank you! Check your inbox for your free spiritual guide.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
