"use client";
import { useState } from "react";
import { Star, MessageSquare, TrendingUp, Search, Filter, ThumbsUp, Sparkles, Quote, ChevronRight } from "lucide-react";

/**
 * Premium Frozen Core Sentiment Architecture
 * Minimalist, high-density, text-forward design.
 */

const REVIEWS = [
  { 
    id: 1, 
    student: "Varun Sharma", 
    rating: 5, 
    date: "12 Mar, 2026", 
    comment: "Excellent teaching style! The way you explained React hooks was very clear and easy to understand. Looking forward to the next session.",
    course: "Advanced React.js Patterns",
    helpful: 12
  },
  { 
    id: 2, 
    student: "Sneha Kapur", 
    rating: 4, 
    date: "10 Mar, 2026", 
    comment: "The session was very informative. I would love more practical examples in the next module, but overall a great experience.",
    course: "UI/UX Fundamentals",
    helpful: 8
  },
  { 
    id: 3, 
    student: "Aditya Singh", 
    rating: 5, 
    date: "08 Mar, 2026", 
    comment: "Best teacher for web development! He answered all my doubts patiently and even shared extra resources.",
    course: "Full Stack Mastery",
    helpful: 15
  },
  { 
    id: 4, 
    student: "Priya Das", 
    rating: 5, 
    date: "05 Mar, 2026", 
    comment: "Calculus was always a nightmare for me, but sir made it feel so logical. Highly recommended!",
    course: "Advanced Calculus",
    helpful: 20
  },
];

