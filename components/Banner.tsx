"use client";
import { useState } from "react";
import Image from "next/image";

export default function Banner() {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const slides = [
    {
      image: "/images/6.1.png",
      title: "Your Perfect Tutor, Matched by AI",
      description: "No more guessing. Meet tutors aligned with your learning goals and career path.",
      buttonText: "Find my match",
      titleColor: "#000000",
      descriptionColor: "#4B5563",
      buttonBgColor: "#F9A765",
      buttonTextColor: "#000000",
      navButtonBg: "#FAE8D0",
      navButtonHover: "#f1d7b6",
      navButtonIcon: "#333333",
      dotActive: "#9D7B43",
      dotInactive: "#FAE8D0"
    },
    {
      image: "/images/Frame 36 (1).png",
      title: "Your Perfect Tutor, Matched by AI",
      description: "No more guessing. Meet tutors aligned with your learning goals and career path.",
      buttonText: "Find my match",
      titleColor: "#FFFFFF",
      descriptionColor: "#FFFFFF",
      buttonBgColor: "#FFFFFF",
      buttonTextColor: "#000000",
      navButtonBg: "#FFFFFF",
      navButtonHover: "#F3F4F6",
      navButtonIcon: "#000000",
      dotActive: "#FFFFFF",
      dotInactive: "rgba(255, 255, 255, 0.5)"
    },
    {
      image: "/images/Frame 36.png",
      title: "Your Perfect Tutor, Matched by AI",
      description: "No more guessing. Meet tutors aligned with your learning goals and career path.",
      buttonText: "Find my match",
      titleColor: "#FFFFFF",
      descriptionColor: "#FFFFFF",
      buttonBgColor: "#F1C6B7",
      buttonTextColor: "#000000",
      navButtonBg: "#F1C6B7",
      navButtonHover: "#E5B5A5",
      navButtonIcon: "#000000",
      dotActive: "#F1C6B7",
      dotInactive: "rgba(241, 198, 183, 0.5)"
    }
  ];

  const totalSlides = slides.length;

  const handlePrevious = () => {
    setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full rounded-2xl p-6 flex items-center justify-between relative overflow-hidden" style={{ height: '212px', border: '1px solid #DED3C9' }}>
      <Image 
        src={slides[activeSlide].image}
        alt="Background" 
        fill
        className="object-cover absolute inset-0 z-0"
        priority
      />
      <div className="z-10">
        <h2 className="font-bold mb-2" style={{ fontFamily: 'var(--font-plus-jakarta-sans)', fontSize: '24px', color: slides[activeSlide].titleColor }}>
          {slides[activeSlide].title}
        </h2>
        <p className="mb-4" style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '14px', fontWeight: '400', color: slides[activeSlide].descriptionColor }}>
          {slides[activeSlide].description.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < slides[activeSlide].description.split('\n').length - 1 && <br />}
            </span>
          ))}
        </p>
        <button className="rounded-full font-medium hover:opacity-90" style={{ width: '153px', height: '37px', backgroundColor: slides[activeSlide].buttonBgColor, fontFamily: 'var(--font-dm-sans)', fontSize: '16px', fontWeight: '500', color: slides[activeSlide].buttonTextColor }}>
          {slides[activeSlide].buttonText}
        </button>
      </div>
      
      <div className="absolute top-6 right-6 flex items-center gap-3">
        {/* Indicator Dots */}
        <div className="flex items-center gap-1.5">
          {[...Array(totalSlides)].map((_, index) => (
            <div
              key={index}
              className="rounded-full transition-all duration-300"
              style={{
                width: index === activeSlide ? '20px' : '6px',
                height: '6px',
                backgroundColor: index === activeSlide ? slides[activeSlide].dotActive : slides[activeSlide].dotInactive
              }}
            />
          ))}
        </div>
        
        {/* Previous Button */}
        <button 
          onClick={handlePrevious}
          aria-label="Previous slide"
          className="w-6 h-6 flex items-center justify-center rounded-full transition-colors focus:outline-none"
          style={{
            backgroundColor: slides[activeSlide].navButtonBg
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = slides[activeSlide].navButtonHover}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = slides[activeSlide].navButtonBg}
        >
          <svg 
            width="12" 
            height="12" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke={slides[activeSlide].navButtonIcon}
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Next Button */}
        <button 
          onClick={handleNext}
          aria-label="Next slide"
          className="w-6 h-6 flex items-center justify-center rounded-full transition-colors focus:outline-none"
          style={{
            backgroundColor: slides[activeSlide].navButtonBg
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = slides[activeSlide].navButtonHover}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = slides[activeSlide].navButtonBg}
        >
          <svg 
            width="12" 
            height="12" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke={slides[activeSlide].navButtonIcon}
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}
