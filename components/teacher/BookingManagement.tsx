"use client";
import { useState } from "react";
import { Check, X, Clock, Calendar, User, Video, MessageSquare, CalendarDays, Users, Star, ArrowUpRight } from "lucide-react";

/**
 * Premium Frozen Core Session Management Architecture
 * Minimalist, high-density, text-forward design.
 */

const MOCK_BOOKINGS = [
  {
    id: 1,
    studentName: "Sarah Johnson",
    studentImage: "https://i.pravatar.cc/150?img=5",
    subject: "Mathematics",
    type: "demo",
    date: "2024-02-15",
    time: "10:00 AM - 11:00 AM",
    status: "pending",
    message: "I need help with calculus concepts",
    requestedAt: "2 hours ago"
  },
  {
    id: 2,
    studentName: "Michael Chen",
    studentImage: "https://i.pravatar.cc/150?img=8",
    subject: "Physics",
    type: "paid",
    date: "2024-02-16",
    time: "2:00 PM - 3:00 PM",
    status: "pending",
    message: "Want to learn quantum mechanics",
    requestedAt: "5 hours ago"
  },
  {
    id: 3,
    studentName: "Emma Wilson",
    studentImage: "https://i.pravatar.cc/150?img=9",
    subject: "Computer Science",
    type: "paid",
    date: "2024-02-17",
    time: "4:00 PM - 5:30 PM",
    status: "pending",
    message: "Need help with data structures",
    requestedAt: "1 day ago"
  },
  {
    id: 4,
    studentName: "David Brown",
    studentImage: "https://i.pravatar.cc/150?img=13",
    subject: "Mathematics",
    type: "demo",
    date: "2024-02-14",
    time: "11:00 AM - 12:00 PM",
    status: "accepted",
    message: "Interested in algebra tutoring",
    requestedAt: "3 days ago"
  },
  {
    id: 5,
    studentName: "Lisa Anderson",
    studentImage: "https://i.pravatar.cc/150?img=16",
    subject: "Physics",
    type: "paid",
    date: "2024-02-13",
    time: "3:00 PM - 4:00 PM",
    status: "rejected",
    message: "Need help with thermodynamics",
    requestedAt: "4 days ago"
  }
];

