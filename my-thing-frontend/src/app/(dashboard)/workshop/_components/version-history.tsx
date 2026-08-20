"use client";

import React from "react";

export interface VersionItem {
  id: string;
  versionLabel: string;
  author: string;
  timestamp: string;
}

interface VersionHistoryProps {
  versions?: VersionItem[];
  onSelectVersion?: (version: VersionItem) => void;
}

const DEFAULT_VERSIONS: VersionItem[] = [
  {
    id: "v1",
    versionLabel: "Version 1",
    author: "AI Generated",
    timestamp: "10:05AM",
  },
  {
    id: "v2",
    versionLabel: "Version 2",
    author: "Edited by John",
    timestamp: "11:15AM",
  },
  {
    id: "v3",
    versionLabel: "Version 3",
    author: "Edited by Alexa",
    timestamp: "11:35AM",
  },
];

export function VersionHistory({
  versions = DEFAULT_VERSIONS,
  onSelectVersion,
}: VersionHistoryProps) {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
      <h3 className="text-sm font-bold text-slate-900 tracking-tight">
        Version History
      </h3>

      <div className="space-y-2">
        {versions.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectVersion?.(item)}
            className="flex items-center justify-between gap-4 text-sm cursor-pointer px-0 py-2 transition"
          >
            <div className="flex items-baseline gap-3 min-w-0">
              <span className="font-semibold text-slate-900 truncate">
                {item.versionLabel}
              </span>
              <span className="text-slate-500 truncate">
                {item.author}
              </span>
            </div>
            <span className="text-slate-500 whitespace-nowrap">
              {item.timestamp}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}