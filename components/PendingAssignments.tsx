"use client";
import React from 'react';

export default function PendingAssignments() {
  const assignments = [
    {
      id: 1,
      title: 'Spanish Essay',
      teacher: 'Ms. Priya Kapoor',
      tagText: 'Due tommorow',
      tagColor: 'bg-[#FDF2F2] text-[#D46B6B]', // Soft Red
    },
    {
      id: 2,
      title: 'Laws of Motion',
      teacher: 'Ms. Priya Kapoor',
      tagText: '4 days 34h left',
      tagColor: 'bg-[#FDF9EE] text-[#A68A48]', // Soft Yellow/Brown
    },
  ];

  return (
    <div className="w-full bg-white rounded-[20px] border border-gray-200 p-5 font-sans shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]" style={{ height: '286px' }}>
      
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
          <polyline points="3 3 3 8 8 8"></polyline>
          <polyline points="12 7 12 12 15 15"></polyline>
        </svg>
        <h2 className="text-[#111827] text-[17px] font-semibold tracking-wide">
          Pending Assignmements
        </h2>
      </div>

      {/* Assignment List */}
      <div className="flex flex-col">
        {assignments.map((assignment, index) => (
          <React.Fragment key={assignment.id}>
            
            {/* List Item */}
            <div className="flex items-center justify-between py-3.5">
              <div className="flex items-center gap-4">
                
                {/* Icon Box */}
                <div className="w-[46px] h-[46px] rounded-full bg-[#F2F4F8] flex items-center justify-center shrink-0">
                  {/* Tilted Document SVG */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="rotate-[-8deg]">
                    <rect x="4" y="2" width="16" height="20" rx="2" fill="#2E3C58" />
                    <line x1="8" y1="8" x2="16" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="8" y1="12" x2="16" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="8" y1="16" x2="12" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Text & Tags */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <h3 className="text-[#111827] text-[16px] font-medium">
                      {assignment.title}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-[4px] text-[11px] font-medium tracking-wide ${assignment.tagColor}`}>
                      {assignment.tagText}
                    </span>
                  </div>
                  <p className="text-[#8B92A5] text-[14px] mt-0.5">
                    {assignment.teacher}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button className="px-5 py-2 bg-white border border-gray-200 rounded-[10px] text-[#111827] text-[14px] font-medium shadow-sm hover:bg-gray-50 transition-colors">
                View
              </button>
            </div>

            {/* Dashed Separator (Only render between items, not after the last one) */}
            {index === 0 && (
              <div className="w-full border-t border-dashed border-gray-300 my-1"></div>
            )}
            
          </React.Fragment>
        ))}
      </div>

      {/* Footer / Pagination Controls */}
      <div className="mt-3 bg-[#F8FAFC] rounded-[12px] px-4 py-2.5 flex items-center justify-between">
        <div className="text-[#8B92A5] text-[12px]">
          Showing <span className="text-[#111827] font-medium">1</span> of <span className="text-[#111827] font-medium">3</span>
        </div>
        
        <div className="flex items-center gap-3 text-[12px] font-medium">
          <button className="text-[#A0AABF] flex items-center gap-1 cursor-not-allowed">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            Previous
          </button>
          <button className="text-[#111827] flex items-center gap-1 hover:text-gray-600 transition-colors">
            Next
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>

    </div>
  );
}
