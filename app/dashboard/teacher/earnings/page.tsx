"use client";
import { DollarSign, Wallet, Download, Landmark, History, Search, Filter, TrendingUp, Info, Clock, CheckCircle } from "lucide-react";

/**
 * Enterprise Earnings & Wallet Portal
 * Financial management, payouts, and transaction history.
 */

const TRANSACTIONS = [
  { id: "TX-4491", type: "Session Payout", description: "Advanced React - Batch B", date: "12 Mar, 2026", amount: "$120.00", fee: "-$12.00", net: "$108.00", status: "Settled" },
  { id: "TX-4485", type: "Direct Booking", description: "Calculus Trial (Varun S.)", date: "11 Mar, 2026", amount: "$45.00", fee: "-$4.50", net: "$40.50", status: "Pending" },
  { id: "TX-4482", type: "Withdrawal", description: "Transfer to Bank account ending in 0422", date: "10 Mar, 2026", amount: "$2,400.00", fee: "$0.00", net: "-$2,400.00", status: "Completed" },
  { id: "TX-4478", type: "Session Payout", description: "Physics Fundamentals - Rahul V.", date: "09 Mar, 2026", amount: "$55.00", fee: "-$5.50", net: "$49.50", status: "Settled" },
];

export default function EarningsPage() {
  return (
    <>
      <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
         <div>
            <h1 className="text-[28px] font-season font-bold text-[#111827]">Earnings & Payouts</h1>
            <p className="text-gray-500 text-[14px] mt-1">Manage your professional revenue, payouts, and financial transparently.</p>
         </div>
         
         <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-xl text-[14px] font-bold shadow-lg hover:bg-black/90 transition-all active:scale-95">
               <Landmark size={18} />
               <span>Request Payout</span>
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        
        {/* Wallet Balance Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-black text-white p-8 rounded-[32px] shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <div className="flex justify-between items-start mb-10">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <Wallet size={24} className="text-green-400" />
                 </div>
                 <span className="text-[10px] font-black uppercase bg-white/10 px-2 py-1 rounded-md tracking-wider">Primary Wallet</span>
              </div>
              <p className="text-[12px] font-bold opacity-60 uppercase tracking-widest mb-1.5">Available Balance</p>
              <h2 className="text-[42px] font-bold">$12,480.00</h2>
              <div className="flex items-center gap-2 mt-6 p-3 bg-white/5 rounded-2xl border border-white/5">
                 <TrendingUp size={16} className="text-green-400" />
                 <span className="text-[12px] font-bold italic opacity-80">Projected $1,240 more this week</span>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[32px] border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                 <p className="text-[12px] font-black uppercase text-gray-400 tracking-widest mb-1.5">Pending Settlement</p>
                 <h2 className="text-[32px] font-bold text-[#111827]">$420.50</h2>
                 <p className="text-[11px] text-amber-500 font-bold mt-2 flex items-center gap-1.5">
                    <Clock size={12} />
                    Expected in 48-72 hours
                 </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                 <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                    <p className="text-[10px] uppercase font-black text-gray-400 mb-1">Total Earned</p>
                    <span className="text-[16px] font-bold">$42,800</span>
                 </div>
                 <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                    <p className="text-[10px] uppercase font-black text-gray-400 mb-1">Platform Fee</p>
                    <span className="text-[16px] font-bold text-red-500">10%</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Payout Methods Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
           <div className="bg-white rounded-[24px] border border-gray-200 p-8 shadow-sm">
              <h3 className="text-[12px] font-black uppercase text-gray-400 tracking-wider mb-6">Payout Methods</h3>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                    <div className="flex items-center gap-3">
                       <Landmark size={20} className="text-gray-400" />
                       <div className="flex flex-col">
                          <span className="text-[13px] font-bold">HDFC Bank</span>
                          <span className="text-[11px] text-gray-400 font-medium font-mono">**** 0422</span>
                       </div>
                    </div>
                    <CheckCircle size={16} className="text-green-500" />
                 </div>
                 <button className="w-full py-4 border-2 border-dashed border-gray-100 rounded-2xl text-[12px] font-black uppercase tracking-widest text-gray-400 hover:border-black hover:text-black transition-all">
                    + Add New Method
                 </button>
              </div>
           </div>
        </div>

        {/* Transaction History Section */}
        <div className="lg:col-span-12 mt-4">
           <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-8 py-5 border-b border-gray-50 flex items-center justify-between flex-wrap gap-4">
                 <h3 className="text-[16px] font-season font-bold flex items-center gap-2">
                    <History size={18} className="text-gray-400" />
                    Billing History
                 </h3>
                 <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl">
                       <Search size={14} className="text-gray-400" />
                       <input type="text" placeholder="Search billing ID..." className="bg-transparent border-none outline-none text-[12px] w-[140px]" />
                    </div>
                    <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50"><Filter size={16} className="text-gray-400" /></button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-[12px] font-bold text-gray-700 hover:bg-gray-50">
                       <Download size={14} />
                       <span>Export CSV</span>
                    </button>
                 </div>
              </div>

              <div className="overflow-x-auto text-left">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#F9FAFB]/50 border-b border-gray-50">
                      <th className="py-4 pl-8 pr-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Transaction ID</th>
                      <th className="py-4 px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Type / Activity</th>
                      <th className="py-4 px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Amount (Gross)</th>
                      <th className="py-4 px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Fee</th>
                      <th className="py-4 px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Net Payout</th>
                      <th className="py-4 pr-8 pl-4 text-center text-[11px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {TRANSACTIONS.map((tx) => (
                      <tr key={tx.id} className="group hover:bg-gray-50/50 transition-all font-matter">
                        <td className="py-5 pl-8 pr-4 font-mono text-[11px] text-gray-400">{tx.id}</td>
                        <td className="py-5 px-4">
                           <div className="flex flex-col">
                              <span className="text-[14px] font-bold text-[#111827]">{tx.description}</span>
                              <span className="text-[11px] text-gray-400 font-medium">{tx.type} • {tx.date}</span>
                           </div>
                        </td>
                        <td className="py-5 px-4 text-center font-bold text-[14px] text-gray-700">{tx.amount}</td>
                        <td className="py-5 px-4 text-center text-[13px] font-bold text-red-400">{tx.fee}</td>
                        <td className="py-5 px-4 text-center font-black text-[15px] text-[#111827]">{tx.net}</td>
                        <td className="py-5 pr-8 pl-4 text-center">
                           <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                             tx.status === 'Settled' ? 'bg-green-50 text-green-600 border-green-100' :
                             tx.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                             tx.status === 'Completed' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                             'bg-gray-50 text-gray-400 border-gray-100'
                           }`}>
                             {tx.status}
                           </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-8 bg-[#F9FAFB] border-t border-gray-50 flex items-center justify-between">
                 <span className="text-[12px] font-bold text-gray-400 italic flex items-center gap-1.5">
                    <Info size={14} />
                    Payments are processed on a T+2 basis according to platform policy.
                 </span>
                 <button className="text-[12px] font-black uppercase tracking-widest text-black hover:underline cursor-pointer">View Wallet Statement</button>
              </div>
           </div>
        </div>

      </div>
    </>
  );
}
