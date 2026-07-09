"use client";

import React from "react";
import { IoArchiveOutline, IoMicOutline, IoCheckmark } from "react-icons/io5";
import { LuPenLine } from "react-icons/lu";
import { WorkflowCard, type WorkflowCardConfig } from "@/components/dashboard/workflow-card";

const workflowSteps: WorkflowCardConfig[] = [
    {
        title: "Archive",
        description: "Track your sources and prepare research materials.",
        mobileDescription: "Track sources and research.", // Shorter version
        icon: IoArchiveOutline,
        accent: {
            background: "bg-emerald-50",
            border: "border-emerald-200",
            iconBackground: "bg-emerald-200",
            iconColor: "text-emerald-700",
            button: "border-emerald-300 text-emerald-700 hover:bg-emerald-50",
        },
    },
    {
        title: "Workshop",
        description: "Write and refine your script with AI assistance.",
        mobileDescription: "Write and refine your script.",
        icon: LuPenLine,
        accent: {
            background: "bg-violet-50",
            border: "border-violet-200",
            iconBackground: "bg-violet-200",
            iconColor: "text-violet-700",
            button: "border-violet-300 text-violet-700 hover:bg-violet-50",
        },
    },
    {
        title: "Forge",
        description: "Prepare everything before recording your content.",
        mobileDescription: "Prepare before recording.",
        icon: IoMicOutline,
        accent: {
            background: "bg-orange-50",
            border: "border-orange-200",
            iconBackground: "bg-orange-200",
            iconColor: "text-orange-700",
            button: "border-orange-300 text-orange-700 hover:bg-orange-50",
        },
    },
    {
        title: "Lens",
        description: "Validate facts and improve accuracy before publishing.",
        mobileDescription: "Validate facts and accuracy.",
        icon: IoCheckmark,
        accent: {
            background: "bg-pink-50",
            border: "border-pink-200",
            iconBackground: "bg-pink-200",
            iconColor: "text-pink-700",
            button: "border-pink-300 text-pink-700 hover:bg-pink-50",
        },
    },
];

export function WorkflowGrid() {
    // BACKEND TODO:
    // Replace static workflow configuration with API response when available.

    const handleOpenStage = (stageTitle: string) => {
        // BACKEND TODO:
        // Navigate to the selected workflow stage.
        console.log(`Workflow stage selected: ${stageTitle}`);
    };

    return (
        <section className="space-y-4">
            <div>
                <h3 className="text-lg font-bold tracking-tight text-slate-900">Workflow</h3>
                <p className="mt-1 text-sm text-slate-500">Your content creation process</p>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {workflowSteps.map((workflow) => (
                    <WorkflowCard
                        key={workflow.title}
                        workflow={workflow}
                        onOpen={handleOpenStage}
                    />
                ))}
            </div>
        </section>
    );
}

export default WorkflowGrid;
