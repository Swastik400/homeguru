"use client";
import { useState } from "react";
import { 
  ArrowUp, 
  Plus, 
  Settings, 
  ArrowUpRight, 
  MessageSquare, 
  FileText, 
  Languages, 
  PenTool, 
  LayoutGrid,
  Copy,
  Share2,
  ChevronRight,
  Settings2,
  Brain,
  Lightbulb,
  Paperclip
} from "lucide-react";

const QUICK_ACTIONS = [
  { id: 1, title: "Lesson Planning", icon: FileText },
  { id: 2, title: "Assessment", icon: Brain },
  { id: 3, title: "Feedback", icon: MessageSquare },
  { id: 4, title: "Strategy", icon: Lightbulb },
];

export default function AIAssistantPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [isStarted, setIsStarted] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    if (!isStarted) setIsStarted(true);
    setMessages([...messages, { role: "user", content: message }]);
    setMessage("");
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", content: "I'm processing your request using HomeGuru's advanced educational models. This is a demo response." }]);
    }, 1000);
  };

  const handleReset = () => {
    setMessages([]);
    setIsStarted(false);
    setMessage("");
  };

  return (
    <div className="h-[calc(100vh-77px)] bg-white font-matter text-[#111111] flex flex-col overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 flex flex-col items-center pt-16 pb-8 overflow-hidden">
        <div className="w-full max-w-2xl flex-1 flex flex-col items-center min-h-0">
          {!isStarted ? (
            <div className="w-full flex-1 flex flex-col items-center justify-center">
              {/* Hero Message */}
              <h1 className="text-4xl md:text-5xl font-season font-bold text-center mb-12 tracking-tight">
                How can I help you today?
              </h1>
            </div>
          ) : (
            /* Chat History View (Centered & Independently Scrollable) */
            <div className="w-full space-y-10 mb-6 overflow-y-auto pr-4 custom-scrollbar scroll-smooth flex-1 min-h-0">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  {msg.role === 'user' ? (
                    <div className="bg-[#F4F4F4] text-[#111111] px-4 py-2 rounded-[20px] text-[14px] font-matter max-w-[85%]">
                      {msg.content}
                    </div>
                  ) : (
                    <div className="w-full space-y-4">
                      {/* Thought Row */}
                      <div className="flex items-center gap-2 text-[#111111]/40 text-xs font-light cursor-pointer hover:text-[#111111]/60 transition-colors">
                        <div className="w-5 h-5 flex items-center justify-center">
                          <Settings2 className="w-4 h-4" />
                        </div>
                        <span className="font-matter">Thought for 2s</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                      
                      {/* Assistant Content */}
                      <div className="text-[16px] leading-[1.6] text-[#111111] font-matter font-light pl-1">
                        {msg.content}
                      </div>

                      {/* Action Icons */}
                      <div className="flex items-center gap-4 pt-1 pl-1">
                        <button className="text-gray-400 hover:text-[#111111] transition-colors rounded-md">
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button className="text-gray-400 hover:text-[#111111] transition-colors rounded-md">
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Unified Input Area (Always Centered) */}
          <div className="w-full relative group shrink-0 mb-4">
            <div className="absolute inset-0 bg-transparent border border-gray-200 rounded-[20px] pointer-events-none group-focus-within:border-gray-300 transition-colors shadow-sm"></div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={isStarted ? "Message assistant..." : "What's on your mind?"}
              className={`w-full bg-transparent px-6 pt-5 pb-10 rounded-[20px] focus:outline-none resize-none placeholder:text-gray-300 transition-all duration-300 font-matter ${
                isStarted ? 'min-h-[80px] text-[14px]' : 'min-h-[100px] text-lg'
              }`}
            />
            <div className="absolute left-4 bottom-3">
              <button className="p-2 text-gray-400 hover:text-[#111111] transition-colors rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Paperclip className="w-4 h-4" />
                <span className="text-xs font-medium font-matter">Attach</span>
              </button>
            </div>
            <div className="absolute right-4 bottom-3">
              <button 
                onClick={handleSend}
                disabled={!message.trim()}
                className={`p-2 rounded-full transition-all flex items-center justify-center ${
                  message.trim() ? 'bg-[#111111] text-white cursor-pointer shadow-md' : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
              >
                <ArrowUp className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>

          {!isStarted && (
            /* Quick Actions Row */
            <div className="flex flex-wrap justify-center gap-3 mt-4 shrink-0">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.id}
                  onClick={() => {
                    setMessage(action.title);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-100 text-sm text-gray-600 hover:bg-gray-50 transition-all font-light"
                >
                  <action.icon className="w-4 h-4 opacity-60" />
                  {action.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
