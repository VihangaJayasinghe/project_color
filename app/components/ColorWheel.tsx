"use client";

import { usePaletteStore } from "@/lib/store";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import harmonyPlugin from "colord/plugins/harmonies";

extend([namesPlugin, harmonyPlugin]);

export function ColorWheel() {
  const { baseColor, harmony } = usePaletteStore();

  const base = colord(baseColor);
  let sec = "", acc = "";

  // Calculate colors (same logic as before)
  switch (harmony) {
    case 'analogous':
      sec = base.harmonies("analogous")[0].toHex(); 
      acc = base.harmonies("analogous")[2].toHex(); 
      break;
    case 'complementary':
      sec = base.harmonies("complementary")[1].toHex();
      acc = base.harmonies("complementary")[1].toHex(); 
      break;
    case 'split-complementary':
      sec = base.harmonies("split-complementary")[1].toHex();
      acc = base.harmonies("split-complementary")[2].toHex();
      break;
    case 'triadic':
      sec = base.harmonies("triadic")[1].toHex();
      acc = base.harmonies("triadic")[2].toHex();
      break;
    case 'monochromatic':
      sec = base.toHex(); 
      acc = base.toHex();
      break;
    default:
      sec = base.harmonies("analogous")[0].toHex();
      acc = base.harmonies("analogous")[2].toHex();
  }

  const hueP = base.toHsl().h || 0;
  const hueS = colord(sec).toHsl().h || 0;
  const hueA = colord(acc).toHsl().h || 0;

  return (
    <div className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 w-full text-left">
         Harmony Map
      </div>

      {/* COMPACT WHEEL (Size reduced to w-32 / 128px) */}
      <div className="relative w-32 h-32">
        <div 
            className="absolute inset-0 rounded-full shadow-inner opacity-80"
            style={{ background: `conic-gradient(from 0deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)` }}
        ></div>
        <div className="absolute inset-2 bg-white rounded-full shadow-sm z-10"></div>

        <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none">
            <HarmonyLine angle={hueP} color={baseColor} />
            <HarmonyLine angle={hueS} color={sec} isSecondary />
            <HarmonyLine angle={hueA} color={acc} isAccent />
        </svg>

        <WheelDot angle={hueP} color={baseColor} />
        <WheelDot angle={hueS} color={sec} size="sm" />
        <WheelDot angle={hueA} color={acc} size="sm" />
        
        {/* Center Hue Number */}
        <div className="absolute inset-0 flex items-center justify-center z-30">
            <span className="font-mono text-xs font-bold text-slate-400">{Math.round(hueP)}°</span>
        </div>
      </div>
    </div>
  );
}

function WheelDot({ angle, color, size }: { angle: number, color: string, size?: "sm" }) {
    return (
        <div className="absolute inset-0 z-30 pointer-events-none" style={{ transform: `rotate(${angle}deg)` }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-1">
                <div 
                    className={`rounded-full border border-white shadow-sm ${size === "sm" ? "w-3 h-3" : "w-4 h-4 ring-1 ring-black/5"}`}
                    style={{ backgroundColor: color }}
                />
            </div>
        </div>
    );
}

function HarmonyLine({ angle, color, isSecondary, isAccent }: any) {
    const radian = (angle - 90) * (Math.PI / 180);
    const radius = 28; // Adjusted for smaller wheel
    const x = 50 + radius * Math.cos(radian);
    const y = 50 + radius * Math.sin(radian);
    return <line x1="50%" y1="50%" x2={`${x}%`} y2={`${y}%`} stroke={color} strokeWidth="2" opacity="0.6" />;
}