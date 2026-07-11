"use client";

import React from "react";
import { StatsCard } from "./stats-card";

const stats = [
  { label: "Projects", value: 12, variant: "emerald" as const },
  { label: "Sources", value: 145, variant: "blue" as const },
  { label: "Scripts", value: 19, variant: "orange" as const },
  { label: "Published", value: 8, variant: "pink" as const },
];

export function QuickStats() {
  return (
    <section className="h-full w-full min-h-0 flex flex-col">
      <div className="flex items-center justify-between gap-4 mb-4 h-[28px]">
        <h3 className="text-lg font-semibold tracking-tight text-slate-900">Quick Stats</h3>
      </div>

      {/* Grid items sitting directly on layout wrapper to achieve Figma styling */}
      <div className="grid grid-cols-2 gap-4 w-full auto-rows-fr content-start">
        {stats.map((stat) => (
          <StatsCard 
            key={stat.label} 
            label={stat.label} 
            value={stat.value} 
            variant={stat.variant} 
          />
        ))}
      </div>
    </section>
  );
}

export default QuickStats;
