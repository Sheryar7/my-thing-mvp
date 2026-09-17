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

export function WorkflowCard({ workflow, onOpen }: WorkflowCardProps) {
    const IconComponent = workflow.icon;

    return (
        <article
            onClick={() => onOpen(workflow.title)}
            className={`group flex h-full flex-col justify-between rounded-2xl border p-4 sm:p-5 transition-all duration-200 hover:shadow-sm cursor-pointer active:scale-[0.99] ${workflow.accent.background} ${workflow.accent.border}`}
        >
            {/* Top Row: Circular Icon on the Left, Title & Description on the Right */}
            <div className="flex items-start gap-3 sm:gap-3.5">
                {/* Circular Icon Badge */}
                <div className={`flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full ${workflow.accent.iconBackground} ${workflow.accent.iconColor}`}>
                    <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>

                {/* Content Column: Title + Description stacked on the right */}
                <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                        {workflow.title}
                    </h3>

                    {/* Mobile description (< lg) */}
                    <p className="block lg:hidden mt-0.5 text-xs leading-tight text-slate-500">
                        {workflow.mobileDescription}
                    </p>

                    {/* Desktop description (lg+) */}
                    <p className="hidden lg:block mt-1 text-xs leading-relaxed text-slate-500 min-h-[38px]">
                        {workflow.description}
                    </p>
                </div>
            </div>

            {/* Desktop Open Button (matches Figma design with white background and themed border/text) */}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    onOpen(workflow.title);
                }}
                className={`hidden lg:inline-flex mt-4 sm:mt-5 w-full items-center justify-center rounded-xl border bg-white py-2 px-3 text-xs sm:text-sm font-semibold transition-all duration-200 hover:brightness-95 active:scale-[0.98] ${workflow.accent.button}`}
            >
                Open →
            </button>
        </article>
    );
}

export default WorkflowCard;
