"use client";
import { useState } from "react";
import { Folder, FileText, Upload, Plus, Search, MoreVertical, Download, Trash2, Share2, Grid, List as ListIcon, HardDrive, Clock, ExternalLink } from "lucide-react";

/**
 * Enterprise File Manager
 * Organized storage for study materials, assignments, and recording exports.
 */

const FILES = [
  { id: 1, name: "Intro_to_Spanish_Notes.pdf", type: "pdf", size: "2.4 MB", date: "12 Mar, 2026", color: "text-red-500" },
  { id: 2, name: "Calculus_Sheet_4.xlsx", type: "sheet", size: "1.1 MB", date: "11 Mar, 2026", color: "text-green-500" },
  { id: 3, name: "Quantum_Physics_Lab_Vid.mp4", type: "video", size: "420 MB", date: "10 Mar, 2026", color: "text-blue-500" },
  { id: 4, name: "Web_Dev_Assets.zip", type: "archive", size: "15.8 MB", date: "09 Mar, 2026", color: "text-amber-500" },
];

const FOLDERS = [
  { name: "Class Materials", items: "12 Files", color: "bg-blue-500" },
  { name: "Assignments", items: "24 Files", color: "bg-purple-500" },
  { name: "Live Recordings", items: "8 Files", color: "bg-green-500" },
  { name: "Student Work", items: "48 Files", color: "bg-amber-500" },
];

export default function FileManagerPage() {
  const [viewMode, setViewMode] = useState("Grid");

  return (
    <>
      <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
         <div>
            <h1 className="text-[28px] font-season font-bold text-[#111827]">File Manager</h1>
            <p className="text-gray-500 text-[14px] mt-1">Manage and organize your class materials, student submissions, and assets.</p>
         </div>
         
         <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-black rounded-xl text-[14px] font-bold shadow-sm hover:bg-gray-50 transition-all active:scale-95">
               <Plus size={18} />
               <span>New Folder</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-xl text-[14px] font-bold shadow-lg hover:bg-black/90 transition-all active:scale-95">
               <Upload size={18} />
               <span>Upload File</span>
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-9">
           
           {/* Folders Section */}
           <h3 className="text-[12px] font-black uppercase text-gray-400 tracking-wider mb-5">Quick Folders</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
              {FOLDERS.map((f, i) => (
                 <div key={i} className="bg-white p-6 rounded-[24px] border border-gray-200 shadow-sm transition-all hover:border-black group cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                       <div className={`w-12 h-12 ${f.color} bg-opacity-10 rounded-2xl flex items-center justify-center`}>
                          <Folder size={24} className={f.color.replace('bg-', 'text-')} />
                       </div>
                       <MoreVertical size={16} className="text-gray-300 group-hover:text-black" />
                    </div>
                    <h4 className="text-[15px] font-bold text-[#111827]">{f.name}</h4>
                    <p className="text-[12px] text-gray-400 font-medium mt-1">{f.items}</p>
                 </div>
              ))}
           </div>

           {/* Recent Files Section */}
           <div className="flex items-center justify-between mb-5">
              <h3 className="text-[12px] font-black uppercase text-gray-400 tracking-wider">Recent Files</h3>
              <div className="flex items-center gap-2 bg-white border border-gray-200 p-1 rounded-xl">
                 <button onClick={() => setViewMode("Grid")} className={`p-1.5 rounded-lg ${viewMode === 'Grid' ? 'bg-black text-white' : 'text-gray-400'}`}><Grid size={14} /></button>
                 <button onClick={() => setViewMode("List")} className={`p-1.5 rounded-lg ${viewMode === 'List' ? 'bg-black text-white' : 'text-gray-400'}`}><ListIcon size={14} /></button>
              </div>
           </div>

           <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto text-left">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#F9FAFB]/50 border-b border-gray-50">
                      <th className="py-4 pl-8 pr-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                      <th className="py-4 px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Size</th>
                      <th className="py-4 px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Modified</th>
                      <th className="py-4 pr-8 pl-4 text-center text-[11px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {FILES.map((file) => (
                      <tr key={file.id} className="group hover:bg-gray-50/50 transition-all">
                        <td className="py-4 pl-8 pr-4">
                          <div className="flex items-center gap-4">
                             <FileText size={20} className={file.color} />
                             <span className="text-[14px] font-bold text-[#111827] group-hover:text-black">{file.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-[13px] font-bold text-gray-700">{file.size}</td>
                        <td className="py-4 px-4 text-[13px] font-medium text-gray-400">{file.date}</td>
                        <td className="py-4 pr-8 pl-4 text-center">
                           <div className="flex items-center justify-center gap-2">
                              <button className="p-2 text-gray-300 hover:text-black hover:bg-white rounded-lg transition-all shadow-sm group-hover:border-gray-200"><Download size={16} /></button>
                              <button className="p-2 text-gray-300 hover:text-black hover:bg-white rounded-lg transition-all shadow-sm group-hover:border-gray-200"><Share2 size={16} /></button>
                              <button className="p-2 text-gray-300 hover:text-red-500 hover:bg-white rounded-lg transition-all shadow-sm group-hover:border-gray-200"><Trash2 size={16} /></button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </div>

        </div>

        {/* Sidebar Stats */}
        <div className="lg:col-span-3 flex flex-col gap-6">
           <div className="bg-white rounded-[24px] border border-gray-200 p-8 shadow-sm">
              <h3 className="text-[12px] font-black uppercase text-gray-400 tracking-wider mb-6 flex items-center justify-between">
                 <span>Storage Status</span>
                 <HardDrive size={14} />
              </h3>
              <div className="flex items-end justify-between mb-2">
                 <span className="text-[24px] font-bold text-[#111827]">4.2 GB</span>
                 <span className="text-[11px] font-bold text-gray-400 mb-1">of 10 GB</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mb-8">
                 <div className="bg-black h-1.5 rounded-full" style={{ width: '42%' }}></div>
              </div>
              
              <div className="space-y-4">
                 {[
                    { label: 'Documents', value: '2.8 GB', color: 'bg-red-500' },
                    { label: 'Media', value: '1.4 GB', color: 'bg-blue-500' },
                 ].map(item => (
                    <div key={item.label} className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                          <span className="text-[12px] font-bold text-gray-700">{item.label}</span>
                       </div>
                       <span className="text-[12px] font-bold text-gray-400">{item.value}</span>
                    </div>
                 ))}
              </div>

              <button className="w-full mt-8 py-3 bg-black text-white rounded-xl text-[12px] font-black uppercase tracking-widest shadow-lg hover:bg-black/90 transition-all active:scale-95">Upgrade Storage</button>
           </div>

           <div className="bg-blue-50 border border-blue-100 rounded-[24px] p-8">
              <div className="flex gap-3">
                 <Clock size={18} className="text-blue-500 shrink-0" />
                 <div>
                    <h4 className="text-[14px] font-bold text-blue-900 mb-1">Backup Complete</h4>
                    <p className="text-[11px] text-blue-700 leading-relaxed">Your materials were successfully synced with **HomeGuru Drive** at 10:45 AM today.</p>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </>
  );
}
