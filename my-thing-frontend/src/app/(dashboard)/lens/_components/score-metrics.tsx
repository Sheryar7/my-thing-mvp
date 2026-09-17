"use client";

import React from "react";
import { ScoreRing } from "./score-ring";

interface ScoreMetricsProps {
  overallScore?: number;
  grammarScore?: number;
  accuracyScore?: number;
  qualityScore?: number;
}

export function ScoreMetrics({
  overallScore = 90,
  grammarScore = 90,
  accuracyScore = 94,
  qualityScore = 91,
}: ScoreMetricsProps) {
  const statCards = [
    {
      title: "Grammar",
      score: `${grammarScore}%`,
      subtitle: "No major issues found",
    },
    {
      title: "Accuracy",
      score: `${accuracyScore}%`,
      subtitle: "Most information verified",
    },
    {
      title: "Quality",
      score: `${qualityScore}%`,
      subtitle: "Clear and professional writing",
    },
  ];

  return (
    <div className="w-full space-y-4 md:space-y-0">
      {/* ---------------- MOBILE ONLY STANDALONE SCORE GAUGE (< md) ---------------- */}
      <div className="flex md:hidden flex-col items-center justify-center py-2">
        <ScoreRing score={overallScore} size={112} strokeWidth={8} label="Excellent" />
      </div>

      {/* ---------------- DESKTOP + TABLET GRID ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5 w-full items-stretch">
        {/* 1. Overall Content Score Card (Tablet & Desktop >= md) */}
        <div className="hidden md:flex md:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-5 lg:p-6 shadow-2xs flex-col justify-between h-full">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mb-3">
            Overall Content Score
          </h2>

          <div className="flex items-center gap-5 lg:gap-6 my-auto pt-1">
            <ScoreRing score={overallScore} size={92} strokeWidth={8} label="Excellent" />
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              Your content is clear, well-structured, and ready for final review.
            </p>
          </div>
        </div>

        {/* 2. Stat Cards Grid (Grammar, Accuracy, Quality) */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {statCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-2xs flex flex-col items-start sm:items-center justify-center text-left sm:text-center h-full"
            >
              {/* Card Title */}
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                {card.title}
              </h3>

              {/* Mobile Layout: Inline compact score + subtitle */}
              <div className="sm:hidden flex items-center flex-wrap gap-1.5 mt-1">
                <span className="text-xs font-semibold text-slate-900">
                  {card.score}
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-slate-500 font-medium">
                  {card.subtitle}
                </span>
              </div>

              {/* Desktop Layout: Large score display */}
              <span className="hidden sm:block text-2xl lg:text-3xl font-extrabold text-slate-900 my-1 sm:my-2 tracking-tight">
                {card.score}
              </span>

              {/* Desktop Layout: Subtitle */}
              <p className="hidden sm:block text-xs text-slate-400 font-medium leading-normal max-w-[140px]">
                {card.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}