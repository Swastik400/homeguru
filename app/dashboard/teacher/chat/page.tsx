"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { Search, Paperclip, Send, Smile, Phone, Video, Info, ChevronLeft, MoreHorizontal, FileText, PlayCircle, ImageIcon } from "lucide-react";

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  type: "text" | "file" | "image";
}

interface Contact {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  online: boolean;
}

const CONTACTS: Contact[] = [
  { id: 1, name: "Varun Sharma", lastMessage: "Sir, I have a doubt in Hooks.", time: "10:45 AM", unread: 2, avatar: "https://i.pravatar.cc/150?img=33", online: true },
  { id: 2, name: "Batch B (Advanced React)", lastMessage: "Assignment #4 is now live.", time: "Yesterday", unread: 0, avatar: "https://i.pravatar.cc/150?img=12", online: false },
  { id: 3, name: "Meera Nair", lastMessage: "Thank you for the session!", time: "2 days ago", unread: 0, avatar: "https://i.pravatar.cc/150?img=5", online: true },
  { id: 4, name: "Priya Desai", lastMessage: "Can we reschedule tomorrow?", time: "3 days ago", unread: 0, avatar: "https://i.pravatar.cc/150?img=25", online: false },
];

const INITIAL_MESSAGES: Record<number, Message[]> = {
  1: [
    { id: 1, sender: "Varun Sharma", text: "Sir, I have a doubt regarding the integration of Context API with Redux.", time: "10:30 AM", type: "text" },
    { id: 2, sender: "You", text: "Sure Varun, we can discuss it in today's session. Did you check the recording of Session #12?", time: "10:32 AM", type: "text" },
    { id: 3, sender: "Varun Sharma", text: "Yes, I watched it twice but the specific part about reducer composition is still unclear.", time: "10:35 AM", type: "text" },
    { id: 4, sender: "You", text: "Okay, I am sharing the updated notes for that section.", time: "10:40 AM", type: "text" },
    { id: 5, sender: "You", text: "Notes_Composition.pdf", time: "10:40 AM", type: "file" },
  ],
  2: [
    { id: 1, sender: "You", text: "Assignment #4 is now live. Deadline is Friday.", time: "9:00 AM", type: "text" },
    { id: 2, sender: "Batch B (Advanced React)", text: "Got it sir, will submit on time.", time: "9:15 AM", type: "text" },
  ],
  3: [
    { id: 1, sender: "Meera Nair", text: "Sir, the last session on TypeScript generics was really helpful!", time: "4:00 PM", type: "text" },
    { id: 2, sender: "You", text: "Glad to hear that Meera! Keep practicing the exercises.", time: "4:05 PM", type: "text" },
    { id: 3, sender: "Meera Nair", text: "Thank you for the session!", time: "4:06 PM", type: "text" },
  ],
  4: [
    { id: 1, sender: "Priya Desai", text: "Sir, I won't be able to attend tomorrow's class. Can we reschedule?", time: "6:30 PM", type: "text" },
    { id: 2, sender: "You", text: "Sure, let me check my calendar and get back to you.", time: "6:45 PM", type: "text" },
    { id: 3, sender: "Priya Desai", text: "Can we reschedule tomorrow?", time: "7:00 PM", type: "text" },
  ],
};

function formatTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }).toUpperCase();
}

