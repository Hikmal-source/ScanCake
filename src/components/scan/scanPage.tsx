"use client";

import React, { useState, useEffect } from "react";
import { useScan } from "@/hooks/useScan";
import { TechPlugin } from "@/types/parsed_scan";
import { HistoryStorage } from "@/utils/localStorage";
import {
  Sparkles,
  Globe,
  Mail,
  Cookie,
  Cpu,
  CheckCircle2,
  Sliders,
  ChevronDown,
  ChevronUp,
  Zap,
  ShieldCheck,
  Layers,
  AlertTriangle,
  Server,
  MapPin,
  ExternalLink,
  Terminal,
  FileText,
  Search,
} from "lucide-react";

export default function ScanPage() {
  const [url, setUrl] = useState<string>("");
  const [selectedPreset, setSelectedPreset] = useState<string>("auto");

  // Custom Controls State
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [aggression, setAggression] = useState<number>(1);
  const [maxThreads, setMaxThreads] = useState<number | "">(15);
  const [verbose, setVerbose] = useState<boolean>(true);
  const [userAgent, setUserAgent] = useState<string>("");
  const [showRawHeaders, setShowRawHeaders] = useState<boolean>(false);

  const { executeScan, isLoading, error, result } = useScan();

  // 👈 2. OTOMATIS SIMPAN KE HISTORY KETIKA SCAN SELESAI & DAPAET RESULT
  useEffect(() => {
    if (result && !isLoading) {
      const techList =
        result.techStack?.map((t: TechPlugin) => t.name) || [];

      HistoryStorage.save({
        targetUrl: result.target || url,
        title:
          result.overview?.title && result.overview.title !== "N/A"
            ? result.overview.title
            : result.target || url,
        httpStatus: result.httpStatus || 200,
        ip: result.overview?.ip || "N/A",
        country: result.overview?.country || "N/A",
        server: result.overview?.server || "N/A",
        totalTechnologies:
          result.techStack?.length || result.totalTechnologies || 0,
        engine: "WhatWeb",
        techSummary: techList,
      });
    }
  }, [result, isLoading]);

  const presets = [
    {
      id: "auto",
      name: "⚡ Full Auto Scan",
      desc: "Menjalankan seluruh 1800+ plugin standar WhatWeb",
      aggression: 1,
    },
    {
      id: "cms",
      name: "🧁 Deep CMS & Framework",
      desc: "Scan agresif untuk deteksi WordPress, Laravel, React, dll.",
      aggression: 3,
    },
    {
      id: "security",
      name: "🔒 Security & Header Audit",
      desc: "Audit cepat untuk Server, Cookie, & Security Headers",
      aggression: 1,
    },
    {
      id: "heavy",
      name: "🍩 Heavy Reconnaissance",
      desc: "Pemindaian tingkat tinggi mendalam (Aggression Level 4)",
      aggression: 4,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    const activePreset = presets.find((p) => p.id === selectedPreset);
    const finalAggression = showAdvanced
      ? Number(aggression)
      : activePreset?.aggression || 1;

    executeScan({
      url,
      aggression: finalAggression,
      maxThreads: maxThreads === "" ? 15 : Number(maxThreads),
      verbose,
      userAgent: userAgent.trim() || undefined,
    });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. DASHBOARD PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-soft-pink/30 border border-soft-pink/50 text-strawberry px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            ScanCake Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-chocolate tracking-tight">
            Web Technology Inspector
          </h1>
          <p className="text-chocolate/60 text-xs sm:text-sm font-medium">
            Pindai dan analisa stack teknologi web target secara terstruktur.
          </p>
        </div>

        {/* Quick Stat Pill */}
        {result && (
          <div className="flex items-center gap-3 bg-white/80 border border-soft-pink/40 p-3 rounded-2xl shadow-xs">
            <div className="p-2 bg-strawberry/10 rounded-xl text-strawberry">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-extrabold uppercase text-chocolate/50">
                Total Plugins
              </div>
              <div className="text-sm font-black text-chocolate">
                {result.techStack?.length || result.totalTechnologies || 0}{" "}
                Terdeteksi
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. SCANNER INPUT CARD */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-soft-pink/40 shadow-sm space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-chocolate/40">
                <Globe className="w-5 h-5" />
              </div>
              <input
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-cream/30 border-2 border-soft-pink/50 text-chocolate font-medium placeholder:text-chocolate/40 focus:outline-none focus:border-strawberry focus:bg-white transition shadow-xs text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 bg-chocolate hover:bg-chocolate/90 text-white font-bold px-7 py-3.5 rounded-2xl shadow-md shadow-chocolate/10 hover:shadow-lg transition active:scale-95 disabled:opacity-50 cursor-pointer text-sm"
            >
              <Search className="w-4 h-4 text-strawberry" />
              <span>{isLoading ? "Scanning..." : "Mulai Pemindaian"}</span>
            </button>
          </div>

          {/* PRESET SELECTOR CARDS */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-chocolate/60 pl-1">
              Pilih Mode Scan:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setSelectedPreset(preset.id);
                    setAggression(preset.aggression);
                  }}
                  className={`p-3.5 text-left rounded-2xl border-2 transition-all cursor-pointer ${selectedPreset === preset.id
                    ? "bg-soft-pink/20 border-strawberry shadow-xs"
                    : "bg-cream/20 border-soft-pink/30 hover:bg-soft-pink/10 hover:border-soft-pink"
                    }`}
                >
                  <div className="font-bold text-xs text-chocolate">
                    {preset.name}
                  </div>
                  <div className="text-[11px] text-chocolate/60 font-medium leading-snug mt-1">
                    {preset.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ADVANCED OPTIONS TOGGLE */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-strawberry hover:text-chocolate transition cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>
                {showAdvanced
                  ? "Sembunyikan Opsi Lanjutan"
                  : "Pengaturan Lanjutan (Aggression, Threads, User-Agent)"}
              </span>
              {showAdvanced ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            {/* ADVANCED OPTIONS PANEL */}
            {showAdvanced && (
              <div className="mt-4 p-5 bg-cream/30 rounded-2xl border border-soft-pink/40 space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Aggression Dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-chocolate flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-strawberry" />{" "}
                        Aggression Level
                      </span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-strawberry/10 text-strawberry border border-strawberry/20">
                        Level {aggression}
                      </span>
                    </label>

                    <div className="relative">
                      <select
                        value={aggression}
                        onChange={(e) => setAggression(Number(e.target.value))}
                        className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-white border border-soft-pink/60 text-chocolate text-xs font-bold appearance-none cursor-pointer focus:outline-none focus:border-strawberry transition shadow-xs"
                      >
                        <option value={1}>
                          🟢 Level 1 — Stealth (Pasif, Aman & Cepat)
                        </option>
                        <option value={3}>
                          🟡 Level 3 — Aggressive (Cek Path & Robots.txt)
                        </option>
                        <option value={4}>
                          🔴 Level 4 — Heavy (Pemindaian Mendalam)
                        </option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-chocolate/50 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Max Threads */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-chocolate flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-strawberry" /> Max
                      Threads
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={maxThreads}
                      onChange={(e) => {
                        const val = e.target.value;
                        setMaxThreads(
                          val === "" ? "" : Math.max(1, Number(val))
                        );
                      }}
                      placeholder="Contoh: 15"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-soft-pink/60 text-chocolate text-xs font-bold focus:outline-none focus:border-strawberry transition shadow-xs"
                    />
                  </div>
                </div>

                {/* User Agent */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-chocolate flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-strawberry" />{" "}
                    Custom User-Agent
                  </label>
                  <input
                    type="text"
                    value={userAgent}
                    onChange={(e) => setUserAgent(e.target.value)}
                    placeholder="Mozilla/5.0 (Windows NT 10.0; Win64; x64)..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-soft-pink/60 text-chocolate text-xs font-medium focus:outline-none focus:border-strawberry transition shadow-xs"
                  />
                </div>

                {/* Verbose Option */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="verbose"
                    checked={verbose}
                    onChange={(e) => setVerbose(e.target.checked)}
                    className="w-4 h-4 accent-strawberry rounded cursor-pointer"
                  />
                  <label
                    htmlFor="verbose"
                    className="text-xs font-bold text-chocolate cursor-pointer select-none"
                  >
                    Aktifkan Verbose Output (`-v`) untuk detail ekstra
                  </label>
                </div>
              </div>
            )}
          </div>
        </form>

        {/* ERROR STATE */}
        {error && (
          <div className="p-4 rounded-2xl bg-strawberry/10 border border-strawberry/30 text-strawberry text-xs font-semibold flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* LOADING STATE */}
        {isLoading && (
          <div className="text-center py-10 bg-cream/20 rounded-2xl border border-soft-pink/30">
            <div className="relative w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <div className="absolute inset-0 bg-strawberry/20 rounded-full animate-ping" />
              <img
                src="/icon_cake.webp"
                alt="SecLens Mascot"
                className="w-8 h-8 object-contain filter drop-shadow-xs"
              />
            </div>
            <p className="text-sm font-bold text-chocolate">
              Sedang menganalisa teknologi target...
            </p>
            <p className="text-[11px] text-chocolate/50 mt-0.5">
              Harap tunggu, WhatWeb sedang berjalan di latar belakang.
            </p>
          </div>
        )}
      </div>

      {/* 3. HASIL SCAN / RESULTS SECTION */}
      {result && (
        <div className="space-y-6 animate-fadeIn">
          {/* Target Title & Status Bar */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-soft-pink/40 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-chocolate/40">
                {result.overview?.title && result.overview.title !== "N/A"
                  ? result.overview.title
                  : "Target Domain"}
              </div>
              <h2 className="text-xl font-black text-chocolate break-all flex items-center gap-2 mt-0.5">
                {result.target}
                <a
                  href={result.target}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-strawberry/70 hover:text-strawberry transition"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </h2>
            </div>

            <span
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold border ${result.httpStatus >= 200 && result.httpStatus < 300
                ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                : "bg-amber-100 text-amber-800 border-amber-200"
                }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              HTTP Status: {result.httpStatus}
            </span>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white/80 rounded-2xl border border-soft-pink/40 flex items-center gap-3 shadow-xs">
              <div className="p-2.5 bg-soft-pink/30 rounded-xl text-strawberry">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-chocolate/50 uppercase tracking-wider">
                  IP & Negara
                </div>
                <div className="text-xs font-black text-chocolate mt-0.5">
                  {result.overview?.ip || "N/A"} (
                  {result.overview?.country || "N/A"})
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/80 rounded-2xl border border-soft-pink/40 flex items-center gap-3 shadow-xs">
              <div className="p-2.5 bg-soft-pink/30 rounded-xl text-strawberry">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-chocolate/50 uppercase tracking-wider">
                  Web Server
                </div>
                <div className="text-xs font-black text-chocolate mt-0.5">
                  {result.overview?.server || "N/A"}
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/80 rounded-2xl border border-soft-pink/40 flex items-center gap-3 shadow-xs sm:col-span-2 lg:col-span-1">
              <div className="p-2.5 bg-soft-pink/30 rounded-xl text-strawberry">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-chocolate/50 uppercase tracking-wider">
                  Total Plugins
                </div>
                <div className="text-xs font-black text-chocolate mt-0.5">
                  {result.techStack?.length || result.totalTechnologies || 0}{" "}
                  Modul Aktif
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Summary Line */}
          {result.overview?.summary && (
            <div className="p-4 bg-chocolate/5 border border-chocolate/10 rounded-2xl space-y-1.5">
              <div className="text-xs font-black text-chocolate uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4 text-strawberry" /> CLI Summary
                Line:
              </div>
              <div className="text-xs font-mono text-chocolate/90 leading-relaxed bg-white/80 p-3 rounded-xl border border-soft-pink/30 break-all">
                {result.overview.summary}
              </div>
            </div>
          )}

          {/* Email & Cookie Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email Section */}
            {result.emails && result.emails.length > 0 && (
              <div className="p-4 bg-strawberry/10 border border-strawberry/20 rounded-2xl space-y-2">
                <div className="text-xs font-extrabold text-strawberry flex items-center gap-2 uppercase tracking-wider">
                  <Mail className="w-4 h-4" />
                  <span>Email Terdeteksi ({result.emails.length})</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.emails.map((email: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono font-bold px-2.5 py-1 bg-white text-chocolate rounded-lg border border-strawberry/20 break-all"
                    >
                      {email}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Cookies Section */}
            {result.cookies && result.cookies.length > 0 && (
              <div className="p-4 bg-soft-pink/20 border border-soft-pink/40 rounded-2xl space-y-2">
                <div className="text-xs font-extrabold text-chocolate flex items-center gap-2 uppercase tracking-wider">
                  <Cookie className="w-4 h-4 text-strawberry" />
                  <span>Cookies Terdeteksi ({result.cookies.length})</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.cookies.map((cookie: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono font-semibold px-2.5 py-1 bg-white/80 text-chocolate rounded-lg border border-soft-pink/50 break-all"
                    >
                      {cookie}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* DETECTED PLUGINS GRID */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-chocolate flex items-center gap-2">
                <Cpu className="w-4 h-4 text-strawberry" />
                Detected Technologies
              </h3>
              <span className="text-[10px] font-extrabold px-2.5 py-1 bg-soft-pink/30 text-chocolate rounded-full border border-soft-pink/50">
                WhatWeb Engine
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.techStack && result.techStack.length > 0 ? (
                result.techStack.map((tech: TechPlugin, idx: number) => (
                  <div
                    key={idx}
                    className="p-5 bg-white/80 hover:bg-white rounded-2xl border border-soft-pink/40 transition shadow-xs flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 border-b border-soft-pink/30 pb-2">
                        <span className="font-black text-chocolate text-sm tracking-wide">
                          [ <span className="text-strawberry">{tech.name}</span>{" "}
                          ]
                        </span>
                        {tech.certainty !== undefined && (
                          <span className="text-[9px] font-black px-2 py-0.5 bg-strawberry/10 text-strawberry rounded-full border border-strawberry/20">
                            {tech.certainty}% match
                          </span>
                        )}
                      </div>

                      {tech.description && (
                        <p className="text-xs text-chocolate/70 leading-relaxed italic line-clamp-2">
                          {tech.description}
                        </p>
                      )}

                      {tech.stringInfo ? (
                        <div className="bg-cream/30 p-2.5 rounded-xl border border-soft-pink/30 font-mono text-xs text-chocolate space-y-1">
                          {tech.stringInfo
                            .split(" | ")
                            .map((info: string, i: number) => (
                              <div
                                key={i}
                                className="flex items-center gap-1.5 truncate"
                              >
                                <span className="text-strawberry font-bold">
                                  •
                                </span>
                                <span className="truncate">{info}</span>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div className="text-[10px] text-chocolate/40 italic">
                          Tidak ada detail versi khusus.
                        </div>
                      )}
                    </div>

                    {(tech.website || tech.dorks) && (
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-2 border-t border-soft-pink/20">
                        {tech.website && (
                          <a
                            href={tech.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-strawberry hover:underline font-semibold truncate max-w-[200px]"
                          >
                            <span className="truncate">{tech.website}</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        )}
                        {tech.dorks && (
                          <span className="bg-strawberry/10 text-strawberry px-2 py-0.5 rounded font-mono text-[10px] font-bold">
                            Dorks ({tech.dorks})
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-full text-xs text-chocolate/50 italic p-6 bg-white/60 rounded-2xl text-center border border-soft-pink/40">
                  Tidak ada teknologi spesifik terdeteksi.
                </div>
              )}
            </div>
          </div>

          {/* RAW HTTP HEADERS SECTION */}
          {result.httpHeaders &&
            Object.keys(result.httpHeaders).length > 0 && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowRawHeaders(!showRawHeaders)}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-chocolate/70 hover:text-strawberry transition cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-strawberry" />
                  <span>
                    {showRawHeaders
                      ? "Sembunyikan HTTP Headers"
                      : "Tampilkan Raw HTTP Headers"}
                  </span>
                  {showRawHeaders ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {showRawHeaders && (
                  <div className="mt-3 p-4 bg-chocolate text-cream rounded-2xl font-mono text-xs overflow-x-auto space-y-1.5 shadow-inner">
                    <div className="text-strawberry font-bold mb-2 pb-1.5 border-b border-white/10">
                      HTTP/1.1 {result.httpStatus} Response Headers:
                    </div>
                    {Object.entries(result.httpHeaders).map(
                      ([key, val], i: number) => (
                        <div key={i} className="flex gap-2">
                          <span className="text-strawberry font-bold">
                            {key}:
                          </span>
                          <span className="text-white/80">
                            {Array.isArray(val)
                              ? val.join(", ")
                              : String(val)}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            )}
        </div>
      )}
    </div>
  );
}