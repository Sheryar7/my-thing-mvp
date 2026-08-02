"use client";

import React from "react";
import Link from "next/link";
import { FiGlobe, FiFile, FiBookOpen } from "react-icons/fi";
import { FaChevronRight } from "react-icons/fa6";

export interface SourceItemData {
  id: string;
  title: string;
  type: "Website" | "PDF" | "Notes";
  label: string;
  pagesCount?: number;
  updatedLabel: string;
}

interface SourceItemCardProps {
  source: SourceItemData;
  projectId: string;
}

export function SourceItemCard({ source, projectId }: SourceItemCardProps) {
  
  // Custom asset icons mapper based on dynamic document schemas
  const getSourceIcon = (type: string) => {
    if (type === "Website") return <FiGlobe className="w-5 h-5 text-emerald-600" />;
    if (type === "PDF") return <FiFile className="w-5 h-5 text-blue-600" />;
    return <FiBookOpen className="w-5 h-5 text-amber-600" />;
  };

  // Custom pill class conditional configurations
  const getBadgeStyle = (type: string) => {
    if (type === "Website") return "bg-emerald-50 text-emerald-600 border-emerald-100/30";
    if (type === "PDF") return "bg-blue-50 text-blue-600 border-blue-100/30";
    return "bg-amber-50 text-amber-600 border-amber-100/30";
  };

  return (
    <div className="group relative bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-4 flex items-center justify-between shadow-sm transition-all duration-150 w-full min-h-[76px]">
      
      {/* Content Cluster Blocks Layout */}
      <div className="flex items-center gap-4 min-w-0">
        {/* Left Side Styled Media Circle Icon Asset Wrapper Box */}
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
          source.type === "Website" ? "bg-emerald-50" : 
          source.type === "PDF" ? "bg-blue-50" : "bg-amber-50"
        }`}>
          {getSourceIcon(source.type)}
        </div>

        {/* Text Details Description Cluster */}
        <div className="flex flex-col min-w-0">
          <h4 className="font-bold text-slate-900 tracking-tight text-[15px] group-hover:text-indigo-600 transition-colors truncate">
            {source.title}
          </h4>
          
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {/* Context Sub-Label Tag Badge Component Layout */}
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border rounded-md leading-none ${getBadgeStyle(source.type)}`}>
              {source.label}
            </span>
            {source.pagesCount && (
              <span className="text-xs text-slate-400 font-medium leading-none">
                • {source.pagesCount} pages
              </span>
            )}
            <span className="text-xs text-slate-400 font-medium leading-none">
              • {source.updatedLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Right Side Functional Target Action Chevron Pointer */}
      <div className="text-slate-300 group-hover:text-slate-500 transition-colors shrink-0 pl-2">
        <FaChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
      </div>

      {/* 
        * DEVELOPERS NOTE FOR NEXT-STEP DEPLOYMENT:
        * This overlay mask targets the final sub-detail view path screen segment template.
        * Structure handles passing tracking flags via nested URL slugs.
        */}
      <Link 
        href={`/archive/${projectId}/${source.id}`}
        className="absolute inset-0 rounded-2xl z-10 cursor-pointer"
        aria-label={`Open details for ${source.title}`}
      />
    </div>
  );
}