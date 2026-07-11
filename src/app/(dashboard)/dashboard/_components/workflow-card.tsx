"use client";

import React from "react";

export interface WorkflowCardConfig {
    title: string;
    description: string;
    mobileDescription: string;
    icon: React.ComponentType<{ className?: string }>;
    accent: {
        background: string;
        border: string;
        iconBackground: string;
        iconColor: string;
        button: string;
    };
}

interface WorkflowCardProps {
    workflow: WorkflowCardConfig;
    onOpen: (title: string) => void;
}

// Reusable workflow card component with consistent spacing and hover behavior.
export function WorkflowCard({ workflow, onOpen }: WorkflowCardProps) {
    const IconComponent = workflow.icon;

    return (
        <article className={`group flex h-full flex-col justify-between rounded-3xl border p-4 shadow-sm transition-shadow duration-200 hover:shadow-sm ${workflow.accent.background} ${workflow.accent.border}`}>
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${workflow.accent.iconBackground} ${workflow.accent.iconColor}`}>
                        <IconComponent className="h-5 w-5" />
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-slate-900">{workflow.title}</h4>

                        {/* DESKTOP DESCRIPTION: Hidden on mobile, blocks on desktop screens */}
                        <p className="hidden md:block mt-2 text-xs leading-5 text-slate-500">
                            {workflow.description}
                        </p>

                        {/* MOBILE DESCRIPTION: Block on mobile, hidden on desktop screens */}
                        <p className="block md:hidden mt-2 text-xs leading-5 text-slate-500">
                            {workflow.mobileDescription}
                        </p>
                    </div>
                </div>
            </div>

            <button
                type="button"
                onClick={() => onOpen(workflow.title)}
                className={`mt-4 inline-flex items-center justify-center rounded-2xl border px-4 py-2.5 text-xs font-semibold transition-all duration-200 hover:brightness-95 active:scale-[0.98] ${workflow.accent.button}`}
            >
                Open →
            </button>
        </article>
    );
}

export default WorkflowCard;
