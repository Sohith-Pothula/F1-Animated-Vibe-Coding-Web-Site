"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer
      id="contact"
      ref={ref}
      style={{ backgroundColor: "#FFFFFF", borderTop: "2px solid #CC0000" }}
    >
      {/* Top contact strip */}
      <div
        className="py-16 px-6 lg:px-10"
        style={{ borderBottom: "1px solid #E0E0E0" }}
      >
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Left */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 flex items-center justify-center border-2 border-f1-red"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                <span className="text-f1-red font-bold">F1</span>
              </div>
              <div>
                <p
                  className="text-[#111111] text-sm font-black tracking-[0.15em]"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  FORMULA 1
                </p>
                <p
                  className="text-f1-red text-xs font-semibold tracking-widest"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  CHALLENGER
                </p>
              </div>
            </div>
            <p
              className="text-[#666666] text-base max-w-xs leading-relaxed"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              Engineered to Win. Every millisecond engineered with purpose,
              every component sculpted for performance.
            </p>
          </motion.div>

          {/* Center quick links */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
            className="flex flex-col gap-3"
          >
            <p
              className="text-[#111111] text-[9px] font-bold tracking-[0.3em] mb-1"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              NAVIGATE
            </p>
            {["STORY", "SPECS", "AERO", "CONTACT"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[#666666] text-sm hover:text-f1-red transition-colors duration-300 tracking-widest group flex items-center gap-2"
                style={{ fontFamily: "var(--font-rajdhani)" }}
              >
                <span className="w-0 h-[1px] bg-f1-red group-hover:w-3 transition-all duration-300" />
                {link}
              </a>
            ))}
          </motion.div>

          {/* Right CTA */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
            className="flex flex-col items-start lg:items-end gap-4"
          >
            <p
              className="text-[#111111] text-[9px] font-bold tracking-[0.3em]"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              READY TO RACE?
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-4 bg-f1-red text-white text-[10px] font-bold tracking-[0.2em] hover:bg-[#FF1A1A] transition-colors duration-300 shadow-lg shadow-red-200"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              CONTACT THE TEAM
            </a>
            <p
              className="text-[#AAAAAA] text-[10px] tracking-[0.1em]"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              Response within 24 hours · Maranello, Italy
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-5 px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-[#AAAAAA] text-[10px] tracking-[0.15em]"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            © 2025 FORMULA 1 CHALLENGER · ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-2">
            {["NEXT.JS", "FRAMER MOTION", "LENIS", "TYPESCRIPT"].map((t, i) => (
              <span key={t} className="flex items-center gap-2">
                <span
                  className="text-[#CCCCCC] text-[9px] tracking-[0.1em]"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  {t}
                </span>
                {i < 3 && <span className="text-f1-red text-[10px]">·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
