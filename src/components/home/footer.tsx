"use client";

import Link from "next/link";
import Image from "next/image";
import { Terminal, Heart, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-chocolate text-cream pt-14 pb-8 overflow-hidden">
      {/* Wave Drip Effect di bagian atas Footer */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-cream/10">

          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="relative w-8 h-8 transition-transform group-hover:scale-110 group-hover:rotate-12">
                <Image
                  src="/icon_cake.webp"
                  alt="ScanCake Mascot"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="font-black text-2xl tracking-tight text-cream">
                ScanCake
              </span>
            </Link>
            <p className="text-cream/70 text-xs sm:text-sm font-medium leading-relaxed max-w-sm">
              Platform web reconnaissance & technology fingerprinting modern. Mengupas infrastruktur web secara akurat dengan engine WhatWeb.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-soft-pink bg-cream/5 px-3 py-1.5 rounded-lg w-fit border border-cream/10">
              <Lock className="w-3.5 h-3.5 text-strawberry" />
              <span>Cybersecurity Intel Tool</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-soft-pink font-extrabold text-xs uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-cream/80">
              <li>
                <Link href="/" className="hover:text-soft-pink transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/scan" className="hover:text-soft-pink transition-colors">
                  Recon Scanner
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-soft-pink transition-colors">
                  Security Docs
                </Link>
              </li>
            </ul>
          </div>

          {/* Engine & Social */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-soft-pink font-extrabold text-xs uppercase tracking-wider">
              Powered By
            </h4>
            <div className="flex items-center gap-2 text-xs font-medium text-cream/75">
              <Terminal className="w-4 h-4 text-strawberry" />
              <span>WhatWeb Engine v0.5.5</span>
            </div>
            <div className="pt-2 flex items-center gap-3">
              {/* SVG Icon GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-cream/10 hover:bg-strawberry hover:-translate-y-0.5 text-cream rounded-xl transition-all active:scale-95"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 10.95.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>

              {/* SVG Icon Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-cream/10 hover:bg-strawberry hover:-translate-y-0.5 text-cream rounded-xl transition-all active:scale-95"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-medium text-cream/50 gap-3">
          <p className="flex items-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-strawberry fill-strawberry" /> for security researchers.
          </p>
          <p>© {new Date().getFullYear()} ScanCake. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}