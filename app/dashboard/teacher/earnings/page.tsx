"use client";
import { useState } from "react";
import { 
  Plus, 
  ArrowUpRight, 
  Clock, 
  TrendingUp, 
  Box, 
  Download, 
  Filter, 
  Search, 
  Eye, 
  Landmark, 
  CheckCircle,
  History,
  Info,
  DollarSign,
  Wallet
} from "lucide-react";
import PayoutRequestModal from "@/components/teacher/PayoutRequestModal";

/**
 * Premium Frozen Core Financial Architecture
 * Minimalist, high-density, text-forward design.
 */

const TRANSACTIONS = [
  { id: "TX-4491", type: "Session Payout", description: "Advanced React - Batch B", date: "12 Mar, 2026", amount: "₹8,400.00", fee: "-₹840.00", net: "₹7,560.00", status: "Settled" },
  { id: "TX-4489", type: "Payout Request", description: "Allocation: Week 2, Mar 2026", date: "12 Mar, 2026", amount: "₹5,000.00", fee: "-₹500.00", net: "₹4,500.00", status: "Pending Approval" },
  { id: "TX-4485", type: "Direct Booking", description: "Calculus Trial (Varun S.)", date: "11 Mar, 2026", amount: "₹3,500.00", fee: "-₹350.00", net: "₹3,150.00", status: "Settling" },
  { id: "TX-4482", type: "Withdrawal", description: "Transfer to Bank account ending in 0422", date: "10 Mar, 2026", amount: "₹18,000.00", fee: "₹0.00", net: "-₹18,000.00", status: "Completed" },
  { id: "TX-4478", type: "Session Payout", description: "Physics Fundamentals - Rahul V.", date: "09 Mar, 2026", amount: "₹4,500.00", fee: "-₹450.00", net: "₹4,050.00", status: "Settled" },
];

const PAYOUT_HISTORY = [
  { id: "PO-9921", date: "10 Mar, 2026", destination: "HDFC Bank (****0422)", amount: "₹18,000.00", status: "Successful", ref: "UTR449102X9" },
  { id: "PO-9812", date: "01 Mar, 2026", destination: "ICICI Bank (****2199)", amount: "₹24,500.00", status: "Successful", ref: "UTR882103K1" },
  { id: "PO-9705", date: "15 Feb, 2026", destination: "HDFC Bank (****0422)", amount: "₹12,000.00", status: "Successful", ref: "UTR112009M4" },
];

const TAX_REPORTS = [
  { id: "TR-2026-Q4", title: "TDS Certificate (Form 16A)", period: "Jan - Mar 2026", date: "Pending Release", type: "PDF", size: "240 KB" },
  { id: "TR-2025-Q3", title: "Quarterly Tax Summary", period: "Oct - Dec 2025", date: "15 Jan, 2026", type: "PDF", size: "1.2 MB" },
  { id: "TR-2025-Q2", title: "Quarterly Tax Summary", period: "Jul - Sep 2025", date: "12 Oct, 2025", type: "PDF", size: "1.1 MB" },
];

