"use client";

import React, { useState } from "react";
import {
    FiRewind,
    FiFastForward,
    FiPlay,
    FiPause,
    FiSliders,
    FiType,
    FiAlignLeft,
    FiAlignCenter,
    FiAlignRight,
} from "react-icons/fi";
import { FiBold } from "react-icons/fi";
import { MdOutlineUnfoldLess } from "react-icons/md";

export function PlaybackControls() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [scrollSpeed, setScrollSpeed] = useState(2.0);
    const [textSize, setTextSize] = useState(36);
    const [boldness, setBoldness] = useState<"Light" | "Regular" | "Bold">("Regular");
    const [alignment, setAlignment] = useState<"left" | "center" | "right">("center");
    const [autoScroll, setAutoScroll] = useState(true);

    const getSliderStyle = (val: number, min: number, max: number) => {
        const percentage = ((val - min) / (max - min)) * 100;
        return {
            background: `linear-gradient(to right, #523BE4 ${percentage}%, #e2e8f0 ${percentage}%)`,
            accentColor: "#523BE4",
        };
    };

    return (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs space-y-6 w-full max-w-full overflow-hidden">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Playback Controls
            </h3>

            {/* Main Transport Controls */}
            <div className="flex items-center justify-center gap-4 py-1">
                <button
                    type="button"
                    className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-800 transition active:scale-95 cursor-pointer"
                    aria-label="Rewind"
                >
                    <FiRewind className="w-5 h-5 fill-slate-800" />
                </button>

                <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full border border-indigo-600 bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center text-white transition active:scale-95 cursor-pointer shadow-sm"
                    aria-label={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? (
                        <FiPause className="w-6 h-6 fill-white" />
                    ) : (
                        <FiPlay className="w-6 h-6 fill-white ml-0.5" />
                    )}
                </button>

                <button
                    type="button"
                    className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-800 transition active:scale-95 cursor-pointer"
                    aria-label="Pause"
                >
                    <FiPause className="w-5 h-5 fill-slate-800" />
                </button>

                <button
                    type="button"
                    className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-800 transition active:scale-95 cursor-pointer"
                    aria-label="Fast Forward"
                >
                    <FiFastForward className="w-5 h-5 fill-slate-800" />
                </button>
            </div>

            <div className="border-t border-slate-100" />

            {/* Settings Controls */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-xs pt-1 items-start">
                {/* Mobile Row 1, Col 1 | Desktop Col 1 Top */}
                <div className="space-y-2 min-w-0">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-[11px] whitespace-nowrap">
                        <FiSliders className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>Scroll Speed</span>
                    </div>
                    <div className="flex items-center gap-2 w-full">
                        <input
                            type="range"
                            min="0.5"
                            max="3.0"
                            step="0.1"
                            value={scrollSpeed}
                            onChange={(e) => setScrollSpeed(parseFloat(e.target.value))}
                            style={getSliderStyle(scrollSpeed, 0.5, 3.0)}
                            className="w-full max-w-[96px] h-1.5 appearance-none rounded-lg cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#523BE4]"
                        />
                        <span className="text-[10px] font-semibold text-indigo-600 shrink-0">
                            {scrollSpeed.toFixed(1)}x
                        </span>
                    </div>
                </div>

                {/* Mobile Row 1, Col 2 | Desktop Col 3 Top */}
                <div className="space-y-2 min-w-0 md:col-start-3 md:row-start-1">
                    <div className="flex items-center gap-1.5 font-bold text-[11px]">
                        <FiBold className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="text-slate-900">Boldness</span>
                    </div>

                    <div className="inline-flex w-full max-w-full items-center justify-between bg-white p-0.5 rounded-xl border border-slate-200">
                        {(["Light", "Regular", "Bold"] as const).map((mode) => {
                            const isActive = boldness === mode;

                            return (
                                <button
                                    key={mode}
                                    type="button"
                                    onClick={() => setBoldness(mode)}
                                    style={{ color: isActive ? "#6366f1" : undefined }}
                                    className={`px-1.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-medium rounded-lg transition-all text-center flex-1 ${isActive
                                        ? "bg-[#EEECFE] border border-indigo-500 shadow-xs font-semibold"
                                        : "text-slate-500 hover:text-slate-900 border border-transparent"
                                        }`}
                                >
                                    {mode}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile Row 2, Col 1 | Desktop Col 2 Top */}
                <div className="space-y-2 min-w-0 md:col-start-2 md:row-start-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-[11px] whitespace-nowrap">
                        <FiType className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>Text Size</span>
                    </div>
                    <div className="flex items-center gap-2 w-full">
                        <input
                            type="range"
                            min="16"
                            max="64"
                            step="2"
                            value={textSize}
                            onChange={(e) => setTextSize(parseInt(e.target.value))}
                            style={getSliderStyle(textSize, 16, 64)}
                            className="w-full max-w-[96px] h-1.5 appearance-none rounded-lg cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#523BE4]"
                        />
                        <span className="text-[10px] font-semibold text-indigo-600 shrink-0">
                            {textSize}px
                        </span>
                    </div>
                </div>

                {/* Mobile Row 2, Col 2 | Desktop Col 1 Bottom */}
                <div className="space-y-2 min-w-0 md:col-start-1 md:row-start-2">
                    <div className="flex items-center gap-1.5 font-bold text-[11px]">
                        <FiAlignCenter className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="text-slate-900">Alignment</span>
                    </div>

                    <div className="inline-flex items-center bg-white p-0.5 rounded-xl border border-slate-200 gap-0.5">
                        {(["left", "center", "right"] as const).map((align) => {
                            const Icon =
                                align === "left"
                                    ? FiAlignLeft
                                    : align === "center"
                                        ? FiAlignCenter
                                        : FiAlignRight;

                            const isActive = alignment === align;

                            return (
                                <button
                                    key={align}
                                    type="button"
                                    onClick={() => setAlignment(align)}
                                    className={`p-1.5 rounded-lg transition-all ${isActive
                                        ? "bg-[#EEECFE] border border-indigo-500 shadow-xs"
                                        : "text-slate-500 hover:text-slate-900 border border-transparent"
                                        }`}
                                >
                                    <Icon
                                        className="w-3.5 h-3.5 transition-colors stroke-current"
                                        style={{ stroke: isActive ? "#6366f1" : undefined }}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Hidden on Mobile (`hidden`), Visible on Desktop (`md:block`) | Desktop Col 2 Bottom */}
                <div className="hidden md:block space-y-2 md:col-start-2 md:row-start-2">
                    <div className="flex items-center gap-1.5 font-bold text-[11px]">
                        <MdOutlineUnfoldLess className="w-3.5 h-3.5" />
                        <span className="text-slate-900">Auto Scroll</span>
                    </div>
                    <div className="flex items-center gap-2.5 pt-0.5">
                        <button
                            type="button"
                            onClick={() => setAutoScroll(!autoScroll)}
                            style={{ backgroundColor: autoScroll ? "#6366f1" : "#EAEFF5" }}
                            className={`w-11 h-6 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${autoScroll ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div className="bg-white w-5 h-5 rounded-full shadow-sm transition-all" />
                        </button>
                        <span
                            style={{ color: autoScroll ? "#64748b" : "#94a3b8" }}
                            className="text-[11px] font-bold"
                        >
                            {autoScroll ? "ON" : "OFF"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}