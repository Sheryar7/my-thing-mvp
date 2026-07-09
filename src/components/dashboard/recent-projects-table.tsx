"use client";

import React from "react";
import { IoChevronForward } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { IoArchiveOutline, IoMicOutline, IoCheckmark } from "react-icons/io5";
import { LuPenLine } from "react-icons/lu";

// Map stage states to Lucide icon components and background color rings
const mobileIconConfig: Record<Project["stage"], { icon: React.ComponentType<any>; style: string }> = {
  Workshop: { icon: LuPenLine, style: "bg-violet-100 text-violet-600" },
  Forge: { icon: IoMicOutline, style: "bg-orange-100 text-orange-600" },
  Archive: { icon: IoArchiveOutline, style: "bg-emerald-100 text-emerald-600" },
  Lens: { icon: IoCheckmark, style: "bg-pink-100 text-pink-600" },
};

type Project = {
  id: number;
  name: string;
  stage: "Archive" | "Workshop" | "Forge" | "Lens";
  updated: string;
  progress: number;
};

const sampleProjects: Project[] = [
  { id: 1, name: "Podcast Episode 12", stage: "Workshop", updated: "2 hours ago", progress: 70 },
  { id: 2, name: "Marketing Script", stage: "Workshop", updated: "Yesterday", progress: 40 },
  { id: 3, name: "Interview with Alex", stage: "Forge", updated: "2 days ago", progress: 50 },
  { id: 4, name: "Fast Check Notes", stage: "Lens", updated: "3 days ago", progress: 30 },
];

const stageStyles: Record<Project["stage"], string> = {
  Archive: "bg-emerald-50 border-emerald-100 text-emerald-700",
  Workshop: "bg-violet-50 border-violet-100 text-violet-700",
  Forge: "bg-orange-50 border-orange-100 text-orange-700",
  Lens: "bg-pink-50 border-pink-100 text-pink-700",
};

interface Props {
  projects?: Project[];
}

function RecentProjectRow({ project }: { project: Project }) {
  return (
    <tr className="group bg-white hover:bg-slate-50 transition-colors duration-150 cursor-pointer">
      <td className="w-2/5 px-5 py-3 text-sm text-slate-500 font-medium">
        {project.name}
      </td>
      <td className="px-4 py-3">
        <span className={`inline-flex rounded-full border px-2 py-1 text-[11px] font-semibold tracking-wide ${stageStyles[project.stage]}`}>
          {project.stage}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-slate-500 font-normal">
        {project.updated}
      </td>
      <td className="px-4 py-3 text-right">
        <div className="inline-flex items-center justify-end gap-2 text-sm text-slate-500 font-normal">
          <span>{project.progress}%</span>
          <IoChevronForward className="h-4 w-4 text-slate-300" />
        </div>
      </td>
    </tr>
  );
}

function RecentProjectCard({ project }: { project: Project }) {
  const { icon: StageIcon, style: iconStyle } = mobileIconConfig[project.stage];

  return (
    <div className="w-full rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm flex items-start gap-4 justify-between">
      
      {/* LEFT COLUMN: Icon + Info */}
      <div className="flex items-start gap-3 min-w-0 flex-1">
        {/* Dynamic Stage Action Icon */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconStyle}`}>
          <StageIcon className="w-5 h-5" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900 truncate">{project.name}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide ${stageStyles[project.stage]}`}>
              {project.stage}
            </span>
            <span className="text-xs text-slate-400">{project.updated}</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Progress inline + Continue beneath it */}
      <div className="flex flex-col items-end justify-between min-w-[120px] sm:min-w-[140px] gap-3 h-full pt-1">
        {/* Progress Bar & Percentage Inline */}
        <div className="w-full flex items-center gap-2">
          <div className="w-20 sm:w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-violet-600 rounded-full transition-all duration-300" 
              style={{ width: `${project.progress}%` }} 
            />
          </div>
          <span className="text-xs font-bold text-slate-700 whitespace-nowrap">{project.progress}%</span>
        </div>

        {/* Continue Anchor Link directly below progress */}
        <a 
          href={`/dashboard/projects/${project.id}`} 
          className="inline-flex items-center gap-1 text-xs font-bold text-violet-600 hover:text-violet-700 transition-colors"
        >
          <span>Continue</span>
          <FaLongArrowAltRight className="h-3 w-3 translate-y-[1px]" />
        </a>
      </div>

    </div>
  );
}

export function RecentProjectsTable({ projects = sampleProjects }: Props) {
  return (
    <section className="h-full w-full font-sans antialiased flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h3 className="text-lg font-semibold tracking-tight text-slate-900">Recent Projects</h3>
        <button type="button" className="text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors duration-150 md:hidden">
          See all
        </button>
      </div>

      <div>
        {/* 1. DESKTOP INTERFACE */}
        <div className="hidden md:block w-full h-full">
          <DashboardCard className="overflow-hidden h-full">
            <table className="min-w-full border-separate border-spacing-0">
            <thead className="bg-violet-200 font-sans  text-left text-[11px] uppercase tracking-[0.28em] text-black">
              <tr className="border-b border-slate-200/80">
                <th className="px-5 py-3 ">Project</th>
                <th className="px-5 py-3 ">Stage</th>
                <th className="px-5 py-3 ">Updated</th>
                <th className="px-5 py-3 text-right ">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {projects.map((project) => (
                <RecentProjectRow key={project.id} project={project} />
              ))}
            </tbody>
            </table>
          </DashboardCard>
        </div>

        {/* 2. MOBILE INTERFACE */}
        <div className="block md:hidden space-y-3 w-full">
          {projects.map((project) => (
            <RecentProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecentProjectsTable;