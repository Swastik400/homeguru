"use client";
import { useState } from "react";
import { Menu, X, ShieldCheck, CheckCircle2, AlertCircle, Upload, Eye, User, FileText, MapPin, Briefcase } from "lucide-react";
import TeacherSidebar from "@/components/teacher/TeacherSidebar";
import TeacherHeader from "@/components/teacher/TeacherHeader";

export default function VerificationPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-matter">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <TeacherSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
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
            className="p-2 bg-white rounded-lg shadow-sm border border-[#DCDCDC]"
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4 text-left">
             <div>
               <h1 className="text-[#1A1A1A] text-2xl font-bold font-season">Profile Verification</h1>
               <p className="text-gray-500 text-[14px]">Manage your teacher portfolio and enterprise verification status.</p>
             </div>
             <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-100 rounded-full">
                <ShieldCheck size={16} className="text-green-600" />
                <span className="text-green-700 text-[13px] font-bold uppercase tracking-wide">Elite Verified</span>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 text-left">
             <div className="lg:col-span-8 flex flex-col gap-6">
                {/* Verification Steps */}
                <div className="bg-white border border-[#DCDCDC] rounded-[16px] shadow-sm p-6">
                   <h2 className="text-[#1A1A1A] font-semibold text-[17px] mb-6">Onboarding & KYC Status</h2>
                   <div className="space-y-6">
                      {[
                         { name: 'Identity Verification', desc: 'Valid Government ID attached', status: 'verified', icon: <User size={18} /> },
                         { name: 'Academic Certifications', desc: 'Degree and Teaching certificates', status: 'verified', icon: <FileText size={18} /> },
                         { name: 'Experience Background', desc: '7+ years in high-tier education', status: 'verified', icon: <Briefcase size={18} /> },
                         { name: 'Address Proof', desc: 'Recent utility bill or statement', status: 'pending', icon: <MapPin size={18} /> },
                      ].map((step) => (
                         <div key={step.name} className="flex items-center justify-between p-4 rounded-xl border border-[#F0F0F0] hover:bg-gray-50 transition-colors group">
                            <div className="flex items-center gap-4">
                               <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${step.status === 'verified' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                                  {step.icon}
                               </div>
                               <div className="flex flex-col">
                                  <span className="text-[14px] font-bold text-[#1A1A1A]">{step.name}</span>
                                  <span className="text-[12px] text-gray-400">{step.desc}</span>
                               </div>
                            </div>
                            <div className="flex items-center gap-3">
                               <span className={`text-[10px] font-black uppercase tracking-widest ${step.status === 'verified' ? 'text-green-500' : 'text-amber-500'}`}>
                                  {step.status}
                               </span>
                               <button className="p-2 text-gray-300 hover:text-gray-900">
                                  <Eye size={18} />
                               </button>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>

                {/* Document Upload Area */}
                <div className="bg-white border border-[#DCDCDC] rounded-[16px] p-8 shadow-sm border-dashed border-2 flex flex-col items-center justify-center text-center">
                   <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      <Upload size={28} className="text-gray-400" />
                   </div>
                   <h3 className="text-[#1A1A1A] font-bold text-[18px]">Upload New Documents</h3>
                   <p className="text-gray-500 text-[14px] mb-6 max-w-sm">
                      Drag and drop your certification PDFs here or click to browse. Supported: JPG, PNG, PDF (Max 10MB).
                   </p>
                   <button className="px-8 py-2.5 bg-[#1A1A1A] text-white rounded-full text-[14px] font-bold hover:bg-[#333] transition-colors">
                      Select Files
                   </button>
                </div>
             </div>

             <div className="lg:col-span-4 flex flex-col gap-6">
                {/* Security Status */}
                <div className="bg-white border border-[#DCDCDC] rounded-[16px] p-6 shadow-sm">
                   <h2 className="text-[#1A1A1A] font-semibold text-[17px] mb-4">Security Overview</h2>
                   <div className="flex flex-col gap-4">
                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                         <CheckCircle2 size={16} className="text-green-600 mt-0.5" />
                         <div className="flex flex-col">
                            <span className="text-[13px] font-bold text-green-800">2FA Enabled</span>
                            <span className="text-[11px] text-green-700">Account is highly secure.</span>
                         </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                         <AlertCircle size={16} className="text-amber-600 mt-0.5" />
                         <div className="flex flex-col">
                            <span className="text-[13px] font-bold text-amber-800">KYC Update Due</span>
                            <span className="text-[11px] text-amber-700">Address proof expires in 14 days.</span>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Enterprise Badge Info */}
                <div className="bg-gray-900 rounded-[16px] p-6 text-white shadow-lg">
                   <h3 className="text-[17px] font-bold mb-4 font-season">Elite Badge Status</h3>
                   <p className="text-gray-400 text-[13px] mb-6 leading-relaxed">
                      Elite verification grants priority in the global marketplace and allows for higher hourly rates.
                   </p>
                   <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mb-2">
                      <div className="w-[85%] h-full bg-green-500" />
                   </div>
                   <span className="text-[11px] font-bold text-gray-500">85% towards Diamond Tier</span>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
