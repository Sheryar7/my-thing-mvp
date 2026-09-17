"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FiSend,
  FiEdit3,
  FiMinimize2,
  FiMaximize2,
  FiPauseCircle,
  FiUnderline,
  FiSmile,
  FiBriefcase,
  FiCheckCircle,
} from "react-icons/fi";
import { IoSparklesOutline } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  modelUsed?: string;
  isScriptSuggestion?: boolean;
}

interface ForgeAssistantProps {
  workspaceId?: string;
  selectedDocumentIds?: string[];
  currentScript?: string;
  onApplyScript?: (newLines: string[]) => void;
  onResponse?: (answer: string, chunks?: any[]) => void;
}

// Clean up all raw markdown syntax (###, ---, **, *) into clean, teleprompter-ready text
function cleanAIResponse(raw: string): string {
  if (!raw) return "";
  return raw
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^-{3,}\s*$/gm, "")
    .replace(/^\*\s+/gm, "• ")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/_{1,2}(.*?)_{1,2}/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Extract speech lines from an AI response if it contains a rewritten script
function extractSpeechLines(text: string): string[] {
  const lines: string[] = [];
  const rawLines = text.split("\n");
  for (const raw of rawLines) {
    const trimmed = raw.trim();
    if (!trimmed) continue;
    if (
      trimmed.toLowerCase().startsWith("production note") ||
      trimmed.toLowerCase().startsWith("pacing strategy") ||
      trimmed.startsWith("(") ||
      trimmed.startsWith("[")
    ) {
      continue;
    }
    const speech = trimmed.replace(/^HOST:\s*/i, "").trim();
    if (speech.length > 5) {
      lines.push(speech);
    }
  }
  return lines;
}

