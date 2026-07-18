"use client";

import React from "react";
import { IoSparklesOutline } from "react-icons/io5";

interface AssistantProps {
  prompt: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
}

export function AIAssistant({ prompt, onChange, onSubmit }: AssistantProps) {
  const maxChars = 500;

  return (
    <div className="bg-white border border-slate-200/90 rounded-[20px] p-5 shadow-sm space-y-4">
      {/* 1. INPUT & COMPOSER UI */}
      <div className="flex items-center gap-2 text-slate-800 font-bold text-sm tracking-wide">
        <IoSparklesOutline className="w-4 h-4 text-amber-500 fill-amber-500/10 stroke-[2.2]" />
        <span>AI Assistant</span>
      </div>

      {/* 2. PROMPT ENTRY & CHARACTER COUNT */}
      <div className="relative">
        <textarea
          maxLength={maxChars}
          value={prompt}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Rewrite paragraph...\nGenerate intro...\nSummarize...`}
          className="w-full min-h-[110px] bg-slate-50/50 border border-slate-200 rounded-xl p-3 text-sm text-slate-700 placeholder-slate-400/80 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
        />
        {/* The counter is anchored to the bottom-right so the input remains visually calm while still giving immediate feedback. */}
        <div className="absolute right-3 bottom-3 text-[10px] font-bold text-slate-400">
          {prompt.length}/{maxChars}
        </div>
      </div>

      {/* 3. SUBMIT ACTION */}
      <button
        type="button"
        onClick={onSubmit}
        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm active:scale-[0.98]"
      >
        Generate
      </button>
    </div>
  );
}