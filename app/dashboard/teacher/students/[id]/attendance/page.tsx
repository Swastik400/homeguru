"use client";
import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  FileSpreadsheet,
  ChevronDown
} from 'lucide-react';
import AttendanceCalendar from '@/components/teacher/analytics/AttendanceCalendar';

export default function AttendanceRecordPage() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // You could trigger filtering logic here
    console.log("Selected date for filtering:", date);
  };

  return (
    <div className="space-y-6">
      {/* Attendance Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Classes", value: "26", sub: "Since enrollment", icon: <Calendar size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Present", value: "24", sub: "92.3% rate", icon: <CheckCircle2 size={20} />, color: "text-green-600", bg: "bg-green-50" },
          { label: "Absent", value: "1", sub: "Excused: 1", icon: <XCircle size={20} />, color: "text-red-600", bg: "bg-red-50" },
          { label: "Late जॉइन", value: "1", sub: "Avg: 8 mins", icon: <AlertTriangle size={20} />, color: "text-amber-600", bg: "bg-amber-50" }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center mb-3`}>
              {stat.icon}
            </div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-gray-400 text-xs font-medium">{stat.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Attendance Log Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-lg">Monthly Attendance Log</h3>
          <div className="flex items-center gap-3">
             <div className="relative">
               <button 
                 onClick={() => setShowCalendar(!showCalendar)}
                 className="flex items-center gap-2.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
               >
                 <Calendar size={16} className="text-gray-400" />
                 <span>{selectedDate ? selectedDate.toLocaleDateString() : 'Mar 2026'}</span>
                 <ChevronDown size={14} className="text-gray-400" />
               </button>

               {showCalendar && (
                 <AttendanceCalendar 
                   onSelectDate={handleDateSelect} 
                   onClose={() => setShowCalendar(false)} 
                 />
               )}
             </div>

             <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600" title="Export Spreadsheet">
               <FileSpreadsheet size={16} />
             </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Date</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Class / Session</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Duration</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Login Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { date: "Mar 12, 2026", session: "English Speaking & Public Speaking", duration: "60 mins", status: "Present", time: "09:44 AM" },
                { date: "Mar 10, 2026", session: "English Speaking & Public Speaking", duration: "60 mins", status: "Present", time: "09:52 AM" },
                { date: "Mar 08, 2026", session: "English Speaking & Public Speaking", duration: "60 mins", status: "Late", time: "10:05 AM" },
                { date: "Mar 05, 2026", session: "English Speaking & Public Speaking", duration: "60 mins", status: "Present", time: "09:48 AM" },
                { date: "Mar 03, 2026", session: "English Speaking & Public Speaking", duration: "60 mins", status: "Absent", time: "-" }
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-all group">
                  <td className="py-4 px-6 font-bold text-gray-800 text-sm whitespace-nowrap">{item.date}</td>
                  <td className="py-4 px-6 text-sm text-gray-600 font-medium">{item.session}</td>
                  <td className="py-4 px-6 text-sm text-gray-500 font-bold">{item.duration}</td>
                  <td className="py-4 px-6">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${
                      item.status === 'Present' ? 'bg-green-50 text-green-600 border-green-100' :
                      item.status === 'Late' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      'bg-red-50 text-red-600 border-red-100'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 font-bold">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
