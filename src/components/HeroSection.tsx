import { Button } from "@/components/ui/button";
import { ShieldCheck, Clock, BadgeDollarSign, Star, Phone, ChevronRight } from "lucide-react";
import heroBg from "@/assets/hero-detailing.jpg";

const trustIndicators = [
  { title: "20+ Years", subtitle: "Experience", Icon: ShieldCheck },
  { title: "Reliable", subtitle: "& On Time", Icon: Clock },
  { title: "Honest", subtitle: "Pricing", Icon: BadgeDollarSign },
  { title: "100% Customer", subtitle: "Satisfaction", Icon: Star },
];

const HeroSection = () => {
  return (
    <section
      className="relative w-full flex flex-col justify-end sm:justify-center overflow-hidden min-h-screen min-h-[100svh]"
    >
      <img
        src={heroBg}
        alt="Freshly detailed luxury vehicle at sunset with palm trees in South Florida"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover object-[72%_35%] sm:object-center select-none pointer-events-none"
        draggable={false}
      />
      {/* Subtle overall darken for readability */}
      <div className="absolute inset-0 bg-background/40 sm:bg-background/55" />
      {/* Mobile: strong bottom gradient; Desktop: left gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background from-[28%] via-background/70 via-[50%] to-transparent sm:bg-gradient-to-r sm:from-background/90 sm:via-background/55 sm:to-transparent" />

      <div
        className="container relative z-10 mx-auto px-6 sm:px-4 lg:px-8 pt-24 sm:pt-24"
        style={{
          paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))",
        }}
      >
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="inline-flex items-center gap-1.5 text-primary font-body text-[10px] sm:text-sm tracking-[0.35em] uppercase mb-4 sm:mb-5 font-medium">
            <ChevronRight size={14} className="text-primary" strokeWidth={2.5} />
            Detailing. Cleaning. Care.
          </p>

          {/* Headline */}
          <h1 className="font-heading text-[2rem] leading-[1.1] sm:text-5xl lg:text-6xl xl:text-7xl font-semibold sm:leading-[1.05] mb-5 sm:mb-6 text-foreground">
            Professional Shine.
            <br />
            Inside <span className="text-primary">&amp;</span> Out.
          </h1>

          {/* Subheadline */}
          <p className="text-foreground/85 text-sm sm:text-lg lg:text-xl max-w-xl mb-7 sm:mb-9 leading-relaxed">
            Expert auto detailing, exterior cleaning, and home care services
            throughout South Florida.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 mb-9 sm:mb-11">
            <Button
              variant="gold"
              className="w-full sm:w-auto rounded-full h-12 sm:h-12 px-7 sm:px-8 text-sm"
              onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}
            >
              GET A FREE QUOTE
            </Button>
            <Button
              variant="gold-outline"
              className="w-full sm:w-auto rounded-full h-12 sm:h-12 px-7 sm:px-8 text-sm inline-flex items-center justify-center gap-2"
              asChild
            >
              <a href="tel:+19542046940">
                <Phone size={16} strokeWidth={2} />
                CALL (954) 204-6940
              </a>
            </Button>
          </div>

          {/* Trust indicators */}
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-4 sm:gap-x-8 max-w-2xl">
            {trustIndicators.map(({ title, subtitle, Icon }) => (
              <li
                key={title}
                className="flex items-center gap-2.5"
              >
                <Icon size={22} className="text-primary shrink-0" strokeWidth={1.5} />
                <div className="leading-tight">
                  <p className="text-[12px] sm:text-[13px] font-semibold text-foreground">{title}</p>
                  <p className="text-[11px] sm:text-xs text-muted-foreground">{subtitle}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
