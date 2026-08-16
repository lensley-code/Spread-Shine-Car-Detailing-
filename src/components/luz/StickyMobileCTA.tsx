import { useEffect, useRef, useState } from "react";
import { Phone, MessageCircle, X, ArrowRight } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const PHONE_HREF = "tel:9542046940";
const WHATSAPP_HREF = "https://wa.me/19542046940";

const goToQuote = () => {
  const el = document.getElementById("quote");
  if (!el) {
    window.location.href = "/#quote";
    return;
  }
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: "smooth" });
};

/**
 * Compact floating contact widget — mobile only.
 * Collapsed: a single circular toggle. Expanded: Get Quote / WhatsApp / Call.
 * Hides while the quote form is on screen and respects iOS safe-area insets.
 */
const StickyMobileCTA = () => {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.6;
      const quote = document.getElementById("quote");
      let quoteOnScreen = false;
      if (quote) {
        const r = quote.getBoundingClientRect();
        quoteOnScreen = r.top < window.innerHeight * 0.8 && r.bottom > 0;
      }
      setVisible(pastHero && !quoteOnScreen);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!visible) setOpen(false);
  }, [visible]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const itemBase =
    "inline-flex items-center gap-2 h-10 pl-3 pr-4 rounded-full text-sm font-semibold shadow-[0_6px_18px_-6px_rgba(0,0,0,0.35)] active:scale-[0.97] transition-transform";

  return (
    <div
      ref={wrapRef}
      className={`sm:hidden fixed z-40 transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{
        right: "18px",
        bottom: "calc(20px + env(safe-area-inset-bottom))",
      }}
    >
      <div className="flex flex-col items-end gap-2">
        <div
          className={`flex flex-col items-end gap-2 transition-all duration-200 ${
            open
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
          aria-hidden={!open}
        >
          <button
            type="button"
            tabIndex={open ? 0 : -1}
            onClick={() => {
              setOpen(false);
              goToQuote();
            }}
            className={`${itemBase} bg-primary text-primary-foreground`}
          >
            Get Quote <ArrowRight size={15} />
          </button>

          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
            aria-label="Chat with SoSpreadShine on WhatsApp"
            onClick={() => setOpen(false)}
            className={`${itemBase} bg-white text-foreground border border-black/10`}
          >
            <WhatsAppIcon size={16} className="text-[#25D366]" /> WhatsApp
          </a>

          <a
            href={PHONE_HREF}
            tabIndex={open ? 0 : -1}
            aria-label="Call SoSpreadShine at 954-204-6940"
            onClick={() => setOpen(false)}
            className={`${itemBase} bg-white text-foreground border border-black/10`}
          >
            <Phone size={15} /> Call
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close contact options" : "Open contact options"}
          className="inline-flex items-center justify-center h-[54px] w-[54px] rounded-full bg-[hsl(0_0%_7%)] text-primary shadow-[0_8px_24px_-8px_rgba(0,0,0,0.55)] active:scale-95 transition-transform"
        >
          {open ? <X size={22} /> : <MessageCircle size={22} />}
        </button>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
