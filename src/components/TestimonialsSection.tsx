import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    text: "Luz Astrology helped me understand my spiritual gifts in a way that felt deeply aligned with my faith. Truly transformative.",
    rating: 5,
  },
  {
    name: "David R.",
    text: "I was skeptical at first, but the biblical foundation made all the difference. My reading was profound and encouraging.",
    rating: 5,
  },
  {
    name: "Maria L.",
    text: "The insights about my relationships were incredibly accurate. I feel more connected to God's plan for my life.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3">Testimonials</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light">
            Words from Seekers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-card/50 border border-border/30 rounded-lg p-6">
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
          <Button variant="gold" className="rounded-full px-8">
            Book Your Reading →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
