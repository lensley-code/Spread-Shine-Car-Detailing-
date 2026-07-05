import { Sparkles, CalendarCheck, Video, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Sparkles,
    title: "Choose your reading",
    description: "Select the session that fits the season you're walking through.",
  },
  {
    icon: CalendarCheck,
    title: "Share your birth details",
    description: "Provide your date, time, and place of birth so we can prepare your chart.",
  },
  {
    icon: Video,
    title: "Meet live online",
    description: "Join a one-on-one video session — conversational, prayerful, and unhurried.",
  },
  {
    icon: Star,
    title: "Receive insight for your season",
    description: "Walk away with clarity, scripture-rooted reflection, and next steps.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14 lg:mb-20">
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3">How It Works</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light">
            Your Reading Journey
          </h2>
          <p className="mt-5 text-muted-foreground text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
            A simple guided experience from booking to insight.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connector line — desktop horizontal */}
          <div
            className="hidden lg:block absolute top-8 left-0 right-0 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.4) 15%, hsl(var(--primary) / 0.4) 85%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 relative">
            {steps.map((step, i) => (
              <li key={step.title} className="relative flex flex-col items-center text-center px-2">
                {/* Numbered circle / icon */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-background border border-primary/40 flex items-center justify-center shadow-[0_8px_24px_-12px_hsl(var(--primary)/0.45)]">
                  <step.icon size={22} className="text-primary" strokeWidth={1.5} />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center shadow-md">
                    {i + 1}
                  </span>
                </div>

                <h3 className="font-heading text-lg lg:text-xl font-medium mt-6 mb-2 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[260px]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex justify-center mt-14 lg:mt-20">
          <Link to="/book">
            <Button
              variant="gold"
              className="rounded-full px-8 h-12 text-sm font-semibold tracking-[0.15em] uppercase"
            >
              Book Your Reading
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
