import { execFile } from "child_process";
import { promisify } from "util";
import { ScanOptions, ScanServiceResult } from "@/types/whatweb.type";

const execFileAsync = promisify(execFile);

export class WhatWebEngineService {
  /**
   * Sanitasi URL input agar formatnya valid & konsisten
   */
  private static sanitizeUrl(rawUrl: string): string {
    let cleanUrl = rawUrl.trim();
    if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
      cleanUrl = `https://${cleanUrl}`;
    }
    return new URL(cleanUrl).href;
  }

  /**
   * Menerjemahkan opsi pengguna menjadi array flag CLI WhatWeb yang aman
   */
  private static buildArguments(options: ScanOptions): string[] {
    const args: string[] = [];

    // 1. Aggression Level (-a)
    args.push("-a", `${options.aggression || 1}`);

    // 2. Output Detail (-v)
    if (options.verbose) {
      args.push("-v");
    }

    // 3. Redirect Handling
    if (options.followRedirects) {
      args.push(`--follow-redirect=${options.followRedirects}`);
    }
    if (options.maxRedirects) {
      args.push(`--max-redirects=${options.maxRedirects}`);
    }

    // 4. Custom User-Agent (-U)
    // GUNAKAN USER-AGENT BROWSER ASLI SECARA DEFAULT AGAR TIDAK DI-BLOCK CLOUDFLARE/WAF
    const defaultUserAgent =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";
    const userAgent = options.userAgent?.trim() || defaultUserAgent;
    args.push("-U", userAgent);

    // 5. Custom HTTP Headers (-H)
    if (options.customHeaders) {
      Object.entries(options.customHeaders).forEach(([key, val]) => {
        args.push("-H", `${key}: ${val}`);
      });
    }

    // 6. Cookie String
    if (options.cookie) {
      args.push(`--cookie=${options.cookie}`);
    }

    // 7. HTTP Method & POST Data
    if (options.httpMethod) {
      args.push(`--http-method=${options.httpMethod}`);
    }
    if (options.postData) {
      args.push(`--post-data=${options.postData}`);
    }

    // 8. Authentication & Proxy
    if (options.httpAuth) {
      args.push("-u", options.httpAuth);
    }
    if (options.proxy) {
      args.push("--proxy", options.proxy);
    }

    // 9. Performance & Timing (-t)
    if (options.maxThreads) {
      args.push("-t", `${options.maxThreads}`);
    }
    if (options.waitDelay) {
      args.push(`--wait=${options.waitDelay}`);
    }

    // 10. Plugin Filters (Hanya tambahkan jika customPlugins benar-benar diisi array tidak kosong)
    if (options.customPlugins && options.customPlugins.length > 0) {
      args.push(`--plugins=${options.customPlugins.join(",")}`);
    }

    // 11. Error Tolerance (Bypass SSL / WAF)
    if (options.ignoreSslErrors) {
      args.push("--no-errors");
    }

    // Flag Wajib Backend (Ekstrak Output JSON Murni)
    args.push("--log-json=-");
    args.push("--color=never");

    // Target URL di bagian paling akhir
    args.push(this.sanitizeUrl(options.url));

    return args;
  }

  /**
   * Fungsi Penanganan Error Eksekusi (WAF, Network Block, & Ruby Stream Issues)
   */
  private static handleExecutionError(error: any): string {
    const stdout = error.stdout || "";
    const stderr = error.stderr || "";
    const message = error.message || "";

    // 1. Jika ada JSON yang sempat tercetak di stdout sebelum diblokir/crash, selamatkan datanya!
    if (stdout.includes("[") || stdout.includes("{")) {
      return stdout;
    }

    // 2. Analisis deteksi blokir WAF / Firewall / Network Error
    const isWafOrBlocked =
      stderr.includes("403 Forbidden") ||
      stderr.includes("406 Not Acceptable") ||
      stderr.includes("Connection reset by peer") ||
      stderr.includes("Cloudflare") ||
      message.includes("Command failed");

    if (isWafOrBlocked) {
      console.warn("[WhatWeb Engine] Target terdeteksi memblokir scan / WAF active:", stderr || message);
      throw new Error(
        "Target memblokir koneksi scan (Terdeteksi WAF/Firewall 403/Reset). Coba pakai User-Agent Chrome dan gunakan Aggression Level 1."
      );
    }

    // 3. Error tak terduga lainnya
    console.error("[WhatWebEngineService Execution Error]:", error);
    throw new Error(`Gagal mengeksekusi WhatWeb: ${stderr.trim() || message}`);
  }

  public static async executeScan(options: ScanOptions): Promise<ScanServiceResult> {
    const args = this.buildArguments(options);

    const commandExecuted = `whatweb ${args
      .map((arg) => (arg.includes(" ") ? `"${arg}"` : arg))
      .join(" ")}`;

    let stdoutData = "";

    try {
      const { stdout } = await execFileAsync("whatweb", args, {
        timeout: 90000,
        maxBuffer: 1024 * 1024 * 15, // Buffer 15MB
      });
      stdoutData = stdout;
    } catch (error: any) {
      stdoutData = this.handleExecutionError(error);
    }

    try {
      // 1. Hapus kode warna terminal ANSI
      let cleanStdout = stdoutData.replace(/\u001b\[[0-9;]*m/g, "").trim();        // 2. Ekstrak blok JSON antara '[' dan ']'       const jsonStartIndex = cleanStdout.indexOf("[");       const jsonEndIndex = cleanStdout.lastIndexOf("]");        if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {         cleanStdout = cleanStdout.substring(jsonStartIndex, jsonEndIndex + 1);       }        // 3. Pembersihan karakter kontrol non-printable ASCII       cleanStdout = cleanStdout         .replace(/[\u0000-\u001F\u007F-\u009F]/g, (match) => {           if (match === "\n" \vert{}\vert{} match === "\r" \vert{}\vert{} match === "\t") return match;           return "";         })         .replace(/,\s*([\]}])/g, "$1"); // Hapus trailing comma

      let parsedRawData: any[];

      // 4. Standar JSON.parse dengan Fallback NDJSON Mode
      try {
        parsedRawData = JSON.parse(cleanStdout);
      } catch (parseErr) {
        const lines = cleanStdout
          .split("\n")
          .filter((line) => line.trim().startsWith("{"));

        if (lines.length > 0) {
          parsedRawData = lines.map((line) =>
            JSON.parse(line.trim().replace(/,$/, ""))
          );
        } else {
          throw parseErr;
        }
      }

      return {
        commandExecuted,
        rawData: parsedRawData,
      };
    } catch (parseError: any) {
      console.error("[WhatWebEngineService Parsing Error]:", parseError);
      throw new Error(`Gagal memparsing output JSON dari WhatWeb: ${parseError.message}`);
    }
  }
}