"use client";

import React from "react";
import { FiBold, FiItalic, FiUnderline, FiList, FiAlignLeft, FiLink, FiCpu } from "react-icons/fi";

interface RichEditorProps {
  text: string;
  onChange: (val: string) => void;
}

export function RichEditor({ text, onChange }: RichEditorProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-[24px] p-6 md:p-8 shadow-sm space-y-6 h-full flex flex-col justify-between">
      {/* 1. DOCUMENT HEADER & TOOLBAR */}
      {/* The title field is intentionally lightweight and uncontrolled because the current workflow treats it as a draft label rather than a persisted document property. */}
      <div className="space-y-4 flex-1 flex flex-col">
        <input
          type="text"
          defaultValue="Untitled Script"
          className="w-full text-2xl font-bold text-slate-900 border-none outline-none placeholder-slate-300 focus:ring-0 p-0"
        />

        {/* The toolbar stays visually quiet and compact so the writing surface remains the primary focus. */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-100 pb-3 text-slate-400">
          <button className="p-1.5 hover:text-slate-700 hover:bg-slate-50 rounded transition-colors"><FiBold /></button>
          <button className="p-1.5 hover:text-slate-700 hover:bg-slate-50 rounded transition-colors"><FiItalic /></button>
          <button className="p-1.5 hover:text-slate-700 hover:bg-slate-50 rounded transition-colors"><FiUnderline /></button>
          <div className="h-4 w-px bg-slate-200 mx-1" />
          <button className="p-1.5 hover:text-slate-700 hover:bg-slate-50 rounded transition-colors"><FiList /></button>
          <button className="p-1.5 hover:text-slate-700 hover:bg-slate-50 rounded transition-colors"><FiAlignLeft /></button>
          <button className="p-1.5 hover:text-slate-700 hover:bg-slate-50 rounded transition-colors"><FiLink /></button>
          <div className="h-4 w-px bg-slate-200 mx-1" />
          <button className="flex items-center gap-1 text-xs px-2.5 py-1 text-slate-500 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors font-semibold">
            <FiCpu />
            <span>AI</span>
          </button>
        </div>

        {/* 2. WRITING AREA */}
        {/* The textarea grows with the available panel height so the draft canvas feels continuous rather than constrained to a fixed box. */}
        <textarea
          value={text}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Start writing your research-grounded draft here..."
          className="w-full flex-1 min-h-[300px] border-none outline-none resize-none placeholder-slate-300 text-slate-700 leading-relaxed text-[15px] focus:ring-0 p-0 focus:outline-none"
        />
      </div>

      {/* 3. FOOTER COUNTER */}
      <div className="text-right text-xs font-semibold text-slate-400 pt-4 border-t border-slate-50">
        845 words
      </div>
    </div>
  );
}