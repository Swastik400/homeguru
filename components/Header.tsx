"use client";

export default function Header() {
  return (
    <header className="flex items-center justify-between w-full flex-wrap gap-4">
      
      {/* Greeting */}
      <h1 className="text-[20px] md:text-[24px] text-[#1a202c]" style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}>
        <span className="font-normal">Good morning, </span>
        <span className="font-semibold">Varun</span>
      </h1>

      {/* Right Side Tools */}
      <div className="flex items-center gap-2 md:gap-3">
        
        {/* Search Icon */}
        <button 
          aria-label="Search"
          className="rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
          style={{ width: '36px', height: '36px', backgroundColor: '#FFFFFF', border: '1px solid #DCDCDC' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#101010" viewBox="0 0 256 256">
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </svg>
        </button>

        {/* Notification Icon */}
        <button 
          aria-label="Notifications"
          className="relative rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
          style={{ width: '36px', height: '36px', backgroundColor: '#FFFFFF', border: '1px solid #DCDCDC' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#101010" viewBox="0 0 256 256">
            <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
          </svg>
          {/* Unread Dot */}
          <span className="absolute top-[6px] right-[8px] w-2 h-2 bg-blue-600 rounded-full border border-white"></span>
        </button>

        {/* Lightning / Streak Counter */}
        <div className="hidden sm:flex rounded-full items-center gap-2 font-medium" style={{ width: '67px', height: '36px', backgroundColor: '#FFFFFF', border: '1px solid #DCDCDC', paddingLeft: '12px', paddingRight: '12px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#141B34" viewBox="0 0 256 256">
            <path d="M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z"></path>
          </svg>
          <span style={{ color: '#141B34' }}>0</span>
        </div>

        {/* Upgrade Button */}
        <button className="hidden md:block rounded-full hover:opacity-80 transition-opacity" style={{ width: '100px', height: '36px', backgroundColor: '#FFFFFF', border: '1px solid #E4D08A', color: '#5A4B15', fontFamily: 'var(--font-dm-sans)', fontSize: '15px', fontWeight: '500' }}>
          Upgrade
        </button>

        {/* User Profile Avatar */}
        <button className="ml-2 w-[42px] h-[42px] rounded-full overflow-hidden border border-gray-200 hover:opacity-90 transition-opacity">
          <img 
            src="https://i.pravatar.cc/150?img=33" 
            alt="User profile" 
            className="w-full h-full object-cover"
          />
        </button>
        
      </div>
    </header>
  );
}
