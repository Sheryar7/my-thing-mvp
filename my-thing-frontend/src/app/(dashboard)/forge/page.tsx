"use client";

import React, { useState } from "react";
import { ForgeHeader } from "./_components/forge-header";
import { ForgeAIAssistant } from "./_components/ForgeAIAssistant";
import { DocumentStatus } from "./_components/document-status";
import { LiveTeleprompter } from "./_components/live-teleprompter";
import { Collaborators } from "./_components/collaborators";
import { VersionHistory } from "./_components/version-history";
import { PlaybackControls } from "./_components/playback-controls";

export default function ForgePage() {
  const [prompt, setPrompt] = useState("");

  const handleSaveDraft = () => console.log("Saving draft context...");
  const handleStartRecording = () => console.log("Starting recording...");
  const handleExport = () => console.log("Opening export modal...");

  return (
    <div className="w-full max-w-full min-w-0 overflow-x-hidden space-y-6 font-sans antialiased pb-12">
      {/* HEADER SECTION COMPONENT */}
      <ForgeHeader
        onSaveDraft={handleSaveDraft}
        onExport={handleExport}
        onStartRecording={handleStartRecording}
      />

      {/* Main 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch w-full">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col justify-between h-full space-y-6">
          <div className="flex-1 flex flex-col">
            <LiveTeleprompter />
          </div>

          <div className="shrink-0">
            <PlaybackControls />
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="flex flex-col justify-between h-full space-y-6 w-full">
          <div className="space-y-4">
            <DocumentStatus />
            <ForgeAIAssistant />
            <Collaborators />
          </div>

          <div className="shrink-0">
            <VersionHistory />
          </div>
        </div>
      </div>
    </div>
  );
}