"use client";

import React, { useState } from "react";
import {
  motion,
  useMotionValue,
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
    focus: "Web Architecture",
    milestones: [
      "Mastered the core pillars: HTML structure and CSS artistry.",
      "Developed logic-driven designs to bridge the gap from static to fluid.",
      "First steps into algorithms and computational thinking.",
    ],
    skills: ["HTML5", "CSS3", "JavaScript", "Algorithms"],
  },
  {
    year: "Year 02",
    phase: "The Backend Shift",
    focus: "Systems & Logic",
    milestones: [
      "Advanced into software engineering with C# and .NET frameworks.",
      "Architected a robust 'Car Rental' ecosystem for my PFS project.",
      "Deepened back-end fluency with PHP and Laravel ecosystems.",
    ],
    skills: ["C# / .NET", "Laravel", "PHP", "MySQL"],
  },
  {
    year: "Year 03",
    phase: "Multimedia Mastery",
    focus: "3D Creative Web",
    milestones: [
      "Merged engineering with visual art via Multimedia specialization.",
      "Integrated high-fidelity 3D models into browser logic.",
      "Engineered high-end interfaces with Three.js and Next.js.",
    ],
    skills: ["Three.js", "R3F", "3D Modeling", "Next.js"],
  },
];

const SWIPE_THRESHOLD = 50;

export default function LicenceLineage() {
  const [cardIndex, setCardIndex] = useState(0);
  const dragX = useMotionValue(0);

  // Improved tactile swipe logic for phones
  const onDragEnd = (_: any, info: any) => {
    const projectedDistance = info.offset.x;

    if (projectedDistance < -SWIPE_THRESHOLD && cardIndex < LICENCE_PROCESS.length - 1) {
      setCardIndex((pv) => pv + 1);
    } else if (projectedDistance > SWIPE_THRESHOLD && cardIndex > 0) {
      setCardIndex((pv) => pv - 1);
    }
  };

  return (
    <section className="relative h-screen w-full bg-white dark:bg-[#020617] flex flex-col items-center justify-center overflow-hidden transition-colors duration-500">
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.03)_0%,_transparent_70%)] dark:bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.08)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <header className="absolute top-12 md:top-16 text-center z-20 space-y-3 px-4">
        <h2 className="text-5xl md:text-8xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase leading-none">
          Lineage<span className="text-blue-600">.</span>
        </h2>
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1px] w-8 md:w-12 bg-blue-600/20" />
          <p className="text-blue-600 dark:text-blue-400 font-mono text-[9px] md:text-[10px] tracking-[0.5em] uppercase font-black">
            The Path To Mastery
          </p>
          <div className="h-[1px] w-8 md:w-12 bg-blue-600/20" />
        </div>
      </header>

      {/* touch-none is critical for mobile horizontal swiping */}
      <div className="relative w-full max-w-7xl px-4 flex items-center justify-center touch-none">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ x: dragX }}
          animate={{ x: 0 }}
          onDragEnd={onDragEnd}
          className="flex gap-6 md:gap-12 items-center cursor-grab active:cursor-grabbing"
        >
          {LICENCE_PROCESS.map((step, i) => (
            <LineageCard 
              key={i} 
              step={step} 
              index={i} 
              activeCard={cardIndex} 
              onClick={() => setCardIndex(i)}
            />
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-16 flex items-center gap-8 z-20">
        <div className="flex gap-2.5">
          {LICENCE_PROCESS.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCardIndex(i)}
              animate={{ 
                width: cardIndex === i ? 48 : 12,
                backgroundColor: cardIndex === i ? "#2563eb" : "rgba(100,100,100,0.3)"
              }}
              className="h-1.5 rounded-full transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function LineageCard({ step, index, activeCard, onClick }: { step: ProcessStep; index: number; activeCard: number; onClick: () => void }) {
  const isVisible = index === activeCard;
  const offset = index - activeCard;

  return (
    <motion.div
      onClick={onClick}
      animate={{
        // restored the original layout values but kept them slightly tighter for mobile
        scale: isVisible ? 1 : 0.85, 
        x: `${offset * 5}%`,
        opacity: isVisible ? 1 : 0.5,
        rotateY: offset * 12,
        filter: isVisible ? "blur(0px)" : "blur(2px)",
        zIndex: isVisible ? 10 : 5 - Math.abs(offset),
      }}
      whileHover={{ 
        scale: isVisible ? 1.02 : 0.88,
        opacity: 1,
        filter: "blur(0px)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      // Adjusted width for mobile (85vw) vs desktop (500px)
      className={`relative w-[85vw] md:w-[500px] shrink-0 transition-all ${isVisible ? 'cursor-default' : 'cursor-pointer select-none'}`}
    >
      <div className="relative bg-white/70 dark:bg-zinc-950/60 backdrop-blur-2xl rounded-[2rem] md:rounded-[2.5rem] border border-zinc-200/50 dark:border-white/10 p-8 md:p-14 overflow-hidden shadow-2xl">
        
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/5 dark:bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-6 md:space-y-8 pointer-events-none">
          <header className="space-y-3">
            <div className="flex items-center gap-3">
               <span className="px-2 py-1 bg-blue-600 text-white text-[8px] font-black uppercase rounded-md tracking-tighter">
                {step.year}
              </span>
              <span className="text-zinc-400 dark:text-zinc-500 font-mono text-[9px] font-bold uppercase tracking-[0.2em]">
                {step.phase}
              </span>
            </div>
            
            <h3 className="text-2xl md:text-5xl font-black text-zinc-900 dark:text-white leading-[0.9] tracking-tighter uppercase">
              {step.focus.split(' ')[0]} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                {step.focus.split(' ').slice(1).join(' ')}
              </span>
            </h3>
          </header>

          <ul className="space-y-4">
            {step.milestones.map((m, idx) => (
              <li key={idx} className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                <p className="text-zinc-600 dark:text-zinc-400 text-[11px] md:text-sm font-medium leading-relaxed tracking-tight">
                  {m}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 pt-4">
            {step.skills.map((s) => (
              <span key={s} className="px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-blue-200 text-[7px] md:text-[8px] font-black uppercase tracking-widest border border-zinc-200/50 dark:border-white/10">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}