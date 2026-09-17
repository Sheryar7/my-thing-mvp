"use client";

import React from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

interface AISuggestionsProps {
  suggestions?: string[];
}

export function AISuggestions({
  suggestions = [
    "Add a stronger conclusion.",
    "Include one additional statistic.",
    "Shorten paragraph three.",
    "Add citations.",
  ],
}: AISuggestionsProps) {
  return (
    <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs">
      {/* Title */}
      <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mb-3 sm:mb-4">
        AI Suggestions
      </h2>

      {/* Checklist Items */}
      <div className="flex flex-col gap-3">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="flex items-center gap-3">
            {/* Green Check Circle Icon */}
            <IoCheckmarkCircleOutline className="w-4 h-4 text-emerald-500 shrink-0 stroke-[2.2]" />

            {/* Suggestion Text */}
            <span className="text-xs sm:text-sm font-medium text-slate-700 leading-snug">
              {suggestion}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}