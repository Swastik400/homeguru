"use client";
import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Plus, MapPin, Search, Filter, Calendar as CalendarIcon, Clock, Users, X, Trash2 } from "lucide-react";

/**
 * Enterprise Schedule / Calendar Page based on Preline UI design
 * Full interactive month calendar.
 */

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface Event {
  id: string;
  title: string;
  dateKey: string; // Format: YYYY-MM-DD for easy matching
  time: string;
  color: string;
}

// Helper: Ensure 2 digits
const padZero = (num: number) => num.toString().padStart(2, '0');

// Helper to get calendar days for a given month and year
function getCalendarDays(year: number, month: number) {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday
  
  // Adjust so Monday is 0, Sunday is 6
  let offset = startingDayOfWeek - 1;
  if (offset === -1) offset = 6;
  
  const days = [];
  
  // Previous month's trailing days
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = offset - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, prevMonthLastDay - i);
    days.push({
      date: d,
      dateKey: `${d.getFullYear()}-${padZero(d.getMonth() + 1)}-${padZero(d.getDate())}`,
      day: prevMonthLastDay - i,
      month: 'prev',
    });
  }
  
  // Current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, month, i);
    days.push({
      date: d,
      dateKey: `${d.getFullYear()}-${padZero(d.getMonth() + 1)}-${padZero(d.getDate())}`,
      day: i,
      month: 'current',
      isToday: new Date().toDateString() === d.toDateString()
    });
  }
  
  // Next month's leading days to complete the grid (usually 42 cells total for 6 weeks)
  const remainingCells = 42 - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    const d = new Date(year, month + 1, i);
    days.push({
      date: d,
      dateKey: `${d.getFullYear()}-${padZero(d.getMonth() + 1)}-${padZero(d.getDate())}`,
      day: i,
      month: 'next',
    });
  }
  
  return days;
}

