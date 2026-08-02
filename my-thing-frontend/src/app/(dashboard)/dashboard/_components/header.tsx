"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";

interface UserProfile {
    name: string;
    avatarUrl: string;
}

export function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        const simulateAuthFetch = setTimeout(() => {
            setIsAuthenticated(true);
            setUser({
                name: "Sherry",
                avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sherry",
            });
        }, 1000);

        return () => clearTimeout(simulateAuthFetch);
    }, []);

    const handleCreateProject = () => {
        console.log("Create new project initialized");
    };

    return (
        <div className="flex justify-between items-center pt-5 min-[640px]:max-[765px]:pt-10 max-sm:pt-2 pb-2 px-1 md:pt-2 md:px-0 w-full">
            <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                    Good morning{isAuthenticated && user ? `, ${user.name}` : ""} 👋
                </h1>
                <p className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">
                    Continue creating your next story.
                </p>
            </div>

            <div className="hidden md:flex items-center gap-3.5">
                <Button
                    type="button"
                    onClick={handleCreateProject}
                    className="max-[865px]:hidden inline-flex items-center justify-center gap-2 sm:w-auto h-auto px-5 py-2.5 text-sm font-medium rounded-xl shrink-0 active:scale-[0.98]"
                >
                    <FiPlus className="h-4 w-4 stroke-[3]" />
                    <span>New Project</span>
                </Button>

                <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full transition-colors relative">
                    <IoNotificationsOutline className="w-6 h-6 stroke-[1.5]" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-violet-600 rounded-full" />
                </button>

                {isAuthenticated && user ? (
                    <img
                        src={user.avatarUrl}
                        alt={`${user.name}'s profile avatar`}
                        className="w-9 h-9 rounded-full object-cover border border-slate-100 shadow-sm cursor-pointer"
                    />
                ) : (
                    <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 animate-pulse" />
                )}
            </div>
        </div>
    );
}

export default Header;