"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  CheckCircle,
  XCircle,
  Download,
  Calendar,
  BarChart3,
  TrendingUp,
  AlertCircle,
  Mail,
  MoreVertical,
  Users,
  Clock,
  ArrowUpRight,
  ChevronRight,
  Search,
  Filter,
  Plus,
  Maximize2,
  FileText,
  X,
  Edit3,
  UserCheck,
  UserX,
  Shield,
  Bell,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────
type AttendanceStatus = "Present" | "Absent" | "Late" | "Excused";

interface StudentSession {
  id: number;
  name: string;
  avatar: string;
  course: string;
  date: string;
  joinTime: string;
  leaveTime: string;
  duration: string;
  status: AttendanceStatus;
  engagement: number;
  participation: string;
  cameraOn: boolean;
  msgs: number;
}

// ─── Initial Data ────────────────────────────────────────────────
const INITIAL_SESSIONS: StudentSession[] = [
  {
    id: 1, name: "Arjun Mehta", avatar: "https://i.pravatar.cc/150?img=33",
    course: "Calculus", date: "12 Mar 2026", joinTime: "10:01 AM", leaveTime: "10:58 AM",
    duration: "57 min", status: "Present", engagement: 82, participation: "High", cameraOn: true, msgs: 12,
  },
  {
    id: 2, name: "Priya Patel", avatar: "https://i.pravatar.cc/150?img=44",
    course: "Calculus", date: "12 Mar 2026", joinTime: "10:25 AM", leaveTime: "11:00 AM",
    duration: "35 min", status: "Late", engagement: 52, participation: "Medium", cameraOn: false, msgs: 4,
  },
  {
    id: 3, name: "Rahul Sharma", avatar: "https://i.pravatar.cc/150?img=11",
    course: "Physics 101", date: "12 Mar 2026", joinTime: "-", leaveTime: "-",
    duration: "0 min", status: "Absent", engagement: 0, participation: "None", cameraOn: false, msgs: 0,
  },
  {
    id: 4, name: "Amit Singh", avatar: "https://i.pravatar.cc/150?img=15",
    course: "Calculus", date: "12 Mar 2026", joinTime: "10:00 AM", leaveTime: "10:59 AM",
    duration: "59 min", status: "Present", engagement: 94, participation: "High", cameraOn: true, msgs: 28,
  },
  {
    id: 5, name: "Neha Gupta", avatar: "https://i.pravatar.cc/150?img=5",
    course: "Physics 101", date: "11 Mar 2026", joinTime: "09:00 AM", leaveTime: "09:55 AM",
    duration: "55 min", status: "Present", engagement: 78, participation: "High", cameraOn: true, msgs: 9,
  },
  {
    id: 6, name: "Vikram Reddy", avatar: "https://i.pravatar.cc/150?img=60",
    course: "Physics 101", date: "11 Mar 2026", joinTime: "-", leaveTime: "-",
    duration: "0 min", status: "Excused", engagement: 0, participation: "None", cameraOn: false, msgs: 0,
  },
];

const COURSES = ["All Courses", "Calculus", "Physics 101"];
const DATE_RANGES = ["All Dates", "Today", "Last 7 Days", "This Month"];
const STATUSES: ("Any Status" | AttendanceStatus)[] = ["Any Status", "Present", "Absent", "Late", "Excused"];

const STATUS_THEMES: Record<AttendanceStatus, string> = {
  Present: "bg-[#E6F6EB] text-[#027A48] border-[#A6F4C5]",
  Absent: "bg-[#FFF1F3] text-[#B42318] border-[#FDA29B]",
  Late: "bg-[#FFFAEB] text-[#B54708] border-[#FEDF89]",
  Excused: "bg-[#F9FAFB] text-[#344054] border-[#EAECF0]",
};

