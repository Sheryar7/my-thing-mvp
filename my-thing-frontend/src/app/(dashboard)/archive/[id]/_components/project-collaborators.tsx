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
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Project Collaborators</h3>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
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
        <div className="border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-8 flex flex-col justify-center min-w-[160px]">
          <span className="text-xs font-semibold text-indigo-800">Recent Activity</span>
          <p className="text-xs text-slate-800 font-medium mt-1">
            Last edited by {lastEditedBy}<br />
            {lastEditedTime}
          </p>
        </div>
      </div>
    </div>
  );
}