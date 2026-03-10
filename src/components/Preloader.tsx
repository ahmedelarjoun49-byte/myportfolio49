"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 3-second timer for a snappier experience
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030303]"
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Royal Blue Gradient Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e3a8a30_0%,#030303_70%)]" />

          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={180}
              height={180}
              priority
              className="drop-shadow-[0_0_25px_rgba(30,58,138,0.6)]"
            />
          </motion.div>

          {/* Text & Royal Loading Bar */}
          <div className="mt-10 flex flex-col items-center">
            <h1 className="text-white text-lg font-light tracking-[0.3em] uppercase">
              Ahmed <span className="font-black text-blue-600">El Arjoun</span>
            </h1>

            <div className="mt-6 h-[1.5px] w-32 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.9)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}