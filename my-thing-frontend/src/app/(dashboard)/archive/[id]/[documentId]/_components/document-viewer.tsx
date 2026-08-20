"use client";

import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface DocumentViewerProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export function DocumentViewer({
  currentPage,
  totalPages,
  onPageChange,
}: DocumentViewerProps) {
  return (
    <div className="w-full max-w-full min-w-0 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xs flex flex-col justify-between min-h-0 sm:min-h-[640px] relative">
      <div className="space-y-3.5 sm:space-y-6 text-slate-900 text-xs md:text-sm leading-relaxed font-normal">
        
        {/* Heading with explicit gap between 3.2 and the title text */}
        <h2 className="text-base md:text-lg font-bold text-slate-900 tracking-tight flex items-baseline gap-2">
          <span>3.2</span>
          <span>AI in Healthcare: Current Applications</span>
        </h2>

        <p>
          Artificial Intelligence is rapidly transforming healthcare by improving diagnostic accuracy, personalizing treatment, and optimizing hospital operations. Machine learning models can analyze medical images, detect anomalies, and predict disease progression with high accuracy.
        </p>

        <div className="bg-amber-100/70 p-2 rounded-lg text-slate-800 font-medium">
          Studies show that AI-powered diagnostic tools can improve accuracy by up to 20% compared to traditional methods, particularly in radiology and pathology.
        </div>

        <p className="hidden sm:block">
          Despite these advancements, challenges remain in data privacy, algorithmic bias, and the lack of regulatory frameworks. Ethical AI deployment requires transparency, fairness, and human oversight.
        </p>

        <span className="text-xs font-bold text-indigo-950">Key Insights</span>
        <div className="bg-[#EEECFE] border mt-3.5 border-indigo-800 rounded-xl p-4 space-y-1.5">
          <p className="text-indigo-800 font-medium text-xs md:text-sm">
            The future of AI in healthcare depends on balancing innovation with ethics, privacy, and patient trust.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-left pt-4 sm:pt-8">
        <div className="inline-flex items-center gap-3 bg-white border border-slate-200/80 rounded-xl px-4 py-1.5 text-xs font-medium text-slate-500 shadow-xs">
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className="hover:text-slate-800 transition-colors p-0.5"
          >
            <FiChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button
            type="button"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className="hover:text-slate-800 transition-colors p-0.5"
          >
            <FiChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}