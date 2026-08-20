"use client";

import React from "react";
import { FiPlus } from "react-icons/fi";

export interface CollaboratorMember {
  id: string;
  name: string;
  role: "Owner" | "Editor" | "Viewer";
  avatarUrl: string;
}

interface ProjectCollaboratorsProps {
  collaborators?: CollaboratorMember[];
  lastEditedBy?: string;
  lastEditedTime?: string;
  onInvite?: () => void;
}

const DEFAULT_MEMBERS: CollaboratorMember[] = [
  { id: "1", name: "John", role: "Owner", avatarUrl: "https://i.pravatar.cc/100?img=11" },
  { id: "2", name: "Sara", role: "Editor", avatarUrl: "https://i.pravatar.cc/100?img=5" },
  { id: "3", name: "Alexa", role: "Viewer", avatarUrl: "https://i.pravatar.cc/100?img=9" },
];

export function ProjectCollaborators({
  collaborators = DEFAULT_MEMBERS,
  lastEditedBy = "Alex",
  lastEditedTime = "15 minutes ago",
  onInvite,
}: ProjectCollaboratorsProps) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 md:p-6 shadow-xs">
      <h3 className="text-base md:text-lg font-bold text-slate-900 mb-4">
        Project Collaborators
      </h3>

      {/* MOBILE VIEW (< md) */}
      <div className="flex md:hidden items-center gap-3">
        {/* Avatars + Plus Button */}
        <div className="flex items-center gap-1.5 shrink-0">
          {collaborators.map((member) => (
            <div key={member.id} className="relative w-8 h-8">
              <img
                src={member.avatarUrl}
                alt={member.name}
                className="w-8 h-8 rounded-full object-cover border border-indigo-600"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border border-white rounded-full" />
            </div>
          ))}

          {/* Plus / Invite Button */}
          <button
            type="button"
            onClick={onInvite}
            className="w-8 h-8 rounded-full border border-dashed border-indigo-400 flex items-center justify-center text-indigo-600 hover:border-indigo-600 transition-colors shrink-0"
            aria-label="Invite Collaborator"
          >
            <FiPlus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Vertical Divider Line */}
        <div className="w-px h-8 bg-slate-200 shrink-0 mx-1" />

        {/* Recent Activity Section */}
        <div className="flex flex-col text-left justify-center">
          <span className="text-[12px] font-semibold text-indigo-900 leading-tight">
            Recent Activity
          </span>
          <span className="text-[11px] text-slate-600 font-medium leading-tight mt-0.5">
            Last edited by {lastEditedBy} {lastEditedTime}
          </span>
        </div>
      </div>

      {/* DESKTOP VIEW (>= md) */}
      <div className="hidden md:flex md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6 flex-wrap">
          {collaborators.map((member) => (
            <div key={member.id} className="flex items-center gap-3">
              <img
                src={member.avatarUrl}
                alt={member.name}
                className="w-12 h-12 rounded-full object-cover border border-indigo-600"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900">{member.name}</span>
                <span className="inline-block mt-0.5 px-2 py-0.5 text-[11px] font-medium bg-[#EEECFE] text-indigo-800 rounded-md w-fit">
                  {member.role}
                </span>
              </div>
            </div>
          ))}

          {/* Invite Collaborator Button */}
          <button
            type="button"
            onClick={onInvite}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-indigo-500 group-hover:border-indigo-400 flex items-center justify-center text-indigo-700 transition-colors">
              <FiPlus className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-800 transition-colors">
              Invite Collaborator
            </span>
          </button>
        </div>

        {/* Recent Activity */}
        <div className="border-l border-slate-100 pl-8 flex flex-col justify-center min-w-[160px]">
          <span className="text-xs font-semibold text-indigo-900">Recent Activity</span>
          <p className="text-xs text-slate-800 font-medium mt-1">
            Last edited by {lastEditedBy}<br />
            {lastEditedTime}
          </p>
        </div>
      </div>
    </div>
  );
}