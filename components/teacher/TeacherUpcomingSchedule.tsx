"use client";

import React, { useState } from 'react';
import { Clock, Sun, Moon } from 'lucide-react';

const SESSIONS = [
  {
    id: 1,
    title: "English Speaking -",
    subtitle: "Intermediate Level",
    startsIn: "1d 3hr",
    time: "2:00 PM – 3:00 PM",
    period: "Afternoon",
    date: "14 Mar, 2026",
    studentName: "Varun Sharma",
    studentImage: "https://i.pravatar.cc/150?img=33",
    subject: "English",
    location: "India",
    sessionsCompleted: 24,
    progress: 78,
  },
  {
    id: 2,
    title: "Advanced Calculus -",
    subtitle: "Chapter 5: Integration",
    startsIn: "2d 1hr",
    time: "10:00 AM – 11:30 AM",
    period: "Morning",
    date: "15 Mar, 2026",
    studentName: "Priya Desai",
    studentImage: "https://i.pravatar.cc/150?img=25",
    subject: "Mathematics",
    location: "India",
    sessionsCompleted: 18,
    progress: 72,
  },
  {
    id: 3,
    title: "Web Development -",
    subtitle: "React.js Basics",
    startsIn: "3d 5hr",
    time: "3:00 PM – 5:00 PM",
    period: "Afternoon",
    date: "16 Mar, 2026",
    studentName: "Aditya Singh",
    studentImage: "https://i.pravatar.cc/150?img=15",
    subject: "Programming",
    location: "India",
    sessionsCompleted: 9,
    progress: 38,
  },
];

