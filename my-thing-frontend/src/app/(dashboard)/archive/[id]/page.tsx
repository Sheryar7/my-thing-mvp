"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiSearch, FiArrowLeft } from "react-icons/fi";
import { SubViewHeader } from "./_components/sub-view-header";
import { SourceItemCard, SourceItemData } from "./_components/source-item-card";

// Mocking collection based strictly on Figma screen specifications
const MOCK_SOURCES_DATA: Record<string, { name: string; sources: SourceItemData[] }> = {
  "podcast-12": {
    name: "Podcast Episode 12",
    sources: [
      { id: "src-1", title: "OpenAI Blog", type: "Website", label: "Website", updatedLabel: "Saved today" },
      { id: "src-2", title: "AI Ethics Report", type: "PDF", label: "PDF", pagesCount: 32, updatedLabel: "Added yesterday" },
      { id: "src-3", title: "Episode Script Ideas", type: "Notes", label: "Notes", updatedLabel: "Updated 30 mins ago" },
      { id: "src-4", title: "MIT Technology Review", type: "Website", label: "Website", updatedLabel: "Added today" },
      { id: "src-5", title: "Future of AI", type: "PDF", label: "PDF", pagesCount: 18, updatedLabel: "Added last week" }
    ]
  }
};

export default function ProjectSubViewPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = (params?.id as string) || "podcast-12"; // Default fallback matching screenshot

  const projectData = MOCK_SOURCES_DATA[projectId] || MOCK_SOURCES_DATA["podcast-12"];

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Websites" | "PDFs" | "Notes" | "Saved">("All");

  // Filter sources dynamically based on search string and selected pill categories
  const filteredSources = projectData.sources.filter(source => {
    const matchesSearch = source.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All" ||
      (activeTab === "Websites" && source.type === "Website") ||
      (activeTab === "PDFs" && source.type === "PDF") ||
      (activeTab === "Notes" && source.type === "Notes");
    return matchesSearch && matchesTab;
  });

  const handleUseInWorkshop = () => {
    console.log("Redirecting to workshop with sources...");
  };

  return (
    <div className="w-full min-h-screen space-y-6 bg-transparent p-2 md:p-0 pb-32 md:pb-0 font-sans antialiased relative">

      {/* DESKTOP VIEW HEADER: Full breadcrumbs trail & metadata (hidden on mobile) */}

      <div className="hidden md:block">
        <SubViewHeader
          projectName={projectData.name}
          sourcesCount={projectData.sources.length}
          notesCount={12}                 // BACKEND DEV: Connect live dynamic counts matching the targeted layout context
          updatedAtLabel="Updated 2h ago" // BACKEND DEV: Replace with live dynamic relative calculation values
        />
      </div>


      {/* MOBILE VIEW HEADER: Clean back navigation & title (no breadcrumbs; hidden on desktop)*/}

      <div className="flex md:hidden items-start gap-4 w-full pt-2">
        <button
          onClick={() => router.push("/archive")}
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors mt-1"
          aria-label="Go back to archive"
        >
          <FiArrowLeft className="w-6 h-6 text-slate-800" />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{projectData.name}</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            {projectData.sources.length} Sources • 12 Notes • Updated 2h ago
          </p>
        </div>
      </div>


      {/* SHARED ELEMENTS: Search bar & category pills (identical on both views)*/}

      {/* Search Bar */}
      <div className="relative w-full max-w-4xl mt-4">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search sources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
        />
      </div>

      {/* Pill Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar w-full">
        {(["All", "Websites", "PDFs", "Notes", "Saved"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-1.5 rounded-xl text-sm font-semibold tracking-wide transition-all ${activeTab === tab
              ? "bg-indigo-50 text-indigo-600 border border-indigo-100/50"
              : "bg-white text-slate-500 border border-slate-200 hover:border-slate-300 hover:text-slate-700"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Sources List Container */}
      <div className="pt-4 space-y-4 max-w-4xl">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Sources</h2>

        {filteredSources.length > 0 ? (
          <div className="space-y-3 w-full">
            {filteredSources.map((source) => (
              <SourceItemCard key={source.id} source={source} projectId={projectId} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center border border-dashed border-slate-200 bg-white rounded-2xl text-slate-400 font-medium text-sm">
            No dynamic source records match your active filtering configuration.
          </div>
        )}
      </div>


      {/* 
  MOBILE ONLY ACTION: Natural Inline "Use in Workshop" Button.
  Removed fixed positioning, absolute edges, gradients, and z-index.
  It now scrolls cleanly and sits directly below your last source card.
*/}
      <div className="w-full mt-5 px-1 md:hidden">
        <button
          type="button"
          onClick={handleUseInWorkshop}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
        >
          <span>Use in Workshop →</span>
        </button>
      </div>

    </div>
  );
}