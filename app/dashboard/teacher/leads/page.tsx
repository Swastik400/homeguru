"use client";
import React, { useState } from "react";
import { Search, Filter, Mail, Phone, MoreHorizontal, ArrowRight, UserPlus, CheckCircle2, Clock, XCircle, ChevronDown, ChevronRight, Inbox, MessageSquare } from "lucide-react";
import "@/components/teacher/CourseBuilder.css";

/* ──────────────────────────────────
   TYPES & DATA
────────────────────────────────── */
type LeadStatus = "New" | "Contacted" | "Trial" | "Won" | "Lost";

interface Lead {
  id: string;
  name: string;
  source: string;
  grade: string;
  subject: string;
  status: LeadStatus;
  date: string;
  avatar: string;
  phone: string;
  email: string;
}

const LEADS: Lead[] = [
  { id: "LD-001", name: "Sanya Gupta", source: "Marketplace", grade: "Class 10", subject: "Maths", status: "New", date: "2h ago", avatar: "https://i.pravatar.cc/150?img=47", phone: "+91 98765 43210", email: "sanya.g@email.com" },
  { id: "LD-002", name: "Ishan Malhotra", source: "Website", grade: "Class 12", subject: "Physics", status: "Contacted", date: "Yesterday", avatar: "https://i.pravatar.cc/150?img=12", phone: "+91 87654 32109", email: "ishan.m@email.com" },
  { id: "LD-003", name: "Ananya Ray", source: "Referral", grade: "Class 9", subject: "Science", status: "Won", date: "2 days ago", avatar: "https://i.pravatar.cc/150?img=32", phone: "+91 76543 21098", email: "ananya.r@email.com" },
  { id: "LD-004", name: "Kabir Singh", source: "Ads", grade: "Class 11", subject: "Chemistry", status: "Trial", date: "3 days ago", avatar: "https://i.pravatar.cc/150?img=18", phone: "+91 65432 10987", email: "kabir.s@email.com" },
  { id: "LD-005", name: "Priya Patel", source: "Social Media", grade: "Class 8", subject: "English", status: "New", date: "5 days ago", avatar: "https://i.pravatar.cc/150?img=5", phone: "+91 54321 09876", email: "priya.p@email.com" },
  { id: "LD-006", name: "Rohan Desai", source: "Marketplace", grade: "Class 12", subject: "Maths", status: "Lost", date: "1 week ago", avatar: "https://i.pravatar.cc/150?img=60", phone: "+91 43210 98765", email: "rohan.d@email.com" },
];

const FUNNELS = [
  { id: "All", label: "All Leads", count: 124 },
  { id: "New", label: "New", count: 12 },
  { id: "Contacted", label: "Contacted", count: 28 },
  { id: "Trial", label: "Trial Scheduled", count: 8 },
  { id: "Won", label: "Enrolled", count: 64 },
];

const STATUS_CONFIG: Record<LeadStatus, { icon: React.ElementType, bg: string, text: string }> = {
  New:       { icon: Inbox, bg: "#f3f4f6", text: "#4b5563" },
  Contacted: { icon: MessageSquare, bg: "#eff6ff", text: "#2563eb" },
  Trial:     { icon: Clock, bg: "#fef3c7", text: "#d97706" },
  Won:       { icon: CheckCircle2, bg: "#ecfdf5", text: "#059669" },
  Lost:      { icon: XCircle, bg: "#fef2f2", text: "#dc2626" },
};

