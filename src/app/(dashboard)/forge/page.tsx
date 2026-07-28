"use client";

import React, { useState } from "react";
import { ForgeHeader } from "./_components/forge-header";
import { ScriptPreview } from "./_components/script-preview";
import { OutputSelector, OutputType } from "./_components/output-selector";
import { ForgeSettings, SettingsState } from "./_components/forge-settings";
import { MediaPreview } from "./_components/media-preview";
import { GenerateButton } from "./_components/generate-button";

export default function ForgePage() {
  const [selectedOutput, setSelectedOutput] = useState<OutputType>("podcast");
  const [settings, setSettings] = useState<SettingsState>({
    voice: "Emma",
    language: "English",
    tone: "Professional",
    duration: 5,
    creativity: 30,
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSettingsChange = (updated: Partial<SettingsState>) => {
    setSettings((prev) => ({ ...prev, ...updated }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    console.log("Generating output with config:", {
      selectedOutput,
      settings,
    });

    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen space-y-6 md:space-y-8 bg-transparent p-4 md:p-0 pb-24 md:pb-6 font-sans antialiased">
      <ForgeHeader />

      {/* On mobile: Script Preview shows above Output Selector (as per Figma) */}
      <div className="flex flex-col md:hidden gap-6">
        <ScriptPreview />
        <OutputSelector selected={selectedOutput} onSelect={setSelectedOutput} />
      </div>

      {/* On desktop: standard flow */}
      <div className="hidden md:flex md:flex-col md:gap-8">
        <ScriptPreview />
        <OutputSelector selected={selectedOutput} onSelect={setSelectedOutput} />
      </div>

      <ForgeSettings settings={settings} onChange={handleSettingsChange} />
      <MediaPreview />
      <GenerateButton onGenerate={handleGenerate} isLoading={isGenerating} />
    </div>
  );
}