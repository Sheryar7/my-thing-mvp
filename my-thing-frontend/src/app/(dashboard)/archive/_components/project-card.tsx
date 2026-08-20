"use client";

import React from "react";
import Link from "next/link";
import { CiFolderOn } from "react-icons/ci";
import { BsThreeDotsVertical, BsFileEarmarkText, BsPeople } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi2";

export interface Collaborator {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface ProjectData {
  id: string;
  name: string;
  category: string;
  sourcesCount: number;
  membersCount: number;
  aiStatus: "Ready for Script Generation" | "AI Summary Available" | "AI Processing..." | "Script Generated";
  status: "Active" | "Completed" | "Drafts";
  updatedAtLabel: string;
  collaborators?: Collaborator[];
}

interface ProjectCardProps {
  project: ProjectData;
  onMenuClick?: (projectId: string) => void;
}

export function ProjectCard({ project, onMenuClick }: ProjectCardProps) {
  // Show max 3 avatar images
  const visibleCollaborators = project.collaborators?.slice(0, 3) || [];

  // Calculate remaining count accurately
  const totalMembers = project.collaborators?.length || project.membersCount;
  const extraCollaboratorsCount = totalMembers - visibleCollaborators.length;

  return (
    <div className="group relative bg-white border border-slate-200/80 rounded-[24px] p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between">

      {/* 1. TOP HEADER */}
      <div className="flex items-start justify-between w-full">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-12 h-12 rounded-full bg-indigo-100/70 flex items-center justify-center shrink-0">
            <CiFolderOn className="w-6 h-6 text-indigo-600 stroke-[0.8]" />
          </div>

          <div className="flex flex-col min-w-0 pt-0.5">
            <h3 className="font-bold text-slate-900 text-[16px] leading-tight truncate group-hover:text-indigo-800 transition-colors">
              {project.name}
            </h3>
            <span className="text-sm text-slate-400 font-medium mt-1 truncate">
              {project.category}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onMenuClick?.(project.id);
          }}
          className="z-20 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors -mr-1"
          aria-label="Project Options"
        >
          <BsThreeDotsVertical className="w-4 h-4" />
        </button>
      </div>

      {/* 2. STATS SECTION: Aligned under title text (pl-[60px]) */}
      <div className="mt-3 pl-[60px] space-y-1.5 text-xs text-slate-400 font-medium">
        <div className="flex items-center gap-2">
          <BsFileEarmarkText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{project.sourcesCount} Sources</span>
        </div>
        <div className="flex items-center gap-2">
          <BsPeople className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{project.membersCount} Members</span>
        </div>
      </div>

      {/* 3. AI STATUS BADGE: Left aligned (No padding) */}
      <div className="mt-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 text-indigo-600 text-xs font-semibold">
          <HiSparkles className="w-3.5 h-3.5 text-[#FFC700] shrink-0" />
          <span>{project.aiStatus}</span>
        </div>
      </div>

      {/* 4. FOOTER */}
      <div className="flex items-center justify-between w-full mt-5 pt-1">
        <p className="text-xs text-slate-400 font-medium">
          {project.updatedAtLabel}
        </p>

        {/* Collaborators Avatar Stack */}
        <div className="flex items-center -space-x-2 z-20">
          {visibleCollaborators.map((user, idx) => (
            <img
              key={user.id || idx}
              src={user.avatarUrl || `https://i.pravatar.cc/100?u=${user.id || idx}`}
              alt={user.name || "Collaborator"}
              className="w-6 h-6 rounded-full border-2 border-white object-cover shadow-xs"
            />
          ))}

          {extraCollaboratorsCount > 0 && (
            <div className="w-6 h-6 rounded-full border-2 border-white bg-purple-100 text-purple-700 text-[10px] font-bold flex items-center justify-center shadow-xs">
              +{extraCollaboratorsCount}
            </div>
          )}
        </div>
      </div>

      {/* 5. CLICKABLE OVERLAY */}
      <Link
        href={`/archive/${project.id}`}
        className="absolute inset-0 rounded-[24px] z-10 cursor-pointer"
        aria-label={`Open ${project.name}`}
      />
    </div>
  );
}