"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Sidebar from "./_components/sidebar";
import { HiOutlineMenu } from "react-icons/hi";
import { IoNotificationsOutline, IoArchiveOutline, IoMicOutline, IoCheckmark } from "react-icons/io5";
import { GrHomeRounded } from "react-icons/gr";
import { LuPenLine } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";

export default function SharedDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Smart route matching helper to keep highlight states clean
  const isTabActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] text-slate-900 relative overflow-hidden">
      {/* Persistent Left Sidebar Navigation for Desktop Viewports */}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden w-full relative">

        {/* MOBILE TOP NAVIGATION BAR - Fixed Layer */}
        {!isTabActive("/workshop") && (
          <div className="md:hidden fixed top-0 inset-x-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 p-2 text-slate-700 transition-colors">
                <HiOutlineMenu className="w-5 h-5" />
              </button>
              <span className="text-lg font-bold text-slate-900 tracking-tight">MyThing</span>
            </div>

            <div className="flex items-center gap-3">
              <button className="inline-flex items-center justify-center rounded-xl bg-slate-50 p-2 text-slate-400 hover:text-slate-600 relative">
                <IoNotificationsOutline className="w-5.5 h-5.5" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-violet-600 rounded-full" />
              </button>
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sherry"
                alt="User profile"
                className="w-9 h-9 rounded-full object-cover border border-slate-100"
              />
            </div>
          </div>
        )}

        {/* DYNAMIC VIEW ROUTE DISPLAY SYSTEM */}
        <main className={`flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-12 pb-32 md:pb-8 w-full ${isTabActive("/workshop") ? "pt-4" : "pt-20"
          } md:pt-8`}>
          {children}
        </main>


        {/* MOBILE BOTTOM NAVIGATION TRACK SHEET */}
        <div className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-slate-100 bg-white px-4 py-2 shadow-lg">
          <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">

            <Link href="/dashboard" className={`inline-flex flex-col items-center justify-center gap-1 py-1 transition-all ${isTabActive("/dashboard") ? "text-indigo-600 font-semibold" : "text-slate-400 font-medium"
              }`}>
              <GrHomeRounded className="w-5 h-5" />
              <span className="text-[11px] tracking-wide">Home</span>
            </Link>

            <Link href="/archive" className={`inline-flex flex-col items-center justify-center gap-1 py-1 transition-all ${isTabActive("/archive") ? "text-indigo-600 font-semibold" : "text-slate-400 font-medium"
              }`}>
              <IoArchiveOutline className="w-5 h-5" />
              <span className="text-[11px] tracking-wide">Archive</span>
            </Link>

            <Link href="/workshop" className={`inline-flex flex-col items-center justify-center gap-1 py-1 transition-all ${isTabActive("/workshop") ? "text-indigo-600 font-semibold" : "text-slate-400 font-medium"
              }`}>
              <LuPenLine className="w-5 h-5" />
              <span className="text-[11px] tracking-wide">Workshop</span>
            </Link>

            <Link href="/forge" className={`inline-flex flex-col items-center justify-center gap-1 py-1 transition-all ${isTabActive("/forge") ? "text-indigo-600 font-semibold" : "text-slate-400 font-medium"
              }`}>
              <IoMicOutline className="w-5 h-5" />
              <span className="text-[11px] tracking-wide">Forge</span>
            </Link>

            <Link href="/lens" className={`inline-flex flex-col items-center justify-center gap-1 py-1 transition-all ${isTabActive("/lens") ? "text-indigo-600 font-semibold" : "text-slate-400 font-medium"
              }`}>
              <IoCheckmark className="w-5 h-5" />
              <span className="text-[11px] tracking-wide">Lens</span>
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}