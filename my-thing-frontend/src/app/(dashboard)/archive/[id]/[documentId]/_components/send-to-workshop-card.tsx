"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface SendToWorkshopCardProps {
  projectId: string;
}

export function SendToWorkshopCard({ projectId }: SendToWorkshopCardProps) {
  const router = useRouter();

  return (
    <div className="w-full max-w-full min-w-0 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
      <div className="space-y-2">
        <h3 className="font-bold text-slate-900 text-lg md:text-xl tracking-tight">
          Send to Workshop
        </h3>
        <div>
          <span className="inline-block text-[11px] font-semibold text-indigo-900 bg-[#EEECFE] px-3 py-1 rounded-full">
            Ready
          </span>
        </div>
      </div>

      <p className="break-words text-xs md:text-sm text-slate-800 font-normal leading-relaxed">
        Selected takeaways, keywords, and quotes will be synced into the Workshop draft automatically.
      </p>

      <div className="flex items-center gap-3 pt-1">
        <button
          type="button"
          onClick={() => router.push(`/archive/${projectId}/processing`)}
          className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs md:text-sm rounded-xl shadow-xs transition-colors text-center"
        >
          Generate Script
        </button>
        <button
          type="button"
          className="flex-1 py-2.5 bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold text-xs md:text-sm rounded-xl transition-colors text-center"
        >
          Save for Later
        </button>
      </div>
    </div>
  );
}