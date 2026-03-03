"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import { Download, Code2, Cpu, Palette, Box, ArrowUpRight } from "lucide-react"; 
import { Typewriter } from "react-simple-typewriter";

import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import Experience from "@/components/Experience";
import ProjectBanner from "@/components/ProjectBanner";
import Skils from "@/components/Skils";
import MyStory from "@/components/MyStory_temp";
import GraduationScrollVideo from "@/components/GraduationScrollVideo";

const PROFILE_SRC = "/mypicture.png";
const HERO_BG_VIDEO_SRC = "/stars.mp4";

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
  const [loading, setLoading] = useState(true);
  
  // Smooth mouse movement for the radial glow
  const mouseX = useSpring(useMotionValue(0), { stiffness: 500, damping: 50 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 500, damping: 50 });

  function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
    mouseX.set(clientX);
    mouseY.set(clientY);
  }

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const stackIcons = [
    { icon: <Code2 size={22} />, label: "React" },
    { icon: <Cpu size={22} />, label: "TypeScript" },
    { icon: <Palette size={22} />, label: "Tailwind" },
    { icon: <Box size={22} />, label: "3D" },
  ];

  return (
    <div className="transition-colors duration-300 selection:bg-blue-500/30">
      <AnimatePresence>{loading && <Preloader />}</AnimatePresence>
      <Header />

      <div className="dark bg-black text-white">
        <section
          id="home"
          onMouseMove={handleMouseMove}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* MOUSE GLOW EFFECT */}
          <motion.div
            className="pointer-events-none fixed inset-0 z-30 opacity-60"
            style={{
              background: useMotionTemplate`
                radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(37,99,235,0.15), transparent 80%)
              `,
            }}
          />

          {/* BACKGROUND */}
          <div className="absolute inset-0 z-0">
            <video
              className="absolute inset-0 h-full w-full object-cover opacity-40 scale-105"
              src={HERO_BG_VIDEO_SRC}
              autoPlay muted loop playsInline
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          </div>

          <main className="relative z-20 container mx-auto px-6 md:px-12 max-w-7xl">
            <motion.div
              initial="hidden"
              animate={loading ? "hidden" : "show"}
              variants={container}
              className="flex flex-col lg:flex-row items-center justify-between gap-12"
            >
              {/* LEFT: TEXT CONTENT */}
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
                      
                      {/* FIXED WRAPPER: Added pb-2 and leading-snug to stop character clipping */}
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

                {/* REWRITTEN PROFESSIONAL DESCRIPTION */}
                <motion.p variants={rise} className="text-base md:text-lg text-white/50 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  A versatile <span className="text-white/80">Full-Stack Junior Developer</span> and <span className="text-white/80">IoT student</span>, blending technical engineering with creative <span className="text-white/80">Multimedia 3D</span> expertise to build the next generation of interactive digital experiences.
                </motion.p>

                <motion.div variants={rise} className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {stackIcons.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-blue-500 hover:border-blue-500/50 transition-all duration-300">
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

              {/* RIGHT: PROFILE PICTURE */}
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