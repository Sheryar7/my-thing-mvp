"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface ActiveProjectProps {
    title?: string;
    progress?: number;
    lastEdited?: string;
}

export function ActiveProjectCard({
    title = "The Physics of Black Holes & Spacetime",
    progress = 75,
    lastEdited = "Just now"
}: ActiveProjectProps) {
    const router = useRouter();

    const handleContinueProject = () => {
        router.push("/workshop?project=black-holes");
    };

    return (
        <div className="w-full rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 shadow-sm transition-shadow duration-200 hover:shadow-sm">
            {/* Desktop Layout (md+) */}
            <div className="hidden md:block">
                <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight truncate">
                            {title}
                        </h2>
                        <p className="text-xs text-slate-400 mt-1">
                            Last edited {lastEdited}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleContinueProject}
                        className="inline-flex items-center gap-1.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all duration-200 shrink-0 active:scale-[0.98] shadow-sm"
                    >
                        <span>Continue</span>
                        <span>→</span>
                    </button>
                </div>

                <div className="mt-4 flex items-center gap-3.5 w-full">
                    <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                            className="bg-[#4F46E5] h-full rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="text-xs font-bold text-slate-500 whitespace-nowrap">
                        {progress}%
                    </span>
                </div>
            </div>

            {/* Mobile Layout (< md) matching Figma mobile reference */}
            <div className="md:hidden flex flex-col space-y-3">
                <div className="min-w-0">
                    <h2 className="text-base font-bold text-slate-900 tracking-tight truncate">
                        {title}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                        Last edited {lastEdited}
                    </p>
                </div>

                {/* Progress bar with percentage label at top right */}
                <div className="space-y-1.5 pt-0.5">
                    <div className="flex justify-end">
                        <span className="text-[11px] font-bold text-slate-500">{progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                            className="bg-[#4F46E5] h-full rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Full-width Continue button at bottom */}
                <button
                    type="button"
                    onClick={handleContinueProject}
                    className="w-full mt-1.5 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold rounded-xl transition-colors duration-200 text-center shadow-sm active:scale-[0.98]"
                >
                    Continue →
                </button>
            </div>
        </div>
    );
}

export default ActiveProjectCard;