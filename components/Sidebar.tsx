"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ShieldAlert,
  FileText,
  Sliders,
  Settings,
  HelpCircle,
  Activity,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");

  const navItems = [
    { id: "dashboard", label: "Journey Overview", icon: LayoutDashboard },
    { id: "customers", label: "Customer Profiles", icon: Users },
    { id: "risk", label: "Risk Analytics", icon: ShieldAlert },
    { id: "tickets", label: "Dispute Tickets", icon: FileText },
    { id: "rules", label: "System Rules", icon: Sliders },
  ];

  return (
    <aside
      className={`bg-white border-r border-slate-200 flex flex-col justify-between transition-all duration-300 z-30 sticky top-0 h-screen shadow-sm ${
        isCollapsed ? "w-16" : "w-60"
      }`}
    >
      {/* SIDEBAR HEADER */}
      <div>
        <div className="h-16 border-b border-slate-200 px-4 flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <Activity className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-slate-900 tracking-tight text-lg">
                Conflux
              </span>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white mx-auto shadow-sm">
              <Activity className="w-5 h-5" />
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-md hover:bg-slate-100 text-slate-500 border border-slate-200 transition hidden sm:block"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* NAVIGATION ITEMS */}
        <div className="p-3 space-y-1.5">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeNav === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                } ${isCollapsed ? "justify-center" : ""}`}
                title={isCollapsed ? item.label : undefined}
              >
                <IconComponent
                  className={`w-4.5 h-4.5 shrink-0 ${
                    isActive ? "text-blue-600" : "text-slate-500"
                  }`}
                />
                {!isCollapsed && (
                  <span className="truncate tracking-wide">{item.label}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* SIDEBAR FOOTER */}
      <div className="p-3 border-t border-slate-200 space-y-1.5">
        <button
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono text-slate-600 hover:bg-slate-100 transition ${
            isCollapsed ? "justify-center" : ""
          }`}
          title="Settings"
        >
          <Settings className="w-4.5 h-4.5 shrink-0 text-slate-500" />
          {!isCollapsed && <span>Settings</span>}
        </button>
        <button
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono text-slate-600 hover:bg-slate-100 transition ${
            isCollapsed ? "justify-center" : ""
          }`}
          title="Support"
        >
          <HelpCircle className="w-4.5 h-4.5 shrink-0 text-slate-500" />
          {!isCollapsed && <span>Help Center</span>}
        </button>

        {!isCollapsed && (
          <div className="mt-3 p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs">
            <div className="flex items-center gap-1.5 text-blue-900 font-bold font-mono mb-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Conflux AI Engine</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug font-sans">
              Rule v4.2 Active. Telemetry sync interval: 1s.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
