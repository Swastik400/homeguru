"use client";
import { useState } from "react";
import { Users, Mail, Phone, MessageSquare, Plus, Search, Filter, ArrowRight, CheckCircle, XCircle, Clock, TrendingUp, MoreVertical, MoreHorizontal } from "lucide-react";

/**
 * Enterprise Lead Management (CRM)
 * Track prospective students through the sales funnel.
 */

const LEADS = [
  { id: 1, name: "Sanya Gupta", source: "Marketplace", interest: "Advanced Calculus", status: "New", date: "2 hours ago", avatar: "https://i.pravatar.cc/150?img=47" },
  { id: 2, name: "Ishan Malhotra", source: "Direct Page", interest: "Web Development", status: "Contacted", date: "Yesterday", avatar: "https://i.pravatar.cc/150?img=12" },
  { id: 3, name: "Ananya Ray", source: "Marketplace", interest: "Intro to Spanish", status: "Won", date: "2 days ago", avatar: "https://i.pravatar.cc/150?img=32" },
  { id: 4, name: "Kabir Singh", source: "Ads", interest: "Physics Mock", status: "Lost", date: "3 days ago", avatar: "https://i.pravatar.cc/150?img=18" },
];

export default function LeadsPage() {
  const [activeFunnel, setActiveFunnel] = useState("All Leads");

  return (
    <div className="font-matter">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-[28px] font-season font-bold text-[#111827]">Lead Management</h1>
          <p className="text-gray-500 text-[14px] mt-1">Convert prospective students into loyal learners with our integrated CRM.</p>
        </div>
        
        <div className="flex bg-white border border-gray-200 p-1 rounded-xl">
          {["All Leads", "New", "Contacted", "Won"].map(v => (
            <button 
              key={v}
              onClick={() => setActiveFunnel(v)}
              className={`px-4 py-2 text-[12px] font-bold rounded-lg transition-all ${activeFunnel === v ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:text-black'}`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        
        {/* Sales Pipeline Stats */}
        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Leads', value: '1,248', trend: '+14%', color: 'text-black' },
            { label: 'New Inquiries', value: '18', trend: 'Response Needed', color: 'text-amber-500' },
            { label: 'Conversion Rate', value: '24.2%', trend: '+2.4%', color: 'text-green-500' },
            { label: 'Avg. Turnaround', value: '4.5h', trend: 'Top 5%', color: 'text-blue-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[24px] border border-gray-200 shadow-sm">
              <p className="text-[11px] font-black uppercase text-gray-400 tracking-widest mb-1.5">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-[22px] font-bold text-[#111827]">{stat.value}</span>
                <span className={`text-[10px] font-bold ${stat.color} bg-gray-50 px-2 py-0.5 rounded-md`}>{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Leads Table */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-8 py-5 border-b border-gray-50 bg-[#F9FAFB]/50 flex items-center justify-between">
              <div className="flex items-center gap-4 bg-white border border-gray-200 px-4 py-2 rounded-xl w-full max-w-[300px]">
                <Search size={16} className="text-gray-400" />
                <input type="text" placeholder="Search leads..." className="bg-transparent border-none outline-none text-[13px] text-[#111] placeholder-gray-400 w-full" />
              </div>
              <button className="flex items-center gap-2 p-2 px-4 hover:bg-gray-100 rounded-xl transition-all text-gray-400 hover:text-black">
                <Filter size={16} />
                <span className="text-[12px] font-bold uppercase tracking-widest">Filter</span>
              </button>
            </div>

            <div className="overflow-x-auto text-left">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="py-4 pl-8 pr-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Profile</th>
                    <th className="py-4 px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Interest</th>
                    <th className="py-4 px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Funnel State</th>
                    <th className="py-4 pr-8 pl-4 text-center text-[11px] font-black text-gray-400 uppercase tracking-widest">Connect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {LEADS.map((lead) => (
                    <tr key={lead.id} className="group hover:bg-gray-50/50 transition-all">
                      <td className="py-5 pl-8 pr-4">
                        <div className="flex items-center gap-4">
                          <img src={lead.avatar} alt={lead.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                          <div className="flex flex-col">
                            <span className="text-[15px] font-bold text-[#111827]">{lead.name}</span>
                            <span className="text-[11px] text-gray-400 font-medium">Modified {lead.date}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-4 text-center">
                        <div className="flex flex-col items-center">
                          <span className="text-[13px] font-bold text-gray-700">{lead.interest}</span>
                          <span className="text-[10px] text-gray-400 font-medium italic">{lead.source}</span>
                        </div>
                      </td>
                      <td className="py-5 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          lead.status === 'New' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                          lead.status === 'Contacted' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                          lead.status === 'Won' ? 'bg-green-50 text-green-600 border-green-100' :
                          'bg-red-50 text-red-600 border-red-100'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-5 pr-8 pl-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button title="Email" className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-all"><Mail size={16} /></button>
                          <button title="WhatsApp / Chat" className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-all"><MessageSquare size={16} /></button>
                          <button className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-all"><MoreVertical size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Insights Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-black text-white rounded-[24px] p-8 shadow-xl">
            <h3 className="text-[18px] font-season font-bold mb-4">Conversion Boost</h3>
            <div className="p-5 bg-white/5 border border-white/10 rounded-[20px] mb-6">
              <p className="text-[12px] opacity-60 leading-relaxed font-matter italic">"A personalised video greeting increases trial booking rates by **42%** for tutors in your category."</p>
            </div>
            <button className="w-full py-3 bg-white text-black rounded-xl text-[13px] font-bold hover:bg-gray-100 transition-all active:scale-95">Record Greeting</button>
          </div>

          <div className="bg-white rounded-[24px] border border-gray-200 p-8 shadow-sm">
            <h3 className="text-[12px] font-black uppercase text-gray-400 tracking-wider mb-6 flex items-center justify-between">
              <span>Source Analysis</span>
              <TrendingUp size={14} className="text-gray-400" />
            </h3>
            <div className="space-y-6">
              {[
                { label: 'Marketplace', value: '72%', color: 'bg-black' },
                { label: 'Direct Referral', value: '18%', color: 'bg-blue-500' },
                { label: 'Social Media', value: '10%', color: 'bg-gray-200' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-[12px] font-bold text-gray-600">{item.label}</span>
                    <span className="text-[13px] font-bold">{item.value}</span>
                  </div>
                  <div className="w-full bg-gray-50 rounded-full h-1">
                    <div className={`${item.color} h-1 rounded-full`} style={{ width: item.value }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
