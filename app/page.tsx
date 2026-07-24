"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { CustomerProfileSidebar } from "@/components/CustomerProfileSidebar";
import { TimelineSection } from "@/components/TimelineSection";
import { SystemIntelligenceSidebar } from "@/components/SystemIntelligenceSidebar";
import { WorkflowModal } from "@/components/WorkflowModal";
import { Footer } from "@/components/Footer";
import { ChannelType } from "@/types/dashboard";
import {
  customerMockData,
  timelineEventsMockData,
  systemFlagsMockData,
} from "@/data/mockData";

export default function AnalystDashboard() {
  const [activeFilter, setActiveFilter] = useState<ChannelType>("all");
  const [selectedNode, setSelectedNode] = useState<string | null>("node-4");
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* TOP NAVBAR */}
      <Navbar />

      {/* DASHBOARD 3-COLUMN LAYOUT */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 p-5 max-w-[1720px] w-full mx-auto">
        {/* COLUMN 1: CUSTOMER PROFILE SIDEBAR */}
        <CustomerProfileSidebar customer={customerMockData} />

        {/* COLUMN 2: CENTER MAIN VERTICAL TIMELINE */}
        <TimelineSection
          events={timelineEventsMockData}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
        />

        {/* COLUMN 3: SYSTEM INTELLIGENCE & ACTIONS SIDEBAR */}
        <SystemIntelligenceSidebar
          flags={systemFlagsMockData}
          onLaunchWorkflow={() => setIsWorkflowModalOpen(true)}
        />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* ASSISTED DISPUTE WORKFLOW MODAL */}
      <WorkflowModal
        isOpen={isWorkflowModalOpen}
        onClose={() => setIsWorkflowModalOpen(false)}
      />
    </div>
  );
}
