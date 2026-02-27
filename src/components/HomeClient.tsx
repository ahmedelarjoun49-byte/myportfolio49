"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionTemplate,
  useTransform,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import { Download, Code2, Cpu, Palette, Box, ArrowUpRight } from "lucide-react"; 
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";

import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import ProfilePhoto from "@/components/ProfilePhoto";
import Experience from "@/components/Experience";
import ProjectBanner from "@/components/ProjectBanner";
import Skils from "@/components/Skils";
import MyStory from "@/components/MyStory_temp";
import GraduationScrollVideo from "@/components/GraduationScrollVideo";

const PROFILE_PNG = "/mypicture.png";
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
  
  // High-performance springs for the tilt effect
  const mouseX = useSpring(0, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 20 });

  // Map mouse position to tilt degrees
  const rotateX = useTransform(mouseY, [-500, 500], [5, -5]);
  const rotateY = useTransform(mouseX, [-500, 500], [-5, 5]);

  function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left - width / 2;
    const y = clientY - top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
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
          {/* BACKGROUND ENGINE */}
          <div className="absolute inset-0 z-0">
            <video
              className="absolute inset-0 h-full w-full object-cover opacity-50 scale-110"
              src={HERO_BG_VIDEO_SRC}
              autoPlay muted loop playsInline preload="auto"
            />
            {/* Dark vignette to focus eye on center */}
            <div className="absolute inset-0 bg-radial-vignette from-transparent to-black" />
          </div>

          <main className="relative z-20 container mx-auto px-6 md:px-12 max-w-[1400px]">
            <motion.div
              initial="hidden"
              animate={loading ? "hidden" : "show"}
              variants={container}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center min-h-screen"
            >
              {/* TEXT SIDE */}
              <div className="space-y-8 text-center lg:text-left z-30 pt-20 lg:pt-0">
                <motion.div variants={rise} className="space-y-4">
                  <h2 className="text-xl text-blue-400/80 font-medium tracking-[0.2em] uppercase">
                    Ahmed El Arjoun
                  </h2>

                  <h1 className="text-7xl md:text-8xl lg:text-[110px] font-black leading-[0.9] tracking-tighter text-white">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                      WEB
                    </span>
                    <br />
                    <span className="relative">
                      <Typewriter
                        words={["FRONTEND", "CREATIVE", "DEVELOPER"]}
                        loop={0}
                        cursor
                        cursorStyle="_"
                        typeSpeed={50}
                      />
                    </span>
                  </h1>

                  <div className="pt-4">
                     <span className="text-2xl md:text-4xl font-bold tracking-[0.1em] text-white/40 italic">
                        & Multimedia 3D
                     </span>
                  </div>
                </motion.div>

                <motion.p variants={rise} className="text-lg text-white/50 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Crafting immersive digital experiences through clean code and 3D animation. 
                  Focused on high-performance interfaces that tell a story.
                </motion.p>

                <motion.div variants={rise} className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-6">
                  <Link href="/contact" className="group px-10 py-5 rounded-full bg-blue-600 text-white font-bold transition-all hover:bg-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.3)] flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
                    Let's Talk <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                  <Link href="/cv1.pdf" className="px-10 py-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white font-bold hover:bg-white/10 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3">
                    <Download size={18} /> Resume
                  </Link>
                </motion.div>
              </div>

              {/* GIANT PHOTO SIDE */}
              <motion.div
                variants={rise}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative flex justify-center lg:justify-end items-end h-full pt-10 lg:pt-0"
              >
                {/* Massive Radial Glow behind the character */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[150px] rounded-full z-0" />

                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                  className="relative z-10 w-full h-[70vh] lg:h-[90vh] flex items-end"
                >
                  <Image
                    src={PROFILE_PNG}
                    alt="Ahmed El Arjoun"
                    fill
                    className="object-contain object-bottom drop-shadow-[0_10px_80px_rgba(37,99,235,0.25)] filter brightness-110"
                    priority
                    quality={100}
                  />
                  
                  {/* Bottom Fade to blend feet with the blackness */}
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-transparent to-transparent z-20" />
                </motion.div>
              </motion.div>
            </motion.div>
          </main>
        </section>
      </div>

      <div className="relative z-30">
        <GraduationScrollVideo src={PROFILE_PNG} />
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