import { useEffect, useState } from 'react'
import { OFFERINGS, iconMap, preloadAllCalApis, type Offering, type ServiceId } from './booking/bookingData'
import BookingModal from './booking/BookingModal'

function PricingCard({
  offering,
  onBook,
}: {
  offering: Offering
  onBook: (id: Offering['id']) => void
}) {
  const Icon = iconMap[offering.icon]
  return (
    <div className={`pricing-card ${offering.featured ? 'featured' : ''}`}>
      <div className="card-icon">{Icon && <Icon size={22} strokeWidth={1.5} />}</div>
      <h3 className="card-name">{offering.name}</h3>
      <p className="card-price">{offering.price}</p>
      <p className="card-description">{offering.description}</p>
      <ul className="card-features">
        {offering.features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
      <button className="book-btn" onClick={() => onBook(offering.id)}>
        BOOK THIS READING
      </button>
    </div>
  )
}

export default function Offerings() {
  const [activeService, setActiveService] = useState<ServiceId | null>(null)

  // Preload Cal APIs so /book is instant
  useEffect(() => {
    preloadAllCalApis()
  }, [])

  const handleBook = (id: Offering['id']) => {
    setActiveService(id)
  }

  return (
    <section id="services" className="offerings-section">
      <p className="offerings-label">SERVICES</p>
      <h2 className="offerings-title">Readings for Every Season</h2>
      <p className="offerings-subtitle">
        Each reading is a sacred conversation — rooted in faith, guided by the stars, and crafted
        with care for your unique journey.
      </p>

      <div className="pricing-cards">
        {OFFERINGS.map((o) => (
          <PricingCard key={o.id} offering={o} onBook={handleBook} />
        ))}
      </div>

      {activeService && (
        <BookingModal serviceId={activeService} onClose={() => setActiveService(null)} />
      )}
    </section>
  )
}