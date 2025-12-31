import { ArrowRight, Sparkles, Palette, ShieldCheck, Play } from "lucide-react";

export function LiveMockup() {
  return (
    // MAIN CONTAINER: Added relative positioning and overflow-hidden for background effects
    <div className="relative w-full max-w-[1100px] mx-auto border border-primary-200/60 rounded-[2rem] overflow-hidden shadow-2xl shadow-primary-900/5 bg-white/80 backdrop-blur-sm transition-all duration-500 group">
      
      {/* === DYNAMIC BACKGROUND EFFECTS (The "Aurora") === */}
      {/* Accent Color Orb hanging from top right */}
      <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-accent-500/20 blur-[120px] -z-10 opacity-70 mix-blend-multiply"></div>
       {/* Secondary Color Orb rising from bottom left */}
      <div className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-secondary-500/20 blur-[100px] -z-10 opacity-70 mix-blend-multiply"></div>
      {/* Primary base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-transparent to-white/80 -z-20"></div>


      {/* 1. MODERN MINIMAL NAV */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          {/* Logo Icon - uses Accent color for pop */}
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-accent-600 text-white shadow-lg shadow-accent-500/20">
            <Sparkles className="w-5 h-5" fill="currentColor" />
            {/* Tiny ping animation */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-500 border-2 border-white"></span>
            </span>
          </div>
          <span className="font-black text-primary-950 text-xl tracking-tight">chroma<span className="text-accent-600">.ai</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-1 text-sm font-bold text-primary-700 bg-primary-100/50 p-1.5 rounded-full border border-primary-200/60 backdrop-blur-md">
          <button className="px-4 py-2 rounded-full bg-white shadow-sm text-primary-950">Product</button>
          <button className="px-4 py-2 rounded-full hover:bg-primary-100/50 transition-colors">Solutions</button>
          <button className="px-4 py-2 rounded-full hover:bg-primary-100/50 transition-colors">Pricing</button>
        </div>

        <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-950 text-white font-bold text-sm hover:bg-primary-800 transition-colors shadow-md">
          Sign In <ArrowRight className="w-4 h-4" />
        </button>
      </nav>

      {/* 2. HERO SECTION */}
      <div className="grid lg:grid-cols-5 gap-12 p-8 md:p-12 items-center relative">
        
        {/* --- LEFT COLUMN (Typography & CTAs) span-3 --- */}
        <div className="lg:col-span-3 space-y-8 flex flex-col justify-center">
          
          {/* Modern Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-secondary-200 shadow-sm text-secondary-700 text-sm font-bold w-fit">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-500"></span>
            </span>
            Introducing Generative Palette Engine v3
          </div>
          
          {/* Massive Headline with gradient text */}
          <h1 className="text-5xl md:text-7xl font-black text-primary-950 tracking-tighter leading-[1.05]">
            Colors that <br />
            <span className="relative z-10">
              <span className="absolute -inset-2 bg-primary-100/80 -z-10 rounded-xl skew-y-2 blur-sm"></span>
              actually work.
            </span>
          </h1>
          
          <p className="text-xl text-primary-800/80 leading-relaxed max-w-lg font-medium">
            Stop fighting with color pickers. Generate accessible, harmonious design systems in milliseconds using our AI-driven engine.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-accent-600 text-white font-bold text-lg shadow-xl shadow-accent-600/30 hover:bg-accent-700 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Start Generating <Play className="w-5 h-5 fill-current" />
            </button>
            <button className="px-8 py-4 rounded-2xl bg-white text-primary-800 font-bold text-lg border-2 border-primary-200/80 hover:border-primary-400 hover:bg-primary-50 transition-all shadow-sm">
              View Examples
            </button>
          </div>

          {/* Modern Social Proof (Avatar Pile) */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-xs font-bold text-white
                  ${i === 0 ? 'bg-accent-400 z-40' : 
                    i === 1 ? 'bg-secondary-400 z-30' : 
                    i === 2 ? 'bg-primary-400 z-20' : 'bg-primary-300 z-10'}
                `}>
                  Let's hold
                </div>
              ))}
            </div>
            <div className="text-sm font-bold text-primary-700">
              <span className="text-accent-700">4.9/5 rating</span> from 10k+ designers
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN (Abstract Visuals / "Bento" Grid) span-2 --- */}
        {/* This section visually represents the color engine's output */}
        <div className="lg:col-span-2 relative h-full min-h-[400px] hidden lg:block">
            <div className="absolute inset-0 translate-x-8 translate-y-4">
                
                {/* Main abstract "Interface" card */}
                <div className="relative z-20 bg-white/60 backdrop-blur-xl border border-white/80 p-6 rounded-3xl shadow-2xl shadow-primary-900/10 w-full max-w-sm ml-auto rotate-3 transition-transform duration-500 group-hover:rotate-0 hover:scale-[1.02]">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-primary-100 rounded-lg text-primary-600"><Palette className="w-5 h-5"/></div>
                            <span className="font-bold text-primary-900">Generated System</span>
                        </div>
                        <div className="text-xs font-bold text-secondary-700 bg-secondary-100 px-2 py-1 rounded-md flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3"/> AA Pass
                        </div>
                    </div>

                    {/* Simulated Color Palette Rows */}
                    <div className="space-y-3">
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs font-medium text-primary-500"><span>Primary</span><span>500</span></div>
                            <div className="h-10 w-full bg-primary-500 rounded-xl shadow-sm"></div>
                            <div className="grid grid-cols-5 gap-1 mt-1">
                                <div className="h-6 bg-primary-100 rounded-md"></div>
                                <div className="h-6 bg-primary-300 rounded-md"></div>
                                <div className="h-6 bg-primary-500 rounded-md font-bold text-white text-[10px] flex items-center justify-center">Base</div>
                                <div className="h-6 bg-primary-700 rounded-md"></div>
                                <div className="h-6 bg-primary-900 rounded-md"></div>
                            </div>
                        </div>
                        
                         <div className="flex gap-3 pt-2">
                            <div className="flex-1 space-y-1">
                                <div className="text-xs font-medium text-primary-500">Accent</div>
                                <div className="h-8 w-full bg-accent-500 rounded-xl shadow-sm relative overflow-hidden">
                                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer"></div>
                                </div>
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="text-xs font-medium text-primary-500">Secondary</div>
                                <div className="h-8 w-full bg-secondary-500 rounded-xl shadow-sm"></div>
                            </div>
                        </div>
                    </div>

                    {/* Floating secondary card */}
                    <div className="absolute -bottom-12 -left-12 bg-white/80 backdrop-blur-xl border border-white p-4 rounded-2xl shadow-xl w-48 -rotate-6 group-hover:rotate-0 transition-all duration-500 delay-75 z-30">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-accent-500" />
                            <span className="text-sm font-bold text-primary-900">Harmony</span>
                        </div>
                        <div className="text-xs text-primary-600 font-medium bg-primary-50 p-2 rounded-lg text-center">
                            Split-Complementary active
                        </div>
                    </div>

                </div>

                {/* Decorative blurred shape behind cards */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-300/30 rounded-full blur-3xl -z-10"></div>

            </div>
        </div>

      </div>
    </div>
  );
}