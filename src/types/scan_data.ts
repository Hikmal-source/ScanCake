export interface TechPlugin {
  name: string;
  version?: string;
  stringInfo?: string;
  description?: string; // Deskripsi resmi plugin dari WhatWeb
  website?: string;     // URL website plugin
  dorks?: string | number; // Google Dorks count/query
  account?: string;
  module?: string;
  filepath?: string;
  certainty: number;
}

export interface OverviewData {
  ip: string;
  server: string;
  country: string;
  title: string;
  summary?: string;     // Summary string ala CLI WhatWeb
  bootstrap?: boolean;
  jquery?: boolean;
}

export interface ScanResultData {
  target: string;
  httpStatus: number;
  overview: OverviewData;
  emails?: string[];
  cookies?: string[];
  totalTechnologies: number;
  techStack: TechPlugin[];
  httpHeaders?: Record<string, any>; // Raw HTTP Response Headers
  rawPlugins?: Record<string, any>;
}

export interface ScanOptions {
  url: string;
  aggression?: number;
  maxThreads?: number;
  verbose?: boolean;
  userAgent?: string;
  customPlugins?: string[];
}

export interface APIResponse {
  success: boolean;
  commandExecuted?: string;
  data?: ScanResultData;
  error?: string;
}