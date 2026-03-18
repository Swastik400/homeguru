"use client";
import React, { useState, useMemo, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

const LearningActivity = React.memo(() => {
  const [selectedMonth, setSelectedMonth] = useState('This month');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const months = ['This month', 'Last month', 'January', 'February', 'March', 'April', 'May', 'June'];

  // Memoize static data to prevent regeneration
  const monthData = useMemo(() => {
    const data: Record<string, any[]> = {
      'This month': [
        { day: 1, status: 'default' }, { day: 2, status: 'default' }, { day: 3, status: 'course' },
        { day: 4, status: 'login' }, { day: 5, status: 'quiz' }, { day: 6, status: 'course' },
        { day: 7, status: 'login' }, { day: 8, status: 'default' }, { day: 9, status: 'login' },
        { day: 10, status: 'login' }, { day: 11, status: 'default' }, { day: 12, status: 'course' },
        { day: 13, status: 'login' }, { day: 14, status: 'default' }, { day: 15, status: 'login' },
        { day: 16, status: 'login' }, { day: 17, status: 'login' }, { day: 18, status: 'quiz' },
        { day: 19, status: 'default' }, { day: 20, status: 'default' }, { day: 21, status: 'login' },
        { day: 22, status: 'default' }, { day: 23, status: 'default' }, { day: 24, status: 'course' },
        { day: 25, status: 'default' }, { day: 26, status: 'default' }, { day: 27, status: 'default' },
        { day: 28, status: 'quiz' }, { day: 29, status: 'default' }, { day: 30, status: 'default' },
        { day: 31, status: 'default' }
      ],
      'Last month': [
        { day: 1, status: 'login' }, { day: 2, status: 'login' }, { day: 3, status: 'default' },
        { day: 4, status: 'course' }, { day: 5, status: 'login' }, { day: 6, status: 'default' },
        { day: 7, status: 'quiz' }, { day: 8, status: 'login' }, { day: 9, status: 'login' },
        { day: 10, status: 'course' }, { day: 11, status: 'login' }, { day: 12, status: 'default' },
        { day: 13, status: 'default' }, { day: 14, status: 'login' }, { day: 15, status: 'quiz' },
        { day: 16, status: 'login' }, { day: 17, status: 'default' }, { day: 18, status: 'login' },
        { day: 19, status: 'course' }, { day: 20, status: 'login' }, { day: 21, status: 'default' },
        { day: 22, status: 'login' }, { day: 23, status: 'login' }, { day: 24, status: 'default' },
        { day: 25, status: 'quiz' }, { day: 26, status: 'login' }, { day: 27, status: 'login' },
        { day: 28, status: 'default' }, { day: 29, status: 'default' }, { day: 30, status: 'default' }
      ]
    };

    // Generate random data for other months only once
    const generateRandomMonth = (days: number) => {
      const statuses = ['default', 'login', 'quiz', 'course'];
      return Array.from({ length: days }, (_, i) => ({
        day: i + 1,
        status: Math.random() > 0.4 ? statuses[Math.floor(Math.random() * statuses.length)] : 'default'
      }));
    };

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
    const loginDays = calendarData.filter(d => d.status === 'login').length;
    const quizAttempts = calendarData.filter(d => d.status === 'quiz').length;
    const newCourses = calendarData.filter(d => d.status === 'course').length;
    return { loginDays, quizAttempts, newCourses };
  }, [calendarData]);

  // Memoize status styles function
  const getStatusStyles = useCallback((status: string) => {
    switch (status) {
      case 'login':
        return 'bg-[#A4EBB8] text-[#1A1A1A]';
      case 'quiz':
        return 'bg-[#F2CFA5] text-[#1A1A1A]';
      case 'course':
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
          <h2 className="text-[#1A1A1A]" style={{ fontFamily: 'var(--font-matter)', fontWeight: 600, fontSize: '18px' }}>Learning Activity</h2>
          
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
          You showed up on <span className="font-semibold text-[#1A1A1A]">{stats.loginDays} days</span> this month 🔥
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
            <span className="text-[#565656]" style={{ fontFamily: 'var(--font-matter)', fontSize: '12px', fontWeight: 400 }}>Logged in</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#F2CFA5]"></div>
            <span className="text-[#565656]" style={{ fontFamily: 'var(--font-matter)', fontSize: '12px', fontWeight: 400 }}><span className="font-semibold text-[#1A1A1A]">{stats.quizAttempts}</span> Quiz attempts</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#ADD9FA]"></div>
            <span className="text-[#565656]" style={{ fontFamily: 'var(--font-matter)', fontSize: '12px', fontWeight: 400 }}><span className="font-semibold text-[#1A1A1A]">{stats.newCourses}</span> New course</span>
          </div>
        </div>
      </div>
    </div>
  );
});

LearningActivity.displayName = 'LearningActivity';

export default LearningActivity;
