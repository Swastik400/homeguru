"use client";
import React from 'react';
import { Search, ChevronDown, MoreHorizontal, Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface Student {
  id: number | string;
  name: string;
  avatar: string;
  uid: string;
  class: string;
  contact: {
    phone: string;
    email: string;
  };
  lastActive: {
    time: string;
    date: string;
  };
  submissions: string;
  target?: string;
  learningStyle?: string[];
  location?: string;
}

interface StudentTableProps {
  students: Student[];
}

export default function StudentTable({ students }: StudentTableProps) {
  const router = useRouter();

  const handleRowClick = (student: Student) => {
    const params = new URLSearchParams();
    params.set('name', student.name);
    params.set('email', student.contact.email);
    params.set('phone', student.contact.phone);
    params.set('class', student.class);
    params.set('joined', student.lastActive.date); // Rough mock
    if (student.target) params.set('target', student.target);
    if (student.location) params.set('location', student.location);
    if (student.learningStyle) params.set('style', student.learningStyle.join(','));

    router.push(`/dashboard/teacher/students/${student.id}?${params.toString()}`);
  };

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[16px] overflow-hidden shadow-[0_2px_8px_-4px_rgba(0,0,0,0.02)] font-matter">
      {/* Table Header Controls */}
      <div className="p-6 border-b border-[#F3F4F6]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-[#111] text-[18px] font-bold">Students Onboard <span className="text-gray-400 font-normal">({students.length})</span></h2>
            <p className="text-[#6B7280] text-[13px] mt-0.5">Check your projects submissions of your students</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Filter by name" 
                className="pl-10 pr-4 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[14px] w-[240px] focus:outline-none focus:ring-1 focus:ring-gray-200"
              />
            </div>
            {/* Dropdown */}
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-gray-700 hover:bg-gray-50">
              All Class <ChevronDown size={14} />
            </button>
            {/* Sort */}
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-gray-700 hover:bg-gray-50">
              Sort <Filter size={14} className="rotate-0" />
            </button>
          </div>
        </div>

        {/* Table Head */}
        <div className="grid grid-cols-[50px_2.2fr_1.2fr_1.2fr_1.8fr_1.5fr_1.2fr_50px] gap-4 px-2 py-2">
          {["NO", "FULL NAME", "UID", "CLASS", "CONTACT", "LAST ACTIVE", "SUBMISSIONS", "ACTION"].map((head) => (
            <span key={head} className="text-[#8E8E8E] text-[11px] font-bold tracking-wider uppercase">
              {head}
            </span>
          ))}
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-[#F3F4F6]">
        {students.length === 0 ? (
          <div className="py-12 text-center text-gray-500 text-sm">No students found.</div>
        ) : (
          students.map((student, index) => (
            <div 
              key={student.id} 
              onClick={() => handleRowClick(student)}
              className="grid grid-cols-[50px_2.2fr_1.2fr_1.2fr_1.8fr_1.5fr_1.2fr_50px] gap-4 items-center px-8 py-4 hover:bg-[#F9FAFB] transition-colors group cursor-pointer"
            >
              <span className="text-[#6B7280] text-[14px]">{index + 1}</span>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 shadow-sm shrink-0">
                  <img src={student.avatar} alt={student.name} className="w-full h-full object-cover bg-gray-100" />
                </div>
                <span className="text-[#111] text-[14px] font-semibold">{student.name}</span>
              </div>
              <span className="text-[#6B7280] text-[14px]">{student.uid}</span>
              <span className="text-[#6B7280] text-[14px]">{student.class}</span>
              <div className="flex flex-col">
                <span className="text-[#111] text-[14px] font-semibold leading-tight truncate">{student.contact.phone}</span>
                <span className="text-[#6B7280] text-[12px] truncate">{student.contact.email}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#111] text-[14px] font-semibold leading-tight">{student.lastActive.time}</span>
                <span className="text-[#6B7280] text-[11px] uppercase">{student.lastActive.date}</span>
              </div>
              <span className="text-[#D97706] text-[13px] font-medium px-2 py-1 bg-[#FFFBEB] rounded-md inline-block w-max">
                {student.submissions}
              </span>
              <button 
                onClick={(e) => e.stopPropagation()}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <MoreHorizontal size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
