"use client";
import { memo } from "react";
import { Users, CalendarBlank, CalendarCheck, Wallet } from "@phosphor-icons/react";

const stats = [
  {
    icon: <Users size={24} weight="regular" />,
    label: "Active Students",
    value: "48",
    sub: "+3 this week",
    subColor: "#10B981",
    showArrow: true,
  },
  {
    icon: <CalendarBlank size={24} weight="regular" />,
    label: "Classes Today",
    value: "5",
    sub: "2 completed",
    subColor: "#6B7280",
    showArrow: false,
  },
  {
    icon: <CalendarCheck size={24} weight="regular" />,
    label: "Pending Reviews",
    value: "12",
    sub: "3 overdue",
    subColor: "#D9774B",
    showArrow: false,
  },
  {
    icon: <Wallet size={24} weight="regular" />,
    label: "Monthly Earnings",
    value: "$1,248",
    sub: "+12% vs Feb",
    subColor: "#10B981",
    showArrow: true,
  },
];

export default memo(function TeacherStatsCards() {
  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] w-full font-matter" style={{ minHeight: '104px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 24px', border: '1px solid #DCDCDC' }}>
      {/* Grid container with divide-x for the vertical lines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 w-full gap-4 sm:gap-0">
        
        {stats.map((stat, i) => (
          <div key={i} className="flex items-start gap-3 px-0 sm:px-4 pt-4 sm:pt-0">
            <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: '46px', height: '46px', backgroundColor: '#F2F2F2' }}>
              {stat.icon}
            </div>
            <div className="flex flex-col">
              <p className="text-gray-700 mb-1.5" style={{ fontSize: '15px', lineHeight: '1.2' }}>{stat.label}</p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                <span className="text-[#111827] font-bold tracking-tight" style={{ fontSize: '24px', lineHeight: '1' }}>{stat.value}</span>
                <span className="flex items-center whitespace-nowrap" style={{ fontSize: '12px', color: stat.subColor, fontWeight: 600 }}>
                  {stat.showArrow && (
                    <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                    </svg>
                  )}
                  {stat.sub}
                </span>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
});
