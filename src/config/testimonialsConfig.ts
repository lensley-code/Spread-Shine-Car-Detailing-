/**
 * Testimonials configuration for SoSpreadShine.
 */

export interface Testimonial {
  id: string
  name: string
  initials: string
  service: string
  rating: number
  text: string
  date: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Customer Review',
    initials: 'CR',
    service: 'Auto Detailing',
    rating: 5,
    text: 'SoSpreadShine did an amazing job on my car. It looked clean, fresh, and professionally detailed.',
    date: '2026',
  },
  {
    id: 't2',
    name: 'Customer Review',
    initials: 'CR',
    service: 'Exterior Cleaning',
    rating: 5,
    text: 'Great communication, fair pricing, and quality work. I would definitely use them again.',
    date: '2026',
  },
  {
    id: 't3',
    name: 'Customer Review',
    initials: 'CR',
    service: 'Driveway & Exterior',
    rating: 5,
    text: 'My driveway and outdoor area looked completely refreshed. Reliable and professional service.',
    date: '2026',
  },
]
