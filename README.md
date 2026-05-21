# 🏎️ F1 Vibe Site — Scrollytelling Showcase

A production-grade, Awwwards-style scrollytelling website built for a Formula 1 car showcase. Scroll-controlled 192-frame image sequence with HUD-style overlays.

## ✨ Features

- 192-frame scroll-controlled canvas animation
- HUD-style phase overlays (Identity → Aero → Cockpit → Powertrain)
- Smooth scroll via Lenis
- Framer Motion animations
- Fully responsive — white + red F1 theme
- Deployed on Vercel

## 🛠️ Tech Stack

- Next.js 14 (App Router + TypeScript)
- Tailwind CSS v4
- Framer Motion
- Lenis Smooth Scroll
- HTML5 Canvas

## 🚀 Getting Started

### 1. Clone the repo
git clone https://github.com/Sohith-Pothula/f1-vibe-site.git

### 2. Go into the folder
cd f1-vibe-site

### 3. Install dependencies
npm install

### 4. Add your own images
Place 192 frames named 1.jpg to 192.jpg inside:
public/images/f1-sequence/

### 5. Run locally
npm run dev

Open http://localhost:3000

## 📁 Project Structure

f1-vibe-site/
├── public/
│   └── images/
│       └── f1-sequence/    ← your 192 frames go here
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   └── page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── F1ScrollCanvas.tsx
│   ├── F1Experience.tsx
│   ├── SpecsGrid.tsx
│   ├── FeaturesSection.tsx
│   └── Footer.tsx
├── data/
│   └── carData.ts
└── lib/
    └── utils.ts

## 🤝 Contributing

Contributions are welcome! Here is how:

1. Fork this repo
2. Create your branch: git checkout -b feature/your-feature
3. Commit changes: git commit -m "Add your feature"
4. Push: git push origin feature/your-feature
5. Open a Pull Request

## 📄 License

MIT License — free to use, modify and share.

## 🙏 Credits

Built by Sohith Pothula
Inspired by Awwwards scrollytelling websites
EOF
