"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  FileText, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Trophy,
  MessageSquare,
  Save
} from 'lucide-react';

interface StudentWorkDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    title: string;
    type: string;
    status: string;
    deadline: string;
    score: string;
  } | null;
  onSubmitGrade: (score: string, feedback: string) => void;
}

export default function StudentWorkDrawer({ isOpen, onClose, task, onSubmitGrade }: StudentWorkDrawerProps) {
  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (task) {
      setScore(task.score === "-" ? "" : task.score.split('/')[0]);
      setFeedback("");
    }
  }, [task, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSubmitGrade(`${score}/100`, feedback);
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen || !mounted || !task) return null;

  const drawerContent = (
    <div className="fixed inset-0 z-[1100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[4px] animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Drawer Container */}
      <div className="relative w-full max-w-xl bg-white h-screen shadow-2xl animate-in slide-in-from-right duration-500 font-matter flex flex-col">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-gray-900">
              <FileText size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-widest rounded">
                  {task.type}
                </span>
                <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-widest rounded border ${
                   task.status === 'Completed' ? 'bg-green-50 text-green-600 border-green-100' : 
                   task.status === 'In Progress' ? 'bg-gray-50 text-gray-900 border-gray-200' :
                   'bg-amber-50 text-amber-600 border-amber-100'
                }`}>
                  {task.status}
                </span>
              </div>
              <h3 className="text-xl font-season font-bold text-black tracking-tight">{task.title}</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-all text-gray-400 hover:text-black">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 hide-scrollbar">
          <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
          
          {/* Submission Details Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Student Submission</h4>
              <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1.5">
                <Clock size={12} />
                Submitted Mar 14, 2026 • 11:24 AM
              </span>
            </div>
            
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 space-y-4">
               <p className="text-sm text-gray-700 leading-relaxed font-medium">
                 {task.type === 'Assignment' ? 
                   "Here is my analysis of the speech 'I Have a Dream'. I've focused on the rhetorical devices used and the impact of the delivery style. I've also attached the supporting document with my notes for the group discussion." :
                   "Project files attached for the Public Speaking final showcase. This includes the presentation slides, the recorded rehearsal video, and the script with annotated pauses."
                 }
               </p>
               
               {/* Mock Attachments */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                 <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl group hover:border-black transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-50 text-red-600 rounded flex items-center justify-center">
                        <FileText size={16} />
                      </div>
                      <div className="truncate max-w-[120px]">
                        <p className="text-[11px] font-bold text-gray-900 truncate">Analysis_Doc.pdf</p>
                        <p className="text-[9px] text-gray-400 font-medium">2.4 MB</p>
                      </div>
                    </div>
                    <button className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-50 rounded-lg">
                      <Download size={14} />
                    </button>
                 </div>
                 <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl group hover:border-black transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded flex items-center justify-center">
                        <ExternalLink size={16} />
                      </div>
                      <div className="truncate max-w-[120px]">
                        <p className="text-[11px] font-bold text-gray-900 truncate">Presentation_Link</p>
                        <p className="text-[9px] text-gray-400 font-medium">Google Slides</p>
                      </div>
                    </div>
                    <button className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-50 rounded-lg">
                      <ExternalLink size={14} />
                    </button>
                 </div>
               </div>
            </div>
          </section>

          {/* Grading & Feedback Form */}
          <form id="grading-form" onSubmit={handleSubmit} className="space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-2">Evaluation & Feedback</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Achievement Score */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                  <Trophy size={14} className="text-amber-500" />
                  Achievement Score
                </label>
                <div className="flex items-end gap-3">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      max="100"
                      min="0"
                      value={score}
                      onChange={(e) => setScore(e.target.value)}
                      placeholder="0"
                      className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 text-lg font-black text-black placeholder:text-gray-200 focus:outline-none focus:border-black transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 font-bold text-sm">/100</span>
                  </div>
                </div>
              </div>
              
              {/* Quick Grade Slider */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Quick Tier</label>
                <div className="flex gap-2">
                  {['75', '85', '95', '100'].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setScore(val)}
                      className={`flex-1 py-1 px-3 border border-gray-100 rounded-lg text-[10px] font-black transition-all ${
                        score === val ? 'bg-black text-white border-black shadow-sm' : 'bg-white text-gray-400 hover:border-black hover:text-black'
                      }`}
                    >
                      {val}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Feedback Content */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                <MessageSquare size={14} />
                Detailed Feedback
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your technical observation and tips for improvement..."
                className="w-full h-40 bg-gray-50/50 border border-gray-100 rounded-2xl p-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black transition-all resize-none font-medium"
              />
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-gray-100 shrink-0 bg-white">
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="px-6 py-4 bg-white border border-gray-200 text-gray-500 rounded-full font-black text-[11px] tracking-[0.2em] uppercase hover:bg-gray-50 hover:text-black transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="grading-form"
              disabled={isSubmitting || !score}
              className="flex-1 py-4 bg-black text-white rounded-full font-black text-[11px] tracking-[0.2em] uppercase hover:bg-black/90 transition-all active:scale-[0.98] disabled:opacity-20 flex items-center justify-center gap-3 shadow-xl"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={16} />
                  Submit Evaluation
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
}
