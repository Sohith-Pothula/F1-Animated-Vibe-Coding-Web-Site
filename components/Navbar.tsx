"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { f1Data } from "@/data/carData";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3, duration: 1, ease: EASE }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-white/90 border-b border-[#E0E0E0] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 flex items-center justify-center border-2 border-f1-red"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            <span className="text-f1-red text-sm font-bold tracking-tight">
              F1
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span
              className="text-near-black text-xs font-bold tracking-[0.2em]"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              FORMULA 1
            </span>
            <span className="text-[#E0E0E0] text-xs font-light">|</span>
            <span
              className="text-f1-red text-xs font-semibold tracking-widest"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              CHALLENGER
            </span>
          </div>
        </div>

        {/* Center: Links */}
        <div className="hidden md:flex items-center gap-8">
          {f1Data.navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[#111111] text-[11px] font-semibold tracking-[0.2em] hover:text-f1-red transition-colors duration-300 relative group h-8 flex items-center"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {link}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-f1-red group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Right: CTA — uniform height h-8, outlined → solid red on hover */}
        <a
          href="#contact"
          className="h-8 px-5 flex items-center border border-f1-red text-f1-red text-[10px] font-bold tracking-[0.15em] hover:bg-f1-red hover:text-white active:scale-95 transition-all duration-200"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          INQUIRE
        </a>
      </div>
    </motion.nav>
  );
}
