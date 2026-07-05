import { ShieldCheck, Sparkles, BadgeDollarSign, Heart } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Reliable Service",
    description: "We show up on time, communicate clearly, and respect your property.",
  },
  {
    icon: Sparkles,
    title: "Attention to Detail",
    description: "Every vehicle and property receives careful, hands-on attention.",
  },
  {
    icon: BadgeDollarSign,
    title: "Honest Pricing",
    description: "Clear quotes with fair pricing and no unnecessary surprises.",
  },
  {
    icon: Heart,
    title: "Customer Satisfaction",
    description: "We take pride in work that earns trust and repeat customers.",
  },
];

const scrollToQuote = () => {
  const el = document.getElementById("quote") || document.getElementById("contact");
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

const AboutSection = () => (
  <section id="learn-more" className="surface-white relative">
    <div className="py-14 sm:py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <p className="text-primary text-xs sm:text-sm tracking-[0.3em] uppercase font-medium">
            Why Choose Us
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight">
            Quality Work. Honest Service. Every Time.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            SoSpreadShine is built on simple values: reliable communication, careful
            workmanship, fair pricing, and results you can see.
          </p>
        </div>

        <div className="mt-16 lg:mt-20 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 md:gap-y-14">
          {values.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-4 items-start">
              <Icon
                className="w-5 h-5 mt-1 text-primary shrink-0"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div>
                <h3 className="font-heading text-lg font-medium text-foreground mb-1.5">
                  {title}
                </h3>
                <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 lg:mt-20 flex justify-center">
          <button
            onClick={scrollToQuote}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-primary/60 text-foreground text-sm font-medium tracking-wide hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
          >
            Request a Free Quote
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;

