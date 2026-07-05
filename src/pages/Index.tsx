import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import Offerings from "@/components/luz/Offerings";
import LuzTestimonials from "@/components/luz/Testimonials";
import Gallery from "@/components/luz/Gallery";
import GuideBanner from "@/components/luz/GuideBanner";
import { setPageSeo } from "@/lib/seo";

const Index = () => {
  useEffect(() => {
    setPageSeo({ path: "/" });
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <AnimatedSection>
        <FeaturesSection />
      </AnimatedSection>
      <Offerings />
      <LuzTestimonials />
      <GuideBanner />
      <Gallery />
      <AnimatedSection>
        <Footer />
      </AnimatedSection>
    </div>
  );
};

export default Index;
