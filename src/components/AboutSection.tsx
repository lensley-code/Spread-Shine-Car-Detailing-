import PortraitCard from "./about/PortraitCard";
import AboutTextBlock from "./about/AboutTextBlock";

const AboutSection = () => (
  <section
    id="learn-more"
    className="relative py-20 lg:py-32 overflow-hidden"
    style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(40 30% 96%) 8%, hsl(40 30% 96%) 97%, hsl(222 47% 6% / 0.4) 100%)" }}
  >
    <div className="container mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="flex justify-center lg:justify-start">
          <PortraitCard />
        </div>
        <AboutTextBlock />
      </div>
    </div>
  </section>
);

export default AboutSection;
