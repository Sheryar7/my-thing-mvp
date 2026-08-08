"use client";

import React, { useMemo } from "react";
import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiList,
  FiLink,
  FiRotateCcw,
  FiRotateCw,
  FiMaximize2,
} from "react-icons/fi";
import { BsQuote, BsListOl } from "react-icons/bs";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

interface RichEditorProps {
  text?: string;
  onChange?: (val: string) => void;
}

const FIGMA_DUMMY_TEXT = `Introduction
Artificial Intelligence is transforming healthcare by improving diagnosis, patient care, and operational efficiency. However, with these advancements come ethical concerns regarding privacy, bias, and transparency.

The Promise of AI in Healthcare
AI technologies are enhancing medical imaging, predicting patient outcomes, and personalizing treatment plans. From early disease detection to administrative automation, the benefits are significant.

Key Ethical Challenges
• Privacy: Patient data is sensitive and requires strict protection.
• Bias: AI systems can inherit biases from training data, leading to unfair outcomes.
• Transparency: Many AI models operate as "black boxes", making decisions difficult to explain.

The Path Forward
To ensure responsible AI adoption, healthcare organizations must prioritize ethical design, human oversight, and strong regulatory frameworks. Building trust will be essential for AI to reach its full potential in improving patient lives.`;

export function RichEditor({
  text,
  onChange,
}: RichEditorProps) {
  // Use current text if provided and not empty, otherwise fallback to Figma dummy text
  const currentContent = text !== undefined ? text : FIGMA_DUMMY_TEXT;

  // Calculate word count based on active content
  const wordCount = useMemo(() => {
    const trimmed = currentContent.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }, [currentContent]);

  return (
    <div className="bg-white border border-slate-200/90 rounded-[24px] p-6 md:p-8 shadow-xs h-full flex flex-col items-stretch">
      {/* 1. TOOLBAR & HEADER */}
      <div className="space-y-5 flex-1 flex flex-col">
        {/* Formatting Toolbar */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-3 text-slate-500">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <div className="relative">
              <select className="text-xs font-semibold text-slate-700 bg-slate-50/60 border border-slate-200/80 rounded-lg px-2.5 py-1.5 outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer pr-6">
                <option>Heading 1</option>
                <option>Heading 2</option>
                <option>Paragraph</option>
              </select>
            </div>

            <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />

            <button type="button" className="p-1.5 hover:text-slate-900 hover:bg-slate-50 rounded transition cursor-pointer">
              <FiBold className="w-4 h-4 text-slate-700" />
            </button>
            <button type="button" className="p-1.5 hover:text-slate-900 hover:bg-slate-50 rounded transition cursor-pointer">
              <FiItalic className="w-4 h-4 text-slate-700" />
            </button>
            <button type="button" className="p-1.5 hover:text-slate-900 hover:bg-slate-50 rounded transition cursor-pointer">
              <FiUnderline className="w-4 h-4 text-slate-700" />
            </button>

            <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />

            <button type="button" className="p-1.5 hover:text-slate-900 hover:bg-slate-50 rounded transition cursor-pointer">
              <FiList className="w-4 h-4 text-slate-700" />
            </button>
            <button type="button" className="p-1.5 hover:text-slate-900 hover:bg-slate-50 rounded transition cursor-pointer">
              <BsListOl className="w-4 h-4 text-slate-700" />
            </button>
            <button type="button" className="p-1.5 hover:text-slate-900 hover:bg-slate-50 rounded transition cursor-pointer">
              <BsQuote className="w-4 h-4 text-slate-700" />
            </button>
            <button type="button" className="p-1.5 hover:text-slate-900 hover:bg-slate-50 rounded transition cursor-pointer">
              <FiLink className="w-4 h-4 text-slate-700" />
            </button>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <button type="button" className="p-1.5 hover:text-slate-700 hover:bg-slate-50 rounded transition cursor-pointer">
              <FiRotateCcw className="w-3.5 h-3.5" />
            </button>
            <button type="button" className="p-1.5 hover:text-slate-700 hover:bg-slate-50 rounded transition cursor-pointer">
              <FiRotateCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Title Block & Pill Badge */}
        <div className="space-y-2 pt-1">
          <input
            type="text"
            defaultValue="AI Ethics in Healthcare"
            className="w-full text-2xl md:text-3xl font-extrabold text-slate-900 border-none outline-none placeholder-slate-300 focus:ring-0 p-0 tracking-tight"
          />
          <span className="inline-block px-3 py-1 bg-[#EEECFE] text-indigo-900 text-[11px] font-bold rounded-full">
            AI Generated Draft
          </span>
        </div>

        {/* 2. MAIN EDITING CANVAS */}
        <textarea
          value={currentContent}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Start writing your research-grounded draft here..."
          className="w-full flex-1 min-h-[500px] border-none outline-none resize-none placeholder-slate-300 text-slate-800 leading-relaxed text-sm md:text-base focus:ring-0 p-0 pt-2 font-normal overflow-y-auto"
        />
      </div>

      {/* 3. FOOTER STATUS BAR */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-100 shrink-0">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
            <IoIosCheckmarkCircleOutline className="w-4 h-4 stroke-[1.5]" />
            Auto Saved
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 font-normal">
            Last synced with Archive 1 minute ago
          </span>
        </div>

        <div className="flex items-center gap-3 font-semibold text-slate-600">
          <span>{wordCount.toLocaleString()} words</span>
          <button type="button" className="hover:text-slate-900 transition cursor-pointer">
            <FiMaximize2 className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
}