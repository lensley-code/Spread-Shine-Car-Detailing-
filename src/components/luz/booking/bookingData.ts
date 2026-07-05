import { Globe, Sun, BookOpen, type LucideIcon } from 'lucide-react'
import { getCalApi } from '@calcom/embed-react'

export const SERVICE_MAP = {
  'natal-chart-reading': {
    namespace: 'natalchartreading',
    calLink: 'luzastrology/natalchartreading',
    modalTitle: 'Book Natal Chart Reading',
  },
  'biblical-guidance': {
    namespace: 'chart-reading',
    calLink: 'luzastrology/chart-reading',
    modalTitle: 'Book Chart Reading with Biblical Guidance',
  },
  'transits-profections': {
    namespace: 'chart-reading-transit-profections',
    calLink: 'luzastrology/chart-reading-transit-profections',
    modalTitle: 'Book Chart Reading w/ Transits and Profections',
  },
} as const

export type ServiceId = keyof typeof SERVICE_MAP

export interface Offering {
  id: ServiceId
  name: string
  price: string
  description: string
  features: string[]
  icon: 'globe' | 'sun' | 'book'
  featured: boolean
}

export const OFFERINGS: Offering[] = [
  {
    id: 'natal-chart-reading',
    name: 'The Natal Promise',
    price: '$77',
    description:
      'A one hour session where we take a look at your Natal chart and come to a basic understanding of what is written in the stars when you were born.',
    features: [
      '60-minute live consultation',
      'Areas of challenge & favorable life themes',
      'Past to present life overview',
      'Conversational & faith-rooted approach',
    ],
    icon: 'globe',
    featured: false,
  },
  {
    id: 'biblical-guidance',
    name: 'Chart Reading with Biblical Guidance',
    price: '$99',
    description:
      'An in-depth 90-minute chart reading with Biblical guidance woven throughout, connecting the stars to Scripture.',
    features: [
      '90-minute live consultation',
      'In-depth Biblical integration',
      'Deeper spiritual perspective',
      'Personalized scriptural insights',
    ],
    icon: 'book',
    featured: true,
  },
  {
    id: 'transits-profections',
    name: 'Chart Reading w/ Transits and Profections',
    price: '$99',
    description:
      'A chart reading focused on current transits and profections — understanding what the planets are activating in your life right now.',
    features: [
      '60-minute live consultation',
      'Focus on current planetary transits',
      'Annual profections breakdown',
      'Navigating your present season',
    ],
    icon: 'sun',
    featured: false,
  },
]

export const iconMap: Record<Offering['icon'], LucideIcon> = {
  globe: Globe,
  sun: Sun,
  book: BookOpen,
}

/* ── Preload Cal.com APIs ── */
const preloadedApis = new Map<
  string,
  Promise<ReturnType<typeof getCalApi> extends Promise<infer T> ? T : never>
>()

export function preloadCalApi(namespace: string) {
  if (!preloadedApis.has(namespace)) {
    preloadedApis.set(
      namespace,
      getCalApi({ namespace }).then((cal) => {
        cal('ui', {
          cssVarsPerTheme: {
            light: { 'cal-brand': '#C8A84E' },
            dark: { 'cal-brand': '#C8A84E' },
          },
          hideEventTypeDetails: false,
          layout: 'month_view',
        })
        return cal
      })
    )
  }
  return preloadedApis.get(namespace)!
}

/**
 * Build the absolute success redirect URL Cal.com will send the user to
 * AFTER the booking (and any attached Stripe payment) is fully confirmed.
 * Cal.com only triggers this redirect on a successful, paid booking — never
 * on cancel, failure, or incomplete payment.
 */
export function preloadAllCalApis() {
  Object.values(SERVICE_MAP).forEach((svc) => preloadCalApi(svc.namespace))
}