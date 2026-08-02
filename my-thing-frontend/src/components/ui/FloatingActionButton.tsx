"use client";

import React from "react";
import { FiPlus } from "react-icons/fi";

interface FABProps {
  onClick: () => void;
  ariaLabel?: string;
}

export function FloatingActionButton({ onClick, ariaLabel = "Create new item" }: FABProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-20 right-4 md:hidden z-50 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
      aria-label={ariaLabel}
    >
      <FiPlus className="h-7 w-7 stroke-[2.5]" />
    </button>
  );
}