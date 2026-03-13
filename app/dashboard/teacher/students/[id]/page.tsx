"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import StatsGrid from '@/components/teacher/analytics/StatsGrid';
import PerformanceGauge from '@/components/teacher/analytics/PerformanceGauge';
import StudentInfoCard from '@/components/teacher/analytics/StudentInfoCard';
import ActivityTimeline from '@/components/teacher/analytics/ActivityTimeline';

export default function AcademicOverviewPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const performanceScore = 82;

  // Retrieve mock student data passed via query params from the Table
  const studentData = {
    name: searchParams.get('name') || "Varun Sharma",
    email: searchParams.get('email') || "varun.s@example.com",
    phone: searchParams.get('phone') || "+91 98765 43210",
    location: searchParams.get('location') || "Mumbai, India",
    joined: searchParams.get('joined') || "Jan 12, 2026",
    target: searchParams.get('target') || "IELTS 7.5+",
    education: searchParams.get('education') || searchParams.get('class') || "B.Tech Final Year",
    learningStyle: searchParams.get('style') ? searchParams.get('style')?.split(',') : ['Visual', 'Conversational', 'Practical']
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 font-season">{studentData.name}'s Profile</h1>
        <p className="text-sm text-gray-500">Comprehensive overview of academic progress and activity.</p>
      </div>

      {/* Stats Grid */}
      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Info & Performance */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <PerformanceGauge score={performanceScore} />
          <StudentInfoCard data={studentData} />
        </div>

        {/* Right Column - Activity & More */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <ActivityTimeline />

          {/* Detailed Report Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Detailed Monthly Progress</h3>
            <p className="text-gray-500 max-w-sm mb-6">View a comprehensive breakdown of learning objectives, vocabulary growth, and fluency metrics.</p>
            <button className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-black transition-all shadow-md active:scale-95">
              Generate Full Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