/* ──────────────────────────────────
   PAGE COMPONENT
────────────────────────────────── */
export default function LeadsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedLead, setExpandedLead] = useState<string | null>(null);

  const filteredLeads = LEADS.filter(lead => {
    const matchesTab = activeTab === "All" || lead.status === activeTab;
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lead.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="billing-page">
      {/* Servam AI / VJ Minimal Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-[#111] font-matter tracking-tight leading-tight">Leads</h1>
          <p className="text-[14px] text-gray-500 mt-1 font-matter">Manage prospective students and track conversions.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#111] text-white rounded-xl text-[13px] font-bold hover:bg-black transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
          <UserPlus className="w-4 h-4" /> Add Lead
        </button>
      </div>

      {/* Main Content Area - Combined Table & Filters */}
      <div className="bg-white border border-gray-200 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        
        {/* Top Controls Bar */}
        <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#fcfcfc]">
          
          {/* Servam-style minimal tabs */}
          <div className="flex gap-1 overflow-x-auto hide-scrollbar">
            <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
            {FUNNELS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all ${
                  activeTab === tab.id ? "bg-white text-[#111] shadow-sm border border-gray-200" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-transparent"
                }`}
              >
                {tab.label}
                <span className={`text-[11px] px-1.5 py-0.5 rounded-md ${activeTab === tab.id ? 'bg-gray-100 text-gray-600' : 'bg-gray-200 text-gray-500'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-matter focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 w-[240px] transition-all"
              />
            </div>
            <button className="p-2 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-[#111] transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* VJ-style Minimal Table */}
        <div className="w-full overflow-x-auto custom-scrollbar">
          <div className="min-w-[850px]">
            {/* Table Header */}
            <div className="grid grid-cols-[minmax(250px,2fr)_1.5fr_1fr_1fr_auto] gap-4 px-6 py-3 border-b border-gray-100 bg-[#f9fafb]">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest font-matter">Lead Profile</div>
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest font-matter">Interest</div>
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest font-matter">Status</div>
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest font-matter">Added</div>
            <div className="w-8"></div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-50">
            {filteredLeads.length === 0 ? (
              <div className="py-16 text-center">
                <Search className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                <p className="text-[14px] text-gray-500 font-matter">No leads found matching your criteria.</p>
              </div>
            ) : (
              filteredLeads.map((lead) => {
                const isExpanded = expandedLead === lead.id;
                const statusConf = STATUS_CONFIG[lead.status];
                const StatusIcon = statusConf.icon;

                return (
                  <React.Fragment key={lead.id}>
                    {/* Main Row */}
                    <div 
                      onClick={() => setExpandedLead(isExpanded ? null : lead.id)}
                      className={`grid grid-cols-[minmax(250px,2fr)_1.5fr_1fr_1fr_auto] gap-4 px-6 items-center cursor-pointer transition-colors ${
                        isExpanded ? "bg-gray-50" : "bg-white hover:bg-gray-50/50"
                      }`}
                      style={{ paddingBottom: isExpanded ? "12px" : "16px", paddingTop: "16px" }}
                    >
                      {/* Name & Avatar */}
                      <div className="flex items-center gap-3">
                        <img src={lead.avatar} alt={lead.name} className="w-10 h-10 rounded-full border border-gray-100" />
                        <div>
                          <p className="text-[14px] font-bold text-[#111] font-matter leading-tight">{lead.name}</p>
                          <p className="text-[12px] text-gray-500 font-matter mt-0.5">{lead.source}</p>
                        </div>
                      </div>

                      {/* Interest */}
                      <div>
                        <p className="text-[13px] font-medium text-[#374151] font-matter">{lead.subject}</p>
                        <p className="text-[12px] text-gray-500 font-matter mt-0.5">{lead.grade}</p>
                      </div>

                      {/* Status Pill */}
                      <div>
                        <div 
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border"
                          style={{ backgroundColor: statusConf.bg, borderColor: `${statusConf.text}20`, color: statusConf.text }}
                        >
                          <StatusIcon className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-bold uppercase tracking-wide font-matter leading-none pt-px">{lead.status}</span>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="text-[13px] text-gray-500 font-matter">{lead.date}</div>

                      {/* Expand Chevron */}
                      <div className="flex justify-end pr-2 text-gray-300">
                        {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                      </div>
                    </div>

                    {/* Expanded Detail Panel */}
                    {isExpanded && (
                      <div className="px-6 pb-6 pt-2 bg-gray-50 border-b border-gray-100">
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col md:flex-row gap-6 md:items-center justify-between">
                          
                          {/* Details Grid */}
                          <div className="flex gap-8">
                            <div>
                              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest font-matter mb-1">Email</p>
                              <a href={`mailto:${lead.email}`} className="text-[13px] text-[#111] font-medium hover:underline flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                                <Mail className="w-3.5 h-3.5 text-gray-400" /> {lead.email}
                              </a>
                            </div>
                            <div>
                              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest font-matter mb-1">Phone</p>
                              <a href={`tel:${lead.phone}`} className="text-[13px] text-[#111] font-medium hover:underline flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                                <Phone className="w-3.5 h-3.5 text-gray-400" /> {lead.phone}
                              </a>
                            </div>
                            <div>
                               <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest font-matter mb-1">Lead ID</p>
                               <p className="text-[13px] text-gray-600 font-mono">{lead.id}</p>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <button className="px-4 py-2 bg-white border border-gray-200 text-[#374151] rounded-lg text-[12px] font-bold hover:bg-gray-50 transition-all font-matter">
                              Log Activity
                            </button>
                            <button className="px-4 py-2 bg-[#111] text-white rounded-lg text-[12px] font-bold hover:bg-black transition-all font-matter flex items-center gap-2 shadow-sm">
                              Move to Contacted <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-2 border border-gray-200 text-gray-400 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                          
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
