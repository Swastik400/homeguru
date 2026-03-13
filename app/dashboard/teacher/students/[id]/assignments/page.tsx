"use client";
import React from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  MessageSquare
} from 'lucide-react';

export default function AssignmentsPage() {
  return (
    <div className="space-y-6">
      {/* Header with Search and Add */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="font-bold text-gray-900 text-lg">Assignments & Tasks</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg text-sm font-bold transition-all shadow-md active:scale-95">
          <Plus size={16} />
          Create Task
        </button>
      </div>

      {/* Task Filters */}
      <div className="flex items-center gap-2 border-b border-gray-100 pb-1">
        {['All Tasks', 'Pending', 'In Progress', 'Completed'].map((filter, i) => (
          <button key={filter} className={`px-4 py-2 text-sm font-bold transition-colors ${i === 0 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-900'}`}>
            {filter}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {[
          { title: "Public Speaking - Final Project", status: "Completed", deadline: "Mar 12, 2026", score: "92/100", type: "Project" },
          { title: "Vocabulary Assessment Quiz", status: "Pending Feedback", deadline: "Mar 10, 2026", score: "-", type: "Quiz" },
          { title: "Reading Comprehension #4", status: "In Progress", deadline: "Mar 15, 2026", score: "-", type: "Assignment" },
          { title: "Group Discussion Prep", status: "Not Started", deadline: "Mar 18, 2026", score: "-", type: "Task" }
        ].map((task, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all group">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                  task.status === 'Completed' ? 'bg-green-50 text-green-600 border-green-100' :
                  task.status === 'In Progress' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                  'bg-gray-50 text-gray-400 border-gray-100'
                }`}>
                  <FileText size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-gray-900 font-bold group-hover:text-blue-600 transition-colors">{task.title}</h4>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-widest rounded">
                      {task.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-400">
                    <div className="flex items-center gap-1.5 uppercase tracking-widest">
                      <Clock size={12} />
                      Due {task.deadline}
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5 uppercase tracking-widest">
                       Status: <span className={
                         task.status === 'Completed' ? 'text-green-600' :
                         task.status === 'In Progress' ? 'text-blue-600' :
                         'text-amber-600'
                       }>{task.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 lg:self-center">
                <div className="text-right mr-4 hidden sm:block">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Achievement</p>
                  <p className="text-lg font-black text-gray-900">{task.score}</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-[13px] font-bold transition-all shadow-sm">
                  <MessageSquare size={14} />
                  Feedback
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[13px] font-bold transition-all shadow-md">
                   View Work
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
