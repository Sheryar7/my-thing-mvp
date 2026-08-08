"use client";

import React, { useState } from "react";
import { IoSparklesOutline } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";
import { FiSend, FiEdit3, FiMinimize2, FiMaximize2 } from "react-icons/fi";
import { HiOutlineTranslate } from "react-icons/hi";
import { HiOutlineSparkles } from "react-icons/hi2";

interface QuickActionItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  prompt: string;
}

interface AssistantProps {
  prompt: string;
  onChange: (val: string) => void;
  onSubmit?: () => void;
  onResponse?: (answer: string, chunks?: any[]) => void;
  workspaceId?: string;
  selectedDocumentIds?: string[];
  isLoading?: boolean;
}

// Workshop Quick Actions
const WORKSHOP_ACTIONS: QuickActionItem[] = [
  { label: "Rewrite", icon: FiEdit3, prompt: "Rewrite the script" },
  { label: "Shorten", icon: FiMinimize2, prompt: "Shorten the script" },
  { label: "Expand", icon: FiMaximize2, prompt: "Expand the script" },
  { label: "Translate", icon: HiOutlineTranslate, prompt: "Translate the script" },
  { label: "Generate Title", icon: HiOutlineSparkles, prompt: "Generate title for the script" },
];

export function AIAssistant({
  prompt,
  onChange,
  onSubmit,
  onResponse,
  workspaceId,
  selectedDocumentIds = [],
  isLoading: externalLoading = false,
}: AssistantProps) {
  const [internalLoading, setInternalLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isLoading = externalLoading || internalLoading;

  const handleGenerate = async () => {
    if (onSubmit) {
      onSubmit();
      return;
    }

    if (!prompt.trim()) return;

    setInternalLoading(true);
    setError(null);
    setResponse(null);

    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_NESTJS_BACKEND_URL || "http://localhost:4000";

      const payload: Record<string, any> = {
        question: prompt,
        workspaceId: workspaceId || "8f11ccc8-308b-43a1-a8ad-2d7f727176df",
      };

      if (selectedDocumentIds && selectedDocumentIds.length > 0) {
        payload.documentIds = selectedDocumentIds;
      }

      const res = await fetch(`${backendUrl}/v1/rag/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setResponse(data.answer);
        if (onResponse) onResponse(data.answer, data.chunksRetrieved);
      } else {
        setError(data.message || data.error || "Failed to generate AI response.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setInternalLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-[20px] p-5 shadow-xs space-y-4">
      {/* Title */}
      <div className="space-y-0.5">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm tracking-wide">
          <IoSparklesOutline className="w-4 h-4 text-indigo-700 fill-indigo-600/10 stroke-[2.2]" />
          <span>AI Assistant</span>
        </div>
        <p className="text-[11px] text-slate-500">
          Ask AI to improve your script.
        </p>
      </div>

      {/* Suggested Prompt Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onChange("Make this easier to read aloud.")}
          className="text-[11px] text-slate-900 border border-slate-200 hover:bg-slate-200/60 rounded-lg px-2.5 py-1 font-medium transition cursor-pointer"
        >
          Make this easier to read aloud.
        </button>
      </div>

      {/* AI Header Label */}
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
        <IoSparklesOutline className="text-indigo-700 w-3.5 h-3.5" />
        <span>AI Assistant</span>
      </div>

      {/* AI Chat Bubble / Response Area */}
      <div className="bg-[#EEECFE] border border-indigo-100 rounded-xl p-3.5 space-y-2">
        <p className="text-xs text-indigo-900 leading-relaxed font-normal">
          {response ||
            "Here's a more engaging introduction with a stronger hook... Artificial Intelligence is reshaping healthcare at an unprecedented pace."}
        </p>
      </div>

      {error && (
        <div className="p-2.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">
          {error}
        </div>
      )}

      {/* Quick Action Pills */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold text-slate-900 tracking-tight">
          Quick Actions
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {WORKSHOP_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                type="button"
                onClick={() => onChange(action.prompt)}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-indigo-900 bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 rounded-lg px-2.5 py-1 shadow-2xs transition-all active:scale-95 cursor-pointer"
              >
                <Icon className="w-3.5 h-3.5 text-indigo-900 shrink-0" />
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Field with Inline Send Icon */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={prompt}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ask AI anything..."
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-3 pr-10 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="absolute right-2.5 text-indigo-600 hover:text-indigo-800 disabled:opacity-40 transition cursor-pointer"
        >
          {isLoading ? (
            <CgSpinner className="w-4 h-4 animate-spin" />
          ) : (
            <FiSend className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}