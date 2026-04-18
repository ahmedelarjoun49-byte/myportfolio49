"use client";

import { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { Download, Code2, Cpu, Palette, Box, ArrowUpRight } from "lucide-react"; 
import { Typewriter } from "react-simple-typewriter";
import gsap from "gsap";

// Removed Header and Preloader imports - they are now handled by ClientLayout
import Experience from "@/components/Experience";
import ProjectBanner from "@/components/ProjectBanner";
import Skils from "@/components/Skils"; 
import MyStory from "@/components/MyStory_temp";
import GraduationScrollVideo from "@/components/GraduationScrollVideo";

const PROFILE_SRC = "/mypicture.png";
const HERO_BG_VIDEO_SRC = "/stars.mp4";

// --- OPTIMIZED HIGH-PERFORMANCE CURSOR ---
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

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, .interactive")) {
        gsap.to(followerRef.current, { scale: 2.5, backgroundColor: "rgba(37, 99, 235, 0.2)", duration: 0.3 });
      }
    };

    const handlePointerOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, .interactive")) {
        gsap.to(followerRef.current, { scale: 1, backgroundColor: "rgba(37, 99, 235, 0.6)", duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handlePointerOver);
    window.addEventListener("mouseout", handlePointerOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handlePointerOver);
      window.removeEventListener("mouseout", handlePointerOut);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference will-change-transform" style={{ transform: "translate(-50%, -50%)" }} />
      <div ref={followerRef} className="fixed top-0 left-0 w-12 h-12 bg-blue-600/60 rounded-full pointer-events-none z-[99] blur-[2px] shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-colors will-change-transform" style={{ transform: "translate(-50%, -50%)" }} />
    </>
  );
};

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(15px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeOut },
  },
};

export default function HomeClient() {
  // Removed local loading state - it's handled globally now
  const stackIcons = [
    { icon: <Code2 size={22} />, label: "React" },
    { icon: <Cpu size={22} />, label: "TypeScript" },
    { icon: <Palette size={22} />, label: "Tailwind" },
    { icon: <Box size={22} />, label: "3D" },
  ];

  return (
    <div className="transition-colors duration-300 selection:bg-blue-500/30 lg:cursor-none bg-black min-h-screen">
      
      {/* 1. Cursor is now always active (since HomeClient only mounts after loading) */}
      <div className="hidden lg:block">
        <CustomCursor />
      </div>

      <div className="dark text-white">
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* VIDEO BACKGROUND */}
          <div className="absolute inset-0 z-0">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="absolute inset-0 h-full w-full object-cover opacity-40"
              src={HERO_BG_VIDEO_SRC}
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
          </div>

          <main className="relative z-20 container mx-auto px-6 md:px-12 max-w-7xl">
            <motion.div
              initial="hidden"
              animate="show" // Always animate to show
              variants={container}
              className="flex flex-col lg:flex-row items-center justify-between gap-12"
            >
              <div className="w-full lg:w-[60%] space-y-8 text-center lg:text-left">
                <motion.div variants={rise} className="space-y-2">
                  <h2 className="text-lg md:text-xl text-white/60 font-light tracking-wide">
                    Hey, I&apos;m <span className="text-white font-medium">Ahmed El Arjoun</span>
                  </h2>

                  <div className="relative">
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tighter text-white">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-[0_0_20px_rgba(37,99,235,0.4)]">
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
                      variants={rise}
                      className="text-xl md:text-2xl font-bold tracking-[0.3em] uppercase opacity-40 mt-2"
                    >
                      & Multimedia 3D
                    </motion.div>
                  </div>
                </motion.div>

                <motion.p variants={rise} className="text-base md:text-lg text-white/50 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  A versatile <span className="text-white/80">Full-Stack Junior Developer</span> and <span className="text-white/80">IoT student</span>, blending technical engineering with creative <span className="text-white/80">Multimedia 3D</span> expertise.
                </motion.p>

                <motion.div variants={rise} className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {stackIcons.map((item, idx) => (
                    <div key={idx} className="interactive flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-blue-500 hover:border-blue-500/50 transition-all duration-300">
                      {item.icon}
                    </div>
                  ))}
                </motion.div>

                <motion.div variants={rise} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/contact" className="px-10 py-4 rounded-xl bg-blue-600 text-white font-bold transition-all hover:scale-105 shadow-lg shadow-blue-900/40 text-[10px] uppercase tracking-widest flex items-center gap-2">
                    Get In Touch <ArrowUpRight size={14} />
                  </Link>
                  <Link href="/cv1.pdf" className="px-10 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white font-semibold flex items-center gap-2 hover:bg-white/10 transition-all text-[10px] uppercase tracking-widest">
                    <Download size={14} /> Download CV
                  </Link>
                </motion.div>
              </div>

              <motion.div
                variants={rise}
                className="relative w-full lg:w-[40%] flex justify-center lg:justify-end items-end"
              >
                <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="relative z-20">
                  <img
                    src={PROFILE_SRC}
                    alt="Ahmed Portrait"
                    className="w-auto h-[50vh] lg:h-[80vh] object-contain drop-shadow-[0_0_40px_rgba(37,99,235,0.3)]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/20 to-transparent" />
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