"use client";

import React from "react";
import { HiSparkles } from "react-icons/hi2";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

interface AIProjectInsightsProps {
  summary?: string;
  keyTopics?: string[];
  sourcesIndexedCount?: number;
  summariesGeneratedCount?: number;
  researchStatus?: string;
}

export function AIProjectInsights({
  summary = "This project focuses on AI Ethics, privacy concerns, healthcare applications, and responsible AI practices.",
  keyTopics = ["AI Ethics", "Healthcare", "Privacy", "Transparency", "Machine Learning"],
  sourcesIndexedCount = 18,
  summariesGeneratedCount = 15,
  researchStatus = "Ready for Script Generation",
}: AIProjectInsightsProps) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-[24px] p-6 shadow-sm space-y-5">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
          <HiSparkles className="w-5 h-5 text-amber-400" />
          <span>AI Project Insights</span>
        </div>

        {/* --- MOBILE ONLY SUB-HEADER WITH GUARANTEED SVG DOT --- */}
        <div className="flex items-center gap-1.5 mt-1 md:hidden">
          {/* SVG Green Dot ensuring fixed width & height */}
          <svg className="w-2.5 h-2.5 text-light-green fill-current shrink-0" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="4" />
          </svg>
          {/* Analysis Complete Text */}
          <span className="text-xs font-semibold text-light-green">
            Analysis complete
          </span>
        </div>

        {/* --- DESKTOP ONLY SUB-HEADER (UNTOUCHED) --- */}
        <p className="hidden md:block text-xs text-slate-400 font-medium mt-0.5">
          AI analyzed all uploaded sources and extracted the key information.
        </p>
      </div>

      {/* Grid Layout for Summary, Topics, and Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
        {/* Summary Column */}
        <div>
          {/* Mobile uses larger bold title; Desktop retains untouched styling via md: prefix */}
          <h4 className="text-base font-bold text-indigo-900 md:text-sm md:text-indigo-800 mb-2">
            Summary
          </h4>
          <p className="text-xs leading-relaxed text-slate-900 font-medium">
            {summary}
          </p>
        </div>

        {/* Key Topics Column */}
        <div className="md:border-l border-slate-100 md:pl-6">
          {/* Mobile uses larger bold title; Desktop retains untouched styling via md: prefix */}
          <h4 className="text-base font-bold text-indigo-900 md:text-sm md:text-indigo-800 mb-2">
            Key Topics
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {keyTopics.map((topic) => (
              <span
                key={topic}
                className="px-2.5 py-1 text-[11px] font-semibold bg-[#EEECFE] text-indigo-800 rounded-lg"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* --- RESEARCH STATUS COLUMN (DESKTOP ONLY) --- */}
        {/* Hidden on mobile (< md), completely untouched on desktop (>= md) */}
        <div className="hidden md:block md:border-l border-slate-100 md:pl-6 space-y-2">
          <h4 className="text-sm font-bold text-indigo-800 mb-1">Research Status</h4>
          <p className="text-xs text-slate-900 font-medium">{sourcesIndexedCount} Sources Indexed</p>
          <p className="text-xs text-slate-900 font-medium">{summariesGeneratedCount} Summaries Generated</p>
          
          <div className="pt-1 flex items-center gap-1.5 text-light-green text-xs font-semibold">
            <IoIosCheckmarkCircleOutline className="w-4 h-4 shrink-0" />
            <span>{researchStatus}</span>
          </div>
        </div>
      </div>
    </div>
  );
}