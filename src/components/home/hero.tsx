import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Text Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-soft-pink/30 border border-soft-pink/50 text-strawberry px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Web Technology Fingerprinting
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-chocolate tracking-tight leading-tight">
              Peel back the <br />
              <span className="text-strawberry underline decoration-soft-pink decoration-wavy underline-offset-8">
                layers
              </span>{" "}
              of the web.
            </h1>

            <p className="text-chocolate/80 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Discover the technologies behind any website with a simple, friendly, and visually delightful web fingerprinting tool powered by WhatWeb.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/scan"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-chocolate hover:bg-chocolate/90 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-chocolate/20 hover:shadow-xl transition-all active:scale-95"
              >
                <span className="">Start Scanning</span>
                <Sparkles className="w-5 h-5 text-strawberry-jam" />
              </Link>
            </div>
          </div>

          {/* Clean 3D Cake Visual (Tanpa Border / Card) */}
          <div className="relative flex justify-center items-center">
            {/* Soft Ambient Glow */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-soft-pink/40 rounded-full filter blur-3xl -z-10 animate-pulse" />

            {/* Floating Cake Image Only */}
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
              <Image
                src="/cake.png"
                alt="SecLens 3D Double Layer Cake Mascot"
                width={384}
                height={384}
                className="object-contain drop-shadow-[0_25px_25px_rgba(240,90,157,0.25)] "
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}