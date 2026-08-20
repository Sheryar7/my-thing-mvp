"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { FiArrowLeft } from "react-icons/fi";
import { HiArrowLeft } from "react-icons/hi";

interface WorkshopHeaderProps {
    title: string;
    sourcesCount: number;
    lastSyncedText: string;
    onInvite: () => void;
    onSaveDraft: () => void;
    onSyncToForge: () => void;
}

export function WorkshopHeader({
    title,
    sourcesCount,
    lastSyncedText,
    onInvite,
    onSaveDraft,
    onSyncToForge,
}: WorkshopHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
                {/* Desktop Back Link */}
                <Link
                    href="/dashboard"
                    className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors w-fit"
                >
                    <FiArrowLeft className="w-4 h-4" />
                    <span>Back to Project</span>
                </Link>

                {/* Mobile relative container with absolute left arrow */}
                <div className="relative flex flex-col items-center sm:items-start text-center sm:text-left">
                    <Link
                        href="/dashboard"
                        className="sm:hidden absolute left-0 top-1 text-slate-800 hover:text-indigo-600 transition-colors p-1"
                        aria-label="Back to project"
                    >
                        <HiArrowLeft className="w-4 h-4" />
                    </Link>

                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900 px-8 sm:px-0">
                        {title}
                    </h1>

                    <p className="text-xs text-slate-500 font-medium mt-1">
                        {sourcesCount} Sources • {lastSyncedText}
                    </p>
                </div>
            </div>

            {/* AFTER */}
            <div className="flex items-center justify-between gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onInvite}
                    className="flex-1 sm:w-auto px-2 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-indigo-600/70 text-indigo-600 bg-white hover:bg-indigo-50 transition"
                >
                    Invite
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    onClick={onSaveDraft}
                    className="flex-1 sm:w-auto px-2 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-indigo-600/70 text-indigo-600 bg-white hover:bg-indigo-50 transition"
                >
                    Save
                </Button>

                <Button
                    type="button"
                    onClick={onSyncToForge}
                    className="flex-1 sm:w-auto px-2 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-sm whitespace-nowrap"
                >
                    Sync to Forge
                </Button>
            </div>
        </div>
    );
}