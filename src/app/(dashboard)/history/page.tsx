
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import {
  History,
  Search,
  Trash2,
  ExternalLink,
  RotateCw,
  Eye,
  CheckCircle2,
  XCircle,
  Filter,
  Sparkles,
  Cpu,
  Calendar,
  Server,
  MapPin,
  X,
} from "lucide-react";

import { ScanHistoryItem } from "@/types/history.scan";
import { HistoryStorage } from "@/utils/localStorage";

export default function HistoryPage() {
  const [historyList, setHistoryList] = useState<ScanHistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEngine, setSelectedEngine] = useState<string>("all");
  const [selectedItem, setSelectedItem] =
    useState<ScanHistoryItem | null>(null);

  // Menandakan bahwa komponen sudah berjalan di browser
  const [mounted, setMounted] = useState(false);

  // Load history dari LocalStorage setelah hydration
  useEffect(() => {
    setMounted(true);

    const data = HistoryStorage.getAll();
    setHistoryList(data);
  }, []);

  const handleDelete = (id: string) => {
    const updated = HistoryStorage.delete(id);

    setHistoryList(updated);

    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
  };

  const handleClearAll = () => {
    if (
      confirm(
        "Apakah kamu yakin ingin menghapus seluruh riwayat scan?"
      )
    ) {
      HistoryStorage.clearAll();
      setHistoryList([]);
      setSelectedItem(null);
    }
  };

  const filteredHistory = historyList.filter((item) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      item.targetUrl.toLowerCase().includes(query) ||
      item.title.toLowerCase().includes(query) ||
      item.ip.toLowerCase().includes(query);

    const matchesEngine =
      selectedEngine === "all" ||
      item.engine.toLowerCase() === selectedEngine.toLowerCase();

    return matchesSearch && matchesEngine;
  });

  // Jangan akses/render data LocalStorage sebelum browser mounted
  if (!mounted) {
    return (
      <div className="py-20 text-center text-chocolate/50 font-bold text-sm">
        Memuat data riwayat scan...
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-soft-pink/30 border border-soft-pink/50 text-strawberry px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            ScanCake Vault
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-chocolate tracking-tight">
            Scan History & Logs
          </h1>

          <p className="text-chocolate/60 text-xs sm:text-sm font-medium">
            Riwayat asli hasil pemindaian teknologi web dan probing HTTP.
          </p>
        </div>

        {/* TOTAL SCAN */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 bg-white/80 border border-soft-pink/40 p-3 rounded-2xl shadow-xs">
            <div className="p-2 bg-strawberry/10 rounded-xl text-strawberry">
              <History className="w-5 h-5" />
            </div>

            <div>
              <div className="text-[10px] font-extrabold uppercase text-chocolate/50">
                Total Real Logs
              </div>

              <div className="text-sm font-black text-chocolate">
                {historyList.length} Tersimpan
              </div>
            </div>
          </div>

          {historyList.length > 0 && (
            <button
              onClick={handleClearAll}
              className="p-3 bg-strawberry/10 hover:bg-strawberry text-strawberry hover:text-white rounded-2xl border border-strawberry/20 transition cursor-pointer text-xs font-bold flex items-center gap-1.5"
              title="Clear All History"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">
                Bersihkan Log
              </span>
            </button>
          )}
        </div>
      </div>

      {/* FILTER & SEARCH */}
      <div className="bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-soft-pink/40 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-chocolate/40 absolute left-3.5 top-1/2 -translate-y-1/2" />

          <input
            type="text"
            placeholder="Cari domain, IP, atau judul..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream/30 border border-soft-pink/50 text-chocolate text-xs font-medium placeholder:text-chocolate/40 focus:outline-none focus:border-strawberry transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs font-bold text-chocolate/60 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-strawberry" />
            Engine:
          </span>

          <select
            value={selectedEngine}
            onChange={(e) => setSelectedEngine(e.target.value)}
            className="px-3 py-2 rounded-xl bg-cream/30 border border-soft-pink/50 text-chocolate text-xs font-bold focus:outline-none focus:border-strawberry cursor-pointer"
          >
            <option value="all">Semua Engine</option>
            <option value="whatweb">WhatWeb</option>
            <option value="httpx">httpx</option>
          </select>
        </div>
      </div>

      {/* HISTORY LIST */}
      <div className="space-y-4">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((item) => (
            <div
              key={item.id}
              className="bg-white/80 hover:bg-white backdrop-blur-md p-5 rounded-3xl border border-soft-pink/40 shadow-xs transition hover:shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-0.5 rounded-full border ${item.httpStatus >= 200 &&
                      item.httpStatus < 300
                      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                      : "bg-amber-100 text-amber-800 border-amber-200"
                      }`}
                  >
                    {item.httpStatus >= 200 &&
                      item.httpStatus < 300 ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <XCircle className="w-3 h-3" />
                    )}

                    HTTP {item.httpStatus}
                  </span>

                  <span
                    className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${item.engine === "WhatWeb"
                      ? "bg-strawberry/10 text-strawberry border-strawberry/20"
                      : "bg-blue-500/10 text-blue-600 border-blue-200"
                      }`}
                  >
                    {item.engine} Engine
                  </span>

                  <span className="text-[11px] font-medium text-chocolate/50 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.scannedAt}
                  </span>
                </div>

                <div>
                  <h3 className="font-black text-chocolate text-base tracking-tight flex items-center gap-2">
                    <a
                      href={item.targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-strawberry transition flex items-center gap-1.5"
                    >
                      {item.targetUrl}

                      <ExternalLink className="w-3.5 h-3.5 text-chocolate/40" />
                    </a>
                  </h3>

                  <p className="text-xs text-chocolate/60 font-medium truncate max-w-md mt-0.5">
                    {item.title}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.techSummary?.slice(0, 5).map(
                    (tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold px-2 py-0.5 bg-cream/40 text-chocolate rounded-md border border-soft-pink/30"
                      >
                        {tech}
                      </span>
                    )
                  )}

                  {item.techSummary &&
                    item.techSummary.length > 5 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-strawberry/10 text-strawberry rounded-md">
                        +{item.techSummary.length - 5} lagi
                      </span>
                    )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between lg:justify-end gap-4 border-t lg:border-t-0 pt-3 lg:pt-0 border-soft-pink/30">
                <div className="text-xs font-mono text-chocolate/70 space-y-1 bg-cream/20 p-3 rounded-2xl border border-soft-pink/30 w-full sm:w-auto">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-strawberry shrink-0" />
                    <span className="truncate">
                      {item.ip} ({item.country})
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-strawberry shrink-0" />
                    <span className="truncate">
                      {item.server}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="p-2.5 bg-cream/40 hover:bg-soft-pink/30 text-chocolate rounded-xl border border-soft-pink/40 transition cursor-pointer"
                    title="Quick View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <Link
                    href={`/scan?url=${encodeURIComponent(
                      item.targetUrl
                    )}`}
                    className="p-2.5 bg-chocolate hover:bg-chocolate/90 text-white rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                    title="Re-Scan Target"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-strawberry" />
                    <span>Re-Scan</span>
                  </Link>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2.5 bg-strawberry/10 hover:bg-strawberry text-strawberry hover:text-white rounded-xl border border-strawberry/20 transition cursor-pointer"
                    title="Hapus History"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white/60 rounded-3xl border border-soft-pink/40 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-strawberry/10 text-strawberry flex items-center justify-center mx-auto">
              <History className="w-6 h-6" />
            </div>

            <h3 className="text-base font-black text-chocolate">
              Belum Ada Riwayat Pemindaian Real
            </h3>

            <p className="text-xs text-chocolate/50 max-w-sm mx-auto">
              Jalankan pemindaian pertama kamu di menu Web Scanner
              atau httpx Probing untuk menyimpan data asli ke dalam vault.
            </p>
          </div>
        )}
      </div>

      {/* QUICK VIEW MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-chocolate/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-soft-pink/50 shadow-2xl max-w-lg w-full p-6 space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-soft-pink/30 pb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-strawberry" />

                <h3 className="font-black text-chocolate text-lg">
                  Scan Log Detail
                </h3>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 text-chocolate/40 hover:text-chocolate rounded-lg hover:bg-soft-pink/20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-black uppercase text-chocolate/40">
                  Target Domain
                </span>

                <p className="text-sm font-black text-chocolate break-all">
                  {selectedItem.targetUrl}
                </p>

                <p className="text-xs text-chocolate/60 mt-0.5">
                  {selectedItem.title}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-cream/30 rounded-2xl border border-soft-pink/30">
                  <span className="text-[10px] font-bold uppercase text-chocolate/50">
                    IP Address
                  </span>

                  <div className="font-mono font-bold text-chocolate">
                    {selectedItem.ip}
                  </div>
                </div>

                <div className="p-3 bg-cream/30 rounded-2xl border border-soft-pink/30">
                  <span className="text-[10px] font-bold uppercase text-chocolate/50">
                    Web Server
                  </span>

                  <div className="font-mono font-bold text-chocolate">
                    {selectedItem.server}
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase text-chocolate/40 mb-2 block">
                  Detected Stack ({selectedItem.totalTechnologies})
                </span>

                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1">
                  {selectedItem.techSummary?.map(
                    (tech, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono font-bold px-3 py-1 bg-strawberry/10 text-strawberry rounded-xl border border-strawberry/20"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="bg-chocolate text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-chocolate/90 transition cursor-pointer"
              >
                Tutup Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

