"use client";
import React from 'react';
import { MoreHorizontal, Play, Clock, User } from 'lucide-react';

const SESSIONS = [
  {
    id: "SESS-8821",
    title: "English Speaking - Intermediate",
    student: "Varun Sharma",
    tagText: "Live Now",
    tagColor: "bg-[#FDF2F2] text-[#D46B6B]",
    status: "live",
    time: "2:00 PM – 3:00 PM"
  },
  {
    id: "SESS-8842",
    title: "Advanced Calculus Basics",
    student: "Priya Desai",
    tagText: "Starts in 15m",
    tagColor: "bg-[#FDF9EE] text-[#A68A48]",
    status: "upcoming",
    time: "10:00 AM – 11:30 AM"
  },
  {
    id: "SESS-8859",
    title: "Web Development - React.js",
    student: "Aditya Singh",
    tagText: "16 Mar, 2026",
    tagColor: "bg-[#F0F4F8] text-[#4F627A]",
    status: "scheduled",
    time: "3:00 PM – 5:00 PM"
  }
];

export default function ClassroomList() {
  return (
    <div className="w-full bg-white rounded-[20px] border border-gray-200 p-6 font-matter shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 flex items-center justify-center text-gray-800">
             <Play size={18} fill="currentColor" />
          </div>
          <h2 className="text-[#111827] text-[18px] tracking-wide font-season">
            Today's Classroom Schedule
          </h2>
        </div>
        <button className="text-gray-500 text-[13px] font-medium hover:text-[#111827] transition-colors">
          View full calendar
        </button>
      </div>

      {/* Classroom List */}
      <div className="flex flex-col">
        {SESSIONS.map((session, index) => (
          <React.Fragment key={session.id}>
            
            {/* List Item */}
            <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4 md:gap-0">
              <div className="flex items-start md:items-center gap-4">
                
                {/* Icon Box */}
                <div className={`w-[48px] h-[48px] rounded-full flex items-center justify-center shrink-0 ${session.status === 'live' ? 'bg-[#FDF2F2]' : 'bg-[#F2F4F8]'}`}>
                  <Play size={20} className={session.status === 'live' ? 'text-[#D46B6B]' : 'text-[#2E3C58]'} fill="currentColor" />
                </div>

                {/* Text & Tags */}
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    <h3 className="text-[#111827] text-[14px] md:text-[14px] font-medium leading-tight">
                      {session.title}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-[4px] text-[10px] md:text-[11px] tracking-wide font-bold uppercase whitespace-nowrap ${session.tagColor}`}>
                      {session.tagText}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 text-[#8B92A5] text-[12px] md:text-[13px] mt-0.5">
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                       <User size={14} />
                       {session.student}
                    </div>
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                       <Clock size={14} />
                       {session.time}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                <button className={`flex-1 md:flex-none px-6 py-2 rounded-[10px] text-[13px] font-bold shadow-sm transition-all whitespace-nowrap ${
                  session.status === 'live' 
                    ? 'bg-[#111827] text-white hover:bg-black' 
                    : 'bg-white border border-gray-200 text-[#111827] hover:bg-gray-50'
                }`}>
                  {session.status === 'live' ? 'Join Now' : 'Prepare'}
                </button>
                <button className="text-gray-300 hover:text-gray-600 transition-colors p-2">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>

            {/* Dashed Separator */}
            {index < SESSIONS.length - 1 && (
              <div className="w-full border-t border-dashed border-gray-200 my-1"></div>
            )}
            
          </React.Fragment>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 bg-[#F8FAFC] rounded-[12px] px-4 py-3 flex items-center justify-between">
        <div className="text-[#8B92A5] text-[12px] font-medium">
          Showing <span className="text-[#111827]">3 sessions</span> for today
        </div>
        <button className="text-[#111827] text-[12px] font-bold flex items-center gap-1 hover:translate-x-1 transition-transform">
          Next Page
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

    </div>
  );
}
