import { useState, useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { SOCIAL_POSTS, INSTAGRAM_URL, TIKTOK_URL, type SocialPost } from '@/config/socialFeedConfig'
import BeamCircle from '@/components/lightswind/beam-circle'

const X_URL = 'https://x.com/prophluz111'

function PlayIcon() {
  return (
    <svg className="play-icon" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  )
}

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {direction === 'left' ? (
        <polyline points="15 18 9 12 15 6" />
      ) : (
        <polyline points="9 6 15 12 9 18" />
      )}
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg className="social-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg className="social-link-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .56.04.82.11v-3.5a6.37 6.37 0 00-.82-.05A6.34 6.34 0 003.15 15.2 6.34 6.34 0 009.49 21.55a6.34 6.34 0 006.34-6.34V8.78a8.18 8.18 0 004.76 1.52V6.85a4.84 4.84 0 01-1-.16z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg className="social-link-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function PlatformBadge({ platform }: { platform: string }) {
  if (platform === 'tiktok') {
    return (
      <span className="reel-platform-badge reel-platform-tiktok">
        <TikTokIcon />
      </span>
    )
  }
  return (
    <span className="reel-platform-badge reel-platform-instagram">
      <InstagramIcon />
    </span>
  )
}

function ReelCard({ post, onClick }: { post: SocialPost; onClick: (p: SocialPost) => void }) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <button className="reel-card" onClick={() => onClick(post)} aria-label={`Play ${post.caption} on ${post.platform}`}>
      <div className="reel-thumbnail-wrap">
        {!imgLoaded && <div className="reel-skeleton" />}
        <img
          className={`reel-thumbnail ${imgLoaded ? 'loaded' : ''}`}
          src={post.thumbnail}
          alt={post.caption}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />
        <div className="reel-overlay">
          <div className="play-btn-circle">
            <PlayIcon />
          </div>
        </div>
        {post.episode && <span className="reel-episode">{post.episode}</span>}
        <PlatformBadge platform={post.platform} />
      </div>
      <p className="reel-caption">{post.caption}</p>
    </button>
  )
}

function ReelModal({ post, onClose }: { post: SocialPost; onClose: () => void }) {
  const isTikTok = post.platform === 'tiktok'

  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div className="modal-overlay reel-modal-overlay" onClick={onClose}>
      <div className="reel-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="reel-close-btn close-btn" onClick={onClose}>✕</button>
        <div className="reel-embed-wrap">
          <iframe className="reel-iframe" src={post.embedUrl} title={post.caption} allowFullScreen />
        </div>
        <div className="reel-modal-source">
          <span className={`reel-source-label ${isTikTok ? 'reel-source-tiktok' : 'reel-source-instagram'}`}>
            {isTikTok ? <TikTokIcon /> : <InstagramIcon />}
            {isTikTok ? 'TikTok' : 'Instagram'}
          </span>
        </div>
      </div>
    </div>
  )
}

function useDotButton(emblaApi: ReturnType<typeof useEmblaCarousel>[1]) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onDotClick = useCallback((index: number) => {
    if (!emblaApi) return
    emblaApi.scrollTo(index)
  }, [emblaApi])

  const onInit = useCallback((api: NonNullable<typeof emblaApi>) => {
    setScrollSnaps(api.scrollSnapList())
  }, [])

  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    setSelectedIndex(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return { selectedIndex, scrollSnaps, onDotClick }
}

export default function SocialFeed() {
  const [activePost, setActivePost] = useState<SocialPost | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    dragFree: false,
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
  })

  const { selectedIndex, scrollSnaps, onDotClick } = useDotButton(emblaApi)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <>
      <section className="social-section">
        <div className="social-header-area">
          <h2 className="social-title">​</h2>
        </div>

        <div className="social-carousel-wrapper">
          {/* Fade hint on right edge */}
          <div className="social-carousel-fade" />

          <div className="social-carousel" ref={emblaRef}>
            <div className="social-carousel-track">
              {SOCIAL_POSTS.map((post) => (
                <div className="social-slide" key={post.id}>
                  <ReelCard post={post} onClick={setActivePost} />
                </div>
              ))}
            </div>
          </div>

          {/* Arrow buttons */}
          <button
            className={`carousel-arrow carousel-arrow-left ${!canScrollPrev ? 'carousel-arrow-disabled' : ''}`}
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Scroll left"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            className={`carousel-arrow carousel-arrow-right ${!canScrollNext ? 'carousel-arrow-disabled' : ''}`}
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Scroll right"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>

        {/* Dots */}
        {scrollSnaps.length > 1 && (
          <div className="social-dots">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                className={`social-dot ${i === selectedIndex ? 'active' : ''}`}
                onClick={() => onDotClick(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Beam Circle Orbit */}
        <div className="social-orbit-area">
          <BeamCircle />
        </div>
      </section>

      {activePost && <ReelModal post={activePost} onClose={() => setActivePost(null)} />}
    </>
  )
}
