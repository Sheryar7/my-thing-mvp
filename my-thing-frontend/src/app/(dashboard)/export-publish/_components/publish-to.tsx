"use client";

import React from "react";
import { FaSpotify, FaYoutube, FaLinkedin, FaMedium } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

interface PublishToProps {
  selectedDestination: string;
  onSelectDestination: (dest: string) => void;
}

export function PublishTo({
  selectedDestination,
  onSelectDestination,
}: PublishToProps) {
  const platforms = [
    { id: "Spotify", label: "Spotify", actionText: "Connect Account", icon: FaSpotify, color: "text-emerald-500" },
    { id: "Youtube", label: "Youtube", actionText: "Connect Account", icon: FaYoutube, color: "text-red-600" },
    { id: "LinkedIn", label: "LinkedIn", actionText: "Share", icon: FaLinkedin, color: "text-sky-600" },
    { id: "Medium", label: "Medium", actionText: "Publish", icon: FaMedium, color: "text-slate-900" },
  ];

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
      <h2 className="text-base font-bold text-slate-900">Publish To</h2>

      <div className="space-y-2.5">
        {platforms.map((p) => {
          const Icon = p.icon;
          const isSelected = selectedDestination === p.id;

          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelectDestination(p.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? "border-indigo-500 bg-[#EEECFE]/40"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="flex items-center gap-3 shrink-0">
                <Icon className={`w-5 h-5 ${p.color} shrink-0`} />
                <span className="text-xs font-bold text-slate-800">{p.label}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400 shrink-0">
                <span className="text-[11px] font-medium">{p.actionText}</span>
                <FiChevronRight className="w-3.5 h-3.5 shrink-0" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}