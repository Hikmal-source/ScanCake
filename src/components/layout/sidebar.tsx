"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  History,
  ShieldAlert,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Globe, // Import ikon Globe untuk httpx
  Terminal,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}


// Menu Utama (Dasar)
const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Web Scanner", href: "/scan", icon: Search, badge: "WhatWeb" },
  { label: "Scan History", href: "/history", icon: History },
];

// Menu Engines Khusus (httpx berada di bagian bawah)
const engineItems: NavItem[] = [
  {
    label: "httpx Probing",
    href: "/dashboard/httpx",
    icon: Globe,
    badge: "Fast Prober",
    badgeColor: "bg-blue-500 text-white"
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    router.push("/");
  };

  return (
    <>
      {/* Navbar Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-soft-pink/40 px-4 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-soft-pink/30 flex items-center justify-center">
            <img
              src="/icon_cake.webp"
              alt="ScanCake Logo"
              className="w-6 h-6 object-contain"
            />
          </div>
          <span className="font-black text-chocolate text-lg tracking-tight">
            ScanCake
          </span>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 text-chocolate rounded-xl hover:bg-soft-pink/20 transition cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Backdrop Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-chocolate/20 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      {/* Sidebar Desktop & Drawer Mobile */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white/90 backdrop-blur-md border-r border-soft-pink/40 flex flex-col justify-between p-5 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="space-y-5 overflow-y-auto">
          {/* Logo Brand Header */}
          <div className="flex items-center justify-between px-2 pt-2">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-soft-pink/30 border border-soft-pink/50 flex items-center justify-center shadow-xs">
                <img
                  src="/icon_cake.webp"
                  alt="ScanCake Logo"
                  className="w-7 h-7 object-contain"
                />
              </div>
              <div>
                <h1 className="font-black text-chocolate text-xl tracking-tight leading-none">
                  ScanCake
                </h1>
                <span className="text-[10px] font-bold text-strawberry uppercase tracking-wider">
                  Recon Suite 🍰
                </span>
              </div>
            </Link>

            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1.5 text-chocolate/50 hover:text-chocolate rounded-lg hover:bg-soft-pink/20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items - Section 1: Core */}
          <nav className="space-y-1 pt-2">
            <div className="text-[10px] font-black uppercase tracking-wider text-chocolate/40 px-3 mb-1.5">
              Menu Utama
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${isActive
                    ? "bg-chocolate text-white shadow-md shadow-chocolate/15 scale-[1.01]"
                    : "text-chocolate/70 hover:bg-soft-pink/20 hover:text-chocolate"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${isActive ? "text-strawberry" : "text-chocolate/60"
                        }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge ? (
                    <span
                      className={`text-[9px] font-black px-2 py-0.5 rounded-full ${isActive
                        ? "bg-strawberry text-white"
                        : "bg-strawberry/10 text-strawberry border border-strawberry/20"
                        }`}
                    >
                      {item.badge}
                    </span>
                  ) : (
                    isActive && <ChevronRight className="w-3.5 h-3.5 text-white/50" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Navigation Items - Section 2: Probing & Advanced Engines */}
          <nav className="space-y-1 pt-2 border-t border-soft-pink/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-chocolate/40 px-3 mb-1.5 flex items-center justify-between">
              <span>Probing Engine</span>
              <Terminal className="w-3 h-3 text-chocolate/30" />
            </div>
            {engineItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${isActive
                    ? "bg-chocolate text-white shadow-md shadow-chocolate/15 scale-[1.01]"
                    : "text-chocolate/70 hover:bg-soft-pink/20 hover:text-chocolate"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${isActive ? "text-strawberry" : "text-chocolate/60"
                        }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge ? (
                    <span
                      className={`text-[9px] font-black px-2 py-0.5 rounded-full ${item.badgeColor
                        ? item.badgeColor
                        : isActive
                          ? "bg-strawberry text-white"
                          : "bg-strawberry/10 text-strawberry border border-strawberry/20"
                        }`}
                    >
                      {item.badge}
                    </span>
                  ) : (
                    isActive && <ChevronRight className="w-3.5 h-3.5 text-white/50" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card di Bawah Sidebar */}
        <div className="pt-4 border-t border-soft-pink/40 space-y-3 shrink-0">
          <div className="p-3 bg-cream/40 rounded-2xl border border-soft-pink/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-strawberry text-white flex items-center justify-center text-xs font-black shrink-0">
                SC
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-chocolate truncate">
                  Admin ScanCake
                </div>
                <div className="text-[10px] text-chocolate/50 truncate font-medium">
                  admin@seclens.id
                </div>
              </div>
            </div>
            <button
              title="Logout"
              onClick={handleLogout}
              type="button"
              className="p-1.5 text-chocolate/40 hover:text-strawberry hover:bg-strawberry/10 rounded-lg transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}