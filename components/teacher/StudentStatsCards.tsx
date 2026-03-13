"use client";
import { Info } from 'lucide-react';

const stats = [
  {
    label: "Total Student",
    value: "49",
    change: "+2 This Month",
    changeColor: "text-[#10B981]",
    changeBg: "bg-[#ECFDF5]"
  },
  {
    label: "Active Student",
    value: "15",
    change: "+1 This Month",
    changeColor: "text-[#10B981]",
    changeBg: "bg-[#ECFDF5]"
  },
  {
    label: "Pending Submissions",
    value: "6",
    change: "-1 This Month",
    changeColor: "text-[#EF4444]",
    changeBg: "bg-[#FEF2F2]"
  }
];

export default function StudentStatsCards() {
  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] w-full font-matter mb-8"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 20px', border: '1px solid #DCDCDC' }}>
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 w-full gap-4 md:gap-0">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-start gap-3 px-0 md:px-6 pt-4 md:pt-0 first:pl-0">
            <div className="w-10 h-10 rounded-full bg-[#F2F2F2] flex items-center justify-center shrink-0">
              <Info size={18} strokeWidth={2} className="text-gray-400" />
            </div>
            
            <div className="flex flex-col">
              <p className="text-gray-600 mb-1" style={{ fontSize: '14px', lineHeight: '1.2' }}>{stat.label}</p>
              <div className="flex items-center gap-2">
                <span className="text-[#111] text-[24px] font-bold leading-none">{stat.value}</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${stat.changeBg} ${stat.changeColor}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
