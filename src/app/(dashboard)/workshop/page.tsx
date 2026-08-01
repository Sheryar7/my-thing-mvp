"use client";

import Link from "next/link";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { ContextDeck } from "./_components/context-deck";
import { RichEditor } from "./_components/rich-editor";
import { AIAssistant } from "./_components/ai-assistant";
import { SourceDrawer } from "./_components/source-drawer";
import { QuickActions } from "./_components/quick-actions";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { HiArrowLeft } from "react-icons/hi";

export default function WorkshopPage() {
  // Active workspace ID target for Supabase RAG queries
  const WORKSPACE_ID = "8f11ccc8-308b-43a1-a8ad-2d7f727176df";

  // The page keeps editor and prompt state local so the writing canvas and assistant stay in sync without prop drilling.
  const [editorText, setEditorText] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // These handlers are intentionally lightweight placeholders so the workshop shell is fully wired before the backend integration is added.
  const handleSaveDraft = () => {
    console.log("Saving draft context...", editorText);
  };

  const handleContinueToForge = () => {
    console.log("Routing draft to Forge engine...");
  };

  const handleExecuteQuickAction = (actionKey: string) => {
    console.log(`Executing instant action: ${actionKey}`);
  };

  // Handles submitting the prompt to the RAG endpoint (/api/query)
  const handleAIGenerate = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: prompt,
          workspaceId: WORKSPACE_ID,
        }),
      });

      const data = await response.json();

      if (data.success && data.answer) {
        // Appends generated RAG response directly to the RichEditor state
        setEditorText((prevText) =>
          prevText ? `${prevText}\n\n${data.answer}` : data.answer
        );
        setPrompt(""); // Clear input after successful generation
      } else {
        alert("Generation failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("RAG Generation Error:", error);
      alert("Something went wrong connecting to the RAG engine.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen space-y-6 md:space-y-8 bg-transparent p-4 md:p-0 pb-24 md:pb-6 font-sans antialiased">
      {/* 1. STATE & EVENT HANDLERS */}
      {/* The header uses absolute positioning on mobile to keep the title centered without being pushed by the flanking action buttons, then resets to normal flow on larger screens. */}
      <div className="relative flex items-center justify-between gap-4 w-full border-b border-slate-100 pb-5 min-h-[56px] md:min-h-0">
        <div className="absolute left-0 md:relative md:left-auto flex items-center">
          <Link
            href="/dashboard"
            aria-label="Back to dashboard"
            className="md:hidden p-1 text-slate-600 hover:bg-slate-50 rounded-lg transition"
          >
            <HiArrowLeft className="w-6 h-6" />
          </Link>
        </div>

        <div className="w-full md:w-auto md:flex-1 flex justify-center md:justify-start">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Workshop
            </h1>
            <p className="hidden md:block text-xs sm:text-sm font-medium text-slate-400 mt-0.5">
              Podcast Episode 12
            </p>
          </div>
        </div>

        <div className="absolute right-0 md:relative md:right-auto flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="md:hidden p-2 text-slate-700 hover:bg-slate-50 rounded-xl transition"
          >
            <FiSave className="w-6 h-6" />
          </button>

          <Button
            type="button"
            variant="outline"
            onClick={handleSaveDraft}
            className="hidden md:block px-5 py-2.5 text-sm font-semibold rounded-xl border border-indigo-600/50 hover:border-indigo-600 hover:bg-indigo-50 text-indigo-600 bg-white shadow-sm whitespace-nowrap"
          >
            Save Draft
          </Button>

          <Button
            type="button"
            onClick={handleContinueToForge}
            className="hidden md:flex px-5 py-2.5 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm whitespace-nowrap items-center justify-center gap-1.5"
          >
            <span>Continue to Forge</span>
            <span>&rarr;</span>
          </Button>
        </div>
      </div>

      {/* 2. RESPONSIVE DESKTOP VS MOBILE VIEWPORTS */}
      <ContextDeck />

      {/* 3. MAIN FORM / CANVAS WRAPPER */}
      {/* The main layout uses a stacked mobile flow and a three-column desktop grid so the editing experience scales naturally with available space. */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 items-stretch w-full">
        <div className="lg:col-span-2 lg:h-full">
          <RichEditor text={editorText} onChange={setEditorText} />
        </div>

        <div className="flex flex-col gap-6 lg:gap-4 lg:h-full">
          <AIAssistant
            prompt={prompt}
            onChange={setPrompt}
            onSubmit={handleAIGenerate}
            isLoading={isLoading}
            workspaceId={WORKSPACE_ID}
          />
          <SourceDrawer />
          <QuickActions onActionTrigger={handleExecuteQuickAction} />

          <Button
            type="button"
            onClick={handleContinueToForge}
            className="md:hidden w-full py-3.5 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-[0.99]"
          >
            <span>Continue to Forge</span>
            <span>&rarr;</span>
          </Button>
        </div>
      </div>
    </div>
  );
}