import React from "react";

interface DashboardSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

// Section wrapper with heading and optional description for dashboard sections.
export function DashboardSection({ title, description, children }: DashboardSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          ) : null}
        </div>
      </div>
      {children}
    </section>
  );
}

export default DashboardSection;
