import { Button } from "@/components/ui/button";
import { MapPin, BadgeDollarSign, ShieldCheck, Sparkles, Phone } from "lucide-react";
import heroBg from "@/assets/hero-detailing.jpg";

const trustIndicators = [
  { label: "Locally Owned", Icon: MapPin },
  { label: "Honest Pricing", Icon: BadgeDollarSign },
  { label: "Reliable Service", Icon: ShieldCheck },
  { label: "Satisfaction Focused", Icon: Sparkles },
];

const HeroSection = () => {
  return (
    <section
      className="relative w-full flex flex-col justify-end sm:justify-center overflow-hidden min-h-screen min-h-[100svh]"
    >
      <img
        src={heroBg}
        alt="Freshly detailed luxury vehicle with a mirror-like finish"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover object-[72%_35%] sm:object-center select-none pointer-events-none"
        draggable={false}
      />
      {/* Subtle overall darken for readability */}
      <div className="absolute inset-0 bg-background/40 sm:bg-background/55" />
      {/* Mobile: strong bottom gradient; Desktop: left gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background from-[28%] via-background/70 via-[50%] to-transparent sm:bg-gradient-to-r sm:from-background/85 sm:via-background/50 sm:to-transparent" />

      <div
        className="container relative z-10 mx-auto px-6 sm:px-4 lg:px-8 pt-24 sm:pt-24"
        style={{
          paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))",
        }}
      >
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="text-primary font-body text-[10px] sm:text-sm tracking-[0.35em] uppercase mb-3 sm:mb-4">
            SoSpreadShine
          </p>

          {/* Headline */}
          <h1 className="font-heading text-[1.75rem] leading-[1.15] sm:text-5xl lg:text-6xl xl:text-7xl font-semibold sm:leading-[1.1] mb-4 sm:mb-6 text-foreground">
            Professional Auto Detailing
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            & Exterior Cleaning
          </h1>

          {/* Subheadline */}
          <p className="text-foreground/85 text-sm sm:text-lg lg:text-xl max-w-xl mb-7 sm:mb-9 leading-relaxed">
            From premium detailing to pressure washing and exterior cleaning,
            SoSpreadShine delivers reliable, high-quality service with attention
            to every detail.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row flex-wrap gap-3 sm:gap-4 mb-7 sm:mb-9">
            <Button
              variant="gold"
              className="rounded-full h-11 px-6 sm:px-8 text-xs sm:text-sm"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              GET A FREE QUOTE
            </Button>
            <Button
              variant="gold-outline"
              className="rounded-full h-11 px-6 sm:px-8 text-xs sm:text-sm inline-flex items-center gap-2"
              asChild
            >
              <a href="tel:+19542046940">
                <Phone size={16} strokeWidth={2} />
                CALL (954) 204-6940
              </a>
            </Button>
          </div>

          {/* Trust indicators */}
          <ul className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-5 gap-y-2.5 sm:gap-x-6">
            {trustIndicators.map(({ label, Icon }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-[11px] sm:text-xs text-muted-foreground"
              >
                <Icon size={14} className="text-primary shrink-0" strokeWidth={1.75} />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
