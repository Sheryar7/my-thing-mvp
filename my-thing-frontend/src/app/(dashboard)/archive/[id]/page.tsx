"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FiSearch, FiPlus } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
import { HiArrowLeft } from "react-icons/hi";
import { SourceItemCard, SourceItemData } from "./_components/source-item-card";
import { ProjectCollaborators } from "./_components/project-collaborators";
import { AIProjectInsights } from "./_components/ai-project-insights";
import Button from "@/components/ui/Button";

const MOCK_SOURCES_DATA: Record<string, { name: string; sources: SourceItemData[] }> = {
  "black-holes": {
    name: "The Physics of Black Holes & Spacetime",
    sources: [
      { id: "bh-1", title: "Event Horizon Telescope M87* Observations", type: "Website", label: "Website", updatedLabel: "Added Today", aiStatus: "AI summarized ✓" },
      { id: "bh-2", title: "Stephen Hawking - Particle Creation by Black Holes.pdf", type: "PDF", label: "PDF", pagesCount: 28, updatedLabel: "Added Today", aiStatus: "Summary Available ✓" },
      { id: "bh-3", title: "LIGO Gravitational Waves Binary Merger Detection", type: "Video", label: "Video", duration: "18 mins", updatedLabel: "Added Yesterday", aiStatus: "Transcript Generated ✓" },
      { id: "bh-4", title: "Spacetime Singularity & Information Paradox Notes", type: "Notes", label: "Notes", updatedLabel: "Added 2d ago", aiStatus: "Claims Extracted ✓" },
    ],
  },
  "ai-healthcare": {
    name: "AI Ethics & Diagnostic Bias in Healthcare",
    sources: [
      { id: "ai-1", title: "Algorithmic Bias in Clinical Decision Support Systems", type: "Website", label: "Website", updatedLabel: "Added Today", aiStatus: "AI summarized ✓" },
      { id: "ai-2", title: "WHO Ethics & Governance of AI for Health.pdf", type: "PDF", label: "PDF", pagesCount: 42, updatedLabel: "Added Today", aiStatus: "Summary Available ✓" },
      { id: "ai-3", title: "Stanford Medicine - Deep Learning in Radiology Lecture", type: "Video", label: "Video", duration: "35 mins", updatedLabel: "Added Yesterday", aiStatus: "Transcript Generated ✓" },
      { id: "ai-4", title: "HIPAA Patient Privacy & Model Drift Research Notes", type: "Notes", label: "Notes", updatedLabel: "Added 3d ago", aiStatus: "Claims Extracted ✓" },
    ],
  },
  "roman-republic": {
    name: "The Fall of the Roman Republic: From Caesar to Empire",
    sources: [
      { id: "rr-1", title: "The Rubicon & Constitutional Crisis: 49 BCE", type: "Website", label: "Website", updatedLabel: "Added Today", aiStatus: "AI summarized ✓" },
      { id: "rr-2", title: "Cicero's Philippics on Tyranny & Oligarchy.pdf", type: "PDF", label: "PDF", pagesCount: 56, updatedLabel: "Added Yesterday", aiStatus: "Summary Available ✓" },
      { id: "rr-3", title: "Dan Carlin - Death Throes of the Republic Audio Essay", type: "Video", label: "Video", duration: "52 mins", updatedLabel: "Added 2d ago", aiStatus: "Transcript Generated ✓" },
      { id: "rr-4", title: "Agrarian Land Reforms & Roman Legionary Loyalty Notes", type: "Notes", label: "Notes", updatedLabel: "Added 4d ago", aiStatus: "Claims Extracted ✓" },
    ],
  },
  "crispr-genetics": {
    name: "How CRISPR-Cas9 is Rewriting the Code of Life",
    sources: [
      { id: "cg-1", title: "Doudna & Charpentier 2012 Dual-RNA Cas9 Discovery.pdf", type: "PDF", label: "PDF", pagesCount: 22, updatedLabel: "Added Today", aiStatus: "Summary Available ✓" },
      { id: "cg-2", title: "FDA Approval of Casgevy for Sickle Cell Disease", type: "Website", label: "Website", updatedLabel: "Added Today", aiStatus: "AI summarized ✓" },
      { id: "cg-3", title: "MIT Broad Institute - Prime Editing vs Base Editing", type: "Video", label: "Video", duration: "24 mins", updatedLabel: "Added Yesterday", aiStatus: "Transcript Generated ✓" },
      { id: "cg-4", title: "Off-Target Double Strand Breaks & Germline Ethics Notes", type: "Notes", label: "Notes", updatedLabel: "Added 3d ago", aiStatus: "Claims Extracted ✓" },
    ],
  },
  "habit-psychology": {
    name: "The Neuroscience of Habit Formation & Dopamine Loops",
    sources: [
      { id: "hp-1", title: "MIT Study - Basal Ganglia & Chunked Action Loops.pdf", type: "PDF", label: "PDF", pagesCount: 30, updatedLabel: "Added Today", aiStatus: "Summary Available ✓" },
      { id: "hp-2", title: "Dopamine Reward Prediction Errors in Behavioral Conditioning", type: "Website", label: "Website", updatedLabel: "Added Yesterday", aiStatus: "AI summarized ✓" },
      { id: "hp-3", title: "Huberman Lab - Neural Plasticity & Friction Protocol", type: "Video", label: "Video", duration: "44 mins", updatedLabel: "Added 2d ago", aiStatus: "Transcript Generated ✓" },
      { id: "hp-4", title: "Cue-Routine-Reward Implementation Protocol Notes", type: "Notes", label: "Notes", updatedLabel: "Added 4d ago", aiStatus: "Claims Extracted ✓" },
    ],
  },
};

