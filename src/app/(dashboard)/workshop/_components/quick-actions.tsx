"use client";

import React from "react";
import { FiEdit3 , FiFileText, FiGlobe } from "react-icons/fi";
import { IoSparklesOutline } from "react-icons/io5";
import { LuTarget } from "react-icons/lu";

interface QuickActionsProps {
  onActionTrigger: (key: string) => void;
}

export function QuickActions({ onActionTrigger }: QuickActionsProps) {
  const actions = [
    {
      label: "Generate Intro",
      key: "intro",
      color: "bg-violet-200/60 text-violet-600 border-violet-100",
      icon: IoSparklesOutline
    },
    {
      label: "Rewrite",
      key: "rewrite",
      color: "bg-sky-200/60 text-sky-600 border-sky-100",
      icon: FiEdit3 
    },
    {
      label: "Summary",
      key: "summary",
      color: "bg-green-200/60 text-green-600 border-green-100",
      icon: FiFileText
    },
    {
      label: "Improve Tone",
      key: "tone",
      color: "bg-orange-200/60 text-orange-600 border-orange-100",
      icon: LuTarget
    },
    {
      label: "Translate",
      key: "translate",
      color: "bg-rose-200/60 text-rose-600 border-rose-100",
      icon: FiGlobe
    },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-[20px] p-5 shadow-sm space-y-3.5">
      {/* 1. ACTION GROUP HEADER */}
      <h3 className="font-bold text-slate-800 text-sm tracking-wide">Quick Actions</h3>

      {/* 2. ACTION CHIP WRAP */}
      {/* The chip row is allowed to wrap so the control remains usable when the sidebar becomes narrow without sacrificing the visual hierarchy. */}
      <div className="flex flex-wrap gap-2">
        {actions.map((act) => (
          <button
            key={act.key}
            type="button"
            onClick={() => onActionTrigger(act.key)}
            // The action key is intentionally normalized so the parent can route multiple UI triggers to the same workflow handler.
            className={`flex items-center gap-1.5 px-3.5 py-2 border rounded-xl text-[11px] font-bold transition-all hover:scale-[1.02] active:scale-95 ${act.color}`}
          >
            <act.icon className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>{act.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}