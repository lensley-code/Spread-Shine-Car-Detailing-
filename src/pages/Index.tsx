import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SectionDivider from "@/components/SectionDivider";
import Offerings from "@/components/luz/Offerings";
import QuoteSection from "@/components/luz/QuoteSection";
import FinalCTABand from "@/components/luz/FinalCTABand";
import StickyMobileCTA from "@/components/luz/StickyMobileCTA";
import { setPageSeo } from "@/lib/seo";

// Premium neutral palette anchors
const DARK = "#111111";
const WHITE = "#FFFFFF";
const SOFT_WHITE = "#F8F9FA";

const Index = () => {
  useEffect(() => {
    setPageSeo({ path: "/" });
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* 1. Hero */}
      <HeroSection />
      <SectionDivider from={DARK} to={SOFT_WHITE} className="-mt-px relative z-0" />

      {/* 2. Services */}
      <Offerings />
      <SectionDivider from={SOFT_WHITE} to={WHITE} />

      {/* 3. Why Choose SoSpreadShine */}
      <AnimatedSection>
        <AboutSection />
      </AnimatedSection>
      <SectionDivider from={WHITE} to={SOFT_WHITE} />

      {/* 4. Request Your Free Quote */}
      <QuoteSection />
      <SectionDivider from={WHITE} to={DARK} />

      {/* Sticky final CTA band (desktop) */}
      <FinalCTABand />

      <AnimatedSection>
        <Footer />
      </AnimatedSection>

      <StickyMobileCTA />
    </div>
  );
};

export default Index;
