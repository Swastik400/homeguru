"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import StudentStatsCards from '@/components/teacher/StudentStatsCards';
import StudentTable, { Student } from '@/components/teacher/StudentTable';
import '@/components/teacher/CourseBuilder.css';

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

  const router = useRouter();

  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

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

  const selectedStudent = students.find(s => s.id === selectedStudentId);

  return (
    <div className="billing-page">
      {/* Page Header is handled partly by the dashboard layout, but we include title if needed. We omit the standalone header in favor of the integrated feel, but keep the stats. */}
      {/* Stats Section */}
      <div className="mb-6">
        <StudentStatsCards />
      </div>

      <div className="flex items-center justify-between mb-4 mt-6">
        <h2 className="text-[18px] font-bold text-[#111] font-matter">Our Students</h2>
      </div>

      {/* Students List - Horizontal Scroll */}
      <div className="credits-scroll-container">
        <div className="credits-cards">
          {students.length === 0 ? (
            <div className="credits-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100%' }}>
              <p className="text-gray-500 font-matter">No students yet. Onboard your first student!</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 flex items-center gap-2 px-4 py-2 bg-[#111] text-white rounded-lg hover:bg-black transition-colors font-matter text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Student
              </button>
            </div>
          ) : (
            <>
              {students.map((student) => (
                <button
                  key={student.id}
                  className={`credits-card ${selectedStudentId === student.id.toString() ? 'active' : ''}`}
                  onClick={() => setSelectedStudentId(student.id.toString())}
                  style={selectedStudentId === student.id.toString() ? { borderColor: '#111', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)' } : {}}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                    <div style={{ textAlign: "left" }}>
                      <div className="credits-amount" style={{ fontSize: '15px', lineHeight: '1.2', marginBottom: '2px' }}>
                        {student.name}
                      </div>
                      <div className="credits-label" style={{ fontSize: '11px', display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <span className="font-mono text-gray-500">{student.uid}</span>
                      </div>
                    </div>
                  </div>
                  <div className="credits-label" style={{ marginBottom: '16px', fontSize: '12px' }}>
                    {student.class}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <span className={`ci-badge passed`} style={{ fontSize: "10px", padding: "2px 6px" }}>
                      Active
                    </span>
                    <span className="text-[11px] text-gray-500 font-matter font-medium bg-gray-50 px-2 py-0.5 rounded-md">
                      {student.submissions}
                    </span>
                  </div>
                </button>
              ))}
              
              <button
                className="credits-card"
                onClick={() => setIsModalOpen(true)}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  background: 'transparent',
                  border: '2px dashed #e5e7eb',
                  boxShadow: 'none',
                  minWidth: '200px'
                }}
              >
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-gray-100 transition-colors">
                  <Plus className="w-5 h-5 text-gray-500" />
                </div>
                <span className="font-matter font-medium text-gray-600 text-[13px]">Add New Student</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="billing-tabs mt-8">
        <div className="billing-tab active" role="tab" aria-selected="true">Student Overview</div>
        <div className="billing-tab" role="tab" aria-selected="false">Analytics</div>
      </div>

      {!selectedStudent ? (
        <div className="empty-state" role="status">
          <img 
            src="https://dashboard.sarvam.ai/assets/empty-table.webp" 
            alt="No student selected" 
            className="empty-image"
          />
          <div className="empty-title">Select a student</div>
          <div className="empty-desc">
            Choose a student card from above to view their detailed performance and information.
          </div>
        </div>
      ) : (
        <div className="project-metadata">
          <div className="meta-header">
            <div className="meta-title-section flex items-center gap-4">
              <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-14 h-14 rounded-full border border-gray-100 shadow-sm" />
              <div>
                <h2 className="meta-title">{selectedStudent.name}</h2>
                <span className="meta-username font-mono mt-1 block">{selectedStudent.uid} • {selectedStudent.class}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="ci-badge passed uppercase text-[10px] tracking-wider font-bold">
                ENROLLED
              </span>
            </div>
          </div>

          <div className="meta-grid">
            <div className="meta-col-main">
              <div className="info-section">
                <h3 className="font-matter font-medium text-[15px] text-[#111] mb-4 pb-2 border-b border-gray-50">Profile Details</h3>
                
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <div className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-1 font-matter">Target Goal</div>
                    <div className="text-[14px] font-medium text-[#111] font-matter flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4f46e5]"></div>
                      {selectedStudent.target || "Not Set"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-1 font-matter">Location</div>
                    <div className="text-[14px] font-medium text-[#111] font-matter">
                      {selectedStudent.location || "Not Provided"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-1 font-matter">Contact Phone</div>
                    <div className="text-[14px] font-medium text-[#111] font-matter font-mono">
                      {selectedStudent.contact.phone}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-1 font-matter">Email Address</div>
                    <div className="text-[14px] font-medium text-[#111] font-matter">
                      {selectedStudent.contact.email}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-2 font-matter">Learning Styles</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.learningStyle?.length ? selectedStudent.learningStyle.map(style => (
                        <span key={style} className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-600 font-matter">
                          {style}
                        </span>
                      )) : (
                        <span className="text-sm text-gray-500 font-matter">No learning styles recorded.</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="meta-col-side flex flex-col gap-4">
              <div className="score-section border border-[#f0f0f0]">
                <div className="score-label">Last Active</div>
                <div className="score-number" style={{ fontSize: "20px" }}>{selectedStudent.lastActive.time}</div>
                <div className="score-max">{selectedStudent.lastActive.date}</div>
              </div>
              
              <div className="score-section border border-[#f0f0f0] bg-gray-50/50">
                <div className="score-label">Submissions</div>
                <div className="score-number" style={{ fontSize: "20px", color: "#d97706" }}>{selectedStudent.submissions}</div>
                <div className="score-max">Awaiting Review</div>
              </div>

              <div className="flex border border-gray-200 rounded-xl overflow-hidden mt-auto">
                <button 
                  onClick={() => router.push('/dashboard/teacher/chat')}
                  className="flex-1 py-3 bg-white text-gray-700 text-[13px] font-semibold hover:bg-gray-50 transition-colors font-matter border-r border-gray-200 flex items-center justify-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  Message
                </button>
                <button 
                  onClick={() => router.push(`/dashboard/teacher/students/${selectedStudent.id}`)}
                  className="flex-1 py-3 bg-[#111] text-white text-[13px] font-semibold hover:bg-black transition-colors font-matter"
                >
                  View Full Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal mimicking CourseBuilder style */}
      {isModalOpen && (
        <div className="agent-loading-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="agent-loading-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "550px", padding: "0", overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#111", margin: 0, fontFamily: "'Matter', sans-serif" }}>Onboard New Student</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateStudent} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", maxHeight: "60vh", overflowY: "auto" }}>
                
                <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "11px", fontWeight: "500", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "'Matter', sans-serif" }}>Full Name *</label>
                  <input type="text" required placeholder="e.g. Varun Sharma" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px", fontFamily: "'Matter', sans-serif", outline: "none", transition: "border 0.2s" }} onFocus={(e) => e.target.style.borderColor = "#111"} onBlur={(e) => e.target.style.borderColor = "#e5e7eb"} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "11px", fontWeight: "500", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "'Matter', sans-serif" }}>Email Address *</label>
                  <input type="email" required placeholder="varun@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px", fontFamily: "'Matter', sans-serif", outline: "none", transition: "border 0.2s" }} onFocus={(e) => e.target.style.borderColor = "#111"} onBlur={(e) => e.target.style.borderColor = "#e5e7eb"} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "11px", fontWeight: "500", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "'Matter', sans-serif" }}>Phone Number</label>
                  <input type="text" placeholder="+91 98765 43210" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px", fontFamily: "'Matter', sans-serif", outline: "none", transition: "border 0.2s" }} onFocus={(e) => e.target.style.borderColor = "#111"} onBlur={(e) => e.target.style.borderColor = "#e5e7eb"} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "11px", fontWeight: "500", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "'Matter', sans-serif" }}>Student UID</label>
                  <input type="text" placeholder="e.g. 24BTCSE045" value={formData.uid} onChange={e => setFormData({...formData, uid: e.target.value})} style={{ padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px", fontFamily: "'Matter', sans-serif", outline: "none", transition: "border 0.2s" }} onFocus={(e) => e.target.style.borderColor = "#111"} onBlur={(e) => e.target.style.borderColor = "#e5e7eb"} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "11px", fontWeight: "500", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "'Matter', sans-serif" }}>Class / Batch</label>
                  <input type="text" placeholder="B.Tech Sem 3" value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})} style={{ padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px", fontFamily: "'Matter', sans-serif", outline: "none", transition: "border 0.2s" }} onFocus={(e) => e.target.style.borderColor = "#111"} onBlur={(e) => e.target.style.borderColor = "#e5e7eb"} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "11px", fontWeight: "500", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "'Matter', sans-serif" }}>Target Goal</label>
                  <input type="text" placeholder="e.g. IELTS 7.5+" value={formData.target} onChange={e => setFormData({...formData, target: e.target.value})} style={{ padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px", fontFamily: "'Matter', sans-serif", outline: "none", transition: "border 0.2s" }} onFocus={(e) => e.target.style.borderColor = "#111"} onBlur={(e) => e.target.style.borderColor = "#e5e7eb"} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "11px", fontWeight: "500", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "'Matter', sans-serif" }}>Location</label>
                  <input type="text" placeholder="Mumbai, India" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} style={{ padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px", fontFamily: "'Matter', sans-serif", outline: "none", transition: "border 0.2s" }} onFocus={(e) => e.target.style.borderColor = "#111"} onBlur={(e) => e.target.style.borderColor = "#e5e7eb"} />
                </div>
              </div>

              <div style={{ padding: "16px 24px", background: "#fafafa", borderTop: "1px solid #f0f0f0", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: "9px 16px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "6px", color: "#6b7280", fontSize: "13px", fontWeight: "500", cursor: "pointer", fontFamily: "'Matter', sans-serif", transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'} onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}>Cancel</button>
                <button type="submit" style={{ padding: "9px 20px", background: "#111", border: "none", borderRadius: "6px", color: "#fff", fontSize: "13px", fontWeight: "500", cursor: "pointer", fontFamily: "'Matter', sans-serif", display: "flex", alignItems: "center", gap: "8px", transition: "background 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = '#000'} onMouseLeave={(e) => e.currentTarget.style.background = '#111'}>
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
