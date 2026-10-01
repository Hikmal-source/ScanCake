export type AggressionLevel = 1 | 3 | 4;
export type RedirectOption = "never" | "always" | "same-site" | "same-domain";

export interface ScanOptions {
  url: string;
  aggression?: AggressionLevel;
  verbose?: boolean;
  followRedirects?: RedirectOption;
  maxRedirects?: number;
  userAgent?: string;
  customHeaders?: Record<string, string>;
  cookie?: string;
  httpMethod?: "GET" | "POST" | "HEAD";
  postData?: string;
  httpAuth?: string;
  proxy?: string;
  maxThreads?: number;
  waitDelay?: number;
  customPlugins?: string[];
  ignoreSslErrors?: boolean;
}

export interface ScanServiceResult {
  commandExecuted: string;
  rawData: any;
}