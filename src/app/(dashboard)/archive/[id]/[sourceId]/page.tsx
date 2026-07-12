"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaChevronRight, FaPlus } from "react-icons/fa6";
import { IoSparklesOutline } from "react-icons/io5";
import { FiBookOpen } from "react-icons/fi";

export default function SourceDetailsPage() {
  const params = useParams();
  
  // Extract route parameters for breadcrumb rendering
  const projectId = (params?.id as string) || "podcast-12";
  const sourceId = (params?.sourceId as string) || "ai-ethics-report";

  // Temporary layout copy data modeling matching your screenshot specifications
  const docMetadata = {
    title: "AI Ethics Report.pdf",
    projectTitle: "Podcast Episode 12",
    typeLabel: "PDF",
    statsLabel: "32 Pages",
    timeLabel: "Added yesterday",
    tags: ["AI", "Ethics", "Research"]
  };

  return (
    <div className="w-full min-h-screen space-y-6 bg-transparent p-2 md:p-0 font-sans antialiased">
      
      {/* 1. HIERARCHICAL BREADCRUMB TRAIL */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 font-medium overflow-x-auto whitespace-nowrap no-scrollbar">
        <Link href="/archive" className="hover:text-slate-600 transition-colors">Archive</Link>
        <FaChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
        <Link href={`/archive/${projectId}`} className="hover:text-slate-600 transition-colors truncate max-w-[150px]">
          {docMetadata.projectTitle}
        </Link>
        <FaChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
        <span className="text-slate-600 truncate max-w-[200px]">{docMetadata.title}</span>
      </nav>

      {/* 2. PRIMARY SCREEN HEADER ROW */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1 w-full">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{docMetadata.title}</h1>
          <p className="text-sm text-slate-500 font-medium">
            {docMetadata.typeLabel} <span className="text-slate-300 mx-1">•</span> {docMetadata.statsLabel} <span className="text-slate-300 mx-1">•</span> {docMetadata.timeLabel}
          </p>
        </div>
        
        <button 
          type="button"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all duration-150 whitespace-nowrap self-start sm:self-center"
        >
          Use in Workshop →
        </button>
      </div>

      {/* 3. CORE SPLIT GRID PANEL SYSTEM */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full">
        
        {/* LEFT TWO-THIRDS PANEL: Main Document View Frame Component */}
        <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-[24px] p-8 shadow-sm space-y-6 min-h-[600px]">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight pb-2">
            Document Preview
          </h2>
          
          {/* Figma Spec Layout Container System */}
          <div className="w-full border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-100 text-slate-700 text-[15px]">
            
            {/* Section A: Title Header */}
            <div className="p-6 bg-white">
              <h3 className="font-bold text-slate-900 text-lg">AI Ethics Report</h3>
            </div>
            
            {/* Section B: Content Sub-area */}
            <div className="p-6 bg-white space-y-4">
              <p className="text-slate-400 text-sm font-medium italic">Introduction</p>
              <p className="leading-relaxed">
                Lorem ipsum dolor sit amet...
              </p>
            </div>

            {/* Section C: List Bullets Area */}
            <div className="p-6 bg-white space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-slate-400 mt-1.5">•</span>
                <span>Transparency</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-slate-400 mt-1.5">•</span>
                <span>Accountability</span>
              </div>
            </div>

            {/* Section D: Document Graphic Interface Box Component */}
            <div className="p-6 bg-white">
              <div className="w-full h-32 border border-slate-100 rounded-xl flex flex-col items-center justify-center p-4 text-center">
                <span className="text-sm font-semibold text-slate-500">Graph Placeholder</span>
                <span className="text-xs text-slate-400 mt-1">Lorem ipsum...</span>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT ONE-THIRD PANEL: Sidebar Workspace Content Deck */}
        <div className="space-y-4 lg:sticky lg:top-6">
          
          {/* Card A: Dynamic AI Generated Insights Card Module */}
          <div className="bg-white border border-slate-200/90 rounded-[20px] p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm tracking-wide">
              <IoSparklesOutline className="w-4 h-4 text-amber-500 fill-amber-500/10 stroke-[2.2]" />
              <span>AI Summary</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              A concise overview of AI ethics, covering fairness, accountability, privacy, and transparency.
            </p>
          </div>

          {/* Card B: User Editable Scratchpad / Private Memo Component */}
          <div className="bg-white border border-slate-200/90 rounded-[20px] p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm tracking-wide">
              <FiBookOpen className="w-4 h-4 text-slate-400 stroke-[2.2]" />
              <span>My Notes</span>
            </div>
            <ul className="text-sm text-slate-500 space-y-2 font-medium list-disc pl-4 leading-relaxed">
              <li>Use privacy statistics in Intro.</li>
              <li>Mention EU AI Act.</li>
              <li>Reference fairness section on page 14.</li>
            </ul>
          </div>

          {/* Card C: Metadata Tags Context Grouping Organizer */}
          <div className="bg-white border border-slate-200/90 rounded-[20px] p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm tracking-wide">Tags</h3>
            
            <div className="flex flex-wrap gap-2">
              {docMetadata.tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 bg-indigo-50 text-indigo-600 border border-indigo-100/30 font-semibold text-xs rounded-xl"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={() => console.log("Open add tag context panel")}
              className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors pt-1"
            >
              <FaPlus className="w-3 h-3 stroke-[2.5]" />
              <span>Add Tag</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}