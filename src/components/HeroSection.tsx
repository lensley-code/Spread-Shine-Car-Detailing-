import { Button } from "@/components/ui/button";
import { ShieldCheck, Zap, BadgeDollarSign, Sparkles, Phone, ChevronRight } from "lucide-react";
import heroBg from "@/assets/hero-detailing.jpg";

const valueProps = [
  { title: "Reliable Service", Icon: ShieldCheck },
  { title: "Fast Response", Icon: Zap },
  { title: "Honest Pricing", Icon: BadgeDollarSign },
  { title: "Attention to Detail", Icon: Sparkles },
];

const serviceChips = [
  "Auto Detailing",
  "House Washing",
  "Roof Cleaning",
  "Driveway Cleaning",
];

const HeroSection = () => {
  return (
    <section className="relative w-full flex flex-col justify-end sm:justify-center overflow-hidden min-h-[80svh] sm:min-h-screen">
      <img
        src={heroBg}
        alt="Freshly detailed luxury vehicle at sunset with palm trees in South Florida"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover object-[72%_35%] sm:object-center select-none pointer-events-none"
        draggable={false}
      />
      <div className="absolute inset-0 bg-background/45 sm:bg-background/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-background from-[28%] via-background/70 via-[50%] to-transparent sm:bg-gradient-to-r sm:from-background/90 sm:via-background/55 sm:to-transparent" />

      <div
        className="container relative z-10 mx-auto px-6 sm:px-4 lg:px-8 pt-20 sm:pt-24"
        style={{ paddingBottom: "max(1.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="inline-flex items-center gap-1.5 text-primary font-body text-[10px] sm:text-sm tracking-[0.35em] uppercase mb-3 sm:mb-5 font-medium">
            <ChevronRight size={14} className="text-primary" strokeWidth={2.5} />
            Detailing. Cleaning. Care.
          </p>

          {/* Headline */}
          <h1 className="font-heading text-[1.75rem] leading-[1.1] sm:text-5xl lg:text-6xl xl:text-7xl font-semibold sm:leading-[1.05] mb-3 sm:mb-6 text-foreground max-w-[16ch]">
            Professional Shine.
            <br />
            Inside <span className="text-primary">&amp;</span> Out.
          </h1>

          {/* Subheadline */}
          <p className="text-foreground/85 text-[13px] sm:text-lg lg:text-xl max-w-[38ch] sm:max-w-xl mb-5 sm:mb-9 leading-relaxed">
            Expert auto detailing, exterior cleaning, and home care throughout South Florida.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2.5 sm:gap-4 mb-4 sm:mb-11">
            <Button
              variant="gold"
              className="w-full sm:w-auto rounded-full h-12 px-7 sm:px-8 text-sm"
              onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}
            >
              GET A FREE QUOTE
            </Button>
            <Button
              variant="gold-outline"
              className="w-full sm:w-auto rounded-full h-12 px-7 sm:px-8 text-sm inline-flex items-center justify-center gap-2.5 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-background/30 backdrop-blur-sm"
              asChild
            >
              <a href="tel:+19542046940">
                <Phone size={20} strokeWidth={2.25} />
                CALL (954) 204-6940
              </a>
            </Button>
          </div>

          {/* Service chips */}
          <ul className="flex flex-wrap gap-2 mb-6 sm:mb-8">
            {serviceChips.map((chip) => (
              <li
                key={chip}
                className="px-3 py-1.5 rounded-full border border-primary/50 text-foreground/90 text-[11px] sm:text-xs font-medium tracking-wide bg-background/25 backdrop-blur-sm"
              >
                {chip}
              </li>
            ))}
          </ul>

          {/* Value props */}
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-2xl">
            {valueProps.map(({ title, Icon }) => (
              <li
                key={title}
                className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 backdrop-blur-sm px-2.5 py-2 sm:px-3 sm:py-2.5"
              >
                <Icon size={18} className="text-primary shrink-0" strokeWidth={1.5} />
                <p className="text-[11.5px] sm:text-[13px] font-semibold text-foreground leading-tight">{title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
