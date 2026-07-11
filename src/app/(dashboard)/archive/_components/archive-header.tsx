"use client";

import React from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import Button from "@/components/ui/Button";

interface ArchiveHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function ArchiveHeader({ searchQuery, setSearchQuery }: ArchiveHeaderProps) {
    const handleCreateProject = () => {
        console.log("Create new project initialized");
    };
  return (
    <div className="w-full space-y-5">
      {/* Top Title & Button Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">The Archive</h1>
          <p className="text-sm text-slate-500 mt-1">Manage research and sources for all your projects.</p>
        </div>

        <Button
          type="button"
          onClick={handleCreateProject}
          className="inline-flex items-center justify-center gap-2 sm:w-auto h-auto px-5 py-2.5 text-sm font-medium rounded-xl shrink-0 active:scale-[0.98]"
        >
          <FiPlus className="h-4 w-4 stroke-[3]" />
          <span>New Project</span>
        </Button>

      </div>

      {/* Global Filter Search Field Input */}
      <div className="relative w-full">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 pointer-events-none" />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 text-sm bg-white border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all text-slate-900 placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}