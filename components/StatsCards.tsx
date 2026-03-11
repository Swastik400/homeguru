"use client";

export default function StatsCards() {
  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] w-full" style={{ minHeight: '104px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 24px', border: '1px solid #DCDCDC' }}>
      {/* Grid container with divide-x for the vertical lines */}
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 w-full gap-4 sm:gap-0">
        
        {/* Stat 1: Classes Attended */}
        <div className="flex items-start gap-3 px-0 sm:px-4 pt-4 sm:pt-0">
          <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: '46px', height: '46px', backgroundColor: '#F2F2F2' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256">
              <path d="M240,192h-8V56a16,16,0,0,0-16-16H40A16,16,0,0,0,24,56V192H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM40,56H216V192H200V168a8,8,0,0,0-8-8H120a8,8,0,0,0-8,8v24H72V88H184v48a8,8,0,0,0,16,0V80a8,8,0,0,0-8-8H64a8,8,0,0,0-8,8V192H40ZM184,192H128V176h56Z"></path>
            </svg>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-700 mb-1.5" style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '15px', fontWeight: '500', lineHeight: '1.2' }}>Classes attended</p>
            <div className="flex items-center gap-2">
              <span className="text-[#111827]" style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '22px', fontWeight: '600', lineHeight: '1' }}>16</span>
              <span className="text-[#10B981] flex items-center" style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '11px', fontWeight: '500' }}>
                <svg className="w-2.5 h-2.5 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                4 this week
              </span>
            </div>
          </div>
        </div>

        {/* Stat 2: Total Learning Time */}
        <div className="flex items-start gap-3 px-0 sm:px-4 pt-4 sm:pt-0">
          <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: '46px', height: '46px', backgroundColor: '#F2F2F2' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256">
              <path d="M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,216ZM173.66,90.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32l40-40A8,8,0,0,1,173.66,90.34ZM96,16a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,16Z"></path>
            </svg>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-700 mb-1.5" style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '15px', fontWeight: '500', lineHeight: '1.2' }}>Total learning time</p>
            <div className="flex items-center gap-2">
              <span className="text-[#111827]" style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '22px', fontWeight: '600', lineHeight: '1' }}>24h</span>
              <span className="text-[#10B981] flex items-center" style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '11px', fontWeight: '500' }}>
                <svg className="w-2.5 h-2.5 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                3.5h this week
              </span>
            </div>
          </div>
        </div>

        {/* Stat 3: Assignment Done */}
        <div className="flex items-start gap-3 px-0 sm:px-4 pt-4 sm:pt-0">
          <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: '46px', height: '46px', backgroundColor: '#F2F2F2' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256">
              <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-38.34-85.66a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L116,164.69l42.34-42.35A8,8,0,0,1,169.66,122.34Z"></path>
            </svg>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-700 mb-1.5" style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '15px', fontWeight: '500', lineHeight: '1.2' }}>Assignment done</p>
            <div className="flex items-center gap-2">
              <span className="text-[#111827]" style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '22px', fontWeight: '600', lineHeight: '1' }}>3</span>
              <span className="text-[#D9774B]" style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '11px', fontWeight: '500' }}>
                2 pending
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
