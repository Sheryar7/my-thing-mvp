"use client";

import React from "react";

interface KeywordsCardProps {
  keywords: string[];
}

export function KeywordsCard({ keywords }: KeywordsCardProps) {
  return (
    <div className="w-full max-w-full min-w-0 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
      <h3 className="font-bold text-slate-900 text-lg md:text-xl tracking-tight">
        Keywords
      </h3>
      <div className="flex flex-wrap gap-2 w-full min-w-0">
        {keywords.map((keyword, idx) => (
          <span
            key={idx}
            className="break-words px-3.5 py-1.5 bg-[#EEECFE] text-indigo-900 font-semibold text-xs md:text-sm rounded-xl"
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}