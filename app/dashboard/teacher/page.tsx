"use client";
import dynamic from 'next/dynamic';

// Lazy load heavy components
const TeacherBanner = dynamic(() => import('@/components/teacher/TeacherBanner'), {
  loading: () => <div className="w-full h-40 bg-gray-100 rounded-2xl animate-pulse" />
});

const TeacherStatsCards = dynamic(() => import('@/components/teacher/TeacherStatsCards'), {
  loading: () => <div className="w-full h-24 bg-gray-100 rounded-2xl animate-pulse" />
});

const TodaySchedule = dynamic(() => import('@/components/teacher/TodaySchedule'), {
  loading: () => <div className="w-full h-96 bg-gray-100 rounded-2xl animate-pulse" />
});

const TeacherUpcomingSchedule = dynamic(() => import('@/components/teacher/TeacherUpcomingSchedule'), {
  loading: () => <div className="w-full h-64 bg-gray-100 rounded-2xl animate-pulse" />
});

const TeacherLearningActivity = dynamic(() => import('@/components/teacher/TeacherLearningActivity'), {
  loading: () => <div className="w-full h-64 bg-gray-100 rounded-2xl animate-pulse" />
});

const StudentOverview = dynamic(() => import('@/components/teacher/StudentOverview'), {
  loading: () => <div className="w-full h-64 bg-gray-100 rounded-2xl animate-pulse" />
});

const RecentSubmissions = dynamic(() => import('@/components/teacher/RecentSubmissions'), {
  loading: () => <div className="w-full h-64 bg-gray-100 rounded-2xl animate-pulse" />
});

const UpcomingExams = dynamic(() => import('@/components/teacher/UpcomingExams'), {
  loading: () => <div className="w-full h-64 bg-gray-100 rounded-2xl animate-pulse" />
});

export default function TeacherDashboard() {
  return (
    <div className="space-y-6">
      {/* Original Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        {/* Row 1+2: Left — Banner (8) then StatsCards (8) | Right — TodaySchedule spanning both rows (4) */}
        <div className="lg:col-span-8 flex flex-col gap-4 md:gap-6">
          <TeacherBanner />
          <TeacherStatsCards />
          <TeacherUpcomingSchedule />
        </div>
        <div className="lg:col-span-4 flex flex-col gap-4 md:gap-6">
          <TodaySchedule />
          <TeacherLearningActivity />
        </div>

        {/* Row 3: Student Overview (full width) */}
        <div className="lg:col-span-12">
          <StudentOverview />
        </div>

        {/* Row 3: Recent Submissions (5) + Upcoming Exams (7) */}
        <div className="lg:col-span-5">
          <RecentSubmissions />
        </div>
        <div className="lg:col-span-7">
          <UpcomingExams />
        </div>
      </div>
    </div>
  );
}
