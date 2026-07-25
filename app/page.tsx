"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { CustomerProfileSidebar } from "@/components/CustomerProfileSidebar";
import { TimelineSection } from "@/components/TimelineSection";
import { SystemIntelligenceSidebar } from "@/components/SystemIntelligenceSidebar";
import { WorkflowModal } from "@/components/WorkflowModal";
import { Footer } from "@/components/Footer";
import { ChannelType, CustomerData, TimelineEvent, SystemFlag } from "@/types/dashboard";
import {
  customerMockData,
  timelineEventsMockData,
  systemFlagsMockData,
} from "@/data/mockData";
import {
  ApiCustomerResponse,
  mapCustomerToUI,
  mapJourneyEventsToUI,
  mapSystemFlagsToUI,
} from "@/lib/apiMapper";
import { Loader2 } from "lucide-react";

export default function AnalystDashboard() {
  const [activeFilter, setActiveFilter] = useState<ChannelType>("all");
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);

  // Dynamic API State
  const [customer, setCustomer] = useState<CustomerData>(customerMockData);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(timelineEventsMockData);
  const [systemFlags, setSystemFlags] = useState<SystemFlag[]>(systemFlagsMockData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);

  // Fetch dynamic customer journey from Next.js API Route
  useEffect(() => {
    async function fetchCustomerJourney() {
      try {
        setIsLoading(true);
        // Default test customer ID seeded in database
        const res = await fetch("/api/customer/cust-rohan-kapoor-001");
        
        if (!res.ok) {
          throw new Error(`API returned HTTP ${res.status}`);
        }

        const json = await res.json();
        const data: ApiCustomerResponse = json.data;

        if (data) {
          setCustomer(mapCustomerToUI(data));
          const uiEvents = mapJourneyEventsToUI(data.journeyEvents);
          setTimelineEvents(uiEvents);
          setSystemFlags(mapSystemFlagsToUI(data.systemFlags));

          // Auto-select error node if available
          const errorNode = uiEvents.find((e) => e.isError);
          if (errorNode) {
            setSelectedNode(errorNode.id);
          } else if (uiEvents.length > 0) {
            setSelectedNode(uiEvents[0].id);
          }
        }
      } catch (err: any) {
        console.warn("Using fallback local data due to API notice:", err.message);
        setApiError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCustomerJourney();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* TOP NAVBAR */}
      <Navbar />

      {/* API STATUS NOTICE BANNER IF LOADING */}
      {isLoading && (
        <div className="bg-blue-50 border-b border-blue-200 px-6 py-2 flex items-center justify-center gap-2 text-xs font-mono text-blue-700">
          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
          <span>Fetching live customer telemetry from /api/customer/cust-rohan-kapoor-001...</span>
        </div>
      )}

      {/* DASHBOARD 3-COLUMN LAYOUT */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 p-5 max-w-[1720px] w-full mx-auto">
        {/* COLUMN 1: CUSTOMER PROFILE SIDEBAR */}
        <CustomerProfileSidebar customer={customer} />

        {/* COLUMN 2: CENTER MAIN VERTICAL TIMELINE */}
        <TimelineSection
          events={timelineEvents}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
        />

        {/* COLUMN 3: SYSTEM INTELLIGENCE & ACTIONS SIDEBAR */}
        <SystemIntelligenceSidebar
          flags={systemFlags}
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
