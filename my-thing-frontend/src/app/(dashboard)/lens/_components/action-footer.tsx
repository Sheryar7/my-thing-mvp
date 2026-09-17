"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

interface ActionFooterProps {
  onBackToWorkshop?: () => void;
  onExport?: () => void;
}

export function ActionFooter({
  onBackToWorkshop,
  onExport,
}: ActionFooterProps) {
  const router = useRouter();

  const handleBackToWorkshop = () => {
    if (onBackToWorkshop) {
      onBackToWorkshop();
    } else {
      router.push("/workshop");
    }
  };

const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      router.push("/export-publish"); // <-- Navigates to the new page
    }
  };

  return (
    <div className="w-full pt-2 pb-6">
      {/* Mobile Actions: Only Export button to match Image 1 */}
      <div className="flex sm:hidden w-full">
        <Button
          type="button"
          onClick={handleExport}
          className="w-full py-3.5 text-sm font-semibold rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
        >
          <span>Export</span>
          <span>&rarr;</span>
        </Button>
      </div>

      {/* Desktop Actions: Centered inline buttons */}
      <div className="hidden sm:flex items-center justify-center gap-3.5 w-full">
        <Button
          type="button"
          variant="outline"
          onClick={handleBackToWorkshop}
          className="w-auto px-6 py-2.5 h-10 text-indigo-700 border border-indigo-600/70 hover:bg-indigo-50 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap cursor-pointer transition"
        >
          Back to Workshop
        </Button>

        <Button
          type="button"
          variant="primary"
          onClick={handleExport}
          className="w-auto px-6 py-2.5 h-10 text-xs sm:text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white whitespace-nowrap shadow-xs cursor-pointer flex items-center gap-1.5 transition"
        >
          <span>Export</span>
          <span>&rarr;</span>
        </Button>
      </div>
    </div>
  );
}

