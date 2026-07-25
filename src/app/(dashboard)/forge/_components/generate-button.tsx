"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface GenerateButtonProps {
  onGenerate: () => void;
  isLoading?: boolean;
}

export function GenerateButton({ onGenerate, isLoading = false }: GenerateButtonProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Primary Action Button */}
      <Button
        type="button"
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full py-3.5 text-base font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all active:scale-[0.99] disabled:opacity-50"
      >
        {isLoading ? "Generating Content..." : "Generate Content"}
      </Button>

      {/* Mobile-Only Secondary Navigation Button (Matching Figma) */}
      <Link href="/lens" className="block md:hidden w-full">
        <Button
          type="button"
          className="w-full py-3.5 text-sm font-semibold rounded-2xl bg-[#e9ecef]/60 border border-slate-200/70 text-slate-400 hover:bg-slate-200/80 transition-all text-center shadow-xs"
        >
          Continue to Lens →
        </Button>
      </Link>
    </div>
  );
}