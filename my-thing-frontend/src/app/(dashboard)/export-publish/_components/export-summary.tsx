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
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
      <h2 className="text-sm font-bold text-slate-900">Summary</h2>

      <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50/50">
          <span className="text-xs font-medium text-slate-500">Project</span>
          <span className="text-xs font-bold text-slate-900">{projectName}</span>
        </div>
        <div className="flex items-center justify-between px-4 py-2.5">
          <span className="text-xs font-medium text-slate-500">Format</span>
          <span className="text-xs font-bold text-slate-900 uppercase">{format}</span>
        </div>
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50/50">
          <span className="text-xs font-medium text-slate-500">Destination</span>
          <span className="text-xs font-bold text-slate-900">{destination}</span>
        </div>
      </div>
    </div>
  );
}