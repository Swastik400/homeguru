"use client";
import { Sparkles, LayoutGrid } from "lucide-react";
import { 
  Chalkboard, 
  Terminal, 
  Lightning, 
  ChartBar 
} from "@phosphor-icons/react";
import ClassroomStats from "@/components/teacher/ClassroomStats";
import ClassroomList from "@/components/teacher/ClassroomList";

export default function ClassroomHubPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
      
      {/* Left Column (8 cols) */}
      <div className="lg:col-span-8 flex flex-col gap-4 md:gap-6">
        <ClassroomStats />
        <ClassroomList />
      </div>

      {/* Right Column (4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-4 md:gap-6">
        {/* Quick Actions / Tools */}
        <div className="bg-white rounded-[20px] border border-gray-200 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-2.5 mb-6">
             <div className="w-5 h-5 flex items-center justify-center text-gray-800">
                <LayoutGrid size={18} />
             </div>
             <h2 className="text-[#111827] text-[17px] tracking-wide font-season">
               Classroom Tools
             </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             {[
               { name: "Whiteboard", icon: <Chalkboard size={22} weight="duotone" className="text-[#7C3AED]" /> },
               { name: "Code Editor", icon: <Terminal size={22} weight="duotone" className="text-[#0EA5E9]" /> },
               { name: "Live Quiz", icon: <Lightning size={22} weight="duotone" className="text-[#F59E0B]" /> },
               { name: "Polls", icon: <ChartBar size={22} weight="duotone" className="text-[#10B981]" /> },
             ].map((tool) => (
               <button 
                 key={tool.name} 
                 className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-[#F9FAFB] hover:bg-white hover:shadow-sm transition-all text-center group"
               >
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm group-hover:scale-105 transition-transform">
                     {tool.icon}
                  </div>
                  <span className="text-[13px] font-medium text-gray-700">{tool.name}</span>
               </button>
             ))}
          </div>
        </div>

        {/* AI Assistant Preview */}
        <div className="bg-[#111827] rounded-[20px] p-6 text-white shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles size={100} />
           </div>
           <div className="relative z-10">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mb-5">
                 <Sparkles size={20} className="text-white" />
              </div>
              <h3 className="text-[18px] font-bold mb-2 font-season">AI Assistant</h3>
              <p className="text-gray-400 text-[13px] mb-6 leading-relaxed">
                Generate lesson plans, attendance records, and student feedback using Osmium AI.
              </p>
              <button className="w-full py-2.5 bg-white text-[#111827] rounded-full text-[13px] font-bold hover:bg-gray-100 transition-colors">
                 Launch Workspace
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
