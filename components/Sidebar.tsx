"use client";
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const navGroups = [
    {
      label: 'MAIN',
      items: [
        { 
          name: 'Home', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"></path></svg>,
          isActive: true 
        },
        { 
          name: 'My Schedule', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-64-56a16,16,0,1,1-16-16A16,16,0,0,1,144,152Z"></path></svg>,
          isActive: false 
        },
        { 
          name: 'Learning Roadmap', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M228.92,49.69a8,8,0,0,0-6.86-1.45L160.93,63.52,99.58,32.84a8,8,0,0,0-5.52-.6l-64,16A8,8,0,0,0,24,56V200a8,8,0,0,0,9.94,7.76l61.13-15.28,61.35,30.68A8.15,8.15,0,0,0,160,224a8,8,0,0,0,1.94-.24l64-16A8,8,0,0,0,232,200V56A8,8,0,0,0,228.92,49.69ZM104,52.94l48,24V203.06l-48-24ZM40,62.25l48-12v127.5l-48,12Zm176,131.5-48,12V78.25l48-12Z"></path></svg>,
          isActive: false 
        },
      ],
    },
    {
      label: 'LEARNING',
      items: [
        { 
          name: 'Session History', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M136,80v43.47l36.12,21.67a8,8,0,0,1-8.24,13.72l-40-24A8,8,0,0,1,120,128V80a8,8,0,0,1,16,0Zm-8-48A95.44,95.44,0,0,0,60.08,60.15C52.81,67.51,46.35,74.59,40,82V64a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H72a8,8,0,0,0,0-16H49c7.15-8.42,14.27-16.35,22.39-24.57a80,80,0,1,1,1.66,114.75,8,8,0,1,0-11,11.64A96,96,0,1,0,128,32Z"></path></svg>,
          isActive: false 
        },
        { 
          name: 'Assignment', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"></path></svg>,
          isActive: false 
        },
        { 
          name: 'Chat with Tutor', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M232.07,186.76a80,80,0,0,0-62.5-114.17A80,80,0,1,0,23.93,138.76l-7.27,24.71a16,16,0,0,0,19.87,19.87l24.71-7.27a80.39,80.39,0,0,0,25.18,7.35,80,80,0,0,0,108.34,40.65l24.71,7.27a16,16,0,0,0,19.87-19.86ZM62,159.5a8.28,8.28,0,0,0-2.26.32L32,168l8.17-27.76a8,8,0,0,0-.63-6,64,64,0,1,1,26.26,26.26A8,8,0,0,0,62,159.5Zm153.79,28.73L224,216l-27.76-8.17a8,8,0,0,0-6,.63,64.05,64.05,0,0,1-85.87-24.88A79.93,79.93,0,0,0,174.7,89.71a64,64,0,0,1,41.75,92.48A8,8,0,0,0,215.82,188.23Z"></path></svg>,
          isActive: false 
        },
      ],
    },
    {
      label: 'COMMUNITY',
      items: [
        { 
          name: 'Community', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm88,104a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM102,168H154a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.84a157.44,157.44,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154,88H102a115.11,115.11,0,0,1,26-45A115.27,115.27,0,0,1,154,88Zm52.33,0H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM107.59,42.4A135.28,135.28,0,0,0,85.29,88H49.63A88.29,88.29,0,0,1,107.59,42.4ZM49.63,168H85.29a135.28,135.28,0,0,0,22.3,45.6A88.29,88.29,0,0,1,49.63,168Zm98.78,45.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z"></path></svg>,
          isActive: false 
        },
      ],
    },
    {
      label: 'ACCOUNT',
      items: [
        { 
          name: 'Payments', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z"></path></svg>,
          isActive: false 
        },
        { 
          name: 'Ratings & Feedback', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.38,16.38,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Zm-15.34,5.47-48.7,42a8,8,0,0,0-2.56,7.91l14.88,62.8a.37.37,0,0,1-.17.48c-.18.14-.23.11-.38,0l-54.72-33.65a8,8,0,0,0-8.38,0L69.09,215.94c-.15.09-.19.12-.38,0a.37.37,0,0,1-.17-.48l14.88-62.8a8,8,0,0,0-2.56-7.91l-48.7-42c-.12-.1-.23-.19-.13-.5s.18-.27.33-.29l63.92-5.16A8,8,0,0,0,103,91.86l24.62-59.61c.08-.17.11-.25.35-.25s.27.08.35.25L153,91.86a8,8,0,0,0,6.75,4.92l63.92,5.16c.15,0,.24,0,.33.29S224,102.63,223.84,102.73Z"></path></svg>,
          isActive: false 
        },
      ],
    },
  ];

  return (
    <aside 
      className={`bg-[#293763] flex flex-col px-3 py-5 shrink-0 h-screen sticky top-0 overflow-y-auto custom-scrollbar transition-all duration-300 ease-in-out font-matter ${
        isOpen ? 'w-[280px]' : 'w-[80px]'
      }`}
    >
      
      {/* Logo Container */}
      <div className={`h-[38px] bg-white rounded-[12px] px-[12px] flex items-center justify-between mb-6 transition-all duration-300 ${
        isOpen ? 'w-full max-w-[242px]' : 'w-[56px] justify-center'
      }`}>
        {isOpen ? (
          <>
            <Image 
              src="/images/homeguru.png" 
              alt="HomeGuru Logo" 
              width={86} 
              height={28}
              className="object-contain"
            />
            
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[#9CA3AF] hover:text-gray-600 transition-colors" 
              aria-label="Close sidebar"
            >
              <PanelLeftClose size={20} strokeWidth={1.5} />
            </button>
          </>
        ) : (
          <button 
            onClick={() => setIsOpen(true)}
            className="text-[#293763] hover:text-gray-600 transition-colors" 
            aria-label="Open sidebar"
          >
            <PanelLeftOpen size={20} strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className={`w-full transition-all duration-300 ${
        isOpen ? 'max-w-[242px]' : 'max-w-[56px]'
      }`}>
        {navGroups.map((group, index) => (
          <div key={index} className="mb-5">
            {isOpen && (
              <h3 className="text-[#8E8E8E] text-[13px] font-medium tracking-wider mb-2 px-3">
                {group.label}
              </h3>
            )}
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <a
                    href="#"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[16px] font-normal transition-colors ${
                      item.isActive
                        ? 'bg-[#3D4D6E] text-white'
                        : 'text-[#CCCCCC] hover:bg-[#3D4D6E]/50 hover:text-white'
                    } ${
                      !isOpen ? 'justify-center' : ''
                    }`}
                    title={!isOpen ? item.name : ''}
                  >
                    <span className="flex items-center justify-center shrink-0">
                      {item.icon}
                    </span>
                    {isOpen && item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      
    </aside>
  );
}
