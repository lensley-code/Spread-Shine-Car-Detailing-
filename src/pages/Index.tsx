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

// Palette anchors — dark for hero/footer, white for all content sections.
const DARK = "#111111";
const WHITE = "#FFFFFF";
const SOFT_GRAY = "#F8F9FA";

const Index = () => {
  useEffect(() => {
    setPageSeo({ path: "/" });
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* 1. Hero (dark) */}
      <HeroSection />
      {/* Dark → white: keep curved seam for clean contrast */}
      <SectionDivider from={DARK} to={WHITE} soft={false} className="-mt-px relative z-0" />

      {/* 2. Services (white) */}
      <Offerings />
      {/* Elegant organic curve — white → soft gray */}
      <SectionDivider from={WHITE} to={SOFT_GRAY} variant="curve" direction="up" height={80} />

      {/* 3. Why Choose SoSpreadShine (sits on soft-gray) */}
      <AnimatedSection>
        <AboutSection />
      </AnimatedSection>
      {/* Mirrored organic curve — soft gray → white */}
      <SectionDivider from={SOFT_GRAY} to={WHITE} variant="curve" direction="up" height={80} />

      {/* 4. Request Your Free Quote (white) */}
      <QuoteSection />
      {/* White → dark: curved seam into footer band */}
      <SectionDivider from={WHITE} to={DARK} soft={false} />

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

