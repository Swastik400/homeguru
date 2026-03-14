import { useRouter } from "next/navigation";
import { Exam } from "@phosphor-icons/react";

const EXAMS = [
  { id: "QZ-001", title: "Physics – Unit Test 3", subject: "Physics", date: "14 Mar, 2026", time: "10:00 AM", students: 6, status: "draft" },
  { id: "QZ-002", title: "Calculus Final Exam", subject: "Mathematics", date: "18 Mar, 2026", time: "2:00 PM", students: 9, status: "ready" },
  { id: "QZ-003", title: "English Comprehension", subject: "English", date: "21 Mar, 2026", time: "11:30 AM", students: 4, status: "ready" },
  { id: "QZ-004", title: "Web Dev – JavaScript Quiz", subject: "Programming", date: "25 Mar, 2026", time: "3:00 PM", students: 7, status: "draft" },
];

export default function UpcomingExams() {
  const router = useRouter();

  const handleSettings = (id: string) => {
    router.push(`/dashboard/teacher/quizzes?quizId=${id}`);
  };

  const handleViewResult = (id: string) => {
    router.push(`/dashboard/teacher/quizzes?tab=results&quizId=${id}`);
  };

  return (
    <div className="w-full font-matter">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Exam size={20} weight="bold" className="text-[#1A1A1A]" />
        <h2 className="text-[#1A1A1A] text-[17px] font-season">Upcoming Exams & Tests</h2>
      </div>

      <div className="w-full bg-white rounded-[16px] border border-[#E5E7EB] overflow-hidden shadow-[0_2px_8px_-4px_rgba(0,0,0,0.02)]">
        <div className="divide-y divide-[#F3F4F6]">
          {EXAMS.map((exam) => (
            <div 
              key={exam.id} 
              onClick={() => handleSettings(exam.id)}
              className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 gap-4 sm:gap-2 hover:bg-[#F9FAFB] transition-colors cursor-pointer group"
            >
              <div className="flex items-start sm:items-center gap-4">
                {/* Status Dot */}
                <div className={`w-2 h-2 rounded-full shrink-0 ${exam.status === 'ready' ? 'bg-[#10B981]' : 'bg-[#F59E0B]'
                  }`} />

                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[#111] text-[15px] font-medium leading-tight">{exam.title}</p>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${exam.status === 'ready' ? 'bg-[#F8FAFC] text-[#0F172A] border-[#E2E8F0]' : 'bg-gray-100 text-gray-500 border-transparent'
                      }`}>
                      {exam.status}
                    </span>
                  </div>
                  <p className="text-[#888] text-[12px] mt-1 font-matter uppercase tracking-tight">
                    {exam.date} · {exam.time} · <span className="text-[#0F172A] font-semibold">{exam.students} students</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity w-full sm:w-auto mt-2 sm:mt-0">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleSettings(exam.id); }}
                  className="flex-1 sm:flex-none px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[#555] text-[12px] font-medium hover:bg-gray-50 text-center"
                >
                  Settings
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleViewResult(exam.id); }}
                  className="flex-1 sm:flex-none px-4 py-1.5 bg-[#0F172A] text-white rounded-lg text-[12px] font-medium hover:bg-black shadow-sm text-center"
                >
                  View Result
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#F8FAFC] border-t border-[#E5E7EB] flex items-center justify-between">
          <span className="text-[12px] text-[#8B92A5]">4 exams this month</span>
          <button 
            onClick={() => router.push('/dashboard/teacher/quizzes')}
            className="text-[13px] text-[#3D4A6B] font-medium hover:underline"
          >
            + Create new exam
          </button>
        </div>
      </div>
    </div>
  );
}
