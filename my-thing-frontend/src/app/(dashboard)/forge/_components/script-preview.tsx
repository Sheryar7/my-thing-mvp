"use client";

import React from "react";

interface ScriptPreviewProps {
  scriptText?: string;
}

export function ScriptPreview({ scriptText }: ScriptPreviewProps) {
  const defaultText =
    "Artificial Intelligence (AI) is transforming healthcare, education, transportation, and communication by making tasks easier and more efficient. However, it also raises ethical concerns. Bias, privacy, and transparency are the main ethical challenges of AI. Fair regulations are needed to ensure AI is safe, responsible, and benefits everyone.";

  return (
    <div className="w-full p-6 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-3">
      <h2 className="text-lg font-bold text-slate-900 tracking-tight">
        Script Preview
      </h2>
      <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
        {scriptText || defaultText}
      </p>
    </div>
  );
}