export interface TechPlugin {
  name: string;
  version?: string;
  stringInfo?: string;
  description?: string;
  website?: string;
  dorks?: string | number;
  account?: string;
  module?: string;
  filepath?: string;
  certainty: number;
}

export interface ParsedScanResult {
  target: string;
  httpStatus: number;
  overview: {
    ip: string;
    server: string;
    country: string;
    title: string;
    summary?: string;
    bootstrap: boolean;
    jquery: boolean;
  };
  emails: string[];
  cookies: string[];
  totalTechnologies: number;
  techStack: TechPlugin[];
  httpHeaders?: Record<string, any>;
  rawPlugins: Record<string, any>;
}