export function ForgeAIAssistant({
  workspaceId,
  selectedDocumentIds = [],
  currentScript = "",
  onApplyScript,
  onResponse,
}: ForgeAssistantProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-user",
      role: "user",
      text: "Make this easier to read aloud.",
    },
    {
      id: "initial-ai",
      role: "assistant",
      text: "I’ve shortened long sentences, added natural pauses, and improved pacing.",
      modelUsed: "gemini-3.6-flash",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat internally
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const quickActions = [
    { label: "Simplify", icon: FiEdit3, prompt: "Simplify script for reading aloud" },
    { label: "Shorten", icon: FiMinimize2, prompt: "Shorten sentences for speech pacing" },
    { label: "Expand", icon: FiMaximize2, prompt: "Elaborate points for narration" },
    { label: "Add Pauses", icon: FiPauseCircle, prompt: "Add natural pause marks throughout script" },
    { label: "Emphasize Words", icon: FiUnderline, prompt: "Highlight key words to emphasize while speaking" },
    { label: "Friendly Tone", icon: FiSmile, prompt: "Change tone to friendly and conversational" },
    { label: "Professional Tone", icon: FiBriefcase, prompt: "Change tone to professional and formal" },
  ];

  const handleQuery = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Math.random().toString(36).substring(2, 10)}`,
      role: "user",
      text: queryText.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    try {
      const payload: Record<string, unknown> = {
        question: queryText.trim(),
        workspaceId: workspaceId || "black-holes",
      };

      if (selectedDocumentIds.length > 0) {
        payload.documentIds = selectedDocumentIds;
      }
      if (currentScript) {
        payload.currentScript = currentScript;
      }

      // Query through Next.js proxy route to ensure reliable same-origin transport
      const res = await fetch("/api/rag/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const answerText = data.answer || "No response generated.";
        const isScript =
          answerText.toLowerCase().includes("host:") ||
          queryText.toLowerCase().includes("shorten") ||
          queryText.toLowerCase().includes("simplify") ||
          queryText.toLowerCase().includes("script");

        const aiMsg: Message = {
          id: `ai-${Math.random().toString(36).substring(2, 10)}`,
          role: "assistant",
          text: answerText,
          modelUsed: data.modelUsed,
          isScriptSuggestion: isScript,
        };

        setMessages((prev) => [...prev, aiMsg]);
        if (onResponse) onResponse(data.answer, data.chunksRetrieved);
        setInput("");
      } else {
        setError(data.message || data.error || "Failed to generate AI response.");
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3.5 w-full">
      {/* Header with Live RAG indicator */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <IoSparklesOutline className="w-4 h-4 text-indigo-700" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              AI Assistant
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Improve your narration instantly.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 bg-[#C6F6D5] text-[#008000] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#008000] animate-pulse" />
          Live RAG
        </span>
      </div>

      {/* Quick Actions Grid */}
      <div className="space-y-1.5">
        <span className="text-xs font-bold text-slate-900 block">
          Quick Actions
        </span>
        <div className="flex flex-wrap gap-1.5">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                type="button"
                onClick={() => handleQuery(action.prompt)}
                disabled={isLoading}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-[11px] font-medium text-indigo-900 hover:bg-slate-50 hover:border-slate-300 transition active:scale-95 cursor-pointer shadow-2xs disabled:opacity-50"
              >
                <Icon className="w-3 h-3 text-indigo-900" />
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Internal Scrollable Chat Stream Container (Bounded height prevents layout shifts) */}
      <div className="max-h-[220px] overflow-y-auto space-y-2.5 pr-1 pt-1 scroll-smooth">
        {messages.map((msg) =>
          msg.role === "user" ? (
            <div key={msg.id} className="flex justify-end">
              <button
                type="button"
                onClick={() => handleQuery(msg.text)}
                className="bg-white border border-slate-200/90 text-slate-900 text-[11px] font-medium px-3.5 py-1.5 rounded-xl shadow-2xs max-w-[85%] text-left hover:bg-slate-50 transition cursor-pointer"
              >
                {msg.text}
              </button>
            </div>
          ) : (
            <div key={msg.id} className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs tracking-wide">
                <IoSparklesOutline className="w-3.5 h-3.5 text-indigo-700 fill-indigo-600/10 stroke-[2.2]" />
                <span>AI Assistant</span>
                {msg.modelUsed && (
                  <span className="text-[10px] font-normal text-slate-400">
                    ({msg.modelUsed})
                  </span>
                )}
              </div>
              <div className="bg-[#EEECFE] text-indigo-950 text-xs font-normal leading-relaxed p-3 rounded-2xl whitespace-pre-line border border-indigo-100/60">
                {cleanAIResponse(msg.text)}

                {msg.isScriptSuggestion && onApplyScript && (
                  <div className="mt-2.5 pt-2 border-t border-indigo-200/60 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        const speechLines = extractSpeechLines(cleanAIResponse(msg.text));
                        if (speechLines.length > 0) {
                          onApplyScript(speechLines);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold rounded-lg shadow-2xs transition cursor-pointer"
                    >
                      <FiCheckCircle className="w-3 h-3" />
                      <span>Apply to Prompter</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-indigo-700 font-bold text-xs">
              <IoSparklesOutline className="w-3.5 h-3.5 text-indigo-700 animate-spin" />
              <span>AI Assistant</span>
            </div>
            <div className="bg-[#EEECFE] border border-indigo-100/80 rounded-2xl p-3 text-xs text-indigo-700 font-medium flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
              <span className="inline-block w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
              <span className="inline-block w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1">Synthesizing research evidence from RAG chunks...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="p-2.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <div className="relative flex items-center pt-1">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleQuery(input)}
          placeholder="Ask AI anything..."
          disabled={isLoading}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-3 pr-10 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-60"
        />
        <button
          type="button"
          onClick={() => handleQuery(input)}
          disabled={isLoading || !input.trim()}
          className="absolute right-2.5 text-indigo-600 hover:text-indigo-800 disabled:opacity-40 transition cursor-pointer"
        >
          {isLoading ? (
            <CgSpinner className="w-3 h-3 animate-spin" />
          ) : (
            <FiSend className="w-3 h-3" />
          )}
        </button>
      </div>
    </div>
  );
}