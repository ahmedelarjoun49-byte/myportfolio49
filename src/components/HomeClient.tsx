"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Download, ArrowUpRight, X, Github, Linkedin, Instagram, MessageCircle } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import gsap from "gsap";

import Experience from "@/components/Experience";
import ProjectBanner from "@/components/ProjectBanner";
import Skils from "@/components/Skils"; 
import MyStory from "@/components/MyStory_temp";
import GraduationScrollVideo from "@/components/GraduationScrollVideo";

const PROFILE_SRC = "/mypicture.png";

const SOCIALS = [
  { 
    Icon: Github, 
    href: "https://github.com/ahmedelarjoun49-byte", 
    label: "GitHub",
    color: "hover:text-[#fafafa] hover:bg-white/10"
  },
  { 
    Icon: Linkedin, 
    href: "https://www.linkedin.com/in/ahmed-el-arjoun-639804305/", 
    label: "LinkedIn",
    color: "hover:text-[#0077b5] hover:bg-[#0077b5]/10"
  },
  { 
    Icon: Instagram, 
    href: "https://www.instagram.com/el4rjoun/", 
    label: "Instagram",
    color: "hover:text-[#e4405f] hover:bg-[#e4405f]/10"
  },
  { 
    Icon: MessageCircle, 
    href: "https://wa.me/212691243592", 
    label: "WhatsApp",
    color: "hover:text-[#25d366] hover:bg-[#25d366]/10"
  },
];

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

export default function HomeClient() {
  const [showCV, setShowCV] = useState(false);
  const [showSocials, setShowSocials] = useState(false);

  const closeModals = useCallback(() => {
    setShowCV(false);
    setShowSocials(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModals();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeModals]);

  return (
    <div className="transition-colors duration-300 selection:bg-blue-500/30 lg:cursor-none bg-black min-h-screen">
      
      <div className="hidden lg:block">
        <CustomCursor />
      </div>

      <div className="dark text-white">
        <section id="home" className="relative min-h-screen flex items-stretch justify-center overflow-hidden bg-black">
          
          <div className="absolute inset-0 z-0 bg-[#020202]">
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
            <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-blue-900/20 blur-[150px] rounded-full animate-pulse-slow" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-900/15 blur-[130px] rounded-full" />
          </div>

          <main className="relative z-20 container mx-auto px-6 md:px-12 max-w-7xl flex items-center">
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
              className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full min-h-screen"
            >
              {/* Text Side */}
              <div className="w-full lg:w-[55%] space-y-8 text-center lg:text-left py-20 z-40">
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="space-y-2">
                  
                  <h2 className="text-lg md:text-xl text-white/60 font-light tracking-wide">
                    Hey, I&apos;m <span className="text-white font-medium">Ahmed El Arjoun</span>
                  </h2>

                  <div className="relative overflow-visible">
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tighter text-white">
                      <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600 drop-shadow-[0_0_35px_rgba(37,99,235,0.4)] pr-2">
                        Web
                      </span>
                      <div className="min-h-[1.1em] leading-snug">
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
                    <div 
                      style={{ fontFamily: "'Imperial Script', cursive" }}
                      className="text-4xl md:text-5xl tracking-normal normal-case opacity-90 mt-1 text-blue-400 lowercase drop-shadow-[0_0_20px_rgba(65,105,225,0.4)]"
                    >
                      & multimedia 3d
                    </div>
                  </div>
                </motion.div>

                <motion.p variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="text-base md:text-lg text-white/50 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  A versatile <span className="text-white/80 font-medium">Full-Stack Junior Developer</span> and <span className="text-white/80 font-medium">IoT student</span>, blending technical engineering with creative <span className="text-blue-400">Multimedia 3D</span> expertise.
                </motion.p>

                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  
                  <button 
                    onClick={() => setShowSocials(true)} 
                    className="group relative px-9 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold tracking-wider text-[12px] uppercase shadow-[0_0_25px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(65,105,225,0.6)] flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                  >
                    Get In Touch 
                    <ArrowUpRight size={15} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </button>

                  <button 
                    onClick={() => setShowCV(true)} 
                    className="group px-9 py-4 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md text-zinc-300 font-bold tracking-wider text-[12px] uppercase flex items-center justify-center gap-2 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300 active:scale-[0.98]"
                  >
                    <Download size={15} className="group-hover:translate-y-0.5 transition-transform duration-300" /> 
                    View CV
                  </button>

                </motion.div>
              </div>

              {/* FIXED IMAGE CONTAINER */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative w-full lg:w-[50%] h-full flex items-end justify-center lg:justify-end overflow-visible"
              >
                <div className="relative w-full h-full flex items-end overflow-visible profile-mask">
                  <img 
                    src={PROFILE_SRC} 
                    alt="Ahmed Graduation" 
                    className="w-auto h-[90vh] object-contain filter drop-shadow-[0_0_80px_rgba(30,58,138,0.2)] z-10 select-none" 
                  />
                </div>
              </motion.div>

            </motion.div>
          </main>
        </section>
      </div>

      {/* Modals & Remaining Sections */}
      <AnimatePresence>
        {showSocials && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-black/40 backdrop-blur-[30px]" onClick={closeModals}>
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
              {SOCIALS.map((social, idx) => (
                <Link key={idx} href={social.href} target="_blank" className={`group aspect-square flex flex-col items-center justify-center bg-white/5 border border-white/5 rounded-[2rem] transition-all duration-500 hover:scale-[1.05] hover:border-white/20 ${social.color}`}>
                  <social.Icon size={40} strokeWidth={1.5} className="transition-all duration-500 group-hover:scale-110" />
                  <span className="mt-4 text-[9px] uppercase tracking-[0.3em] font-bold opacity-40 group-hover:opacity-100 transition-opacity">{social.label}</span>
                </Link>
              ))}
              <button onClick={closeModals} className="col-span-2 md:col-span-4 mt-6 text-[10px] uppercase tracking-[0.5em] text-white/20 hover:text-white transition-all">
                [ Click anywhere to close ]
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCV && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md" onClick={closeModals}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative w-full max-w-5xl h-[85vh] bg-[#111] rounded-2xl border border-white/10 overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-end p-4 border-b border-white/10 bg-black/50">
                <button onClick={closeModals} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/50 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <iframe src="/cv1.pdf" className="w-full h-full" title="Ahmed CV" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-30 bg-black">
        <GraduationScrollVideo />
        <div id="experience" className="py-20"><Experience /></div>
        <ProjectBanner />
        <Skils />
        <MyStory />
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Imperial+Script&display=swap');

        @keyframes pulse-slow { 
          0%, 100% { opacity: 0.2; } 
          50% { opacity: 0.35; } 
        }
        .animate-pulse-slow { animation: pulse-slow 8s infinite ease-in-out; }
        
        .profile-mask {
          mask-image: linear-gradient(to bottom, 
            black 0%, 
            black 75%, 
            rgba(0,0,0,0.5) 85%, 
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(to bottom, 
            black 0%, 
            black 75%, 
            rgba(0,0,0,0.5) 85%, 
            transparent 100%
          );
        }

        #home main { overflow: visible; }
        
        *:focus { outline: none !important; }
        button, a { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </div>
  );
}