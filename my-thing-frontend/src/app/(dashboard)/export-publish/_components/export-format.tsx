"use client";

import React from "react";
import { FaFilePdf, FaFileWord, FaVolumeUp, FaYoutube, FaCopy } from "react-icons/fa";

export type FormatType = "pdf" | "docx" | "mp3" | "mp4";

interface ExportFormatProps {
  selectedFormat: FormatType;
  onSelectFormat: (format: FormatType) => void;
  onCopyText?: () => void;
}

export function ExportFormat({
  selectedFormat,
  onSelectFormat,
  onCopyText,
}: ExportFormatProps) {
  const formats = [
    { 
      id: "pdf", 
      label: "PDF", 
      subLabel: "Download", 
      icon: FaFilePdf, 
      activeColor: "text-red-500", 
      defaultColor: "text-red-500" 
    },
    { 
      id: "docx", 
      label: "DOCX", 
      subLabel: "Editable", 
      icon: FaFileWord, 
      activeColor: "text-blue-600", 
      defaultColor: "text-blue-600" 
    },
    { 
      id: "mp3", 
      label: "MP3", 
      subLabel: "Audio", 
      icon: FaVolumeUp, 
      activeColor: "text-indigo-600", 
      defaultColor: "text-slate-800" 
    },
    { 
      id: "mp4", 
      label: "MP4", 
      subLabel: "Video", 
      icon: FaYoutube, 
      activeColor: "text-red-600", 
      defaultColor: "text-red-600" 
    },
  ] as const;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
      <h2 className="text-sm font-bold text-slate-900">Export Format</h2>

      {/* 4 Cards in One Single Line */}
      <div className="flex items-center gap-3 w-full">
        {formats.map((fmt) => {
          const Icon = fmt.icon;
          const isActive = selectedFormat === fmt.id;

          return (
            <button
              key={fmt.id}
              type="button"
              onClick={() => onSelectFormat(fmt.id)}
              className={`flex-1 flex flex-col items-center justify-center p-3 h-28 rounded-2xl border transition-all cursor-pointer min-w-0 ${
                isActive
                  ? "bg-[#EEECFE] border-indigo-500 text-indigo-600 shadow-xs ring-1 ring-indigo-500"
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              <Icon 
                className={`w-6 h-6 mb-2 shrink-0 ${fmt.defaultColor}`} 
              />
              <span className="text-xs font-bold text-slate-900 truncate w-full text-center">
                {fmt.label}
              </span>
              <span className="text-[10px] text-slate-400 font-medium truncate w-full text-center">
                {fmt.subLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Copy Text Button */}
      <button
        type="button"
        onClick={onCopyText}
        className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-xs font-semibold text-slate-700 cursor-pointer"
      >
        <FaCopy className="w-4 h-4 text-slate-500" />
        <span>Copy Text</span>
      </button>
    </div>
  );
}