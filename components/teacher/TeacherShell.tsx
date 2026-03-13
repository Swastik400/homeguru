"use client";
import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import TeacherSidebar from "@/components/teacher/TeacherSidebar";
import TeacherHeader from "@/components/teacher/TeacherHeader";

export default function TeacherShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname();
  const hideHeader = pathname === "/dashboard/teacher/chat";

  const toggleMobileSidebar = useCallback(() => {
    setMobileSidebarOpen((prev) => !prev);
  }, []);

  const closeMobileSidebar = useCallback(() => {
    setMobileSidebarOpen(false);
  }, []);

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-matter">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <TeacherSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeMobileSidebar}
          />
          <div className="fixed left-0 top-0 h-full z-50 md:hidden">
            <TeacherSidebar isOpen={true} setIsOpen={() => {}} />
          </div>
        </>
      )}

      {/* Main Content */}
      <main className={`flex-1 h-screen ${hideHeader ? 'overflow-hidden' : 'overflow-y-auto'}`}>
        {/* Mobile Menu Button */}
        <div className="md:hidden fixed top-4 left-4 z-30">
          <button
            onClick={toggleMobileSidebar}
            className="p-2 bg-white rounded-lg shadow-md border border-gray-200"
            aria-label="Toggle menu"
          >
            {mobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Header */}
        {!hideHeader && (
          <div className="px-4 md:px-6 lg:px-8 py-4 md:py-6 mt-16 md:mt-0">
            <TeacherHeader />
          </div>
        )}

        {/* Content */}
        <div className={hideHeader ? 'h-full' : 'px-4 md:px-6 lg:px-8 pb-8'}>{children}</div>
      </main>
    </div>
  );
}
