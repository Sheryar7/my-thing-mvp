"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { LensHeader } from "./_components/lens-header";
import { ScoreMetrics } from "./_components/score-metrics";
import { AISuggestions } from "./_components/ai-suggestions";
import { ContentPreview } from "./_components/content-preview";
import { ActionFooter } from "./_components/action-footer";

function LensContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectParam = searchParams.get("project") || "black-holes";
  const scriptParam = searchParams.get("script") || "ffffffff-0000-0000-0000-000000000001";

  const [projectTitle, setProjectTitle] = useState("The Physics of Black Holes & Spacetime");
  const [scriptTitle, setScriptTitle] = useState("The Physics of Black Holes: From Event Horizons to Quantum Paradoxes");
  const [scriptExcerpt, setScriptExcerpt] = useState(
    "Welcome to the edge of known physics. For over a century, black holes lived purely within the mathematical equations of Albert Einstein's general theory of relativity. But today, they stand as verified cosmic realities that push our understanding of space, time, and quantum mechanics to their absolute breaking points."
  );
  const [overallScore, setOverallScore] = useState(94);
  const [grammarScore, setGrammarScore] = useState(96);
  const [accuracyScore, setAccuracyScore] = useState(95);
  const [qualityScore, setQualityScore] = useState(93);
  const [suggestions, setSuggestions] = useState<string[]>([
    "Include a brief note on the Schwarzschild radius formula for clarity.",
    "Mention the role of supercomputers in reconstructing the EHT interferometry data.",
    "Pacing across the gravitational waves section is exceptionally engaging.",
  ]);

  useEffect(() => {
    async function loadLensData() {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_NESTJS_BACKEND_URL || "http://localhost:4000";

        // 1. Fetch project title
        const projRes = await fetch(`${backendUrl}/v1/projects/${projectParam}`).catch(() => null);
        if (projRes && projRes.ok) {
          const projData = await projRes.json().catch(() => null);
          if (projData && projData.name) {
            setProjectTitle(projData.name);
          }
        }

        // 2. Fetch script
        const scriptRes = await fetch(`${backendUrl}/v1/workshop/scripts?projectId=${projectParam}`).catch(() => null);
        if (scriptRes && scriptRes.ok) {
          const scriptData = await scriptRes.json().catch(() => null);
          if (Array.isArray(scriptData) && scriptData.length > 0) {
            setScriptTitle(scriptData[0].title);
            if (scriptData[0].content) {
              setScriptExcerpt(scriptData[0].content.substring(0, 350) + "...");
            }
          }
        }

        // 3. Fetch validation report
        const repRes = await fetch(`${backendUrl}/v1/lens/reports?projectId=${projectParam}`).catch(() => null);
        if (repRes && repRes.ok) {
          const repData = await repRes.json().catch(() => null);
          if (repData) {
            if (repData.coverage_score) setOverallScore(repData.coverage_score);
            if (repData.grammar_score) setGrammarScore(repData.grammar_score);
            if (repData.accuracy_score) setAccuracyScore(repData.accuracy_score);
            if (repData.quality_score) setQualityScore(repData.quality_score);
            if (Array.isArray(repData.missing_topics) && repData.missing_topics.length > 0) {
              setSuggestions(repData.missing_topics);
            }
          }
        }
      } catch {
        // Fallback gracefully to project defaults
      }
    }
    loadLensData();
  }, [projectParam, scriptParam]);

  const handleExport = () => {
    router.push("/export-publish");
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8 md:space-y-8 font-sans antialiased pb-12">
      {/* Box 1: Page Header with generous breathing room below */}
      <div className="w-full pb-3 sm:pb-4 md:pb-6">
        <LensHeader subtitle={projectTitle} onExport={handleExport} />
      </div>

      {/* Box 2: Score Metrics Cards */}
      <ScoreMetrics
        overallScore={overallScore}
        grammarScore={grammarScore}
        accuracyScore={accuracyScore}
        qualityScore={qualityScore}
      />

      {/* Box 3: AI Suggestions Checklist */}
      <AISuggestions suggestions={suggestions} />

      {/* Box 4: Content Preview Box */}
      <ContentPreview
        title={scriptTitle}
        excerpt={scriptExcerpt}
        onViewFull={() => router.push(`/workshop?project=${projectParam}`)}
      />

      {/* Box 5: Footer Actions (Responsive for Mobile & Desktop) */}
      <ActionFooter
        onExport={handleExport}
        onBackToWorkshop={() => router.push(`/workshop?project=${projectParam}`)}
      />
    </div>
  );
}

export default function LensPage() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-400 font-medium">Loading Lens Validation Engine...</div>}>
      <LensContent />
    </Suspense>
  );
}