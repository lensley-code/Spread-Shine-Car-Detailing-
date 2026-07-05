import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section
      className="relative w-full flex flex-col justify-end sm:justify-center overflow-hidden min-h-screen min-h-[100svh]"
    >
      {/* Background Image — uses <img> with object-fit so focal point is consistent
          across Chrome / Edge / Safari mobile (background-size: cover renders
          slightly differently with dynamic viewport units on some engines). */}
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover object-[72%_22%] sm:object-center select-none pointer-events-none"
        draggable={false}
      />
      {/* Subtle overall darken */}
      <div className="absolute inset-0 bg-background/20 sm:bg-background/50" />
      {/* Mobile: strong bottom gradient for text zone; Desktop: left gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background from-[28%] via-background/70 via-[50%] to-transparent sm:bg-gradient-to-r sm:from-background/80 sm:via-background/40 sm:to-transparent" />

      <div
        className="container relative z-10 mx-auto px-6 sm:px-4 lg:px-8 pt-24 sm:pt-24"
        style={{
          paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))",
        }}
      >
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="text-primary font-body text-[10px] sm:text-sm tracking-[0.35em] uppercase mb-3 sm:mb-4">
            Faith & Alignment
          </p>

          {/* Headline */}
          <h1 className="font-heading text-[1.75rem] leading-[1.15] sm:text-5xl lg:text-6xl xl:text-7xl font-light sm:leading-[1.1] mb-2 sm:mb-4 max-w-[280px] sm:max-w-none">
            The heavens declare
            <br />
            the glory of God;
          </h1>

          {/* Scripture subline */}
          <p className="font-heading text-[1.05rem] sm:text-2xl lg:text-3xl italic text-foreground/80 mb-5 sm:mb-6 max-w-[260px] sm:max-w-none leading-snug">
            and the firmament sheweth
            <br />
            his handywork. <span className="text-primary">✦</span>
          </p>

          {/* Description — desktop only */}
          <p className="text-muted-foreground text-base max-w-md mb-8 leading-relaxed hidden sm:block">
            Welcome to Luz Astrology, where we begin a journey of spiritual
            growth and understanding what God has written concerning our lives
            in the stars.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-10">
            <Button
              variant="gold"
              className="rounded-full h-11 px-6 sm:px-8 text-xs sm:text-sm"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              BOOK A READING
            </Button>
            <Button
              variant="gold-outline"
              className="rounded-full h-11 px-6 sm:px-8 text-xs sm:text-sm"
              onClick={() => document.getElementById('learn-more')?.scrollIntoView({ behavior: 'smooth' })}
            >
              LEARN MORE →
            </Button>
          </div>

          {/* Trust row */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5 text-primary">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={14}
                  fill="currentColor"
                  className="sm:w-4 sm:h-4"
                />
              ))}
            </div>
            <p className="text-[11px] sm:text-xs text-muted-foreground">
              Trusted by seekers worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
