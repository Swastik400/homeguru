"use client";
import { useState } from "react";
import {
  Gift,
  Users,
  Coins,
  Copy,
  CheckCircle,
  WhatsappLogo,
  ArrowRight,
  User,
} from "@phosphor-icons/react";

const MY_REFERRALS = [
  { name: "Rahul Sharma", role: "Student", joined: "12 Mar, 2026", earned: "+₹250" },
  { name: "Priya Verma",  role: "Teacher", joined: "10 Mar, 2026", earned: "+₹50"  },
  { name: "Ankit Singh",  role: "Student", joined: "08 Mar, 2026", earned: "+₹250" },
];

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = "HG-CERSEI-2026";
  const creditBalance = 550;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappText = encodeURIComponent(
    `Hey! I use HomeGuru for tutoring — join with my code ${referralCode} and we both earn! 🎉`
  );

  return (
    <div className="bg-[#FAFAFA] min-h-screen p-6 md:p-10 max-w-[820px] mx-auto space-y-8 font-matter">

      {/* Header */}
      <div className="pb-8 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
            <Gift className="w-3 h-3 text-white" />
          </div>
          <span className="text-[9px] uppercase tracking-[0.25em] font-black text-gray-400">Referral Program</span>
        </div>
        <h1 className="text-3xl md:text-4xl text-[#1a202c] font-season leading-tight">
          Invite & Earn.
        </h1>
        <p className="mt-2 text-[13px] text-gray-500 font-medium max-w-[420px] leading-relaxed">
          Refer a student — earn <span className="text-black font-bold">₹250</span>. Refer a teacher — earn <span className="text-black font-bold">₹50</span>. Auto-credited on signup.
        </p>
      </div>

      {/* Referral Code */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-3">Your Code</p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex-1 px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl font-mono text-base font-black tracking-widest text-black select-all">
            {referralCode}
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-wider hover:border-gray-400 transition-all"
            >
              {copied ? <CheckCircle size={13} weight="fill" className="text-green-600" /> : <Copy size={13} />}
              {copied ? "Copied!" : "Copy"}
            </button>
            <a
              href={`https://wa.me/?text=${whatsappText}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-gray-900 transition-all active:scale-95"
            >
              <WhatsappLogo size={13} weight="fill" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Coins size={15} weight="fill" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Balance</span>
          </div>
          <div className="text-3xl font-season text-black mb-1">₹{creditBalance}</div>
          <p className="text-[11px] text-gray-400 font-medium">In your wallet</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
              <Users size={15} weight="fill" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Referred</span>
          </div>
          <div className="text-3xl font-season text-black mb-1">3</div>
          <p className="text-[11px] text-gray-400 font-medium">2 students · 1 teacher</p>
        </div>
      </div>

      {/* Who I referred */}
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4">People you referred</p>
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm divide-y divide-gray-50">
          {MY_REFERRALS.map((r, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <User size={15} />
                </div>
                <div>
                  <p className="text-[13px] font-black text-black">{r.name}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">{r.role} · {r.joined}</p>
                </div>
              </div>
              <div className="text-[14px] font-black text-green-600">{r.earned}</div>
            </div>
          ))}
          <div className="px-6 py-3 bg-gray-50/50">
            <p className="text-[10px] font-medium text-gray-400">Credits are added within 24 hours of signup.</p>
          </div>
        </div>
      </div>

      {/* Cash Out */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 bg-black rounded-2xl">
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Ready to use</p>
          <h4 className="text-lg font-season text-white">₹{creditBalance} in credits</h4>
          <p className="text-[11px] text-white/50 font-medium">Withdraw via the Earnings page.</p>
        </div>
        <a
          href="/dashboard/teacher/earnings"
          className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all active:scale-95 whitespace-nowrap"
        >
          Go to Wallet
          <ArrowRight size={14} />
        </a>
      </div>

    </div>
  );
}
