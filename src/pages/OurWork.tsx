import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SectionDivider from "@/components/SectionDivider";
import StickyMobileCTA from "@/components/luz/StickyMobileCTA";
import { Button } from "@/components/ui/button";
import { setPageSeo } from "@/lib/seo";

import driveway from "@/assets/gallery/driveway.jpg";
import houseWash from "@/assets/gallery/house-wash.jpg";
import autoDetail from "@/assets/gallery/auto-detail.jpg";
import poolDeck from "@/assets/gallery/pool-deck.jpg";

const DARK = "#111111";
const WHITE = "#FFFFFF";
const SOFT_WHITE = "#F8F9FA";
const LIGHT_GRAY = "#F3F4F6";

type Project = { id: string; title: string; image: string };

const AUTO_PROJECTS: Project[] = [
  { id: "a1", title: "Full Vehicle Detail", image: autoDetail },
];

const HOME_PROJECTS: Project[] = [
  { id: "h1", title: "House Washing", image: houseWash },
  { id: "h2", title: "Driveway Cleaning", image: driveway },
  { id: "h3", title: "Pool Deck Cleaning", image: poolDeck },
];

const ProjectCard = ({ p }: { p: Project }) => (
  <article className="group relative overflow-hidden rounded-2xl bg-card transition-all duration-500 animate-fade-in">
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
      <img
        src={p.image}
        alt={`${p.title} — before and after`}
        loading="lazy"
        width={1280}
        height={960}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-primary/80 shadow-[0_0_12px_hsl(var(--primary)/0.6)]" />
      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide bg-background/80 text-foreground backdrop-blur">
        Before
      </span>
      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide bg-background/80 text-foreground backdrop-blur">
        After
      </span>
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
);

const GalleryGroup = ({
  eyebrow,
  title,
  projects,
}: {
  eyebrow: string;
  title: string;
  projects: Project[];
}) => (
  <div className="max-w-6xl mx-auto mb-16 md:mb-20 last:mb-0">
    <div className="mb-10 md:mb-12 text-center">
      <p className="text-primary text-[11px] sm:text-xs tracking-[0.35em] uppercase font-semibold mb-3">
        {eyebrow}
      </p>
      <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground">
        {title}
      </h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((p) => (
        <ProjectCard key={p.id} p={p} />
      ))}
    </div>
  </div>
);

const OurWork = () => {
  useEffect(() => {
    setPageSeo({
      path: "/our-work",
      title: "Our Recent Work | SoSpreadShine Detailing & Home Care",
      description:
        "Browse real auto detailing and exterior home cleaning projects completed by SoSpreadShine throughout South Florida.",
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 px-5 sm:px-8 lg:px-10 bg-background">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-primary text-[11px] sm:text-xs tracking-[0.35em] uppercase font-semibold mb-4">
            Portfolio
          </p>
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-5">
            Our Recent Work
          </h1>
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed max-w-2xl mx-auto">
            See the difference professional detailing and exterior cleaning can make.
            Browse real projects completed throughout South Florida.
          </p>
        </div>
      </section>

      <SectionDivider from={DARK} to={SOFT_WHITE} className="-mt-px relative z-0" />

      {/* Gallery groups */}
      <section className="surface-cream py-14 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-10">
        <div className="container mx-auto">
          <AnimatedSection>
            <GalleryGroup
              eyebrow="Auto Detailing"
              title="Vehicle Transformations"
              projects={AUTO_PROJECTS}
            />
          </AnimatedSection>
          <AnimatedSection>
            <GalleryGroup
              eyebrow="Home Exterior Cleaning"
              title="Property Refreshes"
              projects={HOME_PROJECTS}
            />
          </AnimatedSection>
        </div>
      </section>

      <SectionDivider from={SOFT_WHITE} to={DARK} />

      {/* Final CTA */}
      <section className="relative py-16 sm:py-20 px-5 sm:px-8 lg:px-10 bg-background">
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
              <Link to="/#quote">Get a Free Quote</Link>
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
