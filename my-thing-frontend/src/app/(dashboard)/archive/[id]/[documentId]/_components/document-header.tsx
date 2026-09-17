"use client";

import React from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { HiArrowLeft } from "react-icons/hi";

interface DocumentHeaderProps {
  projectId: string;
  docMetadata: {
    title: string;
    projectTitle?: string;
    typeLabel: string;
    statsLabel: string;
    timeLabel: string;
  };
}

export function DocumentHeader({ projectId, docMetadata }: DocumentHeaderProps) {
  return (
    <div className="space-y-2">
      <Link
        href={`/archive/${projectId}`}
        className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors w-fit mb-1.5"
      >
        <FiArrowLeft className="w-4 h-4" />
        <span>Back to {docMetadata.projectTitle || "Project"}</span>
      </Link>

      <div className="relative flex flex-col items-center sm:items-start text-center sm:text-left">
        <Link
          href={`/archive/${projectId}`}
          className="sm:hidden absolute left-0 top-1 text-slate-800 hover:text-indigo-600 transition-colors p-1"
          aria-label="Back to project"
        >
          <HiArrowLeft className="w-4 h-4" />
        </Link>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900 px-8 sm:px-0">
          {docMetadata.title}
        </h1>

        <p className="text-xs text-slate-500 font-medium mt-1.5">
          {docMetadata.typeLabel} • {docMetadata.statsLabel} • {docMetadata.timeLabel}
        </p>
      </div>
    </div>
  );
}