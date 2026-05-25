"use client";
import React, { useEffect, useState } from "react";
import { ChevronUp, ArrowDown } from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

const ScrollButtons = () => {
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Show Scroll Up button after scrolling past 100vh
      setShowScrollUp(scrollY > windowHeight);

      // Hide Scroll Down button permanently after scrolling past 10vh
      if (scrollY > windowHeight * 0.1) {
        setShowScrollDown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = () => {
    window.scrollTo({ top: window.innerHeight * 0.9, behavior: "smooth" });
    setShowScrollDown(false);
  };

  return (
    <div className={plusJakarta.className}>
      {/* --- SCROLL UP BUTTON --- */}
      <div
        className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ${
          showScrollUp
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        onClick={scrollToTop}
      >
        <div className="relative group cursor-pointer">
          {/* Subtle Outer Blend (No aggressive artificial glow) */}
          <div className="absolute -inset-px bg-blue-500 rounded-full opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300" />
          
          {/* Main Button Body */}
          <div className="relative bg-[#0a0d14]/80 backdrop-blur-md w-12 h-12 rounded-full flex justify-center items-center border border-white/[0.06] hover:border-blue-500/40 transition-all duration-300 group-hover:scale-105">
            <ChevronUp className="text-slate-400 w-5 h-5 group-hover:text-blue-400 group-hover:-translate-y-0.5 transition-all duration-300" />
          </div>
        </div>
      </div>

      {/* --- SCROLL DOWN BUTTON --- */}
      <div
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          showScrollDown
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        onClick={scrollToSection}
      >
        <div className="flex flex-col items-center cursor-pointer group relative h-10 overflow-hidden px-4">
          {/* Sliding Text Element */}
          <div className="flex flex-col items-center transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:-translate-y-7">
            
            {/* State 1: Passive view */}
            <div className="flex items-center gap-1.5 h-7">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Défiler
              </span>
              <ArrowDown size={11} className="text-slate-500 animate-bounce" />
            </div>

            {/* State 2: Hover view */}
            <div className="flex items-center gap-1.5 h-7">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-400">
                Explorer
              </span>
              <ArrowDown size={11} className="text-blue-400" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollButtons;