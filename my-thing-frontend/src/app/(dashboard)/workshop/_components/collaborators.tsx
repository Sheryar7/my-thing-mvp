"use client";

import React from "react";
import { FiPlus } from "react-icons/fi";

export interface Collaborator {
    id: string;
    name: string;
    avatarUrl?: string;
    status?: "Editing" | "Viewing" | "Idle";
}

interface CollaboratorsProps {
    collaborators?: Collaborator[];
    onInvite?: () => void;
}

const DEFAULT_COLLABORATORS: Collaborator[] = [
    {
        id: "1",
        name: "John",
        avatarUrl: "https://i.pravatar.cc/100?img=11",
        status: "Editing",
    },
    {
        id: "2",
        name: "Sara",
        avatarUrl: "https://i.pravatar.cc/100?img=5",
    },
    {
        id: "3",
        name: "Alexa",
        avatarUrl: "https://i.pravatar.cc/100?img=9",
    },
];

export function Collaborators({
    collaborators = DEFAULT_COLLABORATORS,
    onInvite,
}: CollaboratorsProps) {
    return (
        <div className="bg-white border border-slate-200/90 rounded-[20px] p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Collaborators
            </h3>

            <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {collaborators.map((user) => (
                    <div key={user.id} className="flex items-center gap-1.5 shrink-0">
                        {/* Avatar */}
                        <div className="relative">
                            <img
                                src={user.avatarUrl}
                                alt={user.name}
                                className="w-7 h-7 rounded-full object-cover border border-indigo-600"
                            />
                        </div>

                        {/* Name + Editing Tag */}
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-xs font-medium text-slate-700">
                                {user.name}
                            </span>
                            {user.status === "Editing" && (
                                <span className="text-[10px] font-medium text-emerald-600  px-1.5 py-0.5 rounded-md">
                                    Editing
                                </span>
                            )}
                        </div>
                    </div>
                ))}

                {/* Add Member Button */}
                <button
                    type="button"
                    onClick={onInvite}
                    className="w-7 h-7 rounded-full border border-dashed border-indigo-300 hover:border-indigo-500 hover:bg-indigo-50 text-indigo-600 flex items-center justify-center transition shrink-0 ml-1"
                    title="Add collaborator"
                >
                    <FiPlus className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
}