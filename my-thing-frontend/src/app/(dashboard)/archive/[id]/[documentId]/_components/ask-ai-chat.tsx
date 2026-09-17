"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiSend } from "react-icons/fi";
import { IoSparklesOutline } from "react-icons/io5";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  modelUsed?: string;
}

interface AskAIChatProps {
  projectId: string;
  documentId: string;
  documentTitle?: string;
}

// Clean up all raw markdown syntax (###, ---, **, *) into clean, human-readable text
function cleanAIResponse(raw: string): string {
  if (!raw) return "";
  return raw
    .replace(/^#{1,6}\s+/gm, "") // Remove ###, ##, # headers
    .replace(/^-{3,}\s*$/gm, "") // Remove --- horizontal lines
    .replace(/^\*\s+/gm, "• ") // Replace * bullet asterisks with clean bullet points
    .replace(/\*\*(.*?)\*\*/g, "$1") // Strip bold asterisks
    .replace(/\*(.*?)\*/g, "$1") // Strip italic asterisks
    .replace(/_{1,2}(.*?)_{1,2}/g, "$1") // Strip underscores
    .replace(/\n{3,}/g, "\n\n") // Collapse excessive blank lines
    .trim();
}

export function AskAIChat({ projectId, documentId, documentTitle }: AskAIChatProps) {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasAutoQueried = useRef(false);

  // Auto-scroll chat internally when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Send query via Next.js same-origin API route (/api/rag/query)
  const sendQuery = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Math.random().toString(36).slice(2, 9)}`,
      role: "user",
      text: queryText.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/rag/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: queryText.trim(),
          workspaceId: projectId || "educational-research",
          documentIds: documentId ? [documentId] : [],
        }),
      }).catch(() => null);

      if (res && res.ok) {
        const data = await res.json().catch(() => ({}));
        const aiMessage: Message = {
          id: `ai-${Math.random().toString(36).slice(2, 9)}`,
          role: "assistant",
          text: data.answer || "No response received from RAG engine.",
          modelUsed: data.modelUsed,
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        const errData = res ? await res.json().catch(() => ({})) : {};
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Math.random().toString(36).slice(2, 9)}`,
            role: "assistant",
            text: errData.message || "Unable to retrieve insights from the RAG engine at this time.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Math.random().toString(36).slice(2, 9)}`,
          role: "assistant",
          text: "Connection error with RAG service. Please ensure the backend engine is running.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial automatic query tailored to the specific document
  useEffect(() => {
    if (!hasAutoQueried.current && documentId) {
      hasAutoQueried.current = true;
      const initialPrompt = "Give me a 30-second podcast intro from this paper.";
      sendQuery(initialPrompt);
    }
  }, [documentId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const q = chatInput;
    setChatInput("");
    sendQuery(q);
  };

  const quickPrompts = [
    "Draft a 30s podcast intro",
    "Explain key methodology",
    "Extract main evidence & stats",
  ];

  return (
    <div className="w-full max-w-full min-w-0 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3.5 flex flex-col h-[500px]">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-full min-w-0 shrink-0">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
          Ask AI about this document
        </h3>

        <span className="inline-flex items-center gap-1.5 bg-[#C6F6D5] text-[#008000] text-xs font-semibold px-2.5 py-0.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#008000] animate-pulse" />
          Live RAG
        </span>
      </div>

      {/* Quick Prompts Chips */}
      <div className="flex flex-wrap gap-1.5 shrink-0">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            disabled={isLoading}
            onClick={() => sendQuery(prompt)}
            className="text-[11px] font-medium text-slate-600 bg-slate-50 hover:bg-violet-50 hover:text-violet-700 border border-slate-200/70 rounded-lg px-2.5 py-0.5 transition-colors disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Stream: Fixed height with internal vertical scroll, outer UI remains identical */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1">
        {messages.map((msg) =>
          msg.role === "user" ? (
            <div key={msg.id} className="flex justify-end w-full max-w-full min-w-0">
              <div className="w-full max-w-[85%] bg-white border border-slate-200/80 rounded-2xl rounded-tr-sm px-3.5 py-2 text-xs font-medium text-slate-800 shadow-2xs">
                {msg.text}
              </div>
            </div>
          ) : (
            <div key={msg.id} className="space-y-1.5 w-full max-w-full min-w-0">
              <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-xs pl-0.5 w-full max-w-full min-w-0">
                <IoSparklesOutline className="w-3.5 h-3.5 text-indigo-600 stroke-[2.5]" />
                <span className="text-slate-900 font-bold text-xs">AI Assistant</span>
                {msg.modelUsed && (
                  <span className="text-[10px] font-normal text-slate-400">({msg.modelUsed})</span>
                )}
              </div>

              <div className="w-full max-w-full min-w-0 bg-[#EEECFE] border border-indigo-100/80 rounded-xl p-3.5 text-xs md:text-sm text-indigo-950 font-normal leading-relaxed whitespace-pre-line">
                {cleanAIResponse(msg.text)}
              </div>
            </div>
          )
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="space-y-1.5 w-full max-w-full min-w-0">
            <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-xs pl-0.5">
              <IoSparklesOutline className="w-3.5 h-3.5 text-indigo-600 stroke-[2.5] animate-spin" />
              <span className="text-slate-900 font-bold text-xs">AI Assistant</span>
            </div>
            <div className="w-full max-w-full min-w-0 bg-[#EEECFE] border border-indigo-100/80 rounded-xl p-3 text-xs text-indigo-700 font-medium flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
              <span className="inline-block w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
              <span className="inline-block w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1">Synthesizing research evidence from RAG chunks...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form at Bottom */}
      <form onSubmit={handleSubmit} className="relative w-full shrink-0 pt-1">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          disabled={isLoading}
          placeholder="Ask a follow-up about quotes, data, or script ideas..."
          className="w-full bg-white border border-slate-200 rounded-xl pl-3.5 pr-11 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all shadow-2xs disabled:bg-slate-50"
        />
        <button
          type="submit"
          disabled={isLoading || !chatInput.trim()}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-indigo-50 hover:bg-indigo-100 disabled:opacity-40 text-indigo-600 rounded-lg flex items-center justify-center transition-colors"
          aria-label="Send query"
        >
          <FiSend className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}

export default AskAIChat;