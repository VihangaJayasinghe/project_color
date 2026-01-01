"use client";

import { useState, useRef } from "react";
import { usePaletteStore } from "@/lib/store";
import { Check, Copy, FileJson, FileCode, Hash, Download, Loader2 } from "lucide-react";
import { toPng } from "html-to-image"; 
import jsPDF from "jspdf";
import { BrandGuidelines } from "./BrandGuidelines";

export function CodeExport() {
  const { primary, secondary, accent } = usePaletteStore();
  const [activeTab, setActiveTab] = useState<"tailwind" | "css" | "scss">("tailwind");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const printRef = useRef<HTMLDivElement>(null);

  // --- PDF GENERATION LOGIC ---
  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    setIsGenerating(true);

    try {
      // 1. Capture the entire tall component (Page 1 + Page 2) as an image
      // 'html-to-image' supports modern CSS like 'lab' and 'oklch'
      const dataUrl = await toPng(printRef.current, { 
        cacheBust: true, 
        pixelRatio: 2, // High resolution for print
        backgroundColor: "#f1f5f9" // Matches the gray gap between pages
      });

      // 2. Initialize PDF (A4 Portrait)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      
      const imgProps = pdf.getImageProperties(dataUrl);
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      // 3. Add First Page
      pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // 4. Add subsequent pages if the image is taller than one A4 page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight; // Shift the image up
        pdf.addPage();
        pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save("brand-guidelines.pdf");
      
    } catch (err) {
      console.error("PDF generation failed", err);
    } finally {
      setIsGenerating(false);
    }
  };

  // --- CODE GENERATORS ---
  const getTailwindCode = () => {
    return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '${primary[50]}',
          100: '${primary[100]}',
          200: '${primary[200]}',
          300: '${primary[300]}',
          400: '${primary[400]}',
          500: '${primary[500]}',
          600: '${primary[600]}',
          700: '${primary[700]}',
          800: '${primary[800]}',
          900: '${primary[900]}',
          950: '${primary[950]}',
        },
        secondary: {
          50: '${secondary[50]}',
          500: '${secondary[500]}',
          900: '${secondary[900]}',
        },
        accent: {
          500: '${accent[500]}',
        },
      }
    }
  }
}`;
  };

  const getCSSCode = () => {
    return `:root {
  /* Primary */
  --primary-50: ${primary[50]};
  --primary-500: ${primary[500]};
  --primary-900: ${primary[900]};

  /* Secondary */
  --secondary-50: ${secondary[50]};
  --secondary-500: ${secondary[500]};
  --secondary-900: ${secondary[900]};

  /* Accent */
  --accent-50: ${accent[50]};
  --accent-500: ${accent[500]};
  --accent-900: ${accent[900]};
}`;
  };

  const getSCSSCode = () => {
    return `// _variables.scss
$primary-500: ${primary[500]};
$secondary-500: ${secondary[500]};
$accent-500: ${accent[500]};

// Maps
$theme-colors: (
  "primary": $primary-500,
  "secondary": $secondary-500,
  "accent": $accent-500
);`;
  };

  const currentCode = 
    activeTab === "tailwind" ? getTailwindCode() 
    : activeTab === "css" ? getCSSCode() 
    : getSCSSCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 h-full flex flex-col relative">
      
      {/* HIDDEN COMPONENT (Used for PDF Snapshot) */}
      <BrandGuidelines ref={printRef} />

      {/* Header / Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 gap-4 z-10 relative">
        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
          <TabButton 
            active={activeTab === "tailwind"} 
            onClick={() => setActiveTab("tailwind")} 
            label="Tailwind" 
            icon={<FileJson className="w-3.5 h-3.5" />} 
          />
          <TabButton 
            active={activeTab === "css"} 
            onClick={() => setActiveTab("css")} 
            label="CSS" 
            icon={<Hash className="w-3.5 h-3.5" />} 
          />
          <TabButton 
            active={activeTab === "scss"} 
            onClick={() => setActiveTab("scss")} 
            label="SCSS" 
            icon={<FileCode className="w-3.5 h-3.5" />} 
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
           {/* PDF BUTTON */}
           <button
             onClick={handleDownloadPDF}
             disabled={isGenerating}
             className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg transition-colors border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
           >
             {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
             {isGenerating ? "Exporting..." : "PDF Report"}
           </button>

           <button 
             onClick={handleCopy}
             className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-slate-900 bg-white rounded-lg hover:bg-slate-200 transition-colors shadow-lg shadow-white/5"
           >
             {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
             {copied ? "Copied!" : "Copy Code"}
           </button>
        </div>
      </div>

      <div className="p-6 overflow-x-auto relative group flex-1 bg-[#0d1117] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <pre className="text-xs sm:text-sm font-mono leading-relaxed text-blue-100">
          <code>{currentCode}</code>
        </pre>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, label, icon }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
        active 
          ? "bg-slate-800 text-white shadow-sm ring-1 ring-white/10" 
          : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}