export default function SchedulePage() {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  // Initialize with some dummy events around current month
  const initialEvents: Event[] = [
    { id: '1', title: 'English Speaking', dateKey: `${currentYear}-${padZero(currentMonth + 1)}-05`, time: '10:00 - 11:30', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { id: '2', title: 'Advanced Calculus', dateKey: `${currentYear}-${padZero(currentMonth + 1)}-12`, time: '14:00 - 15:00', color: 'bg-green-100 text-green-700 border-green-200' },
    { id: '3', title: 'Parent Meeting', dateKey: `${currentYear}-${padZero(currentMonth + 1)}-12`, time: '16:30 - 17:00', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    { id: '4', title: 'UI/UX Masterclass', dateKey: `${currentYear}-${padZero(currentMonth + 1)}-22`, time: '09:00 - 12:00', color: 'bg-purple-100 text-purple-700 border-purple-200' },
    { id: '5', title: 'Physics Mock Test', dateKey: `${currentYear}-${padZero(currentMonth + 1)}-28`, time: '11:00 - 13:00', color: 'bg-red-100 text-red-700 border-red-200' },
  ];

  const [events, setEvents] = useState<Event[]>(initialEvents);
  
  // Create Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateKey, setSelectedDateKey] = useState<string>('');
  const [formData, setFormData] = useState({ title: '', time: '09:00 - 10:00', color: 'bg-blue-100 text-blue-700 border-blue-200' });

  // View Modal State
  const [viewEvent, setViewEvent] = useState<Event | null>(null);

  const days = useMemo(() => getCalendarDays(currentYear, currentMonth), [currentYear, currentMonth]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleToday = () => {
    setCurrentMonth(currentDate.getMonth());
    setCurrentYear(currentDate.getFullYear());
  };

  const openCreateModal = (dateKey?: string) => {
    setSelectedDateKey(dateKey || `${currentYear}-${padZero(currentMonth + 1)}-${padZero(currentDate.getDate())}`);
    setFormData({ title: '', time: '09:00 - 10:00', color: 'bg-blue-100 text-blue-700 border-blue-200' });
    setIsModalOpen(true);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const newEvent: Event = {
      id: Math.random().toString(36).substring(2, 9),
      title: formData.title,
      dateKey: selectedDateKey,
      time: formData.time,
      color: formData.color,
    };

    setEvents([...events, newEvent]);
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(ev => ev.id !== id));
    setViewEvent(null);
  };

  const getEventsForDate = (dateKey: string) => {
    return events.filter(e => e.dateKey === dateKey);
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 relative">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-gray-100/50">
        <div>
           <div className="flex items-center gap-3 mb-2">
             <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
               <CalendarIcon className="w-4 h-4 text-white" />
             </div>
             <span className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">Timetable</span>
           </div>
           <h1 className="text-3xl md:text-4xl tracking-tighter text-[#111111] font-medium font-season leading-tight">
             Calendar Schedule.
           </h1>
        </div>
        
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-[#344054] rounded-xl text-[12px] font-bold shadow-sm hover:bg-gray-50 transition-all">
              <Filter className="w-4 h-4 text-gray-400" />
              <span>Filters</span>
           </button>
           <button 
             onClick={() => openCreateModal()}
             className="flex items-center gap-2 px-5 py-2.5 bg-[#111827] text-white rounded-xl text-[12px] font-bold shadow-sm hover:bg-black transition-all active:scale-95">
              <Plus className="w-4 h-4" />
              <span>Create Event</span>
           </button>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        
        {/* Calendar Controls */}
        <div className="p-4 md:p-6 flex items-center justify-between border-b border-gray-200 bg-white">
           <div className="flex items-center gap-6">
              <h2 className="text-xl font-bold text-gray-900 w-48 font-season">
                 {monthNames[currentMonth]} {currentYear}
              </h2>
              
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg p-0.5">
                 <button onClick={handlePrevMonth} className="p-1.5 text-gray-500 hover:text-black hover:bg-white rounded-md transition-colors hover:shadow-sm">
                    <ChevronLeft className="w-5 h-5" />
                 </button>
                 <span className="w-px h-4 bg-gray-200 mx-1"></span>
                 <button onClick={handleNextMonth} className="p-1.5 text-gray-500 hover:text-black hover:bg-white rounded-md transition-colors hover:shadow-sm">
                    <ChevronRight className="w-5 h-5" />
                 </button>
              </div>
           </div>
           
           <div className="flex bg-gray-50 border border-gray-200 rounded-lg p-0.5">
              <button onClick={handleToday} className="px-4 py-1.5 text-[13px] font-medium text-gray-700 bg-white shadow-sm rounded-md border border-gray-200/50">
                 Today
              </button>
           </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50/50">
           {DAYS_OF_WEEK.map((day) => (
              <div key={day} className="px-4 py-3 text-sm font-semibold text-gray-500 hidden md:block border-r border-gray-200 last:border-r-0">
                 {day}
              </div>
           ))}
           {/* Mobile view short days */}
           {DAYS_OF_WEEK.map((day) => (
              <div key={day + '-mobile'} className="px-2 py-3 text-xs justify-center font-semibold text-gray-500 flex md:hidden border-r border-gray-200 last:border-r-0 uppercase tracking-wide">
                 {day.substring(0, 3)}
              </div>
           ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 flex-1 bg-gray-200 gap-px border-b border-gray-200">
           {days.map((dayObj, i) => {
              const dateEvents = getEventsForDate(dayObj.dateKey);
              
              return (
                 <div 
                    key={i} 
                    className={`min-h-[120px] md:min-h-[160px] bg-white p-2 transition-colors hover:bg-gray-50 flex flex-col group ${
                       dayObj.month !== 'current' ? 'bg-gray-50/50' : ''
                    }`}
                 >
                    {/* Date Number Header */}
                    <div className="flex items-center justify-between mb-1">
                       <span 
                          className={`flex items-center justify-center w-7 h-7 text-sm rounded-full font-medium cursor-pointer ${
                             dayObj.isToday 
                                ? 'bg-blue-600 text-white' 
                                : dayObj.month === 'current' 
                                   ? 'text-gray-900 hover:bg-gray-200' 
                                   : 'text-gray-400 hover:bg-gray-200'
                          }`}
                          onClick={() => openCreateModal(dayObj.dateKey)}
                       >
                          {dayObj.day}
                       </span>
                    </div>

                    {/* Events Container */}
                    <div className="flex-1 overflow-y-auto no-scrollbar space-y-1 mt-1">
                       {dateEvents.map(event => (
                          <div 
                             key={event.id}
                             onClick={() => setViewEvent(event)}
                             className={`px-2 py-1.5 rounded-md text-xs font-medium border ${event.color} cursor-pointer hover:opacity-80 transition-opacity truncate flex flex-col gap-0.5`}
                          >
                             <span className="truncate block">{event.title}</span>
                             <span className="opacity-70 text-[10px] font-medium tracking-wide truncate">{event.time}</span>
                          </div>
                       ))}
                    </div>
                 </div>
              );
           })}
        </div>

      </div>

      {/* Create Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-season font-bold text-gray-900">New Schedule Event</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateEvent} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Event Title</label>
                <input 
                  type="text" 
                  autoFocus
                  required
                  placeholder="e.g. Physics Mock Test"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Date</label>
                  <input 
                    type="date" 
                    required
                    value={selectedDateKey}
                    onChange={e => setSelectedDateKey(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Time</label>
                  <input 
                    type="text" 
                    required
                    placeholder="09:00 - 10:00"
                    value={formData.time}
                    onChange={e => setFormData({...formData, time: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Color Label</label>
                <div className="flex gap-2">
                  {[
                    'bg-blue-100 text-blue-700 border-blue-200',
                    'bg-green-100 text-green-700 border-green-200',
                    'bg-purple-100 text-purple-700 border-purple-200',
                    'bg-red-100 text-red-700 border-red-200',
                    'bg-amber-100 text-amber-700 border-amber-200'
                  ].map(colorStr => (
                    <button
                      key={colorStr}
                      type="button"
                      onClick={() => setFormData({...formData, color: colorStr})}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${colorStr.split(' ')[0]} ${formData.color === colorStr ? 'border-gray-900 scale-110 shadow-sm' : 'border-transparent'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="w-full py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-colors shadow-lg active:scale-95 text-sm"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View/Delete Event Modal */}
      {viewEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* The top color bar */}
            <div className={`px-6 py-5 border-b ${viewEvent.color.split(' ')[0]} border-opacity-20 flex items-center justify-between`}>
              <div className={`px-2.5 py-1 rounded text-xs font-bold ${viewEvent.color}`}>Scheduled Session</div>
              <button 
                onClick={() => setViewEvent(null)}
                className="text-gray-500 hover:text-black transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 font-season leading-tight mb-4">{viewEvent.title}</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CalendarIcon size={16} className="text-gray-400" />
                  <span className="font-medium">
                    {(() => {
                      const [y, m, d] = viewEvent.dateKey.split('-');
                      return new Date(parseInt(y), parseInt(m)-1, parseInt(d)).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                    })()}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Clock size={16} className="text-gray-400" />
                  <span className="font-medium">{viewEvent.time}</span>
                </div>
              </div>

              <button 
                onClick={() => handleDeleteEvent(viewEvent.id)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors text-sm"
              >
                <Trash2 size={16} />
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
