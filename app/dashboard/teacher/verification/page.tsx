"use client";
import { useState } from "react";
import { Menu, X, ShieldCheck, CheckCircle2, Circle, Upload, BadgeCheck, FileText, ExternalLink, ChevronRight, AlertCircle, Star } from "lucide-react";
import TeacherSidebar from "@/components/teacher/TeacherSidebar";
import TeacherHeader from "@/components/teacher/TeacherHeader";

const KYC_STEPS = [
  { id: 1, title: "Identity Verification", status: "Completed", desc: "Aadhar or Passport verified.", date: "12 Feb, 2026", icon: <BadgeCheck className="text-green-500" /> },
  { id: 2, title: "Educational Certificates", status: "Partial", desc: "Highest degree pending review.", date: "Pending", icon: <CheckCircle2 className="text-amber-500" /> },
  { id: 3, title: "Background Check", status: "Not Started", desc: "Standard safety screening.", date: "---", icon: <Circle className="text-gray-200" /> },
  { id: 4, title: "Professional Portfolio", status: "Not Started", desc: "Links to GitHub/LinkedIn/Behance.", date: "---", icon: <Circle className="text-gray-200" /> },
];

export default function VerificationPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-matter text-left">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <TeacherSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full z-50 md:hidden animate-in slide-in-from-left">
            <TeacherSidebar isOpen={true} setIsOpen={() => {}} />
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto">
        {/* Mobile Menu Button */}
        <div className="md:hidden fixed top-4 left-4 z-30">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 bg-white rounded-lg shadow-md border border-gray-200"
          >
            {mobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Header */}
        <div className="px-4 md:px-6 lg:px-8 py-4 md:py-6 mt-16 md:mt-0">
          <TeacherHeader />
        </div>

        {/* Content Container */}
        <div className="px-4 md:px-6 lg:px-8 pb-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
             <div>
                <h1 className="text-[#111827] text-[24px] font-bold font-season">Profile Verification</h1>
                <p className="text-gray-500 text-[14px]">Maintain your professional credibility and earn verified badges.</p>
             </div>
             <div className="px-4 py-2 bg-green-50 border border-green-100 rounded-full flex items-center gap-2">
                <ShieldCheck size={18} className="text-green-600" />
                <span className="text-[13px] font-bold text-green-700">72% Verified</span>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Section: KYC Progress (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
               
               {/* Verification List */}
               <div className="bg-white rounded-[20px] border border-gray-200 p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
                  <h2 className="text-[18px] font-bold font-season mb-8">Verification Checklist</h2>
                  
                  <div className="flex flex-col">
                     {KYC_STEPS.map((step, index) => (
                       <div key={step.id} className="group">
                          <div className="flex items-center justify-between py-6 group-hover:bg-gray-50/50 transition-colors px-4 -mx-4 rounded-xl">
                             <div className="flex items-center gap-5">
                                <div className="p-3 bg-[#F2F4F8] rounded-xl text-[#2E3C58]">
                                   {step.icon}
                                </div>
                                <div className="flex flex-col">
                                   <h4 className="text-[15px] font-bold text-[#111827]">{step.title}</h4>
                                   <p className="text-[12px] text-gray-500">{step.desc}</p>
                                </div>
                             </div>
                             
                             <div className="flex items-center gap-8">
                                <div className="flex flex-col text-right sm:block hidden">
                                   <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest block mb-0.5">Updated</span>
                                   <span className="text-[13px] font-medium text-gray-600">{step.date}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                   <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
                                      step.status === 'Completed' ? 'bg-[#F0FDF4] text-[#166534]' : 'bg-[#FDF9EE] text-[#A68A48]'
                                   }`}>
                                      {step.status}
                                   </span>
                                   <button className="text-gray-300 hover:text-black transition-colors">
                                      <ChevronRight size={20} />
                                   </button>
                                </div>
                             </div>
                          </div>
                          {index < KYC_STEPS.length - 1 && <div className="border-t border-dashed border-gray-200 my-1 mx-4"></div>}
                       </div>
                     ))}
                  </div>
               </div>

               {/* Document Upload Area */}
               <div className="bg-white rounded-[20px] border border-gray-200 p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
                  <div className="flex items-center justify-between mb-8">
                     <h2 className="text-[18px] font-bold font-season">Upload Documents</h2>
                     <button className="text-[13px] text-gray-400 hover:text-black transition-colors font-medium">History</button>
                  </div>

                  <div className="border-2 border-dashed border-gray-100 rounded-[24px] p-12 text-center bg-gray-50 hover:bg-white hover:border-gray-200 transition-all cursor-pointer group">
                     <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-105 transition-transform">
                        <Upload size={24} className="text-[#2E3C58]" />
                     </div>
                     <h3 className="text-[16px] font-bold text-[#111827] mb-2">Drop your files here</h3>
                     <p className="text-[13px] text-gray-400 mb-8">PDF, PNG, JPG (Max 5MB per file)</p>
                     
                     <div className="flex flex-wrap items-center justify-center gap-4">
                        <button className="px-6 py-2.5 bg-black text-white rounded-xl text-[14px] font-bold shadow-lg hover:bg-black/90 transition-all">Select Files</button>
                        <button className="px-6 py-2.5 bg-white border border-gray-200 text-[#111827] rounded-xl text-[14px] font-bold shadow-sm hover:bg-gray-50 transition-all">View Gallery</button>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Section: Badges & Info (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
               
               {/* Identity Preview Card */}
               <div className="bg-white rounded-[20px] border border-gray-200 p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] text-center">
                  <div className="w-24 h-24 rounded-full bg-[#f2f4f8] flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-md relative overflow-hidden group">
                     {/* Overlay for Change Photo */}
                     <div className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <Upload size={20} />
                     </div>
                     <span className="text-[32px] font-bold text-[#2e3c58]">T</span>
                  </div>
                  <h3 className="text-[18px] font-bold text-[#111827] mb-1">Teacher Identity</h3>
                  <p className="text-[13px] text-gray-400 mb-6 font-medium tracking-tight font-mono uppercase">ID: HG-TE-88219</p>
                  
                  <div className="flex justify-center gap-2 mb-8">
                     <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500" title="Email Verified">
                        <BadgeCheck size={20} />
                     </div>
                     <div className="w-10 h-10 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-green-500" title="Identity Verified">
                        <ShieldCheck size={20} />
                     </div>
                     <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500" title="Top Instructor">
                        <Star size={20} className="fill-amber-400" />
                     </div>
                  </div>

                  <button className="w-full py-3 border border-gray-200 rounded-xl text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-all">
                     Edit Profile Details
                  </button>
               </div>

               {/* Security Info */}
               <div className="bg-[#111827] rounded-[20px] p-8 text-white relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                     <ShieldCheck size={100} />
                  </div>
                  <div className="relative z-10">
                     <h3 className="text-[18px] font-bold font-season mb-4">Security Notice</h3>
                     <p className="text-gray-400 text-[13px] mb-8 leading-relaxed">
                        Your documents are encrypted and stored in an enterprise-grade vault. We only share verification status, not raw data.
                     </p>
                     
                     <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 group hover:bg-white/10 transition-colors cursor-pointer">
                           <FileText size={18} className="text-gray-400" />
                           <div className="flex-1">
                              <p className="text-[13px] font-bold">Privacy Policy</p>
                              <p className="text-[11px] text-gray-500">How we handle data</p>
                           </div>
                           <ExternalLink size={14} className="text-gray-600 group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 group hover:bg-white/10 transition-colors cursor-pointer">
                           <AlertCircle size={18} className="text-gray-400" />
                           <div className="flex-1">
                              <p className="text-[13px] font-bold">Safe Teaching Guide</p>
                              <p className="text-[11px] text-gray-500">Best practices</p>
                           </div>
                           <ExternalLink size={14} className="text-gray-600 group-hover:text-white transition-colors" />
                        </div>
                     </div>
                  </div>
               </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
