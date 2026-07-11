"use client";

import React from "react";
import Link from "next/link";
// Swapped individual conditional graphics for the unified system folder icon
import { CiFolderOn } from "react-icons/ci";
import { FaLongArrowAltRight } from "react-icons/fa";

/**
 * BACKEND/INTEGRATION NOTE:
 * This interface defines the expected data structure for a single project card.
 * When integrating real APIs or database models (Prisma/Supabase), ensure the response
 * object fields map to these properties or extend them as necessary.
 */
export interface ProjectData {
    id: string;             // Used for dynamic routing target mask matching
    name: string;           // Project text title display string
    sourcesCount: number;   // Total integer count of active connected resource rows
    notesCount: number;     // Total integer count of user-generated textual notes
    updatedAtLabel: string; // Temporary string placeholder. BACKEND DEV: Replace with real relative parsing (e.g., date-fns 'formatDistanceToNow')
    status: "Active" | "Completed" | "Drafts"; // Synchronized with database schema status enum
}

interface ProjectCardProps {
    project: ProjectData;
}

export function ProjectCard({ project }: ProjectCardProps) {
    
    /**
     * STYLING NOTE FOR TEAM MEMBERS:
     * Maps database string status enums to user-friendly design copy layout labels.
     * Modify these return strings if your localization/copy requirements change.
     */
    const getStatusText = (status: string) => {
        if (status === "Active") return "In Progress";
        if (status === "Completed") return "Completed";
        return "Draft";
    };

    return (
        <div className="group relative bg-white border border-slate-200/90 rounded-[24px] p-6 shadow-sm hover:shadow-md hover:border-slate-300/90 transition-all duration-200 flex flex-col justify-between min-h-[175px]">

            {/* 1. TOP SECTION: Icon + Header Typography Metadata */}
            <div className="flex items-center gap-4 w-full">
                {/* 
                  * SYSTEM ICON WRAPPER:
                  * Uses unified 'CiFolderOn' styling to keep structural scaling consistent across all projects.
                  * DEVS: If dynamic custom user-selected project icons are implemented in the future,
                  * map the custom icon component here dynamically based on a string property inside `project`.
                  */}
                <div className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100/30 flex items-center justify-center shrink-0">
                    <CiFolderOn className="w-6 h-6 text-indigo-600 stroke-[0.5]" />
                </div>

                <div className="flex flex-col min-w-0">
                    <h3 className="font-bold text-slate-900 tracking-tight text-[17px] leading-tight group-hover:text-indigo-600 transition-colors truncate">
                        {project.name}
                    </h3>
                    <span className="text-sm text-slate-500 font-medium mt-0.5">
                        {getStatusText(project.status)}
                    </span>
                </div>
            </div>

            {/* 2. THE HORIZONTAL DIVIDER LINE */}
            <hr className="border-t border-slate-100 my-4 w-full" />

            {/* 3. BOTTOM SECTION: Stats block on top, Meta/Action row below */}
            <div className="mt-auto pt-2 w-full space-y-3">

                {/* Top Row: Sources & Notes Stats */}
                <div className="text-sm text-slate-500 font-medium flex items-center gap-1.5">
                    <span className="text-slate-900 font-bold">{project.sourcesCount}</span> Sources
                    <span className="text-slate-300 mx-0.5">•</span>
                    <span className="text-slate-900 font-bold">{project.notesCount}</span> Notes
                </div>

                {/* Bottom Row: Inline Alignment for Updated Text & Open Link */}
                <div className="flex items-center justify-between w-full pt-0.5">
                    <p className="text-sm text-slate-400 font-medium">
                        {project.updatedAtLabel}
                    </p>

                    <div className="text-indigo-700 hover:text-indigo-800 font-semibold text-sm flex items-center gap-1.5 transition-colors shrink-0">
                        <span>Open Archive</span>
                        <FaLongArrowAltRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>

            </div>

            {/* 
              * DYNAMIC ROUTING OVERLAY:
              * Using Next.js Link overlay mask to make the entire card clickable for user experience.
              * DEVS: Ensure dynamic route structure maps to app/archive/[id]/page.tsx to catch this redirect context.
              */}
            <Link
                href={`/archive/${project.id}`}
                className="absolute inset-0 rounded-[24px] z-10 cursor-pointer"
                aria-label={`Open ${project.name}`}
            />
        </div>
    );
}