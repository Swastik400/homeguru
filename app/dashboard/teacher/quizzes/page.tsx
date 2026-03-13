"use client";
import React, { useState } from "react";
import { 
  ListTodo, 
  Plus, 
  Search, 
  Filter, 
  Shield, 
  Clock, 
  Users, 
  CheckCircle, 
  BarChart, 
  MoreVertical, 
  Zap, 
  AlertTriangle, 
  Calendar,
  ChevronRight,
  TrendingUp,
  Download,
  BarChart3,
  Maximize2,
  ArrowUpRight,
  FileText,
  Mail
} from "lucide-react";

/**
 * Premium Vajra Quizzes & Exams Management
 * High-density, minimalist interface achieving parity with the Engagement system.
 */

const EXAMS = [
  {
    id: "EX-4421",
    title: "Calculus Mid-Term",
    course: "Advanced Calculus",
    date: "15 Mar, 2026",
    duration: "90 mins",
    students: 12,
    status: "Scheduled",
    type: "Standard",
    accuracy: 78,
    difficulty: "Mid"
  },
  {
    id: "EX-4425",
    title: "English Vocab Quiz",
    course: "Spanish A1",
    date: "12 Mar, 2026",
    duration: "20 mins",
    students: 48,
    status: "Ongoing",
    type: "AI-Gen",
    accuracy: 62,
    difficulty: "Easy"
  },
  {
    id: "EX-4430",
    title: "Physics Mock Final",
    course: "Theoretical Physics",
    date: "10 Mar, 2026",
    duration: "180 mins",
    students: 8,
    status: "Completed",
    type: "Proctored",
    accuracy: 91,
    difficulty: "Hard"
  }
];

const QUIZ_STATS = [
  { label: "Total Quizzes", value: "24", icon: ListTodo, color: "text-blue-500" },
  { label: "Avg Score", value: "78.4%", icon: TrendingUp, color: "text-green-500" },
  { label: "Completion", value: "92%", icon: CheckCircle, color: "text-purple-500" },
  { label: "Active Now", value: "1", icon: Zap, color: "text-amber-500" },
  { label: "Integrity", value: "99.2%", icon: Shield, color: "text-blue-600" },
];

const STATUS_THEMES = {
  "Ongoing": "bg-[#FFFAEB] text-[#B54708] border-[#FEDF89]",
  "Scheduled": "bg-[#F0F9FF] text-[#026AA2] border-[#B9E6FE]",
  "Completed": "bg-[#E6F6EB] text-[#027A48] border-[#A6F4C5]",
  "Draft": "bg-[#F9FAFB] text-[#344054] border-[#EAECF0]"
};

