"use client";
import { useState } from "react";
import { DollarSign, TrendingUp, Clock, Download, Eye, ArrowUpRight, ArrowDownRight, Search, Filter, Box, CheckCircle } from "lucide-react";

/**
 * Premium Frozen Core Financial Architecture
 * Minimalist, high-density, text-forward design.
 */

const MOCK_TRANSACTIONS = [
  { id: 1, date: "2024-02-10", student: "Sarah Johnson", amount: 1500, commission: 150, net: 1350, status: "completed", type: "class" },
  { id: 2, date: "2024-02-09", student: "Michael Chen", amount: 2000, commission: 200, net: 1800, status: "completed", type: "class" },
  { id: 3, date: "2024-02-08", student: "Emma Wilson", amount: 1800, commission: 180, net: 1620, status: "pending", type: "class" },
  { id: 4, date: "2024-02-07", student: "David Brown", amount: 0, commission: 0, net: 0, status: "completed", type: "demo" },
  { id: 5, date: "2024-02-06", student: "Lisa Anderson", amount: 2500, commission: 250, net: 2250, status: "completed", type: "class" },
  { id: 6, date: "2024-02-05", student: "John Smith", amount: 1500, commission: 150, net: 1350, status: "refunded", type: "class" }
];

const MOCK_PAYOUTS = [
  { id: 1, date: "2024-02-01", amount: 45000, status: "completed", method: "Bank Transfer", reference: "PAY-2024-001" },
  { id: 2, date: "2024-01-01", amount: 38500, status: "completed", method: "Bank Transfer", reference: "PAY-2024-002" },
  { id: 3, date: "2023-12-01", amount: 42000, status: "completed", method: "Bank Transfer", reference: "PAY-2023-003" }
];

