"use client";
import { useState, useMemo, useCallback, Suspense } from "react";
import { Menu, X } from "lucide-react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import StatsCards from "@/components/StatsCards";
import { CardSkeleton, TableSkeleton } from "@/components/LoadingSkeleton";
import ErrorBoundary from "@/components/ErrorBoundary";

// Lazy load heavy components with proper error boundaries
const LearningQuest = dynamic(() => import("@/components/LearningQuest"), {
  loading: () => <CardSkeleton className="h-[344px]" />,
  ssr: false
});
const UpcomingSchedule = dynamic(() => import("@/components/UpcomingSchedule"), {
  loading: () => <CardSkeleton className="h-[200px]" />,
  ssr: false
});
const LearningActivity = dynamic(() => import("@/components/LearningActivity"), {
  loading: () => <CardSkeleton className="h-[344px]" />,
  ssr: false
});
const PendingAssignments = dynamic(() => import("@/components/PendingAssignments"), {
  loading: () => <CardSkeleton className="h-[200px]" />,
  ssr: false
});
const LearningHours = dynamic(() => import("@/components/LearningHours"), {
  loading: () => <CardSkeleton className="h-[300px]" />,
  ssr: false
});
const ReviewLesson = dynamic(() => import("@/components/ReviewLesson"), {
  loading: () => <CardSkeleton className="h-[300px]" />,
  ssr: false
});
const TrendingTeachers = dynamic(() => import("@/components/TrendingTeachers"), {
  loading: () => <TableSkeleton className="h-[400px]" rows={6} />,
  ssr: false
});

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Memoize sidebar state to prevent unnecessary re-renders
  const sidebarProps = useMemo(() => ({
    isOpen: sidebarOpen,
    setIsOpen: setSidebarOpen
  }), [sidebarOpen]);

  const toggleMobileSidebar = useCallback(() => {
    setMobileSidebarOpen(prev => !prev);
  }, []);

  const closeMobileSidebar = useCallback(() => {
    setMobileSidebarOpen(false);
  }, []);

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar {...sidebarProps} />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeMobileSidebar}
          />
          <div className="fixed left-0 top-0 h-full z-50 md:hidden">
            <Sidebar isOpen={true} setIsOpen={() => {}} />
          </div>
        </>
      )}
      
      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto">
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
        <div className="px-4 md:px-6 lg:px-8 py-4 md:py-6 mt-16 md:mt-0">
          <Header />
        </div>

        {/* Master Grid Canvas */}
        <div className="px-4 md:px-6 lg:px-8 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            
            {/* --- ROW 1: Banner + Stats (8 cols) | Learning Quest (4 cols) --- */}
            <div className="lg:col-span-8 flex flex-col gap-4 md:gap-6">
              <Banner />
              <StatsCards />
            </div>
            <div className="lg:col-span-4">
              <ErrorBoundary>
                <Suspense fallback={<CardSkeleton className="h-[344px]" />}>
                  <LearningQuest />
                </Suspense>
              </ErrorBoundary>
            </div>

            {/* --- ROW 2: Upcoming Schedule (8 cols) | Learning Activity (4 cols) --- */}
            <div className="lg:col-span-8">
              <ErrorBoundary>
                <Suspense fallback={<CardSkeleton className="h-[200px]" />}>
                  <UpcomingSchedule />
                </Suspense>
              </ErrorBoundary>
            </div>
            <div className="lg:col-span-4">
              <ErrorBoundary>
                <Suspense fallback={<CardSkeleton className="h-[344px]" />}>
                  <LearningActivity />
                </Suspense>
              </ErrorBoundary>
            </div>

            {/* --- ROW 3 & 4: Left Column (5 cols) | Right Column (7 cols) --- */}
            <div className="lg:col-span-5 flex flex-col gap-4 md:gap-6">
              <ErrorBoundary>
                <Suspense fallback={<CardSkeleton className="h-[200px]" />}>
                  <PendingAssignments />
                </Suspense>
              </ErrorBoundary>
              <ErrorBoundary>
                <Suspense fallback={<CardSkeleton className="h-[300px]" />}>
                  <ReviewLesson />
                </Suspense>
              </ErrorBoundary>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-4 md:gap-6">
              <ErrorBoundary>
                <Suspense fallback={<CardSkeleton className="h-[300px]" />}>
                  <LearningHours />
                </Suspense>
              </ErrorBoundary>
              <ErrorBoundary>
                <Suspense fallback={<TableSkeleton className="h-[400px]" rows={6} />}>
                  <TrendingTeachers />
                </Suspense>
              </ErrorBoundary>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
