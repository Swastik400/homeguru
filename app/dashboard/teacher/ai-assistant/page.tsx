"use client";
import { useState, useRef, useEffect } from "react";
import {
  ArrowUp,
  Plus,
  FileText,
  Brain,
  Lightbulb,
  Paperclip,
  Copy,
  Trash2,
  Sparkles,
  BookOpen,
  ClipboardList,
  Languages,
  User,
  PanelLeftOpen,
  PanelLeftClose,
  X,
} from "lucide-react";

/* ─────────────────────────────────────
   TYPES
───────────────────────────────────── */
interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  attachments?: { name: string; size: number }[];
}
interface Chat {
  id: string;
  title: string;
  date: string;
  messages: Message[];
}

/* ─────────────────────────────────────
   MOCK HISTORY
───────────────────────────────────── */
const INITIAL_HISTORY: Chat[] = [
  {
    id: "h1",
    title: "Lesson plan for quadratic equations",
    date: "Today",
    messages: [
      { role: "user", content: "Create a lesson plan for teaching quadratic equations to 10th graders.", timestamp: "10:30 AM" },
      { role: "assistant", content: "Here's a structured 45-minute lesson plan for quadratic equations:\n\n**Objective**: Students will solve quadratic equations using the quadratic formula and factoring.\n\n**Warm-up (5 min)**: Review linear equations, ask students where they think parabolas appear in real life.\n\n**Direct Instruction (15 min)**: Introduce ax² + bx + c = 0. Demonstrate factoring with a simple example like x² - 5x + 6 = 0.\n\n**Guided Practice (15 min)**: Work through 3 problems together with increasing difficulty.\n\n**Independent Practice (8 min)**: Students solve 4 problems independently.\n\n**Exit Ticket (2 min)**: One reflection question on their confidence level.", timestamp: "10:31 AM" },
    ],
  },
  {
    id: "h2",
    title: "AI quiz for Physics chapter 5",
    date: "Today",
    messages: [
      { role: "user", content: "Generate 10 MCQ questions for Physics Chapter 5 - Laws of Motion.", timestamp: "9:15 AM" },
      { role: "assistant", content: "Here are 10 MCQ questions for Laws of Motion:\n\n1. Newton's first law is also known as:\na) Law of Acceleration\nb) Law of Inertia ✓\nc) Law of Action-Reaction\nd) Law of Gravitation\n\n2. The SI unit of force is:\na) Joule\nb) Watt\nc) Newton ✓\nd) Pascal\n\n... (8 more generated)", timestamp: "9:16 AM" },
    ],
  },
  {
    id: "h3",
    title: "Email to parents about exam schedule",
    date: "Yesterday",
    messages: [
      { role: "user", content: "Write a professional email to parents about upcoming mid-term exams.", timestamp: "4:20 PM" },
      { role: "assistant", content: "Subject: Mid-Term Examination Schedule – March 2026\n\nDear Parents/Guardians,\n\nI hope this message finds you well. I am writing to inform you about the upcoming Mid-Term Examinations scheduled for the week of March 18–22, 2026.\n\nPlease ensure your child comes prepared with all stationery. Results will be shared within 5 working days.\n\nShould you have any questions, please do not hesitate to reach out.\n\nWarm regards,\nHomeGuru Teaching Team", timestamp: "4:21 PM" },
    ],
  },
  {
    id: "h4",
    title: "Feedback for Aarav's assignment",
    date: "Yesterday",
    messages: [],
  },
  {
    id: "h5",
    title: "Study plan for semester finals",
    date: "Mar 12",
    messages: [],
  },
];

const QUICK_ACTIONS = [
  { icon: FileText, label: "Create Lesson Plan", prompt: "Create a detailed lesson plan for teaching " },
  { icon: ClipboardList, label: "Generate Quiz", prompt: "Generate 10 quiz questions about " },
  { icon: BookOpen, label: "Explain Concept", prompt: "Explain this concept in simple terms for students: " },
  { icon: Lightbulb, label: "Teaching Strategy", prompt: "Suggest effective teaching strategies for " },
  { icon: Languages, label: "Write Feedback", prompt: "Write constructive feedback for a student who " },
  { icon: Brain, label: "Assessment Rubric", prompt: "Create an assessment rubric for " },
];

const SMART_REPLIES = [
  "Make it more detailed",
  "Simplify this for beginners",
  "Add examples",
  "Format as a table",
];

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const AI_RESPONSES = [
  "I've analyzed your request and here's a comprehensive response tailored for educational use. This draws on best practices in pedagogy and curriculum design to give you actionable, classroom-ready content.",
  "Great question! Here's what I recommend based on evidence-based teaching methodologies. I've structured this to be immediately usable in your classroom setting.",
  "I've prepared a detailed response for you. This covers the key aspects you'll need, with clear structure and practical implementation tips.",
  "Based on your request, here's a thorough response. I've included both theoretical foundations and practical classroom applications.",
];

