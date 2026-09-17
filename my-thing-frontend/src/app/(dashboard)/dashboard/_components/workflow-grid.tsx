"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IoArchiveOutline, IoMicOutline, IoCheckmark } from "react-icons/io5";
import { LuPenLine } from "react-icons/lu";
import { WorkflowCard, type WorkflowCardConfig } from "./workflow-card";

const workflowSteps: WorkflowCardConfig[] = [
  {
    title: "Archive",
    description: "Collect and organize articles, links and research materials.",
    mobileDescription: "Track your sources",
    icon: IoArchiveOutline,
    accent: {
      background: "bg-[#f2fbf5]",
      border: "border-[#bbf7d0]",
      iconBackground: "bg-[#bbf7d0]",
      iconColor: "text-[#16a34a]",
      button: "border-[#22c55e] text-[#16a34a] hover:bg-green-50/50",
    },
  },
  {
    title: "Workshop",
    description: "Write, edit and refine your script using AI assistance.",
    mobileDescription: "Write your script",
    icon: LuPenLine,
    accent: {
      background: "bg-[#f6f5fe]",
      border: "border-[#ddd6fe]",
      iconBackground: "bg-[#ddd6fe]",
      iconColor: "text-[#7c3aed]",
      button: "border-[#7c3aed] text-[#7c3aed] hover:bg-purple-50/50",
    },
  },
  {
    title: "Forge",
    description: "Prepare everything before recording your content.",
    mobileDescription: "Prepare for recording",
    icon: IoMicOutline,
    accent: {
      background: "bg-[#fff8f2]",
      border: "border-[#fed7aa]",
      iconBackground: "bg-[#fed7aa]",
      iconColor: "text-[#ea580c]",
      button: "border-[#f97316] text-[#ea580c] hover:bg-orange-50/50",
    },
  },
  {
    title: "Lens",
    description: "Verify facts and improve accuracy before publishing.",
    mobileDescription: "Validate all facts",
    icon: IoCheckmark,
    accent: {
      background: "bg-[#fff2f4]",
      border: "border-[#fecdd3]",
      iconBackground: "bg-[#fecdd3]",
      iconColor: "text-[#e11d48]",
      button: "border-[#f43f5e] text-[#e11d48] hover:bg-rose-50/50",
    },
  },
];

export function WorkflowGrid() {
  const router = useRouter();

  const handleOpenStage = (stageTitle: string) => {
    const route = `/${stageTitle.toLowerCase()}`;
    router.push(route);
  };

  return (
    <section className="space-y-3 sm:space-y-4 w-full">
      <div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
          Workflow
        </h2>
        <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-400">
          Your content creation process
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
        {workflowSteps.map((workflow) => (
          <WorkflowCard
            key={workflow.title}
            workflow={workflow}
            onOpen={handleOpenStage}
          />
        ))}
      </div>
    </section>
  );
}

export default WorkflowGrid;