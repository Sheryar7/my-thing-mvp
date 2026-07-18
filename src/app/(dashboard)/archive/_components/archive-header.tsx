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
    <div className="w-full">

      {/* DESKTOP VIEW: Left aligned title & inline "+ New Project" button (hidden on mobile) */}

      <div className="hidden md:flex items-center justify-between gap-4 w-full mb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">The Archive</h1>
          <p className="text-sm text-slate-500 mt-1">Manage research and sources for all your projects.</p>
        </div>

        <Button
          type="button"
          onClick={handleCreateProject}
          className="max-[865px]:hidden inline-flex items-center justify-center gap-2 sm:w-auto h-auto px-5 py-2.5 text-sm font-medium rounded-xl shrink-0 active:scale-[0.98]"
        >
          <FiPlus className="h-4 w-4 stroke-[3]" />
          <span>New Project</span>
        </Button>
      </div>


      {/* MOBILE VIEW: Centered title & description (no button here; hidden on desktop) */}

      <div className="flex md:hidden flex-col items-start text-left w-full mb-5">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">The Archive</h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage research and sources for all your projects.
        </p>
      </div>


      {/* SHARED ELEMENTS: Search bar used by both desktop and mobile */}

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