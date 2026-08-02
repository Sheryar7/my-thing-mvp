"use client";

import React from "react";

interface ArchiveFilterBarProps {
  activeTab: "All" | "Active" | "Completed" | "Drafts";
  setActiveTab: (tab: "All" | "Active" | "Completed" | "Drafts") => void;
}

const tabs = ["All", "Active", "Completed", "Drafts"] as const;

export function ArchiveFilterBar({ activeTab, setActiveTab }: ArchiveFilterBarProps) {
  return (
    <div className="flex items-center gap-2 w-full overflow-x-auto pb-1 scrollbar-none">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 text-sm font-medium rounded-xl border transition-all duration-200 shadow-sm ${
              isActive
                ? "bg-indigo-50 border-indigo-200 text-indigo-600 font-semibold"
                : "bg-white border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}