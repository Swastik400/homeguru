"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Download, Share2 } from 'lucide-react';

interface ProgressReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
}

export default function ProgressReportModal({ isOpen, onClose, studentName }: ProgressReportModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!isOpen || !mounted) return null;

  const objectives = [
    { label: "Grammar & Structure", val: 85 },
    { label: "Oral Confidence", val: 92 },
    { label: "Listening Mastery", val: 78 },
    { label: "Writing Precision", val: 82 },
  ];

  const vocab = [
    { label: "Words Mastered", val: "140+" },
    { label: "Lexical Diversity", val: "High" },
    { label: "Retainment Rate", val: "92%" },
  ];

  const fluency = [
    { label: "Pronunciation", val: "Excellent" },
    { label: "Speech Rate", val: "Moderate" },
    { label: "Complexity", val: "4 / 5" },
  ];

  const drawerContent = (
    <div className="fixed inset-0 z-[1200] flex justify-end">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[4px] animate-in fade-in duration-300" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-screen shadow-2xl animate-in slide-in-from-right duration-400 flex flex-col">

        {/* Header */}
        <div className="px-7 py-6 border-b border-gray-100 flex items-start justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Monthly Analysis</span>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">March 2026</span>
            </div>
            <h3 className="text-lg font-bold text-black tracking-tight leading-tight">{studentName}'s Progress Report</h3>
          </div>
          <button onClick={onClose} className="mt-1 p-1.5 text-gray-400 hover:text-black hover:bg-gray-50 rounded-lg transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-7 py-6 space-y-8" style={{ scrollbarWidth: 'none' }}>

          {/* Summary Row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Growth Index", val: "+24%", note: "↑ Above avg" },
              { label: "Knowledge Ret.", val: "88%", note: "~ Consistent" },
              { label: "Milestones", val: "06", note: "★ Premium" },
            ].map((s, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1.5">{s.label}</p>
                <p className="text-base font-black text-black">{s.val}</p>
                <p className="text-[9px] font-bold text-gray-400 mt-0.5">{s.note}</p>
              </div>
            ))}
          </div>

          {/* Core Objectives */}
          <div className="space-y-4">
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-gray-400 border-b border-gray-100 pb-2">Core Learning Objectives</p>
            <div className="space-y-3">
              {objectives.map((o, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-600">{o.label}</span>
                    <span className="text-xs font-black text-black">{o.val}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-900 rounded-full" style={{ width: `${o.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vocabulary Growth */}
          <div className="space-y-3">
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-gray-400 border-b border-gray-100 pb-2">Vocabulary Growth</p>
            <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
              {vocab.map((v, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-2.5 bg-white">
                  <span className="text-xs font-medium text-gray-500">{v.label}</span>
                  <span className="text-sm font-black text-black">{v.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fluency Metrics */}
          <div className="space-y-3">
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-gray-400 border-b border-gray-100 pb-2">Fluency Metrics</p>
            <div className="grid grid-cols-3 gap-2">
              {fluency.map((f, i) => (
                <div key={i} className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-center">
                  <p className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-1">{f.label}</p>
                  <p className="text-xs font-black text-black">{f.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-7 py-5 border-t border-gray-100 flex gap-3 shrink-0">
          <button className="flex-1 py-3 bg-black text-white rounded-full font-black text-[10px] tracking-[0.18em] uppercase hover:bg-black/90 transition-all flex items-center justify-center gap-2 active:scale-95">
            <Download size={13} />
            Export PDF
          </button>
          <button className="flex-1 py-3 bg-white border border-gray-200 text-black rounded-full font-black text-[10px] tracking-[0.18em] uppercase hover:bg-gray-50 transition-all flex items-center justify-center gap-2 active:scale-95">
            <Share2 size={13} />
            Send to Student
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
}
