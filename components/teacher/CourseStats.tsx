"use client";
import { BookOpen, Users, Star, Layers } from 'lucide-react';

const stats = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#000000" viewBox="0 0 256 256">
        <path d="M224,40H32A16,16,0,0,0,16,56V200a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V56A16,16,0,0,0,224,40Zm0,160H32V56H224V200ZM184,80H72a8,8,0,0,0,0,16H184a8,8,0,0,0,0-16Zm0,40H72a8,8,0,0,0,0,16H184a8,8,0,0,0,0-16Zm-48,40H72a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Z"/>
      </svg>
    ),
    label: "Total Courses",
    value: "14",
    sub: "+2 this month",
    subColor: "#10B981",
    up: true,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#000000" viewBox="0 0 256 256">
        <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.43a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.51A8,8,0,0,1,250.14,206.7Z"/>
      </svg>
    ),
    label: "Active Students",
    value: "842",
    sub: "+12% growth",
    subColor: "#10B981",
    up: true,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#000000" viewBox="0 0 256 256">
        <path d="M234.5,114.38l-45.1,32.77,17.22,53a8,8,0,0,1-12.31,8.95L151,176.32l-43.31,32.78a8,8,0,0,1-12.31-8.95l17.22-53L27.5,114.38a8,8,0,0,1,4.7-14.5l55.77,0L105.19,46.9a8,8,0,0,1,15.12,0l17.22,53,55.77,0a8,8,0,0,1,4.7,14.48Z"/>
      </svg>
    ),
    label: "Avg. Rating",
    value: "4.8",
    sub: "Top tier",
    subColor: "#6B7280",
    up: false,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#000000" viewBox="0 0 256 256">
        <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"/>
      </svg>
    ),
    label: "Active Modules",
    value: "52",
    sub: "v2.1 updated",
    subColor: "#6B7280",
    up: false,
  }
];

export default function CourseStats() {
  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] w-full font-matter mt-8 text-left"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 20px', border: '1px solid #DCDCDC' }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 w-full gap-4 sm:gap-0">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-start gap-3 px-0 sm:px-4 pt-4 sm:pt-0 first:pl-0">
            <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: '46px', height: '46px', backgroundColor: '#F2F2F2' }}>
              {stat.icon}
            </div>
            <div className="flex flex-col">
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
