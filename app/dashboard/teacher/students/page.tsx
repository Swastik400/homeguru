"use client";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import StudentStatsCards from '@/components/teacher/StudentStatsCards';
import StudentTable, { Student } from '@/components/teacher/StudentTable';

const INITIAL_STUDENTS: Student[] = [
  {
    id: '1',
    name: "Dhaval Soni",
    avatar: "https://i.pravatar.cc/150?u=1",
    uid: "24BTCSE045",
    class: "B.Tech Sem 3",
    contact: {
      phone: "98638253",
      email: "random@email.com"
    },
    lastActive: {
      time: "9:39 PM",
      date: "6 DEC, 2023"
    },
    submissions: "6 Pending",
    target: "IELTS 7.5+",
    location: "Mumbai, India",
    learningStyle: ["Visual", "Practical"]
  },
  {
    id: '2',
    name: "Sarah Jenkins",
    avatar: "https://i.pravatar.cc/150?u=2",
    uid: "24BTCSE089",
    class: "B.Tech Sem 3",
    contact: {
      phone: "91234567",
      email: "s.jenkins@email.com"
    },
    lastActive: {
      time: "10:15 AM",
      date: "14 MAR, 2026"
    },
    submissions: "All Clear",
    target: "TOEFL 100+",
    location: "Delhi, India",
    learningStyle: ["Conversational"]
  }
];

export default function StudentManagementPage() {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    uid: '',
    class: 'B.Tech Sem 3',
    target: 'IELTS 7.0+',
    location: ''
  });

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newStudent: Student = {
      id: Math.random().toString(36).substring(2, 9),
      name: formData.name,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`,
      uid: formData.uid || `STU${Math.floor(Math.random() * 10000)}`,
      class: formData.class,
      contact: {
        phone: formData.phone || "N/A",
        email: formData.email
      },
      lastActive: {
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()
      },
      submissions: "0 Pending",
      target: formData.target,
      location: formData.location || "Remote",
      learningStyle: ["Visual"] // Default
    };

    setStudents([newStudent, ...students]);
    setIsModalOpen(false);
    setFormData({ name: '', email: '', phone: '', uid: '', class: 'B.Tech Sem 3', target: 'IELTS 7.0+', location: '' });
  };

  return (
    <>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[#111] text-[24px] font-bold">Student Management</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#111] text-white px-5 py-2.5 rounded-xl text-[14px] font-semibold hover:bg-gray-800 transition-all active:scale-95 shadow-sm"
        >
          <Plus size={18} />
          Add Student
        </button>
      </div>

      {/* Stats Section */}
      <StudentStatsCards />

      {/* Table Section */}
      <StudentTable students={students} />

      {/* Add Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Add New Student</h3>
                <p className="text-sm text-gray-500 mt-0.5">Enter details to onboard a new learner.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateStudent} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Varun Sharma"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="varun@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Phone Number</label>
                  <input 
                    type="text" 
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Student UID</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 24BTCSE045"
                    value={formData.uid}
                    onChange={e => setFormData({...formData, uid: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Class / Batch</label>
                  <input 
                    type="text" 
                    placeholder="B.Tech Sem 3"
                    value={formData.class}
                    onChange={e => setFormData({...formData, class: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Target Goal</label>
                  <input 
                    type="text" 
                    placeholder="e.g. IELTS 7.5+"
                    value={formData.target}
                    onChange={e => setFormData({...formData, target: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Location</label>
                  <input 
                    type="text" 
                    placeholder="Mumbai, India"
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="w-full py-3 bg-[#111] text-white font-bold rounded-xl hover:bg-black transition-colors shadow-lg active:scale-95 text-sm"
                >
                  Onboard Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
