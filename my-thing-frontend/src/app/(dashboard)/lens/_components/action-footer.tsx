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
    <div className="hidden sm:flex items-center justify-center gap-3.5 w-full pt-2 pb-6">
      {/* Back to Workshop Button */}
      <Button
        type="button"
        variant="outline"
        onClick={handleBackToWorkshop}
        className="w-auto px-6 py-2.5 h-10 text-indigo-700 border-indigo-700 hover:text-indigo-900 hover:border-indigo-900 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap cursor-pointer"
      >
        Back to Workshop
      </Button>

      {/* Primary Export Button */}
      <Button
        type="button"
        variant="primary"
        onClick={handleExport}
        className="w-auto px-6 py-2.5 h-10 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap cursor-pointer"
      >
        <span>Export</span>
        <span>&rarr;</span>
      </Button>
    </div>
  );
}

