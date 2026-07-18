"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrHomeRounded } from "react-icons/gr";
import { IoArchiveOutline, IoMicOutline, IoCheckmark } from "react-icons/io5";
import { LuPenLine, LuLogOut } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";

export default function Sidebar() {
  const pathname = usePathname();

  // Smart checking to handle nested routes correctly
  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: GrHomeRounded },
    { label: "Archive", href: "/archive", icon: IoArchiveOutline },
    { label: "Workshop", href: "/workshop", icon: LuPenLine },
    { label: "Forge", href: "/forge", icon: IoMicOutline },
    { label: "Lens", href: "/lens", icon: IoCheckmark },
  ];

  return (
    <aside className="w-60 sticky top-0 h-screen bg-white border-r border-[#E2E8F0] hidden md:flex flex-col p-6 justify-between shrink-0">
      <div className="flex flex-col gap-8">
        <div className="text-2xl font-bold text-slate-900 px-3 tracking-tight">MyThing</div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                // 1. Added "group" here so we can style children based on parent hover
                className={`group flex items-center gap-3 p-3 font-medium rounded-lg transition duration-200 ${active
                  ? "bg-violet-50 text-violet-600 font-semibold"
                  : "text-slate-500 hover:bg-slate-50 hover:text-violet-500"
                  }`}
              >
                <Icon
                  // 2. Changed "hover:text-violet-500" to "group-hover:text-violet-500"
                  // 3. Removed the accidental bg-violet-50 & font-semibold from the active icon class
                  className={`w-5 h-5 transition-colors duration-200 ${active
                    ? "text-violet-600"
                    : "text-slate-500 group-hover:text-violet-500"
                    }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-1 border-t border-slate-100 pt-4">
        <Link href="/settings" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-lg transition">
          <CiSettings className="w-5 h-5 text-slate-400" />
          <span>Settings</span>
        </Link>
        <button
          type="button"
          className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-lg text-left transition w-full">
          <LuLogOut className="w-5 h-5 text-slate-400" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
