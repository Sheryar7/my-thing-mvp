"use client";

import React from "react";

interface ContentPreviewProps {
  title?: string;
  excerpt?: string;
  onViewFull?: () => void;
}

export function ContentPreview({
  title = "AI Ethics in Modern Technology",
  excerpt = "Artificial Intelligence (AI) improves many areas of life, such as healthcare, education, transportation, and communication. However, it also raises ethical concerns, including bias, privacy, transparency, and accountability. To ensure AI benefits society, it should be developed responsibly with fairness, privacy, and proper regulations.",
  onViewFull,
}: ContentPreviewProps) {
  return (
    <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          Content Preview
        </h2>

        {/* Desktop Header 'View Full' Link */}
        <button
          type="button"
          onClick={onViewFull}
          className="hidden sm:inline-flex text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors items-center gap-1 cursor-pointer"
        >
          <span>View Full</span>
          <span>&rarr;</span>
        </button>
      </div>

      {/* Content Container: Plain layout on mobile, bordered box on desktop */}
      <div className="w-full border-0 bg-transparent p-0 shadow-none sm:border sm:border-slate-200 sm:bg-slate-50/50 sm:rounded-xl sm:p-5 flex flex-col justify-between">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight mb-2">
            {title}
          </h3>

          {/* Line clamp for mobile (3 lines + ellipsis), full text on desktop */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
            {excerpt}
          </p>
        </div>

        {/* Mobile-Only Bottom Right 'View Full' Link */}
        <div className="flex sm:hidden justify-end mt-3">
          <button
            type="button"
            onClick={onViewFull}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View Full</span>
            <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}