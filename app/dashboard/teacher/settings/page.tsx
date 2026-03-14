"use client";
import React, { useState } from "react";
import { 
  User, Bell, Shield, CreditCard, MonitorSmartphone, 
  Settings2, Save, LogOut, CheckCircle2, Moon, Globe, 
  Smartphone, Mail, Lock, Key, CreditCard as CardIcon,
  ChevronRight, ToggleLeft, ToggleRight, AlertCircle, HelpCircle, Plus
} from "lucide-react";
import "@/components/teacher/CourseBuilder.css";

/* ──────────────────────────────────
   TABS 
────────────────────────────────── */
const SETTINGS_TABS = [
  { id: "profile", label: "My Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security & Login", icon: Shield },
  { id: "preferences", label: "Preferences", icon: Settings2 },
  { id: "billing", label: "Billing", icon: CreditCard },
];

/* ──────────────────────────────────
   PAGE COMPONENT
────────────────────────────────── */
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedMsg, setShowSavedMsg] = useState(false);

  // Form States (Simulated Data)
  const [form, setForm] = useState({
    firstName: "Rohan",
    lastName: "Desai",
    email: "rohan.desai@example.com",
    title: "Senior Physics Instructor",
    bio: "Passionate about making quantum mechanics accessible to high school students.",
    phone: "+91 98765 43210",
    
    // Notifications
    notEmailUpdates: true,
    notStudentMsgs: true,
    notMarketing: false,
    notAppPush: true,
    notWeeklyReport: true,

    // Prefs
    theme: "light",
    language: "English",
    timezone: "Asia/Kolkata",
  });

  const handleChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const toggle = (field: string) => {
    setForm(prev => ({ ...prev, [field]: !(prev as any)[field] }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSavedMsg(true);
      setTimeout(() => setShowSavedMsg(false), 3000);
    }, 800);
  };

  return (
    <div className="billing-page">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-[#111] font-matter tracking-tight leading-tight">Settings</h1>
          <p className="text-[14px] text-gray-500 mt-1 font-matter">Manage your account preferences and configurations.</p>
        </div>
        <div className="flex gap-3 items-center">
          {showSavedMsg && (
            <span className="text-[12px] font-bold text-[#16a34a] flex items-center gap-1.5 animate-in fade-in slide-in-from-right-4">
              <CheckCircle2 size={16} /> Changes saved
            </span>
          )}
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#111] text-white rounded-xl text-[13px] font-bold hover:bg-black transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR NAVIGATION */}
        <div className="lg:col-span-3">
          <div className="sticky top-6 flex flex-col gap-1">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-3 mb-3 font-matter">Account Settings</h3>
            {SETTINGS_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-matter ${
                    isActive ? "bg-white text-[#111] shadow-sm border border-gray-200" : "text-gray-500 hover:bg-white/50 hover:text-[#111] border border-transparent"
                  }`}
                >
                  <Icon size={18} className={isActive ? "text-[#111]" : "text-gray-400"} />
                  <span className="text-[13px] font-bold">{tab.label}</span>
                  {isActive && <ChevronRight size={16} className="ml-auto text-gray-300" />}
                </button>
              );
            })}

            <div className="mt-8 border-t border-gray-100 pt-6">
               <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-matter text-red-500 hover:bg-red-50 hover:border-red-100 border border-transparent group">
                  <LogOut size={18} className="text-red-400 group-hover:text-red-500 transition-colors" />
                  <span className="text-[13px] font-bold">Sign Out</span>
               </button>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="lg:col-span-9">
          
          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="bg-white border border-gray-200 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="px-8 py-6 border-b border-gray-100">
                <h2 className="text-[18px] font-bold text-[#111] font-matter">Personal Information</h2>
                <p className="text-[13px] text-gray-500 font-matter mt-1">This information will be displayed publicly on your profile.</p>
              </div>
              
              <div className="p-8">
                {/* Avatar Section */}
                <div className="flex items-center gap-6 mb-10 pb-10 border-b border-gray-100">
                   <div className="w-20 h-20 rounded-full bg-[#f3f4f6] border border-gray-200 flex items-center justify-center font-bold text-[28px] text-gray-400 font-matter uppercase">
                     {form.firstName[0]}{form.lastName[0]}
                   </div>
                   <div>
                     <div className="flex gap-3 mb-2">
                       <button className="px-4 py-2 bg-[#111] text-white rounded-lg text-[12px] font-bold font-matter hover:bg-black transition-colors">Change Avatar</button>
                       <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-[12px] font-bold font-matter hover:bg-gray-50 transition-colors">Remove</button>
                     </div>
                     <p className="text-[12px] text-gray-400 font-matter">JPG, GIF or PNG. 1MB max.</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {/* Form Fields */}
                  <div className="col-span-1">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest font-matter mb-2">First Name</label>
                    <input type="text" value={form.firstName} onChange={e => handleChange("firstName", e.target.value)} className="w-full px-4 py-2.5 bg-[#fcfcfc] border border-gray-200 rounded-xl text-[14px] text-[#111] font-matter focus:bg-white focus:border-[#111] focus:ring-1 focus:ring-[#111] outline-none transition-all" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest font-matter mb-2">Last Name</label>
                    <input type="text" value={form.lastName} onChange={e => handleChange("lastName", e.target.value)} className="w-full px-4 py-2.5 bg-[#fcfcfc] border border-gray-200 rounded-xl text-[14px] text-[#111] font-matter focus:bg-white focus:border-[#111] focus:ring-1 focus:ring-[#111] outline-none transition-all" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest font-matter mb-2">Email Address</label>
                    <input type="email" value={form.email} onChange={e => handleChange("email", e.target.value)} className="w-full px-4 py-2.5 bg-[#fcfcfc] border border-gray-200 rounded-xl text-[14px] text-[#111] font-matter focus:bg-white focus:border-[#111] focus:ring-1 focus:ring-[#111] outline-none transition-all" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest font-matter mb-2">Phone Number</label>
                    <input type="tel" value={form.phone} onChange={e => handleChange("phone", e.target.value)} className="w-full px-4 py-2.5 bg-[#fcfcfc] border border-gray-200 rounded-xl text-[14px] text-[#111] font-matter focus:bg-white focus:border-[#111] focus:ring-1 focus:ring-[#111] outline-none transition-all" />
                  </div>
                  <div className="col-span-2 md:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest font-matter mb-2">Professional Title</label>
                    <input type="text" value={form.title} onChange={e => handleChange("title", e.target.value)} placeholder="e.g. Senior Math Tutor" className="w-full px-4 py-2.5 bg-[#fcfcfc] border border-gray-200 rounded-xl text-[14px] text-[#111] font-matter focus:bg-white focus:border-[#111] focus:ring-1 focus:ring-[#111] outline-none transition-all" />
                  </div>
                  <div className="col-span-2 md:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest font-matter mb-2">Short Bio</label>
                    <textarea 
                      value={form.bio} onChange={e => handleChange("bio", e.target.value)} rows={4}
                      className="w-full px-4 py-3 bg-[#fcfcfc] border border-gray-200 rounded-xl text-[14px] text-[#111] font-matter focus:bg-white focus:border-[#111] focus:ring-1 focus:ring-[#111] outline-none transition-all resize-none"
                    />
                    <p className="text-[11px] text-gray-400 font-matter mt-2 text-right">Maximum 500 characters</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === "notifications" && (
            <div className="bg-white border border-gray-200 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
               <div className="px-8 py-6 border-b border-gray-100">
                <h2 className="text-[18px] font-bold text-[#111] font-matter">Notification Preferences</h2>
                <p className="text-[13px] text-gray-500 font-matter mt-1">Control how and when you receive alerts.</p>
              </div>
              <div className="p-8">
                 <div className="space-y-6">
                    {/* Item */}
                    <div className="flex items-center justify-between pb-6 border-b border-gray-50">
                       <div className="flex gap-4 items-start">
                          <div className="p-2 bg-gray-50 rounded-lg text-gray-500"><Mail size={18} /></div>
                          <div>
                            <h4 className="text-[14px] font-bold text-[#111] font-matter">Platform Updates</h4>
                            <p className="text-[12px] text-gray-500 font-matter mt-0.5">Receive emails about new features and improvements.</p>
                          </div>
                       </div>
                       <button onClick={() => toggle("notEmailUpdates")} className={`transition-colors ${form.notEmailUpdates ? "text-[#111]" : "text-gray-300"}`}>
                          {form.notEmailUpdates ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                       </button>
                    </div>

                    <div className="flex items-center justify-between pb-6 border-b border-gray-50">
                       <div className="flex gap-4 items-start">
                          <div className="p-2 bg-gray-50 rounded-lg text-gray-500"><Bell size={18} /></div>
                          <div>
                            <h4 className="text-[14px] font-bold text-[#111] font-matter">Student Messages</h4>
                            <p className="text-[12px] text-gray-500 font-matter mt-0.5">Get notified instantly when a student sends a direct message.</p>
                          </div>
                       </div>
                       <button onClick={() => toggle("notStudentMsgs")} className={`transition-colors ${form.notStudentMsgs ? "text-[#111]" : "text-gray-300"}`}>
                          {form.notStudentMsgs ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                       </button>
                    </div>

                    <div className="flex items-center justify-between pb-6 border-b border-gray-50">
                       <div className="flex gap-4 items-start">
                          <div className="p-2 bg-gray-50 rounded-lg text-gray-500"><Smartphone size={18} /></div>
                          <div>
                            <h4 className="text-[14px] font-bold text-[#111] font-matter">Push Notifications</h4>
                            <p className="text-[12px] text-gray-500 font-matter mt-0.5">Deliver important alerts directly to your mobile device.</p>
                          </div>
                       </div>
                       <button onClick={() => toggle("notAppPush")} className={`transition-colors ${form.notAppPush ? "text-[#111]" : "text-gray-300"}`}>
                          {form.notAppPush ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                       </button>
                    </div>

                    <div className="flex items-center justify-between">
                       <div className="flex gap-4 items-start">
                          <div className="p-2 bg-gray-50 rounded-lg text-gray-500"><AlertCircle size={18} /></div>
                          <div>
                            <h4 className="text-[14px] font-bold text-[#111] font-matter">Weekly Insights</h4>
                            <p className="text-[12px] text-gray-500 font-matter mt-0.5">A digest of your class performance sent every Monday.</p>
                          </div>
                       </div>
                       <button onClick={() => toggle("notWeeklyReport")} className={`transition-colors ${form.notWeeklyReport ? "text-[#111]" : "text-gray-300"}`}>
                          {form.notWeeklyReport ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                       </button>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === "security" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="bg-white border border-gray-200 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-100">
                  <h2 className="text-[18px] font-bold text-[#111] font-matter">Password & Authentication</h2>
                  <p className="text-[13px] text-gray-500 font-matter mt-1">Keep your account secure.</p>
                </div>
                <div className="p-8 space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="col-span-2">
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest font-matter mb-2">Current Password</label>
                        <input type="password" placeholder="••••••••" className="w-full md:w-1/2 px-4 py-2.5 bg-[#fcfcfc] border border-gray-200 rounded-xl text-[14px] font-matter focus:bg-white focus:border-[#111] outline-none transition-all" />
                      </div>
                      <div className="col-span-1">
                         <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest font-matter mb-2">New Password</label>
                         <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-[#fcfcfc] border border-gray-200 rounded-xl text-[14px] font-matter focus:bg-white focus:border-[#111] outline-none transition-all" />
                      </div>
                      <div className="col-span-1">
                         <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest font-matter mb-2">Confirm New Password</label>
                         <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-[#fcfcfc] border border-gray-200 rounded-xl text-[14px] font-matter focus:bg-white focus:border-[#111] outline-none transition-all" />
                      </div>
                      <div className="col-span-2">
                         <button className="px-6 py-2.5 bg-[#111] text-white rounded-xl text-[13px] font-bold font-matter hover:bg-black transition-colors">Update Password</button>
                      </div>
                   </div>
                </div>
              </div>

              {/* 2FA Card */}
              <div className="bg-[#f9fafb] border border-gray-200 rounded-[20px] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                 <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 shrink-0">
                       <Key className="w-6 h-6 text-[#111]" />
                    </div>
                    <div>
                       <h3 className="text-[16px] font-bold text-[#111] font-matter">Two-Factor Authentication</h3>
                       <p className="text-[13px] text-gray-500 font-matter mt-1 max-w-md leading-relaxed">Add an extra layer of security to your account. We recommend using an authenticator app like Authy or Google Authenticator.</p>
                       <span className="inline-block mt-3 px-2 py-0.5 bg-red-50 text-red-600 border border-red-100 rounded text-[10px] font-bold uppercase tracking-widest font-matter">Not Configured</span>
                    </div>
                 </div>
                 <button className="px-6 py-2.5 bg-white border border-gray-200 text-[#111] rounded-xl text-[13px] font-bold font-matter hover:bg-white/50 transition-colors shadow-sm shrink-0 whitespace-nowrap">
                    Enable 2FA
                 </button>
              </div>
            </div>
          )}

          {/* PREFERENCES TAB */}
          {activeTab === "preferences" && (
            <div className="bg-white border border-gray-200 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="px-8 py-6 border-b border-gray-100">
                <h2 className="text-[18px] font-bold text-[#111] font-matter">Interface Preferences</h2>
                <p className="text-[13px] text-gray-500 font-matter mt-1">Customize your platform experience.</p>
              </div>
              <div className="p-8 space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Theme */}
                    <div>
                       <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest font-matter mb-3">Dashboard Theme</label>
                       <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleChange("theme", "light")}
                            className={`flex items-center gap-2 px-5 py-3 border rounded-xl text-[13px] font-bold font-matter transition-all flex-1 justify-center ${form.theme === 'light' ? 'border-[#111] bg-gray-50 text-[#111]' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                          >
                             <MonitorSmartphone size={16} /> Light
                          </button>
                          <button 
                            onClick={() => handleChange("theme", "dark")}
                            className={`flex items-center gap-2 px-5 py-3 border rounded-xl text-[13px] font-bold font-matter transition-all flex-1 justify-center ${form.theme === 'dark' ? 'border-[#111] bg-[#111] text-white' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                          >
                             <Moon size={16} /> Dark
                          </button>
                       </div>
                    </div>

                    {/* Locale */}
                    <div>
                       <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest font-matter mb-2">Language</label>
                       <select 
                         value={form.language} onChange={e => handleChange("language", e.target.value)}
                         className="w-full px-4 py-3 bg-[#fcfcfc] border border-gray-200 rounded-xl text-[14px] text-[#111] font-matter outline-none focus:border-[#111] transition-colors"
                       >
                         <option>English</option>
                         <option>Hindi (हिंदी)</option>
                         <option>Spanish (Español)</option>
                       </select>
                    </div>

                    {/* Timezone */}
                    <div className="md:col-span-2">
                       <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest font-matter mb-2">Timezone</label>
                       <div className="relative">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <select 
                           value={form.timezone} onChange={e => handleChange("timezone", e.target.value)}
                           className="w-full pl-11 pr-4 py-3 bg-[#fcfcfc] border border-gray-200 rounded-xl text-[14px] text-[#111] font-matter outline-none focus:border-[#111] transition-colors"
                          >
                           <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                           <option value="America/New_York">America/New_York (EST)</option>
                           <option value="Europe/London">Europe/London (GMT)</option>
                          </select>
                       </div>
                       <p className="text-[12px] text-gray-400 font-matter mt-2">All your class schedules will be displayed in this timezone.</p>
                    </div>

                 </div>
              </div>
            </div>
          )}

          {/* BILLING TAB */}
          {activeTab === "billing" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
               {/* Current Plan */}
               <div className="bg-[#111] text-white rounded-[20px] p-8 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                     <CreditCard size={120} />
                  </div>
                  <div className="relative z-10">
                     <div className="flex items-center gap-3 mb-2">
                        <span className="px-2.5 py-1 bg-white/10 border border-white/20 rounded-md text-[10px] uppercase tracking-widest font-bold">Pro Tier</span>
                     </div>
                     <h2 className="text-[28px] font-bold font-matter leading-tight">HomeGuru Pro</h2>
                     <p className="text-[13px] text-gray-400 font-matter mt-2 mb-8 max-w-sm">Access to premium analytics, unlimited student capacity, and priority support.</p>
                     
                     <div className="flex gap-4">
                        <button className="px-6 py-2.5 bg-white text-[#111] rounded-xl text-[13px] font-bold font-matter transition-all shadow-sm">
                           Manage Subscription
                        </button>
                     </div>
                  </div>
               </div>

               {/* Payment Method */}
               <div className="bg-white border border-gray-200 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
                  <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
                     <div>
                        <h2 className="text-[18px] font-bold text-[#111] font-matter">Payment Methods</h2>
                        <p className="text-[13px] text-gray-500 font-matter mt-1">Manage billing cards and invoices.</p>
                     </div>
                     <button className="px-4 py-2 bg-[#fcfcfc] border border-gray-200 text-[#111] rounded-xl text-[12px] font-bold font-matter hover:bg-gray-50 flex items-center gap-2">
                        <Plus size={14} /> Add Card
                     </button>
                  </div>
                  
                  <div className="p-8">
                     <div className="flex items-center justify-between p-4 border border-[#111] bg-gray-50 rounded-xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#111]" />
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-8 bg-black rounded shadow-sm flex items-center justify-center text-white italic font-bold">
                              Visa
                           </div>
                           <div>
                              <p className="text-[14px] font-bold text-[#111] font-matter">Visa ending in •••• 4242</p>
                              <p className="text-[12px] text-gray-500 font-matter">Expires 12/26</p>
                           </div>
                        </div>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest font-matter">Primary</span>
                     </div>

                     <div className="mt-8 pt-8 border-t border-gray-100">
                        <h3 className="text-[14px] font-bold text-[#111] font-matter mb-4">Billing History</h3>
                        <table className="w-full text-left font-matter">
                           <thead>
                              <tr className="border-b border-gray-100">
                                 <th className="pb-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
                                 <th className="pb-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                                 <th className="pb-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-50 text-[13px]">
                              <tr>
                                 <td className="py-4 text-gray-600 font-medium">Mar 01, 2026</td>
                                 <td className="py-4 text-[#111] font-bold">₹1,999</td>
                                 <td className="py-4"><span className="px-2 py-1 bg-green-50 text-green-700 border border-green-100 rounded text-[10px] font-bold uppercase">Paid</span></td>
                                 <td className="py-4 text-right"><button className="text-gray-400 hover:text-[#111]">Invoice</button></td>
                              </tr>
                              <tr>
                                 <td className="py-4 text-gray-600 font-medium">Feb 01, 2026</td>
                                 <td className="py-4 text-[#111] font-bold">₹1,999</td>
                                 <td className="py-4"><span className="px-2 py-1 bg-green-50 text-green-700 border border-green-100 rounded text-[10px] font-bold uppercase">Paid</span></td>
                                 <td className="py-4 text-right"><button className="text-gray-400 hover:text-[#111]">Invoice</button></td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
