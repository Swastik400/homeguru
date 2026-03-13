"use client";
import React from 'react';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Target, 
  TrendingUp, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export default function PerformanceAnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Performance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Target size={20} />
            </div>
            <h3 className="font-bold text-gray-900">Learning Goals</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-gray-500 uppercase">Fluency</span>
                <span className="text-blue-600">85%</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-gray-500 uppercase">Vocabulary</span>
                <span className="text-blue-600">70%</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '70%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-gray-500 uppercase">Grammar</span>
                <span className="text-blue-600">92%</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '92%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <TrendingUp size={20} />
            </div>
            <h3 className="font-bold text-gray-900">Monthly Progress</h3>
          </div>
          <div className="flex items-end gap-2 h-24 mb-2">
            {[40, 65, 55, 80, 75, 90, 85].map((h, i) => (
              <div key={i} className="flex-1 bg-green-100 hover:bg-green-200 transition-colors rounded-t-sm relative group" style={{ height: `${h}%` }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {h}% Score
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
            <span>Mon</span>
            <span>Sun</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <BarChart3 size={20} />
            </div>
            <h3 className="font-bold text-gray-900">Skill Distribution</h3>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-sm text-gray-600 flex-1">Speaking</span>
              <span className="text-sm font-bold text-gray-900">Advanced</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-sm text-gray-600 flex-1">Writing</span>
              <span className="text-sm font-bold text-gray-900">Intermediate</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm text-gray-600 flex-1">Listening</span>
              <span className="text-sm font-bold text-gray-900">Expert</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-lg">Detailed Performance Metrics</h3>
          <button className="text-sm font-bold text-blue-600 hover:underline">Download CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Skill Area</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Score</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Last Tested</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { area: "Oral Fluency", score: 88, status: "Excellent", date: "Mar 12, 2026" },
                { area: "Reading Comprehension", score: 72, status: "Good", date: "Mar 10, 2026" },
                { area: "Critical Thinking", score: 64, status: "Average", date: "Mar 05, 2026" },
                { area: "Listening Accuracy", score: 91, status: "Expert", date: "Mar 12, 2026" },
                { area: "Peer Interaction", score: 45, status: "At Risk", date: "Feb 28, 2026" }
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-all group">
                  <td className="py-4 px-6 font-bold text-gray-800 text-sm">{item.area}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                       <span className="text-sm font-black text-gray-900">{item.score}%</span>
                       <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                         <div className={`h-full ${item.score > 80 ? 'bg-green-500' : item.score > 60 ? 'bg-blue-500' : 'bg-red-500'}`} style={{ width: `${item.score}%` }} />
                       </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                      item.status === 'Excellent' || item.status === 'Expert' ? 'bg-green-50 text-green-600 border border-green-100' :
                      item.status === 'Good' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                      item.status === 'Average' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                      'bg-red-50 text-red-600 border border-red-100'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 font-medium">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
