"use client";
import { useState } from "react";
import { History, Search, Filter, Calendar, Users, Clock, Download, ExternalLink, Play, CheckCircle, MoreVertical } from "lucide-react";

/**
 * Enterprise Session History
 * Historical archive of all taught classes, trial sessions, and group batches.
 */

const HISTORY = [
  { id: "S-9912", title: "Advanced React Hooks", course: "React.js Mastery", student: "Batch B", date: "12 Mar, 2026", duration: "90m", type: "Recurring", status: "Completed" },
  { id: "S-9908", title: "Phonetics Drill", course: "Spanish A1", student: "Varun Sharma", date: "11 Mar, 2026", duration: "45m", type: "Trial", status: "Completed" },
  { id: "S-9895", title: "Laws of Motion Lab", course: "Physics Core", student: "Rahul Verma", date: "10 Mar, 2026", duration: "60m", type: "Group", status: "No-Show" },
  { id: "S-9882", title: "Integration Basics", course: "Advanced Calculus", student: "Priya Desai", date: "09 Mar, 2026", duration: "120m", type: "Recurring", status: "Completed" },
];

export default function HistoryPage() {
  return (
    <div className="font-matter">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-[28px] font-season font-bold text-[#111827]">Session History</h1>
          <p className="text-gray-500 text-[14px] mt-1">A permanent record of all your teaching activities, trial classes, and payouts.</p>
        </div>
        
        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-black rounded-xl text-[14px] font-bold shadow-sm hover:bg-gray-50 transition-all active:scale-95">
          <Download size={18} />
          <span>Export Log</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        
        {/* Aggregate Lifetime Stats */}
        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Sessions', value: '1,248', icon: History, color: 'text-black' },
            { label: 'Student Count', value: '428', icon: Users, color: 'text-blue-500' },
            { label: 'Total Hours', value: '1,842h', icon: Clock, color: 'text-green-500' },
            { label: 'Completion Rate', value: '98%', icon: CheckCircle, color: 'text-amber-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[24px] border border-gray-200 shadow-sm transition-all hover:scale-[1.02]">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center">
                  <stat.icon size={20} className="text-gray-400" />
                </div>
              </div>
              <p className="text-[11px] font-black uppercase text-gray-400 tracking-widest mb-1.5">{stat.label}</p>
              <span className="text-[22px] font-bold text-[#111827]">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* History Table */}
        <div className="lg:col-span-12">
          <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-8 py-5 border-b border-gray-50 bg-[#F9FAFB]/50 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4 bg-white border border-gray-200 px-4 py-2 rounded-xl w-full max-w-[300px]">
                <Search size={16} className="text-gray-400" />
                <input type="text" placeholder="Filter by batch or student..." className="bg-transparent border-none outline-none text-[13px] text-[#111] placeholder-gray-400 w-full" />
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 p-2 px-4 hover:bg-gray-100 rounded-xl transition-all text-gray-400 hover:text-black">
                  <Calendar size={16} />
                  <span className="text-[12px] font-bold uppercase tracking-widest">Select Month</span>
                </button>
                <button className="flex items-center gap-2 p-2 px-4 hover:bg-gray-100 rounded-xl transition-all text-gray-400 hover:text-black">
                  <Filter size={16} />
                  <span className="text-[12px] font-bold uppercase tracking-widest">Types</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto text-left">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="py-4 pl-8 pr-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">ID</th>
                    <th className="py-4 px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Session Title</th>
                    <th className="py-4 px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Course / Batch</th>
                    <th className="py-4 px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Duration</th>
                    <th className="py-4 px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Date</th>
                    <th className="py-4 px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                    <th className="py-4 pr-8 pl-4 text-center text-[11px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {HISTORY.map((item) => (
                    <tr key={item.id} className="group hover:bg-gray-50/50 transition-all font-matter">
                      <td className="py-5 pl-8 pr-4 font-mono text-[11px] text-gray-300">#{item.id}</td>
                      <td className="py-5 px-4 font-bold text-[14px] text-[#111827]">{item.title}</td>
                      <td className="py-5 px-4">
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-gray-700">{item.student}</span>
                          <span className="text-[11px] text-gray-400 font-medium italic">{item.type} • {item.course}</span>
                        </div>
                      </td>
                      <td className="py-5 px-4 text-center text-[13px] font-bold text-gray-500">{item.duration}</td>
                      <td className="py-5 px-4 text-center text-[13px] font-medium text-gray-400">{item.date}</td>
                      <td className="py-5 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          item.status === 'Completed' ? 'bg-green-50 text-green-600 border-green-100' :
                          'bg-red-50 text-red-600 border-red-100'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-5 pr-8 pl-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button title="View Recording" className="p-2 text-gray-400 hover:text-black hover:bg-white rounded-lg transition-all shadow-sm group-hover:border-gray-200"><Play size={16} /></button>
                          <button title="View Attendance" className="p-2 text-gray-400 hover:text-black hover:bg-white rounded-lg transition-all shadow-sm group-hover:border-gray-200"><Users size={16} /></button>
                          <button className="p-2 text-gray-400 hover:text-black hover:bg-white rounded-lg transition-all shadow-sm group-hover:border-gray-200"><ExternalLink size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-8 bg-[#F9FAFB] border-t border-gray-50 text-center">
              <button className="text-[12px] font-black uppercase tracking-widest text-[#111] hover:underline">Load older sessions</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
