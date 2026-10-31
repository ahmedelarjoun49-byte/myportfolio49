"use client";

import { useRef } from "react";
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
    stiffness: 90,
    damping: 30,
    restDelta: 0.001,
  });

  // --- Cinematic 3D Transforms ---
  const photoZ = useTransform(smoothProgress, [0, 0.4], [0, -320]);
  const photoScale = useTransform(smoothProgress, [0, 0.4], [1, 0.86]);
  const photoOpacity = useTransform(smoothProgress, [0.3, 0.5], [1, 0]);
  const photoBlur = useTransform(smoothProgress, [0.2, 0.5], [0, 12]);

  const textZ = useTransform(smoothProgress, [0.3, 0.7], [320, 0]);
  const textY = useTransform(smoothProgress, [0.3, 0.7], [100, 0]);
  const textOpacity = useTransform(smoothProgress, [0.38, 0.58], [0, 1]);
  const textScale = useTransform(smoothProgress, [0.3, 0.7], [0.94, 1]);

  const bgRotation = useTransform(smoothProgress, [0, 1], [0, 15]);

  const lines = [
    "Bridging the gap between 3D visualization and modern web applications.",
    "Specialized in high-performance React architectures and fluid UI motion.",
    "Transforming complex engineering foundations into seamless experiences.",
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative h-[300vh] w-full bg-[#030712] text-slate-100 antialiased overflow-hidden select-none"
      style={{ perspective: "1600px" }}
    >
      {/* Subtle Ambient Background Glow */}
      <motion.div 
        style={{ rotate: bgRotation }}
        className="fixed inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none"
      >
        <div className="h-[700px] w-[700px] rounded-full bg-blue-600/10 blur-[140px]" />
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
          className="absolute z-20 w-full max-w-[400px] px-6"
        >
          <div className="group relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl">
            <Image 
              src={src} 
              alt="Portrait" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
              priority 
            />
            
            {/* Clean Bottom Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
            
            {/* Floating Info Tag */}
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-xl">
              <span className="text-[10px] font-mono tracking-[0.3em] text-blue-400 uppercase block mb-1">
                Class of {year}
              </span>
              <h2 className="text-white font-medium text-sm sm:text-base leading-snug tracking-tight">
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
          className="absolute z-50 w-full max-w-[620px] px-6"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/80 p-8 sm:p-12 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.6)]">
            
            {/* Soft Corner Accent Light */}
            <div className="absolute -top-20 -right-20 h-56 w-56 bg-blue-500/10 blur-[90px] pointer-events-none" />
            
            <div className="relative space-y-8">
              
              {/* Header Title Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]" />
                  <span className="text-[11px] font-mono font-semibold tracking-[0.25em] text-blue-400 uppercase">
                    Developer Profile
                  </span>
                </div>
                <h3 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none pt-1">
                  CREATIVE <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                    DEVELOPER
                  </span>
                </h3>
              </div>

              {/* Bullet Points */}
              <div className="space-y-4">
                {lines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                    className="flex items-start gap-3.5 text-slate-300 text-base sm:text-lg font-normal leading-relaxed"
                  >
                    <span className="text-blue-500 font-mono text-sm mt-0.5">0{i + 1}.</span>
                    <p>{line}</p>
                  </motion.div>
                ))}
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[11px] font-mono text-slate-500 uppercase tracking-widest">
                <span>System Ready</span>
                <span className="text-blue-400">V.{year}</span>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}