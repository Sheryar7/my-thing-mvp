"use client";

import React, { useState } from "react";
import { RichEditor } from "./_components/rich-editor";
import { AIAssistant } from "./_components/ai-assistant";
import { Collaborators } from "./_components/collaborators";
import { VersionHistory } from "./_components/version-history";
import { SourceItem } from "./_components/source-drawer";
import { WorkshopHeader } from "./_components/workshop-header";

export default function WorkshopPage() {
  const WORKSPACE_ID = "8f11ccc8-308b-43a1-a8ad-2d7f727176df";

  const [editorText, setEditorText] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [sources] = useState<SourceItem[]>([
    { id: "3e9368b3-2c83-404f-b36a-5788c4a00001", title: "OpenAI Blog", type: "Web", selected: true },
    { id: "3e9368b3-2c83-404f-b36a-5788c4a00002", title: "AI Ethics Report", type: "PDF", selected: true },
  ]);

  const handleSaveDraft = () => console.log("Saving draft context...", editorText);
  const handleSyncToForge = () => console.log("Syncing draft to Forge engine...");
  const handleInvite = () => console.log("Opening invite modal...");

  const activeDocumentIds = sources.filter((s) => s.selected).map((s) => s.id);

  const handleAIGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_NESTJS_BACKEND_URL || "http://localhost:4000";
      const payload: Record<string, any> = { question: prompt, workspaceId: WORKSPACE_ID };
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
      } else {
        alert("Generation failed: " + (data.message || data.error || "Unknown error"));
      }
    } catch (error: any) {
      console.error("RAG Generation Error:", error);
      alert("Something went wrong connecting to the NestJS RAG engine.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-full min-w-0 overflow-x-hidden space-y-6 font-sans antialiased pb-12">
      {/* HEADER SECTION */}
      <WorkshopHeader
        title="Podcast Episode 12"
        sourcesCount={18}
        lastSyncedText="Last synced 1 minute ago"
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
            workspaceId={WORKSPACE_ID}
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