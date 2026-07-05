/**
 * Latest from Social — curated content source.
 *
 * To add a real post:
 *   1. Copy the post URL from X / Instagram / TikTok.
 *   2. Save the post's thumbnail image (or paste a hosted image URL).
 *   3. Add a new object to the LATEST_SOCIAL_POSTS array below.
 *
 * Fields:
 *   - platform:  'x' | 'instagram' | 'tiktok'   (controls the platform icon)
 *   - caption:   short text shown under the card
 *   - thumbnail: image URL (vertical 3:4 works best)
 *   - postUrl:   link to the original post (opens in a new tab)
 *   - label:     optional small badge, e.g. "EP 5", "Latest", "New"
 *   - isVideo:   optional — shows a play button overlay (default: true)
 */

import tiktokProvidence from '@/assets/social/tiktok-7627492283629276446.jpg'
import tiktokChapter from '@/assets/social/tiktok-7623039699556355359.jpg'
import tiktokHeavens from '@/assets/social/tiktok-7621496639751998751.jpg'
import tiktokSeasons from '@/assets/social/tiktok-7627194648259235102.jpg'
import tiktokScorpio from '@/assets/social/tiktok-7632297516884626718.jpg'

export type SocialPlatform = 'x' | 'instagram' | 'tiktok'

export interface LatestSocialPost {
  id: string
  platform: SocialPlatform
  caption: string
  thumbnail: string
  postUrl: string
  label?: string
  isVideo?: boolean
}

export const LATEST_SOCIAL_POSTS: LatestSocialPost[] = [
  {
    id: 'tiktok-7632297516884626718',
    platform: 'tiktok',
    caption:
      'Scorpios don\u2019t just create\u2026 they alchemize \u2014 turning silence into power, pain into art, vision into movement.',
    thumbnail: tiktokScorpio,
    postUrl: 'https://www.tiktok.com/@prophluz/video/7632297516884626718',
    label: 'Latest',
    isVideo: true,
  },
  {
    id: 'tiktok-7627492283629276446',
    platform: 'tiktok',
    caption:
      'Providence means God cares enough to guide — sometimes through scripture, sometimes through the patterns written into the sky.',
    thumbnail: tiktokProvidence,
    postUrl: 'https://www.tiktok.com/@prophluz/video/7627492283629276446',
    label: 'New',
    isVideo: true,
  },
  {
    id: 'tiktok-7623039699556355359',
    platform: 'tiktok',
    caption:
      'You\u2019re not behind. You\u2019re in a chapter that requires Him to finish the sentence.',
    thumbnail: tiktokChapter,
    postUrl: 'https://www.tiktok.com/@prophluz/video/7623039699556355359',
    isVideo: true,
  },
  {
    id: 'tiktok-7627194648259235102',
    platform: 'tiktok',
    caption:
      'Times and Seasons \u2014 how God ordains and speaks through the stars.',
    thumbnail: tiktokSeasons,
    postUrl: 'https://www.tiktok.com/@prophluz/video/7627194648259235102',
    isVideo: true,
  },
  {
    id: 'tiktok-7621496639751998751',
    platform: 'tiktok',
    caption:
      'God didn\u2019t create the stars to decorate the night sky \u2014 the heavens declare His glory.',
    thumbnail: tiktokHeavens,
    postUrl: 'https://www.tiktok.com/@prophluz/video/7621496639751998751',
    isVideo: true,
  },
]

export const SOCIAL_PROFILES = {
  x: '',
  instagram: '',
  tiktok: 'https://www.tiktok.com/@jhonnyjeanbaptist18',
} as const