export default function QuizzesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="relative min-h-[calc(100vh-77px)] -m-6 p-6 overflow-x-hidden bg-[#F8F9FA] font-matter">
      {/* Background radial glow */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] rounded-full bg-amber-50/20 blur-[100px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-50/10 blur-[100px]" />
      </div>

      <div className="max-w-[1600px] mx-auto space-y-10">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-season font-bold text-[#111111] tracking-tight">Assessment Suite</h1>
            <p className="text-gray-400 text-[12px] mt-0.5">Design, proctor, and analyze student performances with AI-driven insights.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100/80 text-[#344054] rounded-full text-xs font-bold shadow-sm hover:bg-gray-50 transition-all">
              <Download className="w-4 h-4 text-gray-400" />
              <span>Export CSV</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full text-xs font-bold shadow-lg hover:bg-black/90 transition-all">
              <Plus className="w-4 h-4" />
              <span>Create Exam</span>
            </button>
          </div>
        </div>

        {/* 1. Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {QUIZ_STATS.map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] group hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all">
              <div className="p-1.5 w-fit rounded-lg bg-gray-50 group-hover:bg-white transition-colors mb-3 border border-gray-50/50">
                <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
              </div>
              <h4 className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-0.5">{stat.label}</h4>
              <p className="text-xl font-season font-bold text-[#111111]">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* 2. Filters Bar (Parity with Attendance) */}
        <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-black rounded-full text-xs font-bold border border-gray-100">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter By</span>
            </button>
            <div className="h-4 w-[1px] bg-gray-100 mx-2 hidden md:block" />
            <select className="bg-transparent border-none text-xs font-bold text-gray-500 focus:ring-0 cursor-pointer">
              <option>All Topics</option>
              <option>Mid-Term</option>
              <option>Finals</option>
              <option>Pop Quizzes</option>
            </select>
            <select className="bg-transparent border-none text-xs font-bold text-gray-500 focus:ring-0 cursor-pointer">
              <option>This Week</option>
              <option>Last 30 Days</option>
              <option>Semester 1</option>
            </select>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
            <input 
              type="text" 
              placeholder="Search assessment identity..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-xs focus:ring-1 focus:ring-black/5"
            />
          </div>
        </div>

        {/* 3. Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* Main Table Column */}
          <div className="xl:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#111111]/5 flex items-center justify-center">
                    <BarChart3 className="w-3.5 h-3.5 text-[#111111]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-season font-bold text-[#111111]">Assessment Pipeline</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">3 Active • 21 Archived</p>
                  </div>
                </div>
                <button className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-50 rounded-full transition-all">
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50/30">
                      <th className="py-4 pl-6 pr-3 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest">Assessment</th>
                      <th className="py-4 px-3 text-center text-[9px] font-black text-gray-400 uppercase tracking-widest">Schedule</th>
                      <th className="py-4 px-3 text-center text-[9px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                      <th className="py-4 px-3 text-center text-[9px] font-black text-gray-400 uppercase tracking-widest">Avg Accuracy</th>
                      <th className="py-4 pr-6 pl-3 text-right text-[9px] font-black text-gray-400 uppercase tracking-widest">Manage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {EXAMS.map((ex) => (
                      <tr key={ex.id} className="group hover:bg-gray-50/30 transition-all duration-300">
                        <td className="py-4 pl-6 pr-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                              ex.status === 'Ongoing' ? 'bg-amber-50 border-amber-100 text-amber-500' : 'bg-gray-50 border-gray-100 text-gray-400'
                            }`}>
                              {ex.status === 'Ongoing' ? <Zap size={16} className="animate-pulse" /> : <FileText size={16} />}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[13px] font-bold text-[#111111] font-matter">{ex.title}</span>
                              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wide">{ex.course}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-3">
                          <div className="flex flex-col items-center gap-0.5">
                            <span className="text-[11px] font-bold text-[#111111]">{ex.date}</span>
                            <span className="text-[9px] text-gray-400 font-medium uppercase tracking-tighter">{ex.duration}</span>
                          </div>
                        </td>
                        <td className="py-4 px-3">
                          <div className="flex justify-center">
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black border uppercase tracking-widest ${STATUS_THEMES[ex.status as keyof typeof STATUS_THEMES]}`}>
                              {ex.status}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-3">
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-center gap-1">
                              <span className={`text-[11px] font-black ${ex.accuracy > 80 ? 'text-green-600' : ex.accuracy > 65 ? 'text-amber-500' : 'text-orange-500'}`}>
                                {ex.accuracy}%
                              </span>
                              {ex.accuracy > 80 && <ArrowUpRight className="w-2.5 h-2.5 text-green-500" />}
                            </div>
                            <div className="w-10 h-[2px] bg-gray-100 rounded-full overflow-hidden">
                              <div className={`h-full ${ex.accuracy > 80 ? 'bg-green-500' : ex.accuracy > 65 ? 'bg-amber-400' : 'bg-orange-400'}`} style={{ width: `${ex.accuracy}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="py-4 pr-6 pl-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                             <button className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-50 rounded-full transition-all">
                               <BarChart3 className="w-3.5 h-3.5" />
                             </button>
                             <button className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-50 rounded-full transition-all">
                               <MoreVertical className="w-3.5 h-3.5" />
                             </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 bg-gray-50/40 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Quick View</span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 border border-gray-100 bg-white rounded-full text-[9px] font-black uppercase text-gray-400 hover:text-black hover:border-gray-300 transition-all">Standard</button>
                    <button className="px-3 py-1.5 border border-gray-100 bg-white rounded-full text-[9px] font-black uppercase text-gray-400 hover:text-black hover:border-gray-300 transition-all">Proctored</button>
                  </div>
                </div>
                <button className="px-5 py-2.5 bg-[#111111] text-white rounded-full text-xs font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Sync Gradebook
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Column (Parity with Attendance Sidebar) */}
          <div className="xl:col-span-4 space-y-6">
            
            {/* AI Generator Panel */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-6">
              <div className="flex items-start justify-between">
                 <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                 </div>
                 <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md uppercase tracking-wider">AI Creator</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-season font-bold text-[#111111]">Osmium Engine</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">Automated assessment lifecycle.</p>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 group hover:bg-amber-50 transition-colors">
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center border border-amber-100 shadow-sm">
                        <FileText size={14} className="text-amber-500" />
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-amber-900 leading-tight">Physics Draft</p>
                        <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest">Ready to Gen</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-amber-800/70 font-medium leading-tight font-matter">
                      Osmium detect 3 new session logs available for quiz expansion.
                    </p>
                    <button className="mt-3 w-full py-2 bg-white text-amber-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-amber-200">
                      Generate Now
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-matter">Class Pulse</span>
                      <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                    </div>
                    <p className="text-[12px] text-[#111111] font-bold leading-tight">
                      Accuracy increased 12% in Finals.
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-medium">Correlation: Interactive mock exams.</p>
                  </div>
                </div>
              </div>
            </div>


          </div>

        </div>
      </div>
    </div>
  );
}
