"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, type MotionValue } from "framer-motion";
import { f1Data } from "@/data/carData";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
  exit: {},
};

const childVariants = {
  hidden: { y: 30, opacity: 0, filter: "blur(8px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
  exit: {
    y: -20,
    opacity: 0,
    filter: "blur(4px)",
    transition: { duration: 0.4, ease: EASE },
  },
};

interface F1ExperienceProps {
  scrollYProgress: MotionValue<number>;
}

function getCurrentPhase(progress: number): number {
  if (progress < 0.25) return 0;
  if (progress < 0.5) return 1;
  if (progress < 0.75) return 2;
  return 3;
}

export default function F1Experience({ scrollYProgress }: F1ExperienceProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setProgress(v);
      setCurrentPhase(getCurrentPhase(v));
      setShowScrollHint(v < 0.05);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const phase = f1Data.phases[currentPhase];

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">

      {/* ── Red progress bar ── */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-30">
        <div
          className="h-full bg-f1-red"
          style={{ width: `${progress * 100}%`, transition: "width 0.1s linear" }}
        />
      </div>

      {/* ── FIX 1: Removed duplicate top-left F1 logo entirely ──
          The navbar already handles branding. No more visual confusion. */}

      {/* ── Persistent: Phase dots top-right only ── */}
      <div className="absolute top-[72px] right-6 lg:right-10 z-20 flex items-center gap-2.5">
        {f1Data.phases.map((p, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className={`rounded-full border-2 transition-all duration-500 ${
                i === currentPhase
                  ? "w-3 h-3 bg-f1-red border-f1-red"
                  : "w-2 h-2 bg-transparent border-[#999999]"
              }`}
            />
            {i === currentPhase && (
              <span
                className="text-[7px] font-bold tracking-widest text-f1-red"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* ── Persistent: Bottom-right origin ── */}
      <div className="absolute bottom-6 right-6 lg:right-10 z-20">
        <span
          className="text-[#555555] text-[9px] font-medium tracking-[0.25em]"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          MARANELLO · 2025
        </span>
      </div>

      {/* ── Phase content ── */}
      <AnimatePresence mode="wait">
        {currentPhase === 0 && (
          <PhaseHero key="hero" phase={phase} showScrollHint={showScrollHint} />
        )}
        {currentPhase === 1 && <PhaseAero key="aero" phase={phase} />}
        {currentPhase === 2 && <PhaseCockpit key="cockpit" phase={phase} />}
        {currentPhase === 3 && <PhasePower key="power" phase={phase} />}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FIX 2: Gradient overlay instead of hard-edge box
   Fades left-to-right so no card edge cuts over the car
   ───────────────────────────────────────────── */
function GradientPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        /* Edge-to-edge left gradient — fades smoothly before reaching the car */
        background:
          "linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.90) 50%, rgba(255,255,255,0.60) 75%, transparent 100%)",
        paddingTop: "20px",
        paddingBottom: "24px",
        paddingLeft: "0px",   /* flush to viewport edge — handled by parent padding */
        paddingRight: "80px", /* generous right fade zone */
      }}
    >
      {/* Red left accent strip */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-f1-red"
        style={{ borderRadius: "0 2px 2px 0" }}
      />
      <div className="pl-5">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FIX 4: Animated scroll mouse icon
   ───────────────────────────────────────────── */
function ScrollMouseIcon() {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Mouse body */}
      <div
        className="w-5 h-8 rounded-full border-2 border-[#111111] flex justify-center pt-1.5 relative overflow-hidden"
      >
        {/* Animated wheel dot */}
        <motion.div
          className="w-1 h-1.5 rounded-full bg-f1-red"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      {/* Pulsing arrow lines */}
      <div className="flex flex-col items-center gap-0.5">
        {[0, 0.15, 0.30].map((delay) => (
          <motion.div
            key={delay}
            className="w-2.5 border-t border-[#CC0000]"
            style={{ transform: "rotate(45deg) translateX(-2px)" }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.0, repeat: Infinity, delay, ease: "easeInOut" }}
          />
        ))}
      </div>
      <span
        className="text-[#111111] text-[8px] font-bold tracking-[0.4em]"
        style={{ fontFamily: "var(--font-orbitron)" }}
      >
        SCROLL
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PHASE 1: HERO
   ───────────────────────────────────────────── */
function PhaseHero({
  phase,
  showScrollHint,
}: {
  phase: (typeof f1Data.phases)[0];
  showScrollHint: boolean;
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      /* Full-screen gradient from left side — no padding on left, flush to edge */
      className="absolute inset-0 flex flex-col justify-end pl-6 lg:pl-10 pr-0 pb-24 lg:pb-28"
    >
      {/* Phase label */}
      <motion.div variants={childVariants} className="mb-3">
        <span
          className="text-f1-red text-[10px] font-bold tracking-[0.35em] inline-block bg-white/85 px-2 py-[3px]"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          {phase.label}
        </span>
      </motion.div>

      {/* FIX 2 applied: Gradient panel with smooth right fade */}
      <GradientPanel>
        <motion.h1
          variants={childVariants}
          className="text-[#111111] text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight leading-none mb-2"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          {phase.title}
        </motion.h1>

        <motion.p
          variants={childVariants}
          className="text-f1-red text-sm font-bold tracking-[0.2em] mb-3"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          {phase.subtitle}
        </motion.p>

        <motion.p
          variants={childVariants}
          className="text-[#333333] text-sm sm:text-[15px] leading-relaxed mb-7 max-w-[380px]"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          {phase.description}
        </motion.p>

        {/* Buttons with generous top margin */}
        <motion.div
          variants={childVariants}
          className="flex items-center gap-4 pointer-events-auto"
        >
          <button
            className="px-6 py-3 bg-f1-red text-white text-[10px] font-bold tracking-[0.15em] hover:bg-[#FF1A1A] transition-all duration-300 shadow-md shadow-red-100"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            SCROLL TO EXPLORE
          </button>
          <button
            className="px-6 py-3 border border-[#111111] text-[#111111] text-[10px] font-bold tracking-[0.15em] hover:border-f1-red hover:text-f1-red transition-colors duration-300"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            SPECIFICATIONS
          </button>
        </motion.div>
      </GradientPanel>

      {/* Right badge — chassis, padded right */}
      <motion.div
        variants={childVariants}
        className="absolute bottom-28 right-8 lg:right-12 text-right hidden lg:block"
      >
        <div
          className="inline-block px-5 py-3"
          style={{
            background: "rgba(255,255,255,0.88)",
            borderRight: "3px solid #CC0000",
          }}
        >
          <p
            className="text-[#111111] text-2xl xl:text-3xl font-black tracking-tight leading-none"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            CHASSIS W16
          </p>
          <p
            className="text-f1-red text-[9px] font-bold tracking-[0.25em] mt-1.5"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {phase.accent}
          </p>
        </div>
      </motion.div>

      {/* FIX 4: Animated mouse scroll icon — centered bottom, well clear of buttons */}
      <AnimatePresence>
        {showScrollHint && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <ScrollMouseIcon />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PHASE 2: AERO
   ───────────────────────────────────────────── */
function PhaseAero({ phase }: { phase: (typeof f1Data.phases)[0] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute inset-0 flex flex-col justify-center pl-6 lg:pl-10 pr-0"
    >
      <motion.div variants={childVariants} className="mb-3">
        <span
          className="text-f1-red text-[10px] font-bold tracking-[0.35em] inline-block bg-white/85 px-2 py-[3px]"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          {phase.label}
        </span>
      </motion.div>

      <GradientPanel>
        <motion.h2
          variants={childVariants}
          className="text-[#111111] text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight leading-none mb-2"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          {phase.title}
        </motion.h2>
        <motion.p
          variants={childVariants}
          className="text-f1-red text-sm font-bold tracking-[0.2em] mb-3"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          {phase.subtitle}
        </motion.p>
        <motion.p
          variants={childVariants}
          className="text-[#333333] text-sm sm:text-[15px] leading-relaxed max-w-[380px]"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          {phase.description}
        </motion.p>
      </GradientPanel>

      {/* DRS Badge */}
      <motion.div
        variants={childVariants}
        className="absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 hidden lg:block"
      >
        <div
          className="relative px-7 py-5"
          style={{ background: "rgba(255,255,255,0.92)" }}
        >
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-f1-red" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-f1-red" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-f1-red" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-f1-red" />
          <p
            className="text-[#111111] text-lg font-bold tracking-[0.15em]"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            DRS ACTIVE
          </p>
          <p
            className="text-f1-red text-[9px] font-bold tracking-[0.2em] mt-1"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            DRAG REDUCTION SYSTEM
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PHASE 3: COCKPIT
   ───────────────────────────────────────────── */
function PhaseCockpit({ phase }: { phase: (typeof f1Data.phases)[0] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute inset-0 flex flex-col justify-center pl-6 lg:pl-10 pr-0"
    >
      <motion.div variants={childVariants} className="mb-3">
        <span
          className="text-f1-red text-[10px] font-bold tracking-[0.35em] inline-block bg-white/85 px-2 py-[3px]"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          {phase.label}
        </span>
      </motion.div>

      <GradientPanel>
        <motion.h2
          variants={childVariants}
          className="text-[#111111] text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight leading-none mb-2"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          {phase.title}
        </motion.h2>
        <motion.p
          variants={childVariants}
          className="text-f1-red text-sm font-bold tracking-[0.2em] mb-3"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          {phase.subtitle}
        </motion.p>
        <motion.p
          variants={childVariants}
          className="text-[#333333] text-sm sm:text-[15px] leading-relaxed max-w-[380px]"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          {phase.description}
        </motion.p>
      </GradientPanel>

      {/* HALO badge */}
      <motion.div
        variants={childVariants}
        className="absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3"
      >
        <div
          className="flex flex-col items-center gap-3 px-6 py-5"
          style={{ background: "rgba(255,255,255,0.92)" }}
        >
          <svg width="80" height="50" viewBox="0 0 80 50" fill="none">
            <path
              d="M10 45 Q40 -5 70 45"
              stroke="#CC0000"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="40" cy="48" r="3" fill="#CC0000" opacity="0.6" />
          </svg>
          <p
            className="text-f1-red text-xs font-bold tracking-[0.2em]"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            HALO ACTIVE
          </p>
          <p
            className="text-[#555555] text-[9px] tracking-[0.12em] text-center"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            TITANIUM · 12T LOAD
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PHASE 4: POWERTRAIN
   ───────────────────────────────────────────── */
function PhasePower({ phase }: { phase: (typeof f1Data.phases)[0] }) {
  const powerSpecs = [
    { label: "POWER", value: "1,000 HP" },
    { label: "TORQUE", value: "680 NM" },
    { label: "TOP SPEED", value: "350+ KM/H" },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute inset-0 flex flex-col justify-center pl-6 lg:pl-10 pr-0"
    >
      <motion.div variants={childVariants} className="mb-3">
        <span
          className="text-f1-red text-[10px] font-bold tracking-[0.35em] inline-block bg-white/85 px-2 py-[3px]"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          {phase.label}
        </span>
      </motion.div>

      <GradientPanel>
        <motion.h2
          variants={childVariants}
          className="text-[#111111] text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight leading-none mb-2"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          {phase.title}
        </motion.h2>
        <motion.p
          variants={childVariants}
          className="text-f1-red text-xl sm:text-2xl lg:text-4xl font-bold tracking-tight mb-3"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          {phase.subtitle}
        </motion.p>
        <motion.p
          variants={childVariants}
          className="text-[#333333] text-sm sm:text-[15px] leading-relaxed max-w-[380px]"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          {phase.description}
        </motion.p>
      </GradientPanel>

      {/* Stacked specs badge */}
      <motion.div
        variants={childVariants}
        className="absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-0"
      >
        <div
          className="flex flex-col gap-5 px-6 py-5"
          style={{ background: "rgba(255,255,255,0.92)" }}
        >
          {powerSpecs.map((spec) => (
            <div key={spec.label} className="text-right">
              <p
                className="text-[#999999] text-[9px] font-medium tracking-[0.3em] mb-0.5"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {spec.label}
              </p>
              <p
                className="text-[#111111] text-xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {spec.value}
              </p>
              <div className="w-full h-[1.5px] bg-f1-red mt-1.5" />
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
