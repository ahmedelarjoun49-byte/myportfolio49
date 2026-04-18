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
  name?: string;
};

export default function GraduationSplitReveal({
  src = "/mypicture.png",
  initialBgSrc = "/pictures/avatar11.jpg",
  staticBgSrc = "/photooos/micro3.png",
  subtitle = "Licence • Développement Multimédia 3D & Web",
  year = "2025",
  name = "Ahmed"
}: Props) {
  const containerRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    mass: 0.5,
  });

  // BACKGROUND LOGIC
  const initialOpacity = useTransform(p, [0, 0.2], [1, 0]);
  const campusOpacity = useTransform(p, [0.1, 0.3], [0, 1]);
  const campusBlur = useTransform(p, [0.1, 0.3], [12, 0]); 

  // REVEAL TIMING (Synced for both sides)
  const reveal = useTransform(p, [0.25, 0.5], [0, 1]);
  const contentOpacity = useTransform(p, [0.28, 0.45], [0, 1]);
  const liftY = useTransform(p, [0.25, 0.5], [50, 0]);

  return (
    <section ref={containerRef} className="relative h-[200vh] w-full bg-[#050505] antialiased">
      
      {/* 1. BACKGROUND LAYERS */}
      <div className="sticky top-0 z-0 h-screen w-full overflow-hidden">
        <motion.div style={{ opacity: initialOpacity }} className="absolute inset-0">
          <Image src={initialBgSrc} alt="Intro" fill className="object-cover brightness-[0.4]" priority />
        </motion.div>

        <motion.div 
          style={{ 
            opacity: campusOpacity, 
            filter: useMotionTemplate`blur(${campusBlur}px)`,
          }} 
          className="absolute inset-0 z-10"
        >
          <Image src={staticBgSrc} alt="Campus" fill className="object-cover" quality={100} />
          <div className="absolute inset-0 bg-black/70" />
        </motion.div>
      </div>

      {/* 2. STICKY STAGE */}
      <div className="sticky top-0 z-30 flex h-screen w-full items-center justify-center overflow-hidden">
        
        {/* OPTICAL CENTER FIX: lg:-mt-32 pulls content up */}
        <motion.div 
          style={{ opacity: contentOpacity, y: liftY }}
          className="relative w-full max-w-7xl px-8 lg:-mt-32"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20">
            
            {/* PHOTO CARD (Left Lane - Right Aligned) */}
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto lg:ml-auto lg:mr-0">
              <div className="absolute -inset-10 bg-blue-500/10 rounded-[44px] blur-3xl" />
              <div className="relative h-full w-full rounded-[44px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-3xl shadow-2xl">
                <Image src={src} alt={name} fill className="object-cover object-top" quality={100} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                
                <div className="absolute bottom-8 left-8">
                   <span className="rounded-full bg-blue-500/20 border border-blue-400/30 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-300">
                    {year} GRADUATE
                  </span>
                </div>
              </div>
            </div>

            {/* TEXT CONTENT (Right Lane - Left Aligned) */}
            <div className="w-full max-w-[480px] mx-auto lg:mr-auto lg:ml-0">
              <div className="rounded-[40px] border border-white/5 bg-black/40 p-10 lg:p-14 backdrop-blur-3xl shadow-2xl">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <div className="h-1.5 w-12 bg-blue-500 rounded-full" />
                    <h2 className="text-4xl font-black tracking-tighter text-white lg:text-6xl uppercase leading-none">
                      Licence
                    </h2>
                    <p className="text-blue-400 font-medium text-xl lg:text-2xl">
                        {subtitle.includes('•') ? subtitle.split('•')[1].trim() : subtitle}
                    </p>
                  </div>

                  <div className="space-y-4">
                     <p className="text-[17px] text-white/70 font-light leading-relaxed">
                        Mastered the craft of UI engineering and 3D web integration. 
                        Bridging the gap between immersive worlds and high-performance apps.
                     </p>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      style={{ width: reveal }} 
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400 origin-left"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}