"use client";
import React, { useState, useMemo, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

const TeacherLearningActivity = () => {
  const [selectedMonth, setSelectedMonth] = useState('This month');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const months = ['This month', 'Last month', 'January', 'February', 'March', 'April', 'May', 'June'];

  const monthData = useMemo(() => {
    const data: Record<string, any[]> = {
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

    const generateRandomMonth = (days: number) => {
      const statuses = ['default', 'session', 'exam', 'online'];
      return Array.from({ length: days }, (_, i) => ({
        day: i + 1,
        status: Math.random() > 0.4 ? statuses[Math.floor(Math.random() * statuses.length)] : 'default'
      }));
    };

    data['Last month'] = generateRandomMonth(30);
    data['January'] = generateRandomMonth(31);
    data['February'] = generateRandomMonth(28);
    data['March'] = generateRandomMonth(31);
    data['April'] = generateRandomMonth(30);
    data['May'] = generateRandomMonth(31);
    data['June'] = generateRandomMonth(30);

    return data;
  }, []);

  const calendarData = monthData[selectedMonth] || monthData['This month'];

  // Memoize stats calculation
  const stats = useMemo(() => {
    const teachingDays = calendarData.filter(d => d.status === 'session').length;
    const examsSet = calendarData.filter(d => d.status === 'exam').length;
    const onlineClasses = calendarData.filter(d => d.status === 'online').length;
    return { teachingDays, examsSet, onlineClasses };
  }, [calendarData]);

  // Memoize status styles function
  const getStatusStyles = useCallback((status: string) => {
    switch (status) {
      case 'session':
        return 'bg-[#A4EBB8] text-[#1A1A1A]';
      case 'exam':
        return 'bg-[#F2CFA5] text-[#1A1A1A]';
      case 'online':
        return 'bg-[#ADD9FA] text-[#1A1A1A]';
      default:
        return 'bg-[#EFEFEF] text-[#565656]';
    }
  }, []);

  const handleMonthSelect = useCallback((month: string) => {
    setSelectedMonth(month);
    setIsDropdownOpen(false);
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(prev => !prev);
  }, []);

  return (
    <div 
      className="bg-white rounded-[16px] border border-[#E5E7EB] overflow-hidden w-full"
      style={{ height: '344px', fontFamily: 'var(--font-matter)' }}
    >
      {/* Header Section */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[#1A1A1A]" style={{ fontFamily: 'var(--font-matter)', fontWeight: 600, fontSize: '18px' }}>Teaching Activity</h2>
          
          <div className="relative">
            <button 
              onClick={toggleDropdown}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#E5E7EB] rounded-lg text-[13px] font-normal text-[#6B7280] hover:bg-gray-50 transition-colors"
            >
              {selectedMonth}
              <ChevronDown size={14} strokeWidth={2} className="text-[#9CA3AF]" />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-50">
                {months.map((month) => (
                  <button
                    key={month}
                    onClick={() => handleMonthSelect(month)}
                    className={`w-full text-left px-3 py-2 text-[13px] hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      selectedMonth === month ? 'bg-gray-50 text-[#1A1A1A] font-medium' : 'text-[#6B7280]'
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="text-[#565656] text-[13px] mb-4" style={{ fontFamily: 'var(--font-matter)' }}>
          You taught for <span className="font-semibold text-[#1A1A1A]">{stats.teachingDays} days</span> this month 🔥
        </p>

        {/* Calendar Grid */}
        <div className="grid grid-cols-9 gap-[5px] mb-4">
          {calendarData.map((item) => (
            <div
              key={item.day}
              className={`flex items-center justify-center rounded-md text-[11px] font-medium ${getStatusStyles(item.status)}`}
              style={{ width: '26px', height: '26px', fontFamily: 'var(--font-matter)' }}
            >
              {item.day}
            </div>
          ))}
        </div>
      </div>

      {/* Legend Section */}
      <div className="px-5 py-4 border-t border-[#F3F4F6]">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#A4EBB8]"></div>
            <span className="text-[#565656]" style={{ fontFamily: 'var(--font-matter)', fontSize: '12px', fontWeight: 400 }}>Taught session</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#F2CFA5]"></div>
            <span className="text-[#565656]" style={{ fontFamily: 'var(--font-matter)', fontSize: '12px', fontWeight: 400 }}><span className="font-semibold text-[#1A1A1A]">{stats.examsSet}</span> Exams Set</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#ADD9FA]"></div>
            <span className="text-[#565656]" style={{ fontFamily: 'var(--font-matter)', fontSize: '12px', fontWeight: 400 }}><span className="font-semibold text-[#1A1A1A]">{stats.onlineClasses}</span> Online Classes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherLearningActivity;
