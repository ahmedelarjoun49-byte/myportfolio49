"use client";

import React, { useMemo, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import SkillsLogoMarquee from "@/components/SkillsLogoMarquee";
import { Zap, Globe, Shield, Smartphone } from "lucide-react";

// --- Types ---
type SkillItem = { label: string; value: number };
type Category = {
  title: string;
  image: string;
  skills: SkillItem[];
};

function SkillRow({ label, value, delay = 0 }: { label: string; value: number; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-4">
      <div className="flex justify-between items-center">
        {/* FONT: Montserrat for clarity */}
        <span 
          style={{ fontFamily: "'Montserrat', sans-serif" }} 
          className="text-zinc-200 text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-white transition-colors duration-500"
        >
          {label}
        </span>
        {/* FONT: JetBrains Mono for data vibe */}
        <span 
          style={{ fontFamily: "'JetBrains Mono', monospace" }} 
          className="text-[#4169E1] text-xs font-black"
        >
          {value}%
        </span>
      </div>
      <div className="relative h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : {}}
          transition={{ duration: 2, delay, ease: [0.16, 1, 0.3, 1] }}
          className="absolute h-full bg-gradient-to-r from-[#4169E1] to-[#6495ED] z-10"
        />
      </div>
    </div>
  );
}

function SkillCard({ category, index }: { category: Category; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 100, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { stiffness: 100, damping: 25 });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ rotateX, rotateY, perspective: 1500 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay: index * 0.1 }}
      className="group relative flex flex-col rounded-[2rem] border border-white/10 bg-[#0a0a0a] overflow-hidden transition-all duration-1000 hover:border-[#4169E1]/40"
    >
      <div className="relative h-72 overflow-hidden">
        <Image 
          src={category.image} 
          alt={category.title} 
          fill 
          className="object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
        
        <div className="absolute bottom-8 left-8 z-20">
          {/* FONT: Cormorant Garamond for Artistic Titles */}
          <h3 
            style={{ fontFamily: "'Cormorant Garamond', serif" }} 
            className="text-5xl italic text-white font-light leading-none"
          >
            {category.title}
          </h3>
        </div>
      </div>

      <div className="p-10 space-y-10 bg-[#0a0a0a]/95 backdrop-blur-xl relative z-20">
        {category.skills.map((s, i) => (
          <SkillRow key={s.label} {...s} delay={i * 0.1} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const categories: Category[] = useMemo(() => [
    {
      title: "UI Artistry",
      image: "/photos11/webdesign.jpg",
      skills: [{ label: "Interface Architecture", value: 92 }, { label: "Spatial Logic", value: 85 }, { label: "Motion Systems", value: 80 }]
    },
    {
      title: "Systems",
      image: "/photos11/frontend.jpg",
      skills: [{ label: "Next.js Engine", value: 98 }, { label: "TypeScript", value: 90 }, { label: "Graphic Shaders", value: 75 }]
    },
    {
      title: "Core Dev",
      image: "/photos11/backend.jpg",
      skills: [{ label: "Server Runtime", value: 85 }, { label: "Database Logic", value: 82 }, { label: "API Integrity", value: 88 }]
    },
    {
      title: "Strategy",
      image: "/photos11/softskills.jpg",
      skills: [{ label: "Project Leadership", value: 90 }, { label: "Production Flow", value: 94 }, { label: "Rapid Deployment", value: 96 }]
    }
  ], []);

  return (
    <section id="skills" className="relative py-56 bg-[#050505] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#4169E1]/5 blur-[180px] rounded-full pointer-events-none" />

      {/* Marquee Section */}
      <div className="relative z-10 mb-64">
        <div className="flex flex-col items-center mb-20">
           <div className="h-20 w-[1px] bg-gradient-to-b from-transparent to-[#4169E1]" />
           {/* FONT: JetBrains Mono for a "Code" feel */}
           <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="mt-8 text-[10px] uppercase tracking-[0.5em] text-zinc-600 font-bold">
              Integrated Tech Stack
           </span>
        </div>
        <div className="relative opacity-40 hover:opacity-100 transition-opacity duration-1000 grayscale hover:grayscale-0">
          <SkillsLogoMarquee />
        </div>
      </div>

      <div className="container relative z-20 mx-auto max-w-[1700px] px-12">
        {/* Header Section */}
        <div className="mb-40 flex flex-col lg:flex-row lg:items-end justify-between gap-24">
          {/* FONT: Cormorant Garamond for Huge Headings */}
          <motion.h2 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-9xl md:text-[13rem] text-white font-light tracking-tighter leading-[0.8]"
          >
            The Craft<span className="text-[#4169E1]">.</span>
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="max-w-xl border-l border-[#4169E1]/30 pl-12"
          >
            {/* FONT: Montserrat for professional summary */}
            <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-zinc-400 text-2xl leading-relaxed font-light">
              A comprehensive <span className="text-white font-medium">technical summary</span> of full-stack engineering, high-fidelity <span className="text-white font-medium italic">design systems</span>, and architectural leadership.
            </p>
          </motion.div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-48">
          {categories.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} />
          ))}
        </div>

        {/* Philosophy / Capabilities Section */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="p-20 rounded-[3rem] bg-[#080808] border border-white/5 relative overflow-hidden"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-7xl text-white italic font-light">
                Capabilities
              </h3>
              {/* FONT: Montserrat for the body text */}
              <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-zinc-500 text-2xl leading-relaxed font-light">
                My professional skillset is built on a <span className="text-white">multi-disciplinary</span> foundation—leveraging systematic engineering to solve complex design challenges.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Shield, label: "Security" },
                { icon: Zap, label: "Optimization" },
                { icon: Globe, label: "Scalability" },
                { icon: Smartphone, label: "Experience" }
              ].map((item, idx) => (
                <div key={idx} className="p-10 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-[#4169E1]/20 transition-all group">
                  <item.icon className="text-[#4169E1] w-7 h-7 mb-6" />
                  {/* FONT: JetBrains Mono for the labels */}
                  <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.3em] block">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}