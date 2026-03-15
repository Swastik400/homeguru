"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { 
  X, 
  Wallet, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Fingerprint, 
  CheckCircle,
} from "lucide-react";

interface PayoutRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
}

export default function PayoutRequestModal({ 
  isOpen, 
  onClose, 
  availableBalance 
}: PayoutRequestModalProps) {
  const [amount, setAmount] = useState("");
  const [selectedWeeks, setSelectedWeeks] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  // The maxWeeklyAmount and currentEligibleAmount logic from the original code
  // is not present in the provided Code Edit's handleAmountChange,
  // so it's assumed to be removed or handled differently.
  // For now, we'll keep the original calculation but note its potential removal
  // based on the handleAmountChange in the Code Edit.
  const maxWeeklyAmount = availableBalance / 4; 
  const currentEligibleAmount = Math.min(availableBalance, maxWeeklyAmount * selectedWeeks);


  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    if ((value.match(/\./g) || []).length > 1) return;
    setAmount(value);
    
    if (parseFloat(value) > availableBalance) { // Changed from currentEligibleAmount to availableBalance based on Code Edit
      setError("Exceeds available clearance");
    } else {
      setError("");
    }
  };

  const handleSubmit = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen || !mounted) return null;

  const platformFee = parseFloat(amount || "0") * 0.1;
  const netPayout = parseFloat(amount) - platformFee || 0;

  const modalContent = (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[8px]" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white border border-gray-100 rounded-[32px] shadow-[0_32px_120px_rgba(0,0,0,0.25)] overflow-hidden animate-in fade-in zoom-in duration-500 font-matter">
        
        {/* Compact Header - Tightened */}
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-season font-bold text-black tracking-tight">Payout Request</h3>
            <div className="flex items-center gap-1.5 mt-0.5 border border-gray-100 w-fit px-2 py-0.5 rounded-full bg-gray-50/50">
               <Fingerprint size={8} className="text-gray-400" />
               <p className="text-[7px] font-black uppercase tracking-[0.2em] text-gray-500">Lvl 04 Clearance</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-all text-gray-400 hover:text-black">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* 1. Liquidity Block - Compact */}
          <div className="flex items-center justify-between bg-gray-50/50 p-4 rounded-[20px] border border-gray-100">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400 mb-0.5">Available</p>
              <h4 className="text-lg font-bold text-black font-black">₹{availableBalance.toLocaleString()}</h4>
            </div>
            <div className="bg-white px-2.5 py-1 rounded-full shadow-sm border border-gray-100 flex items-center gap-1">
              <ShieldCheck size={10} className="text-green-600" />
              <span className="text-[8px] font-black uppercase tracking-widest">Verified</span>
            </div>
          </div>

          {/* 2. Compact Matrix - Tightened */}
          <div>
            <label className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-3 ml-1">ALLOCATION BLOCK</label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((wk) => (
                <button
                  key={wk}
                  onClick={() => setSelectedWeeks(wk)}
                  className={`py-2.5 rounded-[14px] border-2 transition-all flex flex-col items-center gap-0.5 relative ${
                    selectedWeeks === wk 
                      ? "border-black bg-black text-white shadow-lg scale-105" 
                      : "border-gray-50 bg-gray-50/30 text-gray-400 hover:border-gray-300 hover:text-black font-bold"
                  }`}
                >
                  <span className="text-base font-black">{wk}W</span>
                  {selectedWeeks === wk && (
                    <div className="absolute top-0.5 right-0.5">
                      <CheckCircle size={8} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Streamlined Input - Tightened */}
          <div className="relative border-b border-gray-100 pb-1.5 focus-within:border-black transition-colors group">
            <label className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-600 block mb-2 font-bold group-focus-within:text-black">AMOUNT TO CLEAR (INR)</label>
            <div className="flex items-end gap-2">
              <span className="text-lg font-bold text-gray-200 mb-0.5 group-focus-within:text-black">₹</span>
              <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="w-full bg-transparent text-2xl font-tight tracking-tighter text-black focus:outline-none placeholder:text-gray-100 font-black"
                autoFocus
              />
            </div>
            {error && <p className="absolute -bottom-4 left-0 text-[7px] text-red-600 font-bold uppercase tracking-[0.2em]">{error}</p>}
          </div>

          {/* 4. Condensed Yield Ledger - Synthesized */}
          <div className="space-y-2.5">
             <div className="bg-gray-50/30 rounded-[20px] p-4 space-y-2 border border-gray-100/50">
                <div className="flex justify-between text-[10px] font-bold">
                   <span className="text-gray-400 uppercase tracking-tighter">Gross Clearance</span>
                   <span className="text-black">₹{parseFloat(amount || "0").toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold">
                   <span className="text-gray-400 uppercase tracking-tighter">Fee (10%)</span>
                   <span className="text-red-500">- ₹{platformFee.toLocaleString()}</span>
                </div>
                <div className="h-[1px] bg-gray-200/30" />
                <div className="flex justify-between items-center">
                   <span className="text-[9px] font-black uppercase tracking-widest text-black">Net Payable</span>
                   <span className="text-xl font-season font-bold text-black tracking-tight">₹{netPayout.toLocaleString()}</span>
                </div>
             </div>
          </div>
        </div>

        {/* Action Clearance - Shortened */}
        <div className="px-6 pb-6 pt-0 flex flex-col gap-3">
          <div className="flex items-start gap-2 p-3 bg-gray-50 border border-gray-100 rounded-[16px]">
            <Clock size={12} className="text-gray-400 mt-0.5" />
            <p className="text-[9px] font-bold text-gray-500 leading-tight italic">
              Verification Engine operational. Window: 3-5 Working Days.
            </p>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !!error || !amount}
            className="w-full py-4 bg-black text-white rounded-full font-black text-[10px] tracking-[0.3em] uppercase hover:bg-black/90 transition-all active:scale-[0.98] disabled:opacity-20 flex items-center justify-center gap-2 shadow-lg"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Commit Payout</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
