"use client";

import React from "react";
import { motion, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { Code2, Cpu, Globe, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  // Mouse Glow Logic
  const mouseX = useSpring(useMotionValue(0), { stiffness: 500, damping: 50 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 500, damping: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div 
      className="relative min-h-screen bg-black text-white selection:bg-blue-500/30 overflow-hidden font-sans"
      onMouseMove={handleMouseMove}
    >
      {/* 1. MOUSE GLOW BACKGROUND */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-10 opacity-40"
        style={{
          background: useMotionTemplate`
            radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(37,99,235,0.15), transparent 80%)
          `,
        }}
      />

      {/* 2. BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0 opacity-30">
        <video
          className="h-full w-full object-cover"
          src="/stars.mp4"
          autoPlay 
          muted 
          loop 
          playsInline
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* 3. MAIN CONTENT (CLEAN SUMMARY ONLY) */}
      <main className="relative z-20 max-w-4xl mx-auto px-6 pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          
          {/* Headline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 leading-[1.1]">
              MY <span className="text-blue-500">SUMMARY.</span>
            </h1>
            <div className="h-1.5 w-24 bg-blue-600 rounded-full" />
          </motion.div>

          {/* Professional Summary Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6 text-lg md:text-xl text-white/70 leading-relaxed"
          >
            <p>
              I am <span className="text-white font-semibold underline underline-offset-4 decoration-blue-500">Ahmed El Arjoun</span>, 
              a Full-Stack Junior Developer and IoT Student based in Rabat, Morocco. I specialize in building 
              highly interactive web applications and exploring the intersection of software and hardware.
            </p>
            <p>
              My approach focuses on clean code, performance, and user-centric design. Whether it is creating 
              responsive interfaces with <span className="text-white">Next.js</span> or integrating smart systems 
              in the <span className="text-white">IoT</span> space, I strive to deliver impactful digital experiences.
            </p>
          </motion.div>

          {/* Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md group hover:border-blue-500/50 transition-colors"
            >
              <Code2 className="text-blue-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-xl font-bold mb-2 text-white">Full-Stack Development</h3>
              <p className="text-sm text-white/50 leading-relaxed text-left">
                Expertise in React, TypeScript, and modern styling frameworks to create scalable, professional web platforms.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md group hover:border-blue-500/50 transition-colors"
            >
              <Cpu className="text-blue-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-xl font-bold mb-2 text-white">IoT Engineering</h3>
              <p className="text-sm text-white/50 leading-relaxed text-left">
                Applying engineering principles to the Internet of Things, connecting the physical world to digital ecosystems.
              </p>
            </motion.div>
          </div>

          {/* Minimal Footer Info */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-2">
                <Globe size={18} className="text-blue-400" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-60 text-left">Rabat, Morocco</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-blue-400" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-60 text-left">Ready for Work</span>
              </div>
            </div>

            <Link 
              href="/" 
              className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors"
            >
              Back Home <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </main>

      {/* IMPORTANT: 
        The "Experience" and "Stages" components are GONE.
        Nothing else is rendered below this main tag. 
      */}
    </div>
  );
}