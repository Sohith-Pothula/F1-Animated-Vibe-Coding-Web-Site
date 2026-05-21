"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { MotionValue } from "framer-motion";

const TOTAL_FRAMES = 192;

interface F1ScrollCanvasProps {
  scrollYProgress: MotionValue<number>;
}

export default function F1ScrollCanvas({
  scrollYProgress,
}: F1ScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastFrameRef = useRef<number>(-1);
  const [loadedCount, setLoadedCount] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);

  // Preload all 192 images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/images/f1-sequence/${i}.jpg`;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          setAllLoaded(true);
        }
      };
      img.onerror = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          setAllLoaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  // Draw frame on canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size for high-DPI
    if (
      canvas.width !== rect.width * dpr ||
      canvas.height !== rect.height * dpr
    ) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    const cssWidth = rect.width;
    const cssHeight = rect.height;

    // White background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, cssWidth, cssHeight);

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Object-fit: contain logic
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = cssWidth / cssHeight;

    let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

    if (imgAspect > canvasAspect) {
      drawWidth = cssWidth;
      drawHeight = cssWidth / imgAspect;
      drawX = 0;
      drawY = (cssHeight - drawHeight) / 2;
    } else {
      drawHeight = cssHeight;
      drawWidth = cssHeight * imgAspect;
      drawX = (cssWidth - drawWidth) / 2;
      drawY = 0;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, []);

  // Handle resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new ResizeObserver(() => {
      // Reset canvas dimensions and force redraw
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
      }
      lastFrameRef.current = -1; // Force redraw
      const progress = scrollYProgress.get();
      const frameNumber = Math.round(progress * (TOTAL_FRAMES - 1));
      const clampedFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameNumber));
      drawFrame(clampedFrame);
    });

    observer.observe(canvas);
    return () => observer.disconnect();
  }, [scrollYProgress, drawFrame]);

  // Subscribe to scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const frameNumber = Math.round(progress * (TOTAL_FRAMES - 1));
      const clampedFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameNumber));

      // Only redraw when frame actually changes
      if (clampedFrame !== lastFrameRef.current) {
        lastFrameRef.current = clampedFrame;
        drawFrame(clampedFrame);
      }
    });

    return unsubscribe;
  }, [scrollYProgress, drawFrame]);

  // Draw first frame when images load
  useEffect(() => {
    if (allLoaded) {
      drawFrame(0);
      lastFrameRef.current = 0;
    }
  }, [allLoaded, drawFrame]);

  const percent = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <>
      {/* Loading overlay */}
      {!allLoaded && (
        <div
          className="absolute inset-0 z-30 flex flex-col items-center justify-center"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* F1 Mark */}
            <div
              className="w-12 h-12 flex items-center justify-center border-2 border-f1-red"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              <span className="text-f1-red text-lg font-bold">F1</span>
            </div>

            {/* Progress line */}
            <div className="w-48 h-[2px] bg-border-gray overflow-hidden">
              <div
                className="h-full bg-f1-red transition-all duration-300 ease-out"
                style={{ width: `${percent}%` }}
              />
            </div>

            {/* Loading text */}
            <span
              className="text-near-black text-[10px] font-semibold tracking-[0.3em]"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              LOADING SEQUENCE
            </span>

            {/* Percentage */}
            <span
              className="text-f1-red text-2xl font-bold tabular-nums"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {percent}%
            </span>
          </div>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ width: "100%", height: "100%" }}
      />
    </>
  );
}
