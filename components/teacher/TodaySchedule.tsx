"use client";
import { Clock, VideoCamera, User, CheckCircle, Play } from "@phosphor-icons/react";

const SCHEDULE = [
  {
    id: 1,
    subject: "English Speaking",
    level: "Intermediate",
    time: "10:00 – 11:00 AM",
    studentName: "Varun Sharma",
    avatar: "https://i.pravatar.cc/150?img=33",
    status: "Live",
    startsIn: "Now",
    color: "#EEF4FF",
  },
  {
    id: 2,
    subject: "Advanced Calculus",
    level: "Advanced",
    time: "12:00 – 1:30 PM",
    studentName: "Batch B",
    avatar: "https://i.pravatar.cc/150?img=15",
    status: "Upcoming",
    startsIn: "2h 35m",
    color: "#F0FAF4",
  },
  {
    id: 3,
    subject: "Physics – Motion",
    level: "Intermediate",
    time: "3:00 – 4:00 PM",
    studentName: "Rahul & Meera",
    avatar: "https://i.pravatar.cc/150?img=12",
    status: "Upcoming",
    startsIn: "5h 5m",
    color: "#FDF9EE",
  },
  {
    id: 4,
    subject: "Web Development",
    level: "Beginner",
    time: "9:00 – 9:45 AM",
    studentName: "Batch C",
    avatar: "https://i.pravatar.cc/150?img=25",
    status: "Completed",
    startsIn: "done",
    color: "#FEF3F2",
  },
];

export default function TodaySchedule() {
  return (
    <div className="w-full bg-white rounded-[24px] border border-[#E2E8F0] font-matter shadow-sm flex flex-col overflow-hidden" style={{ maxHeight: '480px' }}>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 shrink-0 border-b border-[#F1F5F9] bg-[#FBFBFC]">
        <div className="flex items-center gap-2.5">
          <Clock size={18} weight="bold" className="text-[#0F172A]" />
          <h2 className="text-[#0F172A] font-season font-bold text-[18px] tracking-tight">Today's Schedule</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-[#64748B] bg-white px-3 py-1.5 rounded-full border border-[#E2E8F0] shadow-sm uppercase tracking-wider">
            Thu, 12 Mar
          </span>
        </div>
      </div>

      {/* Scrollable List */}
      <div className="overflow-y-auto flex-1 divide-y divide-[#F9FAFB] custom-scrollbar">
        {SCHEDULE.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 px-6 py-4 hover:bg-[#FAFAFA] transition-all group"
          >
            {/* Avatar with Status Ring */}
            <div className="relative shrink-0">
              <div className={`w-10 h-10 rounded-full overflow-hidden border-2 ${item.status === 'Live' ? 'border-green-500 animate-pulse' : 'border-gray-100'}`}>
                <img src={item.avatar} alt={item.studentName} className="w-full h-full object-cover" />
              </div>
              {item.status === 'Live' && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-2 min-w-0">
                <span className={`text-[14px] font-bold truncate ${item.status === 'Completed' ? 'text-gray-400' : 'text-[#111827]'}`}>
                  {item.subject}
                </span>
                {item.status === 'Live' && (
                  <span className="bg-red-50 text-red-600 text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border border-red-100">Live</span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400 truncate">
                  <User size={10} weight="bold" />
                  <span>{item.studentName}</span>
                </div>
                <span className="text-gray-200 text-[11px]">|</span>
                <span className="text-[11px] font-bold text-gray-400">{item.time}</span>
              </div>
            </div>

            {/* Actions Stack */}
            <div className="flex flex-col items-end gap-2 shrink-0">
              {item.status === 'Live' ? (
                <button className="flex items-center gap-2 text-[11px] text-white bg-[#0F172A] px-4 py-2 rounded-xl shadow-md hover:bg-[#1E293B] transition-all font-bold active:scale-95">
                  <Play size={10} weight="fill" />
                  Join
                </button>
              ) : item.status === 'Completed' ? (
                <div className="flex items-center gap-1.5 text-[#166534] bg-[#F0FDF4] px-3 py-1.5 rounded-full border border-[#DCFCE7] text-[11px] font-bold">
                  <CheckCircle size={14} weight="bold" />
                  <span>Done</span>
                </div>
              ) : (
                <div className="flex flex-col items-end gap-1">
                  <button className="text-[11px] text-[#0F172A] bg-white border border-[#E2E8F0] px-4 py-2 rounded-xl hover:bg-[#F8FAFC] transition-all font-bold shadow-sm active:scale-95">
                    Profile
                  </button>
                  <span className="text-[10px] text-[#94A3B8] font-semibold uppercase tracking-tighter">in {item.startsIn}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Insight */}
      <div className="px-6 py-3 bg-[#F9FAFB] border-t border-[#F3F4F6] rounded-b-[20px]">
        <p className="text-[11px] text-gray-500 font-medium">
          <span className="text-black font-bold">Pro Tip:</span> Set up your whiteboard 5 mins before class.
        </p>
      </div>
    </div>
  );
}
