import { Button } from "@/components/ui/button";

const PhilosophySection = () => {
  return (
    <section id="philosophy" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3">Our Philosophy</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light mb-6">
            Where Faith Meets the Cosmos
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            At Luz Astrology, we believe the stars are not controllers of destiny but part of God's magnificent creation — a celestial language through which divine wisdom is expressed. The Magi followed a star to find the Christ child; Abraham was told to count the stars. The heavens have always been a canvas of God's promises.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Our readings combine scriptural wisdom with astrological insight, providing a faith-centered path to understanding your divine purpose and spiritual alignment.
          </p>
          <Button variant="gold" className="rounded-full px-8">
            Explore Our Approach →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
