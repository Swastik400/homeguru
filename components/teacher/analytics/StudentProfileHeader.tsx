"use client";
import React from 'react';
import { Mail, Calendar, MessageSquare, Download, MoreVertical, GraduationCap, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function StudentProfileHeader({ 
  studentName, 
  subject, 
  studentId 
}: { 
  studentName: string; 
  subject: string;
  studentId: string;
}) {
  const pathname = usePathname();

  const tabs = [
    { name: 'Academic Overview', path: `/dashboard/teacher/students/${studentId}` },
    { name: 'Performance Analytics', path: `/dashboard/teacher/students/${studentId}/performance` },
    { name: 'Attendance Record', path: `/dashboard/teacher/students/${studentId}/attendance` },
    { name: 'Assignments & Tasks', path: `/dashboard/teacher/students/${studentId}/assignments` },
    { name: 'Resource Vault', path: `/dashboard/teacher/students/${studentId}/vault` }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
      {/* Top Header Background (Clean & Professional) */}
      <div className="h-16 bg-[#F8FAFC] border-b border-gray-100" />

      {/* Profile Section */}
      <div className="px-8 pb-1 pt-0">
        <div className="flex flex-col md:flex-row md:items-start gap-8 -mt-8 mb-6">
          {/* Avatar Container */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-4 border-white overflow-hidden shadow-md bg-white">
              <img 
                src="https://i.pravatar.cc/150?img=33" 
                alt={studentName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm" title="Active Status">
              <ShieldCheck size={14} className="text-white" />
            </div>
          </div>

          {/* Identity & Metadata */}
          <div className="flex-1 pt-8 md:pt-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">{studentName}</h1>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded border border-blue-100">
                    Premium Student
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm font-medium text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <GraduationCap size={16} className="text-gray-400" />
                    <span>{subject}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-gray-300 hidden md:block" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-400">ID:</span>
                    <span className="text-gray-700">HG-2026-048</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-gray-300 hidden md:block" />
                  <div className="flex items-center gap-1.5">
                    <Calendar size={16} className="text-gray-400" />
                    <span>Enrolled Jan 2026</span>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg text-sm font-bold transition-all shadow-sm active:scale-95">
                  <MessageSquare size={16} />
                  Message
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-bold transition-all shadow-sm active:scale-95">
                  <Download size={16} />
                  Report
                </button>
                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-400 transition-all">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Tabs */}
        <div className="flex items-center gap-8 border-t border-gray-100 -mx-8 px-8">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path;
            return (
              <Link
                key={tab.path}
                href={tab.path}
                className={`py-4 text-[13px] font-bold relative transition-colors whitespace-nowrap ${isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {tab.name}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
