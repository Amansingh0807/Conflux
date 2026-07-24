"use client";

import React, { useState } from "react";
import { Zap, Check, ChevronRight } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function WorkflowModal({ isOpen, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-xl p-6 max-w-lg w-full shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-mono uppercase">
                Assisted Dispute Workflow
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Incident #INC-503-GATEWAY
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900 text-xs font-mono px-2.5 py-1.5 rounded bg-slate-100 border border-slate-200"
          >
            Esc
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 font-mono">
              Dispute Workflow Initialized!
            </h4>
            <p className="text-sm text-slate-600 max-w-xs mx-auto font-mono">
              Claim ID #DISP-99403 created. Refund hold released for ₹50,000. Customer SMS dispatch triggered.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm space-y-2.5 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Target Customer:</span>
                <span className="text-slate-900 font-bold">
                  Aman Singh (AX-884920-IN)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Failed Amount:</span>
                <span className="text-amber-700 font-bold">₹50,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Root Cause:</span>
                <span className="text-red-600 font-bold">
                  HTTP 503 Gateway Timeout at 09:17 AM
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Resolution Action:</span>
                <span className="text-blue-700 font-bold">
                  Instant Refund & Waiver Override
                </span>
              </div>
            </div>

            <div className="bg-blue-50 p-3.5 rounded-lg border border-blue-200 text-xs text-blue-900 leading-relaxed font-medium">
              <p>
                <strong>Suggested Agent Script:</strong> "Mr. Singh, I can see that your ₹50,000 transaction encountered a brief 503 server timeout at 9:17 AM on our iOS app. I have already initiated the auto-reversal workflow."
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-mono font-bold text-slate-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold font-mono tracking-wider shadow-md shadow-blue-600/20 border border-blue-500 transition flex items-center justify-center gap-2"
              >
                <span>Execute Workflow</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
