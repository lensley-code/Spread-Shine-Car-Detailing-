import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import autoImg from "@/assets/hero-detailing.jpg";
import homeImg from "@/assets/gallery/house-wash.jpg";

const autoItems = [
  "Exterior Hand Wash",
  "Interior Detailing",
  "Full Detail Packages",
  "Engine Bay Cleaning",
  "Headlight Restoration",
  "Maintenance Services (Oil Changes, Brake Pads, Tire Assistance, Diagnostics)",
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

const scrollToQuote = () =>
  document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="mt-8 space-y-3.5">
      {items.map((it) => (
        <li
          key={it}
          className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-foreground/85"
        >
          <span
            aria-hidden="true"
            className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-primary/45 text-primary shrink-0"
          >
            <Check size={12} strokeWidth={2.75} />
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function FeatureRow({
  eyebrow,
  heading,
  description,
  items,
  image,
  imageAlt,
  reverse,
}: {
  eyebrow: string;
  heading: string;
  description: string;
  items: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      {/* Image */}
      <div className={`relative ${reverse ? "lg:order-2" : "lg:order-1"}`}>
        <div
          aria-hidden="true"
          className="absolute -inset-4 bg-primary/10 rounded-[2rem] blur-2xl opacity-60"
        />
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]">
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            width={1200}
            height={1500}
            className="w-full h-full object-cover aspect-[4/5]"
          />
        </div>
      </div>

      {/* Content */}
      <div className={reverse ? "lg:order-1" : "lg:order-2"}>
        <p className="text-primary text-[11px] sm:text-xs tracking-[0.35em] uppercase font-semibold mb-4">
          {eyebrow}
        </p>
        <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] mb-5 text-foreground">
          {heading}
        </h3>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
          {description}
        </p>

        <Checklist items={items} />

        <div className="mt-10">
          <Button
            variant="gold-outline"
            onClick={scrollToQuote}
            className="rounded-full h-12 px-8 text-sm tracking-wide"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Offerings() {
  return (
    <section
      id="services"
      className="surface-white relative w-full py-24 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-10"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24">
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

        {/* Two large feature rows */}
        <div className="space-y-24 lg:space-y-32">
          <FeatureRow
            eyebrow="Auto Care"
            heading="Auto Detailing"
            description="Professional care that restores your vehicle inside and out with attention to every detail."
            items={autoItems}
            image={autoImg}
            imageAlt="Freshly detailed luxury vehicle with a mirror-like finish"
          />
          <FeatureRow
            eyebrow="Home Care"
            heading="Exterior Home Care"
            description="Protect and refresh your home's exterior with professional cleaning and maintenance services."
            items={homeItems}
            image={homeImg}
            imageAlt="Beautiful South Florida home with a pristine exterior"
            reverse
          />
        </div>
      </div>
    </section>
  );
}
