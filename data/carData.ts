export const f1Data = {
  brand: "FORMULA 1",
  model: "F1 CHALLENGER",
  edition: "HYBRID ERA",
  tagline: "Engineered to Win",
  year: "2025",
  origin: "Maranello, Italy",
  totalFrames: 192,
  imagePath: "/images/f1-sequence",

  phases: [
    {
      id: "hero",
      scrollRange: [0, 0.25] as [number, number],
      label: "01 / IDENTITY",
      title: "F1 CHALLENGER",
      subtitle: "BORN TO RACE",
      description:
        "Engineered at the intersection of physics and obsession. Every gram justified. Every millimeter intentional. Built for one purpose — to be the fastest.",
      accent: "1 OF 1 CONFIGURATION",
    },
    {
      id: "aero",
      scrollRange: [0.25, 0.5] as [number, number],
      label: "02 / AERO",
      title: "AERODYNAMIC WEAPON",
      subtitle: "DOWNFORCE OVER EVERYTHING",
      description:
        "1,000kg of downforce at 250km/h. Four independently controlled aerodynamic flaps react to throttle, braking, and cornering in real-time. Air is not the enemy — it is the engine.",
      accent: "DRS ENABLED · ACTIVE AERO",
    },
    {
      id: "cockpit",
      scrollRange: [0.5, 0.75] as [number, number],
      label: "03 / COCKPIT",
      title: "THE OFFICE",
      subtitle: "WHERE INSTINCT MEETS MACHINE",
      description:
        "Carbon fiber monocoque tub. HALO protection system. 200+ function steering wheel. The cockpit is not a seat — it is a command centre strapped to a missile.",
      accent: "HALO TITANIUM · CARBON TUB",
    },
    {
      id: "powertrain",
      scrollRange: [0.75, 1.0] as [number, number],
      label: "04 / POWER",
      title: "HYBRID V6 POWERTRAIN",
      subtitle: "1,000 HP / 350+ KM/H",
      description:
        "1.6L turbocharged V6 paired with MGU-K and MGU-H hybrid units. 950+ horsepower. Fully exposed under open engine cover — engineering as art.",
      accent: "0–100 KM/H IN 2.4 SECONDS",
    },
  ],

  specs: [
    { label: "Engine", value: "V6 Hybrid", unit: "Turbo" },
    { label: "Displacement", value: "1.6", unit: "Litres" },
    { label: "Power", value: "1,000", unit: "HP" },
    { label: "Torque", value: "680", unit: "NM" },
    { label: "Weight", value: "798", unit: "KG" },
    { label: "Top Speed", value: "350+", unit: "KM/H" },
    { label: "0–100 KM/H", value: "2.4", unit: "SEC" },
    { label: "Downforce", value: "1,000", unit: "KG" },
  ],

  features: [
    {
      number: "01",
      title: "Carbon Fiber Monocoque",
      description:
        "Single-piece carbon tub, safety cell and chassis combined. Lightest and strongest structure in motorsport.",
    },
    {
      number: "02",
      title: "Hybrid Power Unit",
      description:
        "1.6L V6 turbo paired with two Motor Generator Units. Combined output of 1,000 horsepower.",
    },
    {
      number: "03",
      title: "Active Aerodynamics",
      description:
        "DRS drag reduction system plus four independently actuated aero flaps. Over 1,000kg downforce at 250km/h.",
    },
    {
      number: "04",
      title: "HALO Protection",
      description:
        "Titanium HALO structure can withstand 12 tonnes of load. FIA mandated, race-proven life-saving technology.",
    },
  ],

  navLinks: ["STORY", "SPECS", "AERO", "CONTACT"],
};
