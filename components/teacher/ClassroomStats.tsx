"use client";
import { Video, Clock, Users, Zap } from 'lucide-react';

const stats = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#000000" viewBox="0 0 256 256">
        <path d="M216,48H176V40a8,8,0,0,0-16,0v8H96V40a8,8,0,0,0-16,0v8H40A16,16,0,0,0,24,64V208a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM80,64v8a8,8,0,0,0,16,0V64h64v8a8,8,0,0,0,16,0V64h40V96H40V64ZM216,208H40V112H216V208Z"/>
      </svg>
    ),
    label: "Total Sessions",
    value: "128",
    sub: "+12% this month",
    subColor: "#10B981",
    up: true,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#000000" viewBox="0 0 256 256">
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"/>
      </svg>
    ),
    label: "Teaching Hours",
    value: "452h",
    sub: "+5.2h this week",
    subColor: "#10B981",
    up: true,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#000000" viewBox="0 0 256 256">
        <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.43a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.51A8,8,0,0,1,250.14,206.7Z"/>
      </svg>
    ),
    label: "Student Reach",
    value: "1.2k",
    sub: "Global range",
    subColor: "#6B7280",
    up: false,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#000000" viewBox="0 0 256 256">
        <path d="M213.66,66.34l-40-40A8,8,0,0,0,168,24H88A16,16,0,0,0,72,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V72A8,8,0,0,0,213.66,66.34ZM168,43.31,196.69,72H168ZM200,216H88V40h64V80a8,8,0,0,0,8,8h40V216Zm-80-80a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h24A8,8,0,0,1,120,136Zm0,32a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h24A8,8,0,0,1,120,168Zm48-64a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h40A8,8,0,0,1,168,104Z"/>
      </svg>
    ),
    label: "Avg. Engagement",
    value: "92%",
    sub: "+2% vs last week",
    subColor: "#10B981",
    up: true,
  }
];

export default function ClassroomStats() {
  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] w-full font-matter mt-8"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 20px', border: '1px solid #DCDCDC' }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 w-full gap-4 sm:gap-0">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-start gap-3 px-0 sm:px-4 pt-4 sm:pt-0 first:pl-0">
            <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: '46px', height: '46px', backgroundColor: '#F2F2F2' }}>
              {stat.icon}
            </div>
            <div className="flex flex-col text-left">
              <p className="text-gray-700 mb-1.5" style={{ fontSize: '15px', lineHeight: '1.2' }}>{stat.label}</p>
              <div className="flex items-center gap-2">
                <span className="text-[#111827]" style={{ fontSize: '22px', lineHeight: '1' }}>{stat.value}</span>
                <span style={{ fontSize: '11px', color: stat.subColor }} className="flex items-center gap-0.5">
                  {stat.up && (
                    <svg className="w-2.5 h-2.5 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
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
}
