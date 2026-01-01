"use client";

import { usePaletteStore, HarmonyType } from "@/lib/store";
import { MockupSwitcher } from "./components/MockupSwitcher"; 
import { PaletteOutput } from "./components/PaletteOutput";
import { CodeExport } from "./components/CodeExport";
import { ColorWheel } from "./components/ColorWheel"; 
import { ContrastChecker } from "./components/ContrastChecker"; 
import { OnboardingTour } from "./components/OnboardingTour";
import { Sliders, Zap, Layers, Palette } from "lucide-react"; 

export default function Home() {
  const { baseColor, harmony, setBaseColor, setHarmony } = usePaletteStore();

  const harmonies: { id: HarmonyType; label: string; icon: any }[] = [
    { id: "analogous", label: "Analogous", icon: Layers },
    { id: "monochromatic", label: "Monochromatic", icon: Palette },
    { id: "split-complementary", label: "Split", icon: Zap },
    { id: "triadic", label: "Triadic", icon: Sliders },
    { id: "complementary", label: "Complementary", icon: Layers },
  ];

  return (
    <div className="min-h-screen lg:h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary-100 selection:text-primary-900 lg:overflow-hidden flex flex-col">
      
      <OnboardingTour />

      {/* MAIN GRID */}
      {/* Added 'h-full' to ensure the grid takes up all available vertical space */}
      <main className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-0 h-full">
        
        {/* === LEFT SIDEBAR === */}
        {/* Added 'lg:h-full' */}
        <aside className="lg:col-span-2 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col lg:h-full lg:overflow-y-auto z-20">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <h1 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                <div className="w-6 h-6 bg-slate-900 rounded-md"></div>
                ColorEngine
                </h1>
                <span className="lg:hidden text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">v2.0</span>
            </div>

            <div className="p-4 space-y-6">
                {/* 1. Picker */}
                <div id="tour-brand-picker">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Base Color</label>
                    <div className="relative group cursor-pointer w-full h-16 rounded-xl shadow-inner border border-slate-100 overflow-hidden" style={{ backgroundColor: baseColor }}>
                        <input type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    </div>
                </div>

                {/* 2. Harmony List */}
                <div id="tour-harmony-selector">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Harmony</label>
                    <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                        {harmonies.map((h) => {
                            const Icon = h.icon;
                            const isActive = harmony === h.id;
                            return (
                                <button key={h.id} onClick={() => setHarmony(h.id)} className={`flex items-center gap-2 lg:gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50 border border-slate-100 lg:border-0"}`}>
                                    <Icon className="w-3.5 h-3.5" /> {h.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="hidden sm:block lg:block">
                   <ColorWheel />
                </div>
            </div>
        </aside>


        {/* === MIDDLE COLUMN === */}
        {/* FIX: Added 'lg:h-full' and 'lg:min-h-0'. This prevents the grid item from growing beyond the viewport. */}
        <section className="lg:col-span-8 bg-slate-50/50 lg:h-full lg:min-h-0 lg:overflow-y-auto p-4 lg:p-8 flex flex-col gap-8 scroll-smooth">
            
            <div className="space-y-3">
                <MockupSwitcher /> 
            </div>

            <div id="tour-contrast-checker" className="space-y-3">
                <h2 className="text-lg font-bold text-slate-800">Safety Check</h2>
                <ContrastChecker />
            </div>

            <div id="tour-export-section" className="space-y-3">
                <h2 className="text-lg font-bold text-slate-800">Export</h2>
                <CodeExport />
            </div>
            
            <div className="h-12 lg:hidden"></div>
        </section>


        {/* === RIGHT SIDEBAR === */}
        {/* Added 'lg:h-full' */}
        <aside className="lg:col-span-2 bg-white border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col lg:h-full z-20">
            <div className="p-4 border-b border-slate-100 bg-white">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Generated Palette</h2>
            </div>
            
            <div id="tour-visual-palette" className="flex-1 lg:overflow-y-auto p-4 bg-slate-50/30">
                <PaletteOutput />
            </div>
        </aside>

      </main>
    </div>
  );
}