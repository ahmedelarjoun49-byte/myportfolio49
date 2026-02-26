"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionTemplate,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import { Download, Code2, Cpu, Palette, Box, ArrowUpRight } from "lucide-react"; 
import { Typewriter } from "react-simple-typewriter";

import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import ProfilePhoto from "@/components/ProfilePhoto";
import Experience from "@/components/Experience";
import ProjectBanner from "@/components/ProjectBanner";
import Skils from "@/components/Skils";
import MyStory from "@/components/MyStory_temp";
import GraduationScrollVideo from "@/components/GraduationScrollVideo";

const PROFILE_SRC = "/mee.jpg";
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

function SubtleGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(59,130,246,0.15) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}

export default function HomeClient() {
  const [loading, setLoading] = useState(true);
  useScroll();

  const mouseX = useSpring(0, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 50 });

  function handleMouseMove({
    clientX,
    clientY,
    currentTarget,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
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
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-10"
        >
          {/* BACKGROUND LAYER */}
          <div className="absolute inset-0 z-0">
            <video
              className="absolute inset-0 h-full w-full object-cover opacity-60 scale-105"
              src={HERO_BG_VIDEO_SRC}
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
            <motion.div
              className="pointer-events-none absolute inset-0 z-10 opacity-60"
              style={{
                background: useMotionTemplate`
                  radial-gradient(
                    800px circle at ${mouseX}px ${mouseY}px,
                    rgba(37, 99, 235, 0.15),
                    transparent 80%
                  )
                `,
              }}
            />
            <SubtleGrid />
          </div>

          <main className="relative z-20 container mx-auto px-6 md:px-12 max-w-6xl">
            <motion.div
              initial="hidden"
              animate={loading ? "hidden" : "show"}
              variants={container}
              className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center"
            >
              {/* TEXT SIDE */}
              <div className="space-y-8 text-center lg:text-left z-30">
                <motion.div variants={rise} className="space-y-4">
                  <h2 className="text-lg md:text-xl text-white/60 font-light tracking-wide">
                    Hey, I&apos;m{" "}
                    <span className="text-white font-medium">Ahmed El Arjoun</span>
                  </h2>

                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tighter text-white">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700 drop-shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                      Web
                    </span>
                    
                    <span className="block">
                      <Typewriter
                        words={["Creative", "Frontend", "Developer"]}
                        loop={0}
                        cursor
                        cursorStyle="_"
                        typeSpeed={50}
                      />
                    </span>

                    <div className="relative inline-block mt-4">
                      <motion.div 
                        initial={{ backgroundPosition: "-200% 0" }}
                        animate={{ backgroundPosition: "200% 0" }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="text-xl md:text-3xl font-bold tracking-[0.35em] uppercase text-transparent bg-clip-text bg-[linear-gradient(110deg,#444,45%,#fff,55%,#444)] bg-[length:200%_100%] drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                      >
                        & Multimedia 3D
                      </motion.div>
                    </div>
                  </h1>
                </motion.div>

                <motion.p
                  variants={rise}
                  className="text-base md:text-lg text-white/50 max-w-md mx-auto lg:mx-0 leading-relaxed"
                >
                  I build modern, responsive, user-centric web experiences —
                  focused on clean UI/UX and performance.
                </motion.p>

                {/* ICONS */}
                <motion.div
                  variants={rise}
                  className="flex flex-wrap gap-4 justify-center lg:justify-start"
                >
                  {stackIcons.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300"
                    >
                      {item.icon}
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  variants={rise}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
                >
                  <Link
                    href="/contact"
                    className="px-8 py-4 rounded-xl bg-blue-600 text-white font-bold transition-all hover:scale-105 shadow-lg shadow-blue-900/40 text-center uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
                  >
                    Get In Touch <ArrowUpRight size={14} />
                  </Link>

                  <Link
                    href="/cv1.pdf"
                    className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-all uppercase tracking-widest text-[10px]"
                  >
                    <Download size={14} /> Download CV
                  </Link>
                </motion.div>
              </div>

              {/* PHOTO SIDE - CLEAN SINGLE GLOW FIX */}
              <motion.div
                variants={rise}
                className="flex justify-center lg:justify-end items-center"
              >
                <div className="relative group w-full max-w-[340px] lg:max-w-[380px]">
                  {/* Outer Diffuse Royale Blue Glow */}
                  <div className="absolute -inset-1 bg-blue-600/40 rounded-[2.5rem] blur-xl opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* THE CLEAN CONTOUR (Single Line Appearance) */}
                  <div className="absolute -inset-[2px] rounded-[2.5rem] bg-gradient-to-tr from-blue-700 to-blue-400 opacity-50 group-hover:opacity-100 blur-[1px] transition-all duration-500" />

                  <div className="relative aspect-[4/5] w-full rounded-[2.4rem] overflow-hidden bg-neutral-900 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01] z-20">
                    <div className="absolute inset-0">
                      <ProfilePhoto src={PROFILE_SRC} alt="Ahmed" />
                    </div>
                    {/* Dark Blue Overlay for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </main>
        </section>
      </div>

      <div className="relative z-30">
        <GraduationScrollVideo src={PROFILE_SRC} />
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