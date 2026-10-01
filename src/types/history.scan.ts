export interface ScanHistoryItem {
  id: string;
  targetUrl: string;
  title: string;
  httpStatus: number;
  ip: string;
  country: string;
  server: string;
  totalTechnologies: number;
  engine: "WhatWeb" | "httpx";
  scannedAt: string;
  techSummary: string[];
}