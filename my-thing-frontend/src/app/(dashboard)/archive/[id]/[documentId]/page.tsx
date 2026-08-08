"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiSend,
} from "react-icons/fi";
import { IoSparklesOutline } from "react-icons/io5";

export default function SourceDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const projectId = (params?.id as string) || "podcast-12";
  const documentId = (params?.documentId as string) || "src-3";

  // State management
  const [currentPage, setCurrentPage] = useState(12);
  const totalPages = 34;
  const [chatInput, setChatInput] = useState("");

  const docMetadata = {
    title: "Future of AI.pdf",
    projectTitle: "Podcast Episode 12",
    typeLabel: "PDF",
    statsLabel: "34 pages",
    timeLabel: "Uploaded today by John",
    keywords: ["AI Ethics", "Healthcare", "Privacy", "Bias", "Transparency", "Regulation"]
  };

  return (
    <div className="w-full max-w-full min-w-0 overflow-x-hidden space-y-6 font-sans antialiased pb-12">
      {/* 1. HEADER & NAVIGATION */}
      <div className="space-y-3">
        {/* Back Link limited to fit width */}
        <Link
          href={`/archive/${projectId}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors w-fit"
        >
          <FiArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Podcast Episode 12</span>
        </Link>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            {docMetadata.title}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {docMetadata.typeLabel} • {docMetadata.statsLabel} • {docMetadata.timeLabel}
          </p>
        </div>
      </div>

      {/* 2. MAIN GRID CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start w-full max-w-full min-w-0">

        {/* LEFT COLUMN: Document Preview Viewer & AI Chat */}
        <div className="w-full max-w-full min-w-0 lg:col-span-1 space-y-6">
          <div className="w-full max-w-full min-w-0 bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 shadow-xs flex flex-col justify-between min-h-[640px] relative">

            {/* Document Reader Body */}
            <div className="space-y-6 text-slate-900 text-xs md:text-sm leading-relaxed font-normal">
              <h2 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">
                3.2 AI in Healthcare: Current Applications
              </h2>

              <p>
                Artificial Intelligence is rapidly transforming healthcare by improving diagnostic accuracy, personalizing treatment, and optimizing hospital operations. Machine learning models can analyze medical images, detect anomalies, and predict disease progression with high accuracy.
              </p>

              {/* Highlighted Yellow Text Block */}
              <div className="bg-amber-100/70 p-2 rounded-lg text-slate-800 font-medium">
                Studies show that AI-powered diagnostic tools can improve accuracy by up to 20% compared to traditional methods, particularly in radiology and pathology.
              </div>

              <p>
                Despite these advancements, challenges remain in data privacy, algorithmic bias, and the lack of regulatory frameworks. Ethical AI deployment requires transparency, fairness, and human oversight.
              </p>

              <span className="text-xs font-bold text-indigo-950">Key Insights</span>
              {/* Key Insights Callout Card */}
              <div className="bg-[#EEECFE] border mt-3.5 border-indigo-800 rounded-xl p-4 space-y-1.5">
                <p className="text-indigo-800 font-medium text-xs md:text-sm">
                  The future of AI in healthcare depends on balancing innovation with ethics, privacy, and patient trust.
                </p>
              </div>
            </div>

            {/* Bottom Floating Pagination Controller */}
            <div className="flex items-center justify-left pt-8">
              <div className="inline-flex items-center gap-3 bg-white border border-slate-200/80 rounded-xl px-4 py-1.5 text-xs font-medium text-slate-500 shadow-xs">
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  className="hover:text-slate-800 transition-colors p-0.5"
                >
                  <FiChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span>{currentPage} / {totalPages}</span>
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  className="hover:text-slate-800 transition-colors p-0.5"
                >
                  <FiChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Ask AI about this document Box (Figma Match) */}
          <div className="w-full max-w-full min-w-0 bg-white border border-slate-200/90 rounded-2xl p-5 md:p-6 shadow-xs space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between w-full max-w-full min-w-0">
              <h3 className="text-base font-bold text-slate-900 tracking-tight">Ask AI about this document</h3>
              <span className="inline-flex items-center gap-1.5 bg-[#C6F6D5] text-[#008000] text-sm font-semibold px-3 py-1 rounded-2xl">
                <span className="w-2.5 h-2.5 rounded-full bg-[#008000]" />
                Live
              </span>
            </div>

            {/* Chat Conversation Area */}
            <div className="space-y-3 pt-1 w-full max-w-full min-w-0">

              {/* User Prompt Message (Right-aligned bubble) */}
              <div className="flex justify-end w-full max-w-full min-w-0">
                <div className="w-full max-w-[85%] bg-white border border-slate-200/80 rounded-2xl rounded-tr-sm px-4 py-2.5 text-xs font-medium text-slate-800 shadow-2xs">
                  Give me a 30-second podcast intro from this paper.
                </div>
              </div>

              {/* AI Response Section */}
              <div className="space-y-1.5 w-full max-w-full min-w-0">
                {/* AI Assistant Label Outside Box */}
                <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-xs pl-0.5 w-full max-w-full min-w-0">
                  <IoSparklesOutline className="w-4 h-4 text-indigo-600 stroke-[2.5]" />
                  <span className="text-slate-900 font-bold">AI Assistant</span>
                </div>

                {/* AI Response Box */}
                <div className="w-full max-w-full min-w-0 bg-[#EEECFE] border-indigo-100/80 rounded-xl p-3.5 text-xs md:text-sm text-indigo-900 font-medium leading-relaxed">
                  Here's a concise opening that highlights healthcare, ethics, and privacy while setting up the discussion naturally.
                </div>
              </div>
            </div>

            {/* Input Field with Styled Send Box */}
            <div className="relative w-full pt-1">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask a follow-up about quotes, data, or script ideas..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all shadow-2xs"
              />
              <button
                type="button"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Send query"
              >
                <FiSend className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar Insights & Actions Deck */}
        <div className="w-full max-w-full min-w-0 space-y-4 lg:sticky lg:top-6">

          {/* 1. AI Summary Card */}
          <div className="w-full max-w-full min-w-0 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
            {/* Header & Tag stacked vertically */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold text-base tracking-tight">
                <IoSparklesOutline className="w-5 h-5 text-[#FFD214] fill-[#FFD214]" />
                <span>AI Summary</span>
              </div>

              <div>
                <span className="inline-block text-[11px] font-semibold text-indigo-900 bg-[#EEECFE] px-3 py-1 rounded-full">
                  Auto-generated
                </span>
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-normal pt-1">
              This paper explores how AI is transforming healthcare, diagnostics, and patient care while highlighting privacy, bias, and regulatory challenges.
            </p>

            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-slate-700">Confidence</span>
                <span className="text-indigo-600">84%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-[84%] rounded-full" />
              </div>
              <p className="text-[10px] text-emerald-700 font-semibold text-center pt-0.5">
                High confidence extraction
              </p>
            </div>
          </div>

          {/* 2. Key Takeaways Card */}
          <div className="w-full max-w-full min-w-0 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
            {/* Header & Tag stacked vertically */}
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 text-lg md:text-xl tracking-tight">
                Key Takeaways
              </h3>
              <div>
                <span className="inline-block text-[11px] font-semibold text-indigo-900 bg-[#EEECFE] px-3 py-1 rounded-full">
                  4 selected
                </span>
              </div>
            </div>

            {/* Takeaways List with Solid Indigo Checkboxes */}
            <div className="space-y-3 text-xs md:text-sm text-slate-900 font-medium">
              {[
                "AI improves diagnostic accuracy.",
                "Privacy is the biggest barrier.",
                "Human oversight is essential.",
                "Transparency builds trust."
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Keywords Card */}
          <div className="w-full max-w-full min-w-0 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-lg md:text-xl tracking-tight">
              Keywords
            </h3>
            <div className="flex flex-wrap gap-2 w-full min-w-0">
              {docMetadata.keywords.map((keyword, idx) => (
                <span
                  key={idx}
                  className="break-words px-3.5 py-1.5 bg-[#EEECFE] text-indigo-900 font-semibold text-xs md:text-sm rounded-xl"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* 4. Send to Workshop Action Card */}
          <div className="w-full max-w-full min-w-0 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
            {/* Header & Badge stacked vertically */}
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 text-lg md:text-xl tracking-tight">
                Send to Workshop
              </h3>
              <div>
                <span className="inline-block text-[11px] font-semibold text-indigo-900 bg-[#EEECFE] px-3 py-1 rounded-full">
                  Ready
                </span>
              </div>
            </div>

            <p className="break-words text-xs md:text-sm text-slate-800 font-normal leading-relaxed">
              Selected takeaways, keywords, and quotes will be synced into the Workshop draft automatically.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => router.push(`/archive/${projectId}/processing`)}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs md:text-sm rounded-xl shadow-xs transition-colors text-center"
              >
                Generate Script
              </button>
              <button
                type="button"
                className="flex-1 py-2.5 bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold text-xs md:text-sm rounded-xl transition-colors text-center"
              >
                Save for Later
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}