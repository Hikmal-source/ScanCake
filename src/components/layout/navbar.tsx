"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, Sparkles } from "lucide-react";
import { useNavber } from "@/hooks/use-navbar";

export default function Navbar() {
  const { isOpen, toggleMenu, closeMenu } = useNavber();

  return (
    <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md  transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo Brand dengan Gambar Kue 3D */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group transition-transform active:scale-95"
            onClick={closeMenu}
          >
            <div className="relative w-9 h-9 transition-transform group-hover:rotate-12">
              <Image
                src="/icon_cake.webp"
                alt="SecLens Mascot"
                width={36}
                height={36}
                className="object-contain filter drop-shadow-sm"
                priority
              />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-chocolate">
              Scan<span className="text-strawberry">Cake</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-chocolate/80 hover:text-strawberry font-medium text-sm transition-colors"
            >
              Home
            </Link>
            <Link
              href="/scan"
              className="text-chocolate/80 hover:text-strawberry font-medium text-sm transition-colors"
            >
              Scan
            </Link>
            <Link
              href="/about"
              className="text-chocolate/80 hover:text-strawberry font-medium text-sm transition-colors"
            >
              Docs
            </Link>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/scan"
              className="inline-flex items-center gap-2 bg-chocolate/90 hover:bg-chocolate/60 text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              Login
              <Sparkles className="w-4 h-4 text-strawberry-jam" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="p-2 rounded-xl text-chocolate hover:bg-soft-pink/20 focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-cream border-b border-soft-pink/30 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <Link
            href="/"
            onClick={closeMenu}
            className="block px-3 py-2.5 rounded-lg text-chocolate font-medium hover:bg-soft-pink/20 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/scan"
            onClick={closeMenu}
            className="block px-3 py-2.5 rounded-lg text-chocolate font-medium hover:bg-soft-pink/20 transition-colors"
          >
            Scan
          </Link>
          <Link
            href="/about"
            onClick={closeMenu}
            className="block px-3 py-2.5 rounded-lg text-chocolate font-medium hover:bg-soft-pink/20 transition-colors"
          >
            About
          </Link>
          <div className="pt-2">
            <Link
              href="/scan"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 w-full bg-strawberry text-white font-semibold text-sm px-5 py-3 rounded-full shadow-sm transition-all active:scale-95"
            >
              Start Scanning
              <Sparkles className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}