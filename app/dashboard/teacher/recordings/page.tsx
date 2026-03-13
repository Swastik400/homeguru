"use client";
import { Play, Download, Share2, Search, Video, FileText, Zap, ChevronRight, Clock, User, MoreVertical } from "lucide-react";

/**
 * Enterprise Session Recordings Archive
 * Video playback portal with AI-driven summarization and quiz generation.
 */

const RECORDINGS = [
  {
    id: "REC-7731",
    title: "Advanced React Hooks & Context",
    course: "React.js Mastery",
    student: "Batch B",
    date: "12 Mar, 2026",
    duration: "1h 24m",
    size: "420 MB",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80",
    hasSummary: true,
    hasQuiz: false
  },
  {
    id: "REC-7745",
    title: "Intro to Spanish Phonetics",
    course: "Spanish A1",
    student: "Varun Sharma",
    date: "11 Mar, 2026",
    duration: "45m",
    size: "180 MB",
    thumbnail: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&q=80",
    hasSummary: true,
    hasQuiz: true
  },
  {
    id: "REC-7758",
    title: "Calculus: Integration by Parts",
    course: "Advanced Calculus",
    student: "Priya Desai",
    date: "10 Mar, 2026",
    duration: "1h 10m",
    size: "350 MB",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80",
    hasSummary: false,
    hasQuiz: false
  }
];

export default function RecordingsPage() {
  return (
    <>
      <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
         <div>
            <h1 className="text-[28px] font-season font-bold text-[#111827]">Session Recordings</h1>
            <p className="text-gray-500 text-[14px] mt-1">Review your past classes, generate AI summaries, and share materials with students.</p>
         </div>
         
         <div className="flex items-center gap-4 bg-white border border-gray-200 px-4 py-2 rounded-xl focus-within:ring-2 focus-within:ring-black/5 transition-all w-full max-w-[320px]">
            <Search size={16} className="text-gray-400" />
            <input type="text" placeholder="Search by topic or student..." className="bg-transparent border-none outline-none text-[13px] text-[#111] placeholder-gray-400 w-full" />
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        
        {/* Recordings Grid */}
        <div className="lg:col-span-9">
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {RECORDINGS.map((rec) => (
                 <div key={rec.id} className="bg-white rounded-[24px] border border-gray-200 shadow-sm overflow-hidden group hover:border-black transition-all">
                    {/* Thumbnail */}
                    <div className="aspect-video relative overflow-hidden">
                       <img src={rec.thumbnail} alt={rec.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl">
                             <Play size={20} className="text-black ml-1" fill="black" />
                          </div>
                       </div>
                       <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded-md text-white text-[10px] font-bold">
                          {rec.duration}
                       </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                       <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{rec.course}</span>
                          <MoreVertical size={14} className="text-gray-400 cursor-pointer" />
                       </div>
                       <h3 className="text-[15px] font-bold text-[#111827] leading-tight mb-3 line-clamp-1">{rec.title}</h3>
                       
                       <div className="flex items-center gap-3 mb-5">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500">
                             <User size={10} />
                             <span>{rec.student}</span>
                          </div>
                          <span className="text-gray-200 text-[11px]">|</span>
                          <span className="text-[11px] text-gray-400 font-medium">{rec.date}</span>
                       </div>

                       {/* AI Badge Indicators */}
                       <div className="flex items-center gap-2 mb-5">
                          {rec.hasSummary && (
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 text-green-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-green-100">
                               <FileText size={10} />
                               Summary
                            </div>
                          )}
                          {rec.hasQuiz && (
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-blue-100">
                               <Zap size={10} />
                               Quiz
                            </div>
                          )}
                       </div>

                       <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <button title="Download" className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-all">
                                <Download size={16} />
                             </button>
                             <button title="Share" className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-all">
                                <Share2 size={16} />
                             </button>
                          </div>
                          <button className="flex items-center gap-1 text-[12px] font-black text-[#111827] hover:underline uppercase tracking-widest">
                             Details <ChevronRight size={12} />
                          </button>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* AI Tools & Processing */}
        <div className="lg:col-span-3 flex flex-col gap-6">
           <div className="bg-black text-white rounded-[24px] p-8 shadow-xl">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                 <Zap size={20} className="text-amber-400" />
              </div>
              <h3 className="text-[18px] font-season font-bold mb-3">AI Processing Hub</h3>
              <p className="text-[13px] opacity-70 leading-relaxed font-medium mb-8">Let Osmium AI analyze your sessions to extract key highlights and insights.</p>
              
              <div className="space-y-4">
                 <button className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                    <div className="flex items-center gap-3">
                       <FileText size={18} className="text-green-400" />
                       <span className="text-[13px] font-bold">Generate Summary</span>
                    </div>
                    <ChevronRight size={14} className="opacity-40 group-hover:opacity-100" />
                 </button>
                 <button className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                    <div className="flex items-center gap-3">
                       <Zap size={18} className="text-blue-400" />
                       <span className="text-[13px] font-bold">Generate Quiz</span>
                    </div>
                    <ChevronRight size={14} className="opacity-40 group-hover:opacity-100" />
                 </button>
              </div>
           </div>

           <div className="bg-white rounded-[24px] border border-gray-200 p-8 shadow-sm">
              <h3 className="text-[12px] font-black uppercase text-gray-400 tracking-wider mb-6">Storage Stats</h3>
              <div className="flex items-end justify-between mb-2">
                 <span className="text-[24px] font-bold text-[#111827]">12.8 GB</span>
                 <span className="text-[11px] font-bold text-gray-400 mb-1">of 50 GB used</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mb-8">
                 <div className="bg-black h-1.5 rounded-full" style={{ width: '25.6%' }}></div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                 <Clock size={20} className="text-blue-500 shrink-0" />
                 <p className="text-[11px] text-blue-700 font-bold leading-relaxed">Recorded sessions are auto-archived after 90 days. Upgrade for lifetime storage.</p>
              </div>
           </div>
        </div>

      </div>
    </>
  );
}
