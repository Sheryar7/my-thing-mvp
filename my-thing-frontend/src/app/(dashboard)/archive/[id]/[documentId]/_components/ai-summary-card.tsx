"use client";

import React from "react";
import { IoSparklesOutline } from "react-icons/io5";

interface AISummaryCardProps {
  summary?: string;
  confidence?: number;
}

export function AISummaryCard({ summary, confidence = 84 }: AISummaryCardProps) {
  return (
    <div className="w-full max-w-full min-w-0 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-slate-900 font-bold text-base tracking-tight">
          <IoSparklesOutline className="w-5 h-5 text-[#FFD214] fill-[#FFD214]" />
          <span>AI Summary</span>
        </div>

        <div>
          <span className="inline-block text-[11px] font-semibold text-indigo-900 bg-[#EEECFE] px-3 py-1 rounded-full">
            Auto-generated
          </span>
        </div>
      </div>

      <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-normal pt-1">
        {summary || "This paper explores how AI is transforming healthcare, diagnostics, and patient care while highlighting privacy, bias, and regulatory challenges."}
      </p>

      <div className="pt-2 border-t border-slate-100 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-bold">
          <span className="text-slate-700">Confidence</span>
          <span className="text-indigo-600">{confidence}%</span>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${confidence}%` }} />
        </div>
        <p className="text-[10px] text-emerald-700 font-semibold text-center pt-0.5">
          High confidence extraction
        </p>
      </div>
    </div>
  );
}