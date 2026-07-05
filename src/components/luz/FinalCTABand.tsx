import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      className="relative py-10 sm:py-12 px-5 sm:px-8 lg:px-10 border-y border-primary/20"
      style={{
        backgroundColor: "hsl(0 0% 6%)",
      }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
              Ready to Bring Back the Shine?
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-muted-foreground">
              Professional detailing and home care services you can count on.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-3 sm:gap-4 shrink-0">
            <Button
              variant="gold"
              onClick={scrollToQuote}
              className="w-full sm:w-auto rounded-full h-12 px-7 text-sm font-semibold tracking-wide"
            >
              Get a Free Quote
            </Button>
            <Button
              variant="gold-outline"
              asChild
              className="w-full sm:w-auto rounded-full h-12 px-7 text-sm font-semibold tracking-wide"
            >
              <a href="tel:9542046940" className="inline-flex items-center gap-2">
                <Phone size={15} /> Call (954) 204-6940
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTABand;
