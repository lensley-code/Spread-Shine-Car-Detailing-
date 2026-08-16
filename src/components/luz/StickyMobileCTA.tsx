import { useEffect, useState } from "react";
import { Phone, ArrowRight } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const PHONE_HREF = "tel:9542046940";

const scrollToQuote = () => {
  const el = document.getElementById("quote");
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: "smooth" });
};

/**
 * Sticky bottom action bar shown on mobile only.
 * Appears after the user scrolls past the hero so it feels contextual, not intrusive.
 * Respects iOS safe-area insets.
 */
const StickyMobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show once past ~60vh of scroll (past the hero).
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`sm:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-3 mb-3 rounded-2xl border border-primary/25 bg-[hsl(0_0%_7%/0.96)] backdrop-blur shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] p-2 flex items-center gap-2">
        <a
          href={PHONE_HREF}
          aria-label="Call SoSpreadShine at 954-204-6940"
          className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-xl border border-primary/50 text-primary font-semibold text-sm active:scale-[0.98] transition-transform"
        >
          <Phone size={16} /> Call
        </a>
        <button
          type="button"
          onClick={scrollToQuote}
          className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm active:scale-[0.98] transition-transform"
        >
          Get Quote <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
