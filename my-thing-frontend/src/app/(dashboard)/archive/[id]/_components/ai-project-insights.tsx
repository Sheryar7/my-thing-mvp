"use client";

import React from "react";
import { HiSparkles } from "react-icons/hi2";
import { FiCheckCircle } from "react-icons/fi";

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
        <p className="text-xs text-slate-400 font-medium mt-0.5">
          AI analyzed all uploaded sources and extracted the key information.
        </p>
      </div>

      {/* Grid Layout for Summary, Topics, and Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
        {/* Summary Column */}
        <div>
          <h4 className="text-sm font-bold text-indigo-800 mb-2">Summary</h4>
          <p className="text-xs leading-relaxed text-slate-900 font-medium">
            {summary}
          </p>
        </div>

        {/* Key Topics Column */}
        <div className="md:border-l border-slate-100 md:pl-6">
          <h4 className="text-sm font-bold text-indigo-800 mb-2">Key Topics</h4>
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

        {/* Research Status Column */}
        <div className="md:border-l border-slate-100 md:pl-6 space-y-2">
          <h4 className="text-sm font-bold text-indigo-800 mb-1">Research Status</h4>
          <p className="text-xs text-slate-900 font-medium">{sourcesIndexedCount} Sources Indexed</p>
          <p className="text-xs text-slate-900 font-medium">{summariesGeneratedCount} Summaries Generated</p>
          
          <div className="pt-2 flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
            <FiCheckCircle className="w-4 h-4 shrink-0" />
            <span>{researchStatus}</span>
          </div>
        </div>
      </div>
    </div>
  );
}