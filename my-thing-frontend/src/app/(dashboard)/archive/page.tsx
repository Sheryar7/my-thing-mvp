"use client";

import React, { useState, useEffect } from "react";
import { ArchiveHeader } from "./_components/archive-header";
import { ArchiveFilterBar } from "./_components/archive-filter-bar";
import { ProjectCard, ProjectData } from "./_components/project-card";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { DashboardPageHeader } from "../_components/dashboard-page-header";

// High-fidelity Mock Data matching the new Figma design
const MOCK_PROJECTS: ProjectData[] = [
  {
    id: "black-holes",
    name: "The Physics of Black Holes & Spacetime",
    category: "Astrophysics & Cosmology",
    sourcesCount: 16,
    membersCount: 4,
    aiStatus: "Ready for Script Generation",
    updatedAtLabel: "Updated 2h ago",
    status: "Active",
    collaborators: [
      { id: "1", name: "Prof. Thorne", avatarUrl: "https://i.pravatar.cc/100?img=11" },
      { id: "2", name: "Sara", avatarUrl: "https://i.pravatar.cc/100?img=5" },
      { id: "3", name: "Dr. Hawking", avatarUrl: "https://i.pravatar.cc/100?img=9" },
    ],
  },
  {
    id: "ai-healthcare",
    name: "AI Ethics & Diagnostic Bias in Healthcare",
    category: "Technology & Medicine",
    sourcesCount: 24,
    membersCount: 3,
    aiStatus: "AI Summary Available",
    updatedAtLabel: "Updated Yesterday",
    status: "Active",
    collaborators: [
      { id: "1", name: "Dr. Chen", avatarUrl: "https://i.pravatar.cc/100?img=11" },
      { id: "2", name: "Sara", avatarUrl: "https://i.pravatar.cc/100?img=5" },
      { id: "3", name: "Alex", avatarUrl: "https://i.pravatar.cc/100?img=9" },
    ],
  },
  {
    id: "roman-republic",
    name: "The Fall of the Roman Republic: From Caesar to Empire",
    category: "Ancient History & Politics",
    sourcesCount: 19,
    membersCount: 5,
    aiStatus: "Ready for Script Generation",
    updatedAtLabel: "Updated Today",
    status: "Active",
    collaborators: [
      { id: "1", name: "Marcus", avatarUrl: "https://i.pravatar.cc/100?img=12" },
      { id: "2", name: "Elena", avatarUrl: "https://i.pravatar.cc/100?img=8" },
      { id: "3", name: "John", avatarUrl: "https://i.pravatar.cc/100?img=11" },
    ],
  },
  {
    id: "crispr-genetics",
    name: "How CRISPR-Cas9 is Rewriting the Code of Life",
    category: "Biotechnology & Genetics",
    sourcesCount: 22,
    membersCount: 4,
    aiStatus: "Script Generated",
    updatedAtLabel: "Updated 3d ago",
    status: "Completed",
    collaborators: [
      { id: "1", name: "Dr. Doudna", avatarUrl: "https://i.pravatar.cc/100?img=5" },
      { id: "2", name: "Michael", avatarUrl: "https://i.pravatar.cc/100?img=15" },
      { id: "3", name: "Emma", avatarUrl: "https://i.pravatar.cc/100?img=20" },
    ],
  },
  {
    id: "habit-psychology",
    name: "The Neuroscience of Habit Formation & Dopamine Loops",
    category: "Behavioral Psychology",
    sourcesCount: 14,
    membersCount: 3,
    aiStatus: "AI Processing...",
    updatedAtLabel: "Updated 4d ago",
    status: "Drafts",
    collaborators: [
      { id: "1", name: "Andrew", avatarUrl: "https://i.pravatar.cc/100?img=3" },
      { id: "2", name: "Sara", avatarUrl: "https://i.pravatar.cc/100?img=5" },
    ],
  },
];

export default function ArchivePage() {
  const [projects, setProjects] = useState<ProjectData[]>(MOCK_PROJECTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Active" | "Completed" | "Drafts">("All");

  useEffect(() => {
    async function loadProjects() {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_NESTJS_BACKEND_URL || "http://localhost:4000";
        const res = await fetch(`${backendUrl}/v1/projects`).catch(() => null);
        if (res && res.ok) {
          const data = await res.json().catch(() => null);
          if (Array.isArray(data) && data.length > 0) {
            setProjects(data);
          }
        }
      } catch {
        // Fallback to MOCK_PROJECTS
      }
    }
    loadProjects();
  }, []);

  const handleCreateProject = () => {
    console.log("Create new project initialized!");
  };

  const handleMenuClick = (projectId: string) => {
    console.log("Opened context menu for project:", projectId);
  };

  // Filter projects by both search query and status tab
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All" || project.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-8 w-full font-sans antialiased">
      <DashboardPageHeader>
        <ArchiveHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </DashboardPageHeader>

      {/* Tabs Filter Section */}
      <ArchiveFilterBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Grid Display Container */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Projects</h2>
          <span className="text-xs text-slate-400 font-medium bg-slate-100 px-2.5 py-1 rounded-lg">
            Total: {filteredProjects.length}
          </span>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onMenuClick={handleMenuClick}
              />
            ))}
          </div>
        ) : (
          <div className="p-16 bg-white border border-slate-200/60 rounded-[20px] shadow-sm text-center text-slate-400 text-sm font-medium">
            No archive projects match your selection context query.
          </div>
        )}
      </div>

      {/* Mobile Floating Action Button */}
      <FloatingActionButton
        onClick={handleCreateProject}
        ariaLabel="Create new project"
      />
    </div>
  );
}