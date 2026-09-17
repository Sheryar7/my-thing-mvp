"use client";

import React from "react";

interface ExportSummaryProps {
  projectName: string;
  format: string;
  destination: string;
}

export function ExportSummary({
  projectName,
  format,
  destination,
}: ExportSummaryProps) {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
      <h2 className="text-base font-bold text-slate-900">Summary</h2>

      <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50/50 gap-3">
          <span className="text-xs font-medium text-slate-500 shrink-0">Project</span>
          <span className="text-xs font-bold text-slate-900 truncate text-right max-w-[220px] sm:max-w-[280px]">
            {projectName}
          </span>
        </div>
        <div className="flex items-center justify-between px-4 py-3 gap-3">
          <span className="text-xs font-medium text-slate-500 shrink-0">Format</span>
          <span className="text-xs font-bold text-slate-900 uppercase">{format}</span>
        </div>
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50/50 gap-3">
          <span className="text-xs font-medium text-slate-500 shrink-0">Destination</span>
          <span className="text-xs font-bold text-slate-900">{destination}</span>
        </div>
      </div>
    </div>
  );
}