"use client";

import React, { useState } from "react";
import { IoSparklesOutline } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";

interface AssistantProps {
  prompt: string;
  onChange: (val: string) => void;
  onSubmit?: () => void;
  onResponse?: (answer: string, chunks?: any[]) => void;
  workspaceId?: string;
  isLoading?: boolean;
}

export function AIAssistant({
  prompt,
  onChange,
  onSubmit,
  onResponse,
  workspaceId,
  isLoading: externalLoading = false,
}: AssistantProps) {
  const maxChars = 500;
  const [internalLoading, setInternalLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [matchedCount, setMatchedCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const isLoading = externalLoading || internalLoading;

  const handleGenerate = async () => {
    // 1. If a custom onSubmit is provided by parent, call it
    if (onSubmit) {
      onSubmit();
      return;
    }

    // 2. Default RAG API Route call
    if (!prompt.trim()) return;

    setInternalLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: prompt,
          workspaceId: workspaceId || "8f11ccc8-308b-43a1-a8ad-2d7f727176df", // Fallback to current active workspace ID
        }),
      });

      const data = await res.json();

      if (data.success) {
        setResponse(data.answer);
        setMatchedCount(data.matchedChunks?.length || 0);

        if (onResponse) {
          onResponse(data.answer, data.matchedChunks);
        }
      } else {
        setError(data.error || "Failed to generate AI response.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setInternalLoading(false);
    }
  };

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
          disabled={isLoading}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Rewrite paragraph...\nGenerate intro...\nSummarize...`}
          className="w-full min-h-[110px] bg-slate-50/50 border border-slate-200 rounded-xl p-3 text-sm text-slate-700 placeholder-slate-400/80 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none disabled:opacity-60"
        />
        <div className="absolute right-3 bottom-3 text-[10px] font-bold text-slate-400">
          {prompt.length}/{maxChars}
        </div>
      </div>

      {/* 3. SUBMIT ACTION */}
      <button
        type="button"
        onClick={handleGenerate}
        disabled={isLoading || !prompt.trim()}
        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-sm rounded-xl transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
      >
        {isLoading ? (
          <>
            <CgSpinner className="w-4 h-4 animate-spin" />
            <span>Generating...</span>
          </>
        ) : (
          <span>Generate</span>
        )}
      </button>

      {/* 4. AI GENERATED RESPONSE OUTPUT */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">
          {error}
        </div>
      )}

      {response && (
        <div className="mt-3 p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
            <span>Result</span>
            {matchedCount > 0 && (
              <span className="text-emerald-600 font-medium">
                {matchedCount} sources matched
              </span>
            )}
          </div>
          <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
            {response}
          </p>
        </div>
      )}
    </div>
  );
}