export default function RatingsPage() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="space-y-12 max-w-[1400px] mx-auto p-6 md:p-10">
      
      {/* 1. Hero / Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100/50">
        <div>
           <div className="flex items-center gap-3 mb-2">
             <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
               <Star className="w-4 h-4 text-white fill-white" />
             </div>
             <span className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">Student Sentiment Core</span>
           </div>
           <h1 className="text-4xl md:text-5xl tracking-tighter text-[#111111] font-medium font-season leading-tight">
             Ratings &<br />Reviews Pipeline.
           </h1>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-black border border-gray-100 shadow-sm rounded-full text-xs font-bold hover:border-gray-300 transition-all active:scale-95">
            <span>Export Analytics</span>
          </button>
        </div>
      </div>

      {/* 2. Top Stats - Frozen Core Minimalist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
        {[
          { label: "Aggregate Score", value: "4.9", sub: "Out of 5.0", icon: Star, trend: "+0.1" },
          { label: "Total Reviews", value: "142", sub: "Verified students", icon: MessageSquare },
          { label: "Response Rate", value: "98%", sub: "Within 24 hours", icon: TrendingUp },
          { label: "Top Percentile", value: "2%", sub: "Web Development Category", icon: Sparkles }
        ].map((stat, i) => (
           <div key={i} className="flex flex-col justify-between p-6 bg-white border border-gray-100 rounded-[24px] hover:border-gray-200 transition-colors shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center">
                  <stat.icon className="w-3 h-3 text-gray-400" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</span>
              </div>
              <div>
                <div className="flex items-end gap-2 mb-2">
                   <div className="text-4xl font-tight tracking-tighter text-[#111111]">{stat.value}</div>
                   {stat.trend && <span className="text-[11px] font-bold text-green-500 mb-1">{stat.trend}</span>}
                </div>
                <p className="text-[11px] font-medium text-gray-400">{stat.sub}</p>
              </div>
           </div>
        ))}
      </div>

      {/* 3. Main Content Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         
         {/* Left Column: Reviews Ledger */}
         <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm">
               
               {/* Controls */}
               <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-10 border-b border-gray-100">
                  <div className="flex items-center gap-6">
                     <h3 className="text-xl font-season font-bold text-[#111111]">Student Ledger</h3>
                     <span className="px-2 py-0.5 bg-gray-50 text-gray-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-100">
                        Past 30 Days
                     </span>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                     <div className="flex-1 sm:flex-none relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                        <input 
                           type="text" 
                           placeholder="Search sentiment..." 
                           className="w-full sm:w-48 pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-[11px] font-medium focus:outline-none placeholder:text-gray-400"
                        />
                     </div>
                     <button className="p-2 border border-gray-100 bg-gray-50 rounded-full text-gray-400 hover:text-black hover:bg-white hover:shadow-sm transition-all">
                        <Filter className="w-4 h-4" />
                     </button>
                  </div>
               </div>

               {/* Reviews List */}
               <div className="divide-y divide-gray-50">
                  {REVIEWS.map((review) => (
                     <div key={review.id} className="p-6 sm:p-10 group hover:bg-gray-50/30 transition-colors">
                        <div className="flex flex-col sm:flex-row gap-6">
                           
                           {/* Identity & Meta */}
                           <div className="sm:w-1/3 flex-shrink-0">
                              <div className="flex items-center gap-4 mb-4">
                                 <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-season text-lg">
                                    {review.student[0]}
                                 </div>
                                 <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                       <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-black text-black' : 'text-gray-200'}`} />
                                    ))}
                                 </div>
                              </div>
                              <div>
                                 <h4 className="text-sm font-bold text-[#111111]">{review.student}</h4>
                                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">{review.date}</p>
                                 <p className="text-[11px] font-medium text-gray-500 mt-2">{review.course}</p>
                              </div>
                           </div>

                           {/* Content */}
                           <div className="sm:w-2/3 flex flex-col justify-between">
                              <div className="relative">
                                 <Quote className="absolute -top-2 -left-3 w-6 h-6 text-gray-100 rotate-180" />
                                 <p className="text-[15px] leading-relaxed text-gray-600 relative z-10 font-medium">
                                    "{review.comment}"
                                 </p>
                              </div>
                              
                              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100/50">
                                 <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#111] transition-colors">
                                    <ThumbsUp className="w-3 h-3" />
                                    Helpful ({review.helpful})
                                 </button>
                                 <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors group-hover:translate-x-1 duration-300">
                                    Reply <ChevronRight className="w-3 h-3" />
                                 </button>
                              </div>
                           </div>

                        </div>
                     </div>
                  ))}
               </div>
               
               <div className="p-6 border-t border-gray-100 bg-gray-50/50 text-center">
                  <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                     Load More Activity
                  </button>
               </div>
            </div>
         </div>

         {/* Right Column: Breakdown & Insights */}
         <div className="lg:col-span-4 space-y-6">
            
            {/* Rating Breakdown */}
            <div className="bg-white border border-gray-100 rounded-[24px] p-8 shadow-sm">
               <h3 className="text-xl font-season font-bold text-[#111111] mb-8">Score Distribution</h3>
               <div className="space-y-5">
                  {[5, 4, 3, 2, 1].map((stars) => {
                     const percentages = [82, 12, 4, 2, 0];
                     const p = percentages[5 - stars];
                     return (
                        <div key={stars} className="flex items-center gap-4">
                           <div className="flex items-center gap-1 w-10">
                              <span className="text-[11px] font-bold text-gray-600">{stars}</span>
                              <Star className={`w-3 h-3 ${stars > 3 ? 'text-black fill-black' : 'text-gray-300'}`} />
                           </div>
                           <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                 className="h-full bg-black rounded-full transition-all duration-1000" 
                                 style={{ width: `${p}%` }}
                              />
                           </div>
                           <span className="text-[10px] font-black text-gray-400 min-w-[24px] text-right">{p}%</span>
                        </div>
                     );
                  })}
               </div>
            </div>

            {/* AI Insight / Quality Pulse */}
            <div className="bg-[#111111] rounded-[24px] p-8 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px]" />
               
               <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                     <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/50">Semantic Analysis</span>
               </div>
               
               <h3 className="text-lg font-season font-bold mb-3 relative z-10">Insight Pipeline</h3>
               <p className="text-[11px] text-white/60 mb-8 leading-relaxed relative z-10">
                  Natural language processing identifies strong positive sentiment around technical clarity. Consider increasing Q&A duration.
               </p>
               
               <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                     <span className="text-[11px] text-white/40 uppercase tracking-widest font-black">Delivery Clarity</span>
                     <span className="text-[13px] font-bold text-green-400">9.2 / 10</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                     <span className="text-[11px] text-white/40 uppercase tracking-widest font-black">Responsiveness</span>
                     <span className="text-[13px] font-bold text-green-400">9.5 / 10</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                     <span className="text-[11px] text-white/40 uppercase tracking-widest font-black">Material Quality</span>
                     <span className="text-[13px] font-bold text-amber-400">8.8 / 10</span>
                  </div>
               </div>
            </div>

         </div>

      </div>

    </div>
  );
}
