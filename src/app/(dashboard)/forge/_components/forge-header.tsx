"use client";

import React from "react";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import Button from "@/components/ui/Button";

export function ForgeHeader() {
  return (
    <header className="w-full border-b border-slate-100 pb-4 md:pb-5">
      {/* Mobile View Header Layout (Back arrow on left, Title/Subtitle centered) */}
      <div className="relative flex md:hidden items-center justify-center w-full min-h-[44px]">
        {/* Back Button - Positioned absolute left */}
        <Link
          href="/dashboard"
          className="absolute left-0 p-1 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          aria-label="Go back"
        >
          <HiArrowLeft className="w-5 h-5" />
        </Link>

        {/* Title & Subtitle - Centered */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Forge
          </h1>
          <p className="text-xs font-medium text-slate-400 mt-0.5">
            Podcast Episode 12
          </p>
        </div>
      </div>

      {/* Desktop View Header Layout (Left aligned title, Right aligned CTA) */}
      <div className="hidden md:flex md:flex-row md:items-center justify-between gap-4 w-full">
        {/* Title & Subtitle - Aligned Left */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Forge
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">
            Podcast Episode 12
          </p>
        </div>

        <Link href="/lens">
          <Button
            type="button"
            className="w-auto shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-[#5D5FEF] hover:bg-[#4B4DDC] text-white shadow-xs transition-all whitespace-nowrap cursor-pointer"
          >
            <span>Continue to Lens</span>
            <span>&rarr;</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}