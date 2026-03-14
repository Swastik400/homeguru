"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, MessageSquare, FileText, ChevronDown, MoreHorizontal, TrendingUp, TrendingDown, Minus } from "lucide-react";

/**
 * Enterprise Student Overview
 * Includes performance tracking, attendance, and filtering by course.
 */

const STUDENTS = [
  {
    id: 1,
    name: "Varun Sharma",
    subject: "English Speaking",
    avatar: "https://i.pravatar.cc/150?img=33",
    attendance: 94,
    totalClasses: 24,
    lastClass: "Today",
    status: "active",
    score: 82,
    trend: 'up'
  },
  {
    id: 2,
    name: "Rahul Verma",
    subject: "Advanced Calculus",
    avatar: "https://i.pravatar.cc/150?img=11",
    attendance: 68,
    totalClasses: 18,
    lastClass: "Yesterday",
    status: "active",
    score: 67,
    trend: 'down'
  },
  {
    id: 3,
    name: "Meera Nair",
    subject: "Physics",
    avatar: "https://i.pravatar.cc/150?img=5",
    attendance: 100,
    totalClasses: 32,
    lastClass: "Today",
    status: "active",
    score: 94,
    trend: 'up'
  },
  {
    id: 4,
    name: "Aditya Singh",
    subject: "Web Development",
    avatar: "https://i.pravatar.cc/150?img=15",
    attendance: 42,
    totalClasses: 12,
    lastClass: "3 days ago",
    status: "at-risk",
    score: 45,
    trend: 'down'
  },
  {
    id: 5,
    name: "Priya Desai",
    subject: "Advanced Calculus",
    avatar: "https://i.pravatar.cc/150?img=25",
    attendance: 88,
    totalClasses: 20,
    lastClass: "Yesterday",
    status: "active",
    score: 76,
    trend: 'stable'
  },
];

const statusBadge = (status: string) => {
  if (status === "at-risk")
    return <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-[4px] bg-red-50 text-red-600 border border-red-100">At Risk</span>;
  return <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-[4px] bg-green-50 text-green-600 border border-green-100">Active</span>;
};

const TrendIcon = ({ type }: { type: string }) => {
  if (type === 'up') return <TrendingUp size={12} className="text-green-500" />;
  if (type === 'down') return <TrendingDown size={12} className="text-red-500" />;
  return <Minus size={12} className="text-gray-400" />;
};

export default function StudentOverview() {
  const router = useRouter();
  const [filter, setFilter] = useState("All Courses");

  return (
    <div className="w-full font-matter">
      {/* Table Controls (Enterprise Filters) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#64748B" viewBox="0 0 256 256">
              <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.43a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.51A8,8,0,0,1,250.14,206.7Z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <h2 className="text-[#0F172A] text-[22px] font-season font-bold tracking-tight">Students Analytics</h2>
            <span className="text-[#64748B] text-[13px] font-semibold uppercase tracking-wider">48 Total Enrolled</span>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-3">
          <div className="relative group">
            <button className="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-[13.5px] font-bold text-[#475569] hover:bg-[#F8FAFC] transition-all shadow-sm">
              <Filter size={14} strokeWidth={2.5} />
              <span>{filter}</span>
              <ChevronDown size={14} strokeWidth={2.5} className="ml-1 opacity-60" />
            </button>
          </div>

          <div className="flex items-center gap-3 bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-2.5 rounded-xl shadow-inner w-full sm:w-[280px]">
            <Search size={14} strokeWidth={2.5} className="text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Find a student by name..."
              className="bg-transparent border-none outline-none text-[13.5px] text-[#1E293B] placeholder-[#94A3B8] w-full font-medium"
            />
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="w-full bg-white rounded-[32px] border border-[#E2E8F0] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#FBFBFC] border-b border-[#F1F5F9]">
                <th className="py-5 pl-10 pr-4 text-[11px] font-bold text-[#64748B] uppercase tracking-[0.15em]">Student</th>
                <th className="py-5 px-4 text-[11px] font-bold text-[#64748B] uppercase tracking-[0.15em]">Attendance</th>
                <th className="py-5 px-4 text-[11px] font-bold text-[#64748B] uppercase tracking-[0.15em]">Class Progress</th>
                <th className="py-5 px-4 text-[11px] font-bold text-[#64748B] uppercase tracking-[0.15em]">Performance</th>
                <th className="py-5 px-4 text-[11px] font-bold text-[#64748B] uppercase tracking-[0.15em]">Last Activity</th>
                <th className="py-5 px-4 text-[11px] font-bold text-[#64748B] uppercase tracking-[0.15em]">Status</th>
                <th className="py-5 pr-10 pl-4 text-center text-[11px] font-bold text-[#64748B] uppercase tracking-[0.15em]">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {STUDENTS.map((s) => (
                <tr 
                  key={s.id} 
                  onClick={() => router.push(`/dashboard/teacher/students/${s.id}`)}
                  className="hover:bg-gray-50/80 transition-all group cursor-pointer"
                >
                  <td className="py-4 pl-8 pr-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                        <img src={s.avatar} alt={s.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[#111827] text-[14px] font-bold group-hover:text-blue-600 transition-colors">
                          {s.name}
                        </span>
                        <span className="text-[12px] text-gray-400 font-medium">{s.subject}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center w-full max-w-[80px]">
                        <span className="text-[13px] font-bold text-gray-700">{s.attendance}%</span>
                        <TrendIcon type={s.trend} />
                      </div>
                      <div className="w-[80px] bg-gray-100 rounded-full h-1">
                        <div className={`h-1 rounded-full ${s.attendance > 90 ? 'bg-green-500' : s.attendance > 70 ? 'bg-orange-400' : 'bg-red-500'}`} style={{ width: `${s.attendance}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[13px] font-bold text-gray-900">{s.totalClasses} sessions</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[15px] font-black ${s.score > 85 ? 'text-green-600' : s.score > 60 ? 'text-gray-900' : 'text-red-600'}`}>
                        {s.score}
                      </span>
                      <span className="text-[11px] text-gray-400 font-bold">/100</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-gray-700">{s.lastClass}</span>
                      <span className="text-[11px] text-gray-400">9:45 AM</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">{statusBadge(s.status)}</td>
                  <td className="py-4 pr-8 pl-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-2">
                      <button title="Message" className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-all">
                        <MessageSquare size={16} />
                      </button>
                      <button title="View Performance" className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-all">
                        <FileText size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-all">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Improved Footer */}
        <div className="px-6 md:px-10 py-6 bg-[#FBFBFC] border-t border-[#F1F5F9] flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
            <span className="text-[13px] font-semibold text-[#64748B]">Showing <span className="text-[#0F172A] font-bold">5</span> of <span className="text-[#0F172A] font-bold">48</span> Students</span>
            <div className="hidden sm:block h-5 w-px bg-[#E2E8F0]"></div>
            <div className="flex items-center gap-2 bg-[#FEF2F2] px-3 py-1.5 rounded-full border border-[#FEE2E2] shadow-sm">
              <div className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse"></div>
              <span className="text-[11px] font-bold text-[#991B1B] uppercase tracking-wider whitespace-nowrap">2 Flagged for Attention</span>
            </div>
          </div>
          <button className="w-full md:w-auto flex items-center justify-center gap-2.5 px-6 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-[12.5px] font-bold text-[#0F172A] hover:bg-[#F8FAFC] transition-all shadow-sm active:scale-95 mt-2 md:mt-0">
            Open Full Management
          </button>
        </div>
      </div>
    </div>
  );
}
