"use client";

export default function LearningQuest() {
  return (
    <div 
      className="w-full"
      style={{ 
        height: '366px',
        backgroundImage: 'url("/images/image%2017.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '20px',
        fontFamily: 'var(--font-dm-sans)',
        borderRadius: '16px'
      }}
    >
      {/* Title Row */}
      <div className="flex items-center gap-2.5">
        {/* Question Mark Icon */}
        <div className="w-[22px] h-[22px] bg-white rounded-full flex items-center justify-center shrink-0">
          <span className="text-[#1A1A1A] text-[13px] font-extrabold leading-none pt-[1px]">
            ?
          </span>
        </div>
        
        {/* Heading */}
        <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: '20px', color: '#ffffff', letterSpacing: '0.02em' }}>
          Learning Quest
        </h2>
      </div>

      {/* Description */}
      <p style={{ fontFamily: 'DM Sans', fontWeight: 400, fontSize: '12px', color: '#CED8E7', lineHeight: '1.4', maxWidth: '300px', marginTop: '10px' }}>
        Based on yesterday&apos;s class, solve this to unlock today&apos;s key.
      </p>

      {/* Topic Tags */}
      <div className="flex items-center gap-2 mt-3" style={{ width: '149px', height: '19px' }}>
        {/* Subject Tag */}
        <span style={{ width: '94px', height: '19px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', backgroundColor: 'rgba(193, 222, 199, 0.7)', color: '#342D30', fontSize: '11px', fontWeight: 400, fontFamily: 'DM Sans' }}>
          Laws of motion
        </span>
        
        {/* Level Tag */}
        <span style={{ width: '49px', height: '19px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', backgroundColor: 'rgba(240, 210, 216, 0.7)', color: '#342D30', fontSize: '11px', fontWeight: 400, fontFamily: 'DM Sans' }}>
          Level 1
        </span>
      </div>

      {/* Active Question Box */}
      <div className="flex gap-3.5 rounded-[14px] p-4 shadow-sm mt-4" style={{ width: '100%', minHeight: '85px', background: 'linear-gradient(to top right, rgba(39, 25, 71, 0.5), rgba(9, 41, 49, 0.5))' }}>
        {/* Question Number */}
        <span className="text-white/90 shrink-0" style={{ fontFamily: 'DM Sans', fontSize: '11px', fontWeight: 400 }}>
          Q.1
        </span>
        
        {/* Question Text */}
        <p className="text-white/90" style={{ fontFamily: 'DM Sans', fontSize: '11px', fontWeight: 400, lineHeight: '1.6', margin: 0 }}>
          According to Newton&apos;s First Law, a body will continue to remain at rest or in uniform motion unless acted upon by:
        </p>
      </div>

      {/* Second Question Box with Lock Overlay */}
      <div style={{ position: 'relative', marginTop: '12px' }}>
        <div className="flex gap-3.5 rounded-[14px] p-4 shadow-sm" style={{ width: '100%', minHeight: '65px', background: 'linear-gradient(to top right, rgba(39, 25, 71, 0.5), rgba(9, 41, 49, 0.5))', filter: 'blur(1px)', opacity: 0.5 }}>
          <span className="text-white/90 shrink-0" style={{ fontFamily: 'DM Sans', fontSize: '11px', fontWeight: 400 }}>
            Q.2
          </span>
          <p className="text-white/90" style={{ fontFamily: 'DM Sans', fontSize: '11px', fontWeight: 400, lineHeight: '1.6', margin: 0 }}>
            What is the SI unit of force?
          </p>
        </div>
        
        {/* Lock Icon */}
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '86px', height: '55px', backgroundColor: '#2b2d31', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
          🔑
        </div>
      </div>

      {/* Gradient Overlay */}
      <div style={{ width: '100%', height: '70px', background: 'linear-gradient(to bottom, transparent 0%, rgba(156, 190, 224, 0.4) 60%, rgba(156, 190, 224, 0.9) 100%)', marginTop: '-25px' }}></div>

      {/* Take the Challenge Button */}
      <div className="flex justify-center" style={{ marginTop: '-45px', position: 'relative', zIndex: 10 }}>
        <button 
          className="rounded-full hover:opacity-90 transition-opacity" 
          style={{ 
            width: '241px', 
            height: '41px', 
            backgroundColor: '#FFFFFF', 
            color: '#000000', 
            fontFamily: 'DM Sans', 
            fontSize: '15px', 
            fontWeight: 500,
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Take the Challenge
        </button>
      </div>
    </div>
  );
}
