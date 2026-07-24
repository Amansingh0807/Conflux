"use client";

import React from "react";
import { Sparkles, Zap, ChevronRight } from "lucide-react";
import { SystemFlag } from "@/types/dashboard";

interface Props {
  flags: SystemFlag[];
  onLaunchWorkflow: () => void;
}

export function SystemIntelligenceSidebar({ flags, onLaunchWorkflow }: Props) {
  return (
    <section className="lg:col-span-3 flex flex-col gap-5">
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex-1 flex flex-col justify-between">
        <div>
          {/* HEADER (KEPT EXACTLY AS REQUESTED) */}
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping"></div>
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider font-mono">
                System Intelligence
              </h2>
            </div>
            <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded border border-slate-300 font-semibold">
              Rule Engine v4.2
            </span>
          </div>

          {/* 3 SPECIFIC RULE-BASED FLAGS (NO EMOJIS, LARGER TEXT) */}
          <div className="space-y-3.5 mb-6">
            {flags.map((flag) => {
              const IconComponent = flag.icon;
              const isHigh = flag.severity === "high";
              const isWarning = flag.severity === "warning";

              return (
                <div
                  key={flag.id}
                  className={`p-4 rounded-xl border transition-all group ${
                    isHigh
                      ? "bg-red-50/70 border-red-200 hover:border-red-400"
                      : isWarning
                      ? "bg-amber-50/70 border-amber-200 hover:border-amber-400"
                      : "bg-red-50/70 border-red-200 hover:border-red-400"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
                        isHigh
                          ? "bg-red-100 border-red-300 text-red-700"
                          : isWarning
                          ? "bg-amber-100 border-amber-300 text-amber-800"
                          : "bg-red-100 border-red-300 text-red-700"
                      }`}
                    >
                      <IconComponent className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4
                          className={`text-sm font-bold font-mono ${
                            isHigh
                              ? "text-red-950"
                              : isWarning
                              ? "text-amber-950"
                              : "text-red-950"
                          }`}
                        >
                          {flag.title}
                        </h4>
                        <span
                          className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                            isHigh
                              ? "bg-red-200 text-red-900 border-red-300"
                              : isWarning
                              ? "bg-amber-200 text-amber-950 border-amber-300"
                              : "bg-red-200 text-red-900 border-red-300"
                          }`}
                        >
                          {flag.badgeText}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 mt-1 font-medium leading-normal">
                        {flag.subtext}
                      </p>
                      <div className="mt-2.5 text-xs font-mono text-slate-500 flex items-center justify-between pt-2 border-t border-slate-200/60">
                        <span className="font-semibold">{flag.detail}</span>
                        <span
                          className={`font-bold ${
                            isHigh
                              ? "text-red-700"
                              : isWarning
                              ? "text-amber-700"
                              : "text-red-700"
                          }`}
                        >
                          #{flag.id}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SUGGESTED NEXT BEST ACTION CARD */}
        <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50/50 rounded-xl p-4.5 border-2 border-blue-600/30 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-blue-600" />
              <span className="text-xs font-mono font-bold text-blue-900 uppercase tracking-wide">
                Suggested Next Best Action
              </span>
            </div>
            <span className="text-xs font-mono bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded border border-blue-300">
              98% Match
            </span>
          </div>

          <p className="text-sm text-slate-800 leading-relaxed font-semibold mb-4">
            Apologize for the app timeout and instantly launch the Assisted Dispute Workflow.
          </p>

          {/* PRIMARY CTA BUTTON */}
          <button
            onClick={onLaunchWorkflow}
            className="w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold font-mono tracking-wider shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 border border-blue-500 transition-all transform active:scale-98 group"
          >
            <Zap className="w-4 h-4 text-white fill-white group-hover:scale-110 transition-transform" />
            <span>LAUNCH WORKFLOW</span>
            <ChevronRight className="w-4 h-4 text-white" />
          </button>

          <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-600 pt-2 border-t border-blue-200/60">
            <span>Auto-Fills Claim Form</span>
            <span>Response: &lt;5s</span>
          </div>
        </div>
      </div>
    </section>
  );
}
