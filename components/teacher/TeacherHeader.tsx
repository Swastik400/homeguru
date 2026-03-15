"use client";
import { useState, memo, useEffect, useRef } from "react";
import { MagnifyingGlass, Bell, VideoCamera, Plus, CalendarBlank, CheckCircle, Clock, Info, X, DotsThreeVertical, Star, Coins } from "@phosphor-icons/react";

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'submission',
    title: 'New assignment submission',
    message: 'Varun Sharma submitted "English Essay"',
    time: '2 mins ago',
    isRead: false,
    icon: <CheckCircle weight="fill" className="text-green-500" />
  },
  {
    id: 2,
    type: 'class',
    title: 'Class starting soon',
    message: 'Advanced React starts in 15 minutes',
    time: '12 mins ago',
    isRead: false,
    icon: <Clock weight="fill" className="text-blue-500" />
  },
  {
    id: 3,
    type: 'system',
    title: 'KYC Verified',
    message: 'Your documents have been approved.',
    time: '1 hour ago',
    isRead: true,
    icon: <Info weight="fill" className="text-gray-400" />
  }
];

export default memo(function TeacherHeader() {
  const [isOnline, setIsOnline] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard controls
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setShowNotifications(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-focus search input
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <header className="flex items-center justify-between w-full flex-wrap gap-4 font-matter">
      
      {/* Greeting */}
      <h1 className="text-[20px] md:text-[24px] text-[#1a202c] font-season">
        <span>Good morning, </span>
        <span>Cersei</span>
      </h1>

      {/* Right Side Tools */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Action Buttons & Search Wrapper */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Container that handles the sliding/pushing logic */}
          <div className="flex items-center transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
            {/* Action Buttons Container - Stay visible, just move left */}
            <div className={`flex items-center gap-2 mr-2 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]`}>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-black transition-all shadow-sm active:scale-95 whitespace-nowrap">
                <VideoCamera size={16} weight="bold" />
                <span>Start Live Class</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-black transition-all shadow-sm active:scale-95 whitespace-nowrap">
                <Plus size={16} weight="bold" />
                <span>Create Course</span>
              </button>
            </div>
            
            {/* Search Section */}
            <div className="relative flex items-center" ref={searchRef}>
              {/* Expanding Search Bar */}
              <div className={`flex items-center transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isSearchOpen ? 'w-[280px] md:w-[320px] opacity-100' : 'w-0 opacity-0 pointer-events-none'
              } overflow-hidden`}>
                <div className="relative w-full pr-2">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search anything..."
                    className="w-full h-[40px] pl-10 pr-10 bg-white border border-[#DCDCDC] rounded-full text-[14px] font-matter focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all shadow-sm"
                  />
                  <MagnifyingGlass size={18} weight="bold" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <button 
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
                  >
                    <X size={14} weight="bold" />
                  </button>
                </div>
              </div>

              {/* Search Toggle Button - Transitioned visibility for smooth closure */}
              <div className={`flex items-center transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isSearchOpen ? 'w-0 opacity-0 pointer-events-none overflow-hidden' : 'w-[40px] opacity-100 ml-0'
              }`}>
                <button 
                  aria-label="Search"
                  onClick={() => setIsSearchOpen(true)}
                  className="rounded-full flex items-center justify-center bg-white hover:bg-gray-50 flex-shrink-0"
                  style={{ width: '40px', height: '40px', border: '1px solid #DCDCDC' }}
                >
                  <MagnifyingGlass size={20} weight="bold" className="text-[#101010]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Icon */}
        <div className="relative" ref={dropdownRef}>
          <button 
            aria-label="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative rounded-full flex items-center justify-center transition-all ${
              showNotifications ? 'bg-gray-100 scale-95' : 'bg-white hover:bg-gray-50'
            }`}
            style={{ width: '40px', height: '40px', border: '1px solid #DCDCDC' }}
          >
            <Bell size={20} weight={showNotifications ? "fill" : "bold"} className="text-[#101010]" />
            {/* Unread Dot */}
            <span className="absolute top-[8px] right-[10px] w-2 h-2 bg-blue-600 rounded-full border border-white"></span>
          </button>

          {/* Premium Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-[320px] bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-[#EEE] z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Dropdown Header */}
              <div className="px-5 py-4 border-b border-[#F5F5F5] flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0">
                <h3 className="text-[15px] font-bold text-[#111]">Notifications</h3>
                <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700 transition-colors">
                  Mark all as read
                </button>
              </div>

              {/* Notification List */}
              <div className="max-h-[380px] overflow-y-auto custom-scrollbar">
                {NOTIFICATIONS.length > 0 ? (
                  <div className="flex flex-col">
                    {NOTIFICATIONS.map((notif) => (
                      <div 
                        key={notif.id}
                        className={`px-5 py-4 flex gap-3 hover:bg-[#F9FAFB] cursor-pointer transition-colors border-b border-[#FAFAFA] last:border-none ${
                          !notif.isRead ? 'bg-[#F0F7FF]/30' : ''
                        }`}
                      >
                        <div className="w-10 h-10 rounded-full bg-white border border-[#EEE] flex items-center justify-center shrink-0 shadow-sm text-[20px]">
                          {notif.icon}
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                             <p className="text-[13px] font-bold text-[#111] truncate">{notif.title}</p>
                             {!notif.isRead && <div className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />}
                          </div>
                          <p className="text-[12px] text-[#666] leading-snug line-clamp-2">{notif.message}</p>
                          <p className="text-[10px] text-[#AAA] font-medium mt-1 uppercase tracking-tighter">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-10 py-12 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                      <Bell size={24} className="text-gray-300" />
                    </div>
                    <p className="text-[13px] text-gray-400 font-medium font-matter">No new notifications</p>
                  </div>
                )}
              </div>

              {/* View All Footer */}
              <button className="w-full py-3.5 text-[12px] font-bold text-[#444] bg-[#F9FAFB] hover:bg-[#F3F4F6] transition-colors border-t border-[#EEE] uppercase tracking-widest flex items-center justify-center gap-1.5">
                View all notifications
                <X size={12} weight="bold" className="rotate-45" />
              </button>
            </div>
          )}
        </div>

        {/* Credit/Score Indicator */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/[0.03] border border-black/5 rounded-full hover:bg-black/5 transition-all cursor-pointer group">
            <Star size={14} weight="fill" className="text-amber-500 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col leading-none">
              <span className="text-[10px] font-black uppercase tracking-tighter text-black">850</span>
              <span className="text-[7px] font-bold uppercase tracking-widest text-gray-400">Score</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/[0.03] border border-black/5 rounded-full hover:bg-black/5 transition-all cursor-pointer group">
            <Coins size={14} weight="fill" className="text-blue-500 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col leading-none">
              <span className="text-[10px] font-black uppercase tracking-tighter text-black">₹1,200</span>
              <span className="text-[7px] font-bold uppercase tracking-widest text-gray-400">Credit</span>
            </div>
          </div>
        </div>

        {/* Calendar/Date */}
        <div className="hidden md:flex rounded-full items-center gap-2 font-medium" style={{ width: '90px', height: '36px', backgroundColor: '#FFFFFF', border: '1px solid #DCDCDC', paddingLeft: '12px', paddingRight: '12px' }}>
          <CalendarBlank size={18} weight="bold" className="text-[#141B34]" />
          <span style={{ color: '#141B34', fontSize: '13px' }}>12 Mar</span>
        </div>

        {/* User Profile Avatar */}
        <button className="ml-2 w-[42px] h-[42px] rounded-full overflow-hidden border border-gray-200 hover:opacity-90 transition-opacity">
          <img 
            src="https://i.pravatar.cc/150?img=47" 
            alt="Teacher profile" 
            className="w-full h-full object-cover"
          />
        </button>
        
      </div>
    </header>
  );
});
