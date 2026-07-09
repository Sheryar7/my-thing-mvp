import React from "react";
import { GrHomeRounded } from "react-icons/gr";
import { IoArchiveOutline, IoMicOutline , IoCheckmark } from "react-icons/io5";
import { LuPenLine , LuLogOut  } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";


export function Sidebar() {
  return (
    <aside className="w-70 sticky top-0 h-screen bg-white border-r border-[#E2E8F0] hidden md:flex flex-col p-6 justify-between">
      <div className="flex flex-col gap-8">
        <div className="text-2xl font-bold text-slate-900 px-3">MyThing</div>

        <nav className="flex flex-col gap-1">
          {/* Dashboard (Active) */}
          <a className="flex items-center gap-3 p-3 bg-violet-50 text-violet-600 font-medium rounded-lg cursor-pointer">
            <GrHomeRounded className="w-5 h-5 text-violet-600" />
            <span>Dashboard</span>
          </a>

          {/* Archive */}
          <a className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer transition">
            <IoArchiveOutline className="w-5 h-5 text-slate-400" />
            <span>Archive</span>
          </a>

          {/* Workshop */}
          <a className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer transition">
            <LuPenLine  className="w-5 h-5 text-slate-400" />
            <span>Workshop</span>
          </a>

          {/* Forge */}
          <a className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer transition">
            <IoMicOutline className="w-5 h-5 text-slate-400" />
            <span>Forge</span>
          </a>

          {/* Lens */}
          <a className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer transition">
            <IoCheckmark   className="w-5 h-5 text-slate-400" />
            <span>Lens</span>
          </a>
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="flex flex-col gap-1 border-t border-slate-100 pt-4">
        <a className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer transition">
          <CiSettings className="w-5 h-5 text-slate-400" />
          <span>Settings</span>
        </a>
        <a className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer transition">
          <LuLogOut className="w-5 h-5 text-slate-400" />
          <span>Logout</span>
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;


