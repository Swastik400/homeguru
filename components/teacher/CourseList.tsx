"use client";
import React from 'react';
import { MoreHorizontal, FileText, ChevronRight, Layers, Users } from 'lucide-react';

const COURSES = [
  {
    id: "CRS-101",
    name: "Advanced React.js Patterns",
    modules: 12,
    students: 156,
    version: "2.1.0",
    status: "Active",
    tagColor: "bg-[#F0FDF4] text-[#166534]",
  },
  {
    id: "CRS-204",
    name: "Full Stack Mastery with Next.js",
    modules: 24,
    students: 423,
    version: "1.0.4",
    status: "Active",
    tagColor: "bg-[#F0FDF4] text-[#166534]",
  },
  {
    id: "CRS-309",
    name: "System Design for Enterprise",
    modules: 8,
    students: 92,
    version: "3.2.1",
    status: "Draft",
    tagColor: "bg-[#FDF9EE] text-[#A68A48]",
  }
];

export default function CourseList() {
  return (
    <div className="w-full bg-white rounded-[20px] border border-gray-200 p-6 font-matter shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 flex items-center justify-center text-gray-800">
             <FileText size={18} />
          </div>
          <h2 className="text-[#111827] text-[18px] tracking-wide font-season">
            Curriculum Overview
          </h2>
        </div>
        <button className="text-gray-500 text-[13px] font-medium hover:text-[#111827] transition-colors">
          Manage all courses
        </button>
      </div>

      {/* Course List */}
      <div className="flex flex-col">
        {COURSES.map((course, index) => (
          <React.Fragment key={course.id}>
            
            {/* List Item */}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                
                {/* Icon Box */}
                <div className="w-[48px] h-[48px] rounded-full bg-[#F2F4F8] flex items-center justify-center shrink-0">
                  <FileText size={20} className="text-[#2E3C58]" />
                </div>

                {/* Text & Tags */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <h3 className="text-[#111827] text-[14px] font-medium">
                      {course.name}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-[4px] text-[10px] tracking-widest font-black uppercase ${course.tagColor}`}>
                      {course.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[#8B92A5] text-[12px] mt-0.5">
                    <div className="flex items-center gap-1.5">
                       <Layers size={14} />
                       {course.modules} Modules
                    </div>
                    <div className="flex items-center gap-1.5">
                       <Users size={14} />
                       {course.students} Students
                    </div>
                    <div className="flex items-center gap-1.5 font-mono italic text-[11px] text-gray-400">
                       v{course.version}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-3">
                <button className="px-6 py-2 bg-white border border-gray-200 rounded-[10px] text-[#111827] text-[13px] font-bold shadow-sm hover:bg-gray-50 transition-colors">
                  Manage
                </button>
                <div className="w-10 h-10 flex items-center justify-center rounded-[10px] bg-gray-50 text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors">
                    <ChevronRight size={18} />
                </div>
              </div>
            </div>

            {/* Dashed Separator */}
            {index < COURSES.length - 1 && (
              <div className="w-full border-t border-dashed border-gray-200 my-1"></div>
            )}
            
          </React.Fragment>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 bg-[#F8FAFC] rounded-[12px] px-4 py-3 flex items-center justify-between">
        <div className="text-[#8B92A5] text-[12px] font-medium">
          Showing <span className="text-[#111827]">3</span> of <span className="text-[#111827]">14</span>
        </div>
        <div className="flex items-center gap-4">
           <button className="text-gray-400 text-[12px] font-bold">Previous</button>
           <button className="text-[#111827] text-[12px] font-bold flex items-center gap-1 hover:translate-x-0.5 transition-transform">
              Next
              <ChevronRight size={14} strokeWidth={3} />
           </button>
        </div>
      </div>

    </div>
  );
}
