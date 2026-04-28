"use client";

import React from "react";
import { motion } from "framer-motion";

/** * Note: Add these to your layout.tsx or global CSS:
 * <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;1,500&family=Montserrat:wght@300;400;500&family=JetBrains+Mono:ital@0;1&display=swap" rel="stylesheet">
 */

type ProcessStep = {
  period: string;
  story: string;
  details: string[];
  techStack: string[];
};

const MY_JOURNEY: ProcessStep[] = [
  {
    period: "Year 01",
    story: "Deep-diving into the fundamental architecture of the web, moving from a curious observer to a creator.",
    details: [
      "Mastered the core pillars: HTML structure and CSS artistry.",
      "Developed logic-driven designs to bridge the gap from static to fluid.",
      "First steps into algorithms and computational thinking."
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "Algorithms"],
  },
  {
    period: "Year 02",
    story: "Focusing heavily on PHP and the Laravel ecosystem to build robust backends.",
    details: [
      "Advanced into software engineering with C# and .NET frameworks.",
      "Architected a robust 'Car Rental' ecosystem for my PFS project.",
      "Deepened back-end fluency with PHP and Laravel ecosystems."
    ],
    techStack: ["PHP", "Laravel", "C# / .NET", "MySQL"],
  },
  {
    period: "Year 03",
    story: "Merging technical engineering with high-fidelity visual art.",
    details: [
      "Integrated high-fidelity 3D models into browser logic.",
      "Engineered high-end interfaces with Three.js and Next.js.",
      "Merged engineering with visual art via Multimedia specialization."
    ],
    techStack: ["Three.js", "R3F", "Next.js", "3D Modeling"],
  },
];

export default function ConnectedLineage() {
  return (
    <section className="relative min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center py-24 overflow-hidden">
      
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay loop muted playsInline
          className="w-full h-full object-cover opacity-60 grayscale-0 brightness-75 blur-0"
        >
          <source src="/CODINGVID.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050505_100%)]" />
      </div>

      <header className="relative mb-24 text-center z-40">
        <h2 
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className="text-6xl md:text-8xl text-white font-light tracking-tight"
        >
          Academic Lineage<span className="text-[#4169E1]">.</span>
        </h2>
        <div className="w-32 h-px bg-[#4169E1] mx-auto mt-6 opacity-60" />
      </header>

      {/* Lined Layout Container */}
      <div className="relative z-30 w-full max-w-[1400px] px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-8 lg:gap-6">
          {MY_JOURNEY.map((step, i) => (
            <StoryCard key={i} step={step} index={i} />
          ))}
        </div>
      </div>

      {/* Decorative Connecting Line */}
      <div className="absolute top-[60%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4169E1]/20 to-transparent -translate-y-1/2 z-10 hidden lg:block" />
    </section>
  );
}

function StoryCard({ step, index }: { step: ProcessStep; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
      whileHover={{ y: -15 }}
      className="relative w-full lg:w-1/3 flex flex-col"
    >
      <div className="h-full bg-[#0d0d0d]/95 backdrop-blur-3xl border border-white/10 hover:border-[#4169E1]/50 rounded-2xl overflow-hidden transition-all duration-500 shadow-2xl flex flex-col">
        
        {/* Mac-style Top Bar */}
        <div className="bg-[#1a1a1a] px-5 py-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex gap-2.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-inner" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-inner" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-inner" />
          </div>
          <span 
            style={{ fontFamily: "'JetBrains Mono', monospace" }} 
            className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-bold"
          >
            Terminal.log_{index + 1}
          </span>
        </div>

        {/* Content Area */}
        <div className="p-8 lg:p-10 space-y-8 flex-grow flex flex-col">
          <div className="relative inline-block">
            <h3 
              style={{ 
                fontFamily: "'Cormorant Garamond', serif",
                color: "#4169E1"
              }}
              className="text-6xl font-medium italic leading-none mb-2"
            >
              {step.period}
            </h3>
            {/* Underline Element */}
            <div className="w-24 h-[2px] bg-[#4169E1]/40 mb-6" />
            
            <p 
              style={{ fontFamily: "'Montserrat', sans-serif" }} 
              className="text-[15px] leading-relaxed text-zinc-100 font-normal"
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-[#4169E1] font-bold text-xs mr-2">let</span> 
              narrative = <span className="text-orange-200/90 italic">"{step.story}"</span>;
            </p>
          </div>

          <div className="space-y-4 border-l-2 border-[#4169E1]/20 pl-6">
            {step.details.map((detail, idx) => (
              <div key={idx} className="flex gap-4 items-start group">
                <span 
                  style={{ fontFamily: "'JetBrains Mono', monospace" }} 
                  className="text-[12px] text-[#4169E1]/60 mt-1 transition-colors group-hover:text-[#4169E1]"
                >
                  //
                </span>
                <p 
                  style={{ fontFamily: "'Montserrat', sans-serif" }} 
                  className="text-[14px] leading-snug tracking-wide text-zinc-300 group-hover:text-white transition-colors duration-300"
                >
                  {detail}
                </p>
              </div>
            ))}
          </div>

          {/* Tech Stack Pills */}
          <div className="pt-6 flex flex-wrap gap-2 mt-auto">
            {step.techStack.map((tech) => (
              <span 
                key={tech} 
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                className="text-[10px] px-3 py-1.5 rounded-md border border-white/10 text-zinc-200 bg-white/5 hover:bg-[#4169E1]/10 hover:border-[#4169E1]/40 transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle Glow Effect */}
      <div className="absolute -inset-1 bg-[#4169E1]/10 blur-2xl -z-10 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}