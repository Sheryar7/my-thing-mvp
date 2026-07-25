"use client";

import React from "react";
import { FiChevronDown } from "react-icons/fi";

export interface SettingsState {
  voice: string;
  language: string;
  tone: string;
  duration: number;
  creativity: number;
}

interface ForgeSettingsProps {
  settings: SettingsState;
  onChange: (updated: Partial<SettingsState>) => void;
}

export function ForgeSettings({ settings, onChange }: ForgeSettingsProps) {
  // Helper calculations for dynamic slider track gradients
  const durationPercent = ((settings.duration - 1) / (15 - 1)) * 100;
  const creativityPercent = settings.creativity;

  return (
    <div className="w-full">
      {/* 1. Header with clear bottom spacing */}
      <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-6">
        Settings
      </h2>

      {/* 2. Equal 5-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
        {/* Voice Selector */}
        <div className="flex flex-col justify-between h-[68px] w-full">
          <label className="text-xs font-bold text-slate-700">Voice</label>
          <div className="relative flex items-center w-full">
            <select
              value={settings.voice}
              onChange={(e) => onChange({ voice: e.target.value })}
              className="w-full pl-3.5 pr-9 py-2 text-sm bg-white border border-slate-200 rounded-xl font-medium text-slate-800 appearance-none focus:outline-none focus:border-indigo-600 cursor-pointer"
            >
              <option value="Emma">Emma</option>
              <option value="James">James</option>
              <option value="Sofia">Sofia</option>
            </select>
            <FiChevronDown className="w-4 h-4 text-slate-400 pointer-events-none absolute right-3" />
          </div>
        </div>

        {/* Language Selector */}
        <div className="flex flex-col justify-between h-[68px] w-full">
          <label className="text-xs font-bold text-slate-700">Language</label>
          <div className="relative flex items-center w-full">
            <select
              value={settings.language}
              onChange={(e) => onChange({ language: e.target.value })}
              className="w-full pl-3.5 pr-9 py-2 text-sm bg-white border border-slate-200 rounded-xl font-medium text-slate-800 appearance-none focus:outline-none focus:border-indigo-600 cursor-pointer"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
            <FiChevronDown className="w-4 h-4 text-slate-400 pointer-events-none absolute right-3" />
          </div>
        </div>

        {/* Tone Selector */}
        <div className="flex flex-col justify-between h-[68px] w-full">
          <label className="text-xs font-bold text-slate-700">Tone</label>
          <div className="relative flex items-center w-full">
            <select
              value={settings.tone}
              onChange={(e) => onChange({ tone: e.target.value })}
              className="w-full pl-3.5 pr-9 py-2 text-sm bg-white border border-slate-200 rounded-xl font-medium text-slate-800 appearance-none focus:outline-none focus:border-indigo-600 cursor-pointer"
            >
              <option value="Professional">Professional</option>
              <option value="Casual">Casual</option>
              <option value="Energetic">Energetic</option>
            </select>
            <FiChevronDown className="w-4 h-4 text-slate-400 pointer-events-none absolute right-3" />
          </div>
        </div>

        {/* Duration Slider */}
        <div className="flex flex-col justify-between h-[68px] w-full">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-700">Duration</span>
            <span className="text-[11px] text-slate-400 font-medium mt-0.5">
              {settings.duration} minutes
            </span>
          </div>
          <div className="pb-3.5">
            <input
              type="range"
              min={1}
              max={15}
              value={settings.duration}
              onChange={(e) => onChange({ duration: Number(e.target.value) })}
              style={{
                background: `linear-gradient(to right, #5D5FEF ${durationPercent}%, #EEF2FF ${durationPercent}%)`,
              }}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer outline-none custom-slider"
            />
          </div>
        </div>

        {/* AI Creativity Slider */}
        <div className="flex flex-col justify-between h-[68px] w-full">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-700">AI Creativity</span>
            <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium mt-0.5">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
          <div className="pb-3.5">
            <input
              type="range"
              min={0}
              max={100}
              value={settings.creativity}
              onChange={(e) => onChange({ creativity: Number(e.target.value) })}
              style={{
                background: `linear-gradient(to right, #5D5FEF ${creativityPercent}%, #EEF2FF ${creativityPercent}%)`,
              }}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer outline-none custom-slider"
            />
          </div>
        </div>
      </div>

      {/* Embedded style tag for custom slider thumb styling across Webkit & Firefox */}
      <style jsx>{`
        .custom-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #5d5fef;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        .custom-slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #5d5fef;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </div>
  );
}