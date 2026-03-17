"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, MessageSquare, Star, CheckCircle } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    title: string;
    type: string;
    status: string;
  } | null;
  onSubmit: (feedback: string) => void;
}

export default function FeedbackModal({ isOpen, onClose, task, onSubmit }: FeedbackModalProps) {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isOpen) setFeedback("");
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSubmit(feedback);
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen || !mounted || !task) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[8px]" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-white border border-gray-100 rounded-[32px] shadow-[0_32px_120px_rgba(0,0,0,0.25)] overflow-hidden animate-in fade-in zoom-in duration-500 font-matter">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-widest rounded">
                {task.type}
              </span>
              <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-widest rounded ${
                task.status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {task.status}
              </span>
            </div>
            <h3 className="text-xl font-season font-bold text-black tracking-tight">{task.title}</h3>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-bold">Assignment Feedback</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-all text-gray-400 hover:text-black">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Feedback Textarea */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Your Feedback</label>
              <span className="text-[10px] font-bold text-gray-400">{feedback.length}/500</span>
            </div>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value.slice(0, 500))}
              placeholder="Provide constructive feedback to help the student improve..."
              className="w-full h-40 bg-gray-50/50 border border-gray-100 rounded-2xl p-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all resize-none font-medium"
              required
            />
          </div>

          {/* Quick Tags (Optional flair) */}
          <div className="flex flex-wrap gap-2">
            {['Great Clarity', 'Excellent Vocabulary', 'Needs Practice', 'Solid Effort'].map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => setFeedback(prev => prev ? `${prev} ${tag},` : `${tag},`)}
                className="px-3 py-1.5 bg-white border border-gray-100 hover:border-black text-[11px] font-bold text-gray-500 hover:text-black rounded-full transition-all"
              >
                + {tag}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !feedback.trim()}
              className="w-full py-4 bg-black text-white rounded-full font-black text-[11px] tracking-[0.2em] uppercase hover:bg-black/90 transition-all active:scale-[0.98] disabled:opacity-20 flex items-center justify-center gap-2 shadow-lg"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Submit Feedback</span>
                  <Send size={14} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
