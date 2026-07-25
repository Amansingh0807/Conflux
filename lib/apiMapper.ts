import React from "react";
import {
  Globe,
  ShoppingBag,
  Smartphone,
  AlertTriangle,
  PhoneIncoming,
  XCircle,
  Clock,
} from "lucide-react";
import { TimelineEvent, CustomerData, SystemFlag as UISystemFlag } from "@/types/dashboard";

export interface ApiCustomerResponse {
  id: string;
  name: string;
  memberSince: number;
  frictionScore: number;
  churnRisk: boolean;
  accountRef: string;
  creditLimit: string;
  tier: string;
  journeyEvents: Array<{
    id: string;
    timestamp: string;
    channel: "WEB" | "APP" | "CALL";
    action: string;
    description: string;
    isError: boolean;
    isActive: boolean;
    ip?: string | null;
    device?: string | null;
    sessionId?: string | null;
    endpoint?: string | null;
    amount?: string | null;
    httpStatus?: string | null;
  }>;
  systemFlags: Array<{
    id: string;
    type: "DROPOFF" | "ESCALATION" | "UNRESOLVED";
    title: string;
    subtext: string;
    badgeText?: string | null;
    detail?: string | null;
  }>;
}

export function mapCustomerToUI(apiData: ApiCustomerResponse): CustomerData {
  return {
    name: apiData.name,
    memberSince: apiData.memberSince,
    tier: apiData.tier || "PLATINUM",
    accountRef: apiData.accountRef || "AX-884920-IN",
    creditLimit: apiData.creditLimit || "₹15,00,000",
    frictionScore: apiData.frictionScore,
    churnRiskProb: apiData.churnRisk ? "94.2%" : "12.0%",
    npsScore: "2 / 10 (Detractor)",
    biometricStatus: "Verified iOS FaceID",
    primaryChannel: "iOS Banking App",
  };
}

export function mapJourneyEventsToUI(
  events: ApiCustomerResponse["journeyEvents"]
): TimelineEvent[] {
  return events.map((event) => {
    let icon: React.ElementType = Globe;
    let channelType: "web" | "app" | "phone" | "error" = "web";

    if (event.isError) {
      icon = AlertTriangle;
      channelType = "error";
    } else if (event.channel === "APP") {
      icon = event.action.includes("Checkout") ? ShoppingBag : Smartphone;
      channelType = "app";
    } else if (event.channel === "CALL") {
      icon = PhoneIncoming;
      channelType = "phone";
    } else if (event.action.includes("Checkout")) {
      icon = ShoppingBag;
    }

    return {
      id: event.id,
      time: event.timestamp,
      channel: channelType,
      title: event.action,
      description: event.description,
      icon,
      isError: event.isError,
      isActive: event.isActive,
      metadata: {
        ip: event.ip || undefined,
        device: event.device || undefined,
        sessionId: event.sessionId || undefined,
        endpoint: event.endpoint || undefined,
        amount: event.amount || undefined,
        httpStatus: event.httpStatus || undefined,
      },
    };
  });
}

export function mapSystemFlagsToUI(
  flags: ApiCustomerResponse["systemFlags"]
): UISystemFlag[] {
  return flags.map((flag) => {
    let icon: React.ElementType = XCircle;
    let severity: "high" | "warning" | "overdue" = "high";

    if (flag.type === "ESCALATION") {
      icon = AlertTriangle;
      severity = "warning";
    } else if (flag.type === "UNRESOLVED") {
      icon = Clock;
      severity = "overdue";
    }

    return {
      id: flag.id,
      title: flag.title,
      subtext: flag.subtext,
      severity,
      badgeText: flag.badgeText || (flag.type === "ESCALATION" ? "WARN" : "HIGH"),
      detail: flag.detail || "",
      icon,
    };
  });
}
