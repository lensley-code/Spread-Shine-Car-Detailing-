import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { SOCIAL_PROFILES } from "@/config/latestSocialPosts";

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

const SOCIAL_LINKS = [
  { href: SOCIAL_PROFILES.tiktok, label: "TikTok", Icon: TikTokIcon },
].filter((s) => !!s.href) as ReadonlyArray<{ href: string; label: string; Icon: typeof TikTokIcon }>;

const PHONE_HREF = "tel:9542046940";

const navItems = [
  { label: "Home", href: "/", isPage: true },
  { label: "Services", href: "/#services" },
  { label: "Our Work", href: "/our-work", isPage: true },
  { label: "About", href: "/about", isPage: true },
  { label: "Contact", href: "/contact", isPage: true },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const [path, hash] = href.split("#");
    const targetId = hash;

    if (location.pathname === "/" || location.pathname === path) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleQuoteClick = () => {
    setMobileOpen(false);
    if (location.pathname === "/") {
      document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const isActivePage = (href: string) => {
    return location.pathname === href;
  };

  const getLinkClasses = (item: typeof navItems[0]) => {
    const isActive = item.isPage && isActivePage(item.href);
    return `relative text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-300 pb-1
      ${isActive
        ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:rounded-full"
        : "text-[hsl(40_20%_82%)] hover:text-[hsl(40_60%_75%)]"
      }`;
  };

  const getMobileLinkClasses = (item: typeof navItems[0]) => {
    const isActive = item.isPage && isActivePage(item.href);
    return `block py-4 text-base font-medium tracking-wide transition-all duration-300 min-h-[48px]
      ${isActive
        ? "text-primary"
        : "text-[hsl(40_20%_82%)] hover:text-[hsl(40_60%_75%)]"
      }`;
  };


  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-[hsl(40_30%_30%/0.2)]"
      style={{ backgroundColor: "hsl(0 0% 7% / 0.9)" }}
    >
      <div className="container mx-auto flex items-center justify-between h-[72px] lg:h-20 px-5 lg:px-10">
        <Link
          to="/"
          className="flex items-center gap-2.5"
          onClick={() => {
            setMobileOpen(false);
            if (location.pathname !== "/") {
              navigate("/");
              setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <img
            src="/logo.png"
            alt="SoSpreadShine logo"
            className="h-10 w-10 object-contain"
          />
          <div className="leading-none">
            <span className="block font-heading text-[20px] sm:text-[22px] font-semibold text-[hsl(0_0%_95%)]">
              SoSpreadShine
            </span>
            <span className="block mt-0.5 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-primary/80 font-medium">
              Detailing & Home Care
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) =>
            item.isPage ? (
              <Link
                key={item.label}
                to={item.href}
                className={getLinkClasses(item)}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className={getLinkClasses(item)}
              >
                {item.label}
              </a>
            )
          )}
        </div>

        <div className="hidden lg:flex items-center gap-5">
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(40_20%_82%)] hover:text-primary transition-colors"
            aria-label="Call SoSpreadShine at 954-204-6940"
          >
            <Phone size={15} className="text-primary" /> (954) 204-6940
          </a>
          <Button
            variant="gold"
            className="rounded-full px-6 h-11 text-sm font-semibold tracking-wide"
            onClick={handleQuoteClick}
          >
            Get a Free Quote
          </Button>
        </div>

        <button
          className="lg:hidden text-[hsl(40_20%_90%)]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="lg:hidden backdrop-blur-xl border-b border-[hsl(40_30%_30%/0.2)] px-5 pb-5 pt-1"
          style={{ backgroundColor: "hsl(0 0% 7% / 0.95)" }}
        >
          {navItems.map((item) =>
            item.isPage ? (
              <Link
                key={item.label}
                to={item.href}
                className={getMobileLinkClasses(item)}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  setMobileOpen(false);
                  handleAnchorClick(e, item.href);
                }}
                className={getMobileLinkClasses(item)}
              >
                {item.label}
              </a>
            )
          )}
          <a
            href={PHONE_HREF}
            onClick={() => setMobileOpen(false)}
            aria-label="Call SoSpreadShine at 954-204-6940"
            className="mt-4 flex items-center justify-center gap-2 rounded-full h-12 px-6 border-2 border-primary text-primary text-sm font-semibold tracking-wide"
          >
            <Phone size={16} /> Call (954) 204-6940
          </a>
          <Button
            variant="gold"
            className="rounded-full px-7 h-12 text-sm font-semibold tracking-wide mt-3 w-full"
            onClick={handleQuoteClick}
          >
            Get My Free Quote
          </Button>


          {/* Mobile social icons */}
          <div className="flex items-center justify-center gap-6 pt-5 mt-4 border-t border-[hsl(40_30%_30%/0.2)]">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                onClick={() => setMobileOpen(false)}
                className="transition-all duration-300 hover:text-primary hover:-translate-y-0.5 hover:[filter:drop-shadow(0_0_8px_hsl(var(--primary)/0.5))]"
                style={{ color: "hsl(0 0% 85% / 0.85)" }}
              >
                <Icon className="w-[20px] h-[20px]" />
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