export default function PaymentDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "transactions" | "payouts">("overview");

  const totalEarnings = 156800;
  const pendingAmount = 8450;
  const availableBalance = 12300;
  const thisMonthEarnings = 23400;
  const lastMonthEarnings = 19800;
  const growthPercent = ((thisMonthEarnings - lastMonthEarnings) / lastMonthEarnings * 100).toFixed(1);

  return (
    <div className="space-y-12 max-w-[1400px] mx-auto">
      
      {/* 1. Hero / Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100/50">
        <div>
           <div className="flex items-center gap-3 mb-2">
             <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
               <DollarSign className="w-4 h-4 text-white" />
             </div>
             <span className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">Financial Architecture</span>
           </div>
           <h1 className="text-4xl md:text-5xl tracking-tighter text-[#111111] font-medium font-season leading-tight">
             Revenue Pipeline<br />& Clearances.
           </h1>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-black border border-gray-100 shadow-sm rounded-full text-xs font-bold hover:border-gray-300 transition-all active:scale-95">
            <Download className="w-4 h-4" />
            <span>Generate Ledger</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#111111] text-white rounded-full text-xs font-bold hover:bg-black/90 shadow-xl transition-all active:scale-95">
            <span>Request Payout</span>
          </button>
        </div>
      </div>

      {/* 2. Top Stats - Frozen Core Minimalist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
        {[
          { label: "Available Clearance", value: `₹${availableBalance.toLocaleString()}`, sub: "Ready for withdrawal", icon: ArrowUpRight, trend: "+12%" },
          { label: "Pending Escrow", value: `₹${pendingAmount.toLocaleString()}`, sub: "Clearing in 2-3 days", icon: Clock },
          { label: "Current Month Gross", value: `₹${thisMonthEarnings.toLocaleString()}`, sub: `${growthPercent}% vs last month`, icon: TrendingUp, trend: "up" },
          { label: "Lifetime Earnings", value: `₹${totalEarnings.toLocaleString()}`, sub: "Total net value generated", icon: Box }
        ].map((stat, i) => (
           <div key={i} className="flex flex-col justify-between p-6 bg-white border border-gray-100 rounded-[24px] hover:border-gray-200 transition-colors shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center">
                  <stat.icon className="w-3 h-3 text-gray-400" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</span>
              </div>
              <div>
                <div className="text-4xl font-tight tracking-tighter text-[#111111] mb-2">{stat.value}</div>
                <p className="text-[11px] font-medium text-gray-400">{stat.sub}</p>
              </div>
           </div>
        ))}
      </div>

      {/* 3. Navigation & Content Engine */}
      <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm">
         
         <div className="border-b border-gray-100 px-6 sm:px-10 flex items-center gap-8 overflow-x-auto no-scrollbar">
           {[
              { id: "overview", label: "Financial Overview" },
              { id: "transactions", label: "Transaction Ledger" },
              { id: "payouts", label: "Payout History" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative py-6 text-[11px] font-black uppercase tracking-[0.15em] transition-all whitespace-nowrap ${
                  activeTab === tab.id ? "text-black" : "text-gray-300 hover:text-gray-600"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black rounded-t-full" />
                )}
              </button>
            ))}
         </div>

         <div className="p-6 sm:p-10">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                 
                 <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between">
                       <h3 className="text-xl font-season font-bold text-[#111111]">Recent Activity</h3>
                       <button onClick={() => setActiveTab('transactions')} className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors">View Complete Ledger</button>
                    </div>

                    <div className="space-y-3">
                      {MOCK_TRANSACTIONS.slice(0, 4).map((txn) => (
                         <div key={txn.id} className="group flex items-center justify-between p-4 sm:p-5 rounded-[20px] bg-gray-50/50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-sm transition-all">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-600 transition-colors">
                                 {txn.type === 'class' ? <ArrowDownRight className="w-4 h-4" /> : <Box className="w-4 h-4" />}
                               </div>
                               <div>
                                 <p className="text-sm font-bold text-[#111111]">{txn.student}</p>
                                 <p className="text-[11px] text-gray-400 font-medium mt-0.5">{txn.date} • {txn.type.toUpperCase()}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-6">
                               <div className="text-right">
                                  <p className="text-sm font-black text-[#111111]">₹{txn.net.toLocaleString()}</p>
                                  <p className={`text-[9px] font-black uppercase tracking-widest mt-1 ${
                                    txn.status === 'completed' ? 'text-green-500' :
                                    txn.status === 'pending' ? 'text-amber-500' : 'text-gray-400'
                                  }`}>
                                    {txn.status}
                                  </p>
                               </div>
                               <button className="p-2 bg-white rounded-full text-gray-300 hover:text-black hover:shadow-md transition-all border border-gray-100 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 hidden sm:block">
                                  <Eye className="w-4 h-4" />
                               </button>
                            </div>
                         </div>
                      ))}
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="p-6 sm:p-8 rounded-[24px] bg-[#111111] text-white relative overflow-hidden group">
                       <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-[60px]" />
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-6">Commission Structure</h4>
                       
                       <div className="space-y-5 relative z-10">
                          <div className="flex justify-between items-end border-b border-white/10 pb-4">
                             <span className="text-sm text-white/70">Gross Pipeline</span>
                             <span className="text-xl font-bold tracking-tight">₹26,000</span>
                          </div>
                          <div className="flex justify-between items-end border-b border-white/10 pb-4">
                             <div>
                               <span className="text-sm text-white/70 block">Platform Fee</span>
                               <span className="text-[10px] text-white/30 uppercase tracking-widest mt-1 block">10% Standard Rate</span>
                             </div>
                             <span className="text-lg font-bold tracking-tight text-white/50">- ₹2,600</span>
                          </div>
                          <div className="flex justify-between items-end pt-2">
                             <span className="text-sm font-bold text-white">Net Yield</span>
                             <span className="text-3xl font-season font-bold text-green-400">₹23,400</span>
                          </div>
                       </div>
                    </div>
                 </div>

              </div>
            )}

            {activeTab === "transactions" && (
              <div className="space-y-6">
                 
                 {/* Filter Utility */}
                 <div className="flex items-center justify-between gap-4 p-2 bg-gray-50 rounded-full border border-gray-100">
                    <div className="flex items-center gap-2 pl-4 w-full md:w-auto">
                       <Search className="w-4 h-4 text-gray-300" />
                       <input 
                         type="text" 
                         placeholder="Search transaction ID or student..." 
                         className="bg-transparent text-sm w-full md:w-64 focus:outline-none placeholder:text-gray-400 text-[#111]"
                       />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
                       <Filter className="w-3 h-3" />
                       Filter
                    </button>
                 </div>

                 <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                       <thead>
                          <tr className="border-b border-gray-100">
                            {["Date", "Identity", "Type", "Gross", "Fee", "Net Yield", "Status"].map((h) => (
                               <th key={h} className="pb-4 px-4 text-[9px] font-black uppercase tracking-[0.2em] text-gray-300">
                                  {h}
                               </th>
                            ))}
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-50/50">
                          {MOCK_TRANSACTIONS.map((txn) => (
                             <tr key={txn.id} className="group hover:bg-gray-50/30 transition-colors">
                                <td className="py-5 px-4 text-[11px] font-bold text-gray-500">{txn.date}</td>
                                <td className="py-5 px-4 text-sm font-bold text-[#111111]">{txn.student}</td>
                                <td className="py-5 px-4">
                                   <span className={`px-2 py-1 rounded-sm text-[9px] font-black uppercase tracking-widest ${
                                     txn.type === 'demo' ? 'bg-purple-50 text-purple-600' : 'bg-gray-100 text-gray-600'
                                   }`}>
                                     {txn.type}
                                   </span>
                                </td>
                                <td className="py-5 px-4 text-sm text-gray-600">{txn.amount ? `₹${txn.amount}` : '-'}</td>
                                <td className="py-5 px-4 text-sm text-gray-400">{txn.commission ? `-₹${txn.commission}` : '-'}</td>
                                <td className="py-5 px-4 text-sm font-black text-[#111111]">{txn.net ? `₹${txn.net}` : '-'}</td>
                                <td className="py-5 px-4">
                                   <div className="flex items-center gap-2">
                                     <div className={`w-1.5 h-1.5 rounded-full ${
                                       txn.status === 'completed' ? 'bg-green-500' :
                                       txn.status === 'pending' ? 'bg-amber-500' : 'bg-gray-300'
                                     }`} />
                                     <span className="text-[10px] font-black uppercase tracking-widest text-[#111]">{txn.status}</span>
                                   </div>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
            )}

            {activeTab === "payouts" && (
              <div className="space-y-6 max-w-4xl mx-auto">
                 {MOCK_PAYOUTS.map((payout) => (
                    <div key={payout.id} className="group flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-[24px] bg-white border border-gray-100 hover:border-blue-200 transition-colors shadow-sm">
                       <div className="flex items-center gap-6 mb-4 md:mb-0">
                          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
                             <CheckCircle className="w-5 h-5" />
                          </div>
                          <div>
                             <p className="text-xl font-bold tracking-tight text-[#111] mb-1">₹{payout.amount.toLocaleString()}</p>
                             <p className="text-[11px] font-medium text-gray-400">{payout.date} • {payout.method}</p>
                          </div>
                       </div>
                       <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4">
                          <span className="px-3 py-1 bg-gray-50 text-gray-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-gray-100">
                             Ref: {payout.reference}
                          </span>
                          <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors">
                            Download Receipt
                          </button>
                       </div>
                    </div>
                 ))}
              </div>
            )}
         </div>

      </div>

    </div>
  );
}