// ─── Helpers ─────────────────────────────────────────────────────
function calcDuration(join: string, leave: string): string {
  if (join === "-" || leave === "-") return "0 min";
  const parse = (t: string) => {
    const [time, period] = t.split(" ");
    let [h, m] = time.split(":").map(Number);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return h * 60 + m;
  };
  const diff = parse(leave) - parse(join);
  return diff > 0 ? `${diff} min` : "0 min";
}

function participationLevel(engagement: number): string {
  if (engagement >= 80) return "High";
  if (engagement >= 40) return "Medium";
  if (engagement > 0) return "Low";
  return "None";
}

// ─── Toast Component ─────────────────────────────────────────────
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="flex items-center gap-3 px-5 py-3.5 bg-[#111] text-white rounded-2xl shadow-2xl text-sm font-bold">
        <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 text-white/50 hover:text-white transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ─── Manual Entry Modal ──────────────────────────────────────────
function ManualEntryModal({
  open, onClose, onSave, initial,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<StudentSession, "id" | "avatar" | "participation" | "cameraOn" | "msgs">) => void;
  initial?: StudentSession | null;
}) {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("Calculus");
  const [date, setDate] = useState("16 Mar 2026");
  const [joinTime, setJoinTime] = useState("");
  const [leaveTime, setLeaveTime] = useState("");
  const [status, setStatus] = useState<AttendanceStatus>("Present");
  const [engagement, setEngagement] = useState(80);

  useEffect(() => {
    if (initial) {
      setName(initial.name);
      setCourse(initial.course);
      setDate(initial.date);
      setJoinTime(initial.joinTime === "-" ? "" : initial.joinTime);
      setLeaveTime(initial.leaveTime === "-" ? "" : initial.leaveTime);
      setStatus(initial.status);
      setEngagement(initial.engagement);
    } else {
      setName(""); setCourse("Calculus"); setDate("16 Mar 2026");
      setJoinTime(""); setLeaveTime(""); setStatus("Present"); setEngagement(80);
    }
  }, [initial, open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const jt = joinTime || "-";
    const lt = leaveTime || "-";
    onSave({
      name, course, date,
      joinTime: jt, leaveTime: lt,
      duration: calcDuration(jt, lt),
      status, engagement,
    });
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[480px] mx-4 overflow-hidden animate-in zoom-in-95 fade-in duration-200">
        {/* Header */}
        <div className="px-7 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-season font-bold text-[#111]">
              {initial ? "Edit Attendance" : "Manual Entry"}
            </h2>
            <p className="text-[11px] text-gray-400 mt-0.5">
              {initial ? "Update this student's record" : "Add a new attendance record"}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">
          {/* Student Name */}
          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">Student Name</label>
            <input
              type="text" required value={name} onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Arjun Mehta"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-all outline-none"
            />
          </div>

          {/* Course & Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">Course</label>
              <select value={course} onChange={(e) => setCourse(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-black/5 outline-none appearance-none cursor-pointer">
                <option>Calculus</option>
                <option>Physics 101</option>
              </select>
            </div>
            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">Date</label>
              <input type="text" value={date} onChange={(e) => setDate(e.target.value)}
                placeholder="16 Mar 2026"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-black/5 outline-none" />
            </div>
          </div>

          {/* Join & Leave Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">Join Time</label>
              <input type="text" value={joinTime} onChange={(e) => setJoinTime(e.target.value)}
                placeholder="10:00 AM"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-black/5 outline-none" />
            </div>
            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">Leave Time</label>
              <input type="text" value={leaveTime} onChange={(e) => setLeaveTime(e.target.value)}
                placeholder="11:00 AM"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-black/5 outline-none" />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Status</label>
            <div className="flex gap-2">
              {(["Present", "Late", "Absent", "Excused"] as AttendanceStatus[]).map((s) => (
                <button key={s} type="button" onClick={() => setStatus(s)}
                  className={`flex-1 py-2 rounded-xl text-[11px] font-bold border transition-all ${
                    status === s
                      ? STATUS_THEMES[s] + " ring-2 ring-offset-1 ring-black/10"
                      : "bg-gray-50 text-gray-400 border-gray-100 hover:border-gray-200"
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Engagement */}
          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">
              Engagement — <span className="text-black">{engagement}%</span>
            </label>
            <input type="range" min={0} max={100} value={engagement} onChange={(e) => setEngagement(+e.target.value)}
              className="w-full h-1.5 bg-gray-100 rounded-full appearance-none cursor-pointer accent-black" />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 border border-gray-200 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50 transition-all">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 py-3 bg-black text-white rounded-xl text-xs font-bold shadow-lg hover:bg-black/90 transition-all active:scale-[0.98]">
              {initial ? "Update Record" : "Add Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Row Action Menu ─────────────────────────────────────────────
function RowActionMenu({
  student, onChangeStatus, onEdit, onRemind,
}: {
  student: StudentSession;
  onChangeStatus: (id: number, status: AttendanceStatus) => void;
  onEdit: (s: StudentSession) => void;
  onRemind: (name: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const act = (fn: () => void) => { fn(); setOpen(false); };

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-50 rounded-full transition-all">
        <MoreVertical className="w-3.5 h-3.5" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-100 z-50 py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
          <button onClick={() => act(() => onEdit(student))} className="w-full px-4 py-2 text-left text-[12px] font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition-colors">
            <Edit3 className="w-3.5 h-3.5 text-gray-400" /> Edit Record
          </button>
          <div className="mx-3 my-1 border-t border-gray-50" />
          <button onClick={() => act(() => onChangeStatus(student.id, "Present"))} className="w-full px-4 py-2 text-left text-[12px] font-medium text-green-700 hover:bg-green-50 flex items-center gap-2.5 transition-colors">
            <UserCheck className="w-3.5 h-3.5" /> Mark Present
          </button>
          <button onClick={() => act(() => onChangeStatus(student.id, "Absent"))} className="w-full px-4 py-2 text-left text-[12px] font-medium text-red-700 hover:bg-red-50 flex items-center gap-2.5 transition-colors">
            <UserX className="w-3.5 h-3.5" /> Mark Absent
          </button>
          <button onClick={() => act(() => onChangeStatus(student.id, "Late"))} className="w-full px-4 py-2 text-left text-[12px] font-medium text-amber-700 hover:bg-amber-50 flex items-center gap-2.5 transition-colors">
            <Clock className="w-3.5 h-3.5" /> Mark Late
          </button>
          <button onClick={() => act(() => onChangeStatus(student.id, "Excused"))} className="w-full px-4 py-2 text-left text-[12px] font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2.5 transition-colors">
            <Shield className="w-3.5 h-3.5" /> Mark Excused
          </button>
          <div className="mx-3 my-1 border-t border-gray-50" />
          <button onClick={() => act(() => onRemind(student.name))} className="w-full px-4 py-2 text-left text-[12px] font-medium text-blue-700 hover:bg-blue-50 flex items-center gap-2.5 transition-colors">
            <Bell className="w-3.5 h-3.5" /> Send Reminder
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────
export default function AttendancePage() {
  const [sessions, setSessions] = useState<StudentSession[]>(INITIAL_SESSIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  const [dateFilter, setDateFilter] = useState("All Dates");
  const [statusFilter, setStatusFilter] = useState<"Any Status" | AttendanceStatus>("Any Status");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentSession | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => setToast(msg), []);
  const clearToast = useCallback(() => setToast(null), []);

  // ── Filtering ──
  const filtered = sessions.filter((s) => {
    if (searchTerm && !s.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (courseFilter !== "All Courses" && s.course !== courseFilter) return false;
    if (statusFilter !== "Any Status" && s.status !== statusFilter) return false;
    if (dateFilter === "Today" && s.date !== "16 Mar 2026") return false;
    if (dateFilter === "Last 7 Days") {
      // simple: keep 12 Mar – 16 Mar
      const validDates = ["12 Mar 2026", "13 Mar 2026", "14 Mar 2026", "15 Mar 2026", "16 Mar 2026", "11 Mar 2026", "10 Mar 2026"];
      if (!validDates.includes(s.date)) return false;
    }
    return true;
  });

  // ── Computed stats ──
  const stats = [
    { label: "Total Students", value: String(sessions.length), icon: Users, color: "text-blue-500" },
    { label: "Attendance Rate", value: `${sessions.length ? Math.round((sessions.filter((s) => s.status === "Present" || s.status === "Late").length / sessions.length) * 100) : 0}%`, icon: TrendingUp, color: "text-green-500" },
    { label: "Classes (Week)", value: "12", icon: Calendar, color: "text-purple-500" },
    { label: "Absent Today", value: String(sessions.filter((s) => s.status === "Absent").length), icon: XCircle, color: "text-red-500" },
    { label: "Late Joiners", value: String(sessions.filter((s) => s.status === "Late").length), icon: Clock, color: "text-amber-500" },
  ];

  // ── Select ──
  const allFilteredSelected = filtered.length > 0 && filtered.every((s) => selectedIds.has(s.id));
  const toggleAll = () => {
    if (allFilteredSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((s) => s.id)));
    }
  };
  const toggleOne = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // ── Status change ──
  const changeStatus = (id: number, status: AttendanceStatus) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const isAbsent = status === "Absent" || status === "Excused";
        return {
          ...s,
          status,
          joinTime: isAbsent ? "-" : s.joinTime,
          leaveTime: isAbsent ? "-" : s.leaveTime,
          duration: isAbsent ? "0 min" : s.duration,
          engagement: isAbsent ? 0 : s.engagement,
          participation: isAbsent ? "None" : s.participation,
        };
      })
    );
    showToast(`Status updated to ${status}`);
  };

  // ── Bulk actions ──
  const bulkSetStatus = (status: AttendanceStatus) => {
    if (selectedIds.size === 0) return showToast("Select students first");
    setSessions((prev) =>
      prev.map((s) => {
        if (!selectedIds.has(s.id)) return s;
        const isAbsent = status === "Absent" || status === "Excused";
        return {
          ...s,
          status,
          joinTime: isAbsent ? "-" : s.joinTime,
          leaveTime: isAbsent ? "-" : s.leaveTime,
          duration: isAbsent ? "0 min" : s.duration,
          engagement: isAbsent ? 0 : s.engagement,
          participation: isAbsent ? "None" : s.participation,
        };
      })
    );
    showToast(`${selectedIds.size} student(s) marked as ${status}`);
    setSelectedIds(new Set());
  };

  // ── Save (add or edit) ──
  const handleSave = (data: Omit<StudentSession, "id" | "avatar" | "participation" | "cameraOn" | "msgs">) => {
    if (editingStudent) {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === editingStudent.id
            ? { ...s, ...data, participation: participationLevel(data.engagement) }
            : s
        )
      );
      showToast(`Updated record for ${data.name}`);
    } else {
      const newId = Math.max(0, ...sessions.map((s) => s.id)) + 1;
      const avatarNum = (newId * 7 + 3) % 70;
      setSessions((prev) => [
        ...prev,
        {
          ...data,
          id: newId,
          avatar: `https://i.pravatar.cc/150?img=${avatarNum}`,
          participation: participationLevel(data.engagement),
          cameraOn: data.status === "Present",
          msgs: 0,
        },
      ]);
      showToast(`Added ${data.name} to attendance`);
    }
    setShowModal(false);
    setEditingStudent(null);
  };

  // ── Export CSV ──
  const exportCSV = () => {
    const header = "Name,Course,Date,Join Time,Leave Time,Duration,Status,Engagement\n";
    const rows = filtered
      .map((s) => `"${s.name}","${s.course}","${s.date}","${s.joinTime}","${s.leaveTime}","${s.duration}","${s.status}",${s.engagement}%`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance_report_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Report exported as CSV");
  };

  // ── Open edit ──
  const openEdit = (s: StudentSession) => {
    setEditingStudent(s);
    setShowModal(true);
  };

  return (
    <div className="relative min-h-[calc(100vh-77px)] -m-6 p-6 overflow-x-hidden bg-[#F8F9FA] font-matter">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-50/30 blur-[100px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full bg-purple-50/20 blur-[100px]" />
      </div>

      <div className="max-w-[1600px] mx-auto space-y-10">

        {/* ═══ Page Header ═══ */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-season font-bold text-[#111111] tracking-tight">Presence & Engagement</h1>
            <p className="text-gray-400 text-[12px] mt-0.5">Real-time session tracking, automated reporting, and AI student risk analysis.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={exportCSV} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100/80 text-[#344054] rounded-full text-xs font-bold shadow-sm hover:bg-gray-50 transition-all active:scale-95">
              <Download className="w-4 h-4" />
              <span>Export Reports</span>
            </button>
            <button
              onClick={() => { setEditingStudent(null); setShowModal(true); }}
              className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full text-xs font-bold shadow-lg hover:bg-black/90 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Manual Entry</span>
            </button>
          </div>
        </div>

        {/* ═══ Stats ═══ */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] group hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all">
              <div className="p-1.5 w-fit rounded-lg bg-gray-50 group-hover:bg-white transition-colors mb-3 border border-gray-50/50">
                <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
              </div>
              <h4 className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-0.5">{stat.label}</h4>
              <p className="text-xl font-season font-bold text-[#111111]">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* ═══ Filters ═══ */}
        <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-black rounded-full text-xs font-bold border border-gray-100">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter By</span>
            </div>
            <div className="h-4 w-[1px] bg-gray-100 mx-2 hidden md:block" />
            <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}
              className="bg-transparent border-none text-xs font-bold text-gray-500 focus:ring-0 cursor-pointer outline-none">
              {COURSES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}
              className="bg-transparent border-none text-xs font-bold text-gray-500 focus:ring-0 cursor-pointer outline-none">
              {DATE_RANGES.map((d) => <option key={d}>{d}</option>)}
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="bg-transparent border-none text-xs font-bold text-gray-500 focus:ring-0 cursor-pointer outline-none">
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
            <input
              type="text" placeholder="Search student name..."
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-xs focus:ring-1 focus:ring-black/5 outline-none"
            />
          </div>
        </div>

        {/* ═══ Main Grid ═══ */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

          {/* ── Table ── */}
          <div className="xl:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#111111]/5 flex items-center justify-center">
                    <Calendar className="w-3.5 h-3.5 text-[#111111]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-season font-bold text-[#111111]">Session: Calculus - Differentiation</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                      {filtered.length} record{filtered.length !== 1 ? "s" : ""} · {selectedIds.size > 0 ? `${selectedIds.size} selected` : "None selected"}
                    </p>
                  </div>
                </div>
                <button className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-50 rounded-full transition-all">
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50/30">
                      <th className="py-5 pl-6 pr-2 text-left w-10">
                        <input type="checkbox" checked={allFilteredSelected} onChange={toggleAll}
                          className="w-3.5 h-3.5 rounded border-gray-300 text-black focus:ring-0 cursor-pointer accent-black" />
                      </th>
                      <th className="py-5 pr-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                      <th className="py-5 px-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Timeline</th>
                      <th className="py-5 px-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                      <th className="py-5 px-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Engagement</th>
                      <th className="py-5 pr-8 pl-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-16 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <Users className="w-8 h-8 text-gray-200" />
                            <p className="text-sm font-bold text-gray-300">No records found</p>
                            <p className="text-[11px] text-gray-300">Try adjusting your filters or add a new entry.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filtered.map((s) => (
                        <tr key={s.id} className={`group hover:bg-gray-50/30 transition-all duration-300 ${selectedIds.has(s.id) ? "bg-blue-50/30" : ""}`}>
                          <td className="py-4 pl-6 pr-2">
                            <input type="checkbox" checked={selectedIds.has(s.id)} onChange={() => toggleOne(s.id)}
                              className="w-3.5 h-3.5 rounded border-gray-300 text-black focus:ring-0 cursor-pointer accent-black" />
                          </td>
                          <td className="py-4 pr-3">
                            <div className="flex items-center gap-3">
                              <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm" />
                              <div className="flex flex-col">
                                <span className="text-[13px] font-bold text-[#111111] font-matter">{s.name}</span>
                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wide">{s.course}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-3">
                            <div className="flex flex-col items-center gap-0.5">
                              <span className="text-[11px] font-bold text-[#111111]">{s.joinTime} — {s.leaveTime}</span>
                              <span className="text-[9px] text-gray-400 font-medium">Duration: {s.duration}</span>
                            </div>
                          </td>
                          <td className="py-4 px-3">
                            <div className="flex justify-center">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${STATUS_THEMES[s.status]}`}>
                                {s.status}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-3">
                            <div className="flex flex-col items-center gap-1">
                              <div className="flex items-center gap-1">
                                <span className={`text-[11px] font-black ${s.engagement > 80 ? "text-green-600" : s.engagement > 40 ? "text-orange-500" : "text-gray-400"}`}>
                                  {s.engagement > 0 ? `${s.engagement}%` : "0%"}
                                </span>
                                {s.engagement > 80 && <ArrowUpRight className="w-2.5 h-2.5 text-green-500" />}
                              </div>
                              <div className="w-10 h-[2px] bg-gray-100 rounded-full overflow-hidden">
                                <div className={`h-full ${s.engagement > 80 ? "bg-green-500" : s.engagement > 40 ? "bg-orange-400" : "bg-red-400"}`} style={{ width: `${s.engagement}%` }} />
                              </div>
                            </div>
                          </td>
                          <td className="py-4 pr-6 pl-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => showToast(`Reminder sent to ${s.name}`)}
                                className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-50 rounded-full transition-all"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </button>
                              <RowActionMenu
                                student={s}
                                onChangeStatus={changeStatus}
                                onEdit={openEdit}
                                onRemind={(name) => showToast(`Reminder sent to ${name}`)}
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Bulk action bar */}
              <div className="px-6 py-4 bg-gray-50/40 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Bulk Actions</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => bulkSetStatus("Present")}
                      className="px-3 py-1.5 border border-gray-100 bg-white rounded-full text-[9px] font-black uppercase text-gray-400 hover:text-green-700 hover:border-green-200 hover:bg-green-50 transition-all">
                      Mark Present
                    </button>
                    <button onClick={() => bulkSetStatus("Absent")}
                      className="px-3 py-1.5 border border-gray-100 bg-white rounded-full text-[9px] font-black uppercase text-gray-400 hover:text-red-700 hover:border-red-200 hover:bg-red-50 transition-all">
                      Mark Absent
                    </button>
                  </div>
                  {selectedIds.size > 0 && (
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                      {selectedIds.size} selected
                    </span>
                  )}
                </div>
                <button onClick={() => showToast("Gradebook synced successfully")}
                  className="px-5 py-2.5 bg-[#111111] text-white rounded-full text-xs font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Sync Gradebook
                </button>
              </div>
            </div>

            {/* ── Attendance Heatmap ── */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-season font-bold text-[#111111]">Attendance Momentum</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">Engagement intensity across the academic quarter.</p>
                </div>
                <div className="flex items-center gap-1.5 text-green-600 text-[10px] font-bold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+4% this month</span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col justify-between text-[9px] font-black text-gray-300 uppercase py-1">
                  <span>Mon</span><span>Wed</span><span>Fri</span>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {Array.from({ length: 90 }).map((_, i) => {
                      const intensity = (i * 31 % 100) / 100;
                      const color = intensity > 0.8 ? "bg-black" : intensity > 0.5 ? "bg-gray-400" : intensity > 0.2 ? "bg-gray-200" : "bg-gray-50";
                      return <div key={i} className={`w-3.5 h-3.5 rounded-[3px] ${color} cursor-help transition-all hover:scale-125`} title={`Engagement Level: ${Math.round(intensity * 100)}%`} />;
                    })}
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-black text-gray-300 uppercase tracking-widest pt-1">
                    <span>Jan 2026</span><span>Feb 2026</span><span>Mar 2026</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-50 flex items-center gap-3">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Scale:</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-[2px] bg-gray-50" /><span className="text-[9px] font-medium text-gray-400">Low</span></div>
                  <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-[2px] bg-black" /><span className="text-[9px] font-medium text-gray-400">High</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="xl:col-span-4 space-y-8">

            {/* AI Panel */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-6">
              <div className="flex items-start justify-between">
                <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md uppercase tracking-wider">AI Insight</span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-season font-bold text-[#111111]">Risk Prediction</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">Predictive disengagement trends.</p>
                </div>

                <div className="space-y-3">
                  {/* Risk student (dynamic from data) */}
                  {(() => {
                    const atRisk = sessions.filter((s) => s.status === "Absent");
                    const riskStudent = atRisk[0];
                    if (!riskStudent) return null;
                    return (
                      <div className="p-4 rounded-2xl bg-red-50/50 border border-red-100 group hover:bg-red-50 transition-colors">
                        <div className="flex items-center gap-2.5 mb-2.5">
                          <img src={riskStudent.avatar} alt={riskStudent.name} className="w-7 h-7 rounded-full border border-white shadow-sm" />
                          <div>
                            <p className="text-[12px] font-bold text-red-900 leading-tight">{riskStudent.name}</p>
                            <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">0% Presence</p>
                          </div>
                        </div>
                        <p className="text-[11px] text-red-800/70 font-medium leading-tight font-matter">
                          Missed consecutive sessions. Follow-up recommended.
                        </p>
                        <button onClick={() => showToast(`Reminder sent to ${riskStudent.name}`)}
                          className="mt-3 w-full py-2 bg-white text-red-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-red-200 hover:bg-red-50 transition-all active:scale-95">
                          Send Reminder
                        </button>
                      </div>
                    );
                  })()}

                  <div className="p-4 rounded-2xl bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-matter">Class Pulse</span>
                      <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                    </div>
                    <p className="text-[12px] text-[#111111] font-bold leading-tight">Engagement -12% weekly.</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-medium">Exam prep correlation high.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reports Center */}
            <div className="bg-[#111111] rounded-2xl p-6 text-white relative overflow-hidden group">
              <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/5 rounded-full blur-[80px] group-hover:scale-110 transition-transform duration-1000" />
              <h3 className="text-lg font-season font-bold mb-5">Reports Center</h3>
              <div className="space-y-2.5 relative z-10">
                {[
                  { name: "Monthly Presence", date: "PDF", icon: FileText },
                  { name: "Engagement Audit", date: "CSV", icon: Mail },
                  { name: "Compliance File", date: "Request", icon: CheckCircle },
                ].map((report, i) => (
                  <div key={i} onClick={() => showToast(`Generating ${report.name}...`)}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer border border-white/5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                        <report.icon className="w-3 h-3" />
                      </div>
                      <div>
                        <p className="text-[12px] font-bold">{report.name}</p>
                        <p className="text-[9px] text-white/30 font-medium">{report.date}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-white/20" />
                  </div>
                ))}
              </div>
              <button onClick={exportCSV}
                className="mt-6 w-full py-3.5 bg-white text-[#111111] rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all active:scale-95">
                Visit Archives
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Manual Entry Modal ═══ */}
      <ManualEntryModal
        open={showModal}
        onClose={() => { setShowModal(false); setEditingStudent(null); }}
        onSave={handleSave}
        initial={editingStudent}
      />

      {/* ═══ Toast ═══ */}
      {toast && <Toast message={toast} onClose={clearToast} />}
    </div>
  );
}
