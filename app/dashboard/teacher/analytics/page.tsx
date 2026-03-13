"use client";
import { useState } from "react";
import { BarChart3, TrendingUp, Users, Clock, DollarSign, ArrowUpRight, ArrowDownRight, Filter, Download, Calendar, PieChart, LineChart } from "lucide-react";

/**
 * Enterprise Teacher Analytics Portal
 * Comprehensive insights into student retention, revenue, and engagement.
 */

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("Last 30 Days");

  return (
    <div className="pb-12">
      <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
         <div>
            <h1 className="text-[28px] font-season font-bold text-[#111827]">Performance Analytics</h1>
            <p className="text-gray-500 text-[14px] mt-1">Deep insights into student engagement, retention, and business growth.</p>
         </div>
         
         <div className="flex items-center gap-3">
            <div className="flex bg-white border border-gray-200 p-1 rounded-xl">
               {["7D", "30D", "90D", "Year"].map(v => (
                  <button 
                    key={v}
                    onClick={() => setTimeRange(v)}
                    className={`px-4 py-2 text-[12px] font-bold rounded-lg transition-all ${timeRange.includes(v) ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:text-black'}`}
                  >
                     {v}
                  </button>
               ))}
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-black rounded-xl text-[14px] font-bold shadow-sm hover:bg-gray-50 transition-all active:scale-95">
               <Download size={18} />
               <span>Export PDF</span>
            </button>
         </div>
      </div>

      {/* High-Level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
         {[
            { label: 'Total Revenue', value: '$14,240', trend: '+12.5%', color: 'text-green-500', icon: DollarSign },
            { label: 'Avg. Retention', value: '94.2%', trend: '+2.1%', color: 'text-green-500', icon: Users },
            { label: 'Session Rating', value: '4.9/5', trend: 'Stable', color: 'text-gray-400', icon: BarChart3 },
            { label: 'Classes Taught', value: '428', trend: '+45', color: 'text-blue-500', icon: Clock },
         ].map((kpi, idx) => (
            <div key={idx} className="bg-white p-6 rounded-[24px] border border-gray-200 shadow-sm">
               <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center">
                     <kpi.icon size={20} className="text-gray-400" />
                  </div>
                  <span className={`text-[11px] font-bold ${kpi.color} bg-gray-50 px-2 py-0.5 rounded-lg border border-gray-100`}>{kpi.trend}</span>
               </div>
               <p className="text-[12px] font-black uppercase text-gray-400 tracking-wider mb-1">{kpi.label}</p>
               <h3 className="text-[24px] font-bold text-[#111827]">{kpi.value}</h3>
            </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        
        {/* Main Engagement Chart (Mockup representation) */}
        <div className="lg:col-span-8">
           <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                 <div>
                    <h3 className="text-[18px] font-season font-bold">Engagement Trends</h3>
                    <p className="text-[13px] text-gray-400 font-medium">Daily student activity and session attendance.</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                       <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
                       <span className="text-[11px] font-bold text-gray-500">Live Class</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>
                       <span className="text-[11px] font-bold text-gray-500">Recorded</span>
                    </div>
                 </div>
              </div>
              
              {/* Chart Mockup */}
              <div className="aspect-[16/7] w-full flex items-end justify-between gap-3 px-2">
                 {[40, 65, 45, 80, 55, 90, 75, 40, 60, 85, 50, 70].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                       <div className="w-full bg-gray-50 rounded-lg relative h-[200px] overflow-hidden">
                          <div 
                            className="absolute bottom-0 w-full bg-black rounded-lg transition-all duration-700 delay-[100ms] group-hover:bg-blue-600" 
                            style={{ height: `${h}%` }}
                          ></div>
                       </div>
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Day {i+1}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Side Insights: Payouts & Retention */}
        <div className="lg:col-span-4 flex flex-col gap-6">
           
           {/* Revenue Sources */}
           <div className="bg-white rounded-[24px] border border-gray-200 p-8 shadow-sm h-full">
              <h3 className="text-[16px] font-season font-bold mb-6 flex items-center justify-between">
                 <span>Revenue Sources</span>
                 <PieChart size={16} className="text-gray-400" />
              </h3>
              
              <div className="space-y-5">
                 {[
                    { label: 'Marketplace Bookings', value: '64%', color: 'bg-black' },
                    { label: 'Group Batches', value: '28%', color: 'bg-blue-500' },
                    { label: 'Study Materials', value: '8%', color: 'bg-gray-200' },
                 ].map(item => (
                    <div key={item.label}>
                       <div className="flex justify-between items-baseline mb-2">
                          <span className="text-[13px] font-bold text-gray-600">{item.label}</span>
                          <span className="text-[14px] font-black">{item.value}</span>
                       </div>
                       <div className="w-full bg-gray-50 rounded-full h-1.5 overflow-hidden">
                          <div className={`${item.color} h-1.5 rounded-full`} style={{ width: item.value }}></div>
                       </div>
                    </div>
                 ))}
              </div>
              
              <button className="w-full mt-8 py-3 bg-gray-50 border border-gray-100 text-[12px] font-black uppercase tracking-widest text-[#111] rounded-xl hover:bg-gray-100 transition-all">
                 Detailed Payout Logs
              </button>
           </div>

        </div>

      </div>

      {/* Student Retention Heatmap / Batch Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
         <div className="bg-white rounded-[24px] border border-gray-200 p-8 shadow-sm">
            <h3 className="text-[18px] font-season font-bold mb-2">Student Retention (LTV)</h3>
            <p className="text-[13px] text-gray-400 font-medium mb-8">Tracking consistency and renewal rates across batches.</p>
            <div className="space-y-6">
               <div className="flex items-center gap-4">
                  <div className="flex-1">
                     <div className="flex justify-between items-end mb-2">
                        <span className="text-[14px] font-bold text-gray-700">English Batch A</span>
                        <span className="text-[11px] font-bold text-green-500">98% Renewal</span>
                     </div>
                     <div className="w-full bg-gray-50 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                     </div>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="flex-1">
                     <div className="flex justify-between items-end mb-2">
                        <span className="text-[14px] font-bold text-gray-700">Calculus Core</span>
                        <span className="text-[11px] font-bold text-amber-500">62% Renewal</span>
                     </div>
                     <div className="w-full bg-gray-50 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="bg-black text-white rounded-[24px] p-8 shadow-xl flex flex-col justify-center">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
               <ArrowUpRight size={24} className="text-green-400" />
            </div>
            <h3 className="text-[20px] font-season font-bold mb-2">Predictive Analysis</h3>
            <p className="text-[14px] opacity-70 leading-relaxed font-matter mb-6">Based on current trends, your revenue is projected to grow by **$2,400** next month if you activate **2 additional slots**.</p>
            <button className="self-start px-6 py-2.5 bg-white text-black rounded-xl text-[14px] font-bold hover:bg-gray-100 transition-all active:scale-95">Optimize Schedule</button>
         </div>
      </div>
    </div>
  );
}
