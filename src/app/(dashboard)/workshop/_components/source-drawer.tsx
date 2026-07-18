"use client";

import React from "react";
import { FaChevronRight } from "react-icons/fa6";
import { FiGlobe, FiFileText } from "react-icons/fi";

export function SourceDrawer() {
  const currentSources = [
    { id: 1, title: "OpenAI Blog", type: "Web" },
    { id: 2, title: "AI Ethics Report", type: "PDF" },
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-[20px] p-5 shadow-sm space-y-4">
      {/* 1. SOURCE LIST HEADER */}
      <h3 className="font-bold text-slate-800 text-sm tracking-wide">Selected Sources</h3>

      {/* 2. SOURCE ITEMS */}
      <div className="space-y-2">
        {currentSources.map((src) => (
          <div key={src.id} className="flex items-center justify-between p-3 border border-slate-100 hover:border-slate-200 rounded-xl transition-all cursor-pointer">
            {/* The extra horizontal spacing keeps the icon and label visually balanced without making the row feel crowded. */}
            <div className="flex items-center gap-3.5">
              {src.type === "Web" ? (
                // Web sources use a soft green accent to signal external reference material.
                <div className="w-10 h-10 rounded-xl bg-green-200 flex items-center justify-center text-emerald-500 shrink-0">
                  <FiGlobe className="w-5 h-5 stroke-[2.2]" />
                </div>
              ) : (
                // PDF sources use an indigo accent to differentiate document-based reference material.
                <div className="w-10 h-10 rounded-xl bg-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
                  <FiFileText className="w-5 h-5 stroke-[2.2]" />
                </div>
              )}
              <span className="text-[14px] font-bold text-slate-800">{src.title}</span>
            </div>
            <FaChevronRight className="w-3 h-3 text-slate-300" />
          </div>
        ))}
      </div>

      {/* 3. FOOTER CALL TO ACTION */}
      <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors block pt-1">
        View all 5 sources →
      </button>
    </div>
  );
}