"use client";
import { useState } from "react";
import { ShieldCheck, CheckCircle2, Circle, Upload, BadgeCheck, FileText, ExternalLink, ChevronRight, AlertCircle, Star, Info, FileUp } from "lucide-react";
import "@/components/teacher/CourseBuilder.css";

const KYC_STEPS = [
  { id: 1, title: "Identity Verification", status: "Completed", desc: "Aadhar or Passport verified.", date: "12 Feb, 2026", icon: BadgeCheck, color: "#16a34a" },
  { id: 2, title: "Educational Certificates", status: "Partial", desc: "Highest degree pending review.", date: "Pending", icon: CheckCircle2, color: "#d97706" },
  { id: 3, title: "Background Check", status: "Not Started", desc: "Standard safety screening.", date: "---", icon: Circle, color: "#d1d5db" },
  { id: 4, title: "Professional Portfolio", status: "Not Started", desc: "Links to GitHub/LinkedIn/Behance.", date: "---", icon: Circle, color: "#d1d5db" },
];

export default function VerificationPage() {
  const [dragActive, setDragActive] = useState(false);

  return (
    <div className="billing-page">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-[22px] font-bold text-[#111] font-matter tracking-tight">Profile Verification</h1>
          <p className="text-[13px] text-gray-500 mt-1 font-matter">Maintain your professional credibility and earn verified badges.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#ecfdf5] border border-[#a7f3d0] rounded-xl">
          <ShieldCheck size={16} className="text-[#059669]" />
          <span className="text-[12px] font-bold text-[#059669] font-matter">72% Verified</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Checklist & Upload */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Validation Checklist */}
          <div className="bg-white border border-gray-200 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 bg-[#fcfcfc] flex items-center justify-between">
              <h2 className="text-[15px] font-bold text-[#111] font-matter">Verification Checklist</h2>
              <span className="text-[12px] text-gray-500 font-matter">4 Steps Required</span>
            </div>
            
            <div className="divide-y divide-gray-50">
              {KYC_STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors group cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5">
                        <Icon size={20} style={{ color: step.color }} />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-[#111] font-matter">{step.title}</h4>
                        <p className="text-[12px] text-gray-500 font-matter mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full pl-9 sm:pl-0">
                      <div className="hidden sm:block text-right">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1 font-matter">Updated</span>
                        <span className="text-[12px] font-medium text-gray-700 font-matter">{step.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest font-matter ${
                          step.status === 'Completed' ? 'bg-[#F0FDF4] text-[#166534]' : 
                          step.status === 'Partial' ? 'bg-[#FDF9EE] text-[#A68A48]' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {step.status}
                        </span>
                        <ChevronRight size={16} className="text-gray-300 group-hover:text-[#111] transition-colors" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upload Area */}
          <div className="bg-white border border-gray-200 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-[15px] font-bold text-[#111] font-matter">Upload Documents</h2>
              <button className="text-[12px] font-bold text-gray-400 hover:text-[#111] transition-colors font-matter">View History</button>
            </div>
            
            <div className="p-6">
              <div 
                className={`border-2 border-dashed rounded-[16px] p-10 text-center transition-all cursor-pointer ${
                  dragActive ? "border-[#111] bg-gray-50" : "border-gray-200 bg-[#fcfcfc] hover:border-gray-300 hover:bg-gray-50"
                }`}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 shadow-sm">
                  <FileUp size={20} className="text-gray-600" />
                </div>
                <h3 className="text-[14px] font-bold text-[#111] font-matter mb-1">Click to upload or drag and drop</h3>
                <p className="text-[12px] text-gray-500 font-matter mb-6">PDF, PNG, JPG (Max 5MB per file)</p>
                
                <button className="px-5 py-2.5 bg-[#111] text-white rounded-xl text-[12px] font-bold shadow-sm hover:bg-black transition-all font-matter">
                  Select Files
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Identity & Security */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Identity Card */}
          <div className="project-metadata p-6 text-center">
             <div className="relative w-20 h-20 mx-auto mb-5 group cursor-pointer">
               <div className="w-full h-full rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                 <span className="text-[28px] font-bold text-gray-400 font-matter">T</span>
               </div>
               <div className="absolute inset-0 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <Upload size={18} />
               </div>
             </div>
             
             <h3 className="text-[16px] font-bold text-[#111] font-matter mb-1">Teacher Identity</h3>
             <p className="text-[12px] text-gray-400 font-matter mb-6 font-mono bg-gray-50 inline-block px-3 py-1 rounded-lg border border-gray-100">ID: HG-TE-88219</p>
             
             <div className="flex justify-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-full bg-[#f0f9ff] border border-[#e0f2fe] flex items-center justify-center" title="Email Verified">
                   <BadgeCheck size={16} className="text-[#0284c7]" />
                </div>
                <div className="w-9 h-9 rounded-full bg-[#f0fdf4] border border-[#dcfce7] flex items-center justify-center" title="Identity Verified">
                   <ShieldCheck size={16} className="text-[#16a34a]" />
                </div>
                <div className="w-9 h-9 rounded-full bg-[#fffbeb] border border-[#fef3c7] flex items-center justify-center" title="Top Instructor">
                   <Star size={16} className="fill-[#d97706] text-[#d97706]" />
                </div>
             </div>

             <button className="w-full py-2.5 border border-gray-200 rounded-xl text-[12px] font-bold text-[#111] hover:bg-gray-50 transition-all font-matter">
                Edit Public Profile
             </button>
          </div>

          {/* Security Notice (Dark Card) */}
          <div className="bg-[#111] rounded-[20px] p-6 text-white relative overflow-hidden shadow-xl">
             <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <ShieldCheck size={120} />
             </div>
             <div className="relative z-10">
                <h3 className="text-[15px] font-bold font-matter mb-3 flex items-center gap-2">
                  <ShieldCheck size={16} /> Security Settings
                </h3>
                <p className="text-gray-400 text-[12px] mb-6 font-matter leading-relaxed">
                   Your documents are encrypted and stored in an enterprise-grade vault. We only share verification status, not raw data.
                </p>
                
                <div className="space-y-3">
                   <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                      <FileText size={16} className="text-gray-400" />
                      <div className="flex-1">
                         <p className="text-[12px] font-bold font-matter">Privacy Policy</p>
                         <p className="text-[11px] text-gray-500 font-matter">How we handle data</p>
                      </div>
                      <ExternalLink size={14} className="text-gray-600 group-hover:text-white transition-colors" />
                   </div>
                   <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                      <AlertCircle size={16} className="text-gray-400" />
                      <div className="flex-1">
                         <p className="text-[12px] font-bold font-matter">Safe Teaching Guide</p>
                         <p className="text-[11px] text-gray-500 font-matter">Platform best practices</p>
                      </div>
                      <ExternalLink size={14} className="text-gray-600 group-hover:text-white transition-colors" />
                   </div>
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
