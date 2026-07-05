import { ShieldCheck, Sparkles, BadgeDollarSign, Heart } from "lucide-react";
import whyChooseImage from "@/assets/why-choose.jpg";

const features = [
  {
    icon: ShieldCheck,
    title: "Reliable Service",
    description: "We arrive on time, communicate clearly, and treat your property with respect.",
  },
  {
    icon: Sparkles,
    title: "Attention to Detail",
    description: "Every surface receives the care it deserves, from start to finish.",
  },
  {
    icon: BadgeDollarSign,
    title: "Honest Pricing",
    description: "Clear, upfront pricing with no hidden surprises.",
  },
  {
    icon: Heart,
    title: "Customer Satisfaction",
    description: "Our success is measured by the quality of our work and the trust of our customers.",
  },
];

const scrollToQuote = () => {
  const el = document.getElementById("contact") || document.getElementById("quote");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const AboutSection = () => (
  <section
    id="learn-more"
    className="surface-cream relative py-20 lg:py-32 overflow-hidden"
  >

    <div className="container mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* LEFT: Image */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 shadow-2xl">
            <img
              src={whyChooseImage}
              alt="Professional detailer polishing a luxury vehicle in South Florida"
              width={1280}
              height={1280}
              loading="lazy"
              className="w-full h-full object-cover aspect-[4/5] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/50 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* RIGHT: Content */}
        <div className="space-y-8">
          <div className="space-y-5">
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground leading-tight">
              Why Choose <span className="text-primary">SoSpreadShine?</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At SoSpreadShine, every project is treated with care, professionalism, and attention to detail. Whether we're restoring the shine to your vehicle or refreshing your home's exterior, our goal is simple: deliver quality work you can be proud of.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" strokeWidth={1.75} />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={scrollToQuote}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-medium tracking-wide shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.03] transition-all duration-300"
            >
              Request a Free Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
