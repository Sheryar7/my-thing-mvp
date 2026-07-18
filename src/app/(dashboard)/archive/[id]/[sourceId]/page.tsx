"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FaChevronRight, FaPlus } from "react-icons/fa6";
import { FiArrowLeft, FiBookOpen } from "react-icons/fi";
import { IoSparklesOutline } from "react-icons/io5";
import Button from "@/components/ui/Button";

export default function SourceDetailsPage() {
  const params = useParams();
  const router = useRouter();

  // Extract route parameters for navigation and breadcrumb rendering
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

  const handleUseInWorkshop = () => {
    console.log("Using source in workshop...");
  };

  return (
    <div className="w-full min-h-screen space-y-6 bg-transparent p-2 md:p-0 pb-32 md:pb-0 font-sans antialiased relative">

      {/* DESKTOP VIEW HEADER: Breadcrumb trail & top right button (hidden on mobile) */}
      <div className="hidden md:block space-y-6">
        {/* Hierarchical Breadcrumb Trail */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 font-medium overflow-x-auto whitespace-nowrap no-scrollbar">
          <Link href="/archive" className="hover:text-slate-600 transition-colors">Archive</Link>
          <FaChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
          <Link href={`/archive/${projectId}`} className="hover:text-slate-600 transition-colors truncate max-w-[150px]">
            {docMetadata.projectTitle}
          </Link>
          <FaChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
          <span className="text-slate-600 truncate max-w-[200px]">{docMetadata.title}</span>
        </nav>

        {/* Primary Screen Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1 w-full">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{docMetadata.title}</h1>
            <p className="text-sm text-slate-500 font-medium">
              {docMetadata.typeLabel} <span className="text-slate-300 mx-1">•</span> {docMetadata.statsLabel} <span className="text-slate-300 mx-1">•</span> {docMetadata.timeLabel}
            </p>
          </div>

          <Button
            type="button"
            onClick={handleUseInWorkshop}
            className="inline-flex items-center justify-center gap-2 sm:w-auto h-auto px-5 py-2.5 text-sm font-medium rounded-xl shrink-0 active:scale-[0.98]"
          >
            Use in workshop →
          </Button>
        </div>
      </div>


      {/* MOBILE VIEW HEADER: Arrow back navigation header (hidden on desktop) */}
      <div className="flex md:hidden items-start gap-4 w-full pt-2">
        <button
          onClick={() => router.push(`/archive/${projectId}`)}
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors mt-1"
          aria-label="Go back to project folder"
        >
          <FiArrowLeft className="w-6 h-6 text-slate-800" />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{docMetadata.title}</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            {docMetadata.typeLabel} • {docMetadata.statsLabel} • {docMetadata.timeLabel}
          </p>
        </div>
      </div>


      {/* SHARED ELEMENTS: Document Preview & Sidebar Widgets (Desktop/Mobile Layouts) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full">

        {/* Left Grid Panel: Main Document Preview Frame Component */}
        <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-[24px] p-5 md:p-8 shadow-sm space-y-6 min-h-[500px]">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight pb-2 hidden md:block">
            Document Preview
          </h2>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight md:hidden">
            Document Preview
          </h2>

          {/* Document Content Frame */}
          <div className="w-full border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-100 text-slate-700 text-[15px]">

            {/* Section A: Title Header */}
            <div className="p-5 md:p-6 bg-white">
              <h3 className="font-bold text-slate-900 text-lg">AI Ethics Report</h3>
            </div>

            {/* Section B: Content Sub-area */}
            <div className="p-5 md:p-6 bg-white space-y-4">
              <p className="text-slate-400 text-sm font-medium italic">Introduction</p>
              <p className="leading-relaxed">
                Lorem text placeholder for testing layout. Global consensus on the ethical implications of deployment
                forces us to deeply analyze key baseline elements...
              </p>
            </div>

            {/* Section C: List Bullets Area */}
            <div className="p-5 md:p-6 bg-white space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-slate-400 mt-1.5">•</span>
                <span>Transparency</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-slate-400 mt-1.5">•</span>
                <span>Accountability</span>
              </div>
            </div>

            {/* Section D: Document Graphic Interface Box */}
            <div className="p-5 md:p-6 bg-white">
              <div className="w-full h-32 border border-slate-100 rounded-xl flex flex-col items-center justify-center p-4 text-center">
                <span className="text-sm font-semibold text-slate-500">Graph Placeholder</span>
                <span className="text-xs text-slate-400 mt-1">Interactive data and metrics layout flow</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Grid Panel: Sidebar Workspace Content Deck */}
        <div className="space-y-4 lg:sticky lg:top-6">

          {/* Card A: Dynamic AI Generated Insights */}
          <div className="bg-white border border-slate-200/90 rounded-[20px] p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm tracking-wide">
              <IoSparklesOutline className="w-4 h-4 text-amber-500 fill-amber-500/10 stroke-[2.2]" />
              <span>AI Summary</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              A concise overview of AI ethics, covering fairness, accountability, privacy, and transparency.
            </p>
          </div>

          {/* Card B: User Editable Scratchpad / Private Memo */}
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

          {/* Card C: Metadata Tags Context Organizer */}
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


      {/* MOBILE ONLY ACTION: Sticky "Use in Workshop" Button (hidden on desktop) */}
      {/* Placed at "bottom-[74px]" to float cleanly over your custom bottom tab bar */}
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