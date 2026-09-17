"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardPageHeaderProps {
  border?: boolean;
  className?: string;
  children: ReactNode;
}

export function DashboardPageHeader({
  border = false,
  className,
  children,
}: DashboardPageHeaderProps) {
  return (
    <div
      className={cn(
        "w-full space-y-4 mb-8",
        border && "border-b border-slate-100 pb-5",
        className
      )}
    >
      {children}
    </div>
  );
}
