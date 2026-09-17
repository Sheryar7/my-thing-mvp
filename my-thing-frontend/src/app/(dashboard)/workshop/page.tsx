"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { RichEditor } from "./_components/rich-editor";
import { AIAssistant } from "./_components/ai-assistant";
import { Collaborators } from "./_components/collaborators";
import { VersionHistory } from "./_components/version-history";
import { SourceItem } from "./_components/source-drawer";
import { WorkshopHeader } from "./_components/workshop-header";

function WorkshopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectParam = searchParams.get("project") || "black-holes";

  const [projectTitle, setProjectTitle] = useState("The Physics of Black Holes & Spacetime");
  const [scriptId, setScriptId] = useState("ffffffff-0000-0000-0000-000000000001");
  const [editorText, setEditorText] = useState(
    `Welcome to the edge of known physics. For over a century, black holes lived purely within the mathematical equations of Albert Einstein's general theory of relativity. But today, they stand as verified cosmic realities that push our understanding of space, time, and quantum mechanics to their absolute breaking points.\n\nIn 2019, humanity witnessed what was once deemed impossible: the Event Horizon Telescope captured the first direct visual image of the supermassive black hole at the core of galaxy Messier 87 [cite:aaaaaaaa-0000-0000-0000-000000000001]. Fifty-five million light-years away, an inferno of relativistic plasma swirls at near light speed around a dark central void, matching Einstein's equations with breathtaking precision.\n\nYet at the boundary known as the event horizon, our classical laws meet quantum reality. In 1974, physicist Stephen Hawking uncovered a startling truth [cite:aaaaaaaa-0000-0000-0000-000000000002]. Through quantum vacuum fluctuations, black holes are not completely black—they emit a faint thermal glow known as Hawking Radiation. Over unimaginably vast spans of time, this leakage of energy causes even the most colossal black holes to evaporate into nothingness.`
  );
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastSyncedText, setLastSyncedText] = useState("Last synced 1 minute ago");

  const [sources, setSources] = useState<SourceItem[]>([
    { id: "aaaaaaaa-0000-0000-0000-000000000001", title: "Event Horizon Telescope Observations", type: "Web", selected: true },
    { id: "aaaaaaaa-0000-0000-0000-000000000002", title: "Stephen Hawking - Particle Creation.pdf", type: "PDF", selected: true },
    { id: "aaaaaaaa-0000-0000-0000-000000000003", title: "LIGO Gravitational Waves Detection", type: "Video", selected: true },
    { id: "aaaaaaaa-0000-0000-0000-000000000004", title: "Spacetime Singularity Notes", type: "Notes", selected: true },
  ]);

  useEffect(() => {
    async function loadData() {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_NESTJS_BACKEND_URL || "http://localhost:4000";

        // 1. Fetch project info
        const projRes = await fetch(`${backendUrl}/v1/projects/${projectParam}`);
        if (projRes.ok) {
          const projData = await projRes.json();
          if (projData && projData.name) {
            setProjectTitle(projData.name);
          }
        }

        // 2. Fetch real sources
        const srcRes = await fetch(`${backendUrl}/v1/archive/sources?projectId=${projectParam}`).catch(() => null);
        if (srcRes && srcRes.ok) {
          const srcData = await srcRes.json().catch(() => null);
          if (Array.isArray(srcData) && srcData.length > 0) {
            setSources(
              srcData.map((s: { id: string; title: string; source_type?: string }) => {
                const sType = (s.source_type || "").toLowerCase();
                const mappedType: "Web" | "PDF" | "Video" | "Notes" =
                  sType === "pdf" ? "PDF" : sType === "video" ? "Video" : sType === "notes" ? "Notes" : "Web";
                return {
                  id: s.id,
                  title: s.title,
                  type: mappedType,
                  selected: true,
                };
              })
            );
          }
        }

        // 3. Fetch real scripts
        const scriptRes = await fetch(`${backendUrl}/v1/workshop/scripts?projectId=${projectParam}`).catch(() => null);
        if (scriptRes && scriptRes.ok) {
          const scriptData = await scriptRes.json().catch(() => null);
          if (Array.isArray(scriptData) && scriptData.length > 0) {
            setScriptId(scriptData[0].id);
            if (scriptData[0].content) {
              setEditorText(scriptData[0].content);
            }
          }
        }
      } catch {
        // Quietly fallback to defaults
      }
    }
    loadData();
  }, [projectParam]);

  const handleSaveDraft = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_NESTJS_BACKEND_URL || "http://localhost:4000";
      const res = await fetch(`${backendUrl}/v1/workshop/scripts/${scriptId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editorText }),
      }).catch(() => null);
      if (res && res.ok) {
        setLastSyncedText("Saved draft just now");
      }
    } catch {
      // Quietly handle save failure
    }
  };

  const handleSyncToForge = () => {
    router.push(`/forge?project=${projectParam}&script=${scriptId}`);
  };

  const handleInvite = () => console.log("Opening invite modal...");

  const activeDocumentIds = sources.filter((s) => s.selected).map((s) => s.id);

  const handleAIGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_NESTJS_BACKEND_URL || "http://localhost:4000";
      const payload: Record<string, unknown> = {
        question: prompt,
        workspaceId: projectParam,
      };
      if (activeDocumentIds.length > 0) payload.documentIds = activeDocumentIds;

      const response = await fetch(`${backendUrl}/v1/rag/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok && data.success && data.answer) {
        setEditorText((prevText) => (prevText ? `${prevText}\n\n${data.answer}` : data.answer));
        setPrompt("");
        setLastSyncedText("AI generated paragraph added");
      } else {
        alert("Generation failed: " + (data.message || data.error || "Unknown error"));
      }
    } catch {
      alert("Something went wrong connecting to the NestJS RAG engine.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-full min-w-0 overflow-x-hidden space-y-7 md:space-y-8 font-sans antialiased pb-12">
      {/* HEADER SECTION */}
      <WorkshopHeader
        title={projectTitle}
        sourcesCount={sources.length}
        lastSyncedText={lastSyncedText}
        onInvite={handleInvite}
        onSaveDraft={handleSaveDraft}
        onSyncToForge={handleSyncToForge}
      />

      {/* MAIN LAYOUT GRID */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 items-stretch w-full">
        {/* LEFT COLUMN: EDITOR */}
        <div className="lg:col-span-2 w-full h-full">
          <RichEditor text={editorText} onChange={setEditorText} />
        </div>

        {/* RIGHT COLUMN: SIDEBAR STACK */}
        <div className="flex flex-col gap-4 w-full h-full">
          <AIAssistant
            prompt={prompt}
            onChange={setPrompt}
            onSubmit={handleAIGenerate}
            isLoading={isLoading}
            workspaceId={projectParam}
            selectedDocumentIds={activeDocumentIds}
          />

          <Collaborators onInvite={handleInvite} />

          <VersionHistory
            onSelectVersion={(v) => console.log("Selected version:", v.versionLabel)}
          />
        </div>
      </div>
    </div>
  );
}

export default function WorkshopPage() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-400 font-medium">Loading Workshop...</div>}>
      <WorkshopContent />
    </Suspense>
  );
}