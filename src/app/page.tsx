"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiGrid } from "react-icons/fi";
import { LuPenLine } from "react-icons/lu";
import { IoArchiveOutline } from "react-icons/io5";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans antialiased text-slate-900">

      {/* HEADER BAR */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm shadow-indigo-200">
            M
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">MyThing</span>
        </div>

        {/* Auth & Navigation Gateways */}
        <div className="flex items-center gap-4">
          <Link 
            href="/log-in" 
            className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Sign In
          </Link>
          <Link 
            href="/sign-up" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-4 py-2 rounded-xl shadow-sm transition-all whitespace-nowrap"
          >
            Create Account
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center py-12 md:py-20 space-y-12">
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Welcome back to your workspace hub.
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            Jump straight back into your projects, research assets, or manage your digital archive workspace from one unified interface.
          </p>
        </div>

        {/* APPLICATION MODULE NAVIGATION TILES */}
        {/* Changed grid layout to "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" to perfectly support three items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">

          {/* Card 1: Dashboard */}
          <Link
            href="/dashboard"
            className="group p-5 bg-white border border-slate-200 rounded-[20px] shadow-sm hover:border-indigo-500/40 hover:shadow-md transition-all text-left flex flex-col justify-between min-h-[140px]"
          >
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center transition-colors group-hover:bg-indigo-600 group-hover:text-white">
              <FiGrid className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Dashboard Overview</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">View platform activity & quick stats</p>
            </div>
          </Link>

          {/* Card 2: Archive */}
          <Link
            href="/archive"
            className="group p-5 bg-white border border-slate-200 rounded-[20px] shadow-sm hover:border-indigo-500/40 hover:shadow-md transition-all text-left flex flex-col justify-between min-h-[140px]"
          >
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center transition-colors group-hover:bg-indigo-600 group-hover:text-white">
              <IoArchiveOutline className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Archive Module</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Access document previews & sources</p>
            </div>
          </Link>

          {/* Card 3: Workshop (Newly Added) */}
          <Link
            href="/workshop"
            className="group p-5 bg-white border border-slate-200 rounded-[20px] shadow-sm hover:border-indigo-500/40 hover:shadow-md transition-all text-left flex flex-col justify-between min-h-[140px]"
          >
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center transition-colors group-hover:bg-indigo-600 group-hover:text-white">
              <LuPenLine className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Workshop</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Draft scripts and run AI transformations</p>
            </div>
          </Link>
          
        </div>

        {/* BOTTOM BRAND FOOTER ICON */}
        <div className="pt-6">
          <Image
            className="opacity-20 hover:opacity-40 transition-opacity"
            src="/next.svg"
            alt="Next.js logo"
            width={90}
            height={18}
            priority
          />
        </div>
      </main>

    </div>
  );
}