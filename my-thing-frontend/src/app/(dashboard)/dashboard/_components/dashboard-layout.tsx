import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    // Clean, wide layout matching the wide SaaS framework behavior
    <div className="w-full">
      <div className="space-y-8">{children}</div>
    </div>
  );
}

export default DashboardLayout;