"use client";
import { useState } from "react";
import { Plus, Edit, Trash2, Eye, BookOpen, Video, FileText, ChevronDown, ChevronRight } from "lucide-react";
import "./CourseBuilder.css";

const MOCK_COURSES = [
  {
    id: 1,
    title: "Advanced Mathematics",
    description: "Complete course covering calculus, algebra, and geometry",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400",
    status: "published",
    students: 45,
    lessons: [
      { id: 1, title: "Introduction to Calculus", type: "video", duration: "45 min", order: 1 },
      { id: 2, title: "Derivatives Basics", type: "video", duration: "60 min", order: 2 },
      { id: 3, title: "Practice Problems", type: "assignment", duration: "30 min", order: 3 }
    ]
  },
  {
    id: 2,
    title: "Physics Fundamentals",
    description: "Learn the basics of mechanics and thermodynamics",
    thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400",
    status: "draft",
    students: 0,
    lessons: [
      { id: 4, title: "Newton's Laws", type: "video", duration: "50 min", order: 1 },
      { id: 5, title: "Energy and Work", type: "video", duration: "40 min", order: 2 }
    ]
  }
];

export default function CourseBuilder() {
  const [courses, setCourses] = useState(MOCK_COURSES);
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  const [newCourse, setNewCourse] = useState({ title: '', description: '', thumbnail: '', status: 'draft' });
  const [newLesson, setNewLesson] = useState({ title: '', description: '', contentUrl: '', type: 'video', duration: '' });

  const handleAddLesson = (courseId: number) => {
    setSelectedCourse(courseId);
    setShowLessonModal(true);
  };

  const handleCreateCourse = () => {
    if (!newCourse.title.trim()) return;
    
    setCourses([...courses, {
      id: Date.now(),
      title: newCourse.title,
      description: newCourse.description,
      thumbnail: newCourse.thumbnail || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
      status: newCourse.status,
      students: 0,
      lessons: []
    }]);
    
    setNewCourse({ title: '', description: '', thumbnail: '', status: 'draft' });
    setShowCreateModal(false);
  };

  const handleAddLessonSubmit = () => {
    if (!selectedCourse || !newLesson.title.trim()) return;

    setCourses(courses.map(course => {
      if (course.id === selectedCourse) {
        return {
          ...course,
          lessons: [
            ...course.lessons,
            {
              id: Date.now(),
              title: newLesson.title,
              type: newLesson.type,
              duration: newLesson.duration || '0 min',
              order: course.lessons.length + 1
            }
          ]
        };
      }
      return course;
    }));

    setNewLesson({ title: '', description: '', contentUrl: '', type: 'video', duration: '' });
    setShowLessonModal(false);
  };

  const handleDeleteCourse = (courseId: number) => {
    setCourses(courses.filter(c => c.id !== courseId));
    if (selectedCourse === courseId) setSelectedCourse(null);
  };

  const handleDeleteLesson = (courseId: number, lessonId: number) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          lessons: course.lessons.filter(l => l.id !== lessonId)
        };
      }
      return course;
    }));
  };

  return (
    <div className="billing-page">
      {/* Courses List - Horizontal Scroll */}
      <div className="credits-scroll-container">
        <div className="credits-cards">
          {courses.length === 0 ? (
            <div className="credits-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100%' }}>
              <BookOpen className="w-10 h-10 text-gray-400 mb-2" />
              <p className="text-gray-500 font-matter">No courses yet. Create your first course!</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-4 flex items-center gap-2 px-4 py-2 bg-[#111] text-white rounded-lg hover:bg-black transition-colors font-matter text-sm"
              >
                <Plus className="w-4 h-4" />
                Create Course
              </button>
            </div>
          ) : (
            <>
              {courses.map((course) => (
                <button
                  key={course.id}
                  className={`credits-card ${selectedCourse === course.id ? 'active' : ''}`}
                  onClick={() => setSelectedCourse(course.id)}
                  style={selectedCourse === course.id ? { borderColor: '#111', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)' } : {}}
                >
                  <div className="credits-amount" style={{ fontSize: '20px', lineHeight: '1.2', marginBottom: '12px' }}>
                    {course.title}
                  </div>
                  <div className="credits-label" style={{ marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontSize: '13px' }}>
                    {course.description}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <span className={`ci-badge ${course.status === 'published' ? 'passed' : 'failed'}`}>
                      {course.status}
                    </span>
                    <span className="text-[11px] text-gray-500 font-matter font-medium">
                      {course.lessons.length} lessons
                    </span>
                  </div>
                </button>
              ))}
              
              <button
                className="credits-card"
                onClick={() => setShowCreateModal(true)}
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
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                  <Plus className="w-6 h-6 text-gray-500" />
                </div>
                <span className="font-matter font-medium text-gray-600">Create New Course</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="billing-tabs">
        <div className="billing-tab active" role="tab" aria-selected="true">Course Info</div>
      </div>

      {!selectedCourse ? (
        <div className="empty-state" role="status">
          <img 
            src="https://dashboard.sarvam.ai/assets/empty-table.webp" 
            alt="No course selected" 
            className="empty-image"
          />
          <div className="empty-title">No course selected</div>
          <div className="empty-desc">
            Your course details and lessons will appear here once you select or create a course.
          </div>
        </div>
      ) : (
        <div className="project-metadata">
          {courses.filter(c => c.id === selectedCourse).map(course => (
            <div key={course.id}>
              <div className="meta-header">
                <div className="meta-title-section">
                  <h2 className="meta-title">{course.title}</h2>
                  <span className="meta-username">{course.description}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`ci-badge ${course.status === 'published' ? 'passed' : 'failed'}`}>
                    {course.status}
                  </span>
                  <div className="flex gap-1">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteCourse(course.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="meta-grid">
                <div className="meta-col-main">
                  <div className="info-section">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-matter font-medium text-[15px] text-[#111]">Course Lessons</h3>
                      <button 
                        onClick={() => handleAddLesson(course.id)}
                        className="text-xs font-matter font-medium text-[#4f46e5] hover:text-[#4338ca] transition-colors"
                      >
                        + Add Lesson
                      </button>
                    </div>
                    
                    {course.lessons.length === 0 ? (
                      <div className="text-center py-6 border border-dashed border-gray-200 rounded-xl">
                        <p className="text-sm text-gray-500 font-matter">No lessons added yet.</p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {course.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center gap-3 p-3 border border-[#f0f0f0] rounded-xl hover:border-[#e5e7eb] transition-colors bg-[#fafafa]"
                          >
                            <div className="w-8 h-8 bg-white border border-[#e5e7eb] rounded-lg flex items-center justify-center shrink-0">
                              {lesson.type === "video" ? (
                                <Video className="w-4 h-4 text-[#4f46e5]" />
                              ) : (
                                <FileText className="w-4 h-4 text-[#4f46e5]" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-matter font-medium text-[#111] text-sm truncate">{lesson.title}</div>
                              <div className="font-matter text-xs text-[#6b7280]">{lesson.duration} • {lesson.type}</div>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <button className="p-1.5 hover:bg-white rounded transition-colors border border-transparent hover:border-[#e5e7eb]">
                                <Edit className="w-3.5 h-3.5 text-[#6b7280]" />
                              </button>
                              <button onClick={() => handleDeleteLesson(course.id, lesson.id)} className="p-1.5 hover:bg-red-50 rounded transition-colors border border-transparent hover:border-red-100 text-red-600">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="meta-col-side">
                  <div className="score-section border border-[#f0f0f0]">
                    <div className="score-label">Enrolled Students</div>
                    <div className="score-number">{course.students}</div>
                    <div className="score-max">active learners</div>
                  </div>

                  <button 
                    onClick={() => handleAddLesson(course.id)} 
                    style={{ 
                      width: "100%", padding: "12px 16px", background: "#111", border: "none", 
                      borderRadius: "8px", fontSize: "13px", fontWeight: "500", color: "#fff", 
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      fontFamily: "'Matter', sans-serif", transition: "background 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#000'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#111'}
                  >
                    <Plus className="w-4 h-4" />
                    Add New Lesson
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="agent-loading-backdrop" onClick={() => setShowCreateModal(false)}>
          <div className="agent-loading-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "500px", padding: "0", overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#111", margin: 0, fontFamily: "'Matter', sans-serif" }}>Create New Course</h3>
            </div>
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", fontWeight: "500", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "'Matter', sans-serif" }}>Course Title</label>
                <input value={newCourse.title} onChange={(e) => setNewCourse({...newCourse, title: e.target.value})} placeholder="e.g., Advanced Mathematics" style={{ padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px", fontFamily: "'Matter', sans-serif", outline: "none", transition: "border 0.2s" }} onFocus={(e) => e.target.style.borderColor = "#111"} onBlur={(e) => e.target.style.borderColor = "#e5e7eb"} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", fontWeight: "500", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "'Matter', sans-serif" }}>Description</label>
                <textarea value={newCourse.description} onChange={(e) => setNewCourse({...newCourse, description: e.target.value})} rows={3} placeholder="Describe what students will learn..." style={{ padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px", fontFamily: "'Matter', sans-serif", outline: "none", transition: "border 0.2s", resize: "none" }} onFocus={(e) => e.target.style.borderColor = "#111"} onBlur={(e) => e.target.style.borderColor = "#e5e7eb"} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", fontWeight: "500", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "'Matter', sans-serif" }}>Status</label>
                <select value={newCourse.status} onChange={(e) => setNewCourse({...newCourse, status: e.target.value})} style={{ padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px", fontFamily: "'Matter', sans-serif", outline: "none", transition: "border 0.2s", background: "#fff" }} onFocus={(e) => e.target.style.borderColor = "#111"} onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div style={{ padding: "16px 24px", background: "#fafafa", borderTop: "1px solid #f0f0f0", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setShowCreateModal(false)} style={{ padding: "9px 16px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "6px", color: "#6b7280", fontSize: "13px", fontWeight: "500", cursor: "pointer", fontFamily: "'Matter', sans-serif", transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'} onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}>Cancel</button>
              <button onClick={handleCreateCourse} style={{ padding: "9px 20px", background: "#111", border: "none", borderRadius: "6px", color: "#fff", fontSize: "13px", fontWeight: "500", cursor: "pointer", fontFamily: "'Matter', sans-serif", display: "flex", alignItems: "center", gap: "8px", transition: "background 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = '#000'} onMouseLeave={(e) => e.currentTarget.style.background = '#111'}>
                Create Course
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Lesson Modal */}
      {showLessonModal && (
        <div className="agent-loading-backdrop" onClick={() => setShowLessonModal(false)}>
          <div className="agent-loading-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "500px", padding: "0", overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#111", margin: 0, fontFamily: "'Matter', sans-serif" }}>Add New Lesson</h3>
            </div>
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", fontWeight: "500", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "'Matter', sans-serif" }}>Lesson Title</label>
                <input value={newLesson.title} onChange={(e) => setNewLesson({...newLesson, title: e.target.value})} placeholder="e.g., Introduction to Calculus" style={{ padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px", fontFamily: "'Matter', sans-serif", outline: "none", transition: "border 0.2s" }} onFocus={(e) => e.target.style.borderColor = "#111"} onBlur={(e) => e.target.style.borderColor = "#e5e7eb"} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", fontWeight: "500", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "'Matter', sans-serif" }}>Description</label>
                <textarea value={newLesson.description} onChange={(e) => setNewLesson({...newLesson, description: e.target.value})} rows={2} placeholder="Brief description of the lesson..." style={{ padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px", fontFamily: "'Matter', sans-serif", outline: "none", transition: "border 0.2s", resize: "none" }} onFocus={(e) => e.target.style.borderColor = "#111"} onBlur={(e) => e.target.style.borderColor = "#e5e7eb"} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", fontWeight: "500", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "'Matter', sans-serif" }}>Content URL / Attachment Link</label>
                <input value={newLesson.contentUrl} onChange={(e) => setNewLesson({...newLesson, contentUrl: e.target.value})} placeholder="https://..." style={{ padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px", fontFamily: "'Matter', sans-serif", outline: "none", transition: "border 0.2s" }} onFocus={(e) => e.target.style.borderColor = "#111"} onBlur={(e) => e.target.style.borderColor = "#e5e7eb"} />
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "11px", fontWeight: "500", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "'Matter', sans-serif" }}>Type</label>
                  <select value={newLesson.type} onChange={(e) => setNewLesson({...newLesson, type: e.target.value})} style={{ padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px", fontFamily: "'Matter', sans-serif", outline: "none", transition: "border 0.2s", background: "#fff" }} onFocus={(e) => e.target.style.borderColor = "#111"} onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}>
                    <option value="video">Video Lesson</option>
                    <option value="assignment">Assignment</option>
                    <option value="quiz">Quiz</option>
                    <option value="reading">Reading Material</option>
                  </select>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "11px", fontWeight: "500", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "'Matter', sans-serif" }}>Duration</label>
                  <input value={newLesson.duration} onChange={(e) => setNewLesson({...newLesson, duration: e.target.value})} placeholder="e.g., 45 min" style={{ padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px", fontFamily: "'Matter', sans-serif", outline: "none", transition: "border 0.2s" }} onFocus={(e) => e.target.style.borderColor = "#111"} onBlur={(e) => e.target.style.borderColor = "#e5e7eb"} />
                </div>
              </div>
            </div>
            <div style={{ padding: "16px 24px", background: "#fafafa", borderTop: "1px solid #f0f0f0", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setShowLessonModal(false)} style={{ padding: "9px 16px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "6px", color: "#6b7280", fontSize: "13px", fontWeight: "500", cursor: "pointer", fontFamily: "'Matter', sans-serif", transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'} onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}>Cancel</button>
              <button onClick={handleAddLessonSubmit} style={{ padding: "9px 20px", background: "#111", border: "none", borderRadius: "6px", color: "#fff", fontSize: "13px", fontWeight: "500", cursor: "pointer", fontFamily: "'Matter', sans-serif", display: "flex", alignItems: "center", gap: "8px", transition: "background 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = '#000'} onMouseLeave={(e) => e.currentTarget.style.background = '#111'}>
                Add Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
