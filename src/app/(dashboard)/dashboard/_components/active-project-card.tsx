"use client";

import React from "react";
import { DashboardCard } from "./dashboard-card";
import Button from "@/components/ui/Button";

interface ActiveProjectProps {
    title: string;
    progress: number;
    lastEdited: string;
}

export function ActiveProjectCard({ title, progress, lastEdited }: ActiveProjectProps) {
    const handleContinueProject = () => {
        console.log(`Navigating to edit project: ${title}`);
    };

    return (
        <DashboardCard className="p-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between w-full">
            <div className="flex-1 min-w-0">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight truncate">
                        {title}
                    </h2>
                    <span className="text-xs md:text-sm font-medium text-slate-400 block mt-1">
                        Last edited {lastEdited}
                    </span>
                </div>

                <div className="mt-5 md:mt-6 md:max-w-[65%]">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                                className="bg-violet-600 h-full rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="text-sm font-bold text-violet-600 whitespace-nowrap">
                            {progress}%
                        </span>
                    </div>
                </div>
            </div>

            <Button
                onClick={handleContinueProject}
                className="w-full md:w-auto bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg px-4 py-2 text-sm transition-colors duration-200 shadow-sm"
            >
                Continue →
            </Button>
        </DashboardCard>
    );
}

export default ActiveProjectCard;