export default function BookingManagement() {
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "rejected">("all");
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [syncState, setSyncState] = useState<"idle" | "connecting" | "success">("idle");
  const [syncedProvider, setSyncedProvider] = useState<string | null>(null);

  const handleSync = (provider: string) => {
    setSyncState("connecting");
    setTimeout(() => {
      setSyncState("success");
      setSyncedProvider(provider);
      setTimeout(() => {
        setShowSyncModal(false);
        setSyncState("idle");
      }, 1500);
    }, 1200);
  };

  const handleAccept = (id: number) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: "accepted" } : b));
  };

  const handleReject = (id: number) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: "rejected" } : b));
  };

  const filteredBookings = filter === "all" ? bookings : bookings.filter(b => b.status === filter);
  const pendingCount = bookings.filter(b => b.status === "pending").length;
  
  const upcomingCount = 12;
  const totalStudents = 145;
  const conversionRate = 85;

  return (
    <div className="space-y-12 max-w-[1400px] mx-auto">
      
      {/* 1. Hero / Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100/50">
        <div>
           <div className="flex items-center gap-3 mb-2">
             <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
               <CalendarDays className="w-4 h-4 text-white" />
             </div>
             <span className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">Session Pipeline</span>
           </div>
           <h1 className="text-4xl md:text-5xl tracking-tighter text-[#111111] font-medium font-season leading-tight">
             Booking Requests<br />& Scheduling.
           </h1>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowSyncModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#111111] text-white rounded-full text-xs font-bold hover:bg-black/90 shadow-xl transition-all active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>{syncedProvider ? `Synced with ${syncedProvider}` : 'Sync Calendar'}</span>
          </button>
        </div>
      </div>

      {/* 2. Top Stats - Frozen Core Minimalist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
        {[
          { label: "Pending Requests", value: pendingCount.toString(), sub: "Requires attention", icon: Clock },
          { label: "Upcoming Sessions", value: upcomingCount.toString(), sub: "Next 7 days", icon: Video },
          { label: "Active Students", value: totalStudents.toString(), sub: "+12 this month", icon: Users, trend: "+12%" },
          { label: "Trial Conversion", value: `${conversionRate}%`, sub: "Demo to Paid ratio", icon: Star }
        ].map((stat, i) => (
           <div key={i} className="flex flex-col justify-between p-6 bg-white border border-gray-100 rounded-[24px] hover:border-gray-200 transition-colors shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center">
                  <stat.icon className="w-3 h-3 text-gray-400" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</span>
              </div>
              <div>
                <div className="text-4xl font-tight tracking-tighter text-[#111111] mb-2">{stat.value}</div>
                <p className="text-[11px] font-medium text-gray-400">{stat.sub}</p>
              </div>
           </div>
        ))}
      </div>

      {/* 3. Navigation & Content Engine */}
      <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm">
         
         <div className="border-b border-gray-100 px-6 sm:px-10 flex items-center justify-between overflow-x-auto no-scrollbar">
           <div className="flex items-center gap-8">
             {[
                { id: "all", label: "All Requests" },
                { id: "pending", label: "Pending" },
                { id: "accepted", label: "Upcoming" },
                { id: "rejected", label: "Archived" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`relative py-6 text-[11px] font-black uppercase tracking-[0.15em] transition-all whitespace-nowrap flex items-center gap-2 ${
                    filter === tab.id ? "text-black" : "text-gray-300 hover:text-gray-600"
                  }`}
                >
                  {tab.label}
                  {tab.id === 'pending' && pendingCount > 0 && (
                     <span className={`px-1.5 py-0.5 rounded-full text-[9px] ${filter === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>
                       {pendingCount}
                     </span>
                  )}
                  {filter === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black rounded-t-full" />
                  )}
                </button>
              ))}
           </div>
         </div>

         <div className="p-6 sm:p-10">
            <div className="space-y-4">
              {filteredBookings.length === 0 ? (
                <div className="p-16 text-center text-gray-400">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-200" />
                  <p className="text-sm font-medium">No sessions currently in this view.</p>
                </div>
              ) : (
                filteredBookings.map((booking) => (
                  <div key={booking.id} className="group flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 p-6 rounded-[24px] bg-gray-50/50 hover:bg-white border border-transparent hover:border-gray-100 transition-all shadow-sm">
                    
                    {/* Student Identity */}
                    <div className="flex items-center gap-4 min-w-[240px]">
                      <img
                        src={booking.studentImage}
                        alt={booking.studentName}
                        className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div>
                        <h3 className="font-bold text-[#111111] text-lg">{booking.studentName}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-black uppercase tracking-widest ${
                            booking.type === "demo" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                          }`}>
                            {booking.type === "demo" ? "Demo" : "Standard"}
                          </span>
                          <span className="text-[11px] text-gray-400 font-medium">{booking.subject}</span>
                        </div>
                      </div>
                    </div>

                    {/* Schedule Details */}
                    <div className="flex-1 flex flex-col md:flex-row items-start md:items-center gap-8 py-4 xl:py-0 border-y xl:border-y-0 border-gray-100/50 w-full xl:w-auto">
                       <div>
                         <span className="block text-[10px] font-black uppercase tracking-widest text-gray-300 mb-1">Target Date</span>
                         <div className="flex items-center gap-2 text-[#111] font-bold">
                           <Calendar className="w-4 h-4 text-gray-400" />
                           {booking.date}
                         </div>
                       </div>
                       <div>
                         <span className="block text-[10px] font-black uppercase tracking-widest text-gray-300 mb-1">Time Window</span>
                         <div className="flex items-center gap-2 text-[#111] font-bold">
                           <Clock className="w-4 h-4 text-gray-400" />
                           {booking.time}
                         </div>
                       </div>
                    </div>

                    {/* Quick Message/Context */}
                    {booking.message && (
                      <div className="hidden lg:flex max-w-xs flex-1 items-start gap-2 p-3 bg-white rounded-xl border border-gray-100 text-sm text-gray-500 italic">
                        <MessageSquare className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{booking.message}</span>
                      </div>
                    )}

                    {/* Actions & Status Pipeline */}
                    <div className="flex items-center justify-end min-w-[200px] w-full xl:w-auto">
                       {booking.status === "pending" ? (
                         <div className="flex items-center gap-2 w-full sm:w-auto">
                           <button
                             onClick={() => handleAccept(booking.id)}
                             className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-[#111] text-white rounded-full text-[11px] font-bold hover:bg-black/80 transition-all active:scale-95 shadow-md shadow-black/10"
                           >
                             <Check className="w-4 h-4" />
                             Accept
                           </button>
                           <button
                             onClick={() => handleReject(booking.id)}
                             className="flex items-center justify-center p-2.5 bg-white text-gray-400 border border-gray-200 rounded-full hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all"
                           >
                             <X className="w-4 h-4" />
                           </button>
                         </div>
                       ) : (
                         <div className="flex items-center gap-4">
                           <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                             booking.status === "accepted" ? "bg-green-50 text-green-600 border border-green-100" : "bg-red-50 text-red-500 border border-red-100"
                           }`}>
                             <div className={`w-1.5 h-1.5 rounded-full ${booking.status === "accepted" ? "bg-green-500" : "bg-red-500"}`} />
                             {booking.status}
                           </span>
                           
                           {booking.status === "accepted" && (
                             <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold hover:bg-blue-100 transition-colors">
                               <Video className="w-3.5 h-3.5" />
                               Join
                             </button>
                           )}
                         </div>
                       )}
                    </div>

                  </div>
                ))
              )}
            </div>
         </div>

      </div>

      {/* Sync Calendar Modal */}
      {showSyncModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
             onClick={(e) => { if (syncState === "idle") setShowSyncModal(false); }}>
          <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-sm overflow-hidden" 
               onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-[17px] font-bold text-[#111] font-matter">Sync Calendar</h3>
                <p className="text-[12px] text-gray-400 font-matter mt-1">Connect your schedule automatically</p>
              </div>
              {syncState === "idle" && (
                <button onClick={() => setShowSyncModal(false)} className="p-2 text-gray-400 hover:text-[#111] rounded-full hover:bg-gray-50 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="p-6">
              {syncState === "idle" ? (
                <div className="space-y-3">
                  <button 
                    onClick={() => handleSync("Google")}
                    className="w-full flex items-center gap-4 p-4 rounded-[16px] border border-gray-200 hover:border-[#111] hover:bg-gray-50 transition-all text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                      <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-[#111] font-matter">Google Calendar</p>
                      <p className="text-[11px] text-gray-500 font-matter">Sign in with Google</p>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => handleSync("Outlook")}
                    className="w-full flex items-center gap-4 p-4 rounded-[16px] border border-gray-200 hover:border-[#111] hover:bg-gray-50 transition-all text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                      <img src="https://www.svgrepo.com/show/475666/microsoft-color.svg" alt="Outlook" className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-[#111] font-matter">Microsoft Outlook</p>
                      <p className="text-[11px] text-gray-500 font-matter">Office 365 & Exchange</p>
                    </div>
                  </button>
                </div>
              ) : syncState === "connecting" ? (
                <div className="py-8 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 border-4 border-gray-100 border-t-[#111] rounded-full animate-spin mb-4" />
                  <p className="text-[15px] font-bold text-[#111] font-matter">Connecting securely...</p>
                  <p className="text-[12px] text-gray-500 mt-2 font-matter">Please wait while we authenticate your account.</p>
                </div>
              ) : (
                <div className="py-8 flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-7 h-7 text-green-500" />
                  </div>
                  <p className="text-[16px] font-bold text-[#111] font-matter">Sync Complete!</p>
                  <p className="text-[12px] text-gray-500 mt-2 font-matter">Your {syncedProvider} events will now appear on your dashboard.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
