import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import StickyMobileCTA from "@/components/luz/StickyMobileCTA";
import { Button } from "@/components/ui/button";
import { setPageSeo } from "@/lib/seo";
import { cn } from "@/lib/utils";
import PortfolioCarousel, { type Project } from "@/components/work/PortfolioCarousel";

import driveway from "@/assets/gallery/driveway.jpg";
import houseWash from "@/assets/gallery/house-wash.jpg";
import autoDetail from "@/assets/gallery/auto-detail.jpg";
import autoInterior from "@/assets/gallery/auto-interior.jpg";
import poolDeck from "@/assets/gallery/pool-deck.jpg";
import walkway from "@/assets/gallery/walkway.jpg";
import roof from "@/assets/gallery/roof.jpg";
import exteriorSurface from "@/assets/gallery/exterior-surface.jpg";

const PROJECTS: Project[] = [
  { id: "p1", title: "Full Vehicle Detail", category: "Auto", label: "Auto Detailing", image: autoDetail },
  { id: "p2", title: "Interior Deep Clean", category: "Auto", label: "Auto Detailing", image: autoInterior },
  { id: "p3", title: "House Washing", category: "Home", label: "Exterior Cleaning", image: houseWash },
  { id: "p4", title: "Driveway Cleaning", category: "Home", label: "Pressure Washing", image: driveway },
  { id: "p5", title: "Pool Deck Cleaning", category: "Home", label: "Pressure Washing", image: poolDeck },
  { id: "p6", title: "Walkway Restoration", category: "Home", label: "Exterior Cleaning", image: walkway },
  { id: "p7", title: "Roof Soft Wash", category: "Home", label: "Exterior Cleaning", image: roof },
  { id: "p8", title: "Surface Refresh", category: "Home", label: "Exterior Cleaning", image: exteriorSurface },
];

const FILTERS = [
  { key: "All", label: "All" },
  { key: "Auto", label: "Auto" },
  { key: "Home", label: "Home" },
] as const;

const OurWork = () => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("All");

  useEffect(() => {
    setPageSeo({
      path: "/our-work",
      title: "Our Work | SoSpreadShine Detailing & Exterior Cleaning",
      description:
        "Browse recent auto detailing and exterior cleaning projects completed by SoSpreadShine throughout South Florida.",
    });
  }, []);

  const visible = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Intro */}
      <section className="pt-24 sm:pt-28 pb-8 sm:pb-10 px-5 sm:px-8 lg:px-10 bg-background">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-primary text-[11px] tracking-[0.35em] uppercase font-semibold mb-3">
            Our Work
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-4">
            Work that speaks for itself.
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Explore recent auto detailing and exterior cleaning projects completed throughout South Florida.
          </p>
        </div>
      </section>

      {/* Carousel */}
      <section className="pb-16 sm:pb-24 px-5 sm:px-8 lg:px-10 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                aria-pressed={filter === f.key}
                className={cn(
                  "h-9 px-4 rounded-full text-xs font-semibold tracking-[0.12em] uppercase border transition-colors",
                  filter === f.key
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border/70 text-muted-foreground hover:text-foreground"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <PortfolioCarousel projects={visible} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative pb-20 sm:pb-28 px-5 sm:px-8 lg:px-10 bg-background">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Ready to Make Your Property <span className="text-primary">Shine?</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed">
            Whether it's your vehicle or your home, we'd love to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button
              asChild
              variant="gold"
              className="w-full sm:w-auto rounded-full h-12 px-8 text-sm font-semibold tracking-wide"
            >
              <Link to="/contact">Get a Free Quote</Link>
            </Button>
            <Button
              asChild
              variant="gold-outline"
              className="w-full sm:w-auto rounded-full h-12 px-8 text-sm font-semibold tracking-wide"
            >
              <a href="tel:9542046940" aria-label="Call SoSpreadShine at 954-204-6940" className="inline-flex items-center gap-2">
                <Phone size={16} /> Call (954) 204-6940
              </a>
            </Button>
          </div>
        </div>
      </section>

      <AnimatedSection>
        <Footer />
      </AnimatedSection>

      <StickyMobileCTA />
    </div>
  );
};

export default OurWork;
