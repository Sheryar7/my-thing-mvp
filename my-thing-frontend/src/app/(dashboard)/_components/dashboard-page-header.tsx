"use client";

import { type ReactNode } from "react";

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
  const wrapperClasses = [
    "w-full space-y-4 mb-8",
    border ? "border-b border-slate-100 pb-5" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={wrapperClasses}>{children}</div>;
}
