"use client";

import React from "react";
import { IoArchiveOutline, IoDocumentTextOutline, IoCheckmark } from "react-icons/io5";
import { LuPenLine } from "react-icons/lu";

interface StatsCardProps {
    label: string;
    value: number | string;
    variant: "green" | "purple" | "orange" | "pink";
}

const containerVariants = {
    green:  "border border-green-200 bg-[#f7fef9]",
    purple: "border border-purple-200 bg-[#faf8ff]",
    orange: "border border-orange-200 bg-[#fffaf5]",
    pink:   "border border-pink-200 bg-[#fff8f8]",
};

const iconVariants = {
    green:  "bg-[#dcfce7] text-[#16a34a]",
    purple: "bg-[#ede9fe] text-[#7c3aed]",
    orange: "bg-[#ffedd5] text-[#ea580c]",
    pink:   "bg-[#ffe4e6] text-[#e11d48]",
};

const iconMap = {
    green:  IoArchiveOutline,
    purple: IoDocumentTextOutline,
    orange: LuPenLine,
    pink:   IoCheckmark,
};

export function StatsCard({ label, value, variant }: StatsCardProps) {
    const IconComponent = iconMap[variant];

    return (
        <div
            className={`p-4 rounded-2xl flex items-center gap-3.5 sm:gap-4 w-full h-full min-h-[96px] transition-all duration-200 hover:shadow-sm ${containerVariants[variant]}`}
        >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${iconVariants[variant]}`}>
                <IconComponent className="w-5 h-5" />
            </div>

            <div className="flex flex-col min-w-0">
                <span className="text-xs sm:text-sm font-medium text-slate-500 leading-tight">
                    {label}
                </span>
                <span className="text-2xl md:text-3xl font-bold text-slate-900 leading-none tracking-tight mt-1">
                    {value}
                </span>
            </div>
        </div>
    );
}

export default StatsCard;