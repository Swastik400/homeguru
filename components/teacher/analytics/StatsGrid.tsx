"use client";
import React from 'react';
import { Users, BookOpen, Clock, Award, Star, TrendingUp, TrendingDown } from 'lucide-react';

const stats = [
  {
    label: "Overall Grade",
    value: "A-",
    sub: "Top 15% of class",
    icon: <Award className="text-gray-900" size={20} />,
    trend: "+2%",
    trendUp: true
  },
  {
    label: "Attendance",
    value: "94%",
    sub: "24/26 sessions",
    icon: <Clock className="text-gray-600" size={20} />,
    trend: "+1%",
    trendUp: true
  },
  {
    label: "Assignments",
    value: "12/12",
    sub: "All tasks completed",
    icon: <BookOpen className="text-green-600" size={20} />,
    trend: "0%",
    trendUp: true
  },
  {
    label: "Credits Earned",
    value: "148",
    sub: "Next goal: 160",
    icon: <Star className="text-amber-600" size={20} />,
    trend: "+12",
    trendUp: true
  }
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
              {stat.icon}
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {stat.trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {stat.trend}
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-gray-400 text-xs font-medium">{stat.sub}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