export default function TeacherUpcomingSchedule() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % SESSIONS.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + SESSIONS.length) % SESSIONS.length);
      setIsAnimating(false);
    }, 300);
  };

  const current = SESSIONS[currentIndex];

  return (
    <div className="w-full font-matter">

      {/* Outside Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#64748B" viewBox="0 0 256 256">
            <path d="M200,75.64V40a16,16,0,0,0-16-16H72A16,16,0,0,0,56,40V76a16.07,16.07,0,0,0,6.4,12.8L114.67,128,62.4,167.2A16.07,16.07,0,0,0,56,180v36a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V180.36a16.09,16.09,0,0,0-6.35-12.77L141.27,128l52.38-39.6A16.05,16.05,0,0,0,200,75.64ZM184,216H72V180l56-42,56,42.35Zm0-140.36L128,118,72,76V40H184Z" />
          </svg>
        </div>
        <h2 className="text-[#0F172A] font-season font-bold text-[20px] tracking-tight">
          Upcoming Sessions
        </h2>
      </div>

      {/* Stacked Card Container */}
      <div className="relative w-full">

        {/* Background Stack Cards */}
        <div
          className="hidden md:block absolute top-2 right-[-6px] border border-[#E2E8F0] rounded-[24px] bg-white z-0 transition-all duration-300 w-full"
          style={{
            height: '260px',
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? 'translateX(-10px)' : 'translateX(0)',
          }}
        />
        <div
          className="hidden md:block absolute top-1 right-[-3px] border border-[#E2E8F0] rounded-[24px] bg-white z-0 transition-all duration-300 w-full"
          style={{
            height: '260px',
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? 'translateX(-5px)' : 'translateX(0)',
          }}
        />

        {/* Main Card */}
        <div
          className="relative z-10 bg-white border border-[#E2E8F0] rounded-[24px] overflow-hidden transition-all duration-300 w-full shadow-sm"
          style={{
            minHeight: '260px',
            opacity: isAnimating ? 0.5 : 1,
            transform: isAnimating ? 'scale(0.99)' : 'scale(1)',
          }}
        >
          <div className="relative p-4 md:p-6 flex flex-col md:flex-row md:justify-between gap-4 md:gap-6 h-full">

            {/* Left Side: Session Info */}
            <div className="flex flex-col gap-3 flex-1">

              {/* Starts In Badge */}
              <div className="bg-[#F8FAFC] text-[#64748B] text-[13px] px-4 py-2 rounded-xl flex items-center gap-2 w-fit border border-[#F1F5F9] font-bold shadow-inner">
                <Clock size={14} strokeWidth={2.5} />
                Starts in <span className="text-[#0F172A]">{current.startsIn}</span>
              </div>

              <h3 className="text-[#0F172A] leading-tight text-[24px] md:text-[32px] font-season font-bold tracking-tight">
                {current.title}<br />{current.subtitle}
              </h3>

              {/* Time & Date */}
              <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[#6B7280] text-[12px] md:text-[13px]" style={{ fontFamily: 'DM Sans' }}>
                <span>{current.time}</span>
                <div className="flex items-center gap-1">
                  {current.period === 'Morning'
                    ? <Sun size={14} strokeWidth={2} />
                    : <Moon size={14} strokeWidth={2} />
                  }
                  {current.period}
                </div>
                <span>{current.date}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-2">
                <button className="bg-[#0F172A] text-white px-6 md:px-8 py-2.5 rounded-xl text-[14px] hover:bg-[#1E293B] transition-all active:scale-95 font-bold shadow-md">
                  Start session
                </button>
                <button className="bg-white border border-[#E2E8F0] text-[#0F172A] px-6 md:px-8 py-2.5 rounded-xl text-[14px] hover:bg-[#F8FAFC] transition-all active:scale-95 font-bold shadow-sm">
                  Reschedule
                </button>
              </div>
            </div>

            {/* Right Side: Student Profile Card */}
            <div className="relative md:absolute md:right-6 md:top-1/2 md:-translate-y-1/2 w-full md:w-[261px] min-h-[180px] md:h-[251px] flex items-center justify-center font-sans mt-2 md:mt-0">

              {/* Background Vector */}
              <div className="absolute inset-0 z-0 flex items-center justify-center">
                <img
                  src="/images/Vector.png"
                  alt="Card Background"
                  className="w-full h-full object-contain opacity-100"
                  style={{ maxWidth: '261px', maxHeight: '251px' }}
                />
              </div>

              {/* Student Info */}
              <div className="relative z-10 flex flex-col items-center w-full md:w-[157px] h-auto md:-mt-10 py-4 md:py-0 px-2">

                {/* Avatar */}
                <div className="w-[58px] h-[58px] min-w-[58px] min-h-[58px] rounded-full overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.1)] mb-2.5 border-2 border-white">
                  <img
                    src={current.studentImage}
                    alt={current.studentName}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Name */}
                <h4 className="text-[#0F172A] text-[15px] md:text-[17px] tracking-[0.01em] mb-2 text-center break-words max-w-full px-1">
                  {current.studentName}
                </h4>

                {/* Subject & Location */}
                <div className="flex items-center gap-2 md:gap-3 mb-2 flex-wrap justify-center max-w-full">
                  <div className="flex items-center gap-1">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-[#475569] shrink-0">
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                    </svg>
                    <span className="text-[#334155] text-[11px] md:text-[12px] tracking-wide">{current.subject}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[12px] leading-none">🇮🇳</span>
                    <span className="text-[#334155] text-[11px] md:text-[12px] tracking-wide">{current.location}</span>
                  </div>
                </div>

                {/* Sessions & Progress */}
                <div className="flex items-center gap-1.5 text-[#334155] text-[11px] md:text-[12px] tracking-wide flex-wrap justify-center max-w-full">
                  <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#475569] shrink-0">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                    {current.sessionsCompleted} sessions
                  </span>
                  <span className="text-[14px] leading-none">·</span>
                  <span className="text-[#2D8946] font-medium">{current.progress}%</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-end mt-3 w-full">
        <div className="flex items-center gap-2 text-[#6B7280] text-[13px]" style={{ fontFamily: 'DM Sans', width: '110px', height: '22px' }}>
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className="flex items-center justify-center hover:opacity-70 transition-opacity disabled:opacity-30"
            style={{ width: '22px', height: '22px' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <span className="flex items-center gap-1.5" style={{ fontSize: '13px' }}>
            <span className="text-[#1A1A1A]">{currentIndex + 1}</span>
            <span>of</span>
            <span>{SESSIONS.length}</span>
          </span>
          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="flex items-center justify-center hover:opacity-70 transition-opacity disabled:opacity-30"
            style={{ width: '22px', height: '22px' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      </div>

    </div>
  );
}
