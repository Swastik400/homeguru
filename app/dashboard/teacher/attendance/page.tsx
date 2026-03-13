"use client";
import React, { useState } from "react";
import { 
  CheckCircle, 
  XCircle, 
  Download, 
  Calendar, 
  BarChart3, 
  TrendingUp, 
  AlertCircle, 
  Mail, 
  MoreVertical, 
  Users, 
  Clock, 
  ArrowUpRight,
  ChevronRight,
  Search,
  Filter,
  Plus,
  Maximize2,
  FileText
} from "lucide-react";

/**
 * Premium Vajra Attendance & Engagement System
 * A high-fashion, data-dense interface following Notion/Stripe patterns.
 */

// Enriched Data Model
const STUDENT_SESSIONS = [
  { 
    id: 1, 
    name: "Arjun Mehta", 
    avatar: "https://i.pravatar.cc/150?img=33", 
    course: "Calculus", 
    date: "12 Mar 2026",
    joinTime: "10:01 AM",
    leaveTime: "10:58 AM",
    duration: "57 min",
    status: "Present",
    engagement: 82,
    participation: "High",
    cameraOn: true,
    msgs: 12
  },
  { 
    id: 2, 
    name: "Priya Patel", 
    avatar: "https://i.pravatar.cc/150?img=44", 
    course: "Calculus", 
    date: "12 Mar 2026",
    joinTime: "10:25 AM",
    leaveTime: "11:00 AM",
    duration: "35 min",
    status: "Late",
    engagement: 52,
    participation: "Medium",
    cameraOn: false,
    msgs: 4
  },
  { 
    id: 3, 
    name: "Rahul Sharma", 
    avatar: "https://i.pravatar.cc/150?img=11", 
    course: "Calculus", 
    date: "12 Mar 2026",
    joinTime: "-",
    leaveTime: "-",
    duration: "0 min",
    status: "Absent",
    engagement: 0,
    participation: "None",
    cameraOn: false,
    msgs: 0
  },
  { 
    id: 4, 
    name: "Amit Singh", 
    avatar: "https://i.pravatar.cc/150?img=15", 
    course: "Calculus", 
    date: "12 Mar 2026",
    joinTime: "10:00 AM",
    leaveTime: "10:59 AM",
    duration: "59 min",
    status: "Present",
    engagement: 94,
    participation: "High",
    cameraOn: true,
    msgs: 28
  },
];

const STAT_CARDS = [
  { label: "Total Students", value: "48", icon: Users, color: "text-blue-500" },
  { label: "Attendance Rate", value: "86%", icon: TrendingUp, color: "text-green-500" },
  { label: "Classes (Week)", value: "12", icon: Calendar, color: "text-purple-500" },
  { label: "Absent Today", value: "5", icon: XCircle, color: "text-red-500" },
  { label: "Late Joiners", value: "3", icon: Clock, color: "text-amber-500" },
];

const STATUS_THEMES = {
  "Present": "bg-[#E6F6EB] text-[#027A48] border-[#A6F4C5]",
  "Absent": "bg-[#FFF1F3] text-[#B42318] border-[#FDA29B]",
  "Late": "bg-[#FFFAEB] text-[#B54708] border-[#FEDF89]",
  "Excused": "bg-[#F9FAFB] text-[#344054] border-[#EAECF0]"
};

