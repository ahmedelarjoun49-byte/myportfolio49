"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

type ExpItem = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  tech: string[];
};

const EXPERIENCE: ExpItem[] = [
  {
    company: "Your Company",
    role: "Frontend Developer",
    period: "2024 — Present",
    bullets: [
      "Built responsive UI using Next.js + Tailwind.",
      "Added smooth motion + micro-interactions across the site.",
      "Focused on clean architecture and reusable components.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    company: "Freelance",
    role: "Web Developer",
    period: "2023 — 2024",
    bullets: [
      "Delivered landing pages + dashboards for clients.",
      "Converted designs into modern responsive Tailwind systems.",
      "Focused on UI polish, animations and accessibility basics.",
    ],
    tech: ["React", "Next.js", "Tailwind", "Animations"],
  },
  {
    company: "University / Projects",
    role: "IoT + Web Projects",
    period: "2022 — 2023",
    bullets: [
      "Built projects combining web UI and IoT concepts.",
      "Learned APIs, auth basics, and data flow foundations.",
      "Improved code quality through iteration and refactoring.",
    ],
    tech: ["JavaScript", "TypeScript", "Firebase"],
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"] 
  });

  return (
    <section 
      ref={containerRef} 
      // DARK MODE: Deep Navy/Royal Base
      className="relative w-full bg-white dark:bg-[#020617] transition-colors duration-700"
    >
      {/* Subtle Royal Blue Glow Nuance (Dark Mode Only) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1e40af15,transparent_50%)] pointer-events-none hidden dark:block" />

      <div className="max-w-6xl mx-auto px-6 py-20">
        <header className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-5xl md:text-8xl font-black text-black dark:text-white tracking-tighter uppercase">
              Experience<span className="text-blue-600">.</span>
            </h2>
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-12 bg-blue-600" />
              <p className="text-zinc-500 dark:text-blue-400/50 font-mono text-xs uppercase tracking-[0.3em]">
                The Professional Journey
              </p>
            </div>
          </motion.div>
        </header>

        {/* Tighter Card Container */}
        <div className="relative flex flex-col items-center gap-4">
          {EXPERIENCE.map((exp, i) => {
            const targetScale = 1 - ((EXPERIENCE.length - i) * 0.05); 
            return (
              <Card 
                key={i} 
                index={i} 
                progress={scrollYProgress} 
                range={[i * 0.2, 1]} 
                targetScale={targetScale}
                {...exp} 
              />
            );
          })}
        </div>
      </div>
      {/* Smaller buffer since cards are closer now */}
      <div className="h-[10vh]" />
    </section>
  );
}

interface CardProps extends ExpItem {
  index: number;
  progress: any;
  range: [number, number];
  targetScale: number;
}

function Card({ 
  index, 
  company, 
  role, 
  period, 
  bullets, 
  tech,
  progress,
  range,
  targetScale
}: CardProps) {
  const container = useRef(null);
  
  // Logic to stack cards closer: Reduced height and sticky top
  const stackScale = useTransform(progress, range, [1, targetScale]);

  return (
    <div 
      ref={container} 
      // Adjusted sticky top and height to pull cards closer
      className="sticky top-[10vh] md:top-[15vh] w-full flex items-center justify-center mb-12"
      style={{ zIndex: index }}
    >
      <motion.div 
        style={{ scale: stackScale }}
        className="group relative overflow-hidden rounded-[2rem] md:rounded-[3rem] p-[1.5px] w-full max-w-5xl shadow-2xl"
      >
        {/* ROYAL BLUE CONTOUR (Visible on hover or dark mode focus) */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#2563eb_30%,transparent_50%,#1d4ed8_80%,transparent_100%)] opacity-20 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* MAIN BODY: Royale Nuance Background */}
        <div className="relative bg-zinc-50 dark:bg-gradient-to-b dark:from-[#0f172a] dark:to-[#020617] rounded-[2rem] md:rounded-[3rem] p-8 md:p-14 h-full w-full border border-white/10 dark:border-blue-500/10">
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-blue-600 dark:text-blue-400 font-mono text-xs font-bold uppercase tracking-widest">
                  {company}
                </span>
                <div className="h-px w-8 bg-zinc-200 dark:bg-blue-500/20" />
              </div>
              <h3 className="text-4xl md:text-7xl font-bold text-zinc-900 dark:text-slate-50 tracking-tighter leading-none">
                {role}
              </h3>
            </div>
            
            <div className="bg-zinc-100 dark:bg-blue-600/10 px-5 py-2 rounded-2xl border border-zinc-200 dark:border-blue-500/20 backdrop-blur-sm">
              <p className="text-zinc-600 dark:text-blue-200 font-mono text-xs md:text-sm font-bold">
                {period}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-10">
            <ul className="md:col-span-8 space-y-4">
              {bullets.map((bullet, idx) => (
                <li key={idx} className="flex gap-4 text-zinc-600 dark:text-slate-300 text-sm md:text-xl font-medium leading-relaxed">
                  <span className="text-blue-600 dark:text-blue-500 flex-shrink-0">✦</span>
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="md:col-span-4 flex flex-col justify-end">
              <div className="flex flex-wrap gap-2 md:justify-end">
                {tech.map((t) => (
                  <span 
                    key={t} 
                    className="px-4 py-2 rounded-xl bg-white dark:bg-blue-900/20 border border-zinc-200 dark:border-blue-400/20 text-zinc-500 dark:text-blue-300 text-[10px] font-bold uppercase tracking-tight shadow-sm"
                  >
                    {t}
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