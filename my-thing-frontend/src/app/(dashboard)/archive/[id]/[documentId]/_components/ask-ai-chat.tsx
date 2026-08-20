"use client";

import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { IoSparklesOutline } from "react-icons/io5";

export function AskAIChat() {
  const [chatInput, setChatInput] = useState("");

  return (
    <div className="w-full max-w-full min-w-0 bg-white border border-slate-200/90 rounded-2xl p-5 md:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between w-full max-w-full min-w-0">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">Ask AI about this document</h3>
        
        {/* Hidden on mobile, visible from sm breakpoint upwards */}
        <span className="hidden sm:inline-flex items-center gap-1.5 bg-[#C6F6D5] text-[#008000] text-sm font-semibold px-3 py-1 rounded-2xl">
          <span className="w-2.5 h-2.5 rounded-full bg-[#008000]" />
          Live
        </span>

      </div>

      <div className="space-y-3 pt-1 w-full max-w-full min-w-0">
        <div className="flex justify-end w-full max-w-full min-w-0">
          <div className="w-full max-w-[85%] bg-white border border-slate-200/80 rounded-2xl rounded-tr-sm px-4 py-2.5 text-xs font-medium text-slate-800 shadow-2xs">
            Give me a 30-second podcast intro from this paper.
          </div>
        </div>

        <div className="space-y-1.5 w-full max-w-full min-w-0">
          <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-xs pl-0.5 w-full max-w-full min-w-0">
            <IoSparklesOutline className="w-4 h-4 text-indigo-600 stroke-[2.5]" />
            <span className="text-slate-900 font-bold">AI Assistant</span>
          </div>

          <div className="w-full max-w-full min-w-0 bg-[#EEECFE] border-indigo-100/80 rounded-xl p-3.5 text-xs md:text-sm text-indigo-900 font-medium leading-relaxed">
            Here's a concise opening that highlights healthcare, ethics, and privacy while setting up the discussion naturally.
          </div>
        </div>
      </div>

      <div className="relative w-full pt-1">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Ask a follow-up about quotes, data, or script ideas..."
          className="w-full bg-white border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all shadow-2xs"
        />
        <button
          type="button"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center transition-colors"
          aria-label="Send query"
        >
          <FiSend className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}