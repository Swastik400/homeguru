"use client";
import Link from "next/link";
import { User, Calendar, DollarSign, BookOpen, FileText, ArrowRight, CheckCircle } from "lucide-react";

export default function Phase1Overview() {
  const features = [
    {
      title: "Profile Management",
      description: "Edit your profile, set hourly rates, manage availability, and configure cancellation policies",
      icon: User,
      href: "/dashboard/teacher/profile",
      stats: ["Basic Info", "Rates & Pricing", "Availability", "Policies"]
    },
    {
      title: "Booking Management",
      description: "View, accept, and reject booking requests from students. Manage demo and paid class bookings",
      icon: Calendar,
      href: "/dashboard/teacher/bookings",
      stats: ["Pending Requests", "Accepted Bookings", "Rejected Bookings", "All Bookings"]
    },
    {
      title: "Payment Dashboard",
      description: "Track earnings, view payouts, analyze commission breakdown, and manage transactions",
      icon: DollarSign,
      href: "/dashboard/teacher/payments",
      stats: ["Total Earnings", "Available Balance", "Pending Amount", "Monthly Revenue"]
    },
    {
      title: "Course Builder",
      description: "Create and manage courses with lessons, videos, assignments, and structured content",
      icon: BookOpen,
      href: "/dashboard/teacher/courses",
      stats: ["Course Creation", "Lesson Management", "Content Upload", "Publishing"]
    },
    {
      title: "Assignment & Grading",
      description: "Create assignments, review student submissions, provide grades and feedback",
      icon: FileText,
      href: "/dashboard/teacher/assignments",
      stats: ["Create Assignments", "Grade Submissions", "Provide Feedback", "Track Progress"]
    }
  ];

  return (
    <div className="p-0 max-w-7xl mx-auto font-matter">
      {/* Header Container */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[20px] flex items-center justify-center shadow-sm shrink-0">
              <CheckCircle className="w-7 h-7 text-[#0F172A]" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-[28px] md:text-[36px] font-season font-bold text-[#0F172A] tracking-tight leading-tight">Phase 1: Essential Features</h1>
              <p className="text-[#64748B] text-[15px] font-medium mt-1">Foundational capabilities for your teaching journey.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#F0FDF4] border border-[#DCFCE7] px-4 py-2 rounded-full shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></div>
            <span className="text-[12.5px] font-bold text-[#166534] uppercase tracking-wider">Implementation Complete</span>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[32px] p-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="flex flex-col gap-1 border-r border-[#F1F5F9] md:pr-4 last:border-0">
              <div className="text-[32px] font-bold text-[#0F172A] tracking-tighter">5</div>
              <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-[0.15em]">Core Features</div>
            </div>
            <div className="flex flex-col gap-1 border-r border-[#F1F5F9] md:px-4 last:border-0">
              <div className="text-[32px] font-bold text-[#0F172A] tracking-tighter">100%</div>
              <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-[0.15em]">Progress</div>
            </div>
            <div className="flex flex-col gap-1 border-r border-[#F1F5F9] md:px-4 last:border-0">
              <div className="text-[32px] font-bold text-[#0F172A] tracking-tighter">20+</div>
              <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-[0.15em]">Sub-features</div>
            </div>
            <div className="flex flex-col gap-1 border-r border-[#F1F5F9] md:px-4 last:border-0">
              <div className="text-[32px] font-bold text-[#0F172A] tracking-tighter">5</div>
              <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-[0.15em]">Modules</div>
            </div>
            <div className="flex flex-col gap-1 md:pl-4">
              <div className="text-[32px] font-bold text-[#166534] tracking-tighter">Ready</div>
              <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-[0.15em]">Status</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div
              key={index}
              className="bg-white border border-[#E2E8F0] rounded-[28px] p-7 shadow-sm hover:shadow-md transition-all duration-500 group relative flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Icon className="w-6 h-6 text-[#64748B]" />
                </div>
                <h3 className="text-[20px] font-season font-bold text-[#0F172A] mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-[#64748B] text-[14px] leading-relaxed mb-6 font-medium opacity-90">{feature.description}</p>

                <div className="space-y-2 mb-8 border-t border-[#F8FAFC] pt-6">
                  {feature.stats.map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-[13px] text-[#475569] font-medium">
                      <div className="w-1 h-1 rounded-full bg-[#E2E8F0]" />
                      <span>{stat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={feature.href}
                className="flex items-center justify-between gap-2 w-full px-6 py-3.5 bg-[#F8FAFC] border border-[#F1F5F9] text-[#0F172A] rounded-2xl transition-all font-bold text-[14px] hover:bg-[#0F172A] hover:text-white group/btn active:scale-[0.98]"
              >
                <span>Launch {feature.title}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Future Roadmap */}
      <div className="mt-12 bg-[#FBFBFC] border border-[#E2E8F0] rounded-[32px] p-10 overflow-hidden relative shadow-sm">
        <div className="relative z-10">
          <h2 className="text-[22px] font-season font-bold text-[#0F172A] mb-8 tracking-tight flex items-center gap-3">
            <span className="text-2xl">🚀</span> Future Roadmap
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex items-start gap-5">
              <div className="w-10 h-10 bg-white border border-[#F1F5F9] rounded-xl flex items-center justify-center shrink-0 mt-1 shadow-sm font-black text-[#0F172A]">
                2
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-[#0F172A] mb-1">Phase 2: Advanced Core</h3>
                <p className="text-[14px] text-[#64748B] font-medium leading-relaxed">Live Classroom Integration, Smart Recording Management, and Real-time Communications.</p>
              </div>
            </div>
            <div className="flex items-start gap-5">
              <div className="w-10 h-10 bg-white border border-[#F1F5F9] rounded-xl flex items-center justify-center shrink-0 mt-1 shadow-sm font-black text-[#0F172A]">
                3
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-[#0F172A] mb-1">Phase 3: Intelligence Layer</h3>
                <p className="text-[14px] text-[#64748B] font-medium leading-relaxed">AI Teaching Assistant, Predictive Student Analytics, and Automated Content Synthesis.</p>
              </div>
            </div>
          </div>
        </div>
        {/* Subtle decorative element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#F1F5F9] to-transparent opacity-50 pointer-events-none" />
      </div>
    </div>
  );
}
