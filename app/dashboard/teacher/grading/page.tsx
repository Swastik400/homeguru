"use client";
import React, { useState } from "react";
import { Search, Filter, CheckCircle, RotateCcw, ChevronRight, User, FileText, Clock, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import "@/components/teacher/CourseBuilder.css";

const SUBMISSIONS = [
  {
    id: 1,
    title: "Spanish Essay",
    student: "Varun Sharma",
    avatar: "https://i.pravatar.cc/150?img=33",
    submitted: "2 hours ago",
    course: "Intro to Spanish",
    status: "pending",
  },
  {
    id: 2,
    title: "Calculus Set #4",
    student: "Priya Desai",
    avatar: "https://i.pravatar.cc/150?img=25",
    submitted: "Yesterday",
    course: "Advanced Calculus",
    status: "pending",
  },
  {
    id: 3,
    title: "Physics Lab Report",
    student: "Meera Nair",
    avatar: "https://i.pravatar.cc/150?img=5",
    submitted: "3 hours ago",
    course: "Quantum Physics",
    status: "urgent",
  },
  {
    id: 4,
    title: "History Midterm",
    student: "Rohan Singh",
    avatar: "https://i.pravatar.cc/150?img=11",
    submitted: "2 days ago",
    course: "World History",
    status: "graded",
  },
  {
    id: 5,
    title: "Chemistry Assignment",
    student: "Ananya Ray",
    avatar: "https://i.pravatar.cc/150?img=32",
    submitted: "1 week ago",
    course: "Organic Chemistry",
    status: "graded",
  },
];

const FUNNELS = [
  { id: "all", label: "All Items", count: 5 },
  { id: "pending", label: "To Review", count: 3 },
  { id: "graded", label: "Graded", count: 2 },
];

export default function GradingPortal() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = SUBMISSIONS.filter(sub => {
    const matchesTab = activeTab === "all" || sub.status === activeTab || (activeTab === "pending" && sub.status === "urgent");
    const matchesSearch = sub.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sub.student.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="billing-page">
      {/* Header & Back Action */}
      <div className="mb-6 flex items-center justify-between">
         <button onClick={() => router.push('/dashboard/teacher')} className="flex items-center gap-2 text-[13px] font-bold text-gray-500 hover:text-[#111] transition-colors font-matter">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
         </button>
      </div>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-[#111] font-matter tracking-tight leading-tight">Grading Queue</h1>
          <p className="text-[14px] text-gray-500 mt-1 font-matter">Review and assess active student submissions in your queue.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        
        {/* Controls Bar */}
        <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#fcfcfc]">
          
          <div className="flex gap-1 overflow-x-auto hide-scrollbar">
            <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
            {FUNNELS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all ${
                  activeTab === tab.id ? "bg-white text-[#111] shadow-sm border border-gray-200" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-transparent"
                }`}
              >
                {tab.label}
                <span className={`text-[11px] px-1.5 py-0.5 rounded-md ${activeTab === tab.id ? 'bg-gray-100 text-gray-600' : 'bg-gray-200 text-gray-500'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search submissions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-matter focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 w-[240px] transition-all"
              />
            </div>
            <button className="p-2 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-[#111] transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Master List */}
        <div className="w-full">
          {/* Header Row */}
          <div className="grid grid-cols-[minmax(250px,2fr)_1.5fr_1fr_auto] gap-4 px-6 py-3 border-b border-gray-100 bg-[#f9fafb]">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest font-matter">Submission</div>
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest font-matter">Course</div>
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest font-matter">Status</div>
            <div className="w-24"></div>
          </div>

          {/* List Body */}
          <div className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <div className="py-16 text-center">
                <FileText className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                <p className="text-[14px] text-gray-500 font-matter">No submissions found matching your filters.</p>
              </div>
            ) : (
              filtered.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => router.push(`/dashboard/teacher/grading/${item.id}`)}
                  className="grid grid-cols-[minmax(250px,2fr)_1.5fr_1fr_auto] gap-4 px-6 py-4 items-center bg-white hover:bg-gray-50/50 transition-colors cursor-pointer group"
                >
                  {/* Name & Title */}
                  <div className="flex items-center gap-3 relative">
                    {item.status === 'urgent' && <div className="absolute -left-6 top-1 bottom-1 w-1 bg-red-500"></div>}
                    <img src={item.avatar} alt={item.student} className="w-10 h-10 rounded-full border border-gray-100" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[14px] font-bold text-[#111] font-matter truncate">{item.title}</p>
                        {item.status === 'urgent' && <span className="text-[9px] font-black text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100 uppercase tracking-tighter">Urgent</span>}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[12px] text-gray-500 font-matter">
                         <span className="flex items-center gap-1 font-bold"><User size={10} /> {item.student}</span>
                         <span className="text-gray-300">|</span>
                         <span>{item.submitted}</span>
                      </div>
                    </div>
                  </div>

                  {/* Course */}
                  <div>
                    <p className="text-[13px] font-medium text-[#374151] font-matter">{item.course}</p>
                  </div>

                  {/* Status Pill */}
                  <div>
                    {item.status === 'graded' ? (
                       <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-900">
                         <CheckCircle className="w-3.5 h-3.5" />
                         <span className="text-[11px] font-bold uppercase tracking-wide font-matter leading-none pt-px">Graded</span>
                       </span>
                    ) : (
                       <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black text-white">
                         <Clock className="w-3.5 h-3.5" />
                         <span className="text-[11px] font-bold uppercase tracking-wide font-matter leading-none pt-px">Awaiting Review</span>
                       </span>
                    )}
                  </div>

                  {/* Action/Chevron */}
                  <div className="flex justify-end relative">
                     <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all absolute right-0 top-1/2 -translate-y-1/2 bg-gray-50/50 pl-4 py-1">
                        {item.status !== 'graded' && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); router.push(`/dashboard/teacher/grading/${item.id}`); }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#111] text-white rounded-lg text-[11px] font-bold hover:bg-black transition-all shadow-sm whitespace-nowrap"
                          >
                            <CheckCircle size={12} /> Grade
                          </button>
                        )}
                        <ChevronRight className="w-5 h-5 text-gray-300" />
                     </div>
                     <ChevronRight className="w-5 h-5 text-gray-300 opacity-100 group-hover:opacity-0 transition-opacity" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
