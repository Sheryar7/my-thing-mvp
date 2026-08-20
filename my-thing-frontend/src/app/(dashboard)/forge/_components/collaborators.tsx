"use client";

import React, { useState, useRef, useEffect } from "react";
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
    // {
    //     id: "4",
    //     name: "David",
    //     avatarUrl: "https://i.pravatar.cc/100?img=12",
    //     status: "Viewing",
    // },
    // {
    //     id: "5",
    //     name: "Emma",
    //     avatarUrl: "https://i.pravatar.cc/100?img=32",
    // },
];

// Sub-component to encapsulate state & click-outside ref safely
function OverflowBadge({
    overflowList,
    count,
}: {
    overflowList: Collaborator[];
    count: number;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={popoverRef}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-[10px] sm:text-xs font-bold text-indigo-600 flex items-center justify-center shrink-0 transition cursor-pointer"
                title="View all collaborators"
            >
                +{count}
            </button>

            {/* Dropdown Popover */}
            {isOpen && (
                <div className="absolute top-full -left-16 mt-2 z-50 w-56 rounded-xl border border-slate-200 bg-white p-3 shadow-xl space-y-2 lg:left-auto lg:right-0">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-1">
                        Other Collaborators ({count})
                    </div>
                    <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1">
                        {overflowList.map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-50 transition"
                            >
                                <img
                                    src={user.avatarUrl}
                                    alt={user.name}
                                    className="w-7 h-7 rounded-full object-cover border border-indigo-200 shrink-0"
                                />
                                <div className="flex flex-col min-w-0">
                                    <span className="text-xs font-semibold text-slate-800 truncate">
                                        {user.name}
                                    </span>
                                    {user.status && (
                                        <span className="text-[10px] text-emerald-600 font-medium leading-none">
                                            {user.status}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export function Collaborators({
    collaborators = DEFAULT_COLLABORATORS,
    onInvite,
}: CollaboratorsProps) {
    const hasOverflow = collaborators.length > 3;
    const overflowCount = collaborators.length - 3;
    const overflowList = collaborators.slice(3);

    return (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
            <h3 className="text-base lg:text-sm font-bold text-slate-900 tracking-tight">
                Collaborators
            </h3>

            {/* MOBILE VIEW */}
            <div className="flex lg:hidden items-center justify-start gap-3 sm:gap-4">
                <div className="flex items-center gap-1.5 shrink-0">
                    {collaborators.slice(0, 3).map((user) => (
                        <div key={user.id} className="relative shrink-0">
                            <img
                                src={user.avatarUrl}
                                alt={user.name}
                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-indigo-600"
                            />
                            <span className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                        </div>
                    ))}

                    {hasOverflow && (
                        <OverflowBadge overflowList={overflowList} count={overflowCount} />
                    )}

                    <button
                        type="button"
                        onClick={onInvite}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-dashed border-indigo-400 hover:border-indigo-600 hover:bg-indigo-50 text-indigo-600 flex items-center justify-center transition shrink-0 ml-0.5 cursor-pointer"
                        title="Add collaborator"
                    >
                        <FiPlus className="w-3.5 h-3.5" />
                    </button>
                </div>

                <div className="h-8 w-px bg-slate-200 shrink-0" />

                <div className="flex flex-col text-left min-w-0 shrink">
                    <span className="text-xs font-semibold text-indigo-900 leading-tight">
                        Recent Activity
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-slate-500 font-normal truncate leading-tight">
                        Last edited by Alex 15 minutes ago
                    </span>
                </div>
            </div>

            {/* DESKTOP VIEW */}
            <div className="hidden lg:flex items-center gap-2 overflow-visible pb-1">
                {collaborators.slice(0, 3).map((user) => (
                    <div key={user.id} className="flex items-center gap-1 shrink-0">
                        <div className="relative">
                            <img
                                src={user.avatarUrl}
                                alt={user.name}
                                className="w-7 h-7 rounded-full object-cover border border-indigo-600"
                            />
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-xs font-medium text-slate-700">
                                {user.name}
                            </span>
                            {user.status === "Editing" && (
                                <span className="text-[10px] font-medium text-emerald-600 px-1.5 py-0.5 rounded-md">
                                    Editing
                                </span>
                            )}
                        </div>
                    </div>
                ))}

                {hasOverflow && (
                    <OverflowBadge overflowList={overflowList} count={overflowCount} />
                )}

                <button
                    type="button"
                    onClick={onInvite}
                    className="w-7 h-7 rounded-full border border-dashed border-indigo-400 hover:border-indigo-600 hover:bg-indigo-50 text-indigo-600 flex items-center justify-center transition shrink-0 ml-0.5 cursor-pointer"
                    title="Add collaborator"
                >
                    <FiPlus className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
}