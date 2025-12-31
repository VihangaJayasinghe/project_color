import { create } from 'zustand';
import { colord, extend, Colord } from 'colord';
import mixPlugin from 'colord/plugins/mix';
import harmoniesPlugin from 'colord/plugins/harmonies';

extend([mixPlugin, harmoniesPlugin]);

// Define the available harmony types
export type HarmonyType = "analogous" | "complementary" | "triadic" | "split-complementary" | "monochromatic";

type PaletteStore = {
  baseColor: string;
  harmony: HarmonyType; // NEW: We store the selected harmony
  primary: Record<number, string>;
  secondary: Record<number, string>;
  accent: Record<number, string>;
  
  setBaseColor: (color: string) => void;
  setHarmony: (harmony: HarmonyType) => void; // NEW: Action to change harmony
};

// Helper to generate the 50-950 scale
const generateScale = (hex: string) => {
  const base = colord(hex);
  const shades: Record<number, string> = {};
  const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  levels.forEach((level) => {
    if (level === 500) shades[500] = hex;
    else if (level < 500) shades[level] = base.mix("#ffffff", (500 - level) / 600).toHex();
    else shades[level] = base.mix("#000000", (level - 500) / 600).toHex();
  });
  return shades;
};

// Helper to update CSS variables
const updateCSS = (primary: any, secondary: any, accent: any) => {
  const root = document.documentElement;
  Object.entries(primary).forEach(([k, v]) => root.style.setProperty(`--primary-${k}`, v as string));
  Object.entries(secondary).forEach(([k, v]) => root.style.setProperty(`--secondary-${k}`, v as string));
  Object.entries(accent).forEach(([k, v]) => root.style.setProperty(`--accent-${k}`, v as string));
};

export const usePaletteStore = create<PaletteStore>((set, get) => ({
  baseColor: '#3b82f6',
  harmony: 'analogous', // Default
  primary: generateScale('#3b82f6'),
  secondary: generateScale('#3b82f6'),
  accent: generateScale('#3b82f6'),
  
  setBaseColor: (color) => {
    const { harmony } = get(); // Use current harmony
    const base = colord(color);
    
    // Calculate new colors based on the CURRENT harmony
    const { sec, acc } = calculateHarmonyColors(base, harmony);

    const pScale = generateScale(color);
    const sScale = generateScale(sec);
    const aScale = generateScale(acc);

    updateCSS(pScale, sScale, aScale);
    set({ baseColor: color, primary: pScale, secondary: sScale, accent: aScale });
  },

  setHarmony: (newHarmony) => {
    const { baseColor } = get(); // Use current color
    const base = colord(baseColor);

    // Calculate new colors based on the NEW harmony
    const { sec, acc } = calculateHarmonyColors(base, newHarmony);

    const pScale = generateScale(baseColor);
    const sScale = generateScale(sec);
    const aScale = generateScale(acc);

    updateCSS(pScale, sScale, aScale);
    set({ harmony: newHarmony, secondary: sScale, accent: aScale });
  }
}));

// The "Brain" that decides which colors to pick based on the mode
function calculateHarmonyColors(base: Colord, mode: HarmonyType) {
  let sec = base.toHex();
  let acc = base.toHex();

  switch (mode) {
    case 'analogous':
      // Neighbors: calm, natural
      sec = base.harmonies("analogous")[0].toHex(); 
      acc = base.harmonies("analogous")[2].toHex(); 
      break;
    case 'complementary':
      // Opposite: High contrast
      sec = base.harmonies("complementary")[1].toHex();
      acc = base.harmonies("complementary")[1].toHex(); // Use same for accent
      break;
    case 'split-complementary':
      // The "Professional" look
      sec = base.harmonies("split-complementary")[1].toHex();
      acc = base.harmonies("split-complementary")[2].toHex();
      break;
    case 'triadic':
      // Vibrant, balanced triangle
      sec = base.harmonies("triadic")[1].toHex();
      acc = base.harmonies("triadic")[2].toHex();
      break;
    case 'monochromatic':
      // Just shades of the same color
      sec = base.lighten(0.1).desaturate(0.1).toHex();
      acc = base.darken(0.2).toHex();
      break;
  }
  return { sec, acc };
}