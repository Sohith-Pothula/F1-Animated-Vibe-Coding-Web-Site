"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { f1Data } from "@/data/carData";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="features"
      ref={ref}
      style={{ backgroundColor: "#F5F5F5" }}
      className="py-20 lg:py-28"
    >
      <div className="px-6 lg:px-10 max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-[2px] bg-f1-red" />
            <span
              className="text-f1-red text-[10px] font-bold tracking-[0.3em]"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              ENGINEERING EXCELLENCE
            </span>
          </div>
          <h2
            className="text-[#111111] text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            DEFINING{" "}
            <span className="text-f1-red">FEATURES</span>
          </h2>
        </div>

        {/* Feature cards 2×2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {f1Data.features.map((feature, index) => (
            <motion.div
              key={feature.number}
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: index * 0.12, duration: 0.8, ease: EASE }}
              className="group bg-white border-l-[3px] border-f1-red px-6 py-6 hover:bg-[#FFF5F5] transition-colors duration-500 relative overflow-hidden"
            >
              {/* Large decorative number */}
              <span
                className="absolute top-3 right-5 text-6xl font-black text-[#F0F0F0] group-hover:text-[#FFE0E0] transition-colors duration-500 select-none"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {feature.number}
              </span>

              <div className="relative z-10">
                <span
                  className="text-f1-red text-[9px] font-bold tracking-[0.3em] block mb-2"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  {feature.number} ·
                </span>
                <h3
                  className="text-[#111111] text-lg sm:text-xl font-bold tracking-tight mb-3 group-hover:text-f1-red transition-colors duration-500"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-[#555555] text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  {feature.description}
                </p>
              </div>

              {/* Bottom progress bar on hover */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-f1-red group-hover:w-full transition-all duration-500 ease-out" />
            </motion.div>
          ))}
        </div>

        {/* ── Timeline / Milestones strip ── */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
          className="mt-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-[2px] bg-f1-red" />
            <span
              className="text-f1-red text-[10px] font-bold tracking-[0.3em]"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              DEVELOPMENT TIMELINE
            </span>
          </div>

          <div className="relative">
            {/* Horizontal spine */}
            <div className="absolute top-5 left-0 right-0 h-[1px] bg-[#E0E0E0]" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 relative">
              {[
                { year: "2021", event: "HYBRID ERA V2 REGULATIONS ANNOUNCED" },
                { year: "2022", event: "CHASSIS CONCEPT LOCKED" },
                { year: "2023", event: "WIND TUNNEL TESTING 48,000 HOURS" },
                { year: "2025", event: "CHALLENGER DEBUTS ON TRACK" },
              ].map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.6, ease: EASE }}
                  className="flex flex-col items-center text-center pt-2 px-4"
                >
                  {/* Dot on spine */}
                  <div
                    className={`w-3 h-3 rounded-full border-2 mb-4 ${
                      i === 3 ? "bg-f1-red border-f1-red" : "bg-white border-[#CCCCCC]"
                    }`}
                  />
                  <p
                    className={`text-xl font-black tracking-tight mb-1 ${
                      i === 3 ? "text-f1-red" : "text-[#111111]"
                    }`}
                    style={{ fontFamily: "var(--font-orbitron)" }}
                  >
                    {milestone.year}
                  </p>
                  <p
                    className="text-[#666666] text-[10px] tracking-[0.1em] leading-snug"
                    style={{ fontFamily: "var(--font-rajdhani)" }}
                  >
                    {milestone.event}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Full-width stat banner ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="mt-20 py-10 px-6 lg:px-10"
        style={{ backgroundColor: "#111111" }}
      >
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10">
          {[
            { value: "48,000", unit: "HRS", label: "Wind Tunnel Testing" },
            { value: "150+", unit: "PARTS", label: "Carbon Fibre Components" },
            { value: "200+", unit: "FUNCS", label: "Steering Wheel Functions" },
            { value: "0.001", unit: "SEC", label: "Data Refresh Rate" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 1 + i * 0.08, duration: 0.6, ease: EASE }}
              className="flex flex-col items-center text-center px-6"
            >
              <span
                className="text-white text-3xl lg:text-4xl font-black tracking-tight"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {stat.value}
              </span>
              <span
                className="text-f1-red text-[9px] font-bold tracking-[0.3em] mt-1"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {stat.unit}
              </span>
              <span
                className="text-[#AAAAAA] text-xs tracking-widest mt-2"
                style={{ fontFamily: "var(--font-rajdhani)" }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