export default function EarningsPage() {
  const [activeTab, setActiveTab] = useState("Financial Ledger");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const availableBalance = 124800; 

  const renderTabContent = () => {
    switch (activeTab) {
      case "Financial Ledger":
        return (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                {["Reference ID", "Activity / Identity", "Gross", "Fee", "Net Yield", "Status"].map((h) => (
                  <th key={h} className="pb-6 pt-10 px-8 text-[11px] font-black uppercase tracking-[0.3em] text-gray-700 border-b border-gray-100">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50">
              {TRANSACTIONS.map((txn) => (
                <tr key={txn.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="py-8 px-8 font-mono text-[13px] text-black font-black uppercase tracking-tighter">{txn.id}</td>
                  <td className="py-8 px-8">
                    <div className="flex flex-col">
                      <span className="text-[15px] font-black text-black">{txn.description}</span>
                      <span className="text-[11px] text-gray-500 font-bold mt-1 uppercase tracking-wider">{txn.type} • {txn.date}</span>
                    </div>
                  </td>
                  <td className="py-8 px-8 text-[14px] font-black text-gray-700">{txn.amount}</td>
                  <td className="py-8 px-8 text-[14px] font-black text-red-600/70">{txn.fee}</td>
                  <td className="py-8 px-8 text-[16px] font-black text-black">{txn.net}</td>
                  <td className="py-8 px-8">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        txn.status === 'Settled' ? 'bg-green-600' :
                        txn.status === 'Pending Approval' ? 'bg-blue-600 animate-pulse' :
                        txn.status === 'Completed' ? 'bg-black' : 'bg-amber-600'
                      }`} />
                      <span className="text-[10px] font-black uppercase tracking-[0.14em] text-black">{txn.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      
      case "Payout History":
        return (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                {["Payout ID", "Settlement Date", "Destination", "Amount", "Status", "Ref #"].map((h) => (
                  <th key={h} className="pb-6 pt-10 px-8 text-[11px] font-black uppercase tracking-[0.3em] text-gray-700 border-b border-gray-100">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50">
              {PAYOUT_HISTORY.map((po) => (
                <tr key={po.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="py-8 px-8 font-mono text-[13px] text-black font-black uppercase tracking-tighter">{po.id}</td>
                  <td className="py-8 px-8 text-[14px] font-black text-black">{po.date}</td>
                  <td className="py-8 px-8">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-black text-black">{po.destination}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Automated Clearing</span>
                    </div>
                  </td>
                  <td className="py-8 px-8 text-[16px] font-black text-black">{po.amount}</td>
                  <td className="py-8 px-8">
                    <div className="flex items-center gap-3 text-green-600">
                      <CheckCircle size={14} weight="fill" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{po.status}</span>
                    </div>
                  </td>
                  <td className="py-8 px-8">
                    <span className="text-[12px] font-mono text-gray-500 font-bold">{po.ref}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case "Tax Reports":
        return (
          <div className="p-8 space-y-4">
            {TAX_REPORTS.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-6 bg-gray-50/30 border border-gray-100 rounded-[24px] hover:border-gray-300 transition-all group">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-red-500 font-black text-xs shadow-sm">
                    {report.type}
                  </div>
                  <div>
                    <h5 className="text-[15px] font-black text-black">{report.title}</h5>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">{report.period} • {report.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-0.5">Released On</p>
                    <p className="text-[12px] font-black text-black">{report.date}</p>
                  </div>
                  <button 
                    disabled={report.date === "Pending Release"}
                    className="p-3 bg-white border border-gray-200 rounded-full hover:bg-black hover:text-white hover:border-black transition-all disabled:opacity-30"
                  >
                    <Download size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen p-4 md:p-10 space-y-12 max-w-[1400px] mx-auto font-matter">
      
      {/* 1. Hero / Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-gray-100/80">
        <div>
           <div className="flex items-center gap-3 mb-4">
             <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
               <DollarSign className="w-4 h-4 text-white" />
             </div>
             <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-500">Financial Architecture</span>
           </div>
           <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#1a202c] font-season leading-[1.1]">
             Revenue Pipeline<br />& Clearances.
           </h1>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-8 py-4 bg-white text-black border border-gray-200 shadow-sm rounded-full text-xs font-bold hover:border-gray-400 transition-all active:scale-95">
            <Download className="w-4 h-4 text-gray-700" />
            <span>Generate Ledger</span>
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full text-xs font-bold hover:bg-gray-900 shadow-xl transition-all active:scale-95"
          >
            <span>Request Payout</span>
          </button>
        </div>
      </div>

      {/* 2. Metrics Grid - High Density Minimalist */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Available Clearance", value: `₹${availableBalance.toLocaleString()}`, sub: "Ready for withdrawal", icon: ArrowUpRight },
          { label: "Pending Escrow", value: `₹4,200`, sub: "Clearing in 2-3 days", icon: Clock },
          { label: "Current Month Gross", value: `₹64,200`, sub: `+18.4% vs last month`, icon: TrendingUp },
          { label: "Lifetime Earnings", value: `₹4,28,000`, sub: "Total net value generated", icon: Box }
        ].map((stat, i) => (
           <div key={i} className="flex flex-col justify-between p-8 bg-white border border-gray-100 rounded-[32px] hover:border-gray-400 transition-all shadow-[0_4px_24px_rgba(0,0,0,0.01)] group">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                  <stat.icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">{stat.label}</span>
              </div>
              <div>
                <div className="text-4xl font-tight tracking-tighter text-black mb-2 font-medium">{stat.value}</div>
                <p className="text-[11px] font-medium text-gray-500">{stat.sub}</p>
              </div>
           </div>
        ))}
      </div>

      {/* 3. Main Content Engine / Ledger */}
      <div className="bg-white border border-gray-100 rounded-[40px] overflow-hidden shadow-sm">
         
         <div className="border-b border-gray-50 px-10 flex items-center justify-between">
           <div className="flex gap-10">
             {["Financial Ledger", "Payout History", "Tax Reports"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative py-8 text-[11px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                    activeTab === tab ? "text-black" : "text-gray-500 hover:text-black"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-black rounded-t-full" />
                  )}
                </button>
              ))}
           </div>
           <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 px-5 py-2.5 rounded-full focus-within:border-gray-400 transition-colors">
                <Search size={14} className="text-gray-600" />
                <input type="text" placeholder="Search records..." className="bg-transparent border-none outline-none text-[12px] w-[140px] placeholder:text-gray-400 font-bold" />
              </div>
              <button className="p-2.5 border border-gray-200 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"><Filter size={16} /></button>
           </div>
         </div>

         <div className="p-2 overflow-x-auto min-h-[400px]">
            {renderTabContent()}
         </div>

         <div className="px-10 py-10 bg-white border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400">
                        HG
                     </div>
                  ))}
               </div>
               <p className="text-[11px] font-bold text-gray-700 italic border-l-2 border-gray-200 pl-4">
                  {activeTab === "Tax Reports" 
                    ? "Tax documents are generated according to regulatory guidelines."
                    : "Withdrawals are processed in 3-5 working days upon admin approval."}
               </p>
            </div>
            <button className="text-[11px] font-black uppercase tracking-widest text-black hover:tracking-[0.25em] transition-all bg-gray-50 px-6 py-3 rounded-full hover:bg-black hover:text-white">
              Request Full Statement
            </button>
         </div>
      </div>

      {/* Payout Modal */}
      <PayoutRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        availableBalance={availableBalance} 
      />
    </div>
  );
}

