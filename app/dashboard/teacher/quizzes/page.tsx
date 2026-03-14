"use client";
import React, { useState, useRef, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Plus,
  Calendar,
  Clock,
  Users,
  ListTodo,
  Sparkles,
  Edit,
  Eye,
  Download,
  Trash2,
  X,
  BookOpen,
  Shield,
  Zap,
  FileText,
  CheckCircle2,
} from "lucide-react";
import "@/components/teacher/CourseBuilder.css";

/* ──────────────────────────────────────────
   TYPES
────────────────────────────────────────── */
interface Quiz {
  id: string;
  title: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  className: string;
  questions: number;
  maxMarks: number;
  status: "Upcoming" | "Ongoing" | "Completed" | "Draft";
  daysLeft: string;
  avgScore?: number;
  participants?: number;
  type: "Standard" | "AI-Generated" | "Proctored" | "Mock";
  instructions?: string;
  passingMarks?: number;
  negativeMarking?: boolean;
}

/* ──────────────────────────────────────────
   INITIAL DATA
────────────────────────────────────────── */
const INITIAL_QUIZZES: Quiz[] = [
  {
    id: "QZ-001",
    title: "Python Advanced",
    subject: "Computer Science",
    date: "Tue, 12 June 2026",
    time: "10:30 AM",
    duration: "90 mins",
    className: "12th Section B",
    questions: 25,
    maxMarks: 100,
    status: "Upcoming",
    daysLeft: "#3 days Left",
    type: "Standard",
    participants: 30,
    instructions: "No calculators. Open-book not allowed.",
    passingMarks: 40,
    negativeMarking: false,
  },
  {
    id: "QZ-002",
    title: "OOP With C++",
    subject: "Computer Science",
    date: "Thu, 20 June 2026",
    time: "9:00 AM",
    duration: "60 mins",
    className: "B.Tech Sem 3",
    questions: 20,
    maxMarks: 80,
    status: "Upcoming",
    daysLeft: "#11 days Left",
    type: "Standard",
    participants: 45,
    passingMarks: 32,
    negativeMarking: false,
  },
  {
    id: "QZ-003",
    title: "Calculus Mid-Term",
    subject: "Advanced Mathematics",
    date: "Fri, 28 June 2026",
    time: "11:00 AM",
    duration: "120 mins",
    className: "B.Tech Sem 3",
    questions: 40,
    maxMarks: 100,
    status: "Draft",
    daysLeft: "#19 days Left",
    type: "Proctored",
    participants: 48,
    passingMarks: 40,
    negativeMarking: true,
  },
  {
    id: "QZ-004",
    title: "Python Basic",
    subject: "Computer Science",
    date: "11 June, 2025",
    time: "9:30 AM",
    duration: "45 mins",
    className: "12th Section A",
    questions: 30,
    maxMarks: 80,
    status: "Completed",
    daysLeft: "Completed",
    avgScore: 72,
    type: "AI-Generated",
    participants: 38,
    passingMarks: 32,
  },
  {
    id: "QZ-005",
    title: "JAVA Core",
    subject: "Computer Science",
    date: "11 June, 2025",
    time: "2:00 PM",
    duration: "60 mins",
    className: "B.Tech Sem 5",
    questions: 35,
    maxMarks: 80,
    status: "Completed",
    daysLeft: "Completed",
    avgScore: 68,
    type: "AI-Generated",
    participants: 42,
    passingMarks: 32,
  },
  {
    id: "QZ-006",
    title: "Aptitude Analytics",
    subject: "Mathematics",
    date: "11 June, 2025",
    time: "10:00 AM",
    duration: "90 mins",
    className: "MBA Sem 2",
    questions: 50,
    maxMarks: 100,
    status: "Completed",
    daysLeft: "Completed",
    avgScore: 81,
    type: "Mock",
    participants: 55,
    passingMarks: 40,
  },
];

const STATUS_BADGE: Record<Quiz["status"], string> = {
  Upcoming: "bg-blue-50 text-blue-700 border-blue-100",
  Ongoing: "bg-amber-50 text-amber-700 border-amber-100",
  Completed: "bg-green-50 text-green-700 border-green-100",
  Draft: "bg-gray-50 text-gray-500 border-gray-200",
};

const TYPE_BADGE: Record<Quiz["type"], string> = {
  Standard: "bg-indigo-50 text-indigo-600",
  "AI-Generated": "bg-amber-50 text-amber-600",
  Proctored: "bg-purple-50 text-purple-600",
  Mock: "bg-teal-50 text-teal-600",
};

const TYPE_ICONS: Record<Quiz["type"], React.ReactNode> = {
  Standard: <BookOpen className="w-4 h-4" />,
  "AI-Generated": <Zap className="w-4 h-4" />,
  Proctored: <Shield className="w-4 h-4" />,
  Mock: <FileText className="w-4 h-4" />,
};

