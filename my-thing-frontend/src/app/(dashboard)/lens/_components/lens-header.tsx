"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { HiArrowLeft } from "react-icons/hi";

interface LensHeaderProps {
  title?: string;
  subtitle?: string;
  onExport?: () => void;
}

export function LensHeader({
  title = "Lens",
  subtitle = "Podcast Episode 12",
  onExport,
}: LensHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full relative">
      {/* Mobile Back Arrow */}
      <Link
        href="/dashboard"
        aria-label="Back to dashboard"
        className="sm:hidden absolute left-0 top-1 p-1 text-slate-700 hover:text-slate-900 transition-colors"
      >
        <HiArrowLeft className="w-5 h-5" />
      </Link>

      {/* Centered Title & Subtitle on Mobile */}
      <div className="text-center sm:text-left w-full sm:w-auto">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          {title}
        </h1>
        <p className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">
          {subtitle}
        </p>
        <p className="text-[11px] font-medium text-slate-400 sm:hidden mt-0.5">
          Final AI Review
        </p>
      </div>

      {/* Export Action (Visible on Desktop Only) */}
      {/* <div className="hidden sm:block">
        <Button
          type="button"
          onClick={onExport}
          className="w-auto shrink-0 inline-flex items-center justify-center px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all whitespace-nowrap cursor-pointer"
        >
          <span>Export</span>
          <span className="ml-1">&rarr;</span>
        </Button>
      </div> */}
    </div>
  );
}