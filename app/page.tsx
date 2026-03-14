"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
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
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
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
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
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
              <LearningQuest />
            </div>

            {/* --- ROW 2: Upcoming Schedule (8 cols) | Learning Activity (4 cols) --- */}
            <div className="lg:col-span-8">
              <UpcomingSchedule />
            </div>
            <div className="lg:col-span-4">
              <LearningActivity />
            </div>

            {/* --- ROW 3 & 4: Left Column (5 cols) | Right Column (7 cols) --- */}
            <div className="lg:col-span-5 flex flex-col gap-4 md:gap-6">
              <PendingAssignments />
              <ReviewLesson />
            </div>
            <div className="lg:col-span-7 flex flex-col gap-4 md:gap-6">
              <LearningHours />
              <TrendingTeachers />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
