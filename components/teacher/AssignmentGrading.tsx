"use client";
import React, { useState } from "react";
import {
  Filter,
  Search,
  Calendar,
  TrendingUp,
  MoreVertical,
  ChevronRight,
  Zap,
  FileCheck,
  ShieldCheck,
} from "lucide-react";

const MOCK_ASSIGNMENTS = [
  {
    id: 1,
    title: "Calculus Problem Set 1",
    course: "Advanced Mathematics",
    dueDate: "20 Mar 2026",
    totalSubmissions: 12,
    graded: 8,
    pending: 4,
    status: "Active",
    avgGrade: 82,
  },
  {
    id: 2,
    title: "Physics Lab Report",
    course: "Physics Fundamentals",
    dueDate: "18 Mar 2026",
    totalSubmissions: 48,
    graded: 48,
    pending: 0,
    status: "Closed",
    avgGrade: 76,
  },
  {
    id: 3,
    title: "Linear Algebra Quiz",
    course: "Matrix Theory",
    dueDate: "25 Mar 2026",
    totalSubmissions: 4,
    graded: 1,
    pending: 3,
    status: "Active",
    avgGrade: 91,
  },
];

const MOCK_SUBMISSIONS = [
  {
    id: 1,
    assignmentId: 1,
    studentName: "Sarah Johnson",
    studentImage: "https://i.pravatar.cc/150?img=5",
    submittedAt: "15 Mar, 10:30 AM",
    status: "Pending",
    grade: null as number | null,
  },
  {
    id: 2,
    assignmentId: 1,
    studentName: "Michael Chen",
    studentImage: "https://i.pravatar.cc/150?img=8",
    submittedAt: "14 Mar, 3:45 PM",
    status: "Graded",
    grade: 85,
  },
  {
    id: 3,
    assignmentId: 1,
    studentName: "Emma Wilson",
    studentImage: "https://i.pravatar.cc/150?img=9",
    submittedAt: "16 Mar, 9:15 AM",
    status: "Pending",
    grade: null as number | null,
  },
];

function ProgressRing({
  percentage,
  size = 44,
  strokeWidth = 3,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          className="text-gray-100"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-black transition-all duration-1000 ease-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-black">{percentage}%</span>
      </div>
    </div>
  );
}

