import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Terminal,
} from "lucide-react";

const featureCards = [
  {
    icon: Zap,
    title: "Instant Reconnaissance",
    desc: "Menganalisis response header, cookie, dan jejak teknologi web dalam hitungan detik.",
    badge: "Fast Intel",
  },
  {
    icon: Layers,
    title: "Deep Tech Stack Inspection",
    desc: "Membedah CMS, web server, framework JS, hingga modul backend secara presisi.",
    badge: "Full Layer",
  },
  {
    icon: ShieldCheck,
    title: "Vulnerability Exposure",
    desc: "Mengidentifikasi potensi celah keamanan dari versi teknologi dan plugin yang terdeteksi.",
    badge: "Sec Audit",
  },
  {
    icon: Terminal,
    title: "WhatWeb Engine Integration",
    desc: "Ditenagai langsung oleh engine WhatWeb untuk hasil footprinting yang valid dan akurat.",
    badge: "Core Tech",
  },
];

export default function HomeCTA() {
  return (
    <section className="py-20 bg-soft-pink/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header CTA */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-strawberry font-bold text-xs uppercase tracking-wider bg-soft-pink/40 px-3.5 py-1 rounded-full border border-soft-pink/60">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why ScanCake?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-chocolate tracking-tight">
            Bedah Infrastruktur Web Application
          </h2>
          <p className="text-chocolate/75 text-sm sm:text-base font-medium">
            Platform web footprinting modern yang mengombinasikan intelijen WhatWeb dengan antarmuka yang bersih.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-cream/90 border border-soft-pink/50 hover:border-strawberry/40 rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-soft-pink/30 text-strawberry rounded-2xl group-hover:bg-strawberry group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold text-chocolate/60 bg-soft-pink/20 border border-soft-pink/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-chocolate">
                    {card.title}
                  </h3>
                  <p className="text-chocolate/70 text-xs font-medium leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Card (Action) */}
        <div className="bg-chocolate rounded-3xl p-8 sm:p-10 text-cream relative overflow-hidden shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left z-10">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Siap untuk memulai web reconnaissance?
            </h3>
            <p className="text-cream/75 text-xs sm:text-sm font-medium">
              Masukkan target URL dan biarkan ScanCake menganalisis seluruh tumpukan teknologinya.
            </p>
          </div>

          <div className="flex items-center gap-4 z-10">
            <Link
              href="/scan"
              className="inline-flex items-center gap-2.5 bg-strawberry hover:bg-strawberry/90 text-white font-extrabold text-sm px-7 py-3.5 rounded-full shadow-lg transition-all active:scale-95"
            >
              <span>Jalankan Scanner</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Decorative Mascot Accent */}
          <div className="absolute -right-6 -bottom-8 opacity-20 pointer-events-none">
            <Image
              src="/cake.png"
              alt="ScanCake Decorative"
              width={180}
              height={180}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}