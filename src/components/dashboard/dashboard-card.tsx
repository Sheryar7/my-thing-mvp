"use client";

import React from "react";

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
}

// Reusable dashboard card wrapper for consistent border, radius, and elevation.
export function DashboardCard({ children, className = "" }: DashboardCardProps) {
  return (
    <div className={`rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-shadow duration-200 ${className}`}>
      {children}
    </div>
  );
}

export default DashboardCard;
