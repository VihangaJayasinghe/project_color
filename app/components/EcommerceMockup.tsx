"use client";

import { usePaletteStore } from "@/lib/store";
import { ShoppingCart, Star, Heart, Menu, Search } from "lucide-react";

export function EcommerceMockup() {
  const { primary, secondary, accent } = usePaletteStore();

  return (
    <div className="w-full h-full min-h-[500px] bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-sm">
      
      {/* 1. NAVBAR */}
      <nav className="border-b border-slate-100 p-4 flex items-center justify-between" style={{ backgroundColor: primary[950] }}>
         <div className="flex items-center gap-3">
            <Menu className="w-5 h-5 text-white md:hidden" />
            <div className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
               <div className="w-6 h-6 rounded bg-white flex items-center justify-center">
                  <span className="text-xs font-black" style={{ color: primary[900] }}>S</span>
               </div>
               Store
            </div>
         </div>
         
         <div className="hidden md:flex flex-1 max-w-xs mx-8 relative">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-white/10 border border-white/20 rounded-full py-1.5 pl-4 pr-10 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-white/50"
            />
            <Search className="absolute right-3 top-1.5 w-4 h-4 text-white/50" />
         </div>

         <div className="flex items-center gap-4 text-white">
            <Heart className="w-5 h-5 hidden sm:block opacity-70 hover:opacity-100 cursor-pointer" />
            <div className="relative cursor-pointer">
               <ShoppingCart className="w-5 h-5" />
               <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white border border-slate-900" style={{ backgroundColor: accent[500] }}>
                  2
               </div>
            </div>
         </div>
      </nav>

      {/* 2. MAIN CONTENT (Responsive Grid) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
         <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            
            {/* LEFT: PRODUCT IMAGE GALLERY */}
            <div className="space-y-4">
               <div className="aspect-square rounded-2xl relative overflow-hidden group shadow-sm bg-slate-50 flex items-center justify-center">
                  {/* Fake Image Placeholder */}
                  <div className="w-48 h-64 rounded-lg shadow-xl transform group-hover:scale-105 transition-transform duration-500" style={{ backgroundColor: secondary[500] }}></div>
                  
                  {/* Floating Tag */}
                  <span className="absolute top-4 left-4 text-xs font-bold text-white px-2 py-1 rounded shadow-sm" style={{ backgroundColor: accent[500] }}>
                     NEW ARRIVAL
                  </span>
               </div>
               
               {/* Thumbnails */}
               <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                     <div key={i} className={`aspect-square rounded-lg border cursor-pointer transition-all ${i === 1 ? 'ring-2 ring-offset-1' : 'opacity-60 hover:opacity-100'}`} style={{ borderColor: i === 1 ? primary[500] : '#e2e8f0' }}>
                        <div className="w-full h-full bg-slate-100 rounded-md"></div>
                     </div>
                  ))}
               </div>
            </div>

            {/* RIGHT: PRODUCT DETAILS */}
            <div className="flex flex-col gap-6">
               
               {/* Header */}
               <div>
                  <div className="flex items-center gap-2 mb-2">
                     <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Minimalist Collection</span>
                     <div className="flex text-amber-400">
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs text-slate-400 ml-1 font-medium">(420)</span>
                     </div>
                  </div>
                  <h1 className="text-3xl font-black text-slate-900 leading-tight">
                     Essential Cotton Tee
                  </h1>
                  <p className="text-2xl font-bold mt-2" style={{ color: primary[600] }}>
                     $45.00
                  </p>
               </div>

               {/* Description */}
               <p className="text-slate-500 leading-relaxed text-sm">
                  Crafted from 100% organic cotton, this tee offers a relaxed fit for everyday comfort. The fabric is pre-washed for a soft feel and zero shrinkage.
               </p>

               {/* Color Selector */}
               <div>
                  <label className="text-xs font-bold text-slate-900 uppercase block mb-3">Select Color</label>
                  <div className="flex gap-3">
                     {[primary[500], secondary[500], accent[500]].map((color, i) => (
                        <button key={i} className="w-10 h-10 rounded-full shadow-sm ring-1 ring-slate-200 hover:scale-110 transition-transform focus:ring-2 focus:ring-offset-2 focus:ring-slate-400" style={{ backgroundColor: color }} />
                     ))}
                  </div>
               </div>

               {/* Actions */}
               <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                  <button 
                     className="w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                     style={{ backgroundColor: primary[600] }}
                  >
                     <ShoppingCart className="w-5 h-5" />
                     Add to Cart
                  </button>
                  <button className="w-full py-4 rounded-xl font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors">
                     Save to Wishlist
                  </button>
               </div>

               {/* Trust Badges */}
               <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                     <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                     </div>
                     <span className="text-xs font-medium text-slate-500">Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                     </div>
                     <span className="text-xs font-medium text-slate-500">30 Day Returns</span>
                  </div>
               </div>

            </div>
         </div>
      </div>

    </div>
  );
}