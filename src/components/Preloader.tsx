"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Royale Blue Background Glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3] 
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Logo Section */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-8"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/logo.png"
            alt="Ahmed El Arjoun Logo"
            width={320}
            height={320}
            priority
            draggable={false}
            className="select-none drop-shadow-[0_0_20px_rgba(37,99,235,0.2)]"
          />
        </motion.div>
      </motion.div>

      {/* Welcome Text Section */}
      <motion.div 
        className="relative z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h2 className="text-white font-black text-xl md:text-2xl uppercase tracking-[0.3em]">
          Ahmed El Arjoun
        </h2>
        
        <div className="flex items-center gap-4 w-full">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <p className="text-blue-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] whitespace-nowrap">
            Welcome to my portfolio
          </p>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        </div>

        {/* Minimalist Blue Loader Line */}
        <div className="mt-8 h-[1px] w-48 overflow-hidden bg-white/5 relative">
          <motion.div
            className="absolute inset-0 bg-blue-500"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}