import { useRef, useState } from "react";
import { Check, Car, Home as HomeIcon, Sparkles, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import autoImgAsset from "@/assets/services/auto-detailing.jpg.asset.json";
import homeImgAsset from "@/assets/services/exterior-home-care.webp.asset.json";

const autoImg = autoImgAsset.url;
const homeImg = homeImgAsset.url;

const MOBILE_VISIBLE = 3;

const autoItems = [
  "Exterior Hand Wash",
  "Interior Detailing",
  "Full Detail Packages",
  "Engine Bay Cleaning",
  "Headlight Restoration",
  "Maintenance Services",
];

const homeItems = [
  "House Washing",
  "Roof Cleaning",
  "Driveways",
  "Sidewalks",
  "Pool Decks",
  "Outdoor Surfaces",
  "Painting",
  "Lawn Care & Landscaping",
];

const highlights = [
  { Icon: Car, title: "Auto Detailing", subtitle: "Professional vehicle care" },
  { Icon: HomeIcon, title: "Exterior Cleaning", subtitle: "Complete home care" },
  { Icon: Sparkles, title: "Professional Results", subtitle: "Quality you can see" },
  { Icon: MapPin, title: "Serving South Florida", subtitle: "Local & trusted" },
];

const scrollToQuote = () =>
  document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });

function ServiceCard({
  image,
  imageAlt,
  imagePosition = "center",
  title,
  description,
  items,
}: {
  image: string;
  imageAlt: string;
  imagePosition?: string;
  title: string;
  description: string;
  items: string[];
}) {
  const [expanded, setExpanded] = useState(false);
  const hiddenCount = Math.max(0, items.length - MOBILE_VISIBLE);
  const visibleItems = expanded ? items : items.slice(0, MOBILE_VISIBLE);

  return (
    <article className="grid grid-cols-1 sm:grid-cols-5 rounded-2xl overflow-hidden bg-card shadow-[0_20px_60px_-30px_rgba(0,0,0,0.2)] border border-border/60">
      <div className="sm:col-span-2 relative bg-muted aspect-[4/3] sm:aspect-auto sm:min-h-[420px]">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          width={1352}
          height={1014}
          style={{ objectPosition: imagePosition }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="sm:col-span-3 p-5 sm:p-8 lg:p-10 flex flex-col">
        <h3 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          {description}
        </p>

        {/* Mobile: show only first 3, expandable. Desktop: show all. */}
        <ul className="space-y-2.5 flex-1 sm:hidden">
          {visibleItems.map((it) => (
            <li key={it} className="flex items-start gap-2.5 text-sm text-foreground/85">
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0"
              >
                <Check size={12} strokeWidth={3} />
              </span>
              <span>{it}</span>
            </li>
          ))}
          {hiddenCount > 0 && (
            <li>
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
                aria-expanded={expanded}
              >
                <Plus size={14} className={`transition-transform ${expanded ? "rotate-45" : ""}`} />
                {expanded ? "Show less" : `+${hiddenCount} more services`}
              </button>
            </li>
          )}
        </ul>
        <ul className="hidden sm:block space-y-2.5 flex-1">
          {items.map((it) => (
            <li key={it} className="flex items-start gap-2.5 text-sm text-foreground/85">
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0"
              >
                <Check size={12} strokeWidth={3} />
              </span>
              <span>{it}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <Button
            variant="gold-outline"
            onClick={scrollToQuote}
            className="rounded-full h-11 px-6 text-sm tracking-wide"
          >
            Learn More →
          </Button>
        </div>
      </div>
    </article>
  );
}

function MobileServiceCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / (el.scrollWidth / 2));
    setActive(Math.min(1, Math.max(0, idx)));
  };

  return (
    <div className="sm:hidden">
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-5 pb-2 snap-x snap-mandatory [scroll-behavior:smooth] [-webkit-overflow-scrolling:touch] [overscroll-behavior-x:contain]"
      >
        <div className="snap-start shrink-0 w-[88vw] max-w-[420px]">
          <ServiceCard
            image={autoImg}
            imageAlt="Freshly detailed vehicle exterior"
            title="Auto Detailing"
            description="Complete care for your vehicle inside and out."
            items={autoItems}
          />
        </div>
        <div className="snap-start shrink-0 w-[88vw] max-w-[420px]">
          <ServiceCard
            image={homeImg}
            imageAlt="Freshly pressure-washed paver driveway and clean South Florida home exterior"
            imagePosition="center 40%"
            title="Exterior Home Care"
            description="Professional cleaning and maintenance for your home."
            items={homeItems}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2" aria-hidden="true">
        {[0, 1].map((i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              active === i ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground/70">
        Swipe to explore services →
      </p>
    </div>
  );
}

export default function Offerings() {

  return (
    <section
      id="services"
      className="surface-white relative w-full py-14 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-10"
    >

      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <p className="text-primary text-[11px] sm:text-xs tracking-[0.35em] uppercase font-semibold mb-4">
            Our Services
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-5">
            Professional Cleaning Solutions
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            for Your Vehicle &amp; Home
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            From top-to-bottom detailing to exterior home care, SoSpreadShine
            delivers reliable service and exceptional results.
          </p>
        </div>

        {/* Mobile: horizontal swipeable cards */}
        <MobileServiceCarousel />

        {/* Desktop/tablet: side-by-side */}
        <div className="hidden sm:grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <ServiceCard
            image={autoImg}
            imageAlt="Freshly detailed vehicle exterior"
            title="Auto Detailing"
            description="Complete care for your vehicle inside and out."
            items={autoItems}
          />
          <ServiceCard
            image={homeImg}
            imageAlt="Freshly pressure-washed paver driveway and clean South Florida home exterior"
            imagePosition="center 40%"
            title="Exterior Home Care"
            description="Professional cleaning and maintenance for your home."
            items={homeItems}
          />
        </div>


        {/* Highlights row */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {highlights.map(({ Icon, title, subtitle }) => (
            <div key={title} className="flex items-center gap-3 sm:justify-center">
              <Icon size={30} className="text-primary shrink-0" strokeWidth={1.5} />
              <div className="leading-tight">
                <p className="font-heading text-sm sm:text-base font-semibold text-foreground">
                  {title}
                </p>
                <p className="text-xs sm:text-[13px] text-muted-foreground">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
