"use client";
import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  MessageSquare
} from 'lucide-react';
import FeedbackModal from '@/components/teacher/FeedbackModal';
import StudentWorkDrawer from '@/components/teacher/StudentWorkDrawer';

const TASKS = [
  { title: "Public Speaking - Final Project", status: "Completed", deadline: "Mar 12, 2026", score: "92/100", type: "Project" },
  { title: "Vocabulary Assessment Quiz", status: "Pending Feedback", deadline: "Mar 10, 2026", score: "-", type: "Quiz" },
  { title: "Reading Comprehension #4", status: "In Progress", deadline: "Mar 15, 2026", score: "-", type: "Assignment" },
  { title: "Group Discussion Prep", status: "Not Started", deadline: "Mar 18, 2026", score: "-", type: "Task" }
];

export default function AssignmentsPage() {
  const [activeFilter, setActiveFilter] = useState('All Tasks');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<typeof TASKS[0] | null>(null);

  const filteredTasks = TASKS.filter(task => {
    if (activeFilter === 'All Tasks') return true;
    if (activeFilter === 'Pending') return task.status === 'Pending Feedback' || task.status === 'Not Started';
    if (activeFilter === 'In Progress') return task.status === 'In Progress';
    if (activeFilter === 'Completed') return task.status === 'Completed';
    return true;
  });

  const handleFeedbackClick = (task: typeof TASKS[0]) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleWorkClick = (task: typeof TASKS[0]) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };

  const handleFeedbackSubmit = (feedback: string) => {
    console.log(`Feedback for ${selectedTask?.title}:`, feedback);
    alert(`Feedback submitted for ${selectedTask?.title}`);
  };

  const handleGradeSubmit = (score: string, feedback: string) => {
    console.log(`Grade for ${selectedTask?.title}: ${score}. Feedback: ${feedback}`);
    alert(`Grade and feedback submitted for ${selectedTask?.title}`);
  };

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
        {['All Tasks', 'Pending', 'In Progress', 'Completed'].map((filter) => (
          <button 
            key={filter} 
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 text-sm font-bold transition-colors ${activeFilter === filter ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map((task, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm transition-all group">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                  task.status === 'Completed' ? 'bg-green-50 text-green-600 border-green-100' :
                  task.status === 'In Progress' ? 'bg-gray-50 text-gray-900 border-gray-200' :
                  'bg-gray-50 text-gray-400 border-gray-100'
                }`}>
                  <FileText size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-gray-900 font-bold transition-colors">{task.title}</h4>
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
                         task.status === 'In Progress' ? 'text-gray-900' :
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
                <button 
                  onClick={() => handleFeedbackClick(task)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-[13px] font-bold transition-all shadow-sm active:scale-95"
                >
                  <MessageSquare size={14} />
                  Feedback
                </button>
                <button 
                  onClick={() => handleWorkClick(task)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg text-[13px] font-bold transition-all shadow-md active:scale-95"
                >
                   View Work
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <FeedbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        task={selectedTask}
        onSubmit={handleFeedbackSubmit}
      />

      <StudentWorkDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        task={selectedTask}
        onSubmitGrade={handleGradeSubmit}
      />
    </div>
  );
}
