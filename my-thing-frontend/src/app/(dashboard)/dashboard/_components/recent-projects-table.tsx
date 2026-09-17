"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoChevronForward, IoArchiveOutline, IoMicOutline, IoCheckmark } from "react-icons/io5";
import { LuPenLine } from "react-icons/lu";
import { FaLongArrowAltRight } from "react-icons/fa";
import { ARCHIVE_PROJECTS, type ProjectItem } from "@/lib/projects-data";

// Map stage states to icon components and background color rings
const stageIconConfig: Record<ProjectItem["stage"], { icon: React.ComponentType<{ className?: string }>; style: string }> = {
  Workshop: { icon: LuPenLine, style: "bg-purple-100 text-purple-600" },
  Forge: { icon: IoMicOutline, style: "bg-orange-100 text-orange-600" },
  Archive: { icon: IoArchiveOutline, style: "bg-emerald-100 text-emerald-600" },
  Lens: { icon: IoCheckmark, style: "bg-rose-100 text-rose-600" },
};

const stageStyles: Record<ProjectItem["stage"], string> = {
  Archive: "bg-emerald-50 text-emerald-700",
  Workshop: "bg-purple-50 text-purple-700",
  Forge: "bg-orange-50 text-orange-700",
  Lens: "bg-rose-50 text-rose-700",
};

interface Props {
  projects?: ProjectItem[];
}

function getProjectRoute(project: ProjectItem): string {
  if (project.stage === "Workshop") return `/workshop?project=${project.id}`;
  if (project.stage === "Forge") return `/forge?project=${project.id}`;
  if (project.stage === "Lens") return `/lens?project=${project.id}`;
  return `/archive`;
}

function RecentProjectRow({ project }: { project: ProjectItem }) {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(getProjectRoute(project));
  };

  return (
    <tr
      onClick={handleRowClick}
      className="group bg-white hover:bg-slate-50/70 transition-colors duration-150 cursor-pointer"
    >
      <td className="px-4 sm:px-5 py-3.5 text-sm text-slate-700 font-medium">
        <span className="truncate block" title={project.name}>
          {project.name}
        </span>
      </td>
      <td className="px-3 sm:px-4 py-3.5 whitespace-nowrap">
        <span className={`inline-flex rounded-full px-3 py-0.5 text-xs font-medium ${stageStyles[project.stage]}`}>
          {project.stage}
        </span>
      </td>
      <td className="px-3 sm:px-4 py-3.5 text-sm text-slate-500 font-normal whitespace-nowrap">
        {project.updated}
      </td>
      <td className="px-4 sm:px-5 py-3.5 text-right whitespace-nowrap">
        <div className="inline-flex items-center justify-end gap-1.5 text-sm text-slate-500 font-normal">
          <span>{project.progress}%</span>
          <IoChevronForward className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-500 transition-colors" />
        </div>
      </td>
    </tr>
  );
}

function MobileRecentProjectItem({ project }: { project: ProjectItem }) {
  const router = useRouter();
  const { icon: StageIcon, style: iconStyle } = stageIconConfig[project.stage] || stageIconConfig.Workshop;
  const route = getProjectRoute(project);

  const handleClick = () => {
    router.push(route);
  };

  return (
    <div
      onClick={handleClick}
      className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors cursor-pointer"
    >
      {/* LEFT COLUMN: Icon + Title + Stage/Time */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${iconStyle}`}>
          <StageIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-bold text-slate-900 truncate" title={project.name}>
            {project.name}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${stageStyles[project.stage]}`}>
              {project.stage}
            </span>
            <span className="text-[11px] text-slate-400 whitespace-nowrap">{project.updated}</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Inline Progress Bar + Continue Link */}
      <div className="flex flex-col items-end justify-center shrink-0 gap-1.5">
        <div className="flex items-center gap-1.5">
          <div className="w-14 sm:w-18 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4F46E5] rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            />
          </div>
          <span className="text-[10px] sm:text-xs font-bold text-slate-500 whitespace-nowrap">{project.progress}%</span>
        </div>

        <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors">
          <span>Continue</span>
          <FaLongArrowAltRight className="h-2.5 w-2.5" />
        </span>
      </div>
    </div>
  );
}

export function RecentProjectsTable({ projects = ARCHIVE_PROJECTS }: Props) {
  // Strictly display only the 4 most recent projects matching Archive module
  const displayProjects = (projects || ARCHIVE_PROJECTS).slice(0, 4);

  return (
    <section className="w-full h-full font-sans antialiased flex flex-col space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between h-[32px]">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
          Recent Projects
        </h2>
        <Link
          href="/archive"
          className="text-xs sm:text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors duration-150 md:hidden"
        >
          See all
        </Link>
      </div>

      <div className="flex-1 flex flex-col">
        {/* 1. DESKTOP INTERFACE (md+) - Preserved with 4 columns: Project, Stage, Updated, Progress */}
        <div className="hidden md:flex flex-1 flex-col w-full">
          <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm flex-1 flex flex-col justify-between">
            <table className="w-full table-fixed border-separate border-spacing-0">
              <thead className="bg-[#ede9fe]/50 font-sans text-left text-xs font-semibold text-slate-700">
                <tr className="border-b border-slate-100">
                  <th className="w-[44%] px-4 sm:px-5 py-3.5 text-left">Project</th>
                  <th className="w-[18%] px-3 sm:px-4 py-3.5 text-left">Stage</th>
                  <th className="w-[20%] px-3 sm:px-4 py-3.5 text-left">Updated</th>
                  <th className="w-[18%] px-4 sm:px-5 py-3.5 text-right">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {displayProjects.map((project) => (
                  <RecentProjectRow key={project.id} project={project} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. MOBILE INTERFACE (< md) - Enclosed card matching Figma mobile design */}
        <div className="block md:hidden w-full">
          <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden divide-y divide-slate-100">
            {displayProjects.map((project) => (
              <MobileRecentProjectItem key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecentProjectsTable;