"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { f1Data } from "@/data/carData";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Marquee item sets ──────────────────────── */
const ROW_TOP = [
  { text: "0–100 KM/H", accent: "2.4 SEC" },
  { text: "HYBRID POWER", accent: "1,000 HP" },
  { text: "DRY WEIGHT", accent: "798 KG" },
  { text: "TOP SPEED", accent: "350+ KM/H" },
  { text: "DOWNFORCE", accent: "1,000 KG" },
  { text: "DRS SYSTEM", accent: "ACTIVE" },
  { text: "ENGINE", accent: "1.6L TURBO V6" },
  { text: "ORIGIN", accent: "MARANELLO" },
];

const ROW_BOTTOM = [
  { text: "CARBON MONOCOQUE", accent: "CHASSIS" },
  { text: "HALO LOAD", accent: "12 TONNES" },
  { text: "TORQUE", accent: "680 NM" },
  { text: "DISPLACEMENT", accent: "1.6L" },
  { text: "STEERING FUNCS", accent: "200+" },
  { text: "AERO FLAPS", accent: "4 ACTIVE" },
  { text: "SEASON", accent: "2025" },
  { text: "MGU-K + MGU-H", accent: "HYBRID UNITS" },
];

function MarqueeLane({
  items,
  reverse = false,
  dark = false,
}: {
  items: { text: string; accent: string }[];
  reverse?: boolean;
  dark?: boolean;
}) {
  /* Duplicate for seamless loop */
  const doubled = [...items, ...items];

  return (
    <div
      className="w-full overflow-hidden py-3 flex items-center relative"
      style={{
        backgroundColor: dark ? "#111111" : "#FFFFFF",
        borderBottom: dark ? "none" : "1px solid #E8E8E8",
      }}
    >
      {/* Edge fade masks */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{
          background: dark
            ? "linear-gradient(to right, #111111, transparent)"
            : "linear-gradient(to right, #FFFFFF, transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{
          background: dark
            ? "linear-gradient(to left, #111111, transparent)"
            : "linear-gradient(to left, #FFFFFF, transparent)",
        }}
      />

      {/* Scrolling track */}
      <div
        style={{
          display: "flex",
          flexShrink: 0,
          animation: `marquee${reverse ? "Rev" : "Fwd"} 32s linear infinite`,
          gap: "0px",
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center flex-shrink-0"
            style={{ gap: 0 }}
          >
            <span
              className="flex items-center gap-2 px-6 flex-shrink-0"
            >
              <span
                style={{
                  fontFamily: "var(--font-orbitron)",
                  fontSize: "9px",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  color: dark ? "#777777" : "#999999",
                  whiteSpace: "nowrap",
                }}
              >
                {item.text}
              </span>
              <span style={{ color: "#CC0000", fontSize: "8px", margin: "0 4px" }}>▸</span>
              <span
                style={{
                  fontFamily: "var(--font-orbitron)",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                  color: dark ? "#FFFFFF" : "#111111",
                  whiteSpace: "nowrap",
                }}
              >
                {item.accent}
              </span>
            </span>
            {/* Red dot separator */}
            <span
              style={{
                display: "inline-block",
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                backgroundColor: "#CC0000",
                flexShrink: 0,
                margin: "0 8px",
              }}
            />
          </div>
        ))}
      </div>

      {/* Injected keyframe styles */}
      <style>{`
        @keyframes marqueeFwd {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRev {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

function MarqueeBanner() {
  return (
    <div
      className="w-full"
      style={{ borderTop: "2px solid #CC0000", borderBottom: "2px solid #CC0000" }}
    >
      {/* Top lane — white bg, scrolls left */}
      <MarqueeLane items={ROW_TOP} reverse={false} dark={false} />
      {/* Bottom lane — dark bg, scrolls right */}
      <MarqueeLane items={ROW_BOTTOM} reverse={true} dark={true} />
    </div>
  );
}

export default function SpecsGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="specs"
      ref={ref}
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* ── Premium Racing Marquee Banner ── */}
      <MarqueeBanner />

      <div className="py-20 lg:py-28 px-6 lg:px-10 max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-[2px] bg-f1-red" />
              <span
                className="text-f1-red text-[10px] font-bold tracking-[0.3em]"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                TECHNICAL DATA
              </span>
            </div>
            <h2
              className="text-[#111111] text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              PERFORMANCE
              <br />
              <span className="text-f1-red">SPECIFICATIONS</span>
            </h2>
          </div>
          <p
            className="text-[#666666] text-base lg:text-lg max-w-xs leading-relaxed"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            Every number a result of relentless engineering. No compromise.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E0E0E0]">
          {f1Data.specs.map((spec, index) => (
            <motion.div
              key={spec.label}
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: index * 0.07, duration: 0.7, ease: EASE }}
              className="group relative bg-white p-6 lg:p-8 hover:bg-[#FFF5F5] transition-colors duration-500 overflow-hidden cursor-default"
            >
              {/* Red accent bottom line */}
              <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-f1-red group-hover:w-full transition-all duration-500 ease-out" />

              {/* Big number */}
              <p
                className="text-[#111111] text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight group-hover:text-f1-red transition-colors duration-500 tabular-nums"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {spec.value}
              </p>

              {/* Unit */}
              <p
                className="text-f1-red text-[10px] font-bold tracking-[0.2em] mt-1"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {spec.unit}
              </p>

              {/* Label */}
              <p
                className="text-[#888888] text-xs tracking-[0.12em] mt-4 uppercase"
                style={{ fontFamily: "var(--font-rajdhani)" }}
              >
                {spec.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stat bar — full width visual accent */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 1.2, ease: EASE }}
          className="mt-10 h-[2px] bg-f1-red origin-left"
        />

        {/* Bottom caption */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-4 text-[#AAAAAA] text-[10px] tracking-[0.2em]"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          * SPECIFICATIONS REPRESENT HYBRID ERA FORMULA 1 CONFIGURATION — MARANELLO 2025
        </motion.p>
      </div>
    </section>
  );
}
