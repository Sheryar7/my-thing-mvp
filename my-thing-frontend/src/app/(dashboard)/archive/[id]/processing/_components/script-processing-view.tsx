"use client";

import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { HiArrowLeft } from "react-icons/hi";
import { IoSparklesOutline } from "react-icons/io5";
import { useRouter, useParams } from "next/navigation";

export default function ScriptProcessingView() {
    const router = useRouter();
    const params = useParams();
    const projectId = (params?.id as string) || "black-holes";
    const [progress, setProgress] = useState(85);
    const [steps, setSteps] = useState([
        { label: "Reading real research sources", status: "completed" },
        { label: "Extracting key insights and claims", status: "completed" },
        { label: "Organizing narrative outline", status: "completed" },
        { label: "Writing your educational script...", status: "active" },
        { label: "Syncing with Workshop", status: "pending" },
    ]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setProgress(100);
            setSteps([
                { label: "Reading real research sources", status: "completed" },
                { label: "Extracting key insights and claims", status: "completed" },
                { label: "Organizing narrative outline", status: "completed" },
                { label: "Writing your educational script...", status: "completed" },
                { label: "Syncing with Workshop", status: "completed" },
            ]);
            setTimeout(() => {
                router.push(`/workshop?project=${projectId}`);
            }, 800);
        }, 1500);
        return () => clearTimeout(timer);
    }, [projectId, router]);

    return (
        <div className="w-full max-w-full min-w-0 overflow-x-hidden space-y-6 font-sans antialiased pb-12">
            {/* Top Navigation Header styled exactly like DocumentHeader */}
            <div className="w-full max-w-md relative flex flex-col items-center sm:items-start text-center sm:text-left mb-2 md:hidden">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="sm:hidden absolute left-0 top-1 text-slate-800 hover:text-indigo-600 transition-colors p-1"
                    aria-label="Back to project"
                >
                    <HiArrowLeft className="w-4 h-4" />
                </button>

                <h1 className="text-xl font-bold tracking-tight text-slate-900 px-8 sm:px-0">
                    My Thing
                </h1>
            </div>

            {/* AFTER */}
            <div className="max-w-md w-full mx-auto flex flex-col items-center text-center space-y-5 md:space-y-6 md:py-8">
                {/* Animated AI Circle */}
                <div className="relative w-44 h-44 sm:w-50 sm:h-50 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="42"
                            className="text-slate-300"
                            strokeWidth="5"
                            stroke="currentColor"
                            fill="transparent"
                        />
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

                {/* Steps Card */}
                <div className="w-full bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs text-left divide-y divide-slate-100">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className={`flex items-center gap-3.5 ${idx === 0 ? "pb-4" : idx === steps.length - 1 ? "pt-4" : "py-4"
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
                                className={`text-xs md:text-sm font-medium ${step.status === "completed"
                                    ? "text-emerald-500"
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