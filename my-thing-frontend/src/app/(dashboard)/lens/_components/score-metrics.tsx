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
      subtitle: "No major issues found.",
    },
    {
      title: "Accuracy",
      score: `${accuracyScore}%`,
      subtitle: "Most information is verified.",
    },
    {
      title: "Quality",
      score: `${qualityScore}%`,
      subtitle: "Clear, professional, and easy to read.",
    },
  ];

  return (
    <div className="w-full space-y-4 lg:space-y-0">
      {/* ---------------- MOBILE ONLY SCORE RING ---------------- */}
      {/* Standalone gauge without card container to match Figma */}
      <div className="flex lg:hidden flex-col items-center justify-center py-2">
        <ScoreRing score={overallScore} size={110} strokeWidth={8} label="Excellent" />
      </div>

      {/* ---------------- DESKTOP + MOBILE GRID ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 w-full">
        {/* 1. Overall Content Score Card (Desktop Only: hidden on mobile) */}
        <div className="hidden lg:flex lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs flex-col justify-between">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-4">
            Overall Content Score
          </h2>

          <div className="flex items-center gap-6 my-auto">
            <ScoreRing score={overallScore} size={96} strokeWidth={8} label="Excellent" />
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              Your content is clear, well-structured, and ready for final review.
            </p>
          </div>
        </div>

        {/* 2. Stat Cards Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {statCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-2xs flex flex-col items-start sm:items-center justify-center text-left sm:text-center"
            >
              {/* Card Title */}
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                {card.title}
              </h3>

              {/* Mobile Layout: Inline compact score + subtitle */}
              <div className="sm:hidden flex items-center gap-1.5 mt-1">
                <span className="text-xs font-semibold text-slate-500">
                  {card.score}
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-slate-400 font-medium">
                  {card.subtitle}
                </span>
              </div>

              {/* Desktop Layout: Large score display */}
              <span className="hidden sm:block text-3xl font-extrabold text-slate-900 my-2 tracking-tight">
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