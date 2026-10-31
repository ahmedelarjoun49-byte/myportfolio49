"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617] overflow-hidden"
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(30,58,138,0.25)_0%,rgba(15,23,42,0)_70%)] blur-[90px]" />
          </div>

          <div className="relative flex flex-col items-center justify-center z-10 space-y-10 px-4">
            {/* Classic Old-Town Serif Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-white text-center tracking-[0.18em] uppercase select-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
              style={{
                fontFamily: "Georgia, 'Times New Roman', Garamond, 'Cinzel', serif",
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                fontWeight: "400",
                letterSpacing: "0.15em",
              }}
            >
              Ahmed El Arjoun
            </motion.h1>

            {/* Cool Blue Gradient Animated Loading Bar */}
            <div className="w-48 sm:w-64 md:w-80 h-[3px] bg-slate-900/80 relative overflow-hidden rounded-full border border-blue-900/30 shadow-inner">
              {/* Background Glow Pulse */}
              <motion.div 
                className="absolute inset-0 bg-blue-600/20 blur-sm"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Animated Progress Line */}
              <motion.div 
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-blue-900 via-blue-500 to-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.9)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ 
                  duration: 2.6, 
                  ease: [0.65, 0, 0.35, 1] 
                }}
              />

              {/* Shimmer / Light Beam Effect */}
              <motion.div
                className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                initial={{ left: "-20%" }}
                animate={{ left: "120%" }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 0.2
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}