import { Button } from "@/components/ui/button";

import driveway from "@/assets/gallery/driveway.jpg";
import houseWash from "@/assets/gallery/house-wash.jpg";
import autoDetail from "@/assets/gallery/auto-detail.jpg";
import poolDeck from "@/assets/gallery/pool-deck.jpg";

type Project = {
  id: string;
  title: string;
  image: string;
};

const PROJECTS: Project[] = [
  { id: "p1", title: "Driveway Cleaning", image: driveway },
  { id: "p2", title: "House Washing", image: houseWash },
  { id: "p3", title: "Full Vehicle Detail", image: autoDetail },
  { id: "p4", title: "Pool Deck Cleaning", image: poolDeck },
];

export default function Gallery() {
  const scrollToQuote = () =>
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="gallery" className="surface-beige py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <p className="text-primary text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 font-medium">
            Our Recent Work
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-light tracking-tight text-foreground">
            Real Results. Real Transformations.
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            Here are a few examples of the quality and attention to detail you can expect from SoSpreadShine. As we continue serving customers throughout South Florida, this gallery will continue to grow.
          </p>
        </div>

        {/* Grid — 4 featured projects, larger cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 max-w-6xl mx-auto">
          {PROJECTS.map((p) => (
            <article
              key={p.id}
              className="group relative overflow-hidden rounded-2xl bg-card transition-all duration-500 animate-fade-in"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src={p.image}
                  alt={`${p.title} — before and after`}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Gold center divider */}
                <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-primary/80 shadow-[0_0_12px_hsl(var(--primary)/0.6)]" />

                {/* Before / After labels */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide bg-background/80 text-foreground backdrop-blur">
                  Before
                </span>
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide bg-background/80 text-foreground backdrop-blur">
                  After
                </span>

                {/* Center gold pill */}
                <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg ring-2 ring-background/50">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 6 3 12 9 18" />
                    <polyline points="15 6 21 12 15 18" />
                  </svg>
                </div>
              </div>

              <div className="pt-5 text-center">
                <h3 className="font-heading text-lg md:text-xl font-medium text-foreground">
                  {p.title}
                </h3>
              </div>
            </article>
          ))}
        </div>

        {/* Subtle footer message + CTA */}
        <div className="mt-20 md:mt-24 text-center">
          <p className="text-sm md:text-base text-muted-foreground italic mb-6">
            More transformations coming soon.
          </p>
          <Button
            variant="gold-outline"
            onClick={scrollToQuote}
            className="rounded-full px-8 h-12 text-sm font-semibold tracking-[0.15em] uppercase"
          >
            Request Your Free Quote
          </Button>
        </div>
      </div>
    </section>
  );
}
