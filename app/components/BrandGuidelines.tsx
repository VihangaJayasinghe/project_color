"use client";

import { usePaletteStore } from "@/lib/store";
import { ContrastChecker } from "./ContrastChecker";
import { forwardRef, ReactNode } from "react";

// We use forwardRef so the parent can grab this DOM element to print it
export const BrandGuidelines = forwardRef<HTMLDivElement>((props, ref) => {
  const { primary, secondary, accent } = usePaletteStore();
  const date = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div 
      ref={ref} 
      className="fixed top-0 left-0 z-[-10] pointer-events-none bg-slate-100 p-8 flex flex-col gap-8"
    >
      
      {/* === PAGE 1: Core Colors & Scales === */}
      <PdfPage pageNum={1} date={date}>
         <header className="border-b-4 border-slate-900 pb-8 mb-12 flex justify-between items-end">
            <div>
            <h1 className="text-5xl font-black tracking-tight mb-2 flex items-center gap-3">
               <div className="w-10 h-10 bg-slate-900 rounded-lg"></div>
               ColorEngine
            </h1>
            <p className="text-xl text-slate-500 font-medium">Brand Design System</p>
            </div>
         </header>

         <section className="mb-16">
            <h2 className="text-2xl font-bold border-b border-slate-200 pb-2 mb-6 uppercase tracking-widest text-slate-400">01. Core Palette</h2>
            <div className="grid grid-cols-3 gap-8">
               <BigSwatch title="Primary" role="Brand Base" color={primary[500]} />
               <BigSwatch title="Secondary" role="Harmony" color={secondary[500]} />
               <BigSwatch title="Accent" role="Highlights" color={accent[500]} />
            </div>
         </section>

         <section>
            <h2 className="text-2xl font-bold border-b border-slate-200 pb-2 mb-8 uppercase tracking-widest text-slate-400">02. Full Spectrum</h2>
            <div className="space-y-10">
               <ScaleRow title="Primary Scale" colors={primary} />
               <ScaleRow title="Secondary Scale" colors={secondary} />
               <ScaleRow title="Accent Scale" colors={accent} />
            </div>
         </section>
      </PdfPage>


      {/* === PAGE 2: Accessibility Matrix === */}
      <PdfPage pageNum={2} date={date}>
         <header className="border-b border-slate-200 pb-4 mb-12 flex justify-between items-end opacity-60">
            <div className="text-xl text-slate-500 font-medium">Accessibility Report</div>
         </header>

         <section>
            <h2 className="text-2xl font-bold border-b border-slate-200 pb-2 mb-6 uppercase tracking-widest text-slate-400">03. Accessibility Matrix</h2>
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 p-8 shadow-sm">
               <div className="[&>div]:shadow-none [&>div]:border-0 [&>div]:p-0">
                 {/* FORCE PRINT MODE: Shows both Text and Color comparisons */}
                 <ContrastChecker printMode={true} />
               </div>
            </div>
         </section>
      </PdfPage>

    </div>
  );
});

BrandGuidelines.displayName = "BrandGuidelines";

// --- SUB COMPONENTS ---

function PdfPage({ children, pageNum, date }: { children: ReactNode, pageNum: number, date: string }) {
   return (
      <div className="bg-white text-slate-900 p-16 w-[1000px] h-[1414px] shadow-2xl relative flex flex-col justify-between">
         <div className="flex-1">
            {children}
         </div>
         <footer className="mt-20 pt-8 border-t border-slate-100 flex justify-between text-slate-400 text-sm font-medium">
            <span>Generated on {date}</span>
            <span>Page {pageNum}</span>
         </footer>
      </div>
   )
}

function BigSwatch({ title, role, color }: { title: string, role: string, color: string }) {
   return (
      <div className="flex flex-col gap-3">
         <div className="h-40 rounded-2xl shadow-sm border border-slate-100" style={{ backgroundColor: color }}></div>
         <div>
            <div className="flex justify-between items-center mb-1">
               <h3 className="font-bold text-xl text-slate-900">{title}</h3>
               <span className="font-mono text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded">{color}</span>
            </div>
            <p className="text-sm text-slate-400 font-medium">{role}</p>
         </div>
      </div>
   )
}

function ScaleRow({ title, colors }: { title: string, colors: Record<number, string> }) {
   const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
   return (
      <div>
         <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[500]}}></div>
            {title}
         </h3>
         <div className="flex rounded-xl overflow-hidden border border-slate-200 shadow-sm">
            {steps.map(step => (
               <div key={step} className="flex-1 h-24 flex flex-col items-center justify-end pb-3" style={{ backgroundColor: colors[step] }}>
                  <span className={`text-[10px] font-bold ${step > 500 ? 'text-white/80' : 'text-slate-900/60'}`}>{step}</span>
                  <span className={`text-[9px] font-mono mt-0.5 uppercase ${step > 500 ? 'text-white/60' : 'text-slate-900/40'}`}>{colors[step].replace("#", "")}</span>
               </div>
            ))}
         </div>
      </div>
   )
}