"use client";

import React from "react";
import { FaChevronRight } from "react-icons/fa6";
import { FiGlobe, FiFileText, FiCheck } from "react-icons/fi";

export interface SourceItem {
  id: string;
  title: string;
  type: "Web" | "PDF";
  selected: boolean;
}

interface SourceDrawerProps {
  sources: SourceItem[];
  onToggleSource: (id: string) => void;
}

export function SourceDrawer({ sources, onToggleSource }: SourceDrawerProps) {
  const activeCount = sources.filter((s) => s.selected).length;

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-4">
      {/* 1. SOURCE LIST HEADER */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-sm tracking-wide">
          Selected Sources
        </h3>
        <span className="text-xs font-semibold text-slate-400">
          {activeCount}/{sources.length} Active
        </span>
      </div>

      {/* 2. SOURCE ITEMS */}
      <div className="space-y-2">
        {sources.map((src) => (
          <div
            key={src.id}
            onClick={() => onToggleSource(src.id)}
            className={`flex items-center justify-between p-3 border rounded-2xl transition-all cursor-pointer ${
              src.selected
                ? "bg-slate-50/80 border-slate-200"
                : "bg-white border-slate-100 opacity-50"
            }`}
          >
            <div className="flex items-center gap-3.5">
              {src.type === "Web" ? (
                <div className="w-10 h-10 rounded-2xl bg-green-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <FiGlobe className="w-5 h-5 stroke-[2.2]" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                  <FiFileText className="w-5 h-5 stroke-[2.2]" />
                </div>
              )}
              <span className="text-[14px] font-bold text-slate-800">
                {src.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {src.selected ? (
                <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                  <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              ) : (
                <FaChevronRight className="w-3 h-3 text-slate-300" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 3. FOOTER CALL TO ACTION */}
      <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors block pt-1">
        View all sources &rarr;
      </button>
    </div>
  );
}