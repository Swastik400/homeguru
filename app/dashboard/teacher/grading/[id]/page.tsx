"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, RotateCcw, FileText, User, Download, FileAudio, ExternalLink } from "lucide-react";
import "@/components/teacher/CourseBuilder.css";

// Re-using mock data for simplicity based on ID
const MOCK_DATA: Record<string, any> = {
  "1": { title: "Spanish Essay", student: "Varun Sharma", submitted: "2 hours ago", course: "Intro to Spanish", content: "Nosotros fuimos a la playa ayer por la tarde...", score: null },
  "2": { title: "Calculus Set #4", student: "Priya Desai", submitted: "Yesterday", course: "Advanced Calculus", content: "Integrals attached in PDF.", score: null },
  "3": { title: "Physics Lab Report", student: "Meera Nair", submitted: "3 hours ago", course: "Quantum Physics", content: "The double slit experiment demonstrates...", score: null },
};

export default function GradeSubmissionView() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const data = MOCK_DATA[id] || MOCK_DATA["1"]; // fallback

  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      router.push("/dashboard/teacher/grading");
    }, 1000);
  };

  return (
    <div className="billing-page">
      {/* Header & Back Action */}
      <div className="mb-6 flex items-center justify-between">
         <button onClick={() => router.back()} className="flex items-center gap-2 text-[13px] font-bold text-gray-500 hover:text-[#111] transition-colors font-matter">
            <ArrowLeft className="w-4 h-4" /> Back to Submissions
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         
         {/* Left Side: Document Viewer */}
         <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white border border-gray-200 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden h-[calc(100vh-180px)] min-h-[500px] flex flex-col">
               
               {/* Viewer Toolbar */}
               <div className="px-6 py-4 border-b border-gray-100 bg-[#fcfcfc] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-gray-100 text-[#111] rounded-lg border border-gray-200">
                        <FileText size={18} />
                     </div>
                     <div>
                        <h2 className="text-[15px] font-bold text-[#111] font-matter leading-tight">{data.title}</h2>
                        <p className="text-[12px] text-gray-500 font-matter">{data.course}</p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <button className="p-2 text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-[#111] transition-colors shadow-sm" title="Download Print">
                        <Download size={16} />
                     </button>
                     <button className="p-2 text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-[#111] transition-colors shadow-sm" title="Open in new window">
                        <ExternalLink size={16} />
                     </button>
                  </div>
               </div>

               {/* Mock Document Canvas */}
               <div className="flex-1 bg-gray-50 p-8 overflow-y-auto flex justify-center">
                  <div className="w-full max-w-2xl bg-white border border-gray-200 rounded shadow-md p-10 min-h-[800px]">
                     <h1 className="text-2xl font-serif font-bold mb-6 border-b pb-4">{data.title}</h1>
                     <p className="font-serif text-gray-800 leading-relaxed text-[15px]">
                        {data.content}
                        <br/><br/>
                        (This is a mock document viewer. In production, this would render a PDF, Word Doc, or image canvas using a library like react-pdf.)
                     </p>
                  </div>
               </div>

            </div>
         </div>

         {/* Right Side: Grading Panel */}
         <div className="lg:col-span-4">
            <div className="bg-white border border-gray-200 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] sticky top-6">
               <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-1">
                     <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200"><User size={14} className="text-gray-500"/></div>
                     <span className="text-[14px] font-bold text-[#111] font-matter">{data.student}</span>
                  </div>
                  <p className="text-[11px] text-gray-400 font-matter ml-11">Submitted {data.submitted}</p>
               </div>

               <div className="p-6 space-y-6">
                  {/* Score Input */}
                  <div>
                     <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest font-matter mb-2">Grade / Score</label>
                     <div className="flex items-center gap-3">
                        <input 
                           type="text" 
                           value={score} 
                           onChange={(e) => setScore(e.target.value)} 
                           placeholder="e.g. 85" 
                           className="w-24 px-4 py-3 bg-[#fcfcfc] border border-gray-200 rounded-xl text-[16px] font-bold text-[#111] font-matter text-center focus:bg-white focus:border-[#111] outline-none transition-all"
                        />
                        <span className="text-[16px] font-bold text-gray-300 font-matter">/ 100</span>
                     </div>
                  </div>

                  {/* Feedback Box */}
                  <div>
                     <label className="flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest font-matter mb-2">
                        <span>Feedback</span>
                        <button className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors lowercase"><FileAudio size={12}/> voice note</button>
                     </label>
                     <textarea 
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Write constructive feedback for the student..."
                        rows={6}
                        className="w-full px-4 py-3 bg-[#fcfcfc] border border-gray-200 rounded-xl text-[13px] text-[#111] font-matter focus:bg-white focus:border-[#111] outline-none transition-all resize-none shadow-sm"
                     />
                  </div>

                  {/* Grading Action Buttons */}
                  <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                     <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-[#111] text-white rounded-xl text-[13px] font-bold shadow-sm hover:bg-black transition-all disabled:opacity-70 disabled:cursor-not-allowed font-matter"
                     >
                        {isSaving ? (
                           <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                           <><CheckCircle size={16} /> Save & Return Grade</>
                        )}
                     </button>
                     
                     <button className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-[13px] font-bold shadow-sm hover:bg-gray-50 transition-all font-matter">
                        <RotateCcw size={16} /> Request Revision
                     </button>
                  </div>
               </div>
            </div>
         </div>

      </div>
    </div>
  );
}
