import { ShoppingBag, Star, Heart } from "lucide-react";

export function EcommerceMockup() {
  return (
    <div className="w-full max-w-5xl mx-auto h-[500px] border border-slate-200 rounded-3xl overflow-hidden shadow-2xl bg-white flex flex-col md:flex-row">
      
      {/* 1. PRODUCT IMAGE (Left) */}
      <div className="md:w-1/2 bg-secondary-50 relative flex items-center justify-center p-10">
        <div className="w-64 h-80 bg-white rounded-2xl shadow-xl transform -rotate-6 transition-transform duration-500 hover:rotate-0 flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 opacity-50"></div>
          <span className="relative font-bold text-primary-900/20 text-4xl uppercase tracking-widest rotate-90">Sneaker</span>
        </div>
        
        {/* Floating Badge */}
        <div className="absolute top-6 left-6 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-accent-500/30">
          New Release
        </div>
      </div>

      {/* 2. PRODUCT DETAILS (Right) */}
      <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-4">
           <div className="flex text-amber-400">
             <Star className="w-4 h-4 fill-current" />
             <Star className="w-4 h-4 fill-current" />
             <Star className="w-4 h-4 fill-current" />
             <Star className="w-4 h-4 fill-current" />
             <Star className="w-4 h-4 text-slate-200" />
           </div>
           <span className="text-xs text-slate-500 font-medium">(128 reviews)</span>
        </div>

        <h2 className="text-3xl font-black text-slate-900 leading-tight mb-2">
          Urban Runner <span className="text-primary-600">Pro</span>
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          Designed for the modern city scape. Features our patented color-adapt technology and cloud-foam sole.
        </p>

        {/* Price Block */}
        <div className="flex items-end gap-3 mb-8">
          <span className="text-4xl font-bold text-slate-900">$149</span>
          <span className="text-lg text-slate-400 line-through mb-1">$189</span>
          <span className="text-sm font-bold text-accent-600 bg-accent-50 px-2 py-1 rounded mb-2">Save 20%</span>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button className="flex-1 bg-primary-900 text-white font-bold py-4 rounded-xl shadow-xl shadow-primary-900/20 hover:bg-primary-800 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Add to Cart
          </button>
          <button className="w-14 h-14 rounded-xl border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:border-secondary-500 hover:text-secondary-500 hover:bg-secondary-50 transition-colors">
            <Heart className="w-6 h-6" />
          </button>
        </div>
        
        <p className="mt-6 text-xs text-center text-slate-400 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary-500"></span>
          In stock and ready to ship
        </p>
      </div>
    </div>
  );
}