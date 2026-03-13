import { PanelLeftClose, PanelLeftOpen, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useMemo, useCallback, memo } from 'react';

interface TeacherSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function TeacherSidebar({ isOpen, setIsOpen }: TeacherSidebarProps) {
  const pathname = usePathname();
  
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'MAIN': true,
    'TEACHING': true,
    'TOOLS': true,
    'BUSINESS': true,
    'ACCOUNT': true,
  });

  const toggleGroup = useCallback((label: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  }, []);

  const handleToggleOpen = useCallback(() => setIsOpen(true), [setIsOpen]);
  const handleToggleClose = useCallback(() => setIsOpen(false), [setIsOpen]);

  // Memoize navigation groups
  const navGroups = useMemo(() => [
    {
      label: 'MAIN',
      items: [
        { name: 'Dashboard', href: '/dashboard/teacher', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z" /></svg> },
        { name: 'Schedule / Calendar', href: '/dashboard/teacher/schedule', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM48,48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48ZM208,208H48V96H208V208Z"/></svg> },
        { name: 'Live Classroom', href: '/dashboard/teacher/classroom', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M216,40H40A16,16,0,0,0,24,56V184a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,144H40V136H216Zm0-64H40V56H216Z" /></svg> },
        { name: 'Courses', href: '/dashboard/teacher/courses', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM40,64H216V192H40Z" /></svg> },
        { name: 'Students', href: '/dashboard/teacher/students', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.43a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.51A8,8,0,0,1,250.14,206.7Z"/></svg> },
      ],
    },
    {
      label: 'TEACHING',
      items: [
        { name: 'Assignments', href: '/dashboard/teacher/assignments', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8,47.93,47.93,0,0,0-2.75-16H200Z"/></svg> },
        { name: 'Quizzes & Exams', href: '/dashboard/teacher/quizzes', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48V192a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32h80a8,8,0,0,1,0,16H56V192H200V48a8,8,0,0,1,16,0Zm-32,32a12,12,0,1,0-12-12A12,12,0,0,0,184,80Zm-32,40a12,12,0,1,0-12-12A12,12,0,0,0,152,120Zm-32,40a12,12,0,1,0-12-12A12,12,0,0,0,120,160Z"/></svg> },
        { name: 'Attendance', href: '/dashboard/teacher/attendance', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"/></svg> },
        { name: 'Session Recordings', href: '/dashboard/teacher/recordings', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M240,113.1a15.86,15.86,0,0,0-16,0L184,136V72a16,16,0,0,0-16-16H32A16,16,0,0,0,16,72V184a16,16,0,0,0,16,16H168a16,16,0,0,0,16-16V120l40,22.86a16,16,0,0,0,24-13.88V126.92A15.86,15.86,0,0,0,240,113.1ZM168,184H32V72H168V184Zm56-34.12l-40-22.88V105l40-22.86Z"/></svg> },
      ],
    },
    {
      label: 'TOOLS',
      items: [
        { name: 'AI Assistant', href: '/dashboard/teacher/ai-assistant', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M192,24H64A16,16,0,0,0,48,40V216a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V40A16,16,0,0,0,192,24ZM192,216H64V40H192V216ZM164,128a12,12,0,1,1-12-12A12,12,0,0,1,164,128ZM104,128a12,12,0,1,1-12-12A12,12,0,0,1,104,128Z" /></svg> },
        { name: 'File Manager', href: '/dashboard/teacher/files', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M216,72H131.31L104,44.69A15.86,15.86,0,0,0,92.69,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72Zm0,128H40V56H92.69l27.31,27.31A15.86,15.86,0,0,0,131.31,88H216v112Z" /></svg> },
        { name: 'Chat', href: '/dashboard/teacher/chat', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M232.07,186.76a80,80,0,0,0-62.5-114.17A80,80,0,1,0,23.93,138.76l-7.27,24.71a16,16,0,0,0,19.87,19.87l24.71-7.27a80.39,80.39,0,0,0,25.18,7.35,80,80,0,0,0,108.34,40.65l24.71,7.27a16,16,0,0,0,19.87-19.86ZM62,159.5a8.28,8.28,0,0,0-2.26.32L32,168l8.17-27.76a8,8,0,0,0-.63-6,64,64,0,1,1,26.26,26.26A8,8,0,0,0,62,159.5Zm153.79,28.73L224,216l-27.76-8.17a8,8,0,0,0-6,.63,64.05,64.05,0,0,1-85.87-24.88A79.93,79.93,0,0,0,174.7,89.71a64,64,0,0,1,41.75,92.48A8,8,0,0,0,215.82,188.23Z"/></svg> },
        { name: 'Lead Management', href: '/dashboard/teacher/leads', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm0,144H40V64H216V192Z" /></svg> },
        { name: 'Session History', href: '/dashboard/teacher/history', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M136,80v43.47l36.12,21.67a8,8,0,0,1-8.24,13.72l-40-24A8,8,0,0,1,120,128V80a8,8,0,0,1,16,0Zm-8-48A95.44,95.44,0,0,0,60.08,60.15C52.81,67.51,46.35,74.59,40,82V64a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H72a8,8,0,0,0,0-16H49c7.15-8.42,14.27-16.35,22.39-24.57a80,80,0,1,1,1.66,114.75,8,8,0,1,0-11,11.64A96,96,0,1,0,128,32Z"/></svg> },
      ],
    },
    {
      label: 'BUSINESS',
      items: [
        { name: 'Payments', href: '/dashboard/teacher/payments', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z"/></svg> },
        { name: 'Bookings', href: '/dashboard/teacher/bookings', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M216,40H192V32a8,8,0,0,0-16,0v8H80V32a8,8,0,0,0-16,0v8H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V88H216V200ZM72,128a12,12,0,1,1,12,12A12,12,0,0,1,72,128Zm56,0a12,12,0,1,1,12,12A12,12,0,0,1,128,128Zm56,0a12,12,0,1,1,12,12A12,12,0,0,1,184,128Z"/></svg> },
        { name: 'Ratings & Reviews', href: '/dashboard/teacher/reviews', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.38,16.38,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Z"/></svg> },
      ],
    },
    {
      label: 'ACCOUNT',
      items: [
        { name: 'Profile Settings', href: '/dashboard/teacher/profile', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H136v40a8,8,0,0,1-16,0V136H72a8,8,0,0,1,0-16h48V80a8,8,0,0,1,16,0v40h48A8,8,0,0,1,192,128Z"/></svg> },
        { name: 'KYC & Verification', href: '/dashboard/teacher/verification', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm45.66-117.66a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34Z" /></svg> },
        { name: 'Settings', href: '/dashboard/teacher/settings', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88,0a8,8,0,0,1-8,8H184v16a8,8,0,0,1-16,0V168H144v16a8,8,0,0,1-16,0V168H104v16a8,8,0,0,1-16,0V168H56a8,8,0,0,1,0-16H88V136a8,8,0,0,1,16,0v16h24V136a8,8,0,0,1,16,0v16h24V136a8,8,0,0,1,16,0v16h24A8,8,0,0,1,216,160Z"/></svg> },
      ],
    },
  ], []);

  return (
    <aside
      className={`bg-white border-r border-[#F0F0F0] flex flex-col px-3 py-5 shrink-0 h-screen sticky top-0 overflow-y-auto custom-scrollbar transition-all duration-300 ease-in-out font-matter ${
        isOpen ? 'w-[260px]' : 'w-[80px]'
      }`}
    >
      {/* Logo Container */}
      <div className={`h-[38px] flex items-center justify-between mb-6 px-1 transition-all duration-300 ${
        isOpen ? 'w-full' : 'w-full justify-center'
      }`}>
        {isOpen ? (
          <>
            <div className="flex items-center gap-2">
              <Image
                src="/images/homeguru.png"
                alt="HomeGuru Logo"
                width={86}
                height={28}
                className="object-contain"
              />
            </div>
            <button
              onClick={handleToggleClose}
              className="text-[#bbb] hover:text-[#4f46e5] transition-colors"
              aria-label="Close sidebar"
            >
              <PanelLeftClose size={20} strokeWidth={1.5} />
            </button>
          </>
        ) : (
          <button
            onClick={handleToggleOpen}
            className="text-[#bbb] hover:text-[#4f46e5] transition-colors"
            aria-label="Open sidebar"
          >
            <PanelLeftOpen size={20} strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Teacher Badge - Subtle Version */}
      {isOpen && (
        <div className="mx-1 mb-6 flex items-center gap-3 bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl px-4 py-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center shrink-0 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#64748B" viewBox="0 0 256 256">
              <path d="M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87V168a16,16,0,0,0,16,16H80a16,16,0,0,0,16-16V144.31l16,8.53V192a8,8,0,0,0,5.68,7.66,152.35,152.35,0,0,0,20.64,4.82,8,8,0,0,0,9.36-7.9V176a8,8,0,0,0-5.68-7.66,103.45,103.45,0,0,1-29.13-13.26l56.13,29.93A8,8,0,0,0,184,176v-23.16l67.76-36.12a8,8,0,0,0,0-14.12Z"/>
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[#1E293B] text-[14px] font-bold">Teacher Portal</span>
            <span className="text-[#64748B] text-[12px] font-medium">Instructor View</span>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className={`w-full transition-all duration-300 ${
        isOpen ? 'px-1' : ''
      }`}>
        {navGroups.map((group, index) => {
          const isExpanded = expandedGroups[group.label] !== false;
          return (
            <div key={index} className="mb-4">
              {isOpen && (
                <button 
                  onClick={() => toggleGroup(group.label)}
                  className="w-full flex items-center justify-between text-[#B0B0B0] hover:text-[#111] transition-colors mb-2 px-2 font-matter group/label"
                >
                  <span className="text-[11px] font-bold tracking-[0.08em] uppercase">
                    {group.label}
                  </span>
                  <ChevronDown 
                    size={14} 
                    className={`transition-transform duration-200 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
                  />
                </button>
              )}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen 
                  ? isExpanded ? 'max-h-[500px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'
                  : 'max-h-full opacity-100 visible'
              }`}>
                <ul className="flex flex-col gap-1">
                  {group.items.map((item, itemIdx) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={itemIdx}>
                        <Link
                          href={item.href}
                          prefetch={false}
                          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[14.5px] transition-all duration-200 ${
                            isActive
                              ? 'bg-[#F1F5F9] text-[#0F172A] font-bold shadow-sm'
                              : 'text-[#64748B] font-medium hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                          } ${!isOpen ? 'justify-center mx-1' : ''}`}
                          title={!isOpen ? item.name : ''}
                        >
                          <span className={`flex items-center justify-center shrink-0 transition-colors duration-200 ${isActive ? 'text-[#0F172A]' : 'text-[#94A3B8]'}`}>
                            {item.icon}
                          </span>
                          {isOpen && item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </nav>

    </aside>
  );
}

export default memo(TeacherSidebar);
