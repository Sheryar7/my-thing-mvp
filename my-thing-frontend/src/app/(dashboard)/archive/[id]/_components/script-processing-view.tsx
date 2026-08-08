"use client";

import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { IoSparklesOutline } from "react-icons/io5";

export default function ScriptProcessingView() {
    const [progress, setProgress] = useState(85);
    const [steps] = useState([
        { label: "Reading 10 sources", status: "completed" },
        { label: "Extracting key insights", status: "completed" },
        { label: "Organizing research", status: "completed" },
        { label: "Writing your first draft...", status: "active" },
        { label: "Syncing with Workshop", status: "pending" },
    ]);

    return (
        <div className="w-full min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 font-sans antialiased">
            <div className="max-w-md w-full flex flex-col items-center text-center space-y-6">

                {/* Animated AI Circle (Figma Pixel-Perfect Match) */}
                <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        {/* Background Track Circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r="42"
                            className="text-slate-300"
                            strokeWidth="5"
                            stroke="currentColor"
                            fill="transparent"
                        />
                        {/* Animated Progress Circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r="42"
                            className="text-indigo-600 transition-all duration-500 ease-out"
                            strokeWidth="5"
                            strokeDasharray={264}
                            strokeDashoffset={264 - (264 * progress) / 100}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                        />
                    </svg>

                    {/* Center Sparkles Icon */}
                    <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
                        <IoSparklesOutline className="w-8 h-8 fill-indigo-600" />
                    </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                        Generating Your Script...
                    </h1>
                    <p className="text-xs md:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed font-normal">
                        Our AI is analyzing your research, extracting key insights, and preparing your first draft.
                    </p>
                </div>

                {/* Steps Card with Increased Vertical Spacing */}
                <div className="w-full bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs text-left divide-y divide-slate-100">
                    {steps.map((step, idx) => (
                        <div 
                            key={idx} 
                            className={`flex items-center gap-3.5 ${
                                idx === 0 ? "pb-4" : idx === steps.length - 1 ? "pt-4" : "py-4"
                            }`}
                        >
                            {step.status === "completed" && (
                                <FaCheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                            )}

                            {step.status === "active" && (
                                <div className="w-5 h-5 flex items-center justify-center shrink-0 text-indigo-600">
                                    <FiLoader className="w-4 h-4 animate-spin" />
                                </div>
                            )}

                            {step.status === "pending" && (
                                <div className="w-5 h-5 rounded-full border border-slate-400/80 shrink-0" />
                            )}

                            <span
                                className={`text-xs md:text-sm font-medium ${
                                    step.status === "completed"
                                        ? "text-emerald-600"
                                        : step.status === "active"
                                            ? "text-indigo-600"
                                            : "text-slate-600"
                                }`}
                            >
                                {step.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-xs space-y-2 pt-2">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                            className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="text-[11px] font-semibold text-slate-400">
                        {progress}% Complete
                    </p>
                </div>

            </div>
        </div>
    );
}