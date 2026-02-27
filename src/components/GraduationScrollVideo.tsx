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

function useLineReveal(p: MotionValue<number>, i: number, base = 0.25, step = 0.05) {
  const start = base + i * step;
  const end = start + 0.1;
  const t = useTransform(p, (v) => clamp01((v - start) / (end - start)));

  return {
    opacity: useTransform(t, [0, 1], [0, 1]),
    y: useTransform(t, [0, 1], [15, 0]),
    filter: useTransform(t, [0, 0.9, 1], ["blur(8px)", "blur(0px)", "blur(0px)"]),
  };
}

export default function GraduationHero({
  src = "/mypicture.png",
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

  // Keep video visible longer (up to 60% of scroll)
  const videoOpacity = useTransform(p, [0, 0.6], [1, 0]);
  const videoScale = useTransform(p, [0, 0.5], [1, 1.05]);
  const videoBlur = useTransform(p, [0, 0.5], [0, 8]);

  const schoolOpacity = useTransform(p, [0.4, 0.8], [0, 1]);
  const schoolScale = useTransform(p, [0.4, 1], [1.1, 1]);
  
  const split = useTransform(p, [0.05, 0.3], [0, 1]);
  const photoX = useTransform(split, [0, 1], ["0%", "-38%"]); 
  const textX = useTransform(split, [0, 1], ["0%", "32%"]);
  const textOpacity = useTransform(split, [0.1, 0.3], [0, 1]);

  const lines = useMemo(() => [
    "In 2024–2025, I completed my Licence in Développement Multimédia 3D & Web.",
    "Focusing on clean web engineering, UI craft, and strong technical foundations.",
    "This experience shaped how I build today: performance-first and detail-oriented.",
  ], []);

  const l0 = useLineReveal(p, 0);
  const l1 = useLineReveal(p, 1);
  const l2 = useLineReveal(p, 2);
  
  const progressW = useTransform(p, [0.1, 0.5], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative h-[300vh] w-full bg-black antialiased">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Background Image Layer */}
        <motion.div style={{ opacity: schoolOpacity, scale: schoolScale }} className="absolute inset-0 z-10">
          <Image src={staticBgSrc} alt="Campus" fill className="object-cover" priority />
        </motion.div>

        {/* Video Layer */}
        <motion.div style={{ opacity: videoOpacity, scale: videoScale, filter: useMotionTemplate`blur(${videoBlur}px)` }} className="absolute inset-0 z-20">
          <video className="h-full w-full object-cover" autoPlay muted loop playsInline>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </motion.div>
        <div className="absolute inset-0 z-30 bg-gradient-to-b from-black/80 via-transparent to-black" />
      </div>

      <div className="sticky top-0 z-40 flex h-screen items-center justify-center">
        <div className="relative w-full max-w-6xl px-6 flex flex-col lg:flex-row items-center justify-center gap-10">
          <motion.div style={{ x: photoX }} className="relative aspect-[16/11] w-full max-w-[500px] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
            <Image src={src} alt={title} fill className="object-cover" />
          </motion.div>

          <motion.div style={{ x: textX, opacity: textOpacity }} className="w-full max-w-[450px] bg-black/60 backdrop-blur-xl p-10 rounded-[40px] border border-white/5">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">{subtitle}</h2>
              <div className="space-y-4">
                {[l0, l1, l2].map((anim, i) => (
                  <motion.p key={i} style={{ opacity: anim.opacity, y: anim.y }} className="text-zinc-300 text-lg">
                    {lines[i]}
                  </motion.p>
                ))}
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full mt-4 overflow-hidden">
                <motion.div style={{ width: progressW }} className="h-full bg-blue-500" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}