"use client";

import { usePaletteStore } from "@/lib/store";
import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

extend([a11yPlugin]);

export function ContrastChecker() {
  const { primary, secondary, accent } = usePaletteStore();

  return (
    <div className="flex flex-col bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
         <h3 className="font-bold text-slate-800">Accessibility Matrix</h3>
         <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100 uppercase tracking-wider">
            WCAG 2.0 (AA)
         </span>
      </div>

      {/* Side-by-Side Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: Text Legibility */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-4 flex justify-between">
            <span>Text Legibility</span>
            <span className="opacity-60">Target 4.5:1</span>
          </h4>
          
          <ContrastRow title="Primary" hex={primary[500]} />
          <ContrastRow title="Secondary" hex={secondary[500]} />
          <ContrastRow title="Accent" hex={accent[500]} />
        </div>

        {/* RIGHT COLUMN: Color Visibility */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-4 flex justify-between">
            <span>Component Contrast</span>
            <span className="opacity-60">Target 3.0:1</span>
          </h4>
          
          <ColorPairRow name1="Pri" hex1={primary[500]} name2="Sec" hex2={secondary[500]} />
          <ColorPairRow name1="Pri" hex1={primary[500]} name2="Acc" hex2={accent[500]} />
          <ColorPairRow name1="Sec" hex1={secondary[500]} name2="Acc" hex2={accent[500]} />
          
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mt-4 text-[10px] text-slate-500 leading-relaxed">
            <strong>Note:</strong> Checks if colors are distinct enough to be placed next to each other (e.g., borders, icons).
          </div>
        </div>

      </div>
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
      <div className="grid grid-cols-2 gap-2">
        <ContrastCard bg={hex} text="#ffffff" ratio={whiteContrast} label="White" />
        <ContrastCard bg={hex} text="#000000" ratio={blackContrast} label="Black" />
      </div>
    </div>
  )
}

function ContrastCard({ bg, text, ratio, label }: { bg: string, text: string, ratio: number, label: string }) {
  const isPass = ratio >= 4.5;
  const isLarge = ratio >= 3.0;

  return (
    <div className="relative p-3 rounded-xl border border-slate-100 overflow-hidden group transition-all" style={{ backgroundColor: bg }}>
      <div className="absolute top-2 right-2">
         {isPass ? <CheckCircle className="w-3 h-3 text-emerald-700" /> : isLarge ? <AlertTriangle className="w-3 h-3 text-amber-700" /> : <XCircle className="w-3 h-3 text-rose-700" />}
      </div>
      <div className="relative z-10 flex flex-col items-start gap-0.5">
         <span className="text-base font-bold" style={{ color: text }}>Aa</span>
         <span className="text-[9px] font-medium opacity-80 uppercase" style={{ color: text }}>{label}</span>
      </div>
      <div className="absolute bottom-2 right-2 text-[9px] font-mono font-bold opacity-70" style={{ color: text }}>
        {ratio.toFixed(1)}
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
          <div className="w-6 h-6 rounded-md shadow-sm border border-slate-200" style={{ backgroundColor: hex1 }} />
          <span className="text-[10px] font-bold text-slate-600 uppercase">{name1}</span>
       </div>
       <div className="col-span-1 flex flex-col items-center justify-center">
          <span className={`text-xs font-bold ${isPass ? "text-slate-700" : "text-rose-500"}`}>
            {ratio.toFixed(1)}
          </span>
       </div>
       <div className="col-span-2 flex items-center justify-end gap-2">
          <span className="text-[10px] font-bold text-slate-600 uppercase">{name2}</span>
          <div className="w-6 h-6 rounded-md shadow-sm border border-slate-200 flex items-center justify-center" style={{ backgroundColor: hex2 }}>
             {!isPass && <XCircle className="w-3 h-3 text-white drop-shadow-md" />}
          </div>
       </div>
    </div>
  )
}