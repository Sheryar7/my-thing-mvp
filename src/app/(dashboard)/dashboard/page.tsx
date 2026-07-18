"use client";

import { Header } from "./_components/header";
import { ActiveProjectCard } from "./_components/active-project-card";
import { WorkflowGrid } from "./_components/workflow-grid";
import { DashboardLayout } from "./_components/dashboard-layout";
import { QuickStats } from "./_components/quick-stats";
import { RecentProjectsTable } from "./_components/recent-projects-table";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";

export default function DashboardPage() {
  const handleCreateProject = () => {
    console.log("Create new project initialized from FAB!");
    // Your actual modal opening or router pushing logic goes here
  };
  return (
    <DashboardLayout>
      {/* Primary dashboard header */}
      <Header />

      {/* Summary row: active project and workflow overview */}
      <div className="grid gap-8">
        <ActiveProjectCard
          title="Podcast Episode 12"
          progress={70}
          lastEdited="2 hours ago"
        />
        <WorkflowGrid />
      </div>

      {/* Main content grid: recent projects + quick stats */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(280px,340px)] gap-8 w-full items-stretch">
        <section className="min-w-0 flex flex-col min-h-0">
          <RecentProjectsTable />
        </section>

        <section className="min-w-0 flex flex-col min-h-0">
          <QuickStats />
        </section>
      </div>
      <FloatingActionButton 
              onClick={handleCreateProject} 
              ariaLabel="Create new project" 
            />
    </DashboardLayout>
  );
}
