"use client";
import React, { use } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import StudentProfileHeader from '@/components/teacher/analytics/StudentProfileHeader';

export default function StudentAnalyticsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const studentId = resolvedParams.id;

  // Mock student data - in a real app, you'd fetch this
  const studentData = {
    name: "Varun Sharma",
    subject: "English Speaking & Public Speaking",
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 font-matter">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/dashboard/teacher" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-6 font-medium group"
        >
          <div className="p-1.5 bg-white border border-gray-200 rounded-lg group-hover:border-gray-300 shadow-sm transition-all">
            <ChevronLeft size={16} />
          </div>
          Back to Dashboard
        </Link>

        {/* Shared Header */}
        <StudentProfileHeader 
          studentName={studentData.name} 
          subject={studentData.subject} 
          studentId={studentId}
        />

        {/* Content Area */}
        <div>{children}</div>
      </div>
    </div>
  );
}
