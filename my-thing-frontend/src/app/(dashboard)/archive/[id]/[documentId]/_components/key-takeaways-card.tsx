"use client";

import React from "react";
import { FiCheck } from "react-icons/fi";

const DEFAULT_TAKEAWAYS = [
  "AI improves diagnostic accuracy.",
  "Privacy is the biggest barrier.",
  "Human oversight is essential.",
  "Transparency builds trust.",
];

interface KeyTakeawaysCardProps {
  takeaways?: string[];
}

export function KeyTakeawaysCard({ takeaways }: KeyTakeawaysCardProps) {
  const items = takeaways && takeaways.length > 0 ? takeaways : DEFAULT_TAKEAWAYS;

  return (
    <div className="w-full max-w-full min-w-0 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
      <div className="space-y-2">
        <h3 className="font-bold text-slate-900 text-lg md:text-xl tracking-tight">
          Key Takeaways
        </h3>
        <div>
          <span className="inline-block text-[11px] font-semibold text-indigo-900 bg-[#EEECFE] px-3 py-1 rounded-full">
            {items.length} selected
          </span>
        </div>
      </div>

      <div className="space-y-3 text-xs md:text-sm text-slate-900 font-medium">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span className="leading-snug">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}