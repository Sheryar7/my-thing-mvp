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
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6 w-full">
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
                    aria-label="Fast Forward"
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

            {/* Settings Grid (Replaced Flex with Grid for Equal Columns) */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs pt-1 items-start">
                {/* 1. Scroll Speed */}
                <div className="space-y-2">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-[11px]">
                        <FiSliders className="w-3.5 h-3.5" />
                        <span>Scroll Speed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="range"
                            min="0.5"
                            max="3.0"
                            step="0.1"
                            value={scrollSpeed}
                            onChange={(e) => setScrollSpeed(parseFloat(e.target.value))}
                            style={getSliderStyle(scrollSpeed, 0.5, 3.0)}
                            className="w-full h-1.5 appearance-none rounded-lg cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#523BE4]"
                        />
                        <span className="text-[10px] font-semibold text-indigo-600 min-w-[24px]">
                            {scrollSpeed.toFixed(1)}x
                        </span>
                    </div>
                </div>

                {/* 2. Text Size */}
                <div className="space-y-2">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-[11px]">
                        <FiType className="w-3.5 h-3.5"/>
                        <span>Text Size</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="range"
                            min="16"
                            max="64"
                            step="2"
                            value={textSize}
                            onChange={(e) => setTextSize(parseInt(e.target.value))}
                            style={getSliderStyle(textSize, 16, 64)}
                            className="w-full h-1.5 appearance-none rounded-lg cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#523BE4]"
                        />
                        <span className="text-[10px] font-semibold text-indigo-600 min-w-[24px]">
                            {textSize}px
                        </span>
                    </div>
                </div>


                {/* 3. Boldness */}
                <div className="space-y-2">
                    <div className="flex items-center gap-1.5 font-bold text-[11px]">
                        <FiBold className="w-3.5 h-3.5"/>
                        <span className="text-slate-900">Boldness</span>
                    </div>

                    <div className="inline-flex items-center bg-white p-0.5 rounded-xl border border-slate-200">
                        {(["Light", "Regular", "Bold"] as const).map((mode) => {
                            const isActive = boldness === mode;

                            return (
                                <button
                                    key={mode}
                                    type="button"
                                    onClick={() => setBoldness(mode)}
                                    style={{ color: isActive ? "#6366f1" : undefined }}
                                    className={`px-3 py-1 text-[11px] font-medium rounded-lg transition-all ${isActive
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

                {/* 4. Alignment */}
                <div className="space-y-2">
                    <div className="flex items-center gap-1.5 font-bold text-[11px]">
                        <FiAlignCenter className="w-3.5 h-3.5" />
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


                {/* 5. Auto Scroll */}
                <div className="space-y-2">
                    <div className="flex items-center gap-1.5 font-bold text-[11px]">
                        <MdOutlineUnfoldLess className="w-3.5 h-3.5"  />
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