export default function AttendancePage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="relative min-h-[calc(100vh-77px)] -m-6 p-6 overflow-x-hidden bg-[#F8F9FA] font-matter">
      {/* Background radial glow */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-50/30 blur-[100px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full bg-purple-50/20 blur-[100px]" />
      </div>

      <div className="max-w-[1600px] mx-auto space-y-10">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-season font-bold text-[#111111] tracking-tight">Presence & Engagement</h1>
            <p className="text-gray-400 text-[12px] mt-0.5">Real-time session tracking, automated reporting, and AI student risk analysis.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100/80 text-[#344054] rounded-full text-xs font-bold shadow-sm hover:bg-gray-50 transition-all">
              <Download className="w-4 h-4" />
              <span>Export Reports</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full text-xs font-bold shadow-lg hover:bg-black/90 transition-all">
              <Plus className="w-4 h-4" />
              <span>Manual Entry</span>
            </button>
          </div>
        </div>

        {/* 1. Attendance Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {STAT_CARDS.map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] group hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all">
              <div className="p-1.5 w-fit rounded-lg bg-gray-50 group-hover:bg-white transition-colors mb-3 border border-gray-50/50">
                <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
              </div>
              <h4 className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-0.5">{stat.label}</h4>
              <p className="text-xl font-season font-bold text-[#111111]">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* 2. Filters & View Toggles */}
        <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-black rounded-full text-xs font-bold border border-gray-100">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter By</span>
            </button>
            <div className="h-4 w-[1px] bg-gray-100 mx-2 hidden md:block" />
            <select className="bg-transparent border-none text-xs font-bold text-gray-500 focus:ring-0 cursor-pointer">
              <option>All Courses</option>
              <option>Calculus</option>
              <option>Physics 101</option>
            </select>
            <select className="bg-transparent border-none text-xs font-bold text-gray-500 focus:ring-0 cursor-pointer">
              <option>Last 7 Days</option>
              <option>This Month</option>
              <option>Custom Range</option>
            </select>
            <select className="bg-transparent border-none text-xs font-bold text-gray-500 focus:ring-0 cursor-pointer">
              <option>Any Status</option>
              <option>Absent</option>
              <option>Late</option>
            </select>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
            <input 
              type="text" 
              placeholder="Search student identity..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-xs focus:ring-1 focus:ring-black/5"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* Main Table Column */}
          <div className="xl:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#111111]/5 flex items-center justify-center">
                    <Calendar className="w-3.5 h-3.5 text-[#111111]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-season font-bold text-[#111111]">Session: Calculus - Differentiation</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">12 Mar 2026 • 10:00 AM — 11:00 AM</p>
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
                      <th className="py-5 pl-8 pr-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                      <th className="py-5 px-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Timeline</th>
                      <th className="py-5 px-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                      <th className="py-5 px-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Engagement</th>
                      <th className="py-5 pr-8 pl-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {STUDENT_SESSIONS.map((s) => (
                      <tr key={s.id} className="group hover:bg-gray-50/30 transition-all duration-300">
                        <td className="py-4 pl-6 pr-3">
                          <div className="flex items-center gap-3">
                            <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm" />
                            <div className="flex flex-col">
                              <span className="text-[13px] font-bold text-[#111111] font-matter">{s.name}</span>
                              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wide">{s.course}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-3">
                          <div className="flex flex-col items-center gap-0.5">
                            <span className="text-[11px] font-bold text-[#111111]">{s.joinTime} — {s.leaveTime}</span>
                            <span className="text-[9px] text-gray-400 font-medium">Duration: {s.duration}</span>
                          </div>
                        </td>
                        <td className="py-4 px-3">
                          <div className="flex justify-center">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${STATUS_THEMES[s.status as keyof typeof STATUS_THEMES]}`}>
                              {s.status}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-3">
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-center gap-1">
                              <span className={`text-[11px] font-black ${s.engagement > 80 ? 'text-green-600' : s.engagement > 40 ? 'text-orange-500' : 'text-gray-400'}`}>
                                {s.engagement > 0 ? `${s.engagement}%` : "0%"}
                              </span>
                              {s.engagement > 80 && <ArrowUpRight className="w-2.5 h-2.5 text-green-500" />}
                            </div>
                            <div className="w-10 h-[2px] bg-gray-100 rounded-full overflow-hidden">
                              <div className={`h-full ${s.engagement > 80 ? 'bg-green-500' : s.engagement > 40 ? 'bg-orange-400' : 'bg-red-400'}`} style={{ width: `${s.engagement}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="py-4 pr-6 pl-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                             <button className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-50 rounded-full transition-all">
                               <Mail className="w-3.5 h-3.5" />
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
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Bulk Actions</span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 border border-gray-100 bg-white rounded-full text-[9px] font-black uppercase text-gray-400 hover:text-black hover:border-gray-300 transition-all">Mark Present</button>
                    <button className="px-3 py-1.5 border border-gray-100 bg-white rounded-full text-[9px] font-black uppercase text-gray-400 hover:text-black hover:border-gray-300 transition-all">Mark Absent</button>
                  </div>
                </div>
                <button className="px-5 py-2.5 bg-[#111111] text-white rounded-full text-xs font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Sync Gradebook
                </button>
              </div>
            </div>

            {/* 8. Attendance Heatmap Preview */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-season font-bold text-[#111111]">Attendance Momentum</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">Engagement intensity across the academic quarter.</p>
                </div>
                <div className="flex items-center gap-1.5 text-green-600 text-[10px] font-bold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+4% this month</span>
                </div>
              </div>
              
              <div className="flex gap-4">
                {/* Day Labels */}
                <div className="flex flex-col justify-between text-[9px] font-black text-gray-300 uppercase py-1">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {Array.from({ length: 90 }).map((_, i) => {
                      const intensity = (i * 31 % 100) / 100;
                      const color = intensity > 0.8 ? 'bg-black' : intensity > 0.5 ? 'bg-gray-400' : intensity > 0.2 ? 'bg-gray-200' : 'bg-gray-50';
                      return (
                        <div 
                          key={i} 
                          className={`w-3.5 h-3.5 rounded-[3px] ${color} cursor-help transition-all hover:scale-125`}
                          title={`Engagement Level: ${Math.round(intensity * 100)}%`}
                        />
                      );
                    })}
                  </div>
                  
                  {/* Month Markers */}
                  <div className="flex items-center justify-between text-[9px] font-black text-gray-300 uppercase tracking-widest pt-1">
                    <span>Jan 2026</span>
                    <span>Feb 2026</span>
                    <span>Mar 2026</span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-8 pt-6 border-t border-gray-50 flex items-center gap-3">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Scale:</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-gray-50" />
                    <span className="text-[9px] font-medium text-gray-400">Low</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-black" />
                    <span className="text-[9px] font-medium text-gray-400">High</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column: Analytics & AI */}
          <div className="xl:col-span-4 space-y-8">
            
            {/* 11. AI Assistance Panel */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-6">
              <div className="flex items-start justify-between">
                 <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-white" />
                 </div>
                 <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md uppercase tracking-wider">AI Insight</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-season font-bold text-[#111111]">Risk Prediction</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">Predictive disengagement trends.</p>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-red-50/50 border border-red-100 group hover:bg-red-50 transition-colors">
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <img src="https://i.pravatar.cc/150?img=15" alt="Rahul" className="w-7 h-7 rounded-full border border-white shadow-sm" />
                      <div>
                        <p className="text-[12px] font-bold text-red-900 leading-tight">Rahul Sharma</p>
                        <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">48% Presence</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-red-800/70 font-medium leading-tight font-matter">
                      Missed 3 consecutive sessions. Drill-down recommended.
                    </p>
                    <button className="mt-3 w-full py-2 bg-white text-red-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-red-200">
                      Send Reminder
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-matter">Class Pulse</span>
                      <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                    </div>
                    <p className="text-[12px] text-[#111111] font-bold leading-tight">
                      Engagement -12% weekly.
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-medium">Exam prep correlation high.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 10. Reports Center */}
            <div className="bg-[#111111] rounded-2xl p-6 text-white relative overflow-hidden group">
               <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/5 rounded-full blur-[80px] group-hover:scale-110 transition-transform duration-1000" />
               <h3 className="text-lg font-season font-bold mb-5">Reports Center</h3>
               <div className="space-y-2.5 relative z-10">
                 {[
                   { name: "Monthly Presence", date: "PDF", icon: FileText },
                   { name: "Engagement Audit", date: "CSV", icon: Mail },
                   { name: "Compliance File", date: "Request", icon: CheckCircle },
                 ].map((report, i) => (
                   <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer border border-white/5">
                     <div className="flex items-center gap-2.5">
                       <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                         <report.icon className="w-3 h-3" />
                       </div>
                       <div>
                         <p className="text-[12px] font-bold">{report.name}</p>
                         <p className="text-[9px] text-white/30 font-medium">{report.date}</p>
                       </div>
                     </div>
                     <ChevronRight className="w-3.5 h-3.5 text-white/20" />
                   </div>
                 ))}
               </div>
               <button className="mt-6 w-full py-3.5 bg-white text-[#111111] rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all active:scale-95">
                 Visit Archives
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
