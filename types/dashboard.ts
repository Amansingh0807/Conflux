import React from "react";

export type ChannelType = "all" | "web" | "app" | "phone" | "error";

export interface EventMetadata {
  ip?: string;
  device?: string;
  sessionId?: string;
  endpoint?: string;
  httpStatus?: string;
  amount?: string;
}

export interface TimelineEvent {
  id: string;
  time: string;
  channel: "web" | "app" | "phone" | "error";
  title: string;
  description: string;
  icon: React.ElementType;
  isError?: boolean;
  isActive?: boolean;
  metadata: EventMetadata;
}

export interface SystemFlag {
  id: string;
  title: string;
  subtext: string;
  severity: "high" | "warning" | "overdue";
  badgeText: string;
  detail: string;
  icon: React.ElementType;
}

export interface CustomerData {
  name: string;
  memberSince: number;
  tier: string;
  accountRef: string;
  creditLimit: string;
  frictionScore: number;
  churnRiskProb: string;
  npsScore: string;
  biometricStatus: string;
  primaryChannel: string;
}
