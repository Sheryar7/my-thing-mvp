"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ForgeHeader } from "./_components/forge-header";
import { ForgeAIAssistant } from "./_components/ForgeAIAssistant";
import { DocumentStatus } from "./_components/document-status";
import { LiveTeleprompter } from "./_components/live-teleprompter";
import { Collaborators } from "./_components/collaborators";
import { VersionHistory } from "./_components/version-history";
import { PlaybackControls } from "./_components/playback-controls";

// Split raw script text into speech lines, removing [cite:...] markers
function parseScriptToSpeechLines(rawText: string): string[] {
  if (!rawText) return [];

  // Remove [cite:...] markers and collapse extra whitespaces
  const clean = rawText
    .replace(/\[cite:[^\]]+\]/g, "")
    .replace(/\s+([.,;:!?])/g, "$1")
    .trim();

  // Split into sentences
  const sentences = clean
    .split(/(?<=[.?!])\s+|\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const lines: string[] = [];
  for (const sentence of sentences) {
    const words = sentence.split(/\s+/);
    // If a sentence is long, split at comma or natural boundary so it looks like a teleprompter line
    if (words.length > 11 && sentence.includes(",")) {
      const parts = sentence.split(/,\s+/);
      if (parts.length === 2 && parts[0].length > 10 && parts[1].length > 10) {
        lines.push(parts[0] + ",");
        lines.push(parts[1]);
        continue;
      }
    }
    lines.push(sentence);
  }

  return lines.length > 0 ? lines : [clean];
}

const DEFAULT_BLACK_HOLES_LINES = [
  "Welcome to the edge of known physics.",
  "For over a century, black holes lived purely",
  "within the mathematical equations of Albert Einstein.",
  "In 2019, humanity witnessed what was once deemed impossible:",
  "the Event Horizon Telescope captured the first direct image",
  "of the supermassive black hole at the core of galaxy Messier 87.",
  "Fifty-five million light-years away,",
  "an inferno of relativistic plasma swirls at near light speed",
  "around a dark central void,",
  "matching Einstein's equations with breathtaking precision.",
  "Yet at the boundary known as the event horizon,",
  "our classical laws meet quantum reality.",
  "In 1974, physicist Stephen Hawking uncovered a paradox.",
  "Due to quantum vacuum fluctuations near the horizon,",
  "virtual particle pairs continuously form.",
  "When one particle falls across the horizon,",
  "the other escapes into infinity,",
  "causing black holes to slowly lose mass and evaporate.",
];

function ForgeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectParam = searchParams.get("project") || "black-holes";
  const scriptParam = searchParams.get("script") || "ffffffff-0000-0000-0000-000000000001";

  const [projectTitle, setProjectTitle] = useState("The Physics of Black Holes & Spacetime");
  const [teleprompterLines, setTeleprompterLines] = useState<string[]>(DEFAULT_BLACK_HOLES_LINES);
  const [activeLineIndex, setActiveLineIndex] = useState(2); // Starts on line 3, matching Figma Image 2
  const [isPlaying, setIsPlaying] = useState(false);

  // Playback control states
  const [scrollSpeed, setScrollSpeed] = useState(2.0);
  const [textSize, setTextSize] = useState(18);
  const [boldness, setBoldness] = useState<"Light" | "Regular" | "Bold">("Regular");
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("center");
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    async function loadForgeData() {
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

        // 2. Fetch project script and parse into speech lines
        const scriptRes = await fetch(`${backendUrl}/v1/workshop/scripts?projectId=${projectParam}`).catch(() => null);
        if (scriptRes && scriptRes.ok) {
          const scriptData = await scriptRes.json().catch(() => null);
          const targetScript = Array.isArray(scriptData) ? scriptData[0] : scriptData;
          if (targetScript && targetScript.content) {
            const parsed = parseScriptToSpeechLines(targetScript.content);
            if (parsed.length > 0) {
              setTeleprompterLines(parsed);
              return;
            }
          }
        }

        // Fallback: fetch from teleprompter blocks
        const teleRes = await fetch(`${backendUrl}/v1/forge/teleprompter/${scriptParam}`).catch(() => null);
        if (teleRes && teleRes.ok) {
          const teleData = await teleRes.json().catch(() => null);
          if (teleData && Array.isArray(teleData.blocks) && teleData.blocks.length > 0) {
            const joinedText = teleData.blocks.map((b: { text?: string }) => b.text || "").join(" ");
            const parsed = parseScriptToSpeechLines(joinedText);
            if (parsed.length > 0) {
              setTeleprompterLines(parsed);
            }
          }
        }
      } catch {
        // Fallback to default lines
      }
    }
    loadForgeData();
  }, [projectParam, scriptParam]);

  // Auto-advance teleprompter line when isPlaying is active
  useEffect(() => {
    if (!isPlaying) return;

    // Line reading duration based on scroll speed (at 2.0x ~2.2s per line, at 1.0x ~4.4s)
    const intervalMs = Math.max(1200, Math.round(4400 / scrollSpeed));

    const timer = setInterval(() => {
      setActiveLineIndex((prev) => {
        if (prev < teleprompterLines.length - 1) {
          return prev + 1;
        } else {
          setIsPlaying(false);
          return prev;
        }
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, scrollSpeed, teleprompterLines.length]);

  const handlePrevLine = () => {
    setActiveLineIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextLine = () => {
    setActiveLineIndex((prev) => Math.min(teleprompterLines.length - 1, prev + 1));
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Calculate timing & progress metrics
  const totalDurationSeconds = 260; // 4:20
  const progressPercent = useMemo(() => {
    if (teleprompterLines.length <= 1) return 0;
    return Math.round((activeLineIndex / (teleprompterLines.length - 1)) * 100);
  }, [activeLineIndex, teleprompterLines.length]);

  const currentTimeLabel = useMemo(() => {
    const elapsedSeconds = Math.round((progressPercent / 100) * totalDurationSeconds);
    const mins = Math.floor(elapsedSeconds / 60);
    const secs = elapsedSeconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }, [progressPercent]);

  const handleSaveDraft = () => console.log("Saving draft context...");
  const handleExport = () => {
    router.push(`/lens?project=${projectParam}&script=${scriptParam}`);
  };

  return (
    <div className="w-full max-w-full min-w-0 overflow-x-hidden space-y-7 md:space-y-8 font-sans antialiased pb-12">
      {/* HEADER SECTION */}
      <ForgeHeader
        title={projectTitle}
        onSaveDraft={handleSaveDraft}
        onExport={handleExport}
        onStartRecording={handleTogglePlay}
      />

      {/* Main 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch w-full">
        {/* Left Column: Live Teleprompter + Playback Controls */}
        <div className="lg:col-span-2 flex flex-col justify-between space-y-6 w-full h-full">
          <div className="flex-1 flex flex-col min-h-0">
            <LiveTeleprompter
              lines={teleprompterLines}
              activeLineIndex={activeLineIndex}
              onSelectLine={setActiveLineIndex}
              textSize={textSize}
              boldness={boldness}
              alignment={alignment}
              currentTimeLabel={currentTimeLabel}
              totalTimeLabel="4:20"
              progressPercent={progressPercent}
            />
          </div>

          <PlaybackControls
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            onPrev={handlePrevLine}
            onNext={handleNextLine}
            scrollSpeed={scrollSpeed}
            setScrollSpeed={setScrollSpeed}
            textSize={textSize}
            setTextSize={setTextSize}
            boldness={boldness}
            setBoldness={setBoldness}
            alignment={alignment}
            setAlignment={setAlignment}
            autoScroll={autoScroll}
            setAutoScroll={setAutoScroll}
          />
        </div>

        {/* Right Sidebar Column: Unified Stack without empty gap */}
        <div className="flex flex-col space-y-4 w-full">
          <DocumentStatus />
          <ForgeAIAssistant
            workspaceId={projectParam}
            currentScript={teleprompterLines.join(" ")}
            onApplyScript={(newLines) => {
              if (Array.isArray(newLines) && newLines.length > 0) {
                setTeleprompterLines(newLines);
                setActiveLineIndex(0);
              }
            }}
          />
          <Collaborators />
          <VersionHistory />
        </div>
      </div>
    </div>
  );
}

export default function ForgePage() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-400 font-medium">Loading Forge Engine...</div>}>
      <ForgeContent />
    </Suspense>
  );
}