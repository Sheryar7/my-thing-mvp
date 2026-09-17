"use client";

import React, { useState, useEffect } from "react";
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

  const projectId = (params?.id as string) || "black-holes";
  const documentId = (params?.documentId as string) || "bh-2";

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(28);

  const [docMetadata, setDocMetadata] = useState({
    title: "Stephen Hawking - Particle Creation by Black Holes.pdf",
    projectTitle: "The Physics of Black Holes & Spacetime",
    typeLabel: "PDF",
    statsLabel: "28 pages",
    timeLabel: "Uploaded today",
    keywords: ["Hawking Radiation", "Quantum Mechanics", "Thermodynamics", "Event Horizon", "Black Hole Evaporation"],
  });

  const [docContent, setDocContent] = useState<string>(
    "In 1974, Stephen Hawking demonstrated that quantum field effects near the event horizon of a black hole cause it to emit blackbody radiation, now recognized as Hawking Radiation. Due to vacuum fluctuations, particle-antiparticle virtual pairs continuously form. When one particle falls across the event horizon, the other escapes into infinity carrying positive mass-energy away from the black hole. Consequently, black holes slowly lose mass over astronomical timescales and will eventually undergo complete evaporation."
  );
  const [docSummary, setDocSummary] = useState<string>(
    "Quantum vacuum fluctuations near event horizons drive thermal evaporation via Hawking radiation, establishing deep links between quantum mechanics, general relativity, and thermodynamics."
  );
  const [takeaways, setTakeaways] = useState<string[]>([
    "Quantum fluctuations near an event horizon cause black holes to emit thermal blackbody radiation.",
    "Escaping particles reduce the total mass-energy of the black hole, causing eventual evaporation.",
    "Hawking radiation reconciles thermodynamics and quantum field theory with gravitational singularities.",
  ]);

  useEffect(() => {
    async function loadDocument() {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_NESTJS_BACKEND_URL || "http://localhost:4000";
        const res = await fetch(`${backendUrl}/v1/archive/sources/${documentId}`).catch(() => null);
        if (res && res.ok) {
          const data = await res.json().catch(() => null);
          if (data && data.title) {
            const sType = (data.source_type || "pdf").toUpperCase();
            setDocMetadata({
              title: data.title,
              projectTitle: data.projectTitle || "Educational Research",
              typeLabel: sType,
              statsLabel: sType === "PDF" ? "28 pages" : sType === "VIDEO" ? "18 mins" : "Online Article",
              timeLabel: "Uploaded today",
              keywords: data.title.split(" ").filter((w: string) => w.length > 4).slice(0, 6),
            });

            if (data.raw_content) {
              setDocContent(data.raw_content);
            }
            if (data.summary) {
              setDocSummary(data.summary);
            }
            if (Array.isArray(data.claims) && data.claims.length > 0) {
              setTakeaways(data.claims.map((c: { claim_text: string }) => c.claim_text));
            }
          }
        }
      } catch {
        // Graceful fallback to initial state
      }
    }
    loadDocument();
  }, [documentId]);

  return (
    <div className="w-full max-w-full min-w-0 overflow-x-hidden space-y-7 md:space-y-8 font-sans antialiased pb-12">
      {/* 1. Header & Navigation */}
      <DocumentHeader projectId={projectId} docMetadata={docMetadata} />

      {/* 2. Main 2-Column Grid: Parallel Left & Right Columns Starting at Same Baseline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full max-w-full min-w-0">
        
        {/* Left Column: Document Viewer + Ask AI Chat */}
        <div className="lg:col-span-7 xl:col-span-8 w-full max-w-full min-w-0 space-y-6">
          <DocumentViewer
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            title={docMetadata.title}
            sectionNumber="1.1"
            content={docContent}
            highlightText="Direct observations and theoretical calculations demonstrate consistent alignment with general relativistic predictions."
            keyInsight="The integration of observational data with theoretical quantum models provides our clearest window into the fundamental laws governing spacetime."
          />
          <AskAIChat
            projectId={projectId}
            documentId={documentId}
            documentTitle={docMetadata.title}
          />
        </div>

        {/* Right Column: Key Takeaways, Keywords, Send to Workshop */}
        <div className="lg:col-span-5 xl:col-span-4 w-full max-w-full min-w-0 space-y-4">
          <AISummaryCard summary={docSummary} confidence={94} />
          <KeyTakeawaysCard takeaways={takeaways} />
          <KeywordsCard keywords={docMetadata.keywords} />
          <SendToWorkshopCard projectId={projectId} />
        </div>

      </div>
    </div>
  );
}