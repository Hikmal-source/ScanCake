import { ParsedScanResult, TechPlugin } from "@/types/parsed_scan";

// Daftar nama plugin WhatWeb yang sebenarnya adalah Response Header HTTP
const HTTP_HEADER_PLUGINS = new Set([
  "strict-transport-security",
  "x-frame-options",
  "x-xss-protection",
  "x-content-type-options",
  "content-security-policy",
  "content-type",
  "cache-control",
  "expires",
  "pragma",
  "referrer-policy",
  "set-cookie",
  "location",
  "server",
  "via",
]);

export class WhatWebParser {
  private static extractValue(val: any): string | undefined {
    if (!val) return undefined;
    if (typeof val === "string") return val;
    if (Array.isArray(val)) {
      return val
        .map((item) => (typeof item === "object" ? JSON.stringify(item) : String(item)))
        .join(", ");
    }
    if (typeof val === "object") {
      return JSON.stringify(val);
    }
    return String(val);
  }

  public static parse(rawData: any[]): ParsedScanResult | null {
    if (!rawData || !Array.isArray(rawData) || rawData.length === 0) {
      return null;
    }

    const item = rawData[0];
    const plugins = item.plugins || {};

    // 1. Ambil Raw Headers dari JSON WhatWeb (jika ada)
    const rawHttpHeaders: Record<string, any> = { ...(item.http_headers || item.headers || {}) };

    const techStack: TechPlugin[] = [];
    const emailsSet = new Set<string>();
    const cookiesSet = new Set<string>();
    const summaryList: string[] = [];

    Object.entries(plugins).forEach(([pluginName, details]: [string, any]) => {
      const lowerName = pluginName.toLowerCase();

      // Extrak nilai string/version
      const version = this.extractValue(details.version);
      const stringVal = this.extractValue(details.string);
      const account = this.extractValue(details.account);
      const moduleVal = this.extractValue(details.module);
      const filepath = this.extractValue(details.filepath);
      const osVal = this.extractValue(details.os);
      const modelVal = this.extractValue(details.model);
      const description = details.description || undefined;
      const website = details.website || undefined;
      const dorks = details.dorks || undefined;
      const certainty = details.certainty || 100;

      // A. Jika plugin ini sebenarnya adalah HTTP Header, pindahkan ke rawHttpHeaders!
      if (HTTP_HEADER_PLUGINS.has(lowerName)) {
        const headerValue = stringVal || version || "present";
        rawHttpHeaders[pluginName] = headerValue;
        return; // Jangan masukkan ke daftar Detected Plugins!
      }

      // Susun ringkasan stringInfo
      const detailParts: string[] = [];
      if (version) detailParts.push(`Version: ${version}`);
      if (stringVal) detailParts.push(`String: ${stringVal}`);
      if (account) detailParts.push(`Account: ${account}`);
      if (moduleVal) detailParts.push(`Module: ${moduleVal}`);
      if (osVal) detailParts.push(`OS: ${osVal}`);
      if (modelVal) detailParts.push(`Model: ${modelVal}`);
      if (filepath) detailParts.push(`File: ${filepath}`);

      const stringInfo = detailParts.length > 0 ? detailParts.join(" | ") : undefined;

      if (stringInfo) {
        summaryList.push(`${pluginName}[${stringInfo}]`);
      } else {
        summaryList.push(pluginName);
      }

      // B. Tangkap Email
      if ((lowerName === "email" || lowerName === "emails") && details.string) {
        if (Array.isArray(details.string)) {
          details.string.forEach((e: string) => emailsSet.add(e));
        } else if (typeof details.string === "string") {
          emailsSet.add(details.string);
        }
      }

      // C. Tangkap Cookies
      if (lowerName === "cookies" && details.string) {
        if (Array.isArray(details.string)) {
          details.string.forEach((c: string) => cookiesSet.add(c));
        } else if (typeof details.string === "string") {
          cookiesSet.add(details.string);
        }
      }

      // Masukkan ke daftar TechStack (Plugin Sebenarnya)
      techStack.push({
        name: pluginName,
        version,
        stringInfo,
        description,
        website,
        dorks,
        account,
        module: moduleVal,
        filepath,
        certainty,
      });
    });

    // Cari Server Name
    const serverName =
      this.extractValue(plugins.HTTPServer?.string) ||
      rawHttpHeaders["Server"] ||
      rawHttpHeaders["server"] ||
      "N/A";

    return {
      target: item.target,
      httpStatus: item.http_status || 0,
      overview: {
        ip: this.extractValue(plugins.IP?.string) || "N/A",
        server: serverName,
        country: this.extractValue(plugins.Country?.string) || "N/A",
        title: this.extractValue(plugins.Title?.string) || "N/A",
        summary: summaryList.join(", "),
        bootstrap: Boolean(plugins.Bootstrap),
        jquery: Boolean(plugins.jQuery),
      },
      emails: Array.from(emailsSet),
      cookies: Array.from(cookiesSet),
      totalTechnologies: techStack.length,
      techStack,
      httpHeaders: rawHttpHeaders, // Dikirim terpisah ke UI
      rawPlugins: plugins,
    } as ParsedScanResult;
  }
}