"use client";
import { useState } from "react";
import { Calendar, Clock, Globe, Settings, Save, AlertCircle, Plus, Trash2, Check, ChevronRight, ChevronDown } from "lucide-react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function AvailabilityPage() {
  const [timezone, setTimezone] = useState("UTC +5:30 (India Standard Time)");
  const [autoAccept, setAutoAccept] = useState(false);
  
  // State for slots per day
  const [slots, setSlots] = useState({
    Monday: [{ from: "09:00 AM", to: "12:00 PM" }, { from: "02:00 PM", to: "05:00 PM" }],
    Tuesday: [{ from: "09:00 AM", to: "05:00 PM" }],
    Wednesday: [{ from: "09:00 AM", to: "05:00 PM" }],
    Thursday: [{ from: "09:00 AM", to: "05:00 PM" }],
    Friday: [{ from: "09:00 AM", to: "12:00 PM" }],
    Saturday: [],
    Sunday: [],
  });

  return (
    <>
      <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
         <div>
            <h1 className="text-[24px] font-season font-bold text-[#111827]">Availability Settings</h1>
            <p className="text-gray-500 text-[14px] mt-1">Set your teaching hours and slot preferences for the marketplace.</p>
         </div>
         <button className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-xl text-[14px] font-bold shadow-lg hover:bg-black/90 transition-all active:scale-95">
            <Save size={18} />
            <span>Save Changes</span>
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        
        {/* Left: General Configuration */}
        <div className="lg:col-span-4 flex flex-col gap-6">
           
           {/* Global Preferences */}
           <div className="bg-white rounded-[24px] border border-gray-200 p-6 shadow-sm">
              <h3 className="text-[16px] font-season font-bold mb-5 flex items-center gap-2">
                 <Settings size={18} />
                 Global Preferences
              </h3>
              
              <div className="space-y-6">
                 <div>
                    <label className="text-[12px] font-black uppercase text-gray-400 tracking-wider block mb-2">Timezone</label>
                    <div className="relative">
                       <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                       <select 
                         className="w-full bg-gray-50 border border-gray-200 rounded-xl px-9 py-2.5 text-[14px] font-medium appearance-none focus:ring-2 focus:ring-black/5"
                         value={timezone}
                         onChange={(e) => setTimezone(e.target.value)}
                       >
                          <option>UTC +5:30 (India Standard Time)</option>
                          <option>UTC +0:00 (GMT)</option>
                          <option>UTC -5:00 (EST)</option>
                       </select>
                       <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                 </div>

                 <div>
                    <label className="text-[12px] font-black uppercase text-gray-400 tracking-wider block mb-2">Default Slot Duration</label>
                    <div className="grid grid-cols-3 gap-2">
                       {["30", "60", "90"].map(m => (
                          <button key={m} className={`py-2 rounded-xl border text-[13px] font-bold transition-all ${m === "60" ? "bg-black text-white border-black" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                             {m}m
                          </button>
                       ))}
                    </div>
                 </div>

                 <div className="pt-4 border-t border-gray-50">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[14px] font-bold text-gray-700">Auto-Accept Bookings</span>
                       <div 
                         onClick={() => setAutoAccept(!autoAccept)}
                         className={`w-12 h-6 rounded-full transition-all relative cursor-pointer ${autoAccept ? 'bg-green-500' : 'bg-gray-200'}`}
                       >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${autoAccept ? 'left-7' : 'left-1'}`}></div>
                       </div>
                    </div>
                    <p className="text-[12px] text-gray-400 leading-relaxed font-medium">Instantly confirm all bookings that match your availability slots without manual approval.</p>
                 </div>
              </div>
           </div>

           {/* Notice */}
           <div className="bg-amber-50 border border-amber-100 rounded-[24px] p-6">
              <div className="flex gap-3">
                 <AlertCircle className="text-amber-500 shrink-0" size={20} />
                 <div>
                    <h4 className="text-[14px] font-bold text-amber-900 mb-1">Calendar Sync Active</h4>
                    <p className="text-[12px] text-amber-700/80 leading-relaxed">Your availability is currently synced with **Google Calendar**. Changes here will update your public marketplace profile.</p>
                 </div>
              </div>
           </div>

        </div>

        {/* Right: Weekly Schedule Table */}
        <div className="lg:col-span-8 flex flex-col gap-6">
           <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm overflow-hidden text-left">
              <div className="px-8 py-5 border-b border-gray-50 bg-[#F9FAFB]/50 flex items-center justify-between">
                 <h3 className="text-[16px] font-season font-bold">Teaching Weekly Schedule</h3>
                 <span className="text-[11px] font-bold text-gray-500">24 Total Weekly Hours</span>
              </div>

              <div className="divide-y divide-gray-50">
                 {DAYS.map((day) => (
                    <div key={day} className="px-8 py-6 flex flex-col md:flex-row md:items-start gap-6 group hover:bg-gray-50/50 transition-all">
                       <div className="w-[120px] shrink-0 pt-1">
                          <span className="text-[15px] font-bold text-[#111827]">{day}</span>
                          {slots[day].length === 0 ? (
                            <p className="text-[11px] font-medium text-red-500 mt-0.5">Off Duty</p>
                          ) : (
                            <p className="text-[11px] font-medium text-green-500 mt-0.5">{slots[day].length} slots active</p>
                          )}
                       </div>

                       <div className="flex-1 flex flex-col gap-3">
                          {slots[day].length > 0 ? (
                             slots[day].map((slot, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                   <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm min-w-[280px]">
                                      <Clock size={14} className="text-gray-400" />
                                      <span className="text-[13px] font-bold text-gray-700">{slot.from}</span>
                                      <span className="text-gray-300 mx-2">—</span>
                                      <span className="text-[13px] font-bold text-gray-700">{slot.to}</span>
                                   </div>
                                   <button className="p-2 text-gray-400 hover:text-red-500 transition-all hover:bg-red-50 rounded-lg">
                                      <Trash2 size={16} />
                                   </button>
                                </div>
                             ))
                          ) : (
                             <div className="text-[13px] text-gray-400 font-medium italic py-2">No active teaching hours scheduled for {day.toLowerCase()}.</div>
                          )}
                          
                          <button className="flex items-center gap-2 text-[12px] font-bold text-black border border-gray-200 bg-white px-4 py-2 rounded-xl self-start hover:bg-gray-50 active:scale-95 transition-all mt-1">
                             <Plus size={14} />
                             <span>Add Time Slot</span>
                          </button>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </>
  );
}


