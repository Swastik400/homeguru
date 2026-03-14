import { 
  House, 
  CalendarBlank, 
  VideoCamera, 
  BookOpen, 
  Users, 
  ClipboardText, 
  Exam, 
  CheckSquareOffset, 
  Video, 
  MagicWand, 
  Files, 
  ChatCircleText, 
  UserPlus, 
  ClockCounterClockwise, 
  Wallet, 
  CalendarCheck, 
  Star, 
  UserCircle, 
  Fingerprint, 
  Gear,
  User as UserIcon,
  CaretLeft,
  CaretRight,
  CaretDown
} from '@phosphor-icons/react';
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
        { name: 'Dashboard', href: '/dashboard/teacher', icon: <House size={18} weight="regular" /> },
        { name: 'Schedule / Calendar', href: '/dashboard/teacher/schedule', icon: <CalendarBlank size={18} weight="regular" /> },
        { name: 'Live Classroom', href: '/dashboard/teacher/classroom', icon: <VideoCamera size={18} weight="regular" /> },
        { name: 'Courses', href: '/dashboard/teacher/courses', icon: <BookOpen size={18} weight="regular" /> },
        { name: 'Students', href: '/dashboard/teacher/students', icon: <Users size={18} weight="regular" /> },
      ],
    },
    {
      label: 'TEACHING',
      items: [
        { name: 'Assignments', href: '/dashboard/teacher/assignments', icon: <ClipboardText size={18} weight="regular" /> },
        { name: 'Quizzes & Exams', href: '/dashboard/teacher/quizzes', icon: <Exam size={18} weight="regular" /> },
        { name: 'Attendance', href: '/dashboard/teacher/attendance', icon: <CheckSquareOffset size={18} weight="regular" /> },
        { name: 'Session Recordings', href: '/dashboard/teacher/recordings', icon: <Video size={18} weight="regular" /> },
      ],
    },
    {
      label: 'TOOLS',
      items: [
        { name: 'AI Assistant', href: '/dashboard/teacher/ai-assistant', icon: <MagicWand size={18} weight="regular" /> },
        { name: 'File Manager', href: '/dashboard/teacher/files', icon: <Files size={18} weight="regular" /> },
        { name: 'Chat', href: '/dashboard/teacher/chat', icon: <ChatCircleText size={18} weight="regular" /> },
        { name: 'Lead Management', href: '/dashboard/teacher/leads', icon: <UserPlus size={18} weight="regular" /> },
        { name: 'Session History', href: '/dashboard/teacher/history', icon: <ClockCounterClockwise size={18} weight="regular" /> },
      ],
    },
    {
      label: 'BUSINESS',
      items: [
        { name: 'Payments', href: '/dashboard/teacher/payments', icon: <Wallet size={18} weight="regular" /> },
        { name: 'Bookings', href: '/dashboard/teacher/bookings', icon: <CalendarCheck size={18} weight="regular" /> },
        { name: 'Ratings & Reviews', href: '/dashboard/teacher/reviews', icon: <Star size={18} weight="regular" /> },
      ],
    },
    {
      label: 'ACCOUNT',
      items: [
        { name: 'Profile Settings', href: '/dashboard/teacher/profile', icon: <UserCircle size={18} weight="regular" /> },
        { name: 'KYC & Verification', href: '/dashboard/teacher/verification', icon: <Fingerprint size={18} weight="regular" /> },
        { name: 'Settings', href: '/dashboard/teacher/settings', icon: <Gear size={18} weight="regular" /> },
      ],
    },
  ], []);

  return (
    <aside
      className={`bg-white border-r border-[#F0F0F0] flex flex-col shrink-0 h-screen sticky top-0 overflow-y-auto custom-scrollbar transition-all duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] font-matter ${
        isOpen ? 'w-[260px]' : 'w-[80px]'
      }`}
    >
      {/* Logo Container */}
      <div className={`flex items-center justify-between px-5 pt-[22px] pb-[18px] shrink-0 transition-all duration-300 ${
        isOpen ? '' : 'justify-center px-0 pt-[22px] pb-[18px]'
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
              className="text-[#bbb] hover:bg-[#f4f4f4] p-[4px] rounded-[6px] transition-colors flex cursor-pointer border-none bg-transparent"
              title="Close sidebar"
            >
              <CaretLeft size={20} weight="bold" />
            </button>
          </>
        ) : (
          <button
            onClick={handleToggleOpen}
            className="text-[#bbb] hover:bg-[#f4f4f4] p-[4px] rounded-[6px] transition-colors flex cursor-pointer border-none bg-transparent"
            title="Open sidebar"
          >
            <CaretRight size={20} weight="bold" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 w-full overflow-y-auto overflow-x-hidden pb-2 custom-scrollbar">
        {navGroups.map((group, index) => {
          const isExpanded = expandedGroups[group.label] !== false;
          return (
            <div key={index} className={`py-[10px] ${index === 0 ? 'pt-[4px]' : ''}`}>
              {isOpen && (
                <button 
                  onClick={() => toggleGroup(group.label)}
                  className="w-full flex items-center justify-between px-5 pt-[6px] pb-[8px] text-[12px] font-bold tracking-[0.08em] uppercase text-[#b0b0b0] font-matter border-none bg-transparent cursor-pointer"
                >
                  <span>{group.label}</span>
                  <span className={`inline-flex transition-transform duration-200 ${isExpanded ? 'rotate-0' : 'rotate-180'}`}>
                    <CaretDown size={14} weight="bold" />
                  </span>
                </button>
              )}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen 
                  ? isExpanded ? 'max-h-[500px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'
                  : 'max-h-full opacity-100 visible'
              }`}>
                <ul className="flex flex-col m-0 p-0 list-none">
                  {group.items.map((item, itemIdx) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={itemIdx}>
                        <Link
                          href={item.href}
                          prefetch={false}
                          className={`flex items-center rounded-[10px] text-[15px] transition-colors duration-[130ms] border-none select-none text-left font-matter ${
                            isOpen 
                              ? 'gap-[12px] px-[16px] py-[11px] mx-[10px] my-[2px] w-[calc(100%-20px)]' 
                              : 'gap-0 p-[11px] mx-[10px] my-[3px] justify-center'
                          } ${
                            isActive
                              ? 'bg-[#eef2ff] text-[#4f46e5] font-[500]'
                              : 'text-[#555] font-[400] hover:bg-[#f9fafb] bg-transparent'
                          }`}
                          title={!isOpen ? item.name : ''}
                        >
                          <span className="inline-flex shrink-0">
                            {item.icon}
                          </span>
                          {isOpen && <span className="overflow-hidden text-ellipsis whitespace-nowrap leading-tight">{item.name}</span>}
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

      {/* Teacher Footer */}
      <div className={`border-t border-[#F0F0F0] shrink-0 flex items-center gap-[12px] ${
        isOpen ? 'px-[20px] py-[16px]' : 'justify-center py-[16px] px-0'
      }`}>
        <div className="w-[36px] h-[36px] rounded-full bg-[#111] text-white flex items-center justify-center shrink-0 cursor-pointer shadow-sm">
          <UserIcon size={18} weight="regular" />
        </div>
        {isOpen && (
          <span className="text-[15px] text-[#333] font-[500] whitespace-nowrap overflow-hidden text-ellipsis font-matter">
            Teacher Portal
          </span>
        )}
      </div>
    </aside>
  );
}

export default memo(TeacherSidebar);
