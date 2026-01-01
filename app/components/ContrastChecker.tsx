"use client";

import { usePaletteStore } from "@/lib/store";
import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import { CheckCircle, XCircle, AlertTriangle, Type, Palette } from "lucide-react";
import { useState } from "react";

extend([a11yPlugin]);

export function ContrastChecker({ printMode = false }: { printMode?: boolean }) {
  const { primary, secondary, accent } = usePaletteStore();
  const [mode, setMode] = useState<"text" | "colors">("text");

  return (
    <div className={`flex flex-col bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full ${printMode ? "border-0 shadow-none p-0" : ""}`}>
      
      {/* Header & Tabs (Hide Tabs in Print Mode) */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
           <h3 className="font-bold text-slate-800">Accessibility Matrix</h3>
           <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100 uppercase tracking-wider">
              WCAG 2.0
           </span>
        </div>

        {/* Tab Switcher - HIDDEN IN PRINT MODE */}
        {!printMode && (
            <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
                onClick={() => setMode("text")}
                className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-bold transition-all ${mode === "text" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
                <Type className="w-3.5 h-3.5" /> Text
            </button>
            <button 
                onClick={() => setMode("colors")}
                className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-bold transition-all ${mode === "colors" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
                <Palette className="w-3.5 h-3.5" /> Colors
            </button>
            </div>
        )}
      </div>

      {/* RENDER LOGIC: If printMode, show BOTH. Else show active tab. */}
      
      {/* 1. TEXT CONTRAST */}
      {(printMode || mode === "text") && (
        <div className="space-y-4 mb-8">
          {printMode && <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-4">Text Legibility</h4>}
          
          <ContrastRow title="Primary" hex={primary[500]} />
          <ContrastRow title="Secondary" hex={secondary[500]} />
          <ContrastRow title="Accent" hex={accent[500]} />
          
          {!printMode && <p className="text-xs text-slate-400 mt-4 text-center leading-relaxed">Target: <strong>4.5:1</strong></p>}
        </div>
      )}

      {/* 2. COLOR CONTRAST */}
      {(printMode || mode === "colors") && (
        <div className="space-y-3">
          {printMode && <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-4 mt-8">Component Contrast</h4>}
          
          <ColorPairRow name1="Pri" hex1={primary[500]} name2="Sec" hex2={secondary[500]} />
          <ColorPairRow name1="Pri" hex1={primary[500]} name2="Acc" hex2={accent[500]} />
          <ColorPairRow name1="Sec" hex1={secondary[500]} name2="Acc" hex2={accent[500]} />
          
          {!printMode && <p className="text-xs text-slate-400 mt-4 text-center leading-relaxed">Target: <strong>3.0:1</strong></p>}
        </div>
      )}

    </div>
  );
}

// --- SUB COMPONENTS ---

function ContrastRow({ title, hex }: { title: string, hex: string }) {
  const whiteContrast = colord(hex).contrast("#ffffff");
  const blackContrast = colord(hex).contrast("#000000");

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-end mb-1">
         <span className="text-xs font-bold text-slate-500 uppercase">{title}</span>
         <span className="text-[10px] font-mono text-slate-400">{hex}</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <ContrastCard bg={hex} text="#ffffff" ratio={whiteContrast} label="White Text" />
        <ContrastCard bg={hex} text="#000000" ratio={blackContrast} label="Black Text" />
      </div>
    </div>
  )
}

function ContrastCard({ bg, text, ratio, label }: { bg: string, text: string, ratio: number, label: string }) {
  const isPass = ratio >= 4.5;
  const isLarge = ratio >= 3.0;

  return (
    <div className="relative p-4 rounded-xl border border-slate-100 overflow-hidden group transition-all" style={{ backgroundColor: bg }}>
      <div className="absolute top-2 right-2">
         <StatusBadge pass={isPass} large={isLarge} />
      </div>
      <div className="relative z-10 flex flex-col items-start gap-0.5">
         <span className="text-lg font-bold" style={{ color: text }}>Aa</span>
         <span className="text-[10px] font-medium opacity-90" style={{ color: text }}>{label}</span>
      </div>
      <div className="absolute bottom-2 right-2 text-[10px] font-mono font-bold" style={{ color: text }}>
        {ratio.toFixed(1)}:1
      </div>
    </div>
  );
}

function ColorPairRow({ name1, hex1, name2, hex2 }: { name1: string, hex1: string, name2: string, hex2: string }) {
  const ratio = colord(hex1).contrast(hex2);
  const isPass = ratio >= 3.0; 

  return (
    <div className="grid grid-cols-5 gap-2 items-center p-2 rounded-xl border border-slate-100 bg-slate-50/50">
       <div className="col-span-2 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg shadow-sm border border-slate-200" style={{ backgroundColor: hex1 }} />
          <span className="text-xs font-bold text-slate-600">{name1}</span>
       </div>
       <div className="col-span-1 flex flex-col items-center justify-center">
          <span className="text-[10px] text-slate-400 font-medium">vs</span>
          <span className={`text-xs font-bold ${isPass ? "text-slate-700" : "text-rose-500"}`}>
            {ratio.toFixed(1)}
          </span>
       </div>
       <div className="col-span-2 flex items-center justify-end gap-2">
          <span className="text-xs font-bold text-slate-600">{name2}</span>
          <div className="w-8 h-8 rounded-lg shadow-sm border border-slate-200 flex items-center justify-center" style={{ backgroundColor: hex2 }}>
             {!isPass && <AlertTriangle className="w-4 h-4 text-white drop-shadow-md" />}
          </div>
       </div>
    </div>
  )
}

function StatusBadge({ pass, large }: { pass: boolean, large: boolean }) {
  if (pass) return <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-100/90 border border-emerald-200 text-emerald-700 text-[9px] font-bold uppercase"><CheckCircle className="w-2.5 h-2.5" /> PASS</div>;
  if (large) return <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-100/90 border border-amber-200 text-amber-700 text-[9px] font-bold uppercase"><AlertTriangle className="w-2.5 h-2.5" /> LG ONLY</div>;
  return <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-rose-100/90 border border-rose-200 text-rose-700 text-[9px] font-bold uppercase"><XCircle className="w-2.5 h-2.5" /> FAIL</div>;
}