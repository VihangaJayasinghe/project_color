import { ArrowRight, CheckCircle, Layout, Shield, Zap } from "lucide-react";

export function LiveMockup() {
  return (
    <div className="w-full max-w-5xl mx-auto border border-primary-200 rounded-3xl overflow-hidden shadow-2xl bg-white transition-all duration-500">
      
      {/* 1. NAVIGATION BAR */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-primary-100 bg-primary-50/30 backdrop-blur-md">
        <div className="flex items-center gap-2">
          {/* Logo now uses the ACCENT color to stand out */}
          <div className="w-8 h-8 rounded-lg bg-accent-600 flex items-center justify-center text-white font-bold shadow-lg shadow-accent-500/30">
            C
          </div>
          <span className="font-bold text-primary-950 text-lg tracking-tight">ColorBrand</span>
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-medium text-primary-600">
          <span className="hover:text-primary-900 cursor-pointer transition-colors">Features</span>
          <span className="hover:text-primary-900 cursor-pointer transition-colors">Pricing</span>
          <span className="hover:text-primary-900 cursor-pointer transition-colors">About</span>
        </div>

        {/* Secondary button uses the secondary color scale */}
        <button className="px-5 py-2 rounded-full bg-secondary-100 text-secondary-800 font-semibold text-sm hover:bg-secondary-200 transition-colors">
          Log in
        </button>
      </nav>

      {/* 2. HERO SECTION */}
      <div className="grid md:grid-cols-2 gap-12 p-12 items-center bg-gradient-to-b from-primary-50/50 to-white">
        
        {/* Left Side: Copywriting */}
        <div className="space-y-8">
          
          {/* Badge using Secondary Colors */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-100 border border-secondary-200 text-secondary-800 text-xs font-bold uppercase tracking-wide">
            <span className="w-2 h-2 rounded-full bg-secondary-600 animate-pulse"></span>
            v2.0 is live
          </div>
          
          <h1 className="text-5xl font-black text-primary-950 leading-[1.1]">
            Design with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
              intelligent color.
            </span>
          </h1>
          
          <p className="text-lg text-primary-700/80 leading-relaxed max-w-md">
            Stop guessing hex codes. Our engine generates the perfect <span className="font-semibold text-secondary-700">accessible palette</span> for your next big project instantly.
          </p>

          <div className="flex gap-4">
            {/* MAIN CTA: Uses Accent Color (The "Pop") */}
            <button className="flex items-center gap-2 px-8 py-4 rounded-xl bg-accent-600 text-white font-bold shadow-xl shadow-accent-500/20 hover:bg-accent-700 hover:scale-105 transition-all">
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
            
            {/* SECONDARY CTA */}
            <button className="px-8 py-4 rounded-xl bg-white text-primary-700 font-bold border border-primary-200 hover:bg-primary-50 transition-colors">
              View Demo
            </button>
          </div>

          <div className="flex items-center gap-6 pt-2 text-sm text-primary-600 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-secondary-500" /> No credit card
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-secondary-500" /> 14-day free trial
            </div>
          </div>
        </div>

        {/* Right Side: Feature Cards */}
        <div className="relative isolate">
          {/* Background Glow using Accent Color */}
          <div className="absolute inset-0 bg-accent-500 rounded-full blur-[100px] opacity-10 translate-x-10 translate-y-10 -z-10"></div>
          
          <div className="relative grid gap-5">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-white border border-primary-100 shadow-xl flex items-start gap-4 hover:-translate-y-1 transition-transform duration-300">
              <div className="p-3 rounded-lg bg-primary-100 text-primary-600">
                <Layout className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-primary-950">Auto-Layout</h3>
                <p className="text-sm text-primary-600 mt-1">Responsive components that fit any screen size automatically.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-white border border-secondary-200 shadow-xl flex items-start gap-4 translate-x-4 hover:-translate-y-1 transition-transform duration-300">
              <div className="p-3 rounded-lg bg-secondary-100 text-secondary-600">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-primary-950">Smart Harmonies</h3>
                <p className="text-sm text-primary-600 mt-1">
                  We calculate <span className="text-secondary-600 font-bold">Analogous</span> and <span className="text-accent-600 font-bold">Split-Complementary</span> rules instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}