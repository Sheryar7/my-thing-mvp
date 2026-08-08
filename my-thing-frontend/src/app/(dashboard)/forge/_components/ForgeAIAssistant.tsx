"use client";

import React, { useState } from "react";
import {
    FiSend,
    FiEdit3,
    FiMinimize2,
    FiMaximize2,
    FiPauseCircle,
    FiUnderline,
    FiSmile,
    FiBriefcase,
} from "react-icons/fi";
import { IoSparklesOutline } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";

interface ForgeAssistantProps {
    workspaceId?: string;
    selectedDocumentIds?: string[];
    onResponse?: (answer: string, chunks?: any[]) => void;
}

export function ForgeAIAssistant({
    workspaceId,
    selectedDocumentIds = [],
    onResponse,
}: ForgeAssistantProps) {
    const [input, setInput] = useState("");
    const [userPrompt, setUserPrompt] = useState("Make this easier to read aloud.");
    const [response, setResponse] = useState<string | null>(
        "I’ve shortened long sentences, added natural pauses, and improved pacing."
    );
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const quickActions = [
        { label: "Simplify", icon: FiEdit3, prompt: "Simplify script for reading aloud" },
        { label: "Shorten", icon: FiMinimize2, prompt: "Shorten sentences for speech pacing" },
        { label: "Expand", icon: FiMaximize2, prompt: "Elaborate points for narration" },
        { label: "Add Pauses", icon: FiPauseCircle, prompt: "Add natural pause marks throughout script" },
        { label: "Emphasize Words", icon: FiUnderline, prompt: "Highlight key words to emphasize while speaking" },
        { label: "Friendly Tone", icon: FiSmile, prompt: "Change tone to friendly and conversational" },
        { label: "Professional Tone", icon: FiBriefcase, prompt: "Change tone to professional and formal" },
    ];

    const handleQuery = async (queryText: string) => {
        if (!queryText.trim() || isLoading) return;

        setUserPrompt(queryText);
        setIsLoading(true);
        setError(null);

        try {
            const backendUrl =
                process.env.NEXT_PUBLIC_NESTJS_BACKEND_URL || "http://localhost:4000";

            const payload: Record<string, any> = {
                question: queryText,
                workspaceId: workspaceId || "8f11ccc8-308b-43a1-a8ad-2d7f727176df",
            };

            if (selectedDocumentIds.length > 0) {
                payload.documentIds = selectedDocumentIds;
            }

            const res = await fetch(`${backendUrl}/v1/rag/query`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setResponse(data.answer);
                if (onResponse) onResponse(data.answer, data.chunksRetrieved);
                setInput("");
            } else {
                setError(data.message || data.error || "Failed to generate AI response.");
            }
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4 w-full">
            {/* Header */}
            <div>
                <div className="flex items-center gap-2">
                    <IoSparklesOutline className="w-4 h-4 text-indigo-700" />
                    <h3 className="text-base font-bold text-slate-900 tracking-tight">
                        AI Assistant
                    </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                    Improve your narration instantly.
                </p>
            </div>

            {/* Quick Actions Grid */}
            <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 block">
                    Quick Actions
                </span>
                <div className="flex flex-wrap gap-1.5">
                    {quickActions.map((action) => {
                        const Icon = action.icon;
                        return (
                            <button
                                key={action.label}
                                type="button"
                                onClick={() => handleQuery(action.prompt)}
                                disabled={isLoading}
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-[11px] font-medium text-indigo-900 hover:bg-slate-50 hover:border-slate-300 transition active:scale-95 cursor-pointer shadow-2xs disabled:opacity-50"
                            >
                                <Icon className="w-3 h-3 text-indigo-900" />
                                <span>{action.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Compact Chat Preview Container */}
            <div className="space-y-2 pt-1">
                {/* User Prompt Message */}
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => handleQuery(userPrompt)}
                        className="bg-white border border-slate-200/90 text-slate-900 text-[11px] font-medium px-3.5 py-1.5 rounded-xl shadow-2xs max-w-[85%] text-left hover:bg-slate-50 transition cursor-pointer"
                    >
                        {userPrompt}
                    </button>
                </div>

                {/* AI Response Message */}
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm tracking-wide">
                        <IoSparklesOutline className="w-4 h-4 text-indigo-700 fill-indigo-600/10 stroke-[2.2]" />
                        <span>AI Assistant</span>
                    </div>
                    <div className="bg-[#EEECFE] text-indigo-900 text-[11px] font-normal leading-relaxed p-3 rounded-2xl">
                        {isLoading ? (
                            <div className="flex items-center gap-2 text-indigo-700">
                                <CgSpinner className="w-3.5 h-3.5 animate-spin" />
                                <span>Enhancing script for speech...</span>
                            </div>
                        ) : (
                            response
                        )}
                    </div>
                </div>

                {error && (
                    <div className="p-2.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">
                        {error}
                    </div>
                )}
            </div>

            {/* Input Field */}
            <div className="relative flex items-center pt-1">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleQuery(input)}
                    placeholder="Ask AI anything..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-3 pr-10 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                <button
                    type="button"
                    onClick={() => handleQuery(input)}
                    disabled={isLoading || !input.trim()}
                    className="absolute right-2.5 text-indigo-600 hover:text-indigo-800 disabled:opacity-40 transition cursor-pointer"
                >
                    {isLoading ? (
                        <CgSpinner className="w-3 h-3 animate-spin" />
                    ) : (
                        <FiSend className="w-3 h-3" />
                    )}
                </button>
            </div>
        </div>
    );
}