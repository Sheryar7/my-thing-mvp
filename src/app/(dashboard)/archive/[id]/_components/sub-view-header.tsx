"use client";

import React from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

interface SubViewHeaderProps {
  projectName: string;
  sourcesCount: number;
  notesCount: number;
  updatedAtLabel: string;
}

export function SubViewHeader({
  projectName,
  sourcesCount,
  notesCount,
  updatedAtLabel,
}: SubViewHeaderProps) {
  return (
    <div className="w-full space-y-6">
      {/* 1. BREADCRUMBS TRAIL TRAVERSAL */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 font-medium">
        <Link href="/archive" className="hover:text-slate-600 transition-colors">
          Archive
        </Link>
        <FaChevronRight className="w-3 h-3 text-slate-300 stroke-[2]" />
        <span className="text-slate-600 truncate max-w-[200px]">{projectName}</span>
      </nav>

      {/* 2. CORE HEADER HERO AREA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1 w-full">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            {projectName}
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            {sourcesCount} Sources{" "}
            <span className="text-slate-300 mx-1">•</span> {notesCount} Notes{" "}
            <span className="text-slate-300 mx-1">•</span> {updatedAtLabel}
          </p>
        </div>

        {/* Action button */}
        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all duration-150 whitespace-nowrap self-start sm:self-center"
        >
          Use in Workshop →
        </button>
      </div>
    </div>
  );
}