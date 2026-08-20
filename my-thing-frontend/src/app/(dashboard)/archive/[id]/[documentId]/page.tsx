"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";

import { DocumentHeader } from "./_components/document-header";
import { DocumentViewer } from "./_components/document-viewer";
import { AskAIChat } from "./_components/ask-ai-chat";
import { AISummaryCard } from "./_components/ai-summary-card";
import { KeyTakeawaysCard } from "./_components/key-takeaways-card";
import { KeywordsCard } from "./_components/keywords-card";
import { SendToWorkshopCard } from "./_components/send-to-workshop-card";

export default function SourceDetailsPage() {
  const params = useParams();

  const projectId = (params?.id as string) || "podcast-12";
  const documentId = (params?.documentId as string) || "src-3";

  const [currentPage, setCurrentPage] = useState(12);
  const totalPages = 34;

  const docMetadata = {
    title: "Future of AI.pdf",
    projectTitle: "Podcast Episode 12",
    typeLabel: "PDF",
    statsLabel: "34 pages",
    timeLabel: "Uploaded today by John",
    keywords: ["AI Ethics", "Healthcare", "Privacy", "Bias", "Transparency", "Regulation"],
  };

  return (
    <div className="w-full max-w-full min-w-0 overflow-x-hidden space-y-6 font-sans antialiased pb-12">
      {/* 1. Header & Navigation */}
      <DocumentHeader projectId={projectId} docMetadata={docMetadata} />

      {/* 2. Main Responsive Container */}
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_360px] gap-6 items-start w-full max-w-full min-w-0">
        
        {/* Left Column: Document Viewer + Ask AI Chat (Mobile: Rendered First) */}
        <div className="w-full max-w-full min-w-0 space-y-6">
          <DocumentViewer
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
          <AskAIChat />
        </div>

        {/* Right Column: All Sidebar Cards (Mobile: Rendered Second) */}
        <div className="w-full max-w-full min-w-0 space-y-4 lg:sticky lg:top-6">
          <AISummaryCard />
          <KeyTakeawaysCard />
          <KeywordsCard keywords={docMetadata.keywords} />
          <SendToWorkshopCard projectId={projectId} />
        </div>

      </div>
    </div>
  );
}