/* ─────────────────────────────────────
   PAGE
───────────────────────────────────── */
export default function AIAssistantPage() {
  const [chats, setChats] = useState<Chat[]>(INITIAL_HISTORY);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeChat = chats.find((c) => c.id === activeChatId) ?? null;
  const messages = activeChat?.messages ?? [];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  }, [input]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveAttachment = (idx: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== idx));
  };

  const startNewChat = () => {
    setActiveChatId(null);
    setInput("");
    setAttachments([]);
  };

  const sendMessage = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content && attachments.length === 0) return;

    const userMsg: Message = { 
      role: "user", 
      content, 
      timestamp: now(),
      attachments: attachments.length > 0 ? attachments.map(f => ({ name: f.name, size: f.size })) : undefined
    };

    if (!activeChatId) {
      // Create new chat
      const id = `chat-${Date.now()}`;
      const newChat: Chat = {
        id,
        title: content.slice(0, 50) + (content.length > 50 ? "…" : ""),
        date: "Today",
        messages: [userMsg],
      };
      setChats((prev) => [newChat, ...prev]);
      setActiveChatId(id);
      triggerAssistantReply(id, [userMsg]);
    } else {
      setChats((prev) =>
        prev.map((c) =>
          c.id === activeChatId
            ? { ...c, messages: [...c.messages, userMsg] }
            : c
        )
      );
      triggerAssistantReply(activeChatId, [...messages, userMsg]);
    }

    setInput("");
    setAttachments([]);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const triggerAssistantReply = (chatId: string, currentMessages: Message[]) => {
    setIsTyping(true);
    setTimeout(() => {
      const reply = AI_RESPONSES[currentMessages.length % AI_RESPONSES.length];
      const assistantMsg: Message = { role: "assistant", content: reply, timestamp: now() };
      setChats((prev) =>
        prev.map((c) =>
          c.id === chatId
            ? { ...c, messages: [...c.messages, assistantMsg] }
            : c
        )
      );
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const deleteChat = (id: string) => {
    setChats((prev) => prev.filter((c) => c.id !== id));
    if (activeChatId === id) setActiveChatId(null);
  };

  const copyMessage = (content: string, idx: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  // Group chats by date
  const grouped: Record<string, Chat[]> = {};
  chats.forEach((c) => {
    (grouped[c.date] = grouped[c.date] ?? []).push(c);
  });

  return (
    <div
      style={{
        display: "flex",
        height: "calc(100vh - 77px)",
        overflow: "hidden",
        background: "#fff",
        fontFamily: "'Matter', sans-serif",
      }}
    >
      {/* ── LEFT SIDEBAR — slides in/out ── */}
      <aside
        style={{
          width: sidebarOpen ? 265 : 0,
          flexShrink: 0,
          background: "#f9fafb",
          borderRight: sidebarOpen ? "1px solid #e5e7eb" : "none",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: "width 0.28s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* inner wrapper keeps content from wrapping during animation */}
        <div style={{ width: 265, flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Sidebar header */}
        <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid #f0f0f0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkles style={{ width: 14, height: 14, color: "#fff" }} />
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>AI Assistant</span>
            </div>
          </div>
          <button
            onClick={startNewChat}
            style={{
              width: "100%", padding: "8px 12px", background: "#111", color: "#fff",
              border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              cursor: "pointer", transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#000")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#111")}
          >
            <Plus style={{ width: 15, height: 15 }} />
            New Chat
          </button>
        </div>

        {/* Chat history */}
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 8px" }}>
          {Object.entries(grouped).map(([date, dateChats]) => (
            <div key={date} style={{ marginBottom: 8 }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", padding: "4px 8px 2px" }}>{date}</p>
              {dateChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  style={{
                    padding: "8px 10px", borderRadius: 8, cursor: "pointer",
                    background: activeChatId === chat.id ? "#e5e7eb" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6,
                    transition: "background 0.15s",
                    marginBottom: 2,
                  }}
                  onMouseEnter={(e) => { if (activeChatId !== chat.id) e.currentTarget.style.background = "#f3f4f6"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = activeChatId === chat.id ? "#e5e7eb" : "transparent"; }}
                >
                  <span style={{ fontSize: 12, color: "#374151", fontWeight: activeChatId === chat.id ? 600 : 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
                    {chat.title}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteChat(chat.id); }}
                    style={{ padding: 2, background: "none", border: "none", cursor: "pointer", color: "#9ca3af", flexShrink: 0, opacity: 0 }}
                    className="chat-delete-btn"
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    <Trash2 style={{ width: 12, height: 12 }} />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Sidebar footer */}
        <div style={{ padding: "12px 16px", borderTop: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#e5e7eb", overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <User style={{ width: 16, height: 16, color: "#6b7280" }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#111", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Teacher</p>
            <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>HomeGuru Pro</p>
          </div>
        </div>
        </div>{/* end inner wrapper */}
      </aside>

      {/* ── MAIN CHAT AREA ── */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          background: "#fff",
        }}
      >
        {/* Chat header bar */}
        <div style={{ padding: "10px 16px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, gap: 12 }}>
          {/* Left: toggle + title */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Sidebar toggle button */}
            <button
              onClick={() => setSidebarOpen((o) => !o)}
              title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              style={{
                width: 34, height: 34, borderRadius: 8, border: "1px solid #e5e7eb",
                background: sidebarOpen ? "#111" : "#f9fafb",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", flexShrink: 0, transition: "all 0.2s",
              }}
            >
              {sidebarOpen
                ? <PanelLeftClose style={{ width: 16, height: 16, color: "#fff" }} />
                : <PanelLeftOpen style={{ width: 16, height: 16, color: "#374151" }} />}
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <Sparkles style={{ width: 15, height: 15, color: "#9ca3af" }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: "#111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 340 }}>
                {activeChat ? activeChat.title : "HomeGuru AI Assistant"}
              </span>
            </div>
          </div>
          {/* Right: new chat */}
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button
              onClick={startNewChat}
              style={{ padding: "6px 12px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 12, fontWeight: 600, color: "#374151", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}
            >
              <Plus style={{ width: 13, height: 13 }} /> New Chat
            </button>
          </div>
        </div>

        {/* Messages area — this is the ONLY thing that scrolls */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {messages.length === 0 && !isTyping ? (
            /* Empty / welcome state */
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 0" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#111", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <Sparkles style={{ width: 24, height: 24, color: "#fff" }} />
              </div>
              <h1 style={{ fontSize: 30, fontWeight: 700, color: "#111", margin: "0 0 8px", textAlign: "center", fontFamily: "'Season Mix', sans-serif" }}>
                How can I help you today?
              </h1>
              <p style={{ fontSize: 14, color: "#9ca3af", margin: "0 0 40px", textAlign: "center", maxWidth: 400 }}>
                Ask me to create lesson plans, generate quizzes, write student feedback, explain concepts, and more.
              </p>

              {/* Quick Actions Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, width: "100%", maxWidth: 600 }}>
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => setInput(action.prompt)}
                    style={{
                      padding: "14px 12px", background: "#f9fafb", border: "1px solid #e5e7eb",
                      borderRadius: 12, cursor: "pointer", textAlign: "left",
                      display: "flex", flexDirection: "column", gap: 8,
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#f3f4f6"; e.currentTarget.style.borderColor = "#d1d5db"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#f9fafb"; e.currentTarget.style.borderColor = "#e5e7eb"; }}
                  >
                    <action.icon style={{ width: 16, height: 16, color: "#6b7280" }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Messages */
            <>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                    gap: 4,
                  }}
                >
                  {msg.role === "user" ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, maxWidth: "70%" }}>
                      {(msg.content || (msg.attachments && msg.attachments.length > 0)) && (
                        <div
                          style={{
                            background: "#111", color: "#fff",
                            padding: "10px 16px", borderRadius: "18px 18px 4px 18px",
                            fontSize: 14, lineHeight: 1.55,
                            fontFamily: "'Matter', sans-serif",
                          }}
                        >
                          {msg.content}
                          {msg.attachments && msg.attachments.length > 0 && (
                            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: msg.content ? 8 : 0 }}>
                              {msg.attachments.map((att, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 10px", background: "rgba(255,255,255,0.1)", borderRadius: 6, fontSize: 12, border: "1px solid rgba(255,255,255,0.2)" }}>
                                  <FileText style={{ width: 12, height: 12, color: "#d1d5db" }} />
                                  <span style={{ color: "#f9fafb", maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{att.name}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      <span style={{ fontSize: 10, color: "#9ca3af" }}>{msg.timestamp}</span>
                    </div>
                  ) : (
                    <div style={{ display: "flex", gap: 10, maxWidth: "85%", alignItems: "flex-start" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#f3f4f6", border: "1px solid #e5e7eb", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                        <Sparkles style={{ width: 13, height: 13, color: "#6b7280" }} />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <div
                          style={{
                            background: "#f9fafb", border: "1px solid #f0f0f0",
                            padding: "12px 16px", borderRadius: "4px 18px 18px 18px",
                            fontSize: 14, lineHeight: 1.65, color: "#111",
                            fontFamily: "'Matter', sans-serif", whiteSpace: "pre-line",
                          }}
                        >
                          {msg.content}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 10, color: "#9ca3af" }}>{msg.timestamp}</span>
                          <button
                            onClick={() => copyMessage(msg.content, idx)}
                            style={{ padding: "2px 6px", background: "none", border: "none", cursor: "pointer", color: copiedIdx === idx ? "#16a34a" : "#9ca3af", fontSize: 11, display: "flex", alignItems: "center", gap: 3 }}
                          >
                            <Copy style={{ width: 11, height: 11 }} />
                            {copiedIdx === idx ? "Copied!" : "Copy"}
                          </button>
                        </div>
                        {/* Smart suggestion chips after last assistant message */}
                        {idx === messages.length - 1 && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                            {SMART_REPLIES.map((r) => (
                              <button
                                key={r}
                                onClick={() => sendMessage(r)}
                                style={{
                                  padding: "4px 10px", background: "#fff", border: "1px solid #e5e7eb",
                                  borderRadius: 99, fontSize: 11, fontWeight: 500, color: "#374151",
                                  cursor: "pointer", transition: "all 0.15s",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = "#f3f4f6"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; }}
                              >
                                {r}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#f3f4f6", border: "1px solid #e5e7eb", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Sparkles style={{ width: 13, height: 13, color: "#6b7280" }} />
                  </div>
                  <div style={{ background: "#f9fafb", border: "1px solid #f0f0f0", padding: "12px 16px", borderRadius: "4px 18px 18px 18px", display: "flex", gap: 4, alignItems: "center" }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        style={{
                          width: 6, height: 6, borderRadius: "50%", background: "#9ca3af",
                          animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* ── INPUT AREA ── fixed at bottom, never scrolls */}
        <div
          style={{
            flexShrink: 0,
            padding: "12px 24px 20px",
            borderTop: "1px solid #f0f0f0",
            background: "#fff",
          }}
        >
          <div
            style={{
              maxWidth: 720, margin: "0 auto",
              border: "1.5px solid #e5e7eb", borderRadius: 16,
              background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              transition: "border-color 0.2s",
            }}
            onFocusCapture={(e) => (e.currentTarget.style.borderColor = "#111")}
            onBlurCapture={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
          >
            {attachments.length > 0 && (
              <div style={{ padding: "10px 16px 0", display: "flex", gap: 8, flexWrap: "wrap", maxHeight: 100, overflowY: "auto" }}>
                {attachments.map((file, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 8px", background: "#f3f4f6", borderRadius: 6, fontSize: 12, border: "1px solid #e5e7eb" }}>
                    <FileText style={{ width: 12, height: 12, color: "#6b7280" }} />
                    <span style={{ color: "#374151", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</span>
                    <button onClick={() => handleRemoveAttachment(i)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 2 }}>
                      <X style={{ width: 12, height: 12, color: "#9ca3af" }} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask me anything — lesson plans, quizzes, feedback..."
              style={{
                width: "100%", border: "none", outline: "none", resize: "none",
                fontSize: 14, fontFamily: "'Matter', sans-serif", color: "#111",
                background: "transparent", padding: "14px 16px 4px",
                minHeight: 48, maxHeight: 160, overflowY: "auto",
                boxSizing: "border-box",
              }}
              rows={1}
            />
            <div style={{ padding: "6px 10px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 4 }}>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{ padding: "5px 8px", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", display: "flex", alignItems: "center", gap: 5, fontSize: 12, borderRadius: 6 }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                >
                  <Paperclip style={{ width: 14, height: 14 }} /> Attach
                </button>
                <input type="file" multiple ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, color: "#d1d5db" }}>Enter to send · Shift+Enter for newline</span>
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() && attachments.length === 0}
                  style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: (input.trim() || attachments.length > 0) ? "#111" : "#e5e7eb",
                    border: "none", cursor: (input.trim() || attachments.length > 0) ? "pointer" : "not-allowed",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.2s", flexShrink: 0,
                  }}
                >
                  <ArrowUp style={{ width: 15, height: 15, color: (input.trim() || attachments.length > 0) ? "#fff" : "#9ca3af", strokeWidth: 2.5 }} />
                </button>
              </div>
            </div>
          </div>
          <p style={{ textAlign: "center", fontSize: 10, color: "#d1d5db", marginTop: 8 }}>
            AI can make mistakes. Verify important information.
          </p>
        </div>
      </main>

      {/* Bounce animation for typing indicator */}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        .chat-delete-btn { opacity: 0; transition: opacity 0.15s; }
        [data-hovered]:hover .chat-delete-btn,
        div:hover > .chat-delete-btn { opacity: 1 !important; }
      `}</style>
    </div>
  );
}
