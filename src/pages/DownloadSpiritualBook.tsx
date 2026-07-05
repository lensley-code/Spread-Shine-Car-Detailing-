import { useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { setPageSeo } from "@/lib/seo";
import { supabase } from "@/integrations/supabase/client";

// Temporary final destination — swap this URL when the book is rehosted.
const BOOK_PDF_URL = "https://canva.link/ivpe0g9jp7km58w";

async function logCanvaClick(trigger: "auto_redirect" | "manual_fallback") {
  try {
    // Push to dataLayer / gtag if present
    const w = window as unknown as {
      dataLayer?: Array<Record<string, unknown>>;
      gtag?: (...args: unknown[]) => void;
    };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: "canva_book_link_clicked",
      page: "/download/spiritual-book",
      trigger,
      destination: BOOK_PDF_URL,
    });
    if (typeof w.gtag === "function") {
      w.gtag("event", "canva_book_link_clicked", {
        page: "/download/spiritual-book",
        trigger,
        destination: BOOK_PDF_URL,
      });
    }

    // Persist to backend so we can count clicks reliably
    await supabase.from("analytics_events").insert({
      event_name: "canva_book_link_clicked",
      page: "/download/spiritual-book",
      metadata: { trigger, destination: BOOK_PDF_URL },
      user_agent:
        typeof navigator !== "undefined" ? navigator.userAgent : null,
      referrer: typeof document !== "undefined" ? document.referrer : null,
    });
  } catch {
    // analytics is best-effort
  }
}

export default function DownloadSpiritualBook() {
  useEffect(() => {
    setPageSeo({
      path: "/download/spiritual-book",
      title: "Preparing Your Free Spiritual Book · Luz Astrology",
      description:
        "Your complimentary copy of Spiritual Astrology & God's Voice and Purposes in the Stars is being prepared.",
    });

    // Fire analytics event
    try {
      const w = window as unknown as {
        dataLayer?: Array<Record<string, unknown>>;
        gtag?: (...args: unknown[]) => void;
      };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: "free_book_download_clicked",
        page: "/download/spiritual-book",
      });
      if (typeof w.gtag === "function") {
        w.gtag("event", "free_book_download_clicked", {
          page: "/download/spiritual-book",
        });
      }
    } catch {
      // analytics is best-effort
    }

    // Persist landing event so we can compare landings vs clicks
    void supabase
      .from("analytics_events")
      .insert({
        event_name: "free_book_download_clicked",
        page: "/download/spiritual-book",
        metadata: {},
        user_agent:
          typeof navigator !== "undefined" ? navigator.userAgent : null,
        referrer: typeof document !== "undefined" ? document.referrer : null,
      })
      .then(() => {});

    const t = window.setTimeout(async () => {
      await logCanvaClick("auto_redirect");
      window.location.replace(BOOK_PDF_URL);
    }, 1000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: "var(--color-bg)", color: "var(--color-text)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 500px at 50% -10%, rgba(200,168,78,0.10), transparent 60%), radial-gradient(700px 500px at 90% 10%, rgba(91, 116, 168, 0.08), transparent 60%)",
        }}
      />
      <Navbar />

      <main className="px-5 sm:px-6 pt-32 sm:pt-40 pb-24">
        <section className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-7 flex items-center justify-center"
          >
            <div
              className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(200,168,78,0.25), rgba(200,168,78,0.06) 70%)",
                border: "1px solid rgba(200,168,78,0.35)",
                boxShadow:
                  "0 0 0 6px rgba(200,168,78,0.06), 0 18px 50px -20px rgba(200,168,78,0.45)",
              }}
            >
              <Loader2
                size={32}
                strokeWidth={1.6}
                className="animate-spin"
                style={{ color: "var(--color-gold)" }}
              />
              <Sparkles
                size={14}
                className="absolute"
                style={{ top: 8, right: 10, color: "var(--color-gold)", opacity: 0.7 }}
              />
            </div>
          </motion.div>

          <p
            className="text-[0.7rem] tracking-[0.28em] uppercase font-semibold mb-3"
            style={{ color: "var(--color-gold)" }}
          >
            Complimentary Spiritual Book
          </p>

          <h1
            className="font-serif font-medium leading-tight mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.75rem, 4.2vw, 2.6rem)",
              color: "var(--color-text)",
            }}
          >
            Preparing your free spiritual book…
          </h1>

          <p
            className="max-w-xl mx-auto leading-relaxed"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "1.05rem",
              color: "var(--color-text-light)",
            }}
          >
            Your complimentary copy is opening in a new tab. If it doesn't begin in a moment,{" "}
            <a
              href={BOOK_PDF_URL}
              onClick={() => {
                void logCanvaClick("manual_fallback");
              }}
              className="underline underline-offset-4"
              style={{ color: "var(--color-gold)" }}
              rel="noopener noreferrer"
            >
              tap here to access your book
            </a>
            .
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}