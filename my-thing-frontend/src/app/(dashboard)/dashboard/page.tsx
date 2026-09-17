"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "./_components/header";
import { ActiveProjectCard } from "./_components/active-project-card";
import { WorkflowGrid } from "./_components/workflow-grid";
import { RecentProjectsTable } from "./_components/recent-projects-table";
import { QuickStats } from "./_components/quick-stats";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { ARCHIVE_PROJECTS, type ProjectItem } from "@/lib/projects-data";

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectItem[]>(ARCHIVE_PROJECTS);

  useEffect(() => {
    // Reset any preserved scroll position to ensure page loads cleanly at the top
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // Sync with backend projects if available
    async function loadLiveProjects() {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_NESTJS_BACKEND_URL || "http://localhost:4000";
        const res = await fetch(`${backendUrl}/v1/projects`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const mapped: ProjectItem[] = data.map((item: any, idx: number) => ({
              id: item.id || `proj-${idx}`,
              name: item.name || item.title || "Untitled Project",
              category: item.category || "General",
              stage: item.stage || (idx % 4 === 0 ? "Workshop" : idx % 4 === 1 ? "Lens" : idx % 4 === 2 ? "Forge" : "Archive"),
              updated: item.updatedAtLabel?.replace("Updated ", "") || item.updated || "Recently",
              progress: item.progress || Math.max(30, 95 - idx * 15),
            }));
            setProjects(mapped);
          }
        }
      } catch {
        // Quietly fallback to ARCHIVE_PROJECTS
      }
    }
    loadLiveProjects();
  }, []);

  const activeProject = projects[0] || ARCHIVE_PROJECTS[0];

  return (
    <div className="w-full space-y-7 md:space-y-8 font-sans antialiased">
      {/* 1. Header Section: Good morning greeting + (New Project, Bell, Avatar on Desktop) */}
      <Header />

      {/* 2. Active Project Banner */}
      <ActiveProjectCard
        title={activeProject.name}
        progress={activeProject.progress}
        lastEdited={activeProject.updated}
      />

      {/* 3. Workflow Section: 4 colored cards in single desktop row, 2x2 on mobile */}
      <WorkflowGrid />

      {/* 4. Parallel Grid: Recent Projects (left) + Quick Stats (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-stretch">
        <section className="min-w-0 lg:col-span-7 xl:col-span-8 flex flex-col">
          <RecentProjectsTable projects={projects} />
        </section>

        <section className="min-w-0 lg:col-span-5 xl:col-span-4 flex flex-col">
          <QuickStats />
        </section>
      </div>

      {/* 5. Mobile Floating Action Button (FAB) matching Figma mobile design */}
      <FloatingActionButton
        onClick={() => router.push("/archive")}
        ariaLabel="Create new project"
      />
    </div>
  );
}
