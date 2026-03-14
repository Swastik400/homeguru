"use client";
import React, { useState, useCallback } from "react";
import {
  Plus,
  Download,
  Search,
  Filter,
  ChevronDown,
  MoreHorizontal,
  Eye,
  CheckCircle,
  Clock,
  FileText,
  Users,
  BarChart3,
  Copy,
  Trash2,
  X,
  Send,
} from "lucide-react";

const INITIAL_ASSIGNMENTS = [
  {
    id: 1,
    title: "Calculus Problem Set 1",
    course: "Advanced Mathematics",
    dueDate: "20 Mar 2026",
    total: 12,
    graded: 8,
    pending: 4,
    status: "active",
    avgGrade: 82,
    late: 1,
  },
  {
    id: 2,
    title: "Physics Lab Report",
    course: "Physics Fundamentals",
    dueDate: "18 Mar 2026",
    total: 48,
    graded: 48,
    pending: 0,
    status: "closed",
    avgGrade: 76,
    late: 3,
  },
  {
    id: 3,
    title: "Linear Algebra Quiz",
    course: "Matrix Theory",
    dueDate: "25 Mar 2026",
    total: 4,
    graded: 1,
    pending: 3,
    status: "active",
    avgGrade: 91,
    late: 0,
  },
  {
    id: 4,
    title: "English Comprehension Essay",
    course: "English Literature",
    dueDate: "28 Mar 2026",
    total: 22,
    graded: 0,
    pending: 22,
    status: "draft",
    avgGrade: 0,
    late: 0,
  },
  {
    id: 5,
    title: "Organic Chemistry Worksheet",
    course: "Chemistry Advanced",
    dueDate: "22 Mar 2026",
    total: 15,
    graded: 15,
    pending: 0,
    status: "closed",
    avgGrade: 88,
    late: 2,
  },
];

const EMPTY_FORM = { title: "", course: "", dueDate: "", status: "draft" as const };

