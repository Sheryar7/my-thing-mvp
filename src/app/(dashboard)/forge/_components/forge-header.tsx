"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";

export function ForgeHeader() {
  return (
    <header className="w-full border-b border-slate-100 pb-4 md:pb-5">
      {/* Mobile View Header Layout */}
      <div className="relative flex md:hidden items-center justify-center w-full min-h-[44px]">
        {/* Back Button on Left */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="absolute left-0 p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Centered Title & Subtitle */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-slate-900 leading-tight">
            Forge
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Podcast Episode 12
          </p>
        </div>
      </div>

      {/* Desktop View Header Layout */}
      <div className="hidden md:flex md:flex-row md:items-center justify-between gap-4 w-full">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Forge
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">
            Podcast Episode 12
          </p>
        </div>

        <Link href="/lens">
          <Button
            type="button"
            className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all whitespace-nowrap"
          >
            Continue to Lens →
          </Button>
        </Link>
      </div>
    </header>
  );
}