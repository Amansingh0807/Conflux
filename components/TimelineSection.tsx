"use client";

import React from "react";
import { ChevronRight, Terminal } from "lucide-react";
import { TimelineEvent, ChannelType } from "@/types/dashboard";

interface Props {
  events: TimelineEvent[];
  activeFilter: ChannelType;
  setActiveFilter: (filter: ChannelType) => void;
  selectedNode: string | null;
  setSelectedNode: (id: string) => void;
}

export function TimelineSection({
  events,
  activeFilter,
  setActiveFilter,
  selectedNode,
  setSelectedNode,
}: Props) {
  const filteredEvents = events.filter((event) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "web") return event.channel === "web";
    if (activeFilter === "app") return event.channel === "app";
    if (activeFilter === "phone") return event.channel === "phone";
    if (activeFilter === "error") return event.isError;
    return true;
  });

  const selectedEventData =
    events.find((e) => e.id === selectedNode) || events[3];

  return (
    <section className="lg:col-span-6 flex flex-col gap-5">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex-1 flex flex-col">
        {/* TIMELINE HEADER & FILTER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Unified Cross-Channel Journey
              </h2>
              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-blue-100 text-blue-800 border border-blue-300">
                Real-time Stitched
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              Chronological event graph combining Web, Mobile App, and Contact Center telemetry
            </p>
          </div>

          {/* FILTER BUTTONS */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-lg border border-slate-200 overflow-x-auto">
            {(["all", "web", "app", "phone", "error"] as ChannelType[]).map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded text-xs font-mono capitalize font-medium transition-all ${
                    activeFilter === filter
                      ? "bg-blue-600 text-white font-bold shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                  }`}
                >
                  {filter}
                </button>
              )
            )}
          </div>
        </div>

        {/* VERTICAL TIMELINE CONTAINER */}
        <div className="relative pl-6 sm:pl-8 space-y-6 flex-1 my-2">
          {/* CONTINUOUS VERTICAL CONNECTING LINE */}
          <div className="absolute left-[23px] sm:left-[31px] top-3 bottom-8 w-[3px] bg-gradient-to-b from-blue-500 via-red-500 to-emerald-500 opacity-40"></div>

          {filteredEvents.map((event) => {
            const IconComponent = event.icon;
            const isSelected = selectedNode === event.id;

            return (
              <div
                key={event.id}
                onClick={() => setSelectedNode(event.id)}
                className="relative flex items-start gap-4 cursor-pointer group transition-all duration-200"
              >
                {/* NODE ICON BADGE */}
                <div className="relative z-10">
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      event.isError
                        ? "bg-red-100 border-red-600 text-red-600 shadow-md shadow-red-500/20"
                        : event.isActive
                        ? "bg-blue-100 border-blue-600 text-blue-700 shadow-md shadow-blue-500/20"
                        : isSelected
                        ? "bg-blue-50 border-blue-600 text-blue-700 shadow-sm"
                        : "bg-slate-100 border-slate-300 text-slate-600 group-hover:border-blue-500 group-hover:text-blue-600"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* ACTIVE STATE PULSE RING FOR NODE 5 */}
                  {event.isActive && (
                    <span className="absolute -inset-1 rounded-full border-2 border-blue-500 animate-ping pointer-events-none opacity-50"></span>
                  )}
                </div>

                {/* EVENT CONTENT CARD */}
                <div
                  className={`flex-1 rounded-xl p-4 transition-all duration-200 border ${
                    event.isError
                      ? "bg-red-50/90 border-red-300 shadow-md shadow-red-500/10"
                      : event.isActive
                      ? "bg-blue-50/90 border-blue-300 shadow-md shadow-blue-500/10"
                      : isSelected
                      ? "bg-slate-50 border-blue-400 shadow-sm"
                      : "bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-100/80"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`text-xs font-mono font-bold px-2.5 py-1 rounded ${
                          event.isError
                            ? "bg-red-200 text-red-900 border border-red-300"
                            : event.isActive
                            ? "bg-blue-200 text-blue-900 border border-blue-300"
                            : "bg-slate-200 text-slate-800"
                        }`}
                      >
                        {event.time}
                      </span>
                      <h3
                        className={`text-base font-bold tracking-tight ${
                          event.isError
                            ? "text-red-900"
                            : event.isActive
                            ? "text-blue-900"
                            : "text-slate-900"
                        }`}
                      >
                        {event.title}
                      </h3>
                    </div>

                    {/* STATUS TAGS */}
                    {event.isError && (
                      <span className="text-xs font-mono uppercase tracking-wider font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded border border-red-300">
                        HTTP 503 Gateway Timeout
                      </span>
                    )}
                    {event.isActive && (
                      <span className="text-xs font-mono uppercase tracking-wider font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded border border-blue-300 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                        Current Active State
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {event.description}
                  </p>

                  {/* QUICK METADATA BADGES */}
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-600">
                    {event.metadata.amount && (
                      <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 font-bold border border-amber-300">
                        Amount: {event.metadata.amount}
                      </span>
                    )}
                    {event.metadata.sessionId && (
                      <span className="px-2.5 py-1 rounded bg-slate-200/80 text-slate-800 font-medium border border-slate-300">
                        {event.metadata.sessionId}
                      </span>
                    )}
                    <span className="text-blue-700 font-semibold text-xs ml-auto flex items-center gap-1 group-hover:underline">
                      Inspect Payload <ChevronRight className="w-3.5 h-3.5 inline" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* DETAILED INSPECTION DRAWER FOR SELECTED NODE */}
        {selectedEventData && (
          <div className="mt-6 pt-4 border-t border-slate-200 bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4.5 h-4.5 text-blue-600" />
                <span className="text-xs font-mono font-bold text-slate-900 uppercase">
                  Payload Telemetry: {selectedEventData.id} ({selectedEventData.time})
                </span>
              </div>
              <span className="text-xs font-mono text-slate-600 bg-white px-2.5 py-0.5 rounded border border-slate-300">
                Trace ID: #TRC-9920148-AMEX
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 font-mono text-xs">
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                  IP Location
                </span>
                <span className="text-slate-900 font-semibold">
                  {selectedEventData.metadata.ip || "N/A"}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                  Device Engine
                </span>
                <span className="text-slate-900 font-semibold truncate block">
                  {selectedEventData.metadata.device || "N/A"}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                  Endpoint API
                </span>
                <span className="text-blue-700 font-bold truncate block">
                  {selectedEventData.metadata.endpoint || "N/A"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
