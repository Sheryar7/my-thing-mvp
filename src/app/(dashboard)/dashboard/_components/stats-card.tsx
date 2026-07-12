"use client";

import React from "react";
import { CiFolderOn, CiFileOn } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
import { GiCheckMark } from "react-icons/gi";

interface StatsCardProps {
    label: string;
    value: number | string;
    variant: "green" | "blue" | "orange" | "pink";
}

// Transparent tint backgrounds matching the Figma stat card style.
const containerVariants = {
    // Format: border-[color]/[border-opacity] bg-[color]/[bg-opacity]
    green:   "border border-green-500/50 bg-green-400/5",
    blue:    "border border-purple-500/50 bg-purple-400/5",
    orange:  "border border-orange-500/50 bg-orange-400/5",
    pink:    "border border-pink-500/50 bg-pink-400/5",
};

// Icon container colors for consistent badge appearance.
const iconVariants = {
    green:   "bg-green-200 text-green-600 shadow-sm",
    blue:    "bg-purple-200 text-purple-600 shadow-sm",
    orange:  "bg-orange-200 text-orange-600 shadow-sm",
    pink:    "bg-pink-200 text-pink-600 shadow-sm",
};

const iconMap = {
    green:   CiFolderOn,
    blue:    CiFileOn,
    orange:  GoPencil,
    pink:    GiCheckMark,
};

export function StatsCard({ label, value, variant }: StatsCardProps) {
    const IconComponent = iconMap[variant];

    return (
        <div
            className={`min-h-[115px] p-3 sm:p-4 rounded-3xl flex items-center gap-3 sm:gap-4 w-full transition-all duration-200 ${containerVariants[variant]}`}
        >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${iconVariants[variant]}`}>
                <IconComponent className="w-5 h-5 stroke-[0.3]" />
            </div>

            <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-slate-600 leading-none mb-1 whitespace-nowrap">
                    {label}
                </span>
                <span className="text-2xl md:text-3xl font-bold text-slate-900 leading-none tracking-tight">
                    {value}
                </span>
            </div>
        </div>
    );
}

export default StatsCard;