export default function AssignmentGrading() {
  const [activeTab, setActiveTab] = useState<"assignments" | "submissions">(
    "assignments"
  );
  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAssignments = MOCK_ASSIGNMENTS.filter((a) =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSubmissions = selectedAssignment
    ? MOCK_SUBMISSIONS.filter((s) => s.assignmentId === selectedAssignment)
    : MOCK_SUBMISSIONS;

  return (
    <div className="space-y-10">
      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-black rounded-full text-xs font-bold border border-gray-100 shadow-sm">
            <Filter className="w-3.5 h-3.5" />
            <span>Scope</span>
          </button>
          <div className="flex items-center gap-6 px-4">
            {["Coursework", "Exam Papers", "Practical"].map((opt) => (
              <button
                key={opt}
                className="text-xs font-bold text-gray-400 hover:text-black transition-colors whitespace-nowrap"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
          <input
            type="text"
            placeholder="Search curricula..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-xs focus:ring-2 focus:ring-black/5 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Main Content */}
        <div className="xl:col-span-8 space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-6">
              {[
                { id: "assignments" as const, label: "Assignment Grid" },
                { id: "submissions" as const, label: "Pipeline" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-xs font-black uppercase tracking-widest transition-all ${
                    activeTab === tab.id
                      ? "text-black"
                      : "text-gray-300 hover:text-gray-500"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="h-0.5 bg-black rounded-full mt-1.5 w-1/2" />
                  )}
                </button>
              ))}
            </div>
            <span className="text-[10px] font-black text-gray-200 uppercase tracking-[.2em]">
              Live Registry
            </span>
          </div>

          {activeTab === "assignments" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] group hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            assignment.status === "Active"
                              ? "bg-green-500 animate-pulse"
                              : "bg-gray-300"
                          }`}
                        />
                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                          {assignment.status}
                        </span>
                      </div>
                      <h3 className="text-base font-season font-bold text-[#111111] leading-tight group-hover:text-blue-600 transition-colors">
                        {assignment.title}
                      </h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide mt-1">
                        {assignment.course}
                      </p>
                    </div>
                    <ProgressRing
                      percentage={Math.round(
                        (assignment.graded / assignment.totalSubmissions) * 100
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    <div className="bg-gray-50/50 p-3 rounded-2xl border border-gray-50">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar size={12} className="text-gray-400" />
                        <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">
                          Due Date
                        </span>
                      </div>
                      <p className="text-[11px] font-bold text-[#111111]">
                        {assignment.dueDate}
                      </p>
                    </div>
                    <div className="bg-gray-50/50 p-3 rounded-2xl border border-gray-50">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp size={12} className="text-gray-400" />
                        <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">
                          Avg Grade
                        </span>
                      </div>
                      <p className="text-[11px] font-bold text-[#111111]">
                        {assignment.avgGrade}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <img
                          key={i}
                          src={`https://i.pravatar.cc/150?u=${assignment.id + i}`}
                          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                          alt=""
                        />
                      ))}
                      <div className="w-6 h-6 rounded-full bg-gray-50 border-2 border-white flex items-center justify-center text-[8px] font-black text-gray-400">
                        +{assignment.totalSubmissions - 3}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-300 hover:text-black hover:bg-gray-100 rounded-full transition-all">
                        <MoreVertical size={14} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedAssignment(assignment.id);
                          setActiveTab("submissions");
                        }}
                        className="px-5 py-2 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
              <div className="p-8 border-b border-gray-50 bg-gray-50/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-season font-bold text-[#111111]">
                      Submission Pipeline
                    </h3>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Real-time grading assessment for{" "}
                      {selectedAssignment
                        ? "selected item"
                        : "all active items"}
                      .
                    </p>
                  </div>
                  {selectedAssignment && (
                    <button
                      onClick={() => setSelectedAssignment(null)}
                      className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                    >
                      Clear Filter
                    </button>
                  )}
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                {filteredSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-5 flex items-center justify-between group hover:bg-gray-50/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={sub.studentImage}
                        className="w-9 h-9 rounded-full border border-gray-100 object-cover"
                        alt=""
                      />
                      <div>
                        <p className="text-[13px] font-bold text-[#111111]">
                          {sub.studentName}
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium">
                          Submitted {sub.submittedAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="hidden md:flex flex-col items-end">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                            sub.status === "Graded"
                              ? "bg-green-50 text-green-600 border-green-100"
                              : "bg-amber-50 text-amber-600 border-amber-100"
                          }`}
                        >
                          {sub.status}
                        </span>
                      </div>
                      <div className="w-[80px] text-right">
                        <span
                          className={`text-[13px] font-black ${
                            sub.grade ? "text-black" : "text-gray-200"
                          }`}
                        >
                          {sub.grade ? `${sub.grade}%` : "\u2014"}
                        </span>
                      </div>
                      <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-all">
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-gray-50/30 text-center">
                <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-black">
                  Load Full Pipeline
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-4 space-y-6">
          <div className="flex items-start justify-between">
            <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center shadow-lg shadow-black/20">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md uppercase tracking-wider border border-amber-100">
              grading assist
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-base font-season font-bold text-[#111111]">
                Osmium Engine
              </h3>
              <p className="text-[11px] text-gray-400 mt-0.5">
                AI-powered document analysis and score forecasting.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 group hover:bg-blue-50 transition-colors">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center border border-blue-100 shadow-sm">
                    <FileCheck size={14} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-blue-900 leading-tight">
                      Batch Analysis
                    </p>
                    <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">
                      4 Ready
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-blue-800/70 font-medium leading-tight">
                  Osmium has finalized grading drafts for the latest Calculus
                  submissions.
                </p>
                <button className="mt-3 w-full py-2 bg-white text-blue-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all active:scale-95">
                  Review AI Drafts
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">
                    Integrity Alert
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                </div>
                <p className="text-[12px] text-amber-900 font-bold leading-tight">
                  Verify Step-by-Step Logic
                </p>
                <p className="text-[10px] text-amber-600 mt-0.5 font-medium">
                  Potential citation issues detected in 2 reports.
                </p>
              </div>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-[#111111] rounded-2xl p-6 text-white relative overflow-hidden group">
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/5 rounded-full blur-[80px] group-hover:scale-110 transition-transform duration-1000" />
            <h3 className="text-lg font-season font-bold mb-5 relative z-10">
              Analytics Pulse
            </h3>
            <div className="space-y-5 relative z-10">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-season font-bold tracking-tight">
                    84.2%
                  </p>
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mt-1">
                    Class Average Grade
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-green-400 text-[10px] font-bold mb-1">
                  <TrendingUp size={14} />
                  <span>+2.4%</span>
                </div>
              </div>

              <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)] transition-all duration-1000"
                  style={{ width: "84%" }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                  <p className="text-[9px] text-white/30 uppercase font-black tracking-widest">
                    Highest
                  </p>
                  <p className="text-sm font-bold mt-1 tracking-tight">
                    98%{" "}
                    <span className="text-[9px] font-medium text-white/40 ml-1">
                      S. Johnson
                    </span>
                  </p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                  <p className="text-[9px] text-white/30 uppercase font-black tracking-widest">
                    Volume
                  </p>
                  <p className="text-sm font-bold mt-1 tracking-tight">
                    164{" "}
                    <span className="text-[9px] font-medium text-white/40 ml-1">
                      Pages
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <button className="mt-6 w-full py-3.5 bg-white text-[#111111] rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all active:scale-95 shadow-xl">
              Detailed Breakdown
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
