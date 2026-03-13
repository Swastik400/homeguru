"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AttendanceCalendarProps {
  onSelectDate: (date: Date) => void;
  onClose: () => void;
}

export default function AttendanceCalendar({ onSelectDate, onClose }: AttendanceCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = [];
  const totalDays = daysInMonth(year, month);
  const startingDay = firstDayOfMonth(year, month);

  // Padding for previous month
  for (let i = 0; i < startingDay; i++) {
    days.push(<div key={`prev-${i}`} className="h-8 w-8" />);
  }

  // Current month days
  for (let d = 1; d <= totalDays; d++) {
    const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();
    days.push(
      <button
        key={d}
        onClick={() => {
          onSelectDate(new Date(year, month, d));
          onClose();
        }}
        className={`h-8 w-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
          isToday 
            ? 'bg-blue-600 text-white' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        {d}
      </button>
    );
  }

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="absolute right-0 mt-2 p-4 bg-white border border-gray-200 rounded-xl shadow-xl z-50 w-64 font-matter">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-black text-gray-900">{monthNames[month]} {year}</h4>
        <div className="flex gap-1">
          <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-md text-gray-400">
            <ChevronLeft size={16} />
          </button>
          <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-md text-gray-400">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="h-8 w-8 flex items-center justify-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
            {day}
          </div>
        ))}
        {days}
      </div>

      <div className="pt-3 border-t border-gray-100 mt-2 flex justify-between">
         <button onClick={() => { onSelectDate(new Date()); onClose(); }} className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">
           Today
         </button>
         <button onClick={onClose} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900">
           Close
         </button>
      </div>
    </div>
  );
}
