import { useState } from "react";
import { usePaletteStore } from "../../lib/store"; // Relative import!
import { Check, Copy, FileJson, FileCode, Hash } from "lucide-react";

export function CodeExport() {
  const { primary, secondary, accent } = usePaletteStore();
  const [activeTab, setActiveTab] = useState<"tailwind" | "css" | "scss">("tailwind");
  const [copied, setCopied] = useState(false);

  // 1. GENERATORS: These functions turn your data into text
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
          // ... add others as needed
        },
        accent: {
          500: '${accent[500]}',
          600: '${accent[600]}',
          // ... add others as needed
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

  // Decide which code to show
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
    <div className="w-full max-w-4xl mx-auto bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 my-10">
      
      {/* Header / Tabs */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
        <div className="flex gap-2">
          <TabButton 
            active={activeTab === "tailwind"} 
            onClick={() => setActiveTab("tailwind")} 
            label="Tailwind" 
            icon={<FileJson className="w-4 h-4" />} 
          />
          <TabButton 
            active={activeTab === "css"} 
            onClick={() => setActiveTab("css")} 
            label="CSS Variables" 
            icon={<Hash className="w-4 h-4" />} 
          />
          <TabButton 
            active={activeTab === "scss"} 
            onClick={() => setActiveTab("scss")} 
            label="SCSS" 
            icon={<FileCode className="w-4 h-4" />} 
          />
        </div>

        <button 
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-900 bg-white rounded-lg hover:bg-slate-200 transition-colors"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy Code"}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-6 overflow-x-auto relative group">
        <pre className="text-sm font-mono leading-relaxed text-blue-100">
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
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        active 
          ? "bg-slate-800 text-white shadow-lg" 
          : "text-slate-500 hover:text-slate-300 hover:bg-slate-900"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}