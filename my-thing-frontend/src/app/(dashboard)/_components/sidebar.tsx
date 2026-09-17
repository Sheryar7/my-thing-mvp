"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoArchiveOutline, IoMicOutline, IoCheckmark } from "react-icons/io5";
import { LuPenLine, LuLogOut } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";

// Custom Home Icon matching Figma reference (media_1789580533737.png) pixel-for-pixel
function DashboardHomeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || "w-6 h-6"}
    >
      <path d="M4 10.5 12 3l8 7.5V20a2 2 0 0 1-2 2h-3v-6a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v6H6a2 2 0 0 1-2-2V10.5Z" />
    </svg>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  // Smart checking to handle nested routes correctly
  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    if (href === "/lens") return pathname.startsWith("/lens") || pathname.startsWith("/export-publish");
    return pathname.startsWith(href);
  };

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: DashboardHomeIcon },
    { label: "Archive", href: "/archive", icon: IoArchiveOutline },
    { label: "Workshop", href: "/workshop", icon: LuPenLine },
    { label: "Forge", href: "/forge", icon: IoMicOutline },
    { label: "Lens", href: "/lens", icon: IoCheckmark },
  ];

  return (
    <aside className="w-64 sticky top-0 h-screen bg-white border-r border-[#E2E8F0] hidden md:flex flex-col p-5 sm:p-6 justify-between shrink-0">
      <div className="flex flex-col gap-8">
        {/* Brand Logo / Home Link */}
        <Link
          href="/"
          className="text-2xl font-bold text-slate-900 px-3 tracking-tight hover:opacity-80 transition-opacity w-fit"
        >
          MyThing
        </Link>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3.5 px-4 py-3 sm:py-3.5 rounded-2xl transition-all duration-200 ${
                  active
                    ? "bg-[#f5f3ff] text-[#7c3aed] font-bold shadow-xs"
                    : "text-slate-500 hover:bg-slate-50 hover:text-[#7c3aed] font-medium"
                }`}
              >
                <Icon
                  className={`w-6 h-6 shrink-0 transition-colors duration-200 ${
                    active
                      ? "text-[#7c3aed]"
                      : "text-slate-500 group-hover:text-[#7c3aed]"
                  }`}
                />
                <span className="text-base sm:text-lg tracking-tight">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-1 border-t border-slate-100 pt-4">
        <Link
          href="/settings"
          className="flex items-center gap-3.5 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-2xl transition font-medium"
        >
          <CiSettings className="w-5 h-5 text-slate-400" />
          <span>Settings</span>
        </Link>
        <button
          type="button"
          className="flex items-center gap-3.5 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-2xl text-left transition w-full font-medium"
        >
          <LuLogOut className="w-5 h-5 text-slate-400" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}