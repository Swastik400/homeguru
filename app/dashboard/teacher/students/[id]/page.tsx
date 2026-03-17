"use client";
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import StatsGrid from '@/components/teacher/analytics/StatsGrid';
import PerformanceGauge from '@/components/teacher/analytics/PerformanceGauge';
import StudentInfoCard from '@/components/teacher/analytics/StudentInfoCard';
import ActivityTimeline from '@/components/teacher/analytics/ActivityTimeline';
import ProgressReportModal from '@/components/teacher/analytics/ProgressReportModal';
import { TrendingUp, Award, Zap } from 'lucide-react';

export default function AcademicOverviewPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
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

          {/* Detailed Report Card - ENHANCED */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
            <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-50 text-gray-900 rounded-full flex items-center justify-center border border-gray-100">
                    <TrendingUp size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Monthly Progress Analysis</h3>
                    <p className="text-sm text-gray-500">Vocabulary growth & fluency metrics</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsReportModalOpen(true)}
                  className="bg-gray-900 text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95"
                >
                  Generate Full Report
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={14} className="text-amber-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Fluency</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">84%</p>
                  <p className="text-[9px] text-green-600 font-bold mt-1">↑ +4% this week</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100/50">
                   <div className="flex items-center gap-2 mb-2">
                    <Award size={14} className="text-blue-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Vocabulary</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">Level 4</p>
                  <p className="text-[9px] text-blue-600 font-bold mt-1">Advanced Lexicon</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100/50">
                   <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={14} className="text-purple-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Retention</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">92%</p>
                  <p className="text-[9px] text-gray-500 font-bold mt-1">High Accuracy</p>
                </div>
              </div>
            </div>
            
            <div className="px-8 py-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
              <p className="text-[10px] font-bold text-gray-400 italic">Next review scheduled for April 1, 2026</p>
              <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200" />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProgressReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
        studentName={studentData.name}
      />
    </div>
  );
}
