import { Link } from "react-router-dom";
import { SOCIAL_PROFILES } from "@/config/latestSocialPosts";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/#services" },
  { label: "Our Work", to: "/#gallery" },
  { label: "About", to: "/#about" },
  { label: "Contact", to: "/contact" },
];

// TikTok icon (Lucide doesn't ship one — minimal inline SVG matching Lucide style)
const TikTokIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Footer = () => {
  return (
    <footer
      className="relative pt-14 pb-8 isolate"
      style={{
        background:
          "radial-gradient(1100px 420px at 50% 0%, rgba(200,168,78,0.06), transparent 65%), linear-gradient(180deg, #0B1024 0%, #070B1C 100%)",
        color: "rgba(232, 230, 240, 0.75)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.45) 50%, transparent 100%)",
        }}
      />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start text-center md:text-left">
          {/* Brand */}
          <div>
            <div className="relative inline-flex items-center justify-center md:justify-start gap-2">
              <span className="text-primary text-xl">✦</span>
              <span
                className="font-heading text-lg font-semibold tracking-wide"
                style={{ color: "rgba(245, 243, 235, 0.95)" }}
              >
                SoSpreadShine
              </span>
            </div>
            <p
              className="mt-3 text-sm font-light max-w-xs mx-auto md:mx-0"
              style={{ color: "rgba(232, 230, 240, 0.6)" }}
            >
              Professional auto detailing and exterior cleaning services in South Florida.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="relative transition-all duration-300 hover:text-primary hover:[text-shadow:0_0_12px_hsl(var(--primary)/0.4)] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-primary/70 after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                style={{ color: "rgba(232, 230, 240, 0.72)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social + CTA */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex items-center gap-5">
              {SOCIAL_PROFILES.tiktok && (
                <a
                  href={SOCIAL_PROFILES.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="transition-all duration-300 hover:text-primary hover:-translate-y-0.5 hover:[filter:drop-shadow(0_0_8px_hsl(var(--primary)/0.5))]"
                  style={{ color: "rgba(232, 230, 240, 0.7)" }}
                >
                  <TikTokIcon className="w-[18px] h-[18px]" />
                </a>
              )}
            </div>
            <Link
              to="/#quote"
              className="group inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-300 hover:[text-shadow:0_0_12px_hsl(var(--primary)/0.4)]"
              style={{ color: "hsl(var(--primary))" }}
            >
              Request a Free Quote
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        <div
          className="mt-12 pt-6 text-center border-t"
          style={{ borderColor: "rgba(232, 230, 240, 0.08)" }}
        >
          <p
            className="text-[10.5px] tracking-[0.18em] uppercase font-light"
            style={{ color: "rgba(232, 230, 240, 0.4)" }}
          >
            © 2026 SoSpreadShine. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
