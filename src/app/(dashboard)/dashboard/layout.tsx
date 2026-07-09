import React from 'react';
import Sidebar from '@/components/dashboard/sidebar';
import { HiOutlineMenu } from 'react-icons/hi';
import { IoNotificationsOutline, IoArchiveOutline, IoMicOutline, IoCheckmark } from 'react-icons/io5';
import { GrHomeRounded } from 'react-icons/gr';
import { LuPenLine } from 'react-icons/lu';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-[#f8fafc] text-slate-900 relative overflow-hidden">
      {/* Desktop Left Sidebar Navigation panel component */}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden w-full relative">

        {/* MOBILE TOP NAVIGATION BAR - Fixed to the top edge layer */}
        <div className="md:hidden fixed top-0 inset-x-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md px-5 py-3.5 flex items-center justify-between transition-all">
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 p-2 text-slate-700 transition-colors">
              <HiOutlineMenu className="w-5 h-5" />
            </button>
            <span className="text-lg font-bold text-slate-900 tracking-tight">MyThing</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification alert container matching desktop viewport control sizes */}
            <button className="inline-flex items-center justify-center rounded-xl bg-slate-50 p-2 text-slate-400 hover:text-slate-600 transition-colors relative">
              <IoNotificationsOutline className="w-5.5 h-5.5" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-violet-600 rounded-full" />
            </button>

            {/* Fallback clean avatar profile component layout frame */}
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sherry"
              alt="User avatar profile frame illustration placeholder"
              className="w-9 h-9 rounded-full object-cover border border-slate-100 shadow-sm"
            />
          </div>
        </div>

        {/* MAIN DISPLAY CONTAINER CONTENT PORTAL */}
        {/* Added pt-[76px] on mobile layout frames so elements clear the fixed navigation banner smoothly */}
        <main className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-12 pt-20 md:pt-8 pb-32 md:pb-8 w-full">
          {children}
        </main>

        {/* MOBILE BOTTOM NAVIGATION TRACK SHEET */}
        <div className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 py-3 shadow-lg">
          <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
            <button className="inline-flex flex-col items-center justify-center rounded-2xl bg-violet-600 px-2 py-2.5 text-white shadow-sm shadow-violet-200">
              <GrHomeRounded className="w-5 h-5" />
            </button>
            <button className="inline-flex flex-col items-center justify-center rounded-2xl bg-slate-50 px-2 py-2.5 text-slate-500 hover:bg-slate-100 transition-colors">
              <IoArchiveOutline className="w-5 h-5" />
            </button>
            <button className="inline-flex flex-col items-center justify-center rounded-2xl bg-slate-50 px-2 py-2.5 text-slate-500 hover:bg-slate-100 transition-colors">
              <LuPenLine className="w-5 h-5" />
            </button>
            <button className="inline-flex flex-col items-center justify-center rounded-2xl bg-slate-50 px-2 py-2.5 text-slate-500 hover:bg-slate-100 transition-colors">
              <IoMicOutline className="w-5 h-5" />
            </button>
            <button className="inline-flex flex-col items-center justify-center rounded-2xl bg-slate-50 px-2 py-2.5 text-slate-500 hover:bg-slate-100 transition-colors">
              <IoCheckmark className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}