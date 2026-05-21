import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "F1 Challenger — Formula 1 Hybrid Era Showcase",
  description:
    "Experience the F1 Challenger — a scroll-driven showcase of the hybrid V6 powertrain, active aerodynamics, carbon monocoque cockpit, and HALO protection system. Engineered to win.",
  keywords: [
    "F1",
    "Formula 1",
    "Hybrid V6",
    "Racing Car",
    "Aerodynamics",
    "Motorsport",
  ],
  openGraph: {
    title: "F1 Challenger — Formula 1 Hybrid Era Showcase",
    description:
      "Scroll through the engineering masterpiece — from chassis to powertrain.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
