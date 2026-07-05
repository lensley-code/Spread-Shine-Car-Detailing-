import { useMemo, useState } from "react";
import { Home as HomeIcon, Car as CarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";


import driveway from "@/assets/gallery/driveway.jpg";
import roof from "@/assets/gallery/roof.jpg";
import houseWash from "@/assets/gallery/house-wash.jpg";
import poolDeck from "@/assets/gallery/pool-deck.jpg";
import dock from "@/assets/gallery/dock.jpg";
import walkway from "@/assets/gallery/walkway.jpg";
import exteriorSurface from "@/assets/gallery/exterior-surface.jpg";
import landscaping from "@/assets/gallery/landscaping.jpg";
import autoDetail from "@/assets/gallery/auto-detail.jpg";
import autoInterior from "@/assets/gallery/auto-interior.jpg";

type Category = "auto" | "home";

type Project = {
  id: string;
  title: string;
  description: string;
  category: Category;
  image: string;
};

const PROJECTS: Project[] = [
  { id: "p1", title: "Driveway Cleaning", description: "Removed years of dirt and stains.", category: "home", image: driveway },
  { id: "p2", title: "Roof Cleaning", description: "Restored the roof and boosted curb appeal.", category: "home", image: roof },
  { id: "p3", title: "House Washing", description: "Soft washed to remove algae and buildup.", category: "home", image: houseWash },
  { id: "p4", title: "Pool Deck Cleaning", description: "Clean, safe, and ready to enjoy.", category: "home", image: poolDeck },
  { id: "p5", title: "Dock & Seawall Cleaning", description: "Removed buildup and restored appearance.", category: "home", image: dock },
  { id: "p6", title: "Paver Walkway Cleaning", description: "Deep cleaned for a like-new finish.", category: "home", image: walkway },
  { id: "p7", title: "Exterior Surface Cleaning", description: "We clean all exterior surfaces with care.", category: "home", image: exteriorSurface },
  { id: "p8", title: "Lawn Care & Landscaping", description: "Keeping your property looking its best.", category: "home", image: landscaping },
  { id: "p9", title: "Luxury Exterior Detail", description: "Paint decontamination and gloss restoration.", category: "auto", image: autoDetail },
  { id: "p10", title: "Interior Deep Clean", description: "Upholstery and cabin restored to factory fresh.", category: "auto", image: autoInterior },
];

const FILTERS: { key: "all" | Category; label: string }[] = [
  { key: "all", label: "All Projects" },
  { key: "auto", label: "Auto" },
  { key: "home", label: "Home" },
];

export default function Gallery() {
  const navigate = useNavigate();
  const [active, setActive] = useState<"all" | Category>("all");

  const items = useMemo(
    () => (active === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section id="gallery" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            See the Difference Quality Makes
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">
            Real results from real projects. Every detail matters, and our work speaks for itself.
          </p>
        </div>

        {/* Filters — segmented control */}
        <div className="flex justify-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-1 p-1 rounded-full border border-border bg-card/60 backdrop-blur">
            {FILTERS.map((f) => {
              const isActive = active === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setActive(f.key)}
                  className={[
                    "px-5 md:px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                  aria-pressed={isActive}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
          {items.map((p) => {
            const CategoryIcon = p.category === "home" ? HomeIcon : CarIcon;
            const categoryLabel = p.category === "home" ? "Home" : "Auto";
            return (
              <article
                key={p.id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-primary hover:shadow-2xl hover:shadow-primary/25 animate-fade-in"
              >
                {/* Image with before/after treatment */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={`${p.title} — before and after`}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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

                  {/* Fade-in overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Body */}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
                    <CategoryIcon size={14} />
                    <span>{categoryLabel}</span>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 md:mt-24 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-4xl font-bold text-foreground">
            Ready to Transform Your Vehicle or Property?
          </h3>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">
            Get a free quote today and let SoSpreadShine bring back the shine.
          </p>
          <Button
            onClick={() => navigate("/contact")}
            size="lg"
            className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-semibold tracking-wide rounded-full shadow-lg hover:shadow-primary/30 transition-all"
          >
            Get My Free Quote
          </Button>
        </div>
      </div>
    </section>
  );
}
