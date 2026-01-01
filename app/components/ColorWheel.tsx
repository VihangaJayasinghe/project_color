"use client";

import { usePaletteStore } from "@/lib/store";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import harmonyPlugin from "colord/plugins/harmonies";

extend([namesPlugin, harmonyPlugin]);

export function ColorWheel() {
  const { baseColor, harmony } = usePaletteStore();

  // 1. Calculate Colors
  const base = colord(baseColor);
  let sec = "", acc = "";

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

  // 2. Calculate Angles
  // Use || 0 to prevent NaN errors if color is invalid
  const hueP = colord(baseColor).toHsl().h || 0;
  const hueS = colord(sec).toHsl().h || 0;
  const hueA = colord(acc).toHsl().h || 0;

  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full">
      <div className="flex items-center justify-between w-full mb-6">
         <h3 className="font-bold text-slate-800 flex items-center gap-2">
            Harmony Map
         </h3>
         <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100 uppercase tracking-wider">
            {harmony.replace("-", " ")}
         </span>
      </div>

      {/* THE WHEEL */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56">
        
        {/* Background Spectrum */}
        <div 
            className="absolute inset-0 rounded-full shadow-inner"
            style={{
                background: `conic-gradient(from 0deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)`
            }}
        ></div>

        {/* White Center */}
        <div className="absolute inset-3 bg-white rounded-full shadow-sm z-10"></div>

        {/* SVG Lines */}
        <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none">
            <HarmonyLine angle={hueP} color={baseColor} />
            <HarmonyLine angle={hueS} color={sec} isSecondary />
            <HarmonyLine angle={hueA} color={acc} isAccent />
        </svg>

        {/* Dots */}
        <WheelDot angle={hueP} color={baseColor} label="P" size="lg" />
        <WheelDot angle={hueS} color={sec} label="S" size="md" />
        <WheelDot angle={hueA} color={acc} label="A" size="md" />
        
        {/* === CENTER LABEL (The Fix) === */}
        <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="text-center">
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Hue</div>
                
                {/* Ensure this uses the variable 'hueP', not a static number */}
                <div className="font-mono text-2xl font-bold text-slate-800">
                  {Math.round(hueP)}°
                </div>
            </div>
        </div>

      </div>
      
      <p className="text-xs text-slate-400 mt-6 text-center max-w-[200px] leading-relaxed">
        This visualizes how the <strong className="text-slate-600">{harmony}</strong> rule selects colors mathematically.
      </p>
    </div>
  );
}

// --- SUB COMPONENTS ---

function WheelDot({ angle, color, label, size }: { angle: number, color: string, label: string, size: "md" | "lg" }) {
    return (
        <div 
            className="absolute inset-0 z-30 pointer-events-none"
            style={{ transform: `rotate(${angle}deg)` }}
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-1.5">
                <div 
                    className={`
                        rounded-full border-2 border-white shadow-md flex items-center justify-center
                        ${size === "lg" ? "w-8 h-8 -mt-2 ring-2 ring-black/5" : "w-6 h-6"}
                    `}
                    style={{ backgroundColor: color }}
                >
                    <span className="text-[10px] font-bold text-white/90 drop-shadow-md">{label}</span>
                </div>
            </div>
        </div>
    );
}

function HarmonyLine({ angle, color, isSecondary, isAccent }: any) {
    const radian = (angle - 90) * (Math.PI / 180);
    const radius = 42; 
    const x = 50 + radius * Math.cos(radian);
    const y = 50 + radius * Math.sin(radian);

    return (
        <line 
            x1="50%" y1="50%" 
            x2={`${x}%`} y2={`${y}%`} 
            stroke={color} 
            strokeWidth={isSecondary || isAccent ? "2" : "3"}
            strokeDasharray={isSecondary || isAccent ? "4 2" : "0"}
            opacity="0.8"
        />
    );
}