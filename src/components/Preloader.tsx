"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { useState, useEffect } from "react";

// ─── Animated Counter Hook ────────────────────────────────────────────────────
function useCounter(from: number, to: number, duration: number) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (v) => Math.round(v));
  
  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [count, to, duration]);
  
  return rounded;
}

export default function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const count = useCounter(0, 100, 3.5);

  useEffect(() => {
    setMounted(true);
    // Total duration: 4 seconds
    const timer = setTimeout(() => setIsVisible(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const firstName = "AHMED".split("");
  const lastName = "EL ARJOUN".split("");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#02040a] overflow-hidden px-6"
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Subtle Cyber Ambient Glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
          </div>

          <div className="relative w-full max-w-5xl flex flex-col justify-center h-full">
            
            {/* Typography Section */}
            <div className="flex flex-col select-none">
              {/* Row 1: AHMED */}
              <div className="flex flex-wrap overflow-hidden">
                {firstName.map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                      duration: 0.8, 
                      ease: [0.16, 1, 0.3, 1], 
                      delay: 0.2 + (i * 0.05) 
                    }}
                    className="text-white font-black leading-[0.85] tracking-tighter"
                    style={{ 
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "clamp(3rem, 10vw, 8rem)" 
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Row 2: EL ARJOUN */}
              <div className="flex flex-wrap overflow-hidden mt-2">
                {lastName.map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                      duration: 0.8, 
                      ease: [0.16, 1, 0.3, 1], 
                      delay: 0.5 + (i * 0.05) 
                    }}
                    className="text-transparent font-black leading-[0.85] tracking-tighter"
                    style={{ 
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "clamp(3rem, 10vw, 8rem)", 
                      WebkitTextStroke: "1px rgba(59, 130, 246, 0.5)" 
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Counter Section */}
            <div className="mt-12 flex items-end justify-start border-b border-white/5 pb-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-baseline text-white font-mono"
              >
                <motion.span className="text-4xl md:text-6xl font-bold tabular-nums tracking-tighter">
                  {count}
                </motion.span>
                <span className="text-blue-500 text-lg ml-2 font-bold opacity-80">%</span>
              </motion.div>
            </div>

            {/* Bottom Progress Bar */}
            <div className="mt-4 h-[2px] w-full bg-white/5 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-indigo-400 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* Clean Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] z-10 bg-[length:100%_4px]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}