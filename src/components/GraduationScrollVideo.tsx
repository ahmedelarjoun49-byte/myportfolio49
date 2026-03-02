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
  initialBgSrc?: string;
  staticBgSrc?: string;
  subtitle?: string;
  year?: string;
};

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function useLineReveal(p: MotionValue<number>, i: number, base = 0.35, step = 0.05) {
  const start = base + i * step;
  const end = start + 0.1;
  const t = useTransform(p, (v) => clamp01((v - start) / (end - start)));

  return {
    opacity: useTransform(t, [0, 1], [0, 1]),
    y: useTransform(t, [0, 1], [10, 0]),
    filter: useTransform(t, [0, 0.8, 1], ["blur(4px)", "blur(0px)", "blur(0px)"]),
  };
}

export default function GraduationHero({
  src = "/mypicture.png", 
  initialBgSrc = "/pictures/avatar11.jpg", 
  staticBgSrc = "/photooos/micro3.png", 
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
    restDelta: 0.001,
  });

  const initialOpacity = useTransform(p, [0, 0.3], [1, 0]);
  const initialScale = useTransform(p, [0, 0.3], [1, 1.05]);
  
  const campusOpacity = useTransform(p, [0.1, 0.4], [0, 1]);
  
  // FIXED: Campus background now stays at a 4px blur instead of going to 0
  const campusBlur = useTransform(p, [0.1, 0.4], [12, 4]); 
  
  const campusScale = useTransform(p, [0.1, 0.5], [1.08, 1]); 

  const split = useTransform(p, [0.05, 0.35], [0, 1]);
  const photoX = useTransform(split, [0, 1], ["0%", "-38%"]); 
  const textX = useTransform(split, [0, 1], ["0%", "32%"]);
  const photoRotateY = useTransform(split, [0, 1], [0, 12]);
  const textOpacity = useTransform(split, [0.1, 0.35], [0, 1]);

  const lines = useMemo(() => [
    "In 2024–2025, I completed my Licence in Développement Multimédia 3D & Web.",
    "Focusing on clean web engineering, UI craft, and strong technical foundations.",
    "This experience shaped how I build today: performance-first and detail-oriented.",
  ], []);

  const [l0, l1, l2] = [useLineReveal(p, 0), useLineReveal(p, 1), useLineReveal(p, 2)];
  const progressW = useTransform(p, [0.35, 0.8], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative h-[220vh] w-full bg-black antialiased">
      <div className="sticky top-0 z-0 h-screen w-full overflow-hidden bg-black">
        <motion.div style={{ opacity: initialOpacity, scale: initialScale }} className="absolute inset-0">
          <Image src={initialBgSrc} alt="Intro" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <motion.div 
          style={{ 
            opacity: campusOpacity, 
            filter: useMotionTemplate`blur(${campusBlur}px)`,
            scale: campusScale
          }} 
          className="absolute inset-0 z-10"
        >
          <Image src={staticBgSrc} alt="Campus" fill className="object-cover" quality={100} />
          {/* Subtle overlay to keep the focus on the card */}
          <div className="absolute inset-0 bg-black/30 bg-gradient-to-b from-black/60 via-transparent to-black" />
        </motion.div>
      </div>

      <div className="sticky top-0 z-30 flex h-screen items-center justify-center perspective-2000">
        <div className="relative w-full max-w-6xl px-6">
          <div className="relative flex flex-col items-center justify-center lg:block">
            
            <motion.div
              style={{
                x: reduceMotion ? 0 : photoX,
                rotateY: reduceMotion ? 0 : photoRotateY,
                transformPerspective: 1800,
              }}
              className="relative z-40 aspect-[16/11] w-full max-w-[540px] mx-auto lg:mx-0"
            >
              <div className="absolute inset-0 bg-blue-600/20 rounded-[32px] blur-[60px] pointer-events-none" />
              
              <div className="relative h-full w-full rounded-[32px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-3xl shadow-2xl">
                <Image 
                  src={src} 
                  alt="Ahmed Portrait" 
                  fill 
                  className="object-contain object-bottom drop-shadow-[0_0_20px_rgba(37,99,235,0.4)]" 
                  quality={100} 
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </motion.div>

            <motion.div
              style={{ x: reduceMotion ? 0 : textX, opacity: textOpacity }}
              className="absolute inset-0 hidden items-center justify-center lg:flex pointer-events-none"
            >
              <div className="pointer-events-auto w-full max-w-[460px] rounded-[45px] border border-white/10 bg-black/80 p-12 shadow-2xl backdrop-blur-3xl">
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
                        className="text-[17px] font-semibold leading-relaxed text-white/90"
                      >
                        {lines[i]}
                      </motion.p>
                    ))}
                  </div>

                  <div className="pt-4">
                    <div className="h-[5px] w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        style={{ width: progressW }}
                        className="h-full bg-gradient-to-r from-blue-600 to-sky-400 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
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