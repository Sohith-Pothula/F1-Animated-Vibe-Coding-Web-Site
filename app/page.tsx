"use client";

import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import Navbar from "@/components/Navbar";
import F1ScrollCanvas from "@/components/F1ScrollCanvas";
import F1Experience from "@/components/F1Experience";
import SpecsGrid from "@/components/SpecsGrid";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <main style={{ backgroundColor: "#FFFFFF" }}>
      <Navbar />

      {/* ── Scroll-driven sequence section ── */}
      <section
        ref={containerRef}
        style={{ height: "600vh", position: "relative" }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Canvas layer z-0 */}
          <F1ScrollCanvas scrollYProgress={scrollYProgress} />

          {/* Vignette layer z-5 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 5,
              pointerEvents: "none",
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, transparent 15%, transparent 80%, rgba(255,255,255,0.7) 100%)",
            }}
          />

          {/* HUD layer z-10 */}
          <F1Experience scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* ── Below-fold content ── */}
      <div
        style={{ position: "relative", zIndex: 20, backgroundColor: "#FFFFFF" }}
      >
        <SpecsGrid />
        <FeaturesSection />
        <Footer />
      </div>
    </main>
  );
}
