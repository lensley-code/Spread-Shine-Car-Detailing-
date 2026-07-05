import { motion } from "framer-motion";
import { useState } from "react";
import { INSTAGRAM_URL, TIKTOK_URL } from "@/config/socialFeedConfig";

const X_URL = "https://x.com/prophluz111";

interface OrbitIcon {
  label: string;
  href: string;
  icon: React.ReactNode;
  angle: number;
}

function InstagramSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .56.04.82.11v-3.5a6.37 6.37 0 00-.82-.05A6.34 6.34 0 003.15 15.2 6.34 6.34 0 009.49 21.55a6.34 6.34 0 006.34-6.34V8.78a8.18 8.18 0 004.76 1.52V6.85a4.84 4.84 0 01-1-.16z" />
    </svg>
  );
}

function XSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const ORBIT_ICONS: OrbitIcon[] = [
  { label: "Instagram", href: INSTAGRAM_URL, icon: <InstagramSvg />, angle: 0 },
  { label: "TikTok", href: TIKTOK_URL, icon: <TikTokSvg />, angle: 120 },
  { label: "X", href: X_URL, icon: <XSvg />, angle: 240 },
];

function CenterStar() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
        style={{
          background: "radial-gradient(circle, hsla(40, 60%, 55%, 0.25) 0%, hsla(40, 60%, 55%, 0.05) 70%, transparent 100%)",
          boxShadow: "0 0 40px hsla(40, 60%, 55%, 0.15), 0 0 80px hsla(40, 60%, 55%, 0.05)",
        }}
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="none">
          <path
            d="M12 2L13.09 8.26L18 4.5L14.74 9.91L21 11L14.74 12.09L18 17.5L13.09 13.74L12 20L10.91 13.74L6 17.5L9.26 12.09L3 11L9.26 9.91L6 4.5L10.91 8.26L12 2Z"
            fill="hsla(40, 60%, 55%, 0.7)"
            stroke="hsla(40, 60%, 55%, 0.9)"
            strokeWidth="0.5"
          />
        </svg>
      </div>
    </motion.div>
  );
}

export default function BeamCircle() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const orbitRadius = 100; // px, responsive via scale

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-8">
      {/* Supporting text */}
      <p
        className="text-xs tracking-[0.25em] uppercase"
        style={{ color: "var(--color-gold)", fontFamily: "var(--font-sans)", fontWeight: 600 }}
      >
        Stay Connected
      </p>

      {/* Orbit container */}
      <div
        className="relative mx-auto"
        style={{ width: orbitRadius * 2 + 64, height: orbitRadius * 2 + 64 }}
      >
        {/* Orbit ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "1px solid hsla(40, 60%, 55%, 0.12)",
            margin: 32,
          }}
        />

        {/* Second subtle ring */}
        <div
          className="absolute rounded-full"
          style={{
            inset: 16,
            border: "1px solid hsla(40, 60%, 55%, 0.06)",
          }}
        />

        {/* Center element */}
        <CenterStar />

        {/* Orbiting icons */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {ORBIT_ICONS.map((item, i) => {
            const angleRad = (item.angle * Math.PI) / 180;
            const cx = orbitRadius + 32; // center offset
            const cy = orbitRadius + 32;
            const x = cx + orbitRadius * Math.cos(angleRad);
            const y = cy + orbitRadius * Math.sin(angleRad);

            return (
              <motion.a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow on ${item.label}`}
                className="absolute flex items-center justify-center rounded-full cursor-pointer"
                style={{
                  width: 48,
                  height: 48,
                  left: x - 24,
                  top: y - 24,
                  background: hoveredIndex === i
                    ? "hsla(40, 60%, 55%, 0.18)"
                    : "hsla(40, 30%, 90%, 0.1)",
                  border: `1px solid ${hoveredIndex === i ? "hsla(40, 60%, 55%, 0.5)" : "hsla(40, 60%, 55%, 0.15)"}`,
                  color: hoveredIndex === i
                    ? "var(--color-gold)"
                    : "var(--color-text-light)",
                  boxShadow: hoveredIndex === i
                    ? "0 0 20px hsla(40, 60%, 55%, 0.2)"
                    : "0 2px 8px rgba(0,0,0,0.04)",
                  transition: "all 0.3s ease",
                }}
                animate={{ rotate: -360 }} // counter-rotate so icons stay upright
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(i)}
                onBlur={() => setHoveredIndex(null)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
              </motion.a>
            );
          })}
        </motion.div>
      </div>

      {/* Label below */}
      <p
        className="text-center text-sm italic"
        style={{
          color: "var(--color-text-light)",
          fontFamily: "var(--font-serif)",
          maxWidth: 260,
        }}
      >
        Follow the orbit — faith, stars & everyday wisdom
      </p>
    </div>
  );
}
