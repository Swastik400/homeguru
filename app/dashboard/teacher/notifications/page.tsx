"use client";
import { useState } from "react";
import { Bell, Search, Filter, ShoppingBag, FileText, CheckCircle, AlertCircle, MessageSquare, DollarSign, Trash2, Check, ChevronRight, MoreVertical, Clock } from "lucide-react";
import TeacherSidebar from "@/components/teacher/TeacherSidebar";
import TeacherHeader from "@/components/teacher/TeacherHeader";

/**
 * Enterprise Notification Center
 * Centralized hub for all platform alerts and messages.
 */

const NOTIFICATIONS = [
  {
    id: 1,
    title: "New Booking Request",
    message: "**Varun Sharma** has requested a trial session for 'Advanced React'.",
    time: "2 mins ago",
    type: "booking",
    unread: true,
    icon: ShoppingBag,
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Grading Overdue",
    message: "You have 7 pending submissions for 'Calculus Set #4' that need review.",
    time: "4 hours ago",
    type: "system",
    unread: true,
    icon: Clock,
    color: "bg-amber-500"
  },
  {
    id: 3,
    title: "Payment Received",
    message: "Payout of **$1,240.00** has been successfully deposited into your wallet.",
    time: "Yesterday",
    type: "payment",
    unread: false,
    icon: DollarSign,
    color: "bg-green-500"
  },
  {
    id: 4,
    title: "Student Message",
    message: "Meera Nair: 'Sir, I have a doubt regarding the physics lab report...'",
    time: "2 days ago",
    type: "social",
    unread: false,
    icon: MessageSquare,
    color: "bg-purple-500"
  }
];

export default function NotificationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-matter">
      <div className="hidden md:block">
        <TeacherSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      <main className="flex-1 h-screen overflow-y-auto">
        <div className="px-4 md:px-8 py-6 pb-12">
          <TeacherHeader />
          
          <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
             <div>
                <h1 className="text-[28px] font-season font-bold text-[#111827]">Notification Center</h1>
                <p className="text-gray-500 text-[14px] mt-1">Stay updated with classroom activity, marketplace sales, and system alerts.</p>
             </div>
             
             <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-500 rounded-xl text-[13px] font-bold hover:text-black transition-all">
                   <Check size={18} />
                   <span>Mark all as read</span>
                </button>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            
            {/* Notification Categories */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-[24px] border border-gray-200 p-2 shadow-sm sticky top-0">
                 {["All", "Bookings", "System", "Payments", "Social"].map(tab => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`w-full flex items-center justify-between px-5 py-4 text-[13px] font-black uppercase tracking-widest rounded-2xl transition-all ${activeTab === tab ? 'bg-black text-white' : 'text-gray-400 hover:bg-gray-50'}`}
                    >
                       <span>{tab}</span>
                       {tab === 'All' && <span className={`w-5 h-5 flex items-center justify-center rounded-lg text-[10px] ${activeTab === tab ? 'bg-white/20' : 'bg-red-500 text-white'}`}>2</span>}
                    </button>
                 ))}
              </div>
            </div>

            {/* Notification List */}
            <div className="lg:col-span-9">
               <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm overflow-hidden">
                  <div className="divide-y divide-gray-50">
                     {NOTIFICATIONS.map((n) => (
                        <div key={n.id} className={`p-8 flex items-start gap-6 relative group transition-all hover:bg-gray-50/80 cursor-pointer ${n.unread ? 'bg-gray-50/30' : ''}`}>
                           {n.unread && <div className="absolute left-0 top-0 bottom-0 w-1 bg-black"></div>}
                           
                           <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center shrink-0 shadow-sm border border-white ${n.color.replace('bg-', 'bg-opacity-20 text-').replace('text-', 'text-opacity-100 bg-')}`}>
                              <n.icon size={24} className={n.color.replace('bg-', 'text-')} />
                           </div>

                           <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-1 text-left">
                                 <h3 className="text-[17px] font-bold text-[#111827]">{n.title}</h3>
                                 <span className="text-[11px] font-medium text-gray-400">{n.time}</span>
                              </div>
                              <p className="text-[14px] text-gray-600 leading-relaxed font-matter" dangerouslySetInnerHTML={{ __html: n.message }} />
                              
                              <div className="flex items-center gap-4 mt-5 transition-all opacity-0 group-hover:opacity-100">
                                 <button className="text-[11px] font-black uppercase tracking-widest text-black hover:underline underline-offset-4">Take Action</button>
                                 <button className="text-[11px] font-black uppercase tracking-widest text-gray-300 hover:text-red-500">Dismiss</button>
                              </div>
                           </div>

                           <div className="flex flex-col gap-2 shrink-0">
                              <button className="p-2 text-gray-300 hover:text-black hover:bg-white rounded-xl transition-all shadow-sm opacity-0 group-hover:opacity-100">
                                 <MoreVertical size={16} />
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>

                  <div className="p-8 bg-[#F9FAFB] border-t border-gray-50 text-center">
                     <p className="text-[12px] font-bold text-gray-400 italic">No more notifications for today. You're all caught up!</p>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}


