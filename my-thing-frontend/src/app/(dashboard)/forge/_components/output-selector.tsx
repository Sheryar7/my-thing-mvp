"use client";

import React from "react";
import { FiMic, FiVideo, FiActivity, FiSmartphone, FiFileText } from "react-icons/fi";

export type OutputType = "podcast" | "video" | "voiceover" | "social" | "blog";

interface OutputOption {
    id: OutputType;
    title: string;
    subtitle: string;
    icon: React.ElementType;
}

const OPTIONS: OutputOption[] = [
    {
        id: "podcast",
        title: "Podcast",
        subtitle: "Generate audio",
        icon: FiMic
    },
    {
        id: "video",
        title: "Video",
        subtitle: "Create AI video",
        icon: FiVideo
    },
    {
        id: "voiceover",
        title: "Voiceover",
        subtitle: "Generate speech",
        icon: FiActivity
    },
    {
        id: "social",
        title: "Social Post",
        subtitle: "Generate posts",
        icon: FiSmartphone
    },
    {
        id: "blog",
        title: "Blog",
        subtitle: "Convert into article",
        icon: FiFileText
    },
];

interface OutputSelectorProps {
    selected: OutputType;
    onSelect: (type: OutputType) => void;
}

export function OutputSelector({ selected, onSelect }: OutputSelectorProps) {
    return (
        <div className="space-y-3 w-full">
            <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                    Generate Output
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                    Choose what you'd like to create from your script.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 w-full">
                {OPTIONS.map((option) => {
                    const Icon = option.icon;
                    const isSelected = selected === option.id;

                    return (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => onSelect(option.id)}
                            className={`group p-4 rounded-2xl border text-left transition-all flex items-center gap-3.5 sm:flex-col sm:items-start sm:justify-between sm:min-h-[110px] ${isSelected
                                ? "bg-violet-50/80 border-indigo-600 shadow-xs ring-1 ring-indigo-600/20"
                                : "bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs"
                                }`}

                        //   className={`group p-4 rounded-2xl border text-left transition-all flex items-center gap-3.5 ${
                        //   isSelected
                        //     ? "bg-violet-50/80 border-indigo-600 shadow-xs ring-1 ring-indigo-600/20"
                        //     : "bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs"
                        // }`}
                        >
                            <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isSelected
                                    ? "bg-indigo-600 text-white"
                                    : "bg-violet-100/70 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white"
                                    }`}
                            >
                                <Icon className="w-5 h-5 stroke-[2]" />
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-slate-900">{option.title}</h3>
                                <p className="text-xs text-slate-400 font-medium mt-0.5">
                                    {option.subtitle}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}