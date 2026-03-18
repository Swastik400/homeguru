"use client";
import { useState, memo } from "react";
import Image from "next/image";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const slides = [
  {
    image: "/images/6.1.png",
    title: "Class starts in 15 minutes",
    description: "Your students for Advanced React are waiting in the lobby. Join now to set up your environment.",
    buttonText: "Join Classroom",
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
    title: "Review 12 pending submissions",
    description: "Weekly assignments for UI/UX Design require your expert feedback and grading.",
    buttonText: "Open Gradebook",
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
    title: "New Booking Request",
    description: "Varun Sharma requested a trial class for System Design on 14 March at 2:00 PM.",
    buttonText: "Manage Bookings",
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

export default memo(function TeacherBanner() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = slides.length;

  const handlePrevious = () => {
    setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full rounded-2xl p-4 md:p-6 flex items-center justify-between relative overflow-hidden" style={{ minHeight: '212px', border: '1px solid #DED3C9' }}>
      <Image 
        src={slides[activeSlide].image}
        alt="Background" 
        fill
        className="object-cover absolute inset-0 z-0"
        priority
        quality={90}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />
      <div className="z-10 max-w-[90%] md:max-w-[60%]">
        <h2 className="font-season mb-2 text-[18px] md:text-[24px]" style={{ color: slides[activeSlide].titleColor }}>
          {slides[activeSlide].title}
        </h2>
        <p className="mb-4 text-[12px] md:text-[13px] font-matter" style={{ color: slides[activeSlide].descriptionColor }}>
          {slides[activeSlide].description}
        </p>
        <button className="rounded-full hover:opacity-90 text-[14px] md:text-[14px] px-4 md:px-6 py-2 font-matter" style={{ height: '37px', backgroundColor: slides[activeSlide].buttonBgColor, color: slides[activeSlide].buttonTextColor }}>
          {slides[activeSlide].buttonText}
        </button>
      </div>
      
      <div className="absolute top-4 md:top-6 right-4 md:right-6 flex items-center gap-2 md:gap-3">
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
          <CaretLeft size={12} weight="bold" color={slides[activeSlide].navButtonIcon} />
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
          <CaretRight size={12} weight="bold" color={slides[activeSlide].navButtonIcon} />
        </button>
      </div>
    </div>
  );
});
