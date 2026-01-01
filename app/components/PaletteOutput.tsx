"use client";

import { usePaletteStore } from "@/lib/store";
import { Copy, Check, Lock, Unlock, Sliders } from "lucide-react";
import { useState } from "react";
import { colord } from "colord";

export function PaletteOutput() {
  const { primary, secondary, accent, locked, toggleLock, setColor } = usePaletteStore();

  return (
    // CHANGED: Flex-col to stack cards vertically in the right sidebar
    <div className="flex flex-col gap-4 h-full overflow-y-auto pb-4">
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

// ... (Keep the ColorCard and HSLControl sub-components exactly as they were) ...
// For brevity, assume the ColorCard code is unchanged from previous steps.
// Be sure to include the full component code here in your actual file.

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
      relative rounded-xl shadow-sm border overflow-hidden flex flex-col transition-all duration-300 bg-white shrink-0
      ${isLocked ? 'border-amber-400 ring-1 ring-amber-400/50' : 'border-slate-200'}
    `}>
      {/* Smaller Preview Height for sidebar */}
      <div className="h-20 w-full relative group" style={{ backgroundColor: hex }}>
        <button onClick={onToggleLock} className={`absolute top-2 left-2 p-1.5 rounded-md backdrop-blur-md transition-all ${isLocked ? "bg-amber-100/90 text-amber-700" : "bg-white/20 text-white opacity-0 group-hover:opacity-100"}`}>
          {isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
        </button>
        <button onClick={handleCopy} className="absolute top-2 right-2 p-1.5 bg-white/20 backdrop-blur-md rounded-md text-white opacity-0 group-hover:opacity-100">
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        </button>
        <button onClick={() => setShowSliders(!showSliders)} className={`absolute bottom-2 right-2 p-1.5 rounded-md backdrop-blur-md text-white ${showSliders ? 'bg-white/40' : 'bg-white/20 opacity-0 group-hover:opacity-100'}`}>
           <Sliders className="w-3 h-3" />
        </button>
      </div>

      <div className="p-3 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">{title}</h3>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">{description}</p>
          </div>
          {isLocked && <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100 uppercase">LOCKED</span>}
        </div>

        {showSliders ? (
           <HSLControl hex={hex} onChange={onColorChange} />
        ) : (
           <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100">
             <span className="font-mono text-slate-600 font-bold uppercase text-xs">{hex}</span>
             <div className="w-4 h-4 rounded-full border border-slate-200" style={{ backgroundColor: hex }} />
           </div>
        )}
      </div>
    </div>
  );
}

function HSLControl({ hex, onChange }: { hex: string, onChange: (val: string) => void }) {
    const hsl = colord(hex).toHsl();
    const handleChange = (type: 'h'|'s'|'l', val: number) => {
        const newHsl = { ...hsl, [type]: val };
        onChange(colord(newHsl).toHex());
    };
    return (
        <div className="space-y-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
            <input type="range" min="0" max="360" value={hsl.h} onChange={(e) => handleChange('h', Number(e.target.value))} className="w-full h-1 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded-lg appearance-none cursor-pointer" />
            <input type="range" min="0" max="100" value={hsl.s} onChange={(e) => handleChange('s', Number(e.target.value))} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
            <input type="range" min="0" max="100" value={hsl.l} onChange={(e) => handleChange('l', Number(e.target.value))} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
        </div>
    )
}