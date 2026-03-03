"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useMotionTemplate, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const SOCIAL_LINKS = [
  { id: 'youtube', name: 'YouTube', imgSrc: '/logos/YOUTUBE.png', url: 'https://www.youtube.com/@el4rjoun' },
  { id: 'instagram', name: 'Instagram', imgSrc: '/logos/instagram.png', url: 'https://www.instagram.com/el4rjoun/' },
  { id: 'kick', name: 'Kick', imgSrc: '/logos/kick.jpeg', url: 'https://kick.com/el4rjounx' },
];

export default function AboutPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isFlashActive, setIsFlashActive] = useState(false);
  
  const mouseX = useSpring(useMotionValue(0), { stiffness: 500, damping: 50 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 500, damping: 50 });

  const mainRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: mainRef, offset: ["start start", "end end"] });

  const smoothY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "15%"]), { stiffness: 100, damping: 30 });
  const rotateX = useTransform(mouseY, [0, 1000], [2, -2]);
  const rotateY = useTransform(mouseX, [0, 1000], [-2, 2]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const toggleTheme = () => {
    setIsFlashActive(true);
    setTimeout(() => setIsDarkMode(!isDarkMode), 150); 
    setTimeout(() => setIsFlashActive(false), 800);
  };

  return (
    <div 
      ref={mainRef}
      className={`relative min-h-screen transition-colors duration-700 selection:bg-blue-500/30 overflow-hidden font-sans ${isDarkMode ? 'bg-black text-white' : 'bg-white text-slate-900'}`}
      onMouseMove={handleMouseMove}
    >
      {/* 1. FLASHBANG OVERLAY */}
      <AnimatePresence>
        {isFlashActive && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="fixed inset-0 z-[100] bg-white pointer-events-none" />
        )}
      </AnimatePresence>

      {/* 2. FC 26 LOGO - APPEARS FIRST (THE FOUNDATION) */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none select-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, filter: "blur(15px)" }}
          animate={{ opacity: isDarkMode ? 0.2 : 0.12, scale: 1, filter: "blur(0px)" }}
          transition={{ 
            duration: 1.5, 
            ease: "easeOut",
            delay: 0.1 
          }}
          className="relative w-[80vw] h-[80vh] ml-[5%]"
        >
          <Image 
            src="/photos11/fc26.png" 
            alt="FC26" 
            fill 
            className="object-contain grayscale contrast-125" 
            priority 
          />
        </motion.div>
      </div>

      {/* 3. CS2 CHARACTER - APPEARS SECOND (THE TACTICAL ENTRANCE) */}
      <div className="fixed inset-0 z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: 800 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 45, 
            damping: 14, 
            delay: 1.0 // Triggered after the FC26 logo is established
          }}
          className="absolute right-[-2%] bottom-[-5%] w-[48vw] h-[85vh] flex items-end justify-end"
          style={{ y: smoothY, rotateX, rotateY, perspective: 1200 }}
        >
          <Image 
            src="/photos11/csgo2.png" 
            alt="CS2 Character" 
            fill 
            className="object-contain drop-shadow-[0_0_80px_rgba(37,99,235,0.4)] scale-x-[-1]" 
            priority 
          />
        </motion.div>
      </div>

      {/* 4. GRENADE SWITCH */}
      <div className="fixed top-12 right-12 z-[60] flex flex-col items-center gap-4">
        <motion.button 
          onClick={toggleTheme}
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1.8 }}
          whileHover={{ scale: 1.1, rotate: 15 }}
          className="relative w-28 h-28 group cursor-pointer"
        >
          <div className="absolute inset-0 bg-blue-600/20 blur-[40px] rounded-full group-hover:bg-blue-600/50 transition-all" />
          <Image src="/photos11/flashlight.png" alt="Flash" fill className="object-contain drop-shadow-2xl" />
        </motion.button>
      </div>

      {/* 5. MAIN CONTENT */}
      <main className="relative z-30 max-w-7xl mx-auto px-10 pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="w-full lg:w-[58%] flex flex-col gap-12"
        >
          <div>
            <h3 className="text-xl font-black text-blue-600 uppercase italic mb-4 tracking-tighter">@EL4RJOUN</h3>
            <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.75] mb-6">
              ABOUT <br/><span className="text-blue-600 italic font-black">ME.</span>
            </h1>
          </div>

          <div className={`p-10 rounded-[2.5rem] border transition-all duration-700 ${isDarkMode ? 'bg-zinc-900/60 border-white/5 backdrop-blur-xl shadow-2xl shadow-blue-900/10' : 'bg-white border-slate-200 shadow-2xl'}`}>
            <p className="text-4xl font-light mb-6 leading-tight">
              I love <span className="text-blue-600 font-extrabold italic">Coding</span> and I am a <span className="text-blue-600 font-extrabold italic">Passionate Learner</span>.
            </p>
            <p className="text-xl opacity-60 leading-relaxed">
              Beyond the code, gaming is my ultimate hobby. I thrive on tactical precision, strategy, and clean execution in everything I build.
            </p>
          </div>

          {/* SOCIALS */}
          <div className="grid grid-cols-3 gap-6">
            {SOCIAL_LINKS.map((link) => (
              <a key={link.id} href={link.url} target="_blank" className={`group flex flex-col items-center justify-center p-8 rounded-[2rem] border transition-all h-44 ${isDarkMode ? 'bg-zinc-900/30 border-white/5 hover:border-blue-500/50' : 'bg-white border-slate-200 hover:shadow-xl'}`}>
                <div className="relative w-16 h-16 mb-4 transform group-hover:scale-125 group-hover:-translate-y-2 transition-all duration-500">
                  <Image src={link.imgSrc} alt={link.name} fill className="object-contain" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">{link.name}</span>
              </a>
            ))}
          </div>

          <Link href="/" className="group flex items-center gap-4 text-xs font-black uppercase tracking-[0.5em] text-blue-600 hover:text-blue-400 transition-all pt-10">
            <ArrowRight size={24} className="rotate-180 group-hover:-translate-x-4 transition-transform" /> 
            Back to Dashboard
          </Link>
        </motion.div>
      </main>

      {/* INTERACTIVE GLOW */}
      <motion.div 
        className="pointer-events-none fixed inset-0 z-50 opacity-25" 
        style={{ background: useMotionTemplate`radial-gradient(1000px circle at ${mouseX}px ${mouseY}px, rgba(37,99,235,0.25), transparent 80%)` }} 
      />
    </div>
  );
}