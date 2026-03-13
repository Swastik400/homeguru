"use client";
import React from 'react';

export default function PerformanceGauge({ score }: { score: number }) {
  const getLevel = (s: number) => {
    if (s >= 90) return { label: 'Excellent', color: 'bg-green-500', text: 'text-green-600' };
    if (s >= 75) return { label: 'Good', color: 'bg-blue-500', text: 'text-blue-600' };
    if (s >= 60) return { label: 'Average', color: 'bg-amber-500', text: 'text-amber-600' };
    return { label: 'At Risk', color: 'bg-red-500', text: 'text-red-600' };
  };

  const status = getLevel(score);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-900 font-bold">Overall Performance</h3>
        <span className={`text-sm font-bold px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 ${status.text}`}>
          {status.label}
        </span>
      </div>

      <div className="relative pt-4">
        {/* Gauge Background */}
        <div className="h-4 w-full bg-gray-100 rounded-full flex overflow-hidden">
          <div className="h-full w-[25%] bg-red-400 opacity-30" />
          <div className="h-full w-[25%] bg-amber-400 opacity-30" />
          <div className="h-full w-[25%] bg-blue-400 opacity-30" />
          <div className="h-full w-[25%] bg-green-400 opacity-30" />
        </div>

        {/* Indicator */}
        <div
          className="absolute top-2 transition-all duration-1000 ease-out flex flex-col items-center"
          style={{ left: `${score}%`, transform: 'translateX(-50%)' }}
        >
          <div className={`w-4 h-4 rounded-full border-2 border-white shadow-md ${status.color}`} />
          <div className="mt-1 text-xs font-black text-gray-900">{score}%</div>
        </div>

        {/* Labels */}
        <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <span>Beginner</span>
          <span>Intermediate</span>
          <span>Advanced</span>
          <span>Expert</span>
        </div>
      </div>

      <p className="mt-6 text-sm text-gray-500 leading-relaxed">
        Wait! <span className="text-gray-900 font-bold">{score}% score</span> indicates that this student is performing <span className={status.text + " font-bold"}>{status.label.toLowerCase()}</span> compared to the monthly average.
      </p>
    </div>
  );
}
