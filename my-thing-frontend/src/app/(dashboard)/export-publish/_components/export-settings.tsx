"use client";

import React from "react";

interface ExportSettingsProps {
  fileName: string;
  setFileName: (val: string) => void;
  quality: string;
  setQuality: (val: string) => void;
  includeSources: boolean;
  setIncludeSources: (val: boolean) => void;
}

export function ExportSettings({
  fileName,
  setFileName,
  quality,
  setQuality,
  includeSources,
  setIncludeSources,
}: ExportSettingsProps) {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs h-full flex flex-col justify-between">
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-4">Export Settings</h2>

        <div className="space-y-3.5">
          {/* File Name Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">File Name</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 transition-colors text-slate-800"
              placeholder="Enter file name..."
            />
          </div>

          {/* Quality Select Dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Quality</label>
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 transition-colors text-slate-800 bg-white cursor-pointer"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Checkbox: Include Sources */}
      <label className="flex items-center gap-2 pt-3 cursor-pointer select-none mt-2">
        <input
          type="checkbox"
          checked={includeSources}
          onChange={(e) => setIncludeSources(e.target.checked)}
          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
        />
        <span className="text-xs font-bold text-slate-700">Include Sources</span>
      </label>
    </div>
  );
}