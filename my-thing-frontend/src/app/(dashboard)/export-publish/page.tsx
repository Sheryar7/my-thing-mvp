// src/app/(dashboard)/export-publish/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

import { ExportFormat, FormatType } from "./_components/export-format";
import { ExportSettings } from "./_components/export-settings";
import { PublishTo } from "./_components/publish-to";
import { ExportSummary } from "./_components/export-summary";

export default function ExportPublishPage() {
  const router = useRouter();

  const [selectedFormat, setSelectedFormat] = useState<FormatType>("mp3");
  const [fileName, setFileName] = useState("Podcast Episode 12");
  const [quality, setQuality] = useState("High");
  const [includeSources, setIncludeSources] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState("Spotify");

  return (
<div className="w-full max-w-full min-w-0 overflow-x-hidden space-y-6 font-sans antialiased pb-12">
        {/* Header */}
      <div className="text-center sm:text-left w-full sm:w-auto">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Export & Publish
        </h1>
        <p className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">
          Choose how you'd like to save or share your final content.
        </p>
      </div>

      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-2 gap-6 items-start">
        {/* Left Column Container */}
        <div className="flex flex-col gap-6">
          <ExportFormat
            selectedFormat={selectedFormat}
            onSelectFormat={setSelectedFormat}
            onCopyText={() => navigator.clipboard.writeText("Sample text")}
          />
          <PublishTo
            selectedDestination={selectedDestination}
            onSelectDestination={setSelectedDestination}
          />
        </div>

        {/* Right Column Container */}
        <div className="flex flex-col gap-6">
          <ExportSettings
            fileName={fileName}
            setFileName={setFileName}
            quality={quality}
            setQuality={setQuality}
            includeSources={includeSources}
            setIncludeSources={setIncludeSources}
          />
          <ExportSummary
            projectName={fileName || "Untitled Project"}
            format={selectedFormat}
            destination={selectedDestination}
          />
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-center gap-3.5 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="w-auto px-6 py-2.5 h-10 text-indigo-700 border-indigo-700 hover:text-indigo-900 hover:border-indigo-900 text-xs sm:text-sm font-medium rounded-xl"
        >
          Back
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={() => console.log("Exporting...")}
          className="w-auto px-6 py-2.5 h-10 text-xs sm:text-sm font-semibold rounded-xl"
        >
          Export & Publish
        </Button>
      </div>
    </div>
  );
}