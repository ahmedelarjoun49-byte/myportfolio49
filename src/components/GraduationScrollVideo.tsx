"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

type Props = {
  src?: string;
  initialBgSrc?: string;
  staticBgSrc?: string;
  subtitle?: string;
  year?: string;
};

export default function GraduationElevatedHero({
  src = "/mypicture.png",
  initialBgSrc = "/pictures/avatar11.jpg",
  staticBgSrc = "/photooos/micro3.png",
  subtitle = "Licence • Développement Multimédia 3D & Web",
  year = "2025",
}: Props) {
  const containerRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  // --- Background: Sharpens and darkens slightly for focus ---
  const bgOpacity = useTransform(p, [0, 0.2], [0.7, 0.45]);
  const bgBlur = useTransform(p, [0, 0.25], [15, 0]);
  const bgScale = useTransform(p, [0, 0.4], [1.05, 1]);

  // --- Vertical Positioning (Fixed "Too Low" issue) ---
  // We move the entire stage UP by -100px to avoid the bottom-heavy look
  const globalY = useTransform(p, [0, 0.3], [80, -100]);

  // --- Card Reveal Logic (Fast & Deep) ---
  // Photo: Moves left and adds a slight 3D tilt
  const photoX = useTransform(p, [0.05, 0.25], [0, -280]);
  const photoRotate = useTransform(p, [0.05, 0.25], [0, -8]);
  const photoZ = useTransform(p, [0.05, 0.25], [0, 50]); // Moves "toward" user

  // Text: Slices in from behind with scaling
  const textX = useTransform(p, [0.1, 0.3], [0, 280]);
  const textScale = useTransform(p, [0.1, 0.3], [0.9, 1]);
  const textOpacity = useTransform(p, [0.1, 0.25], [0, 1]);

  const lines = [
    "Bridging the gap between 3D visualization and modern web logic.",
    "Specialized in high-performance React architectures and UI motion.",
    "Turning complex technical foundations into seamless user experiences.",
  ];

  return (
    <section ref={containerRef} className="relative h-[180vh] w-full bg-black antialiased overflow-hidden">
      
      {/* Pinned Background */}
      <div className="sticky top-0 z-0 h-screen w-full overflow-hidden">
        <motion.div 
          style={{ 
            opacity: bgOpacity, 
            scale: bgScale,
            filter: useMotionTemplate`blur(${bgBlur}px)` 
          }} 
          className="absolute inset-0"
        >
          <Image src={staticBgSrc} alt="Campus" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
        </motion.div>
      </div>

      {/* Main Content Stage */}
      <div className="sticky top-0 z-30 flex h-screen items-center justify-center">
        <motion.div 
          style={{ y: globalY }}
          className="relative flex w-full max-w-7xl items-center justify-center px-6"
        >
          
          {/* Portrait Card */}
          <motion.div
            style={{ x: photoX, rotateZ: photoRotate, z: photoZ }}
            className="relative z-50 w-full max-w-[350px] flex-shrink-0"
          >
            <div className="relative aspect-[3/4.3] overflow-hidden rounded-[32px] border border-white/10 bg-zinc-900 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
              <Image src={src} alt="Portrait" fill className="object-cover" quality={100} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 flex flex-col gap-1">
                <span className="text-[10px] font-black tracking-[0.3em] text-emerald-400 uppercase">
                  Authenticated // {year}
                </span>
                <p className="text-[10px] font-mono text-white/40 tracking-wider uppercase">Graduate.Identity.v3</p>
              </div>
            </div>
          </motion.div>

          {/* Info Card */}
          <motion.div
            style={{ x: textX, scale: textScale, opacity: textOpacity }}
            className="absolute z-40 w-full max-w-[540px]"
          >
            <div className="relative rounded-[48px] border border-white/5 bg-zinc-950/70 p-12 lg:p-16 backdrop-blur-3xl shadow-2xl overflow-hidden">
              {/* Subtle Ambient Light Corner */}
              <div className="absolute -top-12 -right-12 h-40 w-40 bg-emerald-500/10 blur-[80px]" />
              
              <div className="relative space-y-10">
                <div className="space-y-4">
                  <div className="h-1 w-16 bg-emerald-500 rounded-full" />
                  <h2 className="text-5xl lg:text-6xl font-black text-white uppercase italic leading-[0.9] tracking-tighter">
                    Creative <br /> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-blue-600">
                       Developer
                    </span>
                  </h2>
                  <p className="text-xs font-bold text-zinc-500 tracking-[0.4em] uppercase pt-2">{subtitle}</p>
                </div>

                <div className="space-y-6">
                  {lines.map((line, i) => (
                    <p key={i} className="text-zinc-400 text-lg font-medium leading-relaxed border-l-2 border-white/5 pl-6">
                      {line}
                    </p>
                  ))}
                </div>

                {/* Status Bar */}
                <div className="pt-6 flex items-center gap-4">
                  <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      style={{ width: useTransform(p, [0.15, 0.4], ["0%", "100%"]) }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase">System.Ready</span>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}