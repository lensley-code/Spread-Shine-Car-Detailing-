import { Phone } from "lucide-react";

const FinalCTABand = () => {
  const scrollToQuote = () => {
    const el = document.getElementById("quote");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative py-14 sm:py-16 px-5 sm:px-8 lg:px-10 border-y border-primary/20"
      style={{
        backgroundColor: "hsl(0 0% 6%)",
        backgroundImage:
          "radial-gradient(ellipse 70% 90% at 50% 50%, hsl(46 65% 52% / 0.14) 0%, transparent 65%)",
      }}
    >
      <div className="container mx-auto max-w-5xl text-center">
        <h2
          className="font-heading font-semibold text-foreground mb-3 tracking-tight"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", lineHeight: 1.15 }}
        >
          Ready to Bring Back the Shine?
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Professional auto detailing and exterior cleaning throughout South Florida.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={scrollToQuote}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-9 py-4 text-sm font-semibold uppercase tracking-[0.1em] bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            Get My Free Quote
          </button>
          <a
            href="tel:9542046940"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-9 py-4 text-sm font-semibold uppercase tracking-[0.1em] border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <Phone size={15} /> Call (954) 204-6940
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTABand;
