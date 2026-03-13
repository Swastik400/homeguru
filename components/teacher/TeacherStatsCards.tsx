"use client";
import { memo } from "react";

const stats = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256"><path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.43a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.51A8,8,0,0,1,250.14,206.7Z"/></svg>,
    label: "Active Students",
    value: "48",
    sub: "+3 this week",
    subColor: "#10B981",
    showArrow: true,
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"/></svg>,
    label: "Classes Today",
    value: "5",
    sub: "2 completed",
    subColor: "#6B7280",
    showArrow: false,
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-38.34-85.66a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L116,164.69l42.34-42.35A8,8,0,0,1,169.66,122.34Z"/></svg>,
    label: "Pending Reviews",
    value: "12",
    sub: "3 overdue",
    subColor: "#D9774B",
    showArrow: false,
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256"><path d="M240,192h-8V56a16,16,0,0,0-16-16H40A16,16,0,0,0,24,56V192H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM40,56H216V192H200V168a8,8,0,0,0-8-8H120a8,8,0,0,0-8,8v24H72V88H184v48a8,8,0,0,0,16,0V80a8,8,0,0,0-8-8H64a8,8,0,0,0-8,8V192H40ZM184,192H128V176h56Z"/></svg>,
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
              <div className="flex items-center gap-2">
                <span className="text-[#111827]" style={{ fontSize: '22px', lineHeight: '1' }}>{stat.value}</span>
                <span className="flex items-center" style={{ fontSize: '11px', color: stat.subColor }}>
                  {stat.showArrow && (
                    <svg className="w-2.5 h-2.5 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
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
