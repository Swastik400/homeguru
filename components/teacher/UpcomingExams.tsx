"use client";

const EXAMS = [
  { id: 1, title: "Physics – Unit Test 3", subject: "Physics", date: "14 Mar, 2026", time: "10:00 AM", students: 6, status: "draft", statusColor: "bg-[#FDF9EE] text-[#A68A48]" },
  { id: 2, title: "Calculus Final Exam", subject: "Mathematics", date: "18 Mar, 2026", time: "2:00 PM", students: 9, status: "ready", statusColor: "bg-[#F0FAF4] text-[#2D8946]" },
  { id: 3, title: "English Comprehension", subject: "English", date: "21 Mar, 2026", time: "11:30 AM", students: 4, status: "ready", statusColor: "bg-[#F0FAF4] text-[#2D8946]" },
  { id: 4, title: "Web Dev – JavaScript Quiz", subject: "Programming", date: "25 Mar, 2026", time: "3:00 PM", students: 7, status: "draft", statusColor: "bg-[#FDF9EE] text-[#A68A48]" },
];

export default function UpcomingExams() {
  return (
    <div className="w-full font-matter">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1A1A1A" viewBox="0 0 256 256">
          <path d="M206.4,49.6C195.2,38.4,176.4,32,152,32H104C79.6,32,60.8,38.4,49.6,49.6S32,79.6,32,104v48c0,24.4,6.4,43.2,17.6,54.4S79.6,224,104,224h48c24.4,0,43.2-6.4,54.4-17.6S224,176.4,224,152V104C224,79.6,217.6,60.8,206.4,49.6ZM208,152c0,20.8-4.8,35.2-14.4,44.8S172.8,208,152,208H104c-20.8,0-35.2-4.8-44.8-14.4S48,172.8,48,152V104C48,83.2,52.8,68.8,59.2,59.2S83.2,48,104,48h48c20.8,0,35.2,4.8,44.8,11.2S208,83.2,208,104Z" />
        </svg>
        <h2 className="text-[#1A1A1A] text-[17px] font-season">Upcoming Exams & Tests</h2>
      </div>

      <div className="w-full bg-white rounded-[16px] border border-[#E5E7EB] overflow-hidden shadow-[0_2px_8px_-4px_rgba(0,0,0,0.02)]">
        <div className="divide-y divide-[#F3F4F6]">
          {EXAMS.map((exam) => (
            <div key={exam.id} className="flex items-center justify-between px-6 py-4 hover:bg-[#F9FAFB] transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                {/* Status Dot */}
                <div className={`w-2 h-2 rounded-full shrink-0 ${exam.status === 'ready' ? 'bg-[#10B981]' : 'bg-[#F59E0B]'
                  }`} />

                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[#111] text-[15px] font-medium leading-tight">{exam.title}</p>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${exam.status === 'ready' ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'bg-gray-100 text-gray-500'
                      }`}>
                      {exam.status}
                    </span>
                  </div>
                  <p className="text-[#888] text-[12px] mt-1 font-matter uppercase tracking-tight">
                    {exam.date} · {exam.time} · <span className="text-indigo-500">{exam.students} students</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[#555] text-[12px] font-medium hover:bg-gray-50">
                  Settings
                </button>
                <button className="px-4 py-1.5 bg-[#4F46E5] text-white rounded-lg text-[12px] font-medium hover:bg-[#4338ca] shadow-sm">
                  View Result
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#F8FAFC] border-t border-[#E5E7EB] flex items-center justify-between">
          <span className="text-[12px] text-[#8B92A5]">4 exams this month</span>
          <button className="text-[13px] text-[#3D4A6B] font-medium hover:underline">+ Create new exam</button>
        </div>
      </div>
    </div>
  );
}
