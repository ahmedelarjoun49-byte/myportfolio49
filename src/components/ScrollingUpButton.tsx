"use client";
import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

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
    setShowScrollDown(false); // Hide Scroll Down button permanently
  };

  return (
    <>
      {/* --- SCROLL UP BUTTON (ROYALE BLUE) --- */}
      <div
        className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ${
          showScrollUp
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        onClick={scrollToTop}
      >
        <div className="relative group cursor-pointer">
          {/* Outer Glow Effect */}
          <div className="absolute -inset-1 bg-blue-600 rounded-full blur opacity-20 group-hover:opacity-60 transition duration-300" />
          
          {/* Main Button Body */}
          <div className="relative bg-blue-600 w-14 h-14 rounded-full flex justify-center items-center shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all duration-300 hover:bg-blue-500 transform hover:scale-110 border border-blue-400/20">
            <ChevronUp className="text-white w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" />
          </div>
        </div>
      </div>

      {/* --- SCROLL DOWN BUTTON (THEMED BLUE) --- */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          showScrollDown
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        onClick={scrollToSection}
      >
        <div className="flex flex-col items-center cursor-pointer group">
          {/* Animated Scroll Container */}
          <div className="w-10 h-14 rounded-full border-2 border-blue-600/30 flex justify-center items-start p-2 relative overflow-hidden bg-black/40 backdrop-blur-md shadow-lg group-hover:border-blue-500/60 transition-all duration-300 group-hover:scale-105">
            {/* The Mouse Scroller Dot */}
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
          </div>
          
          {/* Scroll Text */}
          <p className="text-blue-500/80 mt-3 text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-blue-400 transition-colors duration-200 drop-shadow-sm">
            Scroll down
          </p>
        </div>
      </div>
    </>
  );
};

export default ScrollButtons;