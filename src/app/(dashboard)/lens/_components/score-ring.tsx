"use client";

import React from "react";

interface ScoreRingProps {
  score?: number; // e.g. 90
  size?: number;  // Ring diameter in px (default 96px / w-24)
  strokeWidth?: number;
  color?: string; // Hex or Tailwind color class for active arc
  label?: string; // Text under the score, e.g. "Excellent"
}

export function ScoreRing({
  score = 90,
  size = 92,
  strokeWidth = 8,
  color = "#5D5FEF", // Matching the primary purple/indigo theme
  label = "Excellent",
}: ScoreRingProps) {
  // SVG Circle parameters
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate filled stroke length based on score percentage (0 to 100)
  const clampedScore = Math.min(Math.max(score, 0), 100);
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center shrink-0">
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          {/* Background Track Circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#E2E8F0" // slate-200
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Active Progress Circle Arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Percentage Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base font-bold text-slate-900 tracking-tight">
            {clampedScore}%
          </span>
        </div>
      </div>

      {/* Label Under Gauge */}
      {label && (
        <span className="mt-2 text-xs font-semibold text-indigo-600 tracking-wide">
          {label}
        </span>
      )}
    </div>
  );
}