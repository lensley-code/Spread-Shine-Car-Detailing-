import { useNavigate } from "react-router-dom";
import {
  Car,
  Sparkles,
  ShieldCheck,
  Wrench,
  Sun,
  LifeBuoy,
  Disc,
  Gauge,
  Droplet,
  Home,
  CloudRain,
  Truck,
  Footprints,
  Waves,
  Trees,
  PaintBucket,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Service = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

const autoServices: Service[] = [
  { title: "Exterior Hand Wash", description: "Gentle, streak-free hand wash that protects your paint and restores gloss.", Icon: Droplet },
  { title: "Interior Detailing", description: "Deep vacuum, upholstery care, and surface cleaning for a like-new cabin.", Icon: Sparkles },
  { title: "Full Detail Packages", description: "Complete inside-and-out detailing for a showroom-quality finish.", Icon: Car },
  { title: "Engine Bay Cleaning", description: "Safe degreasing and dressing to keep your engine bay looking pristine.", Icon: Wrench },
  { title: "Headlight Restoration", description: "Clear away oxidation and haze to restore bright, safer visibility at night.", Icon: Sun },
  { title: "Flat Tire Assistance", description: "Fast on-the-spot tire changes so you can get back on the road quickly.", Icon: LifeBuoy },
  { title: "Brake Pad Replacement", description: "Reliable brake pad service using quality parts for confident stopping power.", Icon: Disc },
  { title: "Vehicle Diagnostics", description: "Professional inspection and diagnostic scans to pinpoint issues accurately.", Icon: Gauge },
  { title: "Oil Change", description: "Quick, clean oil and filter changes to keep your engine running smoothly.", Icon: ShieldCheck },
];

const homeServices: Service[] = [
  { title: "House Washing", description: "Soft wash treatments that safely remove dirt, mildew, and grime from siding.", Icon: Home },
  { title: "Roof Cleaning", description: "Gentle roof cleaning that eliminates stains and extends shingle life.", Icon: CloudRain },
  { title: "Driveway Cleaning", description: "High-powered cleaning that lifts oil, tire marks, and years of buildup.", Icon: Truck },
  { title: "Sidewalk Cleaning", description: "Refresh walkways and entry paths for a sharper, cleaner curb appeal.", Icon: Footprints },
  { title: "Patio & Pool Deck Cleaning", description: "Restore outdoor living spaces with thorough, surface-safe cleaning.", Icon: Waves },
  { title: "Outdoor Surface Cleaning", description: "Fences, retaining walls, and exterior surfaces cleaned with precision.", Icon: Trees },
  { title: "Painting", description: "Clean, even paint application for exteriors and touch-ups done right.", Icon: PaintBucket },
  { title: "Lawn Care & Landscaping", description: "Regular maintenance and detailing that keeps your yard looking its best.", Icon: Leaf },
];

function ServiceCard({ service }: { service: Service }) {
  const { Icon, title, description } = service;
  return (
    <article
      className="group relative rounded-2xl border border-border/60 bg-card p-6 sm:p-7 transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_18px_40px_-20px_hsl(var(--primary)/0.35)]"
    >
      <div
        className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary
                   transition-colors duration-300 group-hover:bg-primary/15"
      >
        <Icon size={22} strokeWidth={1.6} />
      </div>
      <h3 className="font-heading text-lg sm:text-xl font-semibold text-foreground mb-2 leading-snug">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </article>
  );
}

function CategoryBlock({
  emoji,
  title,
  services,
}: {
  emoji: string;
  title: string;
  services: Service[];
}) {
  return (
    <div>
      <div className="flex items-center justify-center gap-3 mb-8 sm:mb-10">
        <span className="text-2xl sm:text-3xl" aria-hidden="true">
          {emoji}
        </span>
        <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
          {title}
        </h3>
        <span
          className="hidden sm:block h-px w-16 bg-gradient-to-r from-primary/50 to-transparent ml-2"
          aria-hidden="true"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </div>
  );
}

export default function Offerings() {
  const navigate = useNavigate();

  return (
    <section
      id="services"
      className="relative w-full py-20 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-10 bg-background"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
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
            Whether it's restoring your vehicle's shine or refreshing your
            home's exterior, SoSpreadShine delivers reliable, detail-oriented
            service with quality you can see.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-16 sm:space-y-20">
          <CategoryBlock emoji="🚗" title="Auto Services" services={autoServices} />
          <CategoryBlock emoji="🏡" title="Home Services" services={homeServices} />
        </div>

        {/* CTA */}
        <div className="mt-16 sm:mt-20 flex justify-center">
          <Button
            variant="gold"
            className="rounded-full h-12 px-9 text-sm tracking-wide"
            onClick={() => navigate("/contact")}
          >
            REQUEST YOUR FREE QUOTE
          </Button>
        </div>
      </div>
    </section>
  );
}
