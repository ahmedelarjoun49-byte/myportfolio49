"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  MotionValue,
} from "framer-motion";

type Props = {
  src?: string;
  videoSrc?: string;
  staticBgSrc?: string;
  title?: string;
  subtitle?: string;
  year?: string;
};

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function useLineReveal(p: MotionValue<number>, i: number, base = 0.35, step = 0.08) {
  const start = base + i * step;
  const end = start + 0.12;
  const t = useTransform(p, (v) => clamp01((v - start) / (end - start)));

  return {
    opacity: useTransform(t, [0, 1], [0, 1]),
    y: useTransform(t, [0, 1], [15, 0]),
    filter: useTransform(t, [0, 0.9, 1], ["blur(8px)", "blur(0px)", "blur(0px)"]),
  };
}

export default function GraduationHero({
  src = "/mee.jpg",
  videoSrc = "/grad.mp4",
  staticBgSrc = "/photooos/micro3.png", 
  title = "GRADUATION",
  subtitle = "Licence • Développement Multimédia 3D & Web",
  year = "2025",
}: Props) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.0001,
  });

  // --- TRANSITION LOGIC (Maximized Clarity) ---
  const videoOpacity = useTransform(p, [0, 0.35], [1, 0]);
  const videoBlur = useTransform(p, [0, 0.4], [0, 12]); // Ultra-subtle blur
  
  const staticOpacity = useTransform(p, [0.15, 0.5], [0, 0.85]);
  const staticBlur = useTransform(p, [0.15, 0.45], [8, 0]); // Very sharp background
  const staticScale = useTransform(p, [0.15, 0.6], [1.02, 1]); 

  // --- CONTENT ANIMATIONS ---
  const split = useTransform(p, [0.05, 0.4], [0, 1]);
  const photoX = useTransform(split, [0, 1], ["0%", "-38%"]); 
  const textX = useTransform(split, [0, 1], ["0%", "32%"]);
  const photoRotateY = useTransform(split, [0, 1], [0, 12]);
  const textRotateY = useTransform(split, [0, 1], [0, -8]);
  const textOpacity = useTransform(split, [0.15, 0.4], [0, 1]);

  const lines = useMemo(() => [
    "In 2024–2025, I completed my Licence in Développement Multimédia 3D & Web.",
    "Focusing on clean web engineering, UI craft, and strong technical foundations.",
    "This experience shaped how I build today: performance-first and detail-oriented.",
  ], []);

  const l0 = useLineReveal(p, 0);
  const l1 = useLineReveal(p, 1);
  const l2 = useLineReveal(p, 2);
  
  const progressW = useTransform(p, [0.4, 0.9], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative h-[450vh] w-full bg-black antialiased">
      {/* 1. LAYERED BACKGROUND ENGINE (High-Quality Optimization) */}
      <div className="sticky top-0 z-0 h-screen w-full overflow-hidden bg-black">
        
        {/* VIDEO LAYER - Configured for maximum quality/bitrate priority */}
        <motion.div 
          style={{ 
            opacity: videoOpacity, 
            filter: useMotionTemplate`blur(${videoBlur}px)` 
          }} 
          className="absolute inset-0"
        >
          <video 
            className="h-full w-full object-cover" 
            autoPlay 
            muted 
            loop 
            playsInline 
            preload="auto"
            style={{ filter: 'contrast(1.05) brightness(0.9)' }} // Post-process for "pop"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </motion.div>

        {/* STATIC IMAGE LAYER (micro3.png) */}
        <motion.div 
          style={{ 
            opacity: staticOpacity, 
            filter: useMotionTemplate`blur(${staticBlur}px)`,
            scale: staticScale
          }} 
          className="absolute inset-0 z-10"
        >
          <Image
            src={staticBgSrc}
            alt="Graduation Venue"
            fill
            className="object-cover"
            priority
            quality={100} // Force highest image quality
          />
          <div className="absolute inset-0 bg-blue-900/10 mix-blend-color" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-20 bg-black/10" />
      </div>

      {/* 2. STICKY CONTENT */}
      <div className="sticky top-0 z-30 flex h-screen items-center justify-center perspective-2000">
        <div className="relative w-full max-w-6xl px-6">
          <div className="relative flex flex-col items-center justify-center lg:block">
            
            {/* PHOTO CARD WITH PRECISE ROYAL BLUE CONTOUR */}
            <motion.div
              style={{
                x: reduceMotion ? 0 : photoX,
                rotateY: reduceMotion ? 0 : photoRotateY,
                transformPerspective: 1800,
              }}
              className="relative z-40 aspect-[16/11] w-full max-w-[540px] mx-auto lg:mx-0 group"
            >
              {/* Refined Royal Blue Glow */}
              <div className="absolute -inset-[2px] bg-gradient-to-tr from-blue-700 via-blue-400 to-blue-800 rounded-[34px] blur-[2px] opacity-70 group-hover:opacity-100 transition-opacity duration-700 shadow-[0_0_30px_rgba(37,99,235,0.4)]" />
              
              <div className="relative h-full w-full rounded-[32px] overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl">
                <Image
                  src={src}
                  alt={title}
                  fill
                  className="object-cover object-[50%_15%]" 
                  quality={100}
                />
              </div>
            </motion.div>

            {/* TEXT STORY CARD */}
            <motion.div
              style={{
                x: reduceMotion ? 0 : textX,
                rotateY: reduceMotion ? 0 : textRotateY,
                opacity: textOpacity,
                transformPerspective: 1800,
              }}
              className="absolute inset-0 hidden items-center justify-center lg:flex pointer-events-none"
            >
              <div className="pointer-events-auto w-full max-w-[460px] rounded-[45px] border border-blue-500/20 bg-black/80 p-12 shadow-[0_0_80px_-20px_rgba(59,130,246,0.2)] backdrop-blur-3xl">
                <div className="relative space-y-8">
                  <div className="space-y-3">
                    <div className="h-1.5 w-14 bg-blue-600 rounded-full" />
                    <h2 className="text-2xl font-black text-white leading-tight">{subtitle}</h2>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.4em] text-blue-400">Class of {year}</p>
                  </div>

                  <div className="space-y-6">
                    {[l0, l1, l2].map((anim, i) => (
                      <motion.p
                        key={i}
                        style={{ opacity: anim.opacity, y: anim.y, filter: anim.filter as any }}
                        className="text-[17px] font-semibold leading-relaxed text-white/90 drop-shadow-md"
                      >
                        {lines[i]}
                      </motion.p>
                    ))}
                  </div>

                  {/* SHINY PROGRESS BAR */}
                  <div className="pt-4">
                    <div className="h-[5px] w-full bg-blue-950/40 rounded-full overflow-hidden border border-white/10">
                      <motion.div
                        style={{ width: progressW }}
                        className="h-full bg-gradient-to-r from-blue-600 via-sky-300 to-blue-700 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}