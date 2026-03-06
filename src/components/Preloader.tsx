"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Standard 5-second timer before hiding the preloader
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Glitch effect logic
  const glitchVariants = {
    animate: {
      x: [0, -2, 3, -1, 0],
      opacity: [1, 0.7, 1, 0.8, 1],
      transition: {
        duration: 0.3,
        repeat: Infinity,
        repeatDelay: 1.5,
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030303]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
          transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Subtle Ambient Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e3a8a10_0%,transparent_70%)]" />

          {/* Logo Section */}
          <div className="relative mb-12">
            {/* RGB Glitch Layer */}
            <motion.div
              className="absolute inset-0 mix-blend-screen opacity-60"
              variants={glitchVariants}
              animate="animate"
              style={{ filter: "drop-shadow(3px 0px 0px #2563eb)" }}
            >
              <Image src="/logo.png" alt="" width={260} height={260} className="invisible" />
            </motion.div>

            {/* Main Logo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative z-10"
            >
              <Image
                src="/logo.png"
                alt="Ahmed El Arjoun Logo"
                width={260}
                height={260}
                priority
                className="select-none drop-shadow-[0_0_30px_rgba(37,99,235,0.15)]"
              />
            </motion.div>
          </div>

          {/* Text Content */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-white font-light text-2xl uppercase tracking-[0.5em] mb-4">
              Ahmed <span className="font-black text-blue-500">El Arjoun</span>
            </h2>

            {/* Progress Bar (Matches the 5s duration) */}
            <div className="h-[1px] w-48 bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-blue-500"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{
                  duration: 5, // Matches the 5 second visibility
                  ease: "linear",
                }}
              />
            </div>
            
            <p className="mt-4 text-[10px] text-blue-500/50 uppercase tracking-[0.4em] font-medium">
              Initializing Experience
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}