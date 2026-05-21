<div align="center">

# 🏎️ F1 Challenger — Scrollytelling Showcase

**A production-ready, Awwwards-inspired Formula 1 car showcase built with scroll-driven image sequences, HUD overlays, and silky-smooth animations.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-ff0055?style=flat-square&logo=framer)](https://www.framer.com/motion)
[![License: MIT](https://img.shields.io/badge/License-MIT-CC0000?style=flat-square)](LICENSE)

![F1 Challenger Preview](public/images/f1-sequence/1.jpg)

</div>

---

## ✨ Overview

**F1 Challenger** is a single-page, scroll-driven luxury car showcase that uses a **192-frame image sequence** rendered on an HTML5 Canvas to simulate a video-like animation controlled entirely by the user's scroll position.

As you scroll through **600vh** of scroll space, the F1 car transforms in front of you:

```
Normal Car  →  Cockpit Opens  →  Engine Cover Lifts  →  Hybrid Powertrain Revealed
```

Each phase is paired with a HUD-style text overlay (Framer Motion `AnimatePresence`) that transitions with blur, fade, and vertical slide animations — creating an experience that feels like a premium automotive brand site.

---

## 🎬 Core Mechanics

| Feature | Implementation |
|---------|---------------|
| Scroll-driven animation | `framer-motion` `useScroll` + HTML5 Canvas |
| 192-frame image sequence | Preloaded into memory, drawn per frame on canvas |
| Smooth scrolling | `@studio-freight/lenis` with RAF loop |
| HUD phase transitions | `AnimatePresence` mode="wait" + staggered children |
| High-DPI rendering | `devicePixelRatio`-aware canvas sizing |
| Dual-lane marquee | CSS `@keyframes` with opposing directions |
| Scroll-triggered reveals | `useInView` for below-fold sections |

---

## 🖥️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org) — App Router, TypeScript |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) — `@theme` variables |
| **Animations** | [Framer Motion 12](https://www.framer.com/motion) |
| **Smooth Scroll** | [@studio-freight/lenis](https://github.com/studio-freight/lenis) |
| **Canvas** | Native HTML5 Canvas API with ResizeObserver |
| **Fonts** | Orbitron + Rajdhani via `next/font/google` |

---

## 📁 Project Structure

```
f1-vibe-site/
├── app/
│   ├── layout.tsx          # Root layout — fonts, metadata, suppressHydrationWarning
│   ├── page.tsx            # Main page — Lenis setup, useScroll, section orchestration
│   └── globals.css         # Tailwind v4 @theme tokens, keyframes, scrollbar
│
├── components/
│   ├── Navbar.tsx          # Fixed navbar — glass blur on scroll, outlined CTA
│   ├── F1ScrollCanvas.tsx  # 192-frame canvas renderer — HiDPI, preloader, ResizeObserver
│   ├── F1Experience.tsx    # HUD overlay — 4 phases, AnimatePresence, gradient panels
│   ├── SpecsGrid.tsx       # Dual-lane marquee + 8-card specs grid
│   ├── FeaturesSection.tsx # Feature cards + timeline + dark stat banner
│   └── Footer.tsx          # 3-column footer — nav links, CTA, tech credits
│
├── data/
│   └── carData.ts          # Single source of truth — all copy, specs, phases, nav
│
├── lib/
│   └── utils.ts            # cn() — clsx + tailwind-merge
│
└── public/
    └── images/
        └── f1-sequence/    # 1.jpg → 192.jpg  (NOT included — see below)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js **18+**
- npm / yarn / pnpm
- **192 frame images** (see [Image Sequence](#-image-sequence) below)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/f1-vibe-site.git
cd f1-vibe-site

# 2. Install dependencies
npm install

# 3. Add your frame images (see below)

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎞️ Image Sequence

> ⚠️ **The 192 frame images are NOT included in this repository** due to file size. You must provide your own.

### Requirements

- **Count:** Exactly **192 images** — named `1.jpg` through `192.jpg`
- **Location:** `public/images/f1-sequence/`
- **Format:** JPEG (recommended), optimized for web
- **Content:** Any smooth animation sequence — a rotating car, opening cockpit, engine reveal, etc.

### How to generate your own frames

**Option A — Blender / 3D Software**
1. Set up your 3D car scene with the animation you want
2. Render 192 frames as individual JPEGs
3. Name them `1.jpg` to `192.jpg`
4. Drop into `public/images/f1-sequence/`

**Option B — Video to Frames (ffmpeg)**
```bash
# Extract 192 frames from a 6-second clip at 32fps
ffmpeg -i your-car-animation.mp4 -vf fps=32 -vframes 192 \
  public/images/f1-sequence/%d.jpg
```

**Option C — Existing stock animation**
Any automotive animation sequence works. The site is designed for a white F1 car with red/blue livery on a white studio background, but any car or object sequence will work.

---

## 🎨 Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-pure-white` | `#FFFFFF` | Background, canvas fill |
| `--color-near-black` | `#111111` | Headings, primary text |
| `--color-f1-red` | `#CC0000` | Accents, borders, CTAs |
| `--color-f1-red-bright` | `#FF1A1A` | Hover states |
| `--color-mid-gray` | `#666666` | Body text, descriptions |
| `--color-border-gray` | `#E0E0E0` | Dividers, card borders |

### Typography

| Font | Role |
|------|------|
| **Orbitron** | All headings, labels, numbers, buttons, HUD elements |
| **Rajdhani** | Body text, descriptions, subtitles |

---

## ⚙️ Configuration

All site content lives in [`data/carData.ts`](data/carData.ts) — edit this file to change any copy, specs, or phase content without touching component code.

```ts
export const f1Data = {
  brand: "FORMULA 1",
  model: "F1 CHALLENGER",
  totalFrames: 192,           // ← Change if using a different frame count

  phases: [                   // ← 4 scroll phases (0–25%, 25–50%, 50–75%, 75–100%)
    { id: "hero", title: "F1 CHALLENGER", ... },
    { id: "aero", title: "AERODYNAMIC WEAPON", ... },
    { id: "cockpit", title: "THE OFFICE", ... },
    { id: "powertrain", title: "HYBRID V6 POWERTRAIN", ... },
  ],

  specs: [ ... ],             // ← 8 spec cards
  features: [ ... ],          // ← 4 feature cards
  navLinks: [ ... ],          // ← Navbar links
};
```

### Changing the frame count

If you have a different number of frames, update **one constant** in `F1ScrollCanvas.tsx`:

```ts
const TOTAL_FRAMES = 192; // ← Change to your frame count
```

And update `data/carData.ts`:
```ts
totalFrames: 192, // ← Match here too
```

---

## 🏗️ Architecture Notes

### Scroll Sync (Critical)

The single `scrollYProgress` MotionValue from `useScroll` is passed to **both** `F1ScrollCanvas` and `F1Experience`. This ensures the canvas frame and the HUD overlay are always perfectly in sync — no separate scroll hooks, no drift.

```tsx
// app/page.tsx
const { scrollYProgress } = useScroll({
  target: containerRef,           // 600vh section
  offset: ["start start", "end end"]
});

<F1ScrollCanvas scrollYProgress={scrollYProgress} />
<F1Experience  scrollYProgress={scrollYProgress} />
```

### Canvas Performance

The canvas only redraws when the **frame index actually changes**, using a `useRef` comparison:

```ts
if (clampedFrame !== lastFrameRef.current) {
  lastFrameRef.current = clampedFrame;
  drawFrame(clampedFrame);
}
```

All 192 images are preloaded into memory on mount so frame transitions are instant with no network latency.

### Lenis + Next.js

Lenis is initialized inside `useEffect` with a RAF loop and proper cleanup:

```ts
useEffect(() => {
  const lenis = new Lenis({ duration: 1.4, smoothWheel: true, wheelMultiplier: 0.8 });
  function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
  return () => lenis.destroy();
}, []);
```

`html { scroll-behavior: auto !important }` prevents browser smooth scroll from conflicting with Lenis.

---

## 📦 Scripts

```bash
npm run dev      # Start development server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Self-hosted

```bash
npm run build
npm run start
```

> **Note:** If deploying to a CDN or static host, the 192 frame images will be served as static assets from `/public`. Make sure your host can handle the image volume efficiently — consider enabling CDN caching headers.

---

## 🤝 Contributing

Contributions are welcome! Here are some ideas:

- 🎨 **New color themes** — dark mode, blue/silver livery
- 📱 **Mobile optimizations** — touch-based frame scrubbing
- 🔊 **Sound design** — engine sounds tied to scroll phase
- 🌍 **i18n** — multi-language support
- ⚡ **Performance** — WebP/AVIF frame format support

### Steps

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

You are free to use, modify, and distribute this project for personal or commercial purposes with attribution.

---

## 🙏 Acknowledgements

- [Framer Motion](https://www.framer.com/motion) — animation library
- [Lenis](https://github.com/studio-freight/lenis) — smooth scroll by Studio Freight
- [Next.js](https://nextjs.org) — React framework by Vercel
- [Tailwind CSS](https://tailwindcss.com) — utility-first CSS
- [Google Fonts](https://fonts.google.com) — Orbitron & Rajdhani typefaces
- Inspired by Awwwards-winning automotive showcase sites

---

<div align="center">

**Built with precision. Engineered to win.**

`Next.js` · `Framer Motion` · `Lenis` · `TypeScript` · `Tailwind CSS v4`

</div>
