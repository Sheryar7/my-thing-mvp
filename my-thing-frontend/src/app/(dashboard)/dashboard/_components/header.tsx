"use client";

import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";

export function Header() {
    const handleCreateProject = () => {
        console.log("Create new project initialized");
    };

    return (
        <div className="flex justify-between items-center w-full">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                    <span>Good morning</span>
                    <span>👋</span>
                </h1>
                <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1">
                    Continue creating your next story.
                </p>
            </div>

            <div className="hidden md:flex items-center gap-3 sm:gap-4">
                <button
                    type="button"
                    onClick={handleCreateProject}
                    className="inline-flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-medium px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all duration-200 shrink-0 active:scale-[0.98] shadow-sm"
                >
                    <FiPlus className="h-4 w-4 stroke-[2.5]" />
                    <span>New Project</span>
                </button>

                <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full transition-colors relative">
                    <IoNotificationsOutline className="w-5 h-5" />
                </button>

                <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="User profile"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-slate-100 shadow-sm cursor-pointer"
                />
            </div>
        </div>
    );
}

export default Header;