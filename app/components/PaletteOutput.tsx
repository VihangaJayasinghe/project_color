"use client";

import { usePaletteStore } from "@/lib/store";
import { Copy, Check, Lock, Unlock, Sliders } from "lucide-react";
import { useState, useEffect } from "react";
import { colord } from "colord";

export function PaletteOutput() {
  const { primary, secondary, accent, locked, toggleLock, setColor } = usePaletteStore();

  return (
    <div className="w-full max-w-5xl mx-auto grid md:grid-cols-3 gap-6 p-2">
      <ColorCard 
        roleKey="primary"
        title="Primary" 
        hex={primary[500]} 
        shade50={primary[50]} 
        description="Backgrounds, Text"
        isLocked={locked.primary}
        onToggleLock={() => toggleLock('primary')}
        onColorChange={(hex) => setColor('primary', hex)}
      />
      <ColorCard 
        roleKey="secondary"
        title="Secondary" 
        hex={secondary[500]} 
        shade50={secondary[50]} 
        description="Badges, Cards"
        isLocked={locked.secondary}
        onToggleLock={() => toggleLock('secondary')}
        onColorChange={(hex) => setColor('secondary', hex)}
      />
      <ColorCard 
        roleKey="accent"
        title="Accent" 
        hex={accent[500]} 
        shade50={accent[50]} 
        description="Buttons, CTAs"
        isLocked={locked.accent}
        onToggleLock={() => toggleLock('accent')}
        onColorChange={(hex) => setColor('accent', hex)}
      />
    </div>
  );
}

// --- SUB-COMPONENTS ---

type ColorCardProps = {
  roleKey: string;
  title: string;
  hex: string;
  shade50: string;
  description: string;
  isLocked: boolean;
  onToggleLock: () => void;
  onColorChange: (hex: string) => void;
};

function ColorCard({ title, hex, shade50, description, isLocked, onToggleLock, onColorChange }: ColorCardProps) {
  const [copied, setCopied] = useState(false);
  const [showSliders, setShowSliders] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`
      relative rounded-2xl shadow-sm border overflow-hidden flex flex-col transition-all duration-300 bg-white
      ${isLocked ? 'border-amber-400 ring-1 ring-amber-400/50' : 'border-slate-200'}
    `}>
      
      {/* 1. PREVIEW BLOCK */}
      <div className="h-28 w-full relative group transition-colors duration-500" style={{ backgroundColor: hex }}>
        
        {/* Lock Button */}
        <button
          onClick={onToggleLock}
          className={`
            absolute top-3 left-3 p-2 rounded-lg backdrop-blur-md transition-all duration-200
            ${isLocked 
              ? "bg-amber-100/90 text-amber-700 opacity-100 shadow-sm" 
              : "bg-white/20 text-white opacity-0 group-hover:opacity-100 hover:bg-white/40"
            }
          `}
        >
          {isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
        </button>

        {/* Copy Button */}
        <button 
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-md rounded-lg text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </button>

        {/* Edit Button (Toggles Sliders) */}
        <button 
          onClick={() => setShowSliders(!showSliders)}
          className={`
             absolute bottom-3 right-3 p-2 rounded-lg backdrop-blur-md transition-all duration-200 text-white hover:bg-white/40
             ${showSliders ? 'bg-white/40 opacity-100' : 'bg-white/20 opacity-0 group-hover:opacity-100'}
          `}
          title="Fine Tune"
        >
           <Sliders className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. INFO BLOCK */}
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-slate-900 leading-tight">{title}</h3>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide mt-1">{description}</p>
          </div>
          {isLocked && (
            <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100 uppercase tracking-wide">
              Locked
            </span>
          )}
        </div>

        {/* HSL SLIDERS (Conditionally Rendered) */}
        {showSliders ? (
           <div className="animate-in fade-in slide-in-from-top-2 duration-200">
              <HSLControl hex={hex} onChange={onColorChange} />
           </div>
        ) : (
           <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
             <span className="font-mono text-slate-600 font-bold uppercase text-sm">{hex}</span>
             <div className="w-5 h-5 rounded-full border border-slate-200 shadow-sm" style={{ backgroundColor: hex }} />
           </div>
        )}

        {/* Scale Preview */}
        {!showSliders && (
          <div className="flex gap-0.5 pt-1 opacity-80">
            <div className="h-1.5 w-full rounded-l-sm" style={{ backgroundColor: shade50 }} />
            <div className="h-1.5 w-full" style={{ backgroundColor: hex }} />
            <div className="h-1.5 w-full rounded-r-sm bg-slate-900" />
          </div>
        )}
      </div>
    </div>
  );
}

// --- HSL CONTROL COMPONENT ---
function HSLControl({ hex, onChange }: { hex: string, onChange: (val: string) => void }) {
    // We convert hex to HSL for the sliders
    const hsl = colord(hex).toHsl();
    
    const handleChange = (type: 'h'|'s'|'l', val: number) => {
        const newHsl = { ...hsl, [type]: val };
        onChange(colord(newHsl).toHex());
    };

    return (
        <div className="space-y-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
            {/* HUE */}
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 w-3">H</span>
                <input 
                  type="range" min="0" max="360" value={hsl.h} 
                  onChange={(e) => handleChange('h', Number(e.target.value))}
                  className="w-full h-1.5 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded-lg appearance-none cursor-pointer"
                />
            </div>
            {/* SATURATION */}
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 w-3">S</span>
                <input 
                  type="range" min="0" max="100" value={hsl.s} 
                  onChange={(e) => handleChange('s', Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
                />
            </div>
            {/* LIGHTNESS */}
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 w-3">L</span>
                <input 
                  type="range" min="0" max="100" value={hsl.l} 
                  onChange={(e) => handleChange('l', Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
                />
            </div>
        </div>
    )
}