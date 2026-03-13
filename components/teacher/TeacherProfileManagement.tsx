"use client";
import { useState } from "react";
import { User, DollarSign, Clock, FileText, Camera, Save } from "lucide-react";

export default function TeacherProfileManagement() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@homeguru.com",
    phone: "+91 98765 43210",
    bio: "Experienced educator with 10+ years in Computer Science",
    hourlyRate: 500,
    subjects: ["Mathematics", "Physics", "Computer Science"],
    availability: {
      monday: { enabled: true, slots: ["09:00-12:00", "14:00-17:00"] },
      tuesday: { enabled: true, slots: ["09:00-12:00", "14:00-17:00"] },
      wednesday: { enabled: true, slots: ["09:00-12:00"] },
      thursday: { enabled: true, slots: ["09:00-12:00", "14:00-17:00"] },
      friday: { enabled: true, slots: ["09:00-12:00"] },
      saturday: { enabled: false, slots: [] },
      sunday: { enabled: false, slots: [] }
    },
    cancellationPolicy: "24-hours",
    qualifications: "M.Sc Computer Science, B.Ed",
    experience: "10 years"
  });

  const [activeTab, setActiveTab] = useState<"basic" | "rates" | "availability" | "policies">("basic");

  const handleSave = () => {
    console.log("Saving profile:", profile);
    alert("Profile updated successfully!");
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Profile Management</h2>
            <p className="text-sm text-gray-500 mt-1">Manage your teaching profile and preferences</p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 px-6">
        {[
          { id: "basic", label: "Basic Info", icon: User },
          { id: "rates", label: "Rates & Pricing", icon: DollarSign },
          { id: "availability", label: "Availability", icon: Clock },
          { id: "policies", label: "Policies", icon: FileText }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === "basic" && (
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=12" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Camera className="w-4 h-4" />
                Change Photo
              </button>
            </div>

            {/* Basic Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <input
                  type="text"
                  value={profile.experience}
                  onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Qualifications</label>
              <input
                type="text"
                value={profile.qualifications}
                onChange={(e) => setProfile({ ...profile, qualifications: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {activeTab === "rates" && (
          <div className="space-y-6">
            <div className="max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate (₹)</label>
              <input
                type="number"
                value={profile.hourlyRate}
                onChange={(e) => setProfile({ ...profile, hourlyRate: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-2">This is your base rate per hour of teaching</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Subjects You Teach</label>
              <div className="flex flex-wrap gap-2">
                {profile.subjects.map((subject, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {subject}
                  </span>
                ))}
                <button className="px-3 py-1 border border-dashed border-gray-300 rounded-full text-sm text-gray-600 hover:border-gray-400">
                  + Add Subject
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "availability" && (
          <div className="space-y-4">
            {Object.entries(profile.availability).map(([day, data]) => (
              <div key={day} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <input
                  type="checkbox"
                  checked={data.enabled}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      availability: {
                        ...profile.availability,
                        [day]: { ...data, enabled: e.target.checked }
                      }
                    })
                  }
                  className="w-5 h-5"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 capitalize">{day}</div>
                  {data.enabled && (
                    <div className="flex gap-2 mt-2">
                      {data.slots.map((slot, idx) => (
                        <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                          {slot}
                        </span>
                      ))}
                      <button className="px-2 py-1 border border-dashed border-gray-300 rounded text-sm text-gray-600">
                        + Add Slot
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "policies" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Cancellation Policy</label>
              <select
                value={profile.cancellationPolicy}
                onChange={(e) => setProfile({ ...profile, cancellationPolicy: e.target.value })}
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="24-hours">24 hours notice required</option>
                <option value="48-hours">48 hours notice required</option>
                <option value="flexible">Flexible cancellation</option>
                <option value="strict">Strict - No refunds</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
