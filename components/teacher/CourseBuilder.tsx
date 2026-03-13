"use client";
import { useState } from "react";
import { Plus, Edit, Trash2, Eye, BookOpen, Video, FileText, ChevronDown, ChevronRight } from "lucide-react";

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

  const toggleCourse = (id: number) => {
    setExpandedCourse(expandedCourse === id ? null : id);
  };

  const handleAddLesson = (courseId: number) => {
    setSelectedCourse(courseId);
    setShowLessonModal(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Course Builder</h2>
            <p className="text-sm text-gray-500 mt-1">Create and manage your courses</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Course
          </button>
        </div>
      </div>

      {/* Courses List */}
      <div className="p-6 space-y-4">
        {courses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No courses yet. Create your first course!</p>
          </div>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="border border-gray-200 rounded-xl overflow-hidden">
              {/* Course Header */}
              <div className="p-4 bg-gray-50 flex items-center gap-4">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{course.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      course.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {course.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{course.lessons.length} lessons</span>
                    <span>{course.students} students enrolled</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                  <button
                    onClick={() => toggleCourse(course.id)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {expandedCourse === course.id ? (
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Lessons List */}
              {expandedCourse === course.id && (
                <div className="p-4 space-y-2">
                  {course.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        {lesson.type === "video" ? (
                          <Video className="w-4 h-4 text-blue-600" />
                        ) : (
                          <FileText className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">{lesson.title}</div>
                        <div className="text-xs text-gray-500">{lesson.duration}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
                          <Edit className="w-3.5 h-3.5 text-gray-600" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
                          <Trash2 className="w-3.5 h-3.5 text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddLesson(course.id)}
                    className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                  >
                    + Add Lesson
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Create New Course</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                <input
                  type="text"
                  placeholder="e.g., Advanced Mathematics"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Describe what students will learn..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  alert("Course created!");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Course
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Lesson Modal */}
      {showLessonModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Add New Lesson</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Title</label>
                <input
                  type="text"
                  placeholder="e.g., Introduction to Calculus"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="video">Video Lesson</option>
                  <option value="assignment">Assignment</option>
                  <option value="quiz">Quiz</option>
                  <option value="reading">Reading Material</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <input
                  type="text"
                  placeholder="e.g., 45 min"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowLessonModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLessonModal(false);
                  alert("Lesson added!");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
