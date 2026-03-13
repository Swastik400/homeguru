"use client";
import { FileText, CheckCircle, RotateCcw, ChevronRight, User } from "lucide-react";

/**
 * Enterprise Recent Submissions
 * Streamlined grading workflow with quick actions.
 */

const SUBMISSIONS = [
  {
    id: 1,
    title: "Spanish Essay",
    student: "Varun Sharma",
    avatar: "https://i.pravatar.cc/150?img=33",
    submitted: "2 hours ago",
    course: "Intro to Spanish",
    status: "pending"
  },
  {
    id: 2,
    title: "Calculus Set #4",
    student: "Priya Desai",
    avatar: "https://i.pravatar.cc/150?img=25",
    submitted: "Yesterday",
    course: "Advanced Calculus",
    status: "pending"
  },
  {
    id: 3,
    title: "Physics Lab Report",
    student: "Meera Nair",
    avatar: "https://i.pravatar.cc/150?img=5",
    submitted: "3 hours ago",
    course: "Quantum Physics",
    status: "urgent"
  },
];

export default function RecentSubmissions() {
  return (
    <div className="w-full bg-white rounded-[24px] border border-gray-200 font-matter shadow-sm h-full flex flex-col overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50 bg-[#F9FAFB]/50">
        <div className="flex items-center gap-2.5">
          <FileText size={18} className="text-black" />
          <h2 className="text-[#111827] text-[17px] font-bold font-season">Recent Submissions</h2>
        </div>
        <span className="text-[11px] font-black text-white bg-red-500 px-2 py-0.5 rounded-full">3 New</span>
      </div>

      <div className="flex-1 divide-y divide-gray-50">
        {SUBMISSIONS.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-gray-50 transition-all cursor-pointer relative"
          >
            <div className="flex items-center gap-4">
              {/* Left indicator */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${item.status === 'urgent' ? 'bg-red-500' : 'bg-transparent group-hover:bg-gray-200 transition-all'}`}></div>

              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm shrink-0 border border-white">
                <img src={item.avatar} alt={item.student} className="w-full h-full object-cover" />
              </div>

              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-[#111827] text-[14px] font-bold truncate">{item.title}</h3>
                  {item.status === 'urgent' && <span className="text-[9px] font-black text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100 uppercase tracking-tighter">Urgent</span>}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-gray-500">
                    <User size={10} />
                    <span className="truncate">{item.student}</span>
                  </div>
                  <span className="text-gray-200 text-[11px]">|</span>
                  <span className="text-[11px] text-gray-400 font-medium">{item.submitted}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Group */}
            <div className="flex items-center gap-2 mt-4 md:mt-0 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all">
              <button title="Grade & Return" className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white rounded-lg text-[11px] font-bold shadow-sm hover:scale-105 transition-all">
                <CheckCircle size={12} />
                <span>Grade</span>
              </button>
              <button title="Request Revision" className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-[11px] font-bold hover:bg-gray-50 transition-all shadow-sm">
                <RotateCcw size={12} />
                <span>Redo</span>
              </button>
              <button className="p-2 text-gray-400 hover:text-black transition-all">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
        <button className="text-[12px] font-black text-[#111827] hover:underline uppercase tracking-widest">
          Open Grading Portal
        </button>
      </div>

    </div>
  );
}
