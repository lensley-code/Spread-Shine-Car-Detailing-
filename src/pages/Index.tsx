import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import Offerings from "@/components/luz/Offerings";
import Gallery from "@/components/luz/Gallery";
import QuoteSection from "@/components/luz/QuoteSection";
import FinalCTABand from "@/components/luz/FinalCTABand";
import { setPageSeo } from "@/lib/seo";

const Index = () => {
  useEffect(() => {
    setPageSeo({ path: "/" });
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* 1. Hero — Who are you? What do you do? */}
      <HeroSection />

      {/* 2. Services — Can you solve my problem? */}
      <Offerings />

      {/* 3. Why Choose SoSpreadShine — Why trust you? */}
      <AnimatedSection>
        <AboutSection />
      </AnimatedSection>

      {/* 4. Before & After Gallery — Proof */}
      <Gallery />

      {/* 5. Request Your Free Quote — How do I hire you? */}
      <QuoteSection />

      {/* Sticky final CTA band */}
      <FinalCTABand />

      <AnimatedSection>
        <Footer />
      </AnimatedSection>
    </div>
  );
};

export default Index;
