"use client";
import React from 'react';
import { FileCheck, MessageCircle, Clock, AlertCircle } from 'lucide-react';

const activities = [
  {
    type: 'assignment',
    title: 'Submitted Assignment 4',
    desc: 'Public Speaking - Final Project',
    time: '2 hours ago',
    icon: <FileCheck size={16} className="text-green-600" />,
    bg: 'bg-green-50'
  },
  {
    type: 'feedback',
    title: 'Reviewed Feedback',
    desc: 'Mock Interview Session #2',
    time: 'Yesterday, 4:30 PM',
    icon: <MessageCircle size={16} className="text-blue-600" />,
    bg: 'bg-blue-50'
  },
  {
    type: 'warning',
    title: 'Missed Deadline',
    desc: 'Grammar Assessment quiz',
    time: '2 days ago',
    icon: <AlertCircle size={16} className="text-red-600" />,
    bg: 'bg-red-50'
  },
  {
    type: 'class',
    title: 'Completed Live Class',
    desc: 'Advanced Grammar & Vocab',
    time: '3 days ago',
    icon: <Clock size={16} className="text-purple-600" />,
    bg: 'bg-purple-50'
  }
];

export default function ActivityTimeline() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-gray-900 font-bold">Recent Activity</h3>
        <button className="text-blue-600 text-sm font-bold hover:underline">View All</button>
      </div>

      <div className="p-6">
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-[19px] before:w-px before:bg-gray-100">
          {activities.map((item, idx) => (
            <div key={idx} className="relative flex gap-6">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border-4 border-white ${item.bg}`}>
                {item.icon}
              </div>
              <div className="flex flex-col pt-1">
                <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                <span className="text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-widest">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
