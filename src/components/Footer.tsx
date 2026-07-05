import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { SOCIAL_PROFILES } from "@/config/latestSocialPosts";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/#services" },
  { label: "Gallery", to: "/#gallery" },
  { label: "About", to: "/about" },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 items-start">
          {/* Brand */}
          <div>
            <div className="inline-flex items-center gap-2">
              <span className="text-primary text-xl">✦</span>
              <span
                className="font-heading text-lg font-semibold tracking-wide"
                style={{ color: "rgba(245, 243, 235, 0.95)" }}
              >
                SoSpreadShine
              </span>
            </div>
            <p
              className="mt-3 text-sm font-light max-w-xs"
              style={{ color: "rgba(232, 230, 240, 0.6)" }}
            >
              Professional auto detailing and exterior cleaning services in South Florida.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-heading text-sm font-semibold tracking-wide mb-4"
              style={{ color: "rgba(245, 243, 235, 0.95)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="transition-colors duration-300 hover:text-primary"
                    style={{ color: "rgba(232, 230, 240, 0.72)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4
              className="font-heading text-sm font-semibold tracking-wide mb-4"
              style={{ color: "rgba(245, 243, 235, 0.95)" }}
            >
              Contact Us
            </h4>
            <ul className="space-y-2.5 text-sm" style={{ color: "rgba(232, 230, 240, 0.72)" }}>
              <li>
                <a
                  href="tel:9542046940"
                  className="inline-flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Phone size={14} className="text-primary" /> (954) 204-6940
                </a>
              </li>
              <li>
                <a
                  href="mailto:jhonnyjb@sospreadshine.com"
                  className="inline-flex items-center gap-2 hover:text-primary transition-colors break-all"
                >
                  <Mail size={14} className="text-primary shrink-0" /> jhonnyjb@sospreadshine.com
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin size={14} className="text-primary" /> Serving South Florida
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4
              className="font-heading text-sm font-semibold tracking-wide mb-4"
              style={{ color: "rgba(245, 243, 235, 0.95)" }}
            >
              Follow Us
            </h4>
            <ul className="space-y-2 text-sm">
              {SOCIAL_PROFILES.tiktok && (
                <li>
                  <a
                    href={SOCIAL_PROFILES.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-primary"
                    style={{ color: "rgba(232, 230, 240, 0.72)" }}
                  >
                    <TikTokIcon className="w-4 h-4 text-primary" />
                    TikTok — @jhonnyjeanbaptist18
                  </a>
                </li>
              )}
            </ul>
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
