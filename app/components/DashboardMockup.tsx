import { BarChart3, Users, DollarSign, Bell, Search, Menu } from "lucide-react";

export function DashboardMockup() {
  return (
    <div className="w-full h-[500px] bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden flex shadow-2xl transition-all duration-500">
      
      {/* 1. SIDEBAR (Dark Mode feel using Primary-900) */}
      <aside className="w-20 md:w-64 bg-primary-950 flex flex-col text-white hidden sm:flex">
        <div className="p-6 font-bold text-xl tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-accent-500"></div>
          <span className="hidden md:block">Admin</span>
        </div>
        
        <div className="flex-1 py-6 space-y-1">
          <SidebarItem active icon={BarChart3} label="Overview" />
          <SidebarItem icon={Users} label="Customers" />
          <SidebarItem icon={DollarSign} label="Revenue" />
        </div>

        <div className="p-4 border-t border-primary-800">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-primary-700"></div>
             <div className="hidden md:block">
               <p className="text-xs font-medium text-primary-200">Logged in as</p>
               <p className="text-sm font-bold">Admin User</p>
             </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 bg-secondary-50/50">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-2 text-slate-400 bg-slate-100 px-3 py-2 rounded-lg w-full max-w-xs">
            <Search className="w-4 h-4" />
            <span className="text-sm">Search...</span>
          </div>
          <div className="relative">
            <Bell className="w-5 h-5 text-slate-500" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent-500 rounded-full border-2 border-white"></span>
          </div>
        </header>

        {/* Dashboard Widgets */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4">
             <StatCard label="Total Revenue" value="$45,231" trend="+20%" color="text-accent-600" />
             <StatCard label="New Users" value="1,205" trend="+12%" color="text-secondary-600" />
             <StatCard label="Bounce Rate" value="4.5%" trend="-2%" color="text-primary-600" />
          </div>

          {/* Chart Area */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-700 mb-4">Traffic Overview</h3>
            <div className="h-40 flex items-end justify-between gap-2 px-2">
               {[40, 70, 45, 90, 60, 80, 50, 95, 65, 75, 55, 85].map((h, i) => (
                 <div 
                   key={i} 
                   className={`w-full rounded-t-sm transition-all duration-500 ${i % 2 === 0 ? 'bg-primary-500' : 'bg-secondary-400'}`}
                   style={{ height: `${h}%` }} 
                 />
               ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active }: any) {
  return (
    <div className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-colors ${active ? 'bg-primary-900 border-r-4 border-accent-500 text-white' : 'text-primary-300 hover:bg-primary-900 hover:text-white'}`}>
      <Icon className="w-5 h-5" />
      <span className="hidden md:block text-sm font-medium">{label}</span>
    </div>
  )
}

function StatCard({ label, value, trend, color }: any) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
      <p className="text-xs text-slate-500 font-medium uppercase">{label}</p>
      <div className="flex items-end justify-between mt-2">
        <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
        <span className={`text-xs font-bold ${color} bg-slate-50 px-2 py-1 rounded`}>{trend}</span>
      </div>
    </div>
  )
}