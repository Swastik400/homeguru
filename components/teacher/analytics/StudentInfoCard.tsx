"use client";
import React from 'react';
import { Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap } from 'lucide-react';

interface StudentData {
  email?: string;
  phone?: string;
  location?: string;
  joined?: string;
  target?: string;
  education?: string;
  learningStyle?: string[];
}

interface StudentInfoCardProps {
  data?: StudentData;
}

export default function StudentInfoCard({ data }: StudentInfoCardProps) {
  const details = [
    { icon: <Mail size={16} />, label: "Email", value: data?.email || "varun.s@example.com" },
    { icon: <Phone size={16} />, label: "Phone", value: data?.phone || "+91 98765 43210" },
    { icon: <MapPin size={16} />, label: "Location", value: data?.location || "Mumbai, India" },
    { icon: <Calendar size={16} />, label: "Joined", value: data?.joined || "Jan 12, 2026" },
    { icon: <Briefcase size={16} />, label: "Target", value: data?.target || "IELTS 7.5+" },
    { icon: <GraduationCap size={16} />, label: "Education", value: data?.education || "B.Tech Final Year" }
  ];

  const styles = data?.learningStyle || ['Visual', 'Conversational', 'Practical'];

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-gray-900 font-bold mb-4">About Student</h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-0">
          Enthusiastic learner focusing on improving spoken English and public speaking skills for upcoming campus placements.
        </p>
      </div>
      
      <div className="p-6 space-y-4">
        {details.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="text-gray-400 mt-0.5">{item.icon}</div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</span>
              <span className="text-sm font-medium text-gray-800">{item.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-gray-50 border-t border-gray-100">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Preferred Learning Style</h4>
        <div className="flex flex-wrap gap-2">
          {styles.map(tag => (
            <span key={tag} className="px-2.5 py-1 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-600">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
