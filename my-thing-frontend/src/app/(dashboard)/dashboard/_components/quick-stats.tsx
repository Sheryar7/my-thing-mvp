"use client";

import React from "react";
import { StatsCard } from "./stats-card";

const stats = [
  { label: "Projects", value: 12, variant: "green" as const },
  { label: "Sources", value: 145, variant: "purple" as const },
  { label: "Scripts", value: 19, variant: "orange" as const },
  { label: "Published", value: 8, variant: "pink" as const },
];

export function QuickStats() {
  return (
    <section className="w-full h-full font-sans antialiased flex flex-col space-y-4">
      <div className="flex items-center justify-between h-[32px]">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
          Quick Stats
        </h2>
      </div>

      {/* 2x2 Grid of Stat Cards matching Recent Projects height */}
      <div className="grid grid-cols-2 gap-4 w-full flex-1">
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
