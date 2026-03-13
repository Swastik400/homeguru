"use client";
import React from 'react';
import { 
  File, 
  FileImage, 
  FileVideo, 
  FileText, 
  Folder,
  Download,
  Search,
  Grid,
  List as ListIcon,
  MoreVertical
} from 'lucide-react';

export default function ResourceVaultPage() {
  return (
    <div className="space-y-6 font-matter">
      {/* Search and View Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm flex-1 max-w-md">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search resources, documents, or lessons..." 
            className="bg-transparent border-none outline-none text-sm font-medium text-gray-900 w-full placeholder-gray-400"
          />
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 p-1 rounded-xl shadow-sm">
           <button className="p-1.5 bg-gray-100 text-gray-900 rounded-lg"><Grid size={18} /></button>
           <button className="p-1.5 text-gray-400 hover:bg-gray-50 rounded-lg"><ListIcon size={18} /></button>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Documents", count: "12 files", icon: <FileText size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Videos", count: "8 files", icon: <FileVideo size={20} />, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Images", count: "24 files", icon: <FileImage size={20} />, color: "text-pink-600", bg: "bg-pink-50" },
          { label: "Other", count: "5 files", icon: <File size={20} />, color: "text-amber-600", bg: "bg-amber-50" }
        ].map((cat, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className={`w-10 h-10 rounded-lg ${cat.bg} ${cat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              {cat.icon}
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-0.5">{cat.label}</h4>
            <span className="text-xs text-gray-400 font-medium">{cat.count}</span>
          </div>
        ))}
      </div>

      {/* File List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "Grammar_Cheat_Sheet.pdf", size: "2.4 MB", type: "PDF", icon: <FileText className="text-red-500" /> },
          { name: "Pronunciation_Guide.mp4", size: "45 MB", type: "Video", icon: <FileVideo className="text-purple-500" /> },
          { name: "Meeting_Recording_Mar10.mp4", size: "128 MB", type: "Video", icon: <FileVideo className="text-purple-500" /> },
          { name: "Public_Speaking_Tips.docx", size: "450 KB", type: "Word", icon: <FileText className="text-blue-500" /> },
          { name: "IELTS_Practice_Test.pdf", size: "1.2 MB", type: "PDF", icon: <FileText className="text-red-500" /> },
          { name: "Student_Presentation.pptx", size: "8.6 MB", type: "Slides", icon: <File className="text-orange-500" /> }
        ].map((file, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:border-blue-200 transition-all group flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center shrink-0">
               {file.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="text-sm font-bold text-gray-900 truncate mb-1" title={file.name}>{file.name}</h5>
              <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <span>{file.type}</span>
                <span>•</span>
                <span>{file.size}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
               <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Download size={16} />
               </button>
               <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical size={16} />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
