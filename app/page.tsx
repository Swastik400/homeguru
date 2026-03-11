"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import StatsCards from "@/components/StatsCards";
import LearningQuest from "@/components/LearningQuest";
import UpcomingSchedule from "@/components/UpcomingSchedule";
import LearningActivity from "@/components/LearningActivity";
import PendingAssignments from "@/components/PendingAssignments";
import LearningHours from "@/components/LearningHours";
import ReviewLesson from "@/components/ReviewLesson";
import TrendingTeachers from "@/components/TrendingTeachers";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto">
        {/* Header */}
        <div className="px-8 py-6">
          <Header />
        </div>

        {/* Master Grid Canvas */}
        <div className="px-8 pb-8">
          <div className="grid grid-cols-12 gap-6">
            
            {/* --- ROW 1: Banner + Stats (8 cols) | Learning Quest (4 cols) --- */}
            <div className="col-span-8 flex flex-col gap-6">
              <Banner />
              <StatsCards />
            </div>
            <div className="col-span-4">
              <LearningQuest />
            </div>

            {/* --- ROW 2: Upcoming Schedule (8 cols) | Learning Activity (4 cols) --- */}
            <div className="col-span-8">
              <UpcomingSchedule />
            </div>
            <div className="col-span-4">
              <LearningActivity />
            </div>

            {/* --- ROW 3 & 4: Left Column (5 cols) | Right Column (7 cols) --- */}
            <div className="col-span-5 flex flex-col gap-6">
              <PendingAssignments />
              <ReviewLesson />
            </div>
            <div className="col-span-7 flex flex-col gap-6">
              <LearningHours />
              <TrendingTeachers />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
