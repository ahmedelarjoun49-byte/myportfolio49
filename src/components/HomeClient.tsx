"use client";

import { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { Download, Code2, Cpu, Palette, Box, ArrowUpRight } from "lucide-react"; 
import { Typewriter } from "react-simple-typewriter";
import gsap from "gsap";

import Experience from "@/components/Experience";
import ProjectBanner from "@/components/ProjectBanner";
import Skils from "@/components/Skils"; 
import MyStory from "@/components/MyStory_temp";
import GraduationScrollVideo from "@/components/GraduationScrollVideo";

const PROFILE_SRC = "/mypicture.png";
const HERO_BG_VIDEO_SRC = "/stars.mp4";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorRef.current || !followerRef.current) return;

    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.2, ease: "power3" });
    
    const xFollowerTo = gsap.quickTo(followerRef.current, "x", { duration: 0.6, ease: "power3" });
    const yFollowerTo = gsap.quickTo(followerRef.current, "y", { duration: 0.6, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xFollowerTo(e.clientX);
      yFollowerTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference" style={{ transform: "translate(-50%, -50%)" }} />
      <div ref={followerRef} className="fixed top-0 left-0 w-12 h-12 bg-blue-600/60 rounded-full pointer-events-none z-[99] blur-[2px] shadow-[0_0_20px_rgba(37,99,235,0.4)]" style={{ transform: "translate(-50%, -50%)" }} />
    </>
  );
};

// --- ENHANCED ENTRANCE ANIMATIONS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.25, 1, 0.5, 1] } 
  },
};

const photoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, x: 50, filter: "blur(20px)" },
  show: { 
    opacity: 1, 
    scale: 1, 
    x: 0, 
    filter: "blur(0px)",
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.8 } 
  },
};

export default function HomeClient() {
  const stackIcons = [
    { icon: <Code2 size={22} />, label: "React" },
    { icon: <Cpu size={22} />, label: "TypeScript" },
    { icon: <Palette size={22} />, label: "Tailwind" },
    { icon: <Box size={22} />, label: "3D" },
  ];

  return (
    <div className="transition-colors duration-300 selection:bg-blue-500/30 lg:cursor-none bg-black min-h-screen">
      
      <div className="hidden lg:block">
        <CustomCursor />
      </div>

      <div className="dark text-white">
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          
          {/* ATMOSPHERIC BACKGROUND */}
          <div className="absolute inset-0 z-0">
            <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-30" src={HERO_BG_VIDEO_SRC} />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-900/20 blur-[150px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 blur-[130px] rounded-full" />
          </div>

          <main className="relative z-20 container mx-auto px-6 md:px-12 max-w-7xl">
            <motion.div
              initial="hidden"
              animate="show"
              variants={containerVariants}
              className="flex flex-col lg:flex-row items-center justify-between gap-12"
            >
              <div className="w-full lg:w-[60%] space-y-8 text-center lg:text-left">
                
                {/* INTRO TEXT */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <h2 className="text-lg md:text-xl text-white/60 font-light tracking-wide">
                    Hey, I&apos;m <span className="text-white font-medium">Ahmed El Arjoun</span>
                  </h2>

                  <div className="relative overflow-visible px-2">
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tighter text-white overflow-visible">
                      <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600 drop-shadow-[0_0_35px_rgba(37,99,235,0.4)] pr-2 animate-pulse-slow">
                        Web
                      </span>
                      <div className="min-h-[1.1em] overflow-visible pb-2 pt-1 leading-snug">
                        <Typewriter
                          words={["Junior Dev", "Multimedia Developer"]}
                          loop={0}
                          cursor
                          cursorStyle="|"
                          typeSpeed={70}
                          deleteSpeed={50}
                          delaySpeed={2000}
                        />
                      </div>
                    </h1>
                    <motion.div 
                      variants={itemVariants}
                      className="text-xl md:text-2xl font-bold tracking-[0.3em] uppercase opacity-40 mt-2 text-blue-100"
                    >
                      & Multimedia 3D
                    </motion.div>
                  </div>
                </motion.div>

                {/* DESCRIPTION */}
                <motion.p variants={itemVariants} className="text-base md:text-lg text-white/50 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  A versatile <span className="text-white/80 font-medium">Full-Stack Junior Developer</span> and <span className="text-white/80 font-medium">IoT student</span>, blending technical engineering with creative <span className="text-blue-400">Multimedia 3D</span> expertise.
                </motion.p>

                {/* TECH STACK STAGGERED REVEAL */}
                <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {stackIcons.map((item, idx) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="interactive flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-white/30 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-500"
                    >
                      {item.icon}
                    </motion.div>
                  ))}
                </motion.div>

                {/* BUTTONS */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <Link href="/contact" className="px-10 py-4 rounded-xl bg-blue-600 text-white font-bold transition-all hover:scale-105 hover:bg-blue-500 shadow-lg shadow-blue-900/40 text-[10px] uppercase tracking-widest flex items-center gap-2 group">
                    Get In Touch <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                  <Link href="/cv1.pdf" className="px-10 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white font-semibold flex items-center gap-2 hover:bg-white/10 transition-all text-[10px] uppercase tracking-widest">
                    <Download size={14} /> Download CV
                  </Link>
                </motion.div>
              </div>

              {/* DYNAMIC PORTRAIT REVEAL */}
              <motion.div
                variants={photoVariants}
                className="relative w-full lg:w-[45%] flex justify-center lg:justify-end items-end h-[50vh] lg:h-[80vh]"
              >
                <div className="absolute inset-0 w-full h-full bg-blue-600/10 rounded-full blur-[120px] pointer-events-none opacity-40 animate-pulse" />
                
                <div className="relative z-20 w-full h-full flex justify-center lg:justify-end items-end overflow-visible">
                  <motion.img
                    src={PROFILE_SRC}
                    alt="Ahmed Portrait"
                    initial={{ filter: "brightness(0.5) blur(10px)" }}
                    animate={{ filter: "brightness(1.1) blur(0px)" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="w-auto h-full object-contain filter drop-shadow-[0_0_45px_rgba(30,58,138,0.7)]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                </div>
              </motion.div>

            </motion.div>
          </main>
        </section>
      </div>

      <div className="relative z-30">
        <GraduationScrollVideo />
        <div id="experience" className="py-20">
          <Experience />
        </div>
        <ProjectBanner />
        <Skils />
        <MyStory />
      </div>
    </div>
  );
}