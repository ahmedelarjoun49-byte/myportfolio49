"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Beautifully hands off the screen to your portfolio after 3.8s
    const timer = setTimeout(() => setIsVisible(false), 3800);
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
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#010309] overflow-hidden"
          // Luxury camera iris expand and blur reveal on exit
          exit={{ 
            scale: 1.06,
            opacity: 0,
            filter: "blur(16px)",
            transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* ─── Layered Royal Blue Ambient Nuance System ─── */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            
            {/* Ambient Layer 1: Deep Royal Under-glow Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,54,179,0.12)_0%,transparent_70%)]" />

            {/* Ambient Layer 2: Core Dynamic Royal Blue Aura */}
            <motion.div 
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ 
                scale: [0.7, 1.05, 1], 
                opacity: [0, 0.9, 0.75] 
              }}
              transition={{ duration: 3.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[850px] max-h-[850px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.15)_0%,rgba(29,78,216,0.04)_50%,transparent_100%)] blur-[100px]" 
            />

            {/* Ambient Layer 3: High-End Neon Concentrated Flare Focus */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.4, 0.35] }}
              transition={{ duration: 2, delay: 0.4 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[25vw] rounded-full bg-blue-600/20 blur-[70px] mix-blend-screen"
            />
            
          </div>

          {/* Typography Canvas */}
          <div className="relative flex flex-col items-center justify-center w-full max-w-7xl px-6 select-none z-10">
            
            <h1 className="flex flex-col items-center justify-center uppercase m-0 p-0 tracking-tighter">
              
              {/* 1ST IMPACT: AHMED (Massive, Aggressive Geometric Scale-In) */}
              <motion.span 
                initial={{ letterSpacing: "0.05em" }}
                animate={{ letterSpacing: "-0.03em" }}
                transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex overflow-hidden py-3 h-auto items-center justify-center"
              >
                {firstName.map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "120%", opacity: 0, scale: 1.4, rotate: i % 2 === 0 ? 3 : -3 }}
                    animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.85, 
                      ease: [0.34, 1.56, 0.64, 1], // Custom elastic overshoot for high impact
                      delay: 0.1 + (i * 0.05) 
                    }}
                    className="inline-block font-black text-white origin-center"
                    style={{ 
                      fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                      fontSize: "clamp(4rem, 15vw, 11rem)", // Drastically increased sizing
                      textShadow: "0 0 50px rgba(37, 99, 235, 0.15)"
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.span>

              {/* 2ND IMPACT: EL ARJOUN (Sleek, Delayed Technical Expansion Underneath) */}
              <motion.span 
                initial={{ letterSpacing: "-0.1em", opacity: 0 }}
                animate={{ letterSpacing: "0.15em", opacity: 1 }}
                transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                className="flex overflow-hidden py-2 mt-2"
              >
                {lastName.map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "-100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                      duration: 0.8, 
                      ease: [0.16, 1, 0.3, 1], 
                      delay: 0.75 + (i * 0.03) // Triggers gracefully right after AHMED lands
                    }}
                    className="inline-block font-extralight text-transparent bg-clip-text bg-gradient-to-r from-white/90 via-slate-200 to-white/40"
                    style={{ 
                      fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                      fontSize: "clamp(1.5rem, 5.5vw, 3.5rem)" // Kept smaller to maximize contrast
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </motion.span>
            </h1>

            {/* Premium Royal Blue Micro-Loader Axis */}
            <div className="absolute bottom-[-100px] md:bottom-[-150px] flex justify-center items-center">
              <div className="w-20 h-[2px] bg-white/[0.03] relative overflow-hidden rounded-full">
                <motion.div 
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-400 shadow-[0_0_15px_rgba(37,99,235,0.9)]"
                  initial={{ width: "0%", left: "-100%" }}
                  animate={{ 
                    width: ["0%", "100%", "0%"], 
                    left: ["-100%", "0%", "100%"] 
                  }}
                  transition={{ 
                    duration: 2.2, 
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0.1
                  }}
                />
              </div>
            </div>

          </div>

          {/* Deep Cinematic Shadow Frame */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_140px_rgba(0,0,0,0.95)] z-40" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}