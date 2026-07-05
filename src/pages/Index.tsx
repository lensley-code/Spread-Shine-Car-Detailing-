import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SectionDivider from "@/components/SectionDivider";
import Offerings from "@/components/luz/Offerings";
import Gallery from "@/components/luz/Gallery";
import QuoteSection from "@/components/luz/QuoteSection";
import FinalCTABand from "@/components/luz/FinalCTABand";
import StickyMobileCTA from "@/components/luz/StickyMobileCTA";
import { setPageSeo } from "@/lib/seo";

// Premium neutral palette anchors
const DARK = "#111111";
const WHITE = "#FFFFFF";
const SOFT_WHITE = "#F8F9FA";
const LIGHT_GRAY = "#F3F4F6";

const Index = () => {
  useEffect(() => {
    setPageSeo({ path: "/" });
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* 1. Hero — Who are you? What do you do? */}
      <HeroSection />
      <SectionDivider from={DARK} to={SOFT_WHITE} />

      {/* 2. Services — Can you solve my problem? */}
      <Offerings />
      <SectionDivider from={SOFT_WHITE} to={WHITE} />

      {/* 3. Why Choose SoSpreadShine — Why trust you? */}
      <AnimatedSection>
        <AboutSection />
      </AnimatedSection>
      <SectionDivider from={WHITE} to={LIGHT_GRAY} />

      {/* 4. Before & After Gallery — Proof */}
      <Gallery />
      <SectionDivider from={LIGHT_GRAY} to={WHITE} />

      {/* 5. Request Your Free Quote — How do I hire you? */}
      <QuoteSection />
      <SectionDivider from={WHITE} to={DARK} />

      {/* Sticky final CTA band */}
      <FinalCTABand />

      <AnimatedSection>
        <Footer />
      </AnimatedSection>
    </div>
  );
};

export default Index;
