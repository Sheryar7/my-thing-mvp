"use client";

import React from "react";
import { IoMicOutline } from "react-icons/io5";
import { FiFolder, FiFileText, FiLink } from "react-icons/fi";
import { LuBookOpen } from "react-icons/lu";

export function ContextDeck() {
  // The same metadata object is reused for both layouts so the card content stays consistent while the presentation changes by viewport.
  const cards = [
    {
      label: "Project",
      val: "Podcast Episode 12",
      icon: FiFolder,
      color: "text-icon-text bg-icon-bg"
    },
    {
      label: "Content Type",
      val: "Podcast Script",
      icon: FiFileText,
      color: "text-icon-text bg-icon-bg"
    },
    {
      label: "Selected Sources",
      val: "5 Sources",
      icon: FiLink,
      color: "text-icon-text bg-icon-bg"
    },
  ];

  return (
    <>
      {/* 1. CONTENT MODEL */}
      {/* Desktop view keeps the metadata in a grid so the workspace feels dense and structured on larger screens. */}
      <div className="hidden md:grid grid-cols-3 gap-4 w-full">
        {cards.map((card, i) => (
          <div key={i} className="flex items-center gap-4 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm">
            <div className={`p-3 rounded-3xl ${card.color} shrink-0`}>
              <card.icon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold tracking-wide uppercase">{card.label}</span>
              <p className="text-base font-bold text-slate-800 mt-0.5">{card.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 2. RESPONSIVE DESKTOP VS MOBILE VIEWPORTS */}
      {/* Mobile view consolidates the same context into a single card so the interface stays calm and scannable on narrow screens. */}
      <div className="md:hidden w-full bg-white border border-slate-200/80 rounded-[20px] p-5 flex items-center gap-4 shadow-sm">
        {/* The circular icon badge gives the compact mobile card a softer visual anchor without adding extra layout weight. */}
        <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-icon-text shrink-0">
          <IoMicOutline className="w-6 h-6 stroke-[2.2]" />
        </div>

        {/* The stacked text block preserves the same hierarchy as the desktop card while consuming less horizontal space. */}
        <div className="flex flex-col">
          <h2 className="font-bold text-slate-800 text-[16px] leading-snug">Podcast Episode 12</h2>
          <span className="text-xs text-slate-400 font-medium mt-0.5">Podcast Script</span>

          {/* The source link remains visually prominent because it is the most actionable piece of context in this compact layout. */}
          <button className="text-xs font-bold text-icon-text hover:text-indigo-700 flex items-center gap-1.5 mt-2 transition-colors">
            <LuBookOpen className="w-4 h-4 stroke-[2.2]" />
            <span>5 Sources Linked</span>
          </button>
        </div>
      </div>
    </>
  );
}