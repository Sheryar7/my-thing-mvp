"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FiSearch, FiArrowLeft, FiPlus } from "react-icons/fi";
import { SourceItemCard, SourceItemData } from "./_components/source-item-card";
import { ProjectCollaborators } from "./_components/project-collaborators";
import { AIProjectInsights } from "./_components/ai-project-insights";
import Button from "@/components/ui/Button";

const MOCK_SOURCES_DATA: Record<string, { name: string; sources: SourceItemData[] }> = {
  "podcast-12": {
    name: "Podcast Episode 12",
    sources: [
      { id: "src-1", title: "AI Trends in Healthcare", type: "Website", label: "Website", updatedLabel: "Added Today", aiStatus: "AI summarized ✓" },
      { id: "src-2", title: "AI Conference 2026", type: "Video", label: "Video", duration: "28 mins", updatedLabel: "Added Today", aiStatus: "Transcript Generated ✓" },
      { id: "src-3", title: "Future of AI.pdf", type: "PDF", label: "PDF", pagesCount: 34, updatedLabel: "Added Today", aiStatus: "Summary Available ✓" },
      { id: "src-4", title: "AI Trends in Healthcare", type: "Website", label: "Website", updatedLabel: "Added Today", aiStatus: "AI summarized ✓" },
      { id: "src-5", title: "AI Conference 2026", type: "Video", label: "Video", duration: "28 mins", updatedLabel: "Added Today", aiStatus: "Transcript Generated ✓" },
      { id: "src-6", title: "Future of AI.pdf", type: "PDF", label: "PDF", pagesCount: 34, updatedLabel: "Added Today", aiStatus: "Summary Available ✓" },
    ],
  },
};

export default function ProjectSubViewPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = (params?.id as string) || "podcast-12";
  const projectData = MOCK_SOURCES_DATA[projectId] || MOCK_SOURCES_DATA["podcast-12"];

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Websites" | "PDFs" | "Notes" | "Videos">("All");

  const filteredSources = projectData.sources.filter((source) => {
    const matchesSearch = source.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "All" ||
      (activeTab === "Websites" && source.type === "Website") ||
      (activeTab === "PDFs" && source.type === "PDF") ||
      (activeTab === "Notes" && source.type === "Notes") ||
      (activeTab === "Videos" && source.type === "Video");
    return matchesSearch && matchesTab;
  });

  return (
    <div className="w-full space-y-6 font-sans antialiased pb-12">
      {/* 1. TOP HEADER & NAVIGATION */}
      <div className="flex flex-col gap-3">
        <Link
          href="/archive"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors w-fit"
        >
          <FiArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Archive</span>
        </Link>

        <div className="flex items-start justify-between w-full">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              {projectData.name}
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-1">
              {projectData.sources.length} Sources • 4 Members • Updated 2h ago
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="w-auto h-9 px-4 border-indigo-400 text-indigo-600 hover:bg-indigo-50/60 font-bold"
            >
              <FiPlus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Add Source</span>
            </Button>

            <Button
              variant="outline"
              className="w-auto h-9 px-5 border-indigo-400 text-indigo-600 hover:bg-indigo-50/60 font-bold"
            >
              Invite
            </Button>
          </div>
        </div>
      </div>



      {/* 2. PROJECT COLLABORATORS SECTION */}
      <ProjectCollaborators />

      {/* 3. AI PROJECT INSIGHTS SECTION */}
      <AIProjectInsights />

      {/* 4. SEARCH BAR */}
      <div className="relative w-full">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search sources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-slate-200/80 rounded-xl pl-11 pr-4 py-3 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all shadow-xs"
        />
      </div>

      {/* 5. FILTER PILLS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar w-full">
        {(["All", "Websites", "PDFs", "Notes", "Videos"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-1.5 rounded-xl text-xs font-semibold transition-all ${activeTab === tab
              ? "bg-indigo-100/70 text-indigo-700 border border-indigo-700"
              : "bg-white text-slate-500 border border-slate-200/80 hover:border-slate-300 hover:text-slate-700"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 6. SOURCES GRID (3-COLUMN RESPONSIVE) */}
      <div className="pt-2 space-y-4">
        {filteredSources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {filteredSources.map((source) => (
              <SourceItemCard key={source.id} source={source} projectId={projectId} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center border border-dashed border-slate-200 bg-white rounded-2xl text-slate-400 font-medium text-xs">
            No sources match your current filter settings.
          </div>
        )}
      </div>
    </div>
  );
}