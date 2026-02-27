"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

type ProcessStep = {
  year: string;
  phase: string;
  focus: string;
  milestones: string[];
  skills: string[];
};

const LICENCE_PROCESS: ProcessStep[] = [
  {
    year: "Year 01",
    phase: "The Foundation",
    focus: "Web Basics & First Logic",
    milestones: [
      "Took my first steps into the world of web development.",
      "Mastered the core pillars: building structures with HTML and styling with CSS.",
      "Developed my first working logic to bring static designs to life.",
    ],
    skills: ["HTML5", "CSS3", "JavaScript", "Algorithms"],
  },
  {
    year: "Year 02",
    phase: "The Backend Shift",
    focus: "Application Logic & Databases",
    milestones: [
      "Advanced into software development with C# and the .NET framework.",
      "Built a fully functional 'Location de Voitures' application for my PFS.",
      "Deepened my web knowledge by learning PHP and the Laravel framework.",
    ],
    skills: ["C# / .NET", "Laravel", "PHP", "MySQL"],
  },
  {
    year: "Year 03",
    phase: "Multimedia Mastery",
    focus: "3D Creative Web Development",
    milestones: [
      "Switched focus to Multimedia to merge creativity with engineering.",
      "Learned to integrate complex 3D models directly into web interfaces.",
      "Built my first high-end website using JS technologies for 3D rendering.",
    ],
    skills: ["Three.js", "React Three Fiber", "3D Modeling", "Next.js"],
  },
];

export default function LicenceProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"] 
  });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-white dark:bg-[#020617] transition-colors duration-700"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1e40af15,transparent_50%)] pointer-events-none hidden dark:block" />

      <div className="max-w-6xl mx-auto px-6 py-20">
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-5xl md:text-8xl font-black text-black dark:text-white tracking-tighter uppercase leading-none">
              EVOLUTION<span className="text-blue-600">.</span>
            </h2>
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-12 bg-blue-600" />
              <p className="text-zinc-500 dark:text-blue-400/50 font-mono text-xs uppercase tracking-[0.3em]">
                The 3-Year Licence Pathway
              </p>
            </div>
          </motion.div>
        </header>

        <div className="relative flex flex-col items-center gap-4">
          {LICENCE_PROCESS.map((step, i) => {
            // Re-calculated stack logic for 1 -> 2 -> 3 order
            const targetScale = 1 - ((LICENCE_PROCESS.length - i) * 0.05); 
            return (
              <ProcessCard 
                key={i} 
                index={i} 
                progress={scrollYProgress} 
                range={[i * 0.25, 1]} 
                targetScale={targetScale}
                {...step} 
              />
            );
          })}
        </div>
      </div>
      <div className="h-[20vh]" />
    </section>
  );
}

interface CardProps extends ProcessStep {
  index: number;
  progress: any;
  range: [number, number];
  targetScale: number;
}

function ProcessCard({ 
  index, 
  year, 
  phase, 
  focus, 
  milestones, 
  skills,
  progress,
  range,
  targetScale
}: CardProps) {
  const container = useRef(null);
  const stackScale = useTransform(progress, range, [1, targetScale]);

  return (
    <div 
      ref={container} 
      className="sticky top-[12vh] w-full flex items-center justify-center mb-16"
      style={{ zIndex: index }}
    >
      <motion.div 
        style={{ scale: stackScale }}
        className="group relative overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] p-[1.5px] w-full max-w-5xl shadow-2xl"
      >
        {/* SPINNING BLUE CONTOUR EFFECT */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#2563eb_20%,transparent_40%,#1d4ed8_70%,transparent_100%)] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* MAIN BODY */}
        <div className="relative bg-zinc-50 dark:bg-gradient-to-b dark:from-[#0b1222] dark:to-[#020617] rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-14 h-full w-full border border-white/10 dark:border-blue-500/10 backdrop-blur-3xl">
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-blue-600 dark:text-blue-400 font-mono text-xs font-bold uppercase tracking-widest">
                  {year} — {phase}
                </span>
                <div className="h-px w-8 bg-zinc-200 dark:bg-blue-500/20" />
              </div>
              <h3 className="text-3xl md:text-6xl font-black text-zinc-900 dark:text-slate-50 tracking-tighter leading-tight">
                {focus}
              </h3>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-10">
            <ul className="md:col-span-8 space-y-6">
              {milestones.map((bullet, idx) => (
                <li key={idx} className="flex gap-4 text-zinc-600 dark:text-slate-300 text-sm md:text-xl font-medium leading-relaxed">
                  <span className="text-blue-600 dark:text-blue-500 flex-shrink-0 mt-1.5">✦</span>
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="md:col-span-4 flex flex-col justify-end">
              <p className="text-[10px] font-black text-zinc-400 dark:text-blue-500/50 uppercase tracking-widest mb-4 md:text-right">Tech Stack</p>
              <div className="flex flex-wrap gap-2 md:justify-end">
                {skills.map((s) => (
                  <span 
                    key={s} 
                    className="px-4 py-2 rounded-xl bg-white dark:bg-blue-600/5 border border-zinc-200 dark:border-blue-400/20 text-zinc-500 dark:text-blue-300 text-[10px] font-bold uppercase tracking-tight shadow-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}