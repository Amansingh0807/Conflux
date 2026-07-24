"use client";

import React from "react";
import { UserCheck, Activity, ShieldAlert, ShieldCheck, CheckCircle2 } from "lucide-react";
import { CustomerData } from "@/types/dashboard";

interface Props {
  customer: CustomerData;
}

export function CustomerProfileSidebar({ customer }: Props) {
  return (
    <section className="lg:col-span-3 flex flex-col gap-5">
      {/* PROFILE CARD */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm relative overflow-hidden">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-xl shadow-inner">
              RK
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {customer.name}
              </h2>
              <p className="text-sm text-slate-600 font-medium flex items-center gap-1.5 mt-0.5">
                <UserCheck className="w-4 h-4 text-blue-600 inline" />
                Member Since {customer.memberSince}
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded text-xs font-mono uppercase tracking-wider font-bold bg-blue-100 text-blue-800 border border-blue-300">
            {customer.tier}
          </span>
        </div>

        {/* ACCOUNT METRICS */}
        <div className="grid grid-cols-2 gap-3 text-sm mb-5">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 block text-xs uppercase font-medium">
              Account Ref
            </span>
            <span className="text-slate-900 font-bold font-mono text-sm">
              {customer.accountRef}
            </span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 block text-xs uppercase font-medium">
              Credit Limit
            </span>
            <span className="text-blue-700 font-bold font-mono text-sm">
              {customer.creditLimit}
            </span>
          </div>
        </div>

        {/* FRICTION SCORE (LIGHT MODE RADIAL GAUGE) */}
        <div className="mb-5 bg-red-50/60 p-4 rounded-xl border border-red-200 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-red-600" />
              Friction Index
            </span>
            <span className="text-xs font-mono text-red-700 font-bold bg-red-100 px-2.5 py-1 rounded border border-red-300">
              Critical 90%
            </span>
          </div>

          <div className="flex items-center gap-4 my-2">
            {/* RADIAL SCORE DISPLAY */}
            <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 36 36"
              >
                <path
                  className="text-slate-200"
                  strokeWidth="3.8"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-red-600"
                  strokeDasharray="90, 100"
                  strokeWidth="3.8"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-extrabold text-red-700 font-mono tracking-tighter">
                  {customer.frictionScore}/10
                </span>
                <span className="text-[10px] text-slate-600 uppercase font-mono font-semibold">
                  Score
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <p className="text-xs text-slate-800 font-medium leading-relaxed">
                Severe cross-channel breakdown detected within last 30 minutes.
              </p>
              <div className="w-full bg-red-200 h-2 rounded-full overflow-hidden">
                <div className="bg-red-600 h-full w-[90%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* LARGE RED HIGH CHURN RISK BADGE (NO EMOJIS) */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-600/20 relative overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-white animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-wider uppercase font-mono text-white">
                  High Churn Risk
                </span>
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
              </div>
              <p className="text-xs text-red-100 font-medium mt-0.5">
                Probability {customer.churnRiskProb} based on failed transactions & repeat complaints.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECURITY & IDENTITY TELEMETRY */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono flex items-center justify-between">
          <span>Security & Identity</span>
          <ShieldCheck className="w-4.5 h-4.5 text-blue-600" />
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-slate-600 font-medium">Biometric Status</span>
            <span className="text-emerald-700 font-mono font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 inline text-emerald-600" />
              {customer.biometricStatus}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-slate-600 font-medium">Last NPS Score</span>
            <span className="text-red-600 font-mono font-bold">
              {customer.npsScore}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-slate-600 font-medium">Primary Channel</span>
            <span className="text-blue-700 font-mono font-semibold">
              {customer.primaryChannel}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
