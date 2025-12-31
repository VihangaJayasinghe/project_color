import { useState } from "react";
import { LiveMockup } from "./LiveMockup";
import { DashboardMockup } from "./DashboardMockup";
import { EcommerceMockup } from "./EcommerceMockup";
import { Layout, ShoppingCart, BarChart } from "lucide-react";

export function MockupSwitcher() {
  const [activeTab, setActiveTab] = useState<"landing" | "dashboard" | "ecommerce">("landing");

  return (
    <div className="w-full space-y-6">
      
      {/* 1. The Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
          <Tab 
            label="Landing Page" 
            icon={Layout} 
            isActive={activeTab === "landing"} 
            onClick={() => setActiveTab("landing")} 
          />
          <Tab 
            label="Dashboard" 
            icon={BarChart} 
            isActive={activeTab === "dashboard"} 
            onClick={() => setActiveTab("dashboard")} 
          />
          <Tab 
            label="E-Commerce" 
            icon={ShoppingCart} 
            isActive={activeTab === "ecommerce"} 
            onClick={() => setActiveTab("ecommerce")} 
          />
        </div>
      </div>

      {/* 2. The Viewport */}
      <div className="animate-in fade-in zoom-in-95 duration-500">
        {activeTab === "landing" && <LiveMockup />}
        {activeTab === "dashboard" && <DashboardMockup />}
        {activeTab === "ecommerce" && <EcommerceMockup />}
      </div>
    </div>
  );
}

function Tab({ label, icon: Icon, isActive, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
        isActive 
          ? "bg-slate-900 text-white shadow-md" 
          : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}