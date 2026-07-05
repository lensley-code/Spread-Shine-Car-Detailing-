import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import { LATEST_SOCIAL_POSTS, SOCIAL_PROFILES, type SocialPlatform } from '@/config/latestSocialPosts'

const { x: X_URL, instagram: INSTAGRAM_URL, tiktok: TIKTOK_URL } = SOCIAL_PROFILES
type Platform = SocialPlatform

function PlatformIcon({ platform }: { platform: Platform }) {
  if (platform === 'x') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  }
  if (platform === 'tiktok') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .56.04.82.11v-3.5a6.37 6.37 0 00-.82-.05A6.34 6.34 0 003.15 15.2 6.34 6.34 0 009.49 21.55a6.34 6.34 0 006.34-6.34V8.78a8.18 8.18 0 004.76 1.52V6.85a4.84 4.84 0 01-1-.16z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function Arrow({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {dir === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 6 15 12 9 18" />}
    </svg>
  )
}

function getTikTokVideoId(url: string): string | null {
  const m = url.match(/\/video\/(\d+)/)
  return m ? m[1] : null
}

export default function LatestFromSocial() {
  const navigate = useNavigate()
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [snaps, setSnaps] = useState<number[]>([])
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const [activePostUrl, setActivePostUrl] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState(0)
  const touchStartY = useRef<number | null>(null)
  const touchStartX = useRef<number | null>(null)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setSnaps(emblaApi.scrollSnapList())
    onSelect()
    emblaApi.on('select', onSelect).on('reInit', () => {
      setSnaps(emblaApi.scrollSnapList())
      onSelect()
    })
  }, [emblaApi, onSelect])

  const posts = LATEST_SOCIAL_POSTS.filter((p) => p.platform === 'tiktok')
  const hasPosts = posts.length > 0

  const activeVideoId = activePostUrl ? getTikTokVideoId(activePostUrl) : null
  const embedSrc = activeVideoId ? `https://www.tiktok.com/embed/v2/${activeVideoId}` : null

  useEffect(() => {
    if (!activePostUrl) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePostUrl(null)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [activePostUrl])

  const closeModal = useCallback(() => {
    setActivePostUrl(null)
    setDragOffset(0)
  }, [])

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0]
    touchStartY.current = t.clientY
    touchStartX.current = t.clientX
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStartY.current == null || touchStartX.current == null) return
    const t = e.touches[0]
    const dy = t.clientY - touchStartY.current
    const dx = t.clientX - touchStartX.current
    // Only treat as vertical swipe-down if dominant axis is vertical and downward
    if (dy > 0 && Math.abs(dy) > Math.abs(dx)) {
      setDragOffset(dy)
    }
  }, [])

  const onTouchEnd = useCallback(() => {
    if (dragOffset > 110) {
      closeModal()
    } else {
      setDragOffset(0)
    }
    touchStartY.current = null
    touchStartX.current = null
  }, [dragOffset, closeModal])

  return (
    <section className="lfs-section" id="latest-from-social" aria-labelledby="lfs-title">
      <div className="lfs-container">
        <header className="lfs-header">
          <span className="lfs-eyebrow">
            <span className="lfs-eyebrow-star" aria-hidden="true">✦</span>
            Stay Connected
            <span className="lfs-eyebrow-star" aria-hidden="true">✦</span>
          </span>
          <h2 className="lfs-title" id="lfs-title">Stay Connected Between Sessions</h2>
          <p className="lfs-subtitle">
            Follow along for short reflections, spiritual insight, and moments of celestial wisdom.
          </p>
        </header>

        {hasPosts ? (
        <div className="lfs-carousel-wrap">
          <div className="lfs-viewport" ref={emblaRef}>
            <div className="lfs-track">
              {posts.map((post) => (
                <div className="lfs-slide" key={post.id}>
                  <button
                    type="button"
                    className="lfs-card lfs-card-button"
                    onClick={() => setActivePostUrl(post.postUrl)}
                    aria-label={`Play TikTok video: ${post.caption}`}
                  >
                    <div className="lfs-thumb">
                      <img src={post.thumbnail} alt={post.caption} loading="lazy" />
                      <div className="lfs-thumb-overlay" />
                      <span className="lfs-platform-chip" aria-hidden="true">
                        <PlatformIcon platform={post.platform} />
                      </span>
                      {post.isVideo !== false && (
                        <>
                          <span className="lfs-play" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
                          </span>
                          <span className="lfs-watch-hint" aria-hidden="true">Watch</span>
                        </>
                      )}
                      <div className="lfs-caption-overlay">
                        <p className="lfs-caption">{post.caption}</p>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            className="lfs-arrow lfs-arrow-left"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            aria-label="Previous"
          >
            <Arrow dir="left" />
          </button>
          <button
            className="lfs-arrow lfs-arrow-right"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            aria-label="Next"
          >
            <Arrow dir="right" />
          </button>
        </div>
        ) : (
          <div className="lfs-empty">
            <p>New posts coming soon. Follow along on the channels below.</p>
          </div>
        )}

        {hasPosts && snaps.length > 1 && (
          <div className="lfs-dots" role="tablist">
            {snaps.map((_, i) => (
              <button
                key={i}
                className={`lfs-dot ${i === selectedIndex ? 'active' : ''}`}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

        <div className="lfs-follow" role="group" aria-label="Follow Luz Astrology">
          <p className="lfs-follow-label">Follow Luz Astrology</p>
          <div className="lfs-follow-icons">
            <a className="lfs-icon-btn" href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" aria-label="TikTok" title="TikTok">
              <PlatformIcon platform="tiktok" />
            </a>
            <a className="lfs-icon-btn" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
              <PlatformIcon platform="instagram" />
            </a>
            <a className="lfs-icon-btn" href={X_URL} target="_blank" rel="noopener noreferrer" aria-label="X" title="X">
              <PlatformIcon platform="x" />
            </a>
          </div>
        </div>
      </div>

      {activePostUrl && (
        <div
          className="lfs-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="TikTok video player"
          onClick={closeModal}
          style={{ opacity: Math.max(0.4, 1 - dragOffset / 400) }}
        >
          <div
            className="lfs-modal"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{
              transform: `translateY(${dragOffset}px)`,
              transition: dragOffset === 0 ? 'transform 0.25s ease' : 'none',
            }}
          >
            <div className="lfs-modal-grabber" aria-hidden="true" />
            <button
              type="button"
              className="lfs-modal-close"
              onClick={closeModal}
              aria-label="Close video"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="lfs-modal-card">
              <div className="lfs-modal-frame">
                {activeVideoId ? (
                  <iframe
                    key={activeVideoId}
                    src={embedSrc ?? ''}
                    title="TikTok video"
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="lfs-modal-fallback">
                    <p>Unable to load embedded video.</p>
                  </div>
                )}
              </div>
              <div className="lfs-modal-footer">
                <p className="lfs-modal-handle">@prophluz · Luz Astrology</p>
                <p className="lfs-modal-pitch text-primary-foreground">
                  If this spoke to you, there&rsquo;s more clarity available for your season.
                </p>
                <div className="lfs-modal-actions">
                  <button
                    type="button"
                    className="lfs-modal-cta lfs-modal-cta--primary"
                    onClick={() => {
                      closeModal()
                      navigate('/book')
                    }}
                  >
                    <span>Book a Reading</span>
                    <span aria-hidden="true">→</span>
                  </button>
                  <a
                    className="lfs-modal-cta lfs-modal-cta--secondary"
                    href={activePostUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <PlatformIcon platform="tiktok" />
                    <span>Watch on TikTok</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}