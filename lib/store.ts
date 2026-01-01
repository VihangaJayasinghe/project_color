import { create } from 'zustand';
import { colord, extend, Colord } from 'colord';
import mixPlugin from 'colord/plugins/mix';
import harmoniesPlugin from 'colord/plugins/harmonies';

extend([mixPlugin, harmoniesPlugin]);

export type HarmonyType = "analogous" | "complementary" | "triadic" | "split-complementary" | "monochromatic";

type PaletteStore = {
  baseColor: string;
  harmony: HarmonyType;
  
  primary: Record<number, string>;
  secondary: Record<number, string>;
  accent: Record<number, string>;

  locked: {
    primary: boolean;
    secondary: boolean;
    accent: boolean;
  };
  
  setBaseColor: (color: string) => void;
  setHarmony: (harmony: HarmonyType) => void;
  toggleLock: (key: 'primary' | 'secondary' | 'accent') => void;
  
  // NEW ACTION: Manually set a specific color slot
  setColor: (key: 'primary' | 'secondary' | 'accent', newHex: string) => void;
};

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

const updateCSS = (primary: any, secondary: any, accent: any) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  Object.entries(primary).forEach(([k, v]) => root.style.setProperty(`--primary-${k}`, v as string));
  Object.entries(secondary).forEach(([k, v]) => root.style.setProperty(`--secondary-${k}`, v as string));
  Object.entries(accent).forEach(([k, v]) => root.style.setProperty(`--accent-${k}`, v as string));
};

export const usePaletteStore = create<PaletteStore>((set, get) => ({
  baseColor: '#3b82f6',
  harmony: 'analogous',
  primary: generateScale('#3b82f6'),
  secondary: generateScale('#3b82f6'), 
  accent: generateScale('#3b82f6'),
  
  locked: { primary: false, secondary: false, accent: false },
  
  toggleLock: (key) => {
    const { locked } = get();
    set({ locked: { ...locked, [key]: !locked[key] } });
  },

  // NEW: Update a single color and regenerate ONLY its scale
  setColor: (key, newHex) => {
      const state = get();
      const newScale = generateScale(newHex);
      
      // Update the specific scale in state
      const newState = { ...state, [key]: newScale };
      
      // Auto-lock the color so harmony changes don't wipe this manual tweak
      // Unless it's the primary color (which IS the base), but even then, locking is safer.
      const newLocked = { ...state.locked, [key]: true };

      updateCSS(
          key === 'primary' ? newScale : state.primary,
          key === 'secondary' ? newScale : state.secondary,
          key === 'accent' ? newScale : state.accent
      );

      // If we are changing primary, we should probably update baseColor too
      // so the picker stays in sync
      if (key === 'primary') {
          set({ baseColor: newHex, primary: newScale, locked: newLocked });
      } else {
          set({ [key]: newScale, locked: newLocked });
      }
  },

  setBaseColor: (color) => {
    const { harmony, locked, primary, secondary, accent } = get();
    const base = colord(color);
    const { sec, acc } = calculateHarmonyColors(base, harmony);
    
    const pScale = locked.primary ? primary : generateScale(color);
    const sScale = locked.secondary ? secondary : generateScale(sec);
    const aScale = locked.accent ? accent : generateScale(acc);

    updateCSS(pScale, sScale, aScale);
    set({ baseColor: color, primary: pScale, secondary: sScale, accent: aScale });
  },

  setHarmony: (newHarmony) => {
    const { baseColor, locked, primary, secondary, accent } = get();
    const base = colord(baseColor);
    const { sec, acc } = calculateHarmonyColors(base, newHarmony);

    const pScale = locked.primary ? primary : generateScale(baseColor);
    const sScale = locked.secondary ? secondary : generateScale(sec);
    const aScale = locked.accent ? accent : generateScale(acc);

    updateCSS(pScale, sScale, aScale);
    set({ harmony: newHarmony, primary: pScale, secondary: sScale, accent: aScale });
  }
}));

function calculateHarmonyColors(base: Colord, mode: HarmonyType) {
  let sec = base.toHex();
  let acc = base.toHex();

  switch (mode) {
    case 'analogous': sec = base.harmonies("analogous")[0].toHex(); acc = base.harmonies("analogous")[2].toHex(); break;
    case 'complementary': sec = base.harmonies("complementary")[1].toHex(); acc = base.harmonies("complementary")[1].toHex(); break;
    case 'split-complementary': sec = base.harmonies("split-complementary")[1].toHex(); acc = base.harmonies("split-complementary")[2].toHex(); break;
    case 'triadic': sec = base.harmonies("triadic")[1].toHex(); acc = base.harmonies("triadic")[2].toHex(); break;
    case 'monochromatic': sec = base.lighten(0.1).desaturate(0.1).toHex(); acc = base.darken(0.2).toHex(); break;
  }
  return { sec, acc };
}