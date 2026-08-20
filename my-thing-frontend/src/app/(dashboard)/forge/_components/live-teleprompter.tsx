"use client";

import React from "react";
import { FiMaximize2 } from "react-icons/fi";

export function LiveTeleprompter() {
    return (
        /* Notice: min-h removed; h-full added so it stretches nicely with flex-1 */
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xs relative flex flex-col justify-between h-full">
            {/* Top Header Bar */}
            <div className="flex items-center justify-between w-full">
                <span className="inline-block px-4 bg-[#EEECFE] text-indigo-900 py-1.5 text-[11px] font-bold rounded-full tracking-wider uppercase">
                    LIVE TELEPROMPTER
                </span>
                <button
                    type="button"
                    className="hidden sm:inline-flex text-slate-400 hover:text-slate-700 transition cursor-pointer p-1"
                    title="Fullscreen"
                >
                    <FiMaximize2 className="w-4 h-4" />
                </button>
            </div>

            {/* Teleprompter Script Lines Container */}
            <div className="flex-1 flex flex-col justify-center text-center w-full max-w-[540px] mx-auto my-4 space-y-4">
                {/* Top Header Lines */}
                <div className="space-y-1">
                    <p className="text-base md:text-lg font-medium text-slate-900 leading-snug">
                        Artificial Intelligence is reshaping healthcare
                    </p>
                    <p className="text-base md:text-lg font-medium text-slate-900 leading-snug">
                        at an unprecedented pace.
                    </p>
                </div>

                {/* Highlight Active Line Banner */}
                <div className="w-full rounded-2xl px-4 py-2.5 flex items-center justify-center bg-[#EEECFE]">
                    <p className="text-lg md:text-xl font-bold tracking-tight text-indigo-900">
                        From detecting diseases earlier
                    </p>
                </div>

                {/* Middle Section 1 */}
                <div className="space-y-1">
                    <p className="text-base md:text-lg font-medium text-slate-900 leading-snug">
                        to personalizing treatments,
                    </p>
                    <p className="text-base md:text-lg font-medium text-slate-900 leading-snug">
                        AI holds immense promise.
                    </p>
                </div>

                {/* Middle Section 2 */}
                <div className="space-y-1">
                    <p className="text-base md:text-lg font-medium text-slate-900 leading-snug">
                        However, with great power
                    </p>
                    <p className="text-base md:text-lg font-medium text-slate-900 leading-snug">
                        comes great responsibility.
                    </p>
                </div>

                {/* Bottom Section 3 */}
                <div className="space-y-1">
                    <p className="text-base md:text-lg font-medium text-slate-900 leading-snug">
                        Ethical concerns such as privacy,
                    </p>
                    <p className="text-base md:text-lg font-medium text-slate-900 leading-snug">
                        bias, and transparency must be addressed
                    </p>
                    <p className="text-base md:text-lg font-medium text-slate-900 leading-snug">
                        to ensure safe and fair healthcare.
                    </p>
                </div>
            </div>

            {/* Bottom Audio Scrubber Bar */}
            <div className="w-full max-w-[540px] mx-auto flex items-center gap-3 text-xs font-semibold pt-2">
                <span className="shrink-0 text-slate-400 text-[11px] font-medium">
                    2:15
                </span>

                {/* Progress Bar Container */}
                <div
                    className="relative flex-1 h-2 rounded-full cursor-pointer flex items-center"
                    style={{ backgroundColor: "#F1F3F9" }}
                >
                    {/* Active Progress Track */}
                    <div
                        className="absolute left-0 top-0 bottom-0 rounded-full"
                        style={{ width: "45%", backgroundColor: "#523BE4" }}
                    />
                    {/* Thumb Circle */}
                    <div
                        className="absolute w-3.5 h-3.5 rounded-full shadow-sm"
                        style={{
                            left: "45%",
                            transform: "translateX(-50%)",
                            backgroundColor: "#523BE4",
                            border: "2px solid #FFFFFF",
                        }}
                    />
                </div>

                <span className="shrink-0 text-slate-400 text-[11px] font-medium">
                    4:20
                </span>
            </div>
        </div>
    );
}