export default function ProjectSubViewPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = (params?.id as string) || "black-holes";
  
  // Lookup fallback in mock if available
  const initialFallback = MOCK_SOURCES_DATA[rawId] || MOCK_SOURCES_DATA["black-holes"];

  const [projectName, setProjectName] = useState<string>(initialFallback.name);
  const [sources, setSources] = useState<SourceItemData[]>(initialFallback.sources);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Websites" | "PDFs" | "Notes" | "Videos">("All");

  useEffect(() => {
    async function loadProjectData() {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_NESTJS_BACKEND_URL || "http://localhost:4000";
        
        // Fetch project metadata
        const projRes = await fetch(`${backendUrl}/v1/projects/${rawId}`).catch(() => null);
        if (projRes && projRes.ok) {
          const projData = await projRes.json().catch(() => null);
          if (projData && projData.name) {
            setProjectName(projData.name);
          }
        }

        // Fetch sources for this project
        const srcRes = await fetch(`${backendUrl}/v1/archive/sources?projectId=${rawId}`).catch(() => null);
        if (srcRes && srcRes.ok) {
          const srcData = await srcRes.json().catch(() => null);
          if (Array.isArray(srcData) && srcData.length > 0) {
            const mappedSources: SourceItemData[] = srcData.map((s: { id: string; title: string; source_type?: string; summary?: string }) => {
              const typeMap: Record<string, "Website" | "PDF" | "Video" | "Notes"> = {
                website: "Website",
                pdf: "PDF",
                video: "Video",
                notes: "Notes",
              };
              const sType = typeMap[s.source_type?.toLowerCase() || ""] || "Website";
              return {
                id: s.id,
                title: s.title,
                type: sType,
                label: sType,
                pagesCount: sType === "PDF" ? 28 : undefined,
                duration: sType === "Video" ? "18 mins" : undefined,
                updatedLabel: "Added Today",
                aiStatus: s.summary ? "AI summarized ✓" : "Summary Available ✓",
              };
            });
            setSources(mappedSources);
          }
        }
      } catch {
        // Graceful fallback to default mock sources without console noise
      }
    }
    loadProjectData();
  }, [rawId]);

  const filteredSources = sources.filter((source) => {
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
    <div className="w-full max-w-full min-w-0 overflow-x-hidden space-y-7 md:space-y-8 font-sans antialiased pb-12">
      {/* 1. TOP HEADER & NAVIGATION */}
      <div className="space-y-2">
        {/* Visible on Desktop (>=768px), Hidden on Mobile */}
        <Link
          href="/archive"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors w-fit mb-1.5"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back to Archive</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between w-full gap-4 md:gap-0">
          {/* Title & Subtitle Container */}
          <div className="text-center md:text-left relative">
            {/* Mobile Back Button Inline (Hidden on Desktop) */}
            <Link
              href="/archive"
              className="md:hidden absolute left-0 top-1 text-slate-800 hover:text-indigo-600 p-1"
            >
              <HiArrowLeft className="w-4 h-4" />
            </Link>

            <h1 className="text-xl md:text-3xl font-bold tracking-tight text-slate-900 px-7 md:px-0">
              {projectName}
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1.5">
              {sources.length} Sources • 4 Members • Updated 2h ago
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:flex items-center gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              className="w-full md:w-auto h-11 md:h-9 px-4 border-indigo-400 text-indigo-600 hover:bg-indigo-50/60 font-bold rounded-xl md:rounded-lg"
            >
              <FiPlus className="w-4 h-4 md:w-3.5 md:h-3.5 stroke-[2.5]" />
              <span>Add Source</span>
            </Button>

            <Button
              variant="outline"
              className="w-full md:w-auto h-11 md:h-9 px-5 border-indigo-400 text-indigo-600 hover:bg-indigo-50/60 font-bold rounded-xl md:rounded-lg"
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
              <SourceItemCard key={source.id} source={source} projectId={rawId} />
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