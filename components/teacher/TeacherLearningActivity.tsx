"use client";
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Teacher Activity (Aligned with Student Learning Activity)
 * Exactly matches the student dashboard structure and styling.
 */

const TeacherLearningActivity = () => {
  const [selectedMonth, setSelectedMonth] = useState('This month');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const months = ['This month', 'Last month', 'January', 'February', 'March', 'April', 'May', 'June'];

  const monthData: Record<string, { day: number; status: string }[]> = {
    'This month': [
      { day: 1, status: 'default' }, { day: 2, status: 'session' }, { day: 3, status: 'session' },
      { day: 4, status: 'exam' }, { day: 5, status: 'session' }, { day: 6, status: 'default' },
      { day: 7, status: 'default' }, { day: 8, status: 'session' }, { day: 9, status: 'session' },
      { day: 10, status: 'online' }, { day: 11, status: 'session' }, { day: 12, status: 'session' },
      { day: 13, status: 'default' }, { day: 14, status: 'default' }, { day: 15, status: 'session' },
      { day: 16, status: 'exam' }, { day: 17, status: 'session' }, { day: 18, status: 'session' },
      { day: 19, status: 'online' }, { day: 20, status: 'default' }, { day: 21, status: 'default' },
      { day: 22, status: 'session' }, { day: 23, status: 'session' }, { day: 24, status: 'session' },
      { day: 25, status: 'default' }, { day: 26, status: 'exam' }, { day: 27, status: 'default' },
      { day: 28, status: 'session' }, { day: 29, status: 'online' }, { day: 30, status: 'session' },
      { day: 31, status: 'default' }
    ]
  };

  const calendarData = monthData[selectedMonth] || monthData['This month'];

  const calculateStats = () => {
    const teachingDays = calendarData.filter(d => d.status === 'session').length;
    const examsSet = calendarData.filter(d => d.status === 'exam').length;
    const onlineClasses = calendarData.filter(d => d.status === 'online').length;
    return { teachingDays, examsSet, onlineClasses };
  };

  const stats = calculateStats();

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'session':
        return 'bg-[#F1F5F9] text-[#0F172A] border-[#E2E8F0]';
      case 'exam':
        return 'bg-[#FFF7ED] text-[#9A3412] border-[#FFEDD5]';
      case 'online':
        return 'bg-[#F0FDF4] text-[#166534] border-[#DCFCE7]';
      default:
        return 'bg-[#F8FAFC] text-[#94A3B8] border-transparent opacity-40';
    }
  };

  return (
    <div
      className="bg-white rounded-[24px] border border-[#E2E8F0] overflow-hidden w-full shadow-sm"
      style={{ minHeight: '360px', fontFamily: 'Matter, sans-serif' }}
    >
      {/* Header Section */}
      <div className="px-6 py-6 pb-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[#0F172A] font-season font-bold text-[18px] tracking-tight">Teaching Activity</h2>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-[13px] font-bold text-[#475569] hover:bg-[#F8FAFC] transition-all shadow-sm"
            >
              {selectedMonth}
              <ChevronDown size={14} strokeWidth={2.5} className="text-[#94A3B8]" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl z-50 overflow-hidden">
                {months.map((month) => (
                  <button
                    key={month}
                    onClick={() => {
                      setSelectedMonth(month);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-[13.5px] hover:bg-[#F8FAFC] transition-colors border-b last:border-0 border-[#F1F5F9] ${selectedMonth === month ? 'bg-[#F8FAFC] text-[#0F172A] font-bold' : 'text-[#64748B] font-medium'
                      }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="text-[#64748B] text-[14px] mb-6 font-medium">
          You taught for <span className="font-bold text-[#0F172A] tracking-tight">{stats.teachingDays} days</span> this month <span className="text-black/60">🔥</span>
        </p>

        <div className="flex flex-wrap gap-[6px] mb-6 max-w-[280px]">
          {calendarData.map((item) => (
            <div
              key={item.day}
              className={`flex items-center justify-center rounded-lg text-[10.5px] font-black border transition-all hover:scale-105 cursor-pointer ${getStatusStyles(item.status)}`}
              style={{ width: '28px', height: '28px' }}
            >
              {item.day}
            </div>
          ))}
        </div>
      </div>

      {/* Legend Section */}
      <div className="px-6 py-5 border-t border-[#F1F5F9] bg-[#FBFBFC]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-md bg-[#F1F5F9] border border-[#E2E8F0]"></div>
            <span className="text-[#64748B] text-[12.5px] font-bold uppercase tracking-wider">Sessions</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-3">
              <div className="w-3.5 h-3.5 rounded-md bg-[#FFF7ED] border border-[#FFEDD5]"></div>
              <span className="text-[#64748B] text-[12.5px] font-medium"><span className="font-bold text-[#0F172A]">{stats.examsSet}</span> Exams Set</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3.5 h-3.5 rounded-md bg-[#F0FDF4] border border-[#DCFCE7]"></div>
              <span className="text-[#64748B] text-[12.5px] font-medium"><span className="font-bold text-[#0F172A]">{stats.onlineClasses}</span> Online Classes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherLearningActivity;