/* ──────────────────────────────────────────
   INPUT STYLE HELPER
────────────────────────────────────────── */
const inputSx: React.CSSProperties = {
  padding: "9px 12px",
  border: "1px solid #e5e7eb",
  borderRadius: 6,
  fontSize: 13,
  fontFamily: "'Matter', sans-serif",
  outline: "none",
  width: "100%",
  background: "#fff",
  transition: "border 0.2s",
};

const labelSx: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 500,
  color: "#9ca3af",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  fontFamily: "'Matter', sans-serif",
  marginBottom: 4,
  display: "block",
};

/* ──────────────────────────────────────────
   MODAL — CREATE TEST
────────────────────────────────────────── */
function CreateTestModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (q: Quiz) => void;
}) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: "",
    subject: "",
    className: "",
    type: "Standard" as Quiz["type"],
    questions: "",
    maxMarks: "",
    passingMarks: "",
    duration: "",
    negativeMarking: false,
    instructions: "",
  });

  const f = (k: keyof typeof form, v: string | boolean) =>
    setForm((p) => ({ ...p, [k]: v }));

  const isStep1Valid = form.title && form.subject && form.className && form.type;
  const isStep2Valid = form.questions && form.maxMarks && form.duration;

  const handleCreate = () => {
    const id = `QZ-${String(Math.floor(Math.random() * 900) + 100)}`;
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" });
    const newQuiz: Quiz = {
      id,
      title: form.title,
      subject: form.subject,
      className: form.className,
      type: form.type,
      questions: Number(form.questions),
      maxMarks: Number(form.maxMarks),
      passingMarks: form.passingMarks ? Number(form.passingMarks) : Math.round(Number(form.maxMarks) * 0.4),
      duration: form.duration ? `${form.duration} mins` : "60 mins",
      negativeMarking: form.negativeMarking,
      instructions: form.instructions,
      date: dateStr,
      time: "TBD",
      status: "Draft",
      daysLeft: "Draft — not yet scheduled",
      participants: 0,
    };
    onCreate(newQuiz);
    onClose();
  };

  return (
    <div className="agent-loading-backdrop" onClick={onClose}>
      <div
        className="agent-loading-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 600, padding: 0, overflow: "hidden" }}
      >
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111", margin: 0, fontFamily: "'Matter', sans-serif" }}>
            Create New Test / Quiz
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Step Progress — pill stepper */}
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: 0 }}>
          {["Basic Info", "Structure", "Review"].map((label, i) => (
            <React.Fragment key={label}>
              <div
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: step > i + 1 ? "pointer" : "default" }}
                onClick={() => step > i + 1 && setStep(i + 1)}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: step > i + 1 ? "#16a34a" : step === i + 1 ? "#111" : "#e5e7eb",
                  color: step >= i + 1 ? "#fff" : "#9ca3af",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, fontFamily: "'Matter', sans-serif",
                  transition: "all 0.25s",
                }}>
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 600, fontFamily: "'Matter', sans-serif",
                  color: step === i + 1 ? "#111" : step > i + 1 ? "#16a34a" : "#9ca3af",
                  whiteSpace: "nowrap",
                }}>
                  {label}
                </span>
              </div>
              {i < 2 && (
                <div style={{
                  flex: 1, height: 2, margin: "0 8px", marginBottom: 18,
                  background: step > i + 1 ? "#16a34a" : "#e5e7eb",
                  transition: "background 0.25s",
                }} />
              )}
            </React.Fragment>
          ))}
        </div>



        {/* STEP 1 — Basic Info */}
        {step === 1 && (
          <div style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxHeight: "55vh", overflowY: "auto" }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelSx}>Test / Quiz Title *</label>
              <input value={form.title} onChange={(e) => f("title", e.target.value)} placeholder="e.g. Python Advanced Mid-Term" style={inputSx} onFocus={(e) => (e.target.style.borderColor = "#111")} onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")} />
            </div>
            <div>
              <label style={labelSx}>Subject *</label>
              <input value={form.subject} onChange={(e) => f("subject", e.target.value)} placeholder="Computer Science" style={inputSx} onFocus={(e) => (e.target.style.borderColor = "#111")} onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")} />
            </div>
            <div>
              <label style={labelSx}>Class / Batch *</label>
              <input value={form.className} onChange={(e) => f("className", e.target.value)} placeholder="B.Tech Sem 3" style={inputSx} onFocus={(e) => (e.target.style.borderColor = "#111")} onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelSx}>Test Type *</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {(["Standard", "AI-Generated", "Proctored", "Mock"] as Quiz["type"][]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => f("type", t)}
                    style={{
                      padding: "12px 16px", border: `2px solid ${form.type === t ? "#111" : "#e5e7eb"}`,
                      borderRadius: 10, background: form.type === t ? "#111" : "#fff",
                      color: form.type === t ? "#fff" : "#374151",
                      display: "flex", alignItems: "center", gap: 8,
                      fontSize: 13, fontWeight: 600, fontFamily: "'Matter', sans-serif",
                      cursor: "pointer", transition: "all 0.2s",
                    }}
                  >
                    <span style={{ color: form.type === t ? "#fff" : "inherit" }}>
                      {TYPE_ICONS[t]}
                    </span>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelSx}>Special Instructions</label>
              <textarea
                value={form.instructions}
                onChange={(e) => f("instructions", e.target.value)}
                placeholder="e.g. No calculators. Open-book not allowed. Bring your student ID."
                rows={3}
                style={{ ...inputSx, resize: "none" }}
                onFocus={(e) => (e.target.style.borderColor = "#111")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>
          </div>
        )}

        {/* STEP 2 — Structure & Rules */}
        {step === 2 && (
          <div style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxHeight: "55vh", overflowY: "auto" }}>
            <div>
              <label style={labelSx}>No. of Questions *</label>
              <input type="number" value={form.questions} onChange={(e) => f("questions", e.target.value)} placeholder="25" style={inputSx} onFocus={(e) => (e.target.style.borderColor = "#111")} onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")} />
            </div>
            <div>
              <label style={labelSx}>Maximum Marks *</label>
              <input type="number" value={form.maxMarks} onChange={(e) => f("maxMarks", e.target.value)} placeholder="100" style={inputSx} onFocus={(e) => (e.target.style.borderColor = "#111")} onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")} />
            </div>
            <div>
              <label style={labelSx}>Passing Marks</label>
              <input type="number" value={form.passingMarks} onChange={(e) => f("passingMarks", e.target.value)} placeholder={`${Math.round(Number(form.maxMarks || 100) * 0.4)}`} style={inputSx} onFocus={(e) => (e.target.style.borderColor = "#111")} onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")} />
            </div>
            <div>
              <label style={labelSx}>Duration (minutes) *</label>
              <input type="number" value={form.duration} onChange={(e) => f("duration", e.target.value)} placeholder="90" style={inputSx} onFocus={(e) => (e.target.style.borderColor = "#111")} onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelSx}>Marks per Question</label>
              <div style={{ padding: "10px 12px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 14, fontWeight: 600, color: "#111", fontFamily: "'Matter', sans-serif" }}>
                {form.questions && form.maxMarks ? `${(Number(form.maxMarks) / Number(form.questions)).toFixed(2)} marks` : "—"}
              </div>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ ...labelSx, display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={form.negativeMarking}
                  onChange={(e) => f("negativeMarking", e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: "#111", cursor: "pointer" }}
                />
                Enable Negative Marking (–{form.maxMarks && form.questions ? (Number(form.maxMarks) / Number(form.questions) * 0.25).toFixed(2) : "0.25"} per wrong answer)
              </label>
            </div>
          </div>
        )}

        {/* STEP 3 — Review */}
        {step === 3 && (
          <div style={{ padding: 24, maxHeight: "55vh", overflowY: "auto" }}>
            <div style={{ background: "#f9fafb", borderRadius: 12, padding: 20, border: "1px solid #e5e7eb", marginBottom: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12, fontFamily: "'Matter', sans-serif" }}>Review Summary</p>
              {[
                { label: "Title", value: form.title },
                { label: "Subject", value: form.subject },
                { label: "Class", value: form.className },
                { label: "Type", value: form.type },
                { label: "Questions", value: form.questions || "—" },
                { label: "Max Marks", value: form.maxMarks ? `${form.maxMarks} marks` : "—" },
                { label: "Passing Marks", value: form.passingMarks ? `${form.passingMarks} marks` : `${Math.round(Number(form.maxMarks || 100) * 0.4)} marks (40%)` },
                { label: "Duration", value: form.duration ? `${form.duration} mins` : "—" },
                { label: "Negative Marking", value: form.negativeMarking ? "Yes" : "No" },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f0f0", fontFamily: "'Matter', sans-serif" }}>
                  <span style={{ fontSize: 13, color: "#6b7280" }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{value}</span>
                </div>
              ))}
            </div>
            {form.instructions && (
              <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: 14 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#92400e", textTransform: "uppercase", marginBottom: 6, fontFamily: "'Matter', sans-serif" }}>Instructions</p>
                <p style={{ fontSize: 13, color: "#92400e", fontFamily: "'Matter', sans-serif", lineHeight: 1.6, margin: 0 }}>{form.instructions}</p>
              </div>
            )}
            <div style={{ marginTop: 16, padding: 14, background: "#d1fae5", border: "1px solid #a7f3d0", borderRadius: 10, display: "flex", gap: 10, alignItems: "flex-start" }}>
              <CheckCircle2 className="w-4 h-4 text-green-700 mt-0.5 shrink-0" />
              <p style={{ fontSize: 13, color: "#065f46", fontFamily: "'Matter', sans-serif", margin: 0, lineHeight: 1.6 }}>
                This test will be saved as a <strong>Draft</strong>. You can schedule it later from the test card using the <strong>Schedule Test</strong> button.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ padding: "16px 24px", background: "#fafafa", borderTop: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button
            type="button"
            onClick={() => step > 1 ? setStep(step - 1) : onClose()}
            style={{ padding: "9px 16px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 6, color: "#6b7280", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'Matter', sans-serif" }}
          >
            {step > 1 ? "← Back" : "Cancel"}
          </button>
          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
              style={{ padding: "9px 20px", background: (step === 1 ? !isStep1Valid : !isStep2Valid) ? "#d1d5db" : "#111", border: "none", borderRadius: 6, color: "#fff", fontSize: 13, fontWeight: 600, cursor: (step === 1 ? !isStep1Valid : !isStep2Valid) ? "not-allowed" : "pointer", fontFamily: "'Matter', sans-serif", transition: "background 0.2s" }}
            >
              Next Step →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCreate}
              style={{ padding: "9px 20px", background: "#111", border: "none", borderRadius: 6, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Matter', sans-serif" }}
            >
              Create Test (Save as Draft)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   MODAL — SCHEDULE TEST
────────────────────────────────────────── */
function ScheduleTestModal({
  quizzes,
  onClose,
  onSchedule,
}: {
  quizzes: Quiz[];
  onClose: () => void;
  onSchedule: (id: string, date: string, time: string) => void;
}) {
  const [selectedQuizId, setSelectedQuizId] = useState(quizzes[0]?.id ?? "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [remindBefore, setRemindBefore] = useState("30");
  const [notifyStudents, setNotifyStudents] = useState(true);
  const [success, setSuccess] = useState(false);

  const selectedQuiz = quizzes.find((q) => q.id === selectedQuizId);

  const handleSchedule = () => {
    if (!selectedQuizId || !date || !time) return;
    const formattedDate = new Date(date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" });
    const [h, m] = time.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const formattedTime = `${displayHour}:${m} ${ampm}`;
    onSchedule(selectedQuizId, formattedDate, formattedTime);
    setSuccess(true);
    setTimeout(onClose, 1800);
  };

  return (
    <div className="agent-loading-backdrop" onClick={onClose}>
      <div
        className="agent-loading-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 540, padding: 0, overflow: "hidden" }}
      >
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111", margin: 0, fontFamily: "'Matter', sans-serif" }}>
              Schedule a Test
            </h3>
            <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 2, fontFamily: "'Matter', sans-serif" }}>Pick a test and set the date, time, and notifications.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 transition-colors">
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div style={{ padding: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CheckCircle2 className="w-7 h-7 text-green-600" />
            </div>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#111", fontFamily: "'Matter', sans-serif", margin: 0 }}>Test Scheduled!</p>
            <p style={{ fontSize: 13, color: "#6b7280", fontFamily: "'Matter', sans-serif", textAlign: "center", margin: 0 }}>
              <strong>{selectedQuiz?.title}</strong> has been scheduled for <strong>{date}</strong> at <strong>{time}</strong>.
              {notifyStudents && " Students will be notified automatically."}
            </p>
          </div>
        ) : (
          <>
            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18, maxHeight: "60vh", overflowY: "auto" }}>
              {/* Select Test */}
              <div>
                <label style={labelSx}>Select Test *</label>
                <select
                  value={selectedQuizId}
                  onChange={(e) => setSelectedQuizId(e.target.value)}
                  style={{ ...inputSx }}
                  onFocus={(e) => (e.target.style.borderColor = "#111")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                >
                  {quizzes.map((q) => (
                    <option key={q.id} value={q.id}>
                      {q.title} ({q.subject} · {q.className})
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected quiz mini-card */}
              {selectedQuiz && (
                <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10, padding: 14, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                  {[
                    { label: "Questions", value: selectedQuiz.questions },
                    { label: "Max Marks", value: selectedQuiz.maxMarks },
                    { label: "Duration", value: selectedQuiz.duration },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ textAlign: "center" }}>
                      <p style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", fontFamily: "'Matter', sans-serif", marginBottom: 4 }}>{label}</p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: "#111", fontFamily: "'Matter', sans-serif", margin: 0 }}>{value}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Date & Time */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={labelSx}>Date *</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    style={inputSx}
                    onFocus={(e) => (e.target.style.borderColor = "#111")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>
                <div>
                  <label style={labelSx}>Start Time *</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    style={inputSx}
                    onFocus={(e) => (e.target.style.borderColor = "#111")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>
              </div>

              {/* Remind before */}
              <div>
                <label style={labelSx}>Remind Students Before Test</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {["15", "30", "60", "120"].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setRemindBefore(mins)}
                      style={{
                        flex: 1, padding: "8px 0", border: `2px solid ${remindBefore === mins ? "#111" : "#e5e7eb"}`,
                        borderRadius: 8, background: remindBefore === mins ? "#111" : "#fff",
                        color: remindBefore === mins ? "#fff" : "#6b7280",
                        fontSize: 12, fontWeight: 700, fontFamily: "'Matter', sans-serif", cursor: "pointer", transition: "all 0.2s",
                      }}
                    >
                      {parseInt(mins) >= 60 ? `${parseInt(mins) / 60}h` : `${mins}m`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notify toggle */}
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontFamily: "'Matter', sans-serif", fontSize: 13, color: "#374151" }}>
                <input
                  type="checkbox"
                  checked={notifyStudents}
                  onChange={(e) => setNotifyStudents(e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: "#111", cursor: "pointer" }}
                />
                Notify students via email when scheduled
              </label>
            </div>

            {/* Footer */}
            <div style={{ padding: "16px 24px", background: "#fafafa", borderTop: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button type="button" onClick={onClose} style={{ padding: "9px 16px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 6, color: "#6b7280", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'Matter', sans-serif" }}>
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSchedule}
                disabled={!selectedQuizId || !date || !time}
                style={{ padding: "9px 20px", background: (!selectedQuizId || !date || !time) ? "#d1d5db" : "#111", border: "none", borderRadius: 6, color: "#fff", fontSize: 13, fontWeight: 600, cursor: (!selectedQuizId || !date || !time) ? "not-allowed" : "pointer", fontFamily: "'Matter', sans-serif", transition: "background 0.2s" }}
              >
                <Calendar className="w-3.5 h-3.5 inline mr-2" />
                Schedule Test
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   MODAL — VIEW PARTICIPANTS
 ────────────────────────────────────────── */
function ParticipantsModal({
  quiz,
  onClose,
}: {
  quiz: Quiz;
  onClose: () => void;
}) {
  // Mock participants data
  const participants = Array.from({ length: quiz.participants || 0 }).map((_, i) => ({
    id: `STU-${100 + i}`,
    name: ["Aarav Shah", "Priya Mehta", "Rohan Gupta", "Simran Kaur", "Dev Patel", "Anjali Nair", "Meera Iyer", "Karan Singh"][i % 8],
    avatar: `https://i.pravatar.cc/150?u=${quiz.id + i}`,
    status: quiz.status === "Completed" ? "Submitted" : i % 4 === 0 ? "In Progress" : "Enrolled",
    progress: quiz.status === "Completed" ? 100 : i % 4 === 0 ? 45 : 0,
    email: `${["aarav", "priya", "rohan", "simran", "dev", "anjali"][i % 6]}.s@example.com`
  }));

  return (
    <div className="agent-loading-backdrop" onClick={onClose}>
      <div
        className="agent-loading-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 640, padding: 0, overflow: "hidden" }}
      >
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111", margin: 0, fontFamily: "'Matter', sans-serif" }}>
              Participants List
            </h3>
            <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 2, fontFamily: "'Matter', sans-serif" }}>
              {quiz.title} · {quiz.className}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: "0", maxHeight: "60vh", overflowY: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead style={{ position: "sticky", top: 0, background: "#f9fafb", zIndex: 1, borderBottom: "1px solid #f0f0f0" }}>
              <tr>
                <th style={{ padding: "12px 24px", fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase" }}>Student</th>
                <th style={{ padding: "12px 24px", fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase" }}>Status</th>
                <th style={{ padding: "12px 24px", fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase" }}>Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {participants.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ padding: "40px", textAlign: "center", color: "#9ca3af", fontSize: 14 }}>
                    No students enrolled yet.
                  </td>
                </tr>
              ) : (
                participants.map((p) => (
                  <tr key={p.id}>
                    <td style={{ padding: "12px 24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <img src={p.avatar} alt="" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>{p.name}</div>
                          <div style={{ fontSize: 11, color: "#9ca3af" }}>{p.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "12px 24px" }}>
                       <span style={{
                         fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4, textTransform: "uppercase",
                         background: p.status === "Submitted" ? "#d1fae5" : p.status === "In Progress" ? "#fef3c7" : "#f1f5f9",
                         color: p.status === "Submitted" ? "#065f46" : p.status === "In Progress" ? "#92400e" : "#475569"
                       }}>
                         {p.status}
                       </span>
                    </td>
                    <td style={{ padding: "12px 24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                         <div style={{ flex: 1, height: 4, background: "#f1f5f9", borderRadius: 2 }}>
                            <div style={{ height: "100%", background: "#111", borderRadius: 2, width: `${p.progress}%` }} />
                         </div>
                         <span style={{ fontSize: 11, fontWeight: 600, color: "#111", width: 32 }}>{p.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div style={{ padding: "16px 24px", background: "#fafafa", borderTop: "1px solid #f0f0f0", display: "flex", justifyContent: "flex-end" }}>
           <button onClick={onClose} style={{ padding: "9px 16px", background: "#111", border: "none", borderRadius: 6, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
             Close
           </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   PAGE COMPONENT
 ────────────────────────────────────────── */
function QuizzesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [quizzes, setQuizzes] = useState<Quiz[]>(INITIAL_QUIZZES);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "results">("details");

  useEffect(() => {
    const tab = searchParams.get("tab");
    const quizId = searchParams.get("quizId");

    if (tab === "results") {
      setActiveTab("results");
    }

    if (quizId) {
      setSelectedId(quizId);
    } else if (tab === "results" && !selectedId) {
      const completed = quizzes.find(q => q.status === "Completed");
      if (completed) setSelectedId(completed.id);
    }
  }, [searchParams, quizzes]);

  const selected = quizzes.find((q) => q.id === selectedId);

  const handleCreate = (q: Quiz) => {
    setQuizzes((prev) => [q, ...prev]);
    setSelectedId(q.id);
  };

  const handleDelete = (id: string) => {
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const handleSchedule = (id: string, date: string, time: string) => {
    setQuizzes((prev) =>
      prev.map((q) =>
        q.id === id
          ? { ...q, status: "Upcoming", date, time, daysLeft: "Scheduled" }
          : q
      )
    );
  };

  const STATS = [
    { label: "Total Tests Conducted", value: quizzes.filter((q) => q.status === "Completed").length, delta: "+2 This Month", positive: true },
    { label: "Scheduled Upcoming", value: quizzes.filter((q) => q.status === "Upcoming").length, delta: "+1 This Month", positive: true },
    { label: "Mock Tests / Drafts", value: quizzes.filter((q) => q.type === "Mock" || q.status === "Draft").length, delta: "Live count", positive: true },
  ];

  return (
    <div className="billing-page">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-[#111] font-matter tracking-tight">Exam &amp; Tests</h1>
          <p className="text-[12px] text-gray-400 mt-0.5 font-matter">Schedule, manage and generate AI-powered assessments.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2.5 bg-[#111] text-white rounded-xl text-[12px] font-bold hover:bg-black transition-all shadow-sm">
            <Plus className="w-4 h-4" /> Create Test
          </button>
          <button onClick={() => setShowSchedule(true)} className="flex items-center gap-2 px-4 py-2.5 bg-[#111] text-white rounded-xl text-[12px] font-bold hover:bg-black transition-all shadow-sm">
            <Calendar className="w-4 h-4" /> Schedule Test
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {STATS.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#eee] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-2 mb-3 text-[12px] text-gray-400 font-medium font-matter">
              <ListTodo className="w-3.5 h-3.5" />{s.label}
            </div>
            <div className="flex items-end gap-3">
              <span className="text-[32px] font-bold text-[#111] leading-none font-matter">{s.value}</span>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full mb-1 border ${s.positive ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-500 border-red-100"}`}>{s.delta}</span>
            </div>
          </div>
        ))}
      </div>

      {/* AI BANNER */}
      <div className="mb-6 bg-[#f1f3e7] rounded-2xl p-5 border border-[#e4e8cc] flex items-center justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-[#7a8c20]" />
            <h3 className="text-[15px] font-bold text-[#3a3a2a]">AI-Powered Mock Test Generator</h3>
          </div>
          <p className="text-[12px] text-[#7a7a5a] mb-3">Upload 5+ past papers and let AI generate a comprehensive new test in seconds.</p>
          <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-[#111] text-white rounded-full text-[12px] font-semibold hover:bg-black transition-all shadow-md">
            <Sparkles className="w-3.5 h-3.5" /> Try now
          </button>
        </div>
        <div className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
          <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="#7a8c20" viewBox="0 0 256 256">
            <path d="M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z"></path>
          </svg>
        </div>
      </div>

      {/* QUIZ CARDS */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[18px] font-bold text-[#111] font-matter">All Quizzes &amp; Tests</h2>
        <span className="text-[12px] text-gray-400 font-matter">{quizzes.length} total</span>
      </div>

      <div className="credits-scroll-container">
        <div className="credits-cards">
          {quizzes.map((quiz) => (
            <button
              key={quiz.id}
              className={`credits-card${selectedId === quiz.id ? " active" : ""}`}
              onClick={() => { setSelectedId(quiz.id); setActiveTab("details"); }}
              style={selectedId === quiz.id ? { borderColor: "#111", boxShadow: "0 8px 24px rgba(0,0,0,0.10)" } : {}}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide ${TYPE_BADGE[quiz.type]}`}>{quiz.type}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_BADGE[quiz.status]}`}>{quiz.status}</span>
              </div>
              <div className="credits-amount" style={{ fontSize: 15, marginBottom: 4 }}>{quiz.title}</div>
              <div className="credits-label" style={{ fontSize: 12, marginBottom: 12 }}>{quiz.subject} · {quiz.className}</div>
              <div className="grid grid-cols-3 gap-2 mt-2 text-center">
                <div className="bg-gray-50 rounded-lg py-2">
                  <div className="text-[10px] text-gray-400 font-matter">Questions</div>
                  <div className="text-[13px] font-bold text-[#111]">{quiz.questions}</div>
                </div>
                <div className="bg-gray-50 rounded-lg py-2">
                  <div className="text-[10px] text-gray-400 font-matter">Marks</div>
                  <div className="text-[13px] font-bold text-[#111]">{quiz.maxMarks}</div>
                </div>
                <div className="bg-gray-50 rounded-lg py-2">
                  <div className="text-[10px] text-gray-400 font-matter">Students</div>
                  <div className="text-[13px] font-bold text-[#111]">{quiz.participants ?? 0}</div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <span className="text-[11px] text-gray-400 font-matter flex items-center gap-1"><Clock className="w-3 h-3" />{quiz.duration}</span>
                <span className="text-[11px] text-gray-400 font-matter">{quiz.daysLeft}</span>
              </div>
            </button>
          ))}

          {/* Add card */}
          <button
            className="credits-card"
            onClick={() => setShowCreate(true)}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "transparent", border: "2px dashed #e5e7eb", boxShadow: "none", minWidth: 200 }}
          >
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-3"><Plus className="w-5 h-5 text-gray-400" /></div>
            <span className="font-matter font-medium text-gray-500 text-[13px]">New Test</span>
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="billing-tabs mt-8 flex gap-8">
        {(["details", "results"] as const).map((tab) => (
          <button
            key={tab}
            className="billing-tab"
            style={{ borderBottomColor: activeTab === tab ? "#111" : "transparent", color: activeTab === tab ? "#111" : "#9ca3af" }}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "details" ? "Quiz Details" : "Results & Analytics"}
          </button>
        ))}
      </div>

      {/* DETAIL PANE */}
      {!selected ? (
        <div className="empty-state">
          <img src="https://dashboard.sarvam.ai/assets/empty-table.webp" alt="" className="empty-image" />
          <div className="empty-title">Select a quiz or test</div>
          <div className="empty-desc">Click any card above to view its complete details, schedule, and student results.</div>
        </div>
      ) : (
        <div className="project-metadata">
          <div className="meta-header">
            <div className="meta-title-section">
              <div className="flex items-center gap-3 mb-1">
                <span className={`ci-badge ${selected.status === "Completed" ? "passed" : ""}`}
                  style={selected.status === "Upcoming" ? { background: "#EEF2FF", color: "#3730A3" } : selected.status === "Draft" ? { background: "#F9FAFB", color: "#6B7280" } : selected.status === "Ongoing" ? { background: "#FFFBEB", color: "#B45309" } : {}}
                >
                  {selected.status}
                </span>
                <span className={`ci-badge ${TYPE_BADGE[selected.type]}`} style={{ fontSize: 10, padding: "3px 10px" }}>{selected.type}</span>
              </div>
              <h2 className="meta-title">{selected.title}</h2>
              <span className="meta-username">{selected.subject} · {selected.className} · {selected.id}</span>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setShowSchedule(true)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-[#111] text-white rounded-xl text-[12px] font-semibold hover:bg-black transition-colors font-matter"
                >
                  <Calendar className="w-3.5 h-3.5" /> Schedule
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl text-[12px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors font-matter">
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(selected.id)}
                  className="flex items-center gap-1.5 px-3 py-2 border border-red-100 rounded-xl text-[12px] font-semibold text-red-500 hover:bg-red-50 transition-colors font-matter"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
              <span className="text-[11px] text-gray-400 font-matter">{selected.daysLeft}</span>
            </div>
          </div>

          {activeTab === "details" && (
            <div className="meta-grid">
              <div className="meta-col-main">
                <div className="info-section">
                  <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-wider font-matter">Schedule</h3>
                  {[ { label: "Date", value: selected.date }, { label: "Time", value: selected.time }, { label: "Duration", value: selected.duration }, { label: "Class / Batch", value: selected.className } ].map(({ label, value }) => (
                    <div key={label} className="info-row">
                      <span className="info-label">{label}</span>
                      <span className="info-value">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="info-section">
                  <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-wider font-matter">Assessment Structure</h3>
                  {[
                    { label: "Number of Questions", value: `${selected.questions} questions` },
                    { label: "Maximum Marks", value: `${selected.maxMarks} marks` },
                    { label: "Per Question", value: `${(selected.maxMarks / selected.questions).toFixed(1)} marks` },
                    { label: "Passing Marks", value: `${selected.passingMarks ?? Math.round(selected.maxMarks * 0.4)} marks (${Math.round(((selected.passingMarks ?? selected.maxMarks * 0.4) / selected.maxMarks) * 100)}%)` },
                    { label: "Negative Marking", value: selected.negativeMarking ? `Yes (–${(selected.maxMarks / selected.questions * 0.25).toFixed(2)} per wrong)` : "No" },
                    { label: "Test Type", value: selected.type },
                  ].map(({ label, value }) => (
                    <div key={label} className="info-row">
                      <span className="info-label">{label}</span>
                      <span className="info-value">{value}</span>
                    </div>
                  ))}
                </div>
                {selected.instructions && (
                  <div className="info-section" style={{ borderBottom: "none" }}>
                    <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-wider font-matter">Instructions</h3>
                    <p className="text-[13px] text-[#374151] font-matter leading-relaxed">{selected.instructions}</p>
                  </div>
                )}
                <div className="info-section" style={{ borderBottom: "none" }}>
                  <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-wider font-matter">Enrolled Students</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex -space-x-2">
                      {Array.from({ length: Math.min(5, selected.participants || 0) }).map((_, i) => (
                        <img key={i} src={`https://i.pravatar.cc/40?u=${selected.id + i}`} alt="" className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" />
                      ))}
                    </div>
                    <span className="text-[13px] font-medium text-[#111] font-matter">{selected.participants ?? 0} students enrolled</span>
                  </div>
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => setShowParticipants(true)}
                      className="flex items-center gap-2 px-3 py-2 bg-[#111] text-white rounded-xl text-[12px] font-semibold hover:bg-black transition-colors font-matter"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Participants
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl text-[12px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors font-matter"><Download className="w-3.5 h-3.5" /> Export PDF</button>
                  </div>
                </div>
              </div>

              <div className="meta-col-side">
                <div className="score-section border border-[#f0f0f0]">
                  <div className="score-label">{selected.status === "Completed" ? "Average Score" : "Max Marks"}</div>
                  <div className="score-number">{selected.status === "Completed" ? selected.avgScore : selected.maxMarks}</div>
                  <div className="score-max">{selected.status === "Completed" ? `out of ${selected.maxMarks}` : "Total marks"}</div>
                  {selected.status === "Completed" && selected.avgScore && (
                    <>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-3 mb-1">
                        <div className="h-full rounded-full" style={{ width: `${(selected.avgScore / selected.maxMarks) * 100}%`, background: selected.avgScore >= 80 ? "#16a34a" : selected.avgScore >= 60 ? "#d97706" : "#dc2626" }} />
                      </div>
                      <div className="score-max">{((selected.avgScore / selected.maxMarks) * 100).toFixed(0)}% class average</div>
                    </>
                  )}
                </div>
                <div className="score-section border border-[#f0f0f0] bg-gray-50/50">
                  <div className="score-label">Questions</div>
                  <div className="score-number" style={{ fontSize: 40 }}>{selected.questions}</div>
                  <div className="score-max">in {selected.duration}</div>
                </div>
                <div className="flex border border-gray-200 rounded-xl overflow-hidden mt-auto">
                  {selected.status === "Completed" ? (
                    <button className="flex-1 py-3 bg-[#111] text-white text-[13px] font-semibold hover:bg-black transition-colors font-matter flex items-center justify-center gap-2"><Eye className="w-4 h-4" /> View Results</button>
                  ) : (
                    <>
                      <button className="flex-1 py-3 bg-white text-gray-700 text-[13px] font-semibold hover:bg-gray-50 transition-colors font-matter border-r border-gray-200">Preview</button>
                      <button
                        onClick={() => setShowSchedule(true)}
                        className="flex-1 py-3 bg-[#111] text-white text-[13px] font-semibold hover:bg-black transition-colors font-matter"
                      >
                        {selected.status === "Draft" ? "Publish" : "Edit Test"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "results" && (
            <div className="mt-6">
              {selected.status !== "Completed" ? (
                <div className="text-center py-16">
                  <p className="text-gray-400 font-matter text-[14px]">Results are not available yet. The test is still <strong>{selected.status}</strong>.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <h3 className="font-matter font-medium text-[15px] text-[#111] mb-4 pb-2 border-b border-gray-100">Student Results — {selected.title}</h3>
                  {["Aarav Shah", "Priya Mehta", "Rohan Gupta", "Simran Kaur", "Dev Patel", "Anjali Nair"].map((name, i) => {
                    const score = Math.floor(selected.maxMarks * (0.5 + Math.random() * 0.5));
                    return (
                      <div key={i} className="flex items-center gap-4 p-4 bg-gray-50/60 rounded-xl border border-gray-100">
                        <img src={`https://i.pravatar.cc/40?u=r${selected.id}${i}`} alt="" className="w-9 h-9 rounded-full border border-gray-100 object-cover" />
                        <div className="flex-1">
                          <div className="text-[13px] font-bold text-[#111] font-matter">{name}</div>
                          <div className="text-[11px] text-gray-400 font-matter">Submitted on {selected.date}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-[#111]" style={{ width: `${(score / selected.maxMarks) * 100}%` }} />
                          </div>
                          <span className={`text-[13px] font-bold min-w-[52px] text-right ${score >= selected.maxMarks * 0.75 ? "text-green-600" : score >= selected.maxMarks * 0.5 ? "text-amber-600" : "text-red-500"}`}>
                            {score}/{selected.maxMarks}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* MODALS */}
      {showCreate && <CreateTestModal onClose={() => setShowCreate(false)} onCreate={handleCreate} />}
      {showSchedule && <ScheduleTestModal quizzes={quizzes} onClose={() => setShowSchedule(false)} onSchedule={handleSchedule} />}
      {showParticipants && selected && <ParticipantsModal quiz={selected} onClose={() => setShowParticipants(false)} />}
    </div>
  );
}

export default function QuizzesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading assessments...</div>}>
      <QuizzesContent />
    </Suspense>
  );
}
