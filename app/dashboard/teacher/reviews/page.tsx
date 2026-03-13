"use client";
import { useState } from "react";
import { Star, MessageSquare, Search, Filter, ThumbsUp, Trash2, Send, Clock, User, ChevronRight, BarChart2, MoreHorizontal } from "lucide-react";

/**
 * Enterprise Ratings & Reviews Portal
 * Centralized student feedback and reputation management.
 */

const REVIEWS = [
  { id: 1, student: "Meera Nair", avatar: "https://i.pravatar.cc/150?img=5", rating: 5, date: "2 hours ago", comment: "Excellent teaching style! The way you explained the quantum physics principles was very intuitive and easy to grasp.", course: "Theoretical Physics", status: "Public" },
  { id: 2, student: "Varun Sharma", avatar: "https://i.pravatar.cc/150?img=33", rating: 5, date: "Yesterday", comment: "Highly recommend! Very patient and focused on speaking practice. Helped me clear my Spanish A1 with ease.", course: "Spanish A1", status: "Public" },
  { id: 3, student: "Rahul Verma", avatar: "https://i.pravatar.cc/150?img=11", rating: 4, date: "2 days ago", comment: "Good session, but would appreciate more practice sheets. Looking forward to the next one.", course: "Calculus Core", status: "Public" },
];

export default function ReviewsPage() {
  return (
    <div className="font-matter">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-[28px] font-season font-bold text-[#111827]">Ratings & Feedback</h1>
          <p className="text-gray-500 text-[14px] mt-1">Monitor your professional reputation and student satisfaction across all batches.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        
        {/* Reputation Overview Card */}
        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-6 bg-white p-8 rounded-[32px] border border-gray-200 shadow-sm">
          <div className="md:col-span-3 border-r border-gray-100 pr-8 flex flex-col justify-center items-center">
            <h2 className="text-[52px] font-bold text-[#111827]">4.9</h2>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-amber-400 text-amber-400" />)}
            </div>
            <p className="text-[12px] font-black uppercase text-gray-400 tracking-wider">Total 1,240 Reviews</p>
          </div>
          
          <div className="md:col-span-6 px-8 flex flex-col justify-center space-y-3">
            {[5, 4, 3, 2, 1].map(num => (
              <div key={num} className="flex items-center gap-4">
                <span className="text-[12px] font-bold text-gray-500 w-4">{num}</span>
                <div className="flex-1 bg-gray-50 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-2 rounded-full" style={{ width: num === 5 ? '88%' : num === 4 ? '8%' : '2%' }}></div>
                </div>
                <span className="text-[12px] font-bold text-gray-400 w-8">{num === 5 ? '88%' : num === 4 ? '8%' : '2%'}</span>
              </div>
            ))}
          </div>

          <div className="md:col-span-3 pl-8 flex flex-col justify-center border-l border-gray-100">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[11px] font-black uppercase text-gray-400 tracking-widest mb-1 italic">Completion Rate</p>
                <span className="text-[18px] font-bold text-black">98.2%</span>
              </div>
              <div>
                <p className="text-[11px] font-black uppercase text-gray-400 tracking-widest mb-1 italic">Avg. Response Time</p>
                <span className="text-[18px] font-bold text-black">1.2h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Review List */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[12px] font-black uppercase text-gray-400 tracking-wider">Feed Activity</h3>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 p-2 px-4 bg-white border border-gray-200 rounded-xl transition-all text-gray-400 hover:text-black">
                <Filter size={16} />
                <span className="text-[12px] font-bold uppercase tracking-widest">Sort: Recent</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {REVIEWS.map((rev) => (
              <div key={rev.id} className="bg-white p-8 rounded-[24px] border border-gray-200 shadow-sm hover:border-black transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <img src={rev.avatar} alt={rev.student} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                    <div className="flex flex-col">
                      <span className="text-[17px] font-bold text-[#111827]">{rev.student}</span>
                      <span className="text-[12px] text-gray-400 font-medium italic">{rev.course}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < rev.rating ? "fill-amber-400 text-amber-400" : "fill-gray-100 text-gray-100"} />)}
                    </div>
                    <span className="text-[11px] font-medium text-gray-400">{rev.date}</span>
                  </div>
                </div>
                
                <p className="text-[15px] text-gray-700 leading-relaxed font-matter mb-8">"{rev.comment}"</p>
                
                <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-black hover:bg-gray-50 px-3 py-2 rounded-lg transition-all">
                      <Send size={12} />
                      Reply
                    </button>
                    <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-300 hover:text-black px-3 py-2 rounded-lg transition-all">
                      <ThumbsUp size={12} />
                      Endorse
                    </button>
                  </div>
                  <button className="p-2 text-gray-300 hover:text-black transition-all">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white rounded-[24px] border border-gray-200 p-8 shadow-sm">
            <h3 className="text-[12px] font-black uppercase text-gray-400 tracking-wider mb-6 flex items-center justify-between">
              <span>Profile Strength</span>
              <BarChart2 size={14} className="text-gray-400" />
            </h3>
            <div className="w-full bg-gray-50 rounded-full h-3 h-3 overflow-hidden mb-4">
              <div className="bg-green-500 h-3" style={{ width: '92%' }}></div>
            </div>
            <p className="text-[13px] text-gray-500 leading-relaxed font-medium">Your profile is in the **Top 2%** for student satisfaction in the marketplace.</p>
            <button className="w-full mt-6 py-3 bg-black text-white rounded-xl text-[12px] font-black uppercase tracking-widest shadow-lg hover:bg-black/90 transition-all active:scale-95">Feature My Profile</button>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-[24px] p-8">
            <div className="flex gap-3">
              <Clock size={18} className="text-amber-500 shrink-0" />
              <div>
                <h4 className="text-[14px] font-bold text-amber-900 mb-1">Reputation Alert</h4>
                <p className="text-[11px] text-amber-700 leading-relaxed">Responding to reviews within **12 hours** increases profile trust by **30%** according to our latest marketplace study.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
