"use client";

import React from "react";
import { Activity, RefreshCw, Search, Bell, SlidersHorizontal } from "lucide-react";

export function Navbar() {
  return (
    <header className="h-16 border-b border-slate-200 bg-white/95 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      {/* BRANDING: "Conflux" ONLY */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/20 border border-blue-500">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-slate-900 text-xl font-sans">
              Conflux
            </span>
            <span className="ml-2 text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              Analyst Core
            </span>
          </div>
        </div>
      </div>

      {/* SEARCH / QUICK CONTROLS BAR */}
      <div className="hidden md:flex items-center gap-3 max-w-md w-full mx-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search customer account, transaction ID, or incident..."
            className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition border border-slate-200">
          <Bell className="w-4.5 h-4.5" />
        </button>
        <button className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold flex items-center gap-2 transition shadow-sm">
          <RefreshCw className="w-4 h-4" />
          <span>Sync Telemetry</span>
        </button>
        <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-white shadow-sm border border-slate-300">
          RK
        </div>
      </div>
    </header>
  );
}
