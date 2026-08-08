"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiGlobe, FiPlay, FiFileText, FiMoreVertical, FiCheck } from "react-icons/fi";

export interface SourceItemData {
  id: string;
  title: string;
  type: "Website" | "PDF" | "Notes" | "Video";
  label: string;
  pagesCount?: number;
  updatedLabel: string;
  duration?: string;
  aiStatus?: string;
  includeInScript?: boolean;
}

interface SourceItemCardProps {
  source: SourceItemData;
  projectId: string;
}

export function SourceItemCard({ source, projectId }: SourceItemCardProps) {
  const [included, setIncluded] = useState(source.includeInScript ?? true);

  // Dynamic AI status helper based on type if not provided
  const getAiStatus = () => {
    if (source.aiStatus) return source.aiStatus;
    if (source.type === "Website") return "AI summarized ✓";
    if (source.type === "Video") return "Transcript Generated ✓";
    if (source.type === "PDF") return "Summary Available ✓";
    return "AI Analyzed ✓";
  };

  // Render type-specific icon with purple circular background matching Figma
  const getSourceIcon = () => {
    if (source.type === "Website") {
      return <FiGlobe className="w-5 h-5 text-indigo-900" />;
    }
    if (source.type === "Video") {
      return <FiPlay className="w-5 h-5 text-indigo-900 ml-0.5" />;
    }
    return (
      <div className="flex flex-col items-center justify-center text-indigo-900">
        <FiFileText className="w-4 h-4" />
        <span className="text-[8px] font-black leading-none mt-[1px]">PDF</span>
      </div>
    );
  };

  return (
    <div className="group relative bg-white border border-slate-200/80 hover:border-indigo-300 rounded-2xl p-5 shadow-xs transition-all duration-200 flex flex-col justify-between w-full">
      
      {/* Top Main Row */}
      <div className="flex items-start justify-between gap-3">
        {/* Left Icon Container */}
        <div className="w-12 h-12 rounded-full bg-[#EEECFE] flex items-center justify-center shrink-0">
          {getSourceIcon()}
        </div>

        {/* Center Details Block */}
        <div className="flex flex-col min-w-0 flex-1 pt-0.5">
          <h4 className="font-bold text-slate-900 text-sm tracking-tight leading-snug truncate group-hover:text-indigo-800 transition-colors">
            {source.title}
          </h4>
          
          <p className="text-[11px] text-slate-400 font-medium mt-1">
            {source.label}
          </p>

          <p className="text-[11px] text-slate-400 font-medium leading-tight">
            {source.duration ? source.duration : source.pagesCount ? `${source.pagesCount} Pages` : source.updatedLabel}
          </p>
        </div>

        {/* Right 3-Dots Menu Icon */}
        <button 
          type="button" 
          aria-label="Options"
          className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100/80 shrink-0 relative z-20"
        >
          <FiMoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Middle AI Status Badge Pill */}
      <div className="mt-4">
        <span className="inline-flex items-center text-[10px] font-bold text-indigo-900 bg-[#EEECFE] px-2.5 py-1 rounded-lg">
          {getAiStatus()}
        </span>
      </div>

      {/* Subtle Divider Line */}
      <div className="w-full h-[1px] bg-slate-100 my-3" />

      {/* Bottom Footer Checkbox Line */}
      <div className="flex items-center gap-2 relative z-20">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIncluded(!included);
          }}
          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer ${
            included 
              ? "bg-indigo-600 border-indigo-600 text-white" 
              : "border-slate-300 bg-white hover:border-indigo-400"
          }`}
        >
          {included && <FiCheck className="w-3 h-3 stroke-[3]" />}
        </button>

        <span 
          onClick={(e) => {
            e.stopPropagation();
            setIncluded(!included);
          }} 
          className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 cursor-pointer select-none"
        >
          Include in Script
        </span>
      </div>

      {/* Overlay Link to navigate to source sub-detail */}
      <Link 
        href={`/archive/${projectId}/${source.id}`}
        className="absolute inset-0 rounded-2xl z-10"
        aria-label={`Open details for ${source.title}`}
      />
    </div>
  );
}