"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-100 px-6 py-2.5 text-xs font-mono text-slate-600 flex flex-col sm:flex-row justify-between items-center gap-2">
      <div className="flex items-center gap-4">
        <span className="font-bold text-slate-800">CONFLUX ANALYST v2.4</span>
        <span className="text-emerald-700 flex items-center gap-1.5 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          Telemetry Stream Active
        </span>
      </div>
      <div>
        Enterprise Support Analyst Dashboard | Secured 256-Bit TLS
      </div>
    </footer>
  );
}
