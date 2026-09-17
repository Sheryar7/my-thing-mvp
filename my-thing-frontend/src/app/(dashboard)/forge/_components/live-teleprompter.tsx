"use client";

import React, { useEffect, useRef } from "react";
import { FiMaximize2 } from "react-icons/fi";

export interface TeleprompterBlock {
  blockIndex: number;
  text: string;
  wordCount: number;
  startTimeSeconds: number;
  durationSeconds: number;
}

interface LiveTeleprompterProps {
  lines: string[];
  activeLineIndex: number;
  onSelectLine: (index: number) => void;
  textSize?: number;
  boldness?: "Light" | "Regular" | "Bold";
  alignment?: "left" | "center" | "right";
  currentTimeLabel?: string;
  totalTimeLabel?: string;
  progressPercent?: number;
}

export function LiveTeleprompter({
  lines,
  activeLineIndex = 2,
  onSelectLine,
  textSize = 18,
  boldness = "Regular",
  alignment = "center",
  currentTimeLabel = "2:15",
  totalTimeLabel = "4:20",
  progressPercent = 50,
}: LiveTeleprompterProps) {
  const activeLineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll inside teleprompter so the active line stays centered
  useEffect(() => {
    if (activeLineRef.current && containerRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeLineIndex]);

  const fontClass =
    boldness === "Bold"
      ? "font-bold"
      : boldness === "Light"
      ? "font-normal text-slate-700"
      : "font-medium text-slate-900";

  const alignClass =
    alignment === "left"
      ? "text-left"
      : alignment === "right"
      ? "text-right"
      : "text-center";

  // Handle clicking on the scrubber bar to jump to percentage
  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (lines.length > 0) {
      const targetIdx = Math.min(lines.length - 1, Math.round(clickRatio * (lines.length - 1)));
      onSelectLine(targetIdx);
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xs relative flex flex-col justify-between min-h-[550px] lg:min-h-[580px] h-full w-full select-none">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between w-full shrink-0">
        <span className="inline-block px-3.5 py-1 bg-[#EDE9FE] text-[#7C3AED] text-[11px] font-bold rounded-full tracking-wider uppercase">
          LIVE TELEPROMPTER
        </span>
        <button
          type="button"
          className="text-slate-400 hover:text-slate-700 transition cursor-pointer p-1"
          title="Fullscreen"
        >
          <FiMaximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Script Lines Container: Expanded preview area with smooth center scrolling */}
      <div
        ref={containerRef}
        className={`flex-1 min-h-[380px] max-h-[440px] overflow-y-auto my-3 py-2 px-2 space-y-2 w-full max-w-[560px] mx-auto scroll-smooth ${alignClass}`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        {/* Top Spacer to allow first line to center cleanly */}
        <div className="h-28 shrink-0 pointer-events-none" />

        {lines.map((line, idx) => {
          const isActive = idx === activeLineIndex;

          if (isActive) {
            return (
              <div
                key={idx}
                ref={activeLineRef}
                onClick={() => onSelectLine(idx)}
                className="w-full rounded-xl sm:rounded-2xl px-5 sm:px-6 py-2.5 sm:py-3 bg-[#F5F3FF] my-2 cursor-pointer transition-all duration-200 shadow-2xs"
              >
                <p
                  className={`text-lg sm:text-xl font-bold tracking-tight text-[#312E81] leading-snug ${alignClass}`}
                  style={{ fontSize: textSize ? `${Math.max(16, textSize)}px` : undefined }}
                >
                  {line}
                </p>
              </div>
            );
          }

          return (
            <div
              key={idx}
              onClick={() => onSelectLine(idx)}
              className="py-1 px-3 rounded-lg hover:bg-slate-50/80 cursor-pointer transition-colors"
            >
              <p
                className={`text-base sm:text-lg ${fontClass} leading-snug transition-colors ${alignClass}`}
                style={{ fontSize: textSize ? `${Math.max(14, textSize - 2)}px` : undefined }}
              >
                {line}
              </p>
            </div>
          );
        })}

        {/* Bottom Spacer to allow last line to center cleanly */}
        <div className="h-28 shrink-0 pointer-events-none" />
      </div>

      {/* Bottom Audio Scrubber Bar matching Figma Design */}
      <div className="w-full max-w-[540px] mx-auto flex items-center gap-3 text-xs font-semibold pt-4 shrink-0">
        <span className="shrink-0 text-slate-400 text-xs font-medium min-w-[32px]">
          {currentTimeLabel}
        </span>

        {/* Progress Track with Rounded Thumb */}
        <div
          onClick={handleScrubberClick}
          className="relative flex-1 h-1.5 sm:h-2 rounded-full cursor-pointer flex items-center"
          style={{ backgroundColor: "#F1F3F9" }}
        >
          {/* Active Progress Track */}
          <div
            className="absolute left-0 top-0 bottom-0 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%`, backgroundColor: "#523BE4" }}
          />
          {/* Thumb Circle */}
          <div
            className="absolute w-3.5 h-3.5 rounded-full shadow-sm transition-all duration-300"
            style={{
              left: `${progressPercent}%`,
              transform: "translateX(-50%)",
              backgroundColor: "#523BE4",
              border: "2px solid #FFFFFF",
            }}
          />
        </div>

        <span className="shrink-0 text-slate-400 text-xs font-medium min-w-[32px] text-right">
          {totalTimeLabel}
        </span>
      </div>
    </div>
  );
}

export default LiveTeleprompter;