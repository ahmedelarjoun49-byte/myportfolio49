"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  useInView,
} from "framer-motion";

type Props = {
  src?: string;
  subtitle?: string;
  year?: string;
  title?: string;
};

export default function GraduationParallaxHero({
  src = "/mee.jpg",
  subtitle = "Licence • Développement Multimédia 3D & Web",
  year = "2025",
  title = "THE NEXT LEVEL",
}: Props) {
  const containerRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(containerRef, { amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // --- Cinematic 3D Transforms ---
  const photoZ = useTransform(smoothProgress, [0, 0.4], [0, -300]);
  const photoScale = useTransform(smoothProgress, [0, 0.4], [1, 0.85]);
  const photoOpacity = useTransform(smoothProgress, [0.3, 0.5], [1, 0]);
  const photoBlur = useTransform(smoothProgress, [0.2, 0.5], [0, 15]);

  const textZ = useTransform(smoothProgress, [0.3, 0.7], [300, 0]);
  const textY = useTransform(smoothProgress, [0.3, 0.7], [150, 0]);
  const textOpacity = useTransform(smoothProgress, [0.4, 0.6], [0, 1]);
  const textScale = useTransform(smoothProgress, [0.3, 0.7], [0.9, 1]);

  const bgRotation = useTransform(smoothProgress, [0, 1], [0, 25]);

  const lines = [
    "Architecting the bridge between 3D visualization and modern web logic.",
    "Specialized in high-performance React architectures and UI motion.",
    "Turning complex technical foundations into seamless user experiences.",
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative h-[300vh] w-full bg-[#020617] antialiased overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      {/* Background Ambient Glow */}
      <motion.div 
        style={{ rotate: bgRotation }}
        className="fixed inset-0 z-0 flex items-center justify-center opacity-40 pointer-events-none"
      >
        <div className="h-[800px] w-[800px] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute top-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-royal-blue-500/10 blur-[120px]" />
      </motion.div>

      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        
        {/* PHOTO CARD - The "Portrait" */}
        <motion.div
          style={{
            z: photoZ,
            scale: photoScale,
            opacity: photoOpacity,
            filter: useMotionTemplate`blur(${photoBlur}px)`,
          }}
          className="absolute z-20 w-full max-w-[420px] px-6"
        >
          <div className="group relative aspect-[3/4.2] overflow-hidden rounded-[2.5rem] border border-blue-500/20 bg-zinc-900 shadow-[0_0_80px_rgba(37,99,235,0.2)]">
            <Image 
              src={src} 
              alt="Portrait" 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-110" 
              priority 
            />
            
            {/* Royal Blue Vignette/Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent" />
            
            {/* Floating Info Tag */}
            <div className="absolute bottom-8 left-8 right-8 p-6 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md">
              <p className="text-[10px] font-black tracking-[0.4em] text-blue-400 uppercase mb-2">Class of {year}</p>
              <h2 className="text-white font-bold text-xl leading-tight uppercase tracking-tighter">
                {subtitle}
              </h2>
            </div>
          </div>
        </motion.div>

        {/* CONTENT CARD - The "Developer" */}
        <motion.div
          style={{
            z: textZ,
            y: textY,
            opacity: textOpacity,
            scale: textScale,
          }}
          className="absolute z-50 w-full max-w-[650px] px-6"
        >
          <div className="relative overflow-hidden rounded-[3rem] border border-white/5 bg-zinc-950/60 p-10 lg:p-16 backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            {/* Top Right Glow Accent */}
            <div className="absolute -top-20 -right-20 h-64 w-64 bg-blue-600/20 blur-[100px]" />
            
            <div className="relative space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-[2px] w-12 bg-blue-600" />
                  <span className="text-xs font-black tracking-[0.3em] text-blue-500 uppercase">Profile Strategy</span>
                </div>
                <h3 className="text-5xl lg:text-7xl font-black text-white italic tracking-tighter leading-[0.9]">
                  CREATIVE<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">DEVELOPER</span>
                </h3>
              </div>

              <div className="space-y-6">
                {lines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.15, duration: 0.8 }}
                    className="flex items-start gap-5 group"
                  >
                    <div className="mt-2 h-2 w-2 rounded-full bg-blue-600 group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
                    <p className="text-zinc-300 text-lg lg:text-xl font-medium leading-relaxed">
                      {line}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* System Ready Indicator */}
              <div className="flex items-center gap-6 pt-6 border-t border-white/5">
                <div className="flex-1 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    style={{ width: useTransform(smoothProgress, [0.5, 1], ["0%", "100%"]) }}
                    className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,1)]"
                  />
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em]">SYS_READY // V.2025</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}