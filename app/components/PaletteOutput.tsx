import { usePaletteStore } from "@/lib/store";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export function PaletteOutput() {
  const { primary, secondary, accent } = usePaletteStore();

  return (
    <div className="w-full max-w-5xl mx-auto grid md:grid-cols-3 gap-8 p-4">
      {/* 1. Primary Card */}
      <ColorCard 
        title="Primary (Base)" 
        hex={primary[500]} 
        shade50={primary[50]} 
        role="Backgrounds, Text"
      />

      {/* 2. Secondary Card (The one we calculated!) */}
      <ColorCard 
        title="Secondary (Harmony)" 
        hex={secondary[500]} 
        shade50={secondary[50]} 
        role="Badges, Cards, Support"
      />

      {/* 3. Accent Card (The one we calculated!) */}
      <ColorCard 
        title="Accent (Contrast)" 
        hex={accent[500]} 
        shade50={accent[50]} 
        role="Buttons, CTAs, Highlights"
      />
    </div>
  );
}

// Sub-component for individual cards
function ColorCard({ title, hex, shade50, role }: { title: string, hex: string, shade50: string, role: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden flex flex-col">
      {/* Color Preview Block */}
      <div className="h-32 w-full relative group" style={{ backgroundColor: hex }}>
        <button 
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-md rounded-lg text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Info Section */}
      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-bold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500 font-medium">{role}</p>
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
          <span className="font-mono text-slate-600 font-bold uppercase">{hex}</span>
          <div className="w-6 h-6 rounded-full border border-slate-200" style={{ backgroundColor: hex }} />
        </div>

        {/* Small Scale Preview */}
        <div className="flex gap-1 pt-2">
          <div className="h-2 w-full rounded-sm" style={{ backgroundColor: shade50 }} />
          <div className="h-2 w-full rounded-sm" style={{ backgroundColor: hex }} />
        </div>
      </div>
    </div>
  );
}