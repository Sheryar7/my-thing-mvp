"use client";

import React from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { HiArrowLeft } from "react-icons/hi";

interface LensHeaderProps {
  title?: string;
  subtitle?: string;
  onExport?: () => void;
}

export function LensHeader({
  title = "Lens",
  subtitle = "Podcast Episode 12",
}: LensHeaderProps) {
  return (
    <div className="w-full">
      {/* Desktop Header Layout */}
      <div className="hidden sm:flex flex-col sm:flex-row sm:items-start justify-between gap-3 w-full">
        <div className="space-y-1.5">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors w-fit mb-2"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to Project</span>
          </Link>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              {title}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-2">
              {subtitle} • <span className="text-indigo-600 font-semibold">Final AI Review</span>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Header Layout (Centered Title & Subtitles matching Image 1) */}
      <div className="sm:hidden relative flex items-center justify-center w-full py-2">
        <Link
          href="/dashboard"
          aria-label="Back to dashboard"
          className="absolute left-0 top-1/2 -translate-y-1/2 p-1 text-slate-800 hover:text-slate-900 transition-colors"
        >
          <HiArrowLeft className="w-5 h-5" />
        </Link>

        <div className="text-center">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {title}
          </h1>
          <p className="text-xs font-medium text-slate-500 mt-1.5">
            {subtitle}
          </p>
          <p className="text-xs font-medium text-slate-400 mt-1">
            Final AI Review
          </p>
        </div>
      </div>
    </div>
  );
}