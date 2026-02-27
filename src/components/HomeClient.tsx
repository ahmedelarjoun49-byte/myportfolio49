"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import { Download, ArrowUpRight } from "lucide-react"; 
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";

// Components
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import Experience from "@/components/Experience";
import ProjectBanner from "@/components/ProjectBanner";
import Skils from "@/components/Skils";
import MyStory from "@/components/MyStory_temp";
import GraduationHero from "@/components/GraduationScrollVideo"; 

const PROFILE_PNG = "/mypicture.png";

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8 },
  },
};

const characterEntrance: Variants = {
  hidden: { opacity: 0, x: 50, scale: 0.95 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 1, delay: 0.5 },
  },
};

export default function HomeClient() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  // High-performance springs for the 3D tilt effect
  const mouseX = useSpring(0, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 30 });

  // Map mouse movement to rotation degrees
  const rotateX = useTransform(mouseY, [-500, 500], [7, -7]);
  const rotateY = useTransform(mouseX, [-500, 500], [-7, 7]);

  // Parallax background movement for the blurred PNG
  const bgX = useTransform(mouseX, [-500, 500], [20, -20]);
  const bgY = useTransform(mouseY, [-500, 500], [20, -20]);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <div className="transition-colors duration-300 selection:bg-blue-600/30 overflow-x-hidden">
      <AnimatePresence>{loading && <Preloader />}</AnimatePresence>

      <Header />

      <div className="dark bg-black text-white">
        <section
          id="home"
          onMouseMove={(e) => {
            const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
            mouseX.set(e.clientX - left - width / 2);
            mouseY.set(e.clientY - top - height / 2);
          }}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* BACKGROUND LAYER: BLURRED PNG NUANCE */}
          <div className="absolute inset-0 z-0 bg-black">
            <motion.div 
              style={{ x: bgX, y: bgY, scale: 1.1 }}
              className="absolute inset-0 opacity-20 blur-[100px] pointer-events-none"
            >
               <Image 
                src={PROFILE_PNG} 
                alt="Background Aesthetic" 
                fill 
                className="object-cover object-center grayscale"
              />
            </motion.div>

            {/* Glowing Orbs */}
            <div className="absolute top-[-15%] left-[-10%] w-[80%] h-[80%] bg-blue-900/20 blur-[150px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-blue-600/10 blur-[120px] rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black" />
          </div>

          <main className="relative z-20 container mx-auto px-6 md:px-12 max-w-[1500px]">
            <motion.div
              initial="hidden"
              animate={loading ? "hidden" : "show"}
              variants={container}
              className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center min-h-screen"
            >
              {/* TEXT CONTENT */}
              <div className="space-y-10 text-center lg:text-left z-30 pt-32 lg:pt-0">
                <motion.div variants={rise} className="space-y-6">
                  <h2 className="text-xl text-blue-500 font-bold tracking-[0.5em] uppercase opacity-90">
                    Ahmed El Arjoun
                  </h2>

                  <h1 className="text-6xl md:text-8xl lg:text-[115px] font-black leading-[0.85] tracking-tighter text-white">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-500 to-blue-800 drop-shadow-[0_0_35px_rgba(37,99,235,0.4)]">
                      WEB
                    </span>
                    <br />
                    <span className="relative inline-block h-[1.1em]">
                      <Typewriter
                        words={["FRONTEND", "CREATIVE", "DEVELOPER"]}
                        loop={0}
                        cursor
                        cursorStyle="_"
                        typeSpeed={70}
                      />
                    </span>
                  </h1>

                  <div className="pt-2">
                     <span className="text-2xl md:text-4xl font-extrabold tracking-[0.25em] text-zinc-800 uppercase italic">
                        & Multimedia 3D
                     </span>
                  </div>
                </motion.div>

                <motion.p variants={rise} className="text-xl text-zinc-500 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                  Developing high-performance web solutions and immersive 3D multimedia experiences with clean, modern engineering.
                </motion.p>

                <motion.div variants={rise} className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4">
                  <Link href="/contact" className="group px-12 py-6 rounded-2xl bg-blue-600 text-white font-black transition-all hover:scale-105 shadow-[0_20px_50px_-10px_rgba(37,99,235,0.6)] flex items-center justify-center gap-4 uppercase tracking-widest text-xs">
                    Get In Touch <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                  <Link href="/cv1.pdf" className="px-12 py-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-3xl text-white font-bold hover:bg-white/10 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-4">
                    <Download size={20} /> Download CV
                  </Link>
                </motion.div>
              </div>

              {/* INTERACTIVE CHARACTER SIDE */}
              <motion.div
                variants={characterEntrance}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative flex justify-center lg:justify-end items-end h-[85vh] lg:h-screen pt-10 lg:pt-0"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[80%] bg-blue-600/15 blur-[160px] rounded-full pointer-events-none -z-10" />

                <div className="relative w-full h-[95%] flex items-end">
                  <Image
                    src={PROFILE_PNG}
                    alt="Ahmed Portrait"
                    fill
                    className="object-contain object-bottom drop-shadow-[0_50px_120px_rgba(37,99,235,0.4)] brightness-110"
                    priority
                    quality={100}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black via-black/30 to-transparent z-20 pointer-events-none" />
                </div>
              </motion.div>
            </motion.div>
          </main>
        </section>
      </div>

      {/* LOWER SECTIONS */}
      <div className="relative z-30">
        <GraduationHero 
          videoSrc="/grad.mp4" 
          src={PROFILE_PNG} 
          staticBgSrc="/photooos/micro3.png"
        />
        
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