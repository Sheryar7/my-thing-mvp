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
  const [fileName, setFileName] = useState("The Physics of Black Holes & Spacetime");
  const [quality, setQuality] = useState("High");
  const [includeSources, setIncludeSources] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState("Spotify");

  return (
    <div className="w-full max-w-7xl mx-auto space-y-7 md:space-y-8 font-sans antialiased pb-12">
      {/* Header */}
      <div className="text-center sm:text-left w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Export & Publish
        </h1>
        <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
          Choose how you'd like to save or share your final content.
        </p>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 items-start">
        {/* Left Column Container */}
        <div className="flex flex-col gap-5 lg:gap-6">
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
        <div className="flex flex-col gap-5 lg:gap-6">
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
      <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-3 sm:gap-3.5 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="w-full sm:w-auto px-6 py-2.5 h-10 text-indigo-700 border border-indigo-600/70 hover:bg-indigo-50 text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center cursor-pointer transition"
        >
          Back
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={() => console.log("Exporting...")}
          className="w-full sm:w-auto px-6 py-2.5 h-10 text-xs sm:text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center cursor-pointer shadow-xs transition"
        >
          Export & Publish
        </Button>
      </div>
    </div>
  );
}