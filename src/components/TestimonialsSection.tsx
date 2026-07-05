import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Customer Review",
    text: "SoSpreadShine did an amazing job on my car. It looked clean, fresh, and professionally detailed.",
    rating: 5,
  },
  {
    name: "Customer Review",
    text: "Great communication, fair pricing, and quality work. I would definitely use them again.",
    rating: 5,
  },
  {
    name: "Customer Review",
    text: "My driveway and outdoor area looked completely refreshed. Reliable and professional service.",
    rating: 5,
  },
];

const scrollToQuote = () => {
  const el = document.getElementById("quote");
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3">Testimonials</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light">
            What Customers Are Saying
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-card/50 border border-border/30 rounded-lg p-6">
              <div className="flex gap-0.5 text-primary mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
              <p className="text-sm font-semibold">{t.name}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="gold" onClick={scrollToQuote} className="rounded-full px-8">
            Request a Free Quote →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
