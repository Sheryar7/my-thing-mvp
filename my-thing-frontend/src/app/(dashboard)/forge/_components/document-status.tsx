"use client";

import React from "react";

export function DocumentStatus() {
  return (
    <div className="hidden md:block bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-2.5">
      <h3 className="text-lg font-bold text-slate-900 tracking-tight">
        Document Status
      </h3>

      <div className="flex items-center">
        <span
          className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold rounded-full"
          style={{ backgroundColor: "#C2E8C7", color: "#006611" }}
        >
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: "#008015" }}
          />
          <span>Synced with Workshop</span>
        </span>
      </div>

      <p className="text-xs text-slate-500 font-medium pt-1">
        Last updated 2 minutes ago
      </p>
    </div>
  );
}