export default function ChatPage() {
  const [selectedContact, setSelectedContact] = useState<Contact>(CONTACTS[0]);
  const [messages, setMessages] = useState<Record<number, Message[]>>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showContacts, setShowContacts] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredContacts = useMemo(() =>
    CONTACTS.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  const currentMessages = messages[selectedContact.id] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages.length]);

  const handleSend = () => {
    const text = inputText.trim();
    if (!text) return;
    const newMsg: Message = {
      id: Date.now(),
      sender: "You",
      text,
      time: formatTime(),
      type: "text",
    };
    setMessages(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMsg],
    }));
    setInputText("");
  };

  const handleSelectContact = (c: Contact) => {
    setSelectedContact(c);
    setShowContacts(false);
  };

  return (
    <div className="h-full flex overflow-hidden bg-[#F1F5F9]">

      {/* Contacts Sidebar */}
      <div className={`w-full lg:w-[360px] border-r border-[#E2E8F0] bg-[#F8FAFC] flex flex-col shrink-0 ${showContacts ? "flex" : "hidden lg:flex"}`}>
        <div className="p-5 border-b border-[#E2E8F0]">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[20px] font-bold text-[#0F172A]">Messages</h2>
            <button className="p-2 bg-[#E2E8F0] rounded-xl hover:bg-[#CBD5E1] transition-all text-[#64748B]">
              <MoreHorizontal size={18} />
            </button>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search students or batches..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#E2E8F0]/60 border border-[#E2E8F0] rounded-xl py-2.5 pl-10 pr-4 text-[13px] outline-none focus:ring-2 focus:ring-[#94A3B8]/30 text-[#334155] placeholder:text-[#94A3B8]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredContacts.length === 0 && (
            <p className="text-center text-[13px] text-[#94A3B8] py-10">No contacts found</p>
          )}
          {filteredContacts.map(c => (
            <div
              key={c.id}
              onClick={() => handleSelectContact(c)}
              className={`px-5 py-4 flex items-center gap-3.5 cursor-pointer border-b border-[#E2E8F0]/60 transition-all ${
                selectedContact.id === c.id
                  ? "bg-[#E2E8F0] border-l-[3px] border-l-[#0F172A]"
                  : "hover:bg-[#E2E8F0]/40"
              }`}
            >
              <div className="relative shrink-0">
                <img src={c.avatar} alt={c.name} className="w-11 h-11 rounded-full object-cover border-2 border-[#F1F5F9] shadow-sm" />
                {c.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#F8FAFC]" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="text-[13.5px] font-bold text-[#0F172A] truncate">{c.name}</h3>
                  <span className="text-[11px] text-[#94A3B8] shrink-0 ml-2">{c.time}</span>
                </div>
                <p className="text-[12px] text-[#64748B] truncate">{c.lastMessage}</p>
              </div>
              {c.unread > 0 && (
                <span className="w-5 h-5 flex items-center justify-center bg-[#0F172A] text-white text-[10px] font-bold rounded-full shrink-0">
                  {c.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className={`flex-1 flex flex-col bg-[#F8FAFC] min-w-0 ${!showContacts ? "flex" : "hidden lg:flex"}`}>

        {/* Chat Header */}
        <div className="px-5 py-3.5 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F1F5F9]">
          <div className="flex items-center gap-3.5">
            <button onClick={() => setShowContacts(true)} className="lg:hidden p-1.5 text-[#64748B] hover:text-[#0F172A] rounded-lg hover:bg-[#E2E8F0] transition-all">
              <ChevronLeft size={20} />
            </button>
            <img src={selectedContact.avatar} alt={selectedContact.name} className="w-10 h-10 rounded-full object-cover border border-[#E2E8F0] shadow-sm" />
            <div>
              <h3 className="text-[14.5px] font-bold text-[#0F172A]">{selectedContact.name}</h3>
              <p className={`text-[11px] font-semibold ${selectedContact.online ? "text-emerald-600" : "text-[#94A3B8]"}`}>
                {selectedContact.online ? "Online now" : "Last seen 2h ago"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="p-2.5 text-[#64748B] hover:text-[#0F172A] hover:bg-[#E2E8F0] rounded-xl transition-all"><Phone size={17} /></button>
            <button className="p-2.5 text-[#64748B] hover:text-[#0F172A] hover:bg-[#E2E8F0] rounded-xl transition-all"><Video size={17} /></button>
            <button className="p-2.5 text-[#64748B] hover:text-[#0F172A] hover:bg-[#E2E8F0] rounded-xl transition-all"><Info size={17} /></button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          {currentMessages.length === 0 && (
            <p className="text-center text-[13px] text-[#94A3B8] py-20">No messages yet. Start the conversation!</p>
          )}
          {currentMessages.map(msg => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === "You" ? "items-end" : "items-start"}`}>
              <div className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                msg.sender === "You"
                  ? "bg-[#0F172A] text-[#E2E8F0] rounded-tr-sm"
                  : "bg-[#E2E8F0] text-[#1E293B] rounded-tl-sm"
              }`}>
                {msg.type === "text" ? (
                  <p className="text-[13.5px] leading-relaxed">{msg.text}</p>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${msg.sender === "You" ? "bg-white/10" : "bg-[#CBD5E1]"}`}>
                      <FileText size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-semibold">{msg.text}</span>
                      <span className="text-[10px] opacity-60">2.4 MB · PDF</span>
                    </div>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-[#94A3B8] mt-1.5 font-medium">{msg.time}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-5 py-2.5 border-t border-[#E2E8F0] bg-[#F1F5F9] flex items-center gap-2.5">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E2E8F0] border border-[#CBD5E1] rounded-full text-[11px] font-semibold text-[#475569] hover:bg-[#CBD5E1] transition-all">
            <PlayCircle size={13} />
            Recording
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E2E8F0] border border-[#CBD5E1] rounded-full text-[11px] font-semibold text-[#475569] hover:bg-[#CBD5E1] transition-all">
            <FileText size={13} />
            Work
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E2E8F0] border border-[#CBD5E1] rounded-full text-[11px] font-semibold text-[#475569] hover:bg-[#CBD5E1] transition-all">
            <ImageIcon size={13} />
            Media
          </button>
        </div>

        {/* Input Area */}
        <div className="px-5 py-4 border-t border-[#E2E8F0] bg-[#F1F5F9] flex items-center gap-3">
          <button className="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#E2E8F0] rounded-xl transition-all">
            <Paperclip size={19} />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Write your message here..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
              className="w-full bg-[#E2E8F0]/70 border border-[#CBD5E1] rounded-2xl py-3 pl-5 pr-12 text-[13.5px] outline-none focus:ring-2 focus:ring-[#94A3B8]/40 text-[#1E293B] placeholder:text-[#94A3B8]"
            />
            <button className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-all">
              <Smile size={19} />
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="p-3 bg-[#0F172A] text-white rounded-2xl shadow-md hover:bg-[#1E293B] transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
