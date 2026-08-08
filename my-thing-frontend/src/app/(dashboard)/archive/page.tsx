"use client";

import React, { useState } from "react";
import { ArchiveHeader } from "./_components/archive-header";
import { ArchiveFilterBar } from "./_components/archive-filter-bar";
import { ProjectCard, ProjectData } from "./_components/project-card";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { DashboardPageHeader } from "../_components/dashboard-page-header";

// High-fidelity Mock Data matching the new Figma design
const MOCK_PROJECTS: ProjectData[] = [
  {
    id: "podcast-12",
    name: "Podcast Episode 12",
    category: "Podcast Production",
    sourcesCount: 18,
    membersCount: 4,
    aiStatus: "Ready for Script Generation",
    updatedAtLabel: "Updated 2h ago",
    status: "Active",
    collaborators: [
      { id: "1", name: "John", avatarUrl: "https://i.pravatar.cc/100?img=11" },
      { id: "2", name: "Sara", avatarUrl: "https://i.pravatar.cc/100?img=5" },
      { id: "3", name: "Alexa", avatarUrl: "https://i.pravatar.cc/100?img=9" },
      { id: "4", name: "Mike", avatarUrl: "https://i.pravatar.cc/100?img=12" },
    ],
  },
  {
    id: "ai-ethics",
    name: "AI Ethics Research",
    category: "Research",
    sourcesCount: 25,
    membersCount: 3,
    aiStatus: "AI Summary Available",
    updatedAtLabel: "Updated Yesterday",
    status: "Active",
    collaborators: [
      { id: "1", name: "John", avatarUrl: "https://i.pravatar.cc/100?img=11" },
      { id: "2", name: "Sara", avatarUrl: "https://i.pravatar.cc/100?img=5" },
      { id: "3", name: "Alexa", avatarUrl: "https://i.pravatar.cc/100?img=9" },
    ],
  },
  {
    id: "marketing-campaign",
    name: "Marketing Campaign",
    category: "Marketing",
    sourcesCount: 12,
    membersCount: 2,
    aiStatus: "Ready for Script Generation",
    updatedAtLabel: "Updated Today",
    status: "Active",
    collaborators: [
      { id: "1", name: "John", avatarUrl: "https://i.pravatar.cc/100?img=11" },
      { id: "2", name: "Sara", avatarUrl: "https://i.pravatar.cc/100?img=5" },
    ],
  },
  {
    id: "startup-pitch",
    name: "Startup Pitch",
    category: "Presentation",
    sourcesCount: 8,
    membersCount: 5,
    aiStatus: "AI Processing...",
    updatedAtLabel: "Updated 3d ago",
    status: "Drafts",
    collaborators: [
      { id: "1", name: "John", avatarUrl: "https://i.pravatar.cc/100?img=11" },
      { id: "2", name: "Sara", avatarUrl: "https://i.pravatar.cc/100?img=5" },
      { id: "3", name: "Alexa", avatarUrl: "https://i.pravatar.cc/100?img=9" },
      { id: "4", name: "David", avatarUrl: "https://i.pravatar.cc/100?img=3" },
      { id: "5", name: "Emma", avatarUrl: "https://i.pravatar.cc/100?img=20" },
    ],
  },
  {
    id: "healthcare-report",
    name: "Healthcare Report",
    category: "Research",
    sourcesCount: 32,
    membersCount: 6,
    aiStatus: "Script Generated",
    updatedAtLabel: "Updated 5d ago",
    status: "Completed",
    collaborators: [
      { id: "1", name: "John", avatarUrl: "https://i.pravatar.cc/100?img=11" },
      { id: "2", name: "Sara", avatarUrl: "https://i.pravatar.cc/100?img=5" },
      { id: "3", name: "Alexa", avatarUrl: "https://i.pravatar.cc/100?img=9" },
      { id: "4", name: "David", avatarUrl: "https://i.pravatar.cc/100?img=3" },
      { id: "5", name: "Emma", avatarUrl: "https://i.pravatar.cc/100?img=20" },
      { id: "6", name: "Michael", avatarUrl: "https://i.pravatar.cc/100?img=15" },
    ],
  },
  {
    id: "product-launch",
    name: "Product Launch Campaign",
    category: "Campaign",
    sourcesCount: 20,
    membersCount: 3,
    aiStatus: "Ready for Script Generation",
    updatedAtLabel: "Updated 1w ago",
    status: "Completed",
    collaborators: [
      { id: "1", name: "John", avatarUrl: "https://i.pravatar.cc/100?img=11" },
      { id: "2", name: "Sara", avatarUrl: "https://i.pravatar.cc/100?img=5" },
      { id: "3", name: "Alexa", avatarUrl: "https://i.pravatar.cc/100?img=9" },
    ],
  },
];

export default function ArchivePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Active" | "Completed" | "Drafts">("All");

  const handleCreateProject = () => {
    console.log("Create new project initialized!");
  };

  const handleMenuClick = (projectId: string) => {
    console.log("Opened context menu for project:", projectId);
  };

  // Filter projects by both search query and status tab
  const filteredProjects = MOCK_PROJECTS.filter((project) => {
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