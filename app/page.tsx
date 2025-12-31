"use client";

import { usePaletteStore, HarmonyType } from "@/lib/store";
import { LiveMockup } from "./components/LiveMockup";
import { PaletteOutput } from "./components/PaletteOutput";
import { CodeExport } from "./components/CodeExport";
import { Sliders, Zap, Layers, Palette } from "lucide-react"; // Make sure to install lucide-react if missing

export default function Home() {
  const { baseColor, harmony, setBaseColor, setHarmony } = usePaletteStore();

  const harmonies: { id: HarmonyType; label: string; icon: any }[] = [
    { id: "analogous", label: "Analogous", icon: Layers },
    { id: "monochromatic", label: "Monochromatic", icon: Palette },
    { id: "split-complementary", label: "Split Comp", icon: Zap },
    { id: "triadic", label: "Triadic", icon: Sliders },
    { id: "complementary", label: "Complementary", icon: Layers },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary-100 selection:text-primary-900">
      
      {/* MAIN LAYOUT: CSS GRID */}
      {/* Mobile: 1 Column. Desktop: 12 Columns (3 for Sidebar, 9 for Content) */}
      <main className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* === LEFT COLUMN: CONTROL STATION (Sticky) === */}
        <aside className="lg:col-span-3 flex flex-col gap-6 lg:sticky lg:top-8 z-10">
          
          {/* 1. Brand / Title */}
          <div className="mb-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-900 rounded-lg"></div>
              ColorEngine
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Design system generator</p>
          </div>

          {/* 2. The "Smart" Color Picker Card */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">
              Base Color
            </label>
            
            <div className="relative group cursor-pointer">
              {/* The Visual Swatch */}
              <div 
                className="w-full h-24 rounded-xl shadow-inner border border-slate-100 transition-all duration-300 group-hover:scale-[1.02]"
                style={{ backgroundColor: baseColor }}
              />
              
              {/* The Hex Text Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-mono font-bold text-slate-800 shadow-sm uppercase">
                  {baseColor}
                </span>
              </div>

              {/* The Invisible Input (Covers the whole div) */}
              <input
                type="color"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">Click swatch to change</p>
          </div>

          {/* 3. Harmony Selector List */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
              Harmony Mode
            </label>
            {harmonies.map((h) => {
              const Icon = h.icon;
              const isActive = harmony === h.id;
              return (
                <button
                  key={h.id}
                  onClick={() => setHarmony(h.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-md transform scale-[1.02]"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-slate-300" : "text-slate-400"}`} />
                  {h.label}
                </button>
              );
            })}
          </div>

        </aside>


        {/* === RIGHT COLUMN: WORKSPACE === */}
        <section className="lg:col-span-9 flex flex-col gap-8">
          
          {/* 1. Live Mockup (The Hero) */}
          <div className="space-y-3">
             <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800">Live Preview</h2>
                <span className="text-xs font-medium text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-100">Interactive</span>
             </div>
             <LiveMockup />
          </div>

          {/* 2. Grid for Details (Palette + Code) */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            
            {/* Visual Palette */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-800">Visual Palette</h2>
              <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm h-full">
                 <PaletteOutput />
              </div>
            </div>

            {/* Code Export */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-800">Export Code</h2>
              <div className="h-full">
                 <CodeExport />
              </div>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
}