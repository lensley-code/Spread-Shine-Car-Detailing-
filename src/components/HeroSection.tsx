import { Button } from "@/components/ui/button";
import { ShieldCheck, Zap, BadgeDollarSign, Sparkles, Phone, ChevronRight } from "lucide-react";
import heroBg from "@/assets/hero-detailing.jpg";

const valueProps = [
  { title: "Reliable Service", Icon: ShieldCheck },
  { title: "Fast Response", Icon: Zap },
  { title: "Honest Pricing", Icon: BadgeDollarSign },
  { title: "Attention to Detail", Icon: Sparkles },
];

const desktopChips = [
  "Auto Detailing",
  "House Washing",
  "Roof Cleaning",
  "Driveway Cleaning",
];

const mobileChips = ["Auto Detailing", "Exterior Home Care"];

const scrollToQuote = () =>
  document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });

const HeroSection = () => {
  return (
    <section className="relative w-full bg-background sm:overflow-hidden sm:flex sm:flex-col sm:justify-center sm:min-h-screen">
      {/* ============ MOBILE (stacked, image as centerpiece) ============ */}
      <div className="sm:hidden relative px-5 pt-20 pb-0">
        {/* Eyebrow */}
        <p className="inline-flex items-center gap-1.5 text-primary font-body text-[10px] tracking-[0.35em] uppercase mb-3 font-medium">
          <ChevronRight size={14} className="text-primary" strokeWidth={2.5} />
          Detailing. Cleaning. Care.
        </p>

        {/* Headline */}
        <h1 className="font-heading text-[1.75rem] leading-[1.1] font-semibold mb-3 text-foreground max-w-[16ch]">
          Professional Shine.
          <br />
          Inside <span className="text-primary">&amp;</span> Out.
        </h1>

        {/* Sub */}
        <p className="text-foreground/80 text-[13px] max-w-[38ch] mb-5 leading-relaxed">
          Expert auto detailing, exterior cleaning, and home care throughout South Florida.
        </p>

        {/* Hero image — centerpiece, overlaps the divider below by ~28px */}
        <div className="relative -mx-1 mb-5 rounded-2xl overflow-hidden aspect-[4/3] shadow-[0_25px_60px_-25px_rgba(0,0,0,0.75)] ring-1 ring-primary/20 z-20 mb-[-28px]">
          <img
            src={heroBg}
            alt="Freshly detailed luxury vehicle at sunset with palm trees in South Florida"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
        </div>

        {/* Service chips */}
        <ul className="flex flex-wrap gap-2 mt-8 mb-4">
          {mobileChips.map((chip) => (
            <li
              key={chip}
              className="px-3.5 py-1.5 rounded-full border border-primary/60 text-foreground/95 text-[12px] font-medium tracking-wide bg-background/60 backdrop-blur-sm"
            >
              {chip}
            </li>
          ))}
        </ul>

        {/* Primary CTA */}
        <Button
          variant="gold"
          onClick={scrollToQuote}
          className="w-full rounded-full h-12 px-7 text-sm mb-2.5"
        >
          GET A FREE QUOTE
        </Button>

        {/* Secondary CTA */}
        <Button
          variant="gold-outline"
          asChild
          className="w-full rounded-full h-12 px-7 text-sm inline-flex items-center justify-center gap-2.5 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-background/40 backdrop-blur-sm mb-4"
        >
          <a href="tel:+19542046940">
            <Phone size={18} strokeWidth={2.25} />
            CALL (954) 204-6940
          </a>
        </Button>
      </div>

      {/* ============ DESKTOP (background image layout, unchanged) ============ */}
      <div className="hidden sm:block relative w-full">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover sm:object-center select-none pointer-events-none"
          draggable={false}
        />
        <div className="absolute inset-0 bg-background/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/55 to-transparent" />

        <div
          className="container relative z-10 mx-auto px-4 lg:px-8 pt-24"
          style={{ paddingBottom: "max(1.75rem, env(safe-area-inset-bottom))" }}
        >
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-1.5 text-primary font-body text-sm tracking-[0.35em] uppercase mb-5 font-medium">
              <ChevronRight size={14} className="text-primary" strokeWidth={2.5} />
              Detailing. Cleaning. Care.
            </p>

            <h1 className="font-heading text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.05] mb-6 text-foreground max-w-[16ch]">
              Professional Shine.
              <br />
              Inside <span className="text-primary">&amp;</span> Out.
            </h1>

            <p className="text-foreground/85 text-lg lg:text-xl max-w-xl mb-9 leading-relaxed">
              Expert auto detailing, exterior cleaning, and home care throughout South Florida.
            </p>

            <div className="flex flex-row flex-wrap gap-4 mb-11">
              <Button
                variant="gold"
                className="rounded-full h-12 px-8 text-sm"
                onClick={scrollToQuote}
              >
                GET A FREE QUOTE
              </Button>
              <Button
                variant="gold-outline"
                asChild
                className="rounded-full h-12 px-8 text-sm inline-flex items-center justify-center gap-2.5 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-background/30 backdrop-blur-sm"
              >
                <a href="tel:+19542046940">
                  <Phone size={20} strokeWidth={2.25} />
                  CALL (954) 204-6940
                </a>
              </Button>
            </div>

            <ul className="flex flex-wrap gap-2 mb-8">
              {desktopChips.map((chip) => (
                <li
                  key={chip}
                  className="px-3 py-1.5 rounded-full border border-primary/50 text-foreground/90 text-xs font-medium tracking-wide bg-background/25 backdrop-blur-sm"
                >
                  {chip}
                </li>
              ))}
            </ul>

            <ul className="grid grid-cols-4 gap-3 max-w-2xl">
              {valueProps.map(({ title, Icon }) => (
                <li
                  key={title}
                  className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 backdrop-blur-sm px-3 py-2.5"
                >
                  <Icon size={18} className="text-primary shrink-0" strokeWidth={1.5} />
                  <p className="text-[13px] font-semibold text-foreground leading-tight">{title}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
