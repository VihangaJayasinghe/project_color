"use client";

import { useState } from "react";
import { LiveMockup } from "./LiveMockup";
import { DashboardMockup } from "./DashboardMockup";
import { EcommerceMockup } from "./EcommerceMockup";
import { Layout, ShoppingCart, BarChart } from "lucide-react";

export function MockupSwitcher() {
  const [activeTab, setActiveTab] = useState<"landing" | "dashboard" | "ecommerce">("landing");

  return (
    <div className="w-full space-y-4">
      
      {/* HEADER ROW: Title (Left) + Tabs (Right) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Title Flush Left */}
        <h2 className="text-lg font-bold text-slate-800">Live Preview</h2>

        {/* Tabs Flush Right */}
        <div className="inline-flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm self-start sm:self-auto">
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

      {/* Viewport */}
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
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
        isActive 
          ? "bg-slate-900 text-white shadow-sm" 
          : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
      }`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}