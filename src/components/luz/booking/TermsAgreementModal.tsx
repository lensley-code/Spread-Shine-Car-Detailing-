import { useEffect, useState } from 'react'
import TermsContent from './TermsContent'

export default function TermsAgreementModal({
  serviceName,
  onAccept,
  onClose,
  acceptLabel = 'Continue to Calendar →',
  initialAgreed = false,
  onAgreedChange,
}: {
  serviceName?: string
  onAccept: () => void
  onClose: () => void
  acceptLabel?: string
  initialAgreed?: boolean
  onAgreedChange?: (agreed: boolean) => void
}) {
  const [agreed, setAgreed] = useState(initialAgreed)

  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Terms & Conditions</h2>
          <p>
            {serviceName
              ? `Please review before booking ${serviceName}`
              : 'Please review before continuing'}
          </p>
        </div>

        <div className="modal-body">
          <TermsContent />
        </div>

        <div className="modal-footer">
          <div className="checkbox-row">
            <input
              type="checkbox"
              id="terms-agree-shared"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked)
                onAgreedChange?.(e.target.checked)
              }}
            />
            <label htmlFor="terms-agree-shared">
              I have read and agree to the Terms & Conditions
            </label>
          </div>
          <div className="modal-actions">
            <button className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn-accept"
              disabled={!agreed}
              onClick={() => {
                if (agreed) onAccept()
              }}
            >
              {acceptLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}