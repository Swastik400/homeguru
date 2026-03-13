"use client";
import { useState, memo } from "react";
import { Search, Bell, Video, Plus } from "lucide-react";

export default memo(function TeacherHeader() {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <header className="flex items-center justify-between w-full flex-wrap gap-4 font-matter">
      
      {/* Greeting */}
      <h1 className="text-[20px] md:text-[24px] text-[#1a202c] font-season">
        <span>Good morning, </span>
        <span>Cersei</span>
      </h1>

      {/* Right Side Tools */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-2 mr-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-black transition-all shadow-sm active:scale-95">
            <Video size={16} />
            <span>Start Live Class</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-black transition-all shadow-sm active:scale-95">
            <Plus size={16} />
            <span>Create Course</span>
          </button>
        </div>
        
        {/* Search Icon */}
        <button 
          aria-label="Search"
          className="rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
          style={{ width: '36px', height: '36px', backgroundColor: '#FFFFFF', border: '1px solid #DCDCDC' }}
        >
          <Search size={20} className="text-[#101010]" />
        </button>

        {/* Notification Icon */}
        <button 
          aria-label="Notifications"
          className="relative rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
          style={{ width: '36px', height: '36px', backgroundColor: '#FFFFFF', border: '1px solid #DCDCDC' }}
        >
          <Bell size={20} className="text-[#101010]" />
          {/* Unread Dot */}
          <span className="absolute top-[6px] right-[8px] w-2 h-2 bg-blue-600 rounded-full border border-white"></span>
        </button>

        {/* Status Toggle */}
        <div 
          onClick={() => setIsOnline(!isOnline)}
          className={`hidden sm:flex rounded-full items-center gap-2 cursor-pointer transition-all ${
            isOnline ? 'bg-[#F0FDF4] border-[#DCFCE7]' : 'bg-white border-[#DCDCDC]'
          }`}
          style={{ width: '80px', height: '36px', border: '1px solid', paddingLeft: '12px', paddingRight: '12px' }}
        >
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-[#22C55E] animate-pulse' : 'bg-[#94A3B8]'}`}></div>
          <span className={`text-[13px] font-semibold ${isOnline ? 'text-[#166534]' : 'text-[#64748B]'}`}>
            {isOnline ? 'Active' : 'Offline'}
          </span>
        </div>

        {/* Calendar/Date */}
        <div className="hidden md:flex rounded-full items-center gap-2 font-medium" style={{ width: '90px', height: '36px', backgroundColor: '#FFFFFF', border: '1px solid #DCDCDC', paddingLeft: '12px', paddingRight: '12px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#141B34" viewBox="0 0 256 256">
            <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"></path>
          </svg>
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
