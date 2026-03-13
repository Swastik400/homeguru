"use client";
import dynamic from "next/dynamic";
import {
  Clock,
  AlertCircle,
  TrendingUp,
  CheckCircle,
  FileText,
  Plus,
  Download,
} from "lucide-react";

const AssignmentGrading = dynamic(
  () => import("@/components/teacher/AssignmentGrading"),
  {
    loading: () => (
      <div className="w-full h-64 bg-gray-100 rounded-[20px] animate-pulse" />
    ),
  }
);

const STATS = [
  { label: "Total Active", value: "8", icon: FileText, sub: "3 courses", subColor: "#6B7280" },
  { label: "Pending Grades", value: "14", icon: Clock, sub: "6 urgent", subColor: "#D97706" },
  { label: "Due Today", value: "2", icon: AlertCircle, sub: "1 overdue", subColor: "#DC2626" },
  { label: "Avg Class Grade", value: "84%", icon: TrendingUp, sub: "+2.4% this week", subColor: "#10B981" },
  { label: "Completion Rate", value: "96%", icon: CheckCircle, sub: "48 students", subColor: "#6B7280" },
];

export default function AssignmentsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-season font-bold text-[#111827] tracking-tight">
            Assignments & Grading
          </h1>
          <p className="text-gray-400 text-[13px] mt-0.5">
            Manage coursework, grade submissions, and track student performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-[#344054] rounded-xl text-[12px] font-bold shadow-sm hover:bg-gray-50 transition-all">
            <Download className="w-4 h-4 text-gray-400" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#111827] text-white rounded-xl text-[12px] font-bold shadow-sm hover:bg-black transition-all">
            <Plus className="w-4 h-4" />
            New Assignment
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="bg-white rounded-[20px] border border-gray-200 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {STATS.map((stat, i) => (
            <div key={i} className="flex items-start gap-3 p-5">
              <div className="w-10 h-10 rounded-xl bg-[#F2F2F2] flex items-center justify-center shrink-0">
                <stat.icon size={18} className="text-[#111827]" />
              </div>
              <div>
                <p className="text-[12px] text-gray-400 font-medium">{stat.label}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[20px] font-bold text-[#111827] leading-tight">{stat.value}</span>
                </div>
                <span className="text-[11px] font-medium" style={{ color: stat.subColor }}>
                  {stat.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <AssignmentGrading />
    </div>
  );
}