const INITIAL_SUBMISSIONS = [
  { id: 1, name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?img=5", assignment: "Calculus Problem Set 1", time: "2h ago", status: "pending", grade: null as number | null },
  { id: 2, name: "Michael Chen", avatar: "https://i.pravatar.cc/150?img=8", assignment: "Calculus Problem Set 1", time: "5h ago", status: "graded", grade: 85 },
  { id: 3, name: "Emma Wilson", avatar: "https://i.pravatar.cc/150?img=9", assignment: "Linear Algebra Quiz", time: "1d ago", status: "pending", grade: null },
  { id: 4, name: "Rahul Verma", avatar: "https://i.pravatar.cc/150?img=11", assignment: "Physics Lab Report", time: "3h ago", status: "late", grade: null },
];

const statusStyle: Record<string, string> = {
  active: "bg-gray-900 text-white",
  closed: "bg-gray-100 text-gray-500",
  draft: "bg-white text-gray-400 border border-dashed border-gray-300",
};

const submissionStatusStyle: Record<string, string> = {
  pending: "bg-gray-100 text-gray-600",
  graded: "bg-gray-800 text-white",
  late: "bg-gray-200 text-gray-600",
};

export default function AssignmentGrading() {
  const [assignments, setAssignments] = useState(INITIAL_ASSIGNMENTS);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | "active" | "closed" | "draft">("all");
  const [contextMenu, setContextMenu] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const showToast = useCallback((message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const filtered = assignments.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    const matchTab = tab === "all" || a.status === tab;
    return matchSearch && matchTab;
  });

  const totalPending = assignments.reduce((s, a) => s + a.pending, 0);
  const totalGraded = assignments.reduce((s, a) => s + a.graded, 0);
  const withGrades = assignments.filter((a) => a.avgGrade > 0);
  const avgGrade = withGrades.length
    ? Math.round(withGrades.reduce((s, a) => s + a.avgGrade, 0) / withGrades.length)
    : 0;

  const handleBatchGrade = () => {
    const pendingCount = submissions.filter((s) => s.status === "pending" || s.status === "late").length;
    if (pendingCount === 0) { showToast("No pending submissions to grade.", "info"); return; }
    setSubmissions((prev) =>
      prev.map((s) =>
        s.status === "pending" || s.status === "late"
          ? { ...s, status: "graded", grade: Math.floor(Math.random() * 31) + 70 }
          : s
      )
    );
    setAssignments((prev) =>
      prev.map((a) => a.pending > 0 ? { ...a, graded: a.graded + a.pending, pending: 0 } : a)
    );
    showToast(`Batch graded ${pendingCount} submissions.`);
  };

  const handleSendReminders = () => {
    const pendingSubs = submissions.filter((s) => s.status === "pending" || s.status === "late");
    if (pendingSubs.length === 0) { showToast("No pending students to remind.", "info"); return; }
    showToast(`Reminders sent to ${pendingSubs.length} student${pendingSubs.length > 1 ? "s" : ""}.`);
  };

  const handleGenerateReport = () => {
    const headers = ["Assignment", "Course", "Due Date", "Total", "Graded", "Pending", "Avg Grade", "Status"];
    const rows = assignments.map((a) =>
      [a.title, a.course, a.dueDate, a.total, a.graded, a.pending, a.avgGrade > 0 ? `${a.avgGrade}%` : "N/A", a.status].join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "assignment_report.csv";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Report downloaded as CSV.");
  };

  const quickActions = [
    { label: "Batch grade pending", desc: `${submissions.filter((s) => s.status === "pending" || s.status === "late").length} submissions ready`, icon: CheckCircle, handler: handleBatchGrade },
    { label: "Send reminders", desc: `${submissions.filter((s) => s.status === "pending" || s.status === "late").length} students haven't submitted`, icon: Send, handler: handleSendReminders },
    { label: "Generate report", desc: "Export class analytics", icon: BarChart3, handler: handleGenerateReport },
  ];

  const handleCreate = () => {
    if (!form.title.trim() || !form.course.trim() || !form.dueDate) return;
    const d = new Date(form.dueDate);
    const formatted = `${d.getDate()} ${d.toLocaleString("en", { month: "short" })} ${d.getFullYear()}`;
    setAssignments((prev) => [
      {
        id: Math.max(...prev.map((a) => a.id)) + 1,
        title: form.title.trim(),
        course: form.course.trim(),
        dueDate: formatted,
        total: 0,
        graded: 0,
        pending: 0,
        status: form.status,
        avgGrade: 0,
        late: 0,
      },
      ...prev,
    ]);
    setForm(EMPTY_FORM);
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-gray-900 tracking-tight">
            Assignments
          </h1>
          <p className="text-gray-400 text-[13px] mt-0.5">
            Create, manage, and grade all coursework in one place.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-[12px] font-semibold hover:bg-gray-50 transition-all">
            <Download size={14} />
            Export
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl text-[12px] font-semibold hover:bg-black transition-all"
          >
            <Plus size={14} />
            New Assignment
          </button>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Assignments", value: assignments.length, icon: FileText, change: null },
          { label: "Pending Grades", value: totalPending, icon: Clock, change: "+3 today" },
          { label: "Graded", value: totalGraded, icon: CheckCircle, change: null },
          { label: "Avg. Grade", value: `${avgGrade}%`, icon: BarChart3, change: "+2.4%" },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
              <s.icon size={18} className="text-gray-500" />
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">{s.label}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[20px] font-bold text-gray-900 leading-tight">{s.value}</span>
                {s.change && (
                  <span className="text-[10px] font-semibold text-gray-400">{s.change}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Main Table */}
        <div className="xl:col-span-8 space-y-4">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
              {(["all", "active", "closed", "draft"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3.5 py-1.5 rounded-lg text-[12px] font-semibold capitalize transition-all ${
                    tab === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  type="text"
                  placeholder="Search assignments..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-[12px] w-[200px] outline-none focus:border-gray-400 transition-colors"
                />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-xl text-[12px] font-medium text-gray-500 hover:bg-gray-50">
                <Filter size={13} />
                Filter
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[700px]">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="py-3.5 pl-6 pr-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Assignment</th>
                    <th className="py-3.5 px-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Due</th>
                    <th className="py-3.5 px-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Progress</th>
                    <th className="py-3.5 px-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Avg</th>
                    <th className="py-3.5 px-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="py-3.5 pr-6 pl-4 text-center text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((a) => {
                    const progress = a.total > 0 ? Math.round((a.graded / a.total) * 100) : 0;
                    return (
                      <tr key={a.id} className="hover:bg-gray-50/60 transition-colors group">
                        <td className="py-4 pl-6 pr-4">
                          <div>
                            <p className="text-[13px] font-semibold text-gray-900 group-hover:text-black">{a.title}</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">{a.course}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-[12px] text-gray-600 font-medium">{a.dueDate}</span>
                          {a.late > 0 && (
                            <p className="text-[10px] text-gray-400 mt-0.5">{a.late} late</p>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between w-[100px]">
                              <span className="text-[12px] font-semibold text-gray-700">{a.graded}/{a.total}</span>
                              <span className="text-[10px] text-gray-400">{progress}%</span>
                            </div>
                            <div className="w-[100px] bg-gray-100 rounded-full h-1">
                              <div
                                className="h-1 rounded-full bg-gray-700 transition-all"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-[14px] font-bold text-gray-900">
                            {a.avgGrade > 0 ? `${a.avgGrade}%` : "—"}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${statusStyle[a.status]}`}>
                            {a.status}
                          </span>
                        </td>
                        <td className="py-4 pr-6 pl-4">
                          <div className="flex items-center justify-center gap-1 relative">
                            <button title="View" className="p-2 text-gray-300 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
                              <Eye size={15} />
                            </button>
                            <button
                              title="More"
                              onClick={() => setContextMenu(contextMenu === a.id ? null : a.id)}
                              className="p-2 text-gray-300 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                            >
                              <MoreHorizontal size={15} />
                            </button>
                            {contextMenu === a.id && (
                              <div className="absolute right-0 top-10 z-50 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 w-36">
                                <button className="w-full flex items-center gap-2 px-3.5 py-2 text-[12px] text-gray-600 hover:bg-gray-50">
                                  <Copy size={13} /> Duplicate
                                </button>
                                <button className="w-full flex items-center gap-2 px-3.5 py-2 text-[12px] text-gray-600 hover:bg-gray-50">
                                  <Download size={13} /> Export CSV
                                </button>
                                <button className="w-full flex items-center gap-2 px-3.5 py-2 text-[12px] text-gray-400 hover:bg-gray-50">
                                  <Trash2 size={13} /> Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-400 font-medium">
                Showing <span className="text-gray-700 font-semibold">{filtered.length}</span> of {assignments.length}
              </span>
              <button className="text-[11px] font-semibold text-gray-500 hover:text-gray-900 transition-colors">
                View All →
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="xl:col-span-4 space-y-5">
          {/* Recent Submissions */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users size={15} className="text-gray-400" />
                <h3 className="text-[14px] font-bold text-gray-900">Recent Submissions</h3>
              </div>
              <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                {submissions.filter((s) => s.status === "pending").length} pending
              </span>
            </div>
            <div className="divide-y divide-gray-50">
              {submissions.map((s) => (
                <div key={s.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full border border-gray-100 object-cover" />
                    <div>
                      <p className="text-[12px] font-semibold text-gray-900">{s.name}</p>
                      <p className="text-[10px] text-gray-400">{s.assignment} · {s.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {s.grade !== null ? (
                      <span className="text-[12px] font-bold text-gray-900">{s.grade}%</span>
                    ) : (
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${submissionStatusStyle[s.status]}`}>
                        {s.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 text-center">
              <button className="text-[11px] font-semibold text-gray-500 hover:text-gray-900 transition-colors">
                Open Grading Queue →
              </button>
            </div>
          </div>


          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
            <h3 className="text-[13px] font-bold text-gray-900 mb-1">Quick Actions</h3>
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={action.handler}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                  <action.icon size={14} className="text-gray-500" />
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-gray-800">{action.label}</p>
                  <p className="text-[10px] text-gray-400">{action.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg text-[13px] font-semibold transition-all animate-[slideUp_0.3s_ease-out] ${
          toast.type === "success" ? "bg-gray-900 text-white" : "bg-white text-gray-700 border border-gray-200"
        }`}>
          {toast.type === "success" ? <CheckCircle size={16} /> : <Clock size={16} />}
          {toast.message}
          <button onClick={() => setToast(null)} className="ml-2 opacity-60 hover:opacity-100"><X size={14} /></button>
        </div>
      )}

      {/* New Assignment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-[18px] font-bold text-gray-900 mb-5">New Assignment</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] font-semibold text-gray-500 mb-1">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Calculus Problem Set 2"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-[13px] outline-none focus:border-gray-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-500 mb-1">Course</label>
                <input
                  type="text"
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                  placeholder="e.g. Advanced Mathematics"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-[13px] outline-none focus:border-gray-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-500 mb-1">Due Date</label>
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-[13px] outline-none focus:border-gray-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-500 mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "active" })}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-[13px] outline-none focus:border-gray-400 transition-colors bg-white"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2.5 mt-6">
              <button
                onClick={() => { setShowModal(false); setForm(EMPTY_FORM); }}
                className="px-4 py-2.5 border border-gray-200 rounded-xl text-[12px] font-semibold text-gray-600 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!form.title.trim() || !form.course.trim() || !form.dueDate}
                className="px-4 py-2.5 bg-gray-900 text-white rounded-xl text-[12px] font-semibold hover:bg-black transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Create Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
