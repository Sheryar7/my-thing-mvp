"use client";

import React, { useState } from "react";
import { ArchiveHeader } from "./_components/archive-header";
import { ArchiveFilterBar } from "./_components/archive-filter-bar";
import { ProjectCard, ProjectData } from "./_components/project-card";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton"; // Adjust this path if your file is saved elsewhere!

// Mock collections updated with exact Figma item counters
const MOCK_PROJECTS: ProjectData[] = [
  { 
    id: "podcast-10", 
    name: "Podcast Episode 10", 
    sourcesCount: 18, 
    notesCount: 12, 
    updatedAtLabel: "Updated 2h ago", 
    status: "Active" 
  },
  { 
    id: "ai-documentary", 
    name: "Ai Documentary", 
    sourcesCount: 24, 
    notesCount: 8, 
    updatedAtLabel: "Updated yesterday", 
    status: "Active" 
  },
  { 
    id: "product-launch", 
    name: "Product Launch", 
    sourcesCount: 15, 
    notesCount: 5, 
    updatedAtLabel: "Updated 3 days ago", 
    status: "Completed" 
  },
  { 
    id: "mental-health", 
    name: "Mental Health", 
    sourcesCount: 31, 
    notesCount: 19, 
    updatedAtLabel: "Updated today", 
    status: "Drafts" 
  },
  { 
    id: "research-paper", 
    name: "Research Paper", 
    sourcesCount: 42, 
    notesCount: 27, 
    updatedAtLabel: "Updated last week", 
    status: "Completed" 
  },
  { 
    id: "youtube-automation", 
    name: "YouTube Automation", 
    sourcesCount: 21, 
    notesCount: 14, 
    updatedAtLabel: "Updated 5h ago", 
    status: "Drafts" 
  }
];

export default function ArchivePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Active" | "Completed" | "Drafts">("All");

  const handleCreateProject = () => {
    console.log("Create new project initialized from FAB!");
    // Your actual modal opening or router pushing logic goes here
  };

  const filteredProjects = MOCK_PROJECTS.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All" || project.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-8 w-full min-h-screen p-2 md:p-0 bg-transparent font-sans antialiased relative">
      {/* Search and Action Bar */}
      <ArchiveHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

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
          /* Custom 3-column clean grid system layout frame constraint */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="p-16 bg-white border border-slate-200/60 rounded-[20px] shadow-sm text-center text-slate-400 text-sm font-medium">
            No archive projects match your selection context query.
          </div>
        )}
      </div>

      {/* MOBILE FLOATING ACTION BUTTON (FAB): Renders only on mobile screens */}
      
      <FloatingActionButton 
        onClick={handleCreateProject} 
        ariaLabel="Create new project" 
      />
    </div>
  );
}