"use client";

import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import SkillsLogoMarquee from "@/components/SkillsLogoMarquee";
import { Code, Palette, Database, Users, Zap, Smartphone, Globe, Shield, Terminal, Cpu, Layers, Sparkles } from "lucide-react";

// --- Types ---
type SkillItem = { label: string; value: number };
type Category = {
  title: string;
  icon: React.ElementType;
  accent: string;
  image: string;
  skills: SkillItem[];
  description: string;
};

// --- Sub-Components ---

function SkillRow({ label, value, accent, delay = 0 }: { label: string; value: number; accent: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-[11px] font-black uppercase tracking-widest opacity-70">
        <span className="text-slate-400 dark:text-slate-500">{label}</span>
        <span className="text-slate-900 dark:text-white tabular-nums">{value}%</span>
      </div>
      <div className="relative h-[4px] w-full rounded-full bg-slate-200 dark:bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : {}}
          transition={{ duration: 1.5, delay, ease: [0.19, 1, 0.22, 1] }}
          className={`absolute h-full rounded-full bg-gradient-to-r ${accent} z-10`}
        />
      </div>
    </div>
  );
}

function SkillCard({ category, index }: { category: Category; index: number }) {
  const Icon = category.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt effect logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  function onMouseMove(e: React.MouseEvent) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative flex flex-col rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0a0b] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_80px_-20px_rgba(37,99,235,0.2)]"
    >
      {/* 1. Spatial Image Header */}
      <div className="relative h-44 overflow-hidden">
        <Image src={category.image} alt="" fill className="object-cover scale-105 group-hover:scale-125 group-hover:rotate-2 transition-all duration-1000 ease-out" />
        <div className={`absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/40 to-transparent`} />
        
        {/* Floating Icon Badge */}
        <div className="absolute bottom-4 left-6 flex items-center gap-3 z-20">
          <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${category.accent} shadow-lg ring-1 ring-white/20`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-black text-white text-xl tracking-tighter uppercase">{category.title}</h3>
            <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">{category.description}</p>
          </div>
        </div>
      </div>

      {/* 2. Interactive Spotlight Background */}
      <motion.div 
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(600px circle at ${Number(x) * 100 + 50}% ${Number(y) * 100 + 50}%, rgba(59, 130, 246, 0.1), transparent 40%)`
          )
        }}
      />

      {/* 3. Skills Content */}
      <div className="p-8 space-y-6 relative z-20">
        {category.skills.map((s, i) => (
          <SkillRow key={s.label} {...s} accent={category.accent} delay={i * 0.1} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const categories: Category[] = useMemo(() => [
    {
      title: "UI Artistry",
      description: "Visual Experience",
      icon: Palette,
      accent: "from-indigo-500 to-purple-600",
      image: "/photos11/webdesign.jpg",
      skills: [{ label: "User Interface", value: 92 }, { label: "Spatial Design", value: 85 }, { label: "Motion Graphics", value: 80 }]
    },
    {
      title: "Systems",
      description: "Frontend Architecture",
      icon: Cpu,
      accent: "from-blue-600 to-cyan-500",
      image: "/photos11/frontend.jpg",
      skills: [{ label: "Next.js Engine", value: 98 }, { label: "TypeScript", value: 90 }, { label: "Shader Programming", value: 75 }]
    },
    {
      title: "Core Dev",
      description: "Backend & Logic",
      icon: Terminal,
      accent: "from-emerald-500 to-teal-400",
      image: "/photos11/backend.jpg",
      skills: [{ label: "Node.js Environment", value: 85 }, { label: "Scalable DBs", value: 82 }, { label: "API Integrity", value: 88 }]
    },
    {
      title: "Execution",
      description: "Project Leadership",
      icon: Sparkles,
      accent: "from-amber-500 to-orange-600",
      image: "/photos11/softskills.jpg",
      skills: [{ label: "Technical Lead", value: 90 }, { label: "Creative Strategy", value: 94 }, { label: "Fast Delivery", value: 96 }]
    }
  ], []);

  return (
    <section id="skills" className="relative py-32 bg-white dark:bg-[#030303] overflow-hidden">
      
      {/* 1. Backdrop Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* 2. Brand Marquee with Custom Perspective */}
      <div className="relative z-10 mb-32">
        <div className="flex justify-center mb-12">
           <div className="px-4 py-1 rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Industry Standard Tech Stack</span>
           </div>
        </div>
        
        <div className="relative [perspective:2000px] rotate-x-12">
          <SkillsLogoMarquee />
        </div>
      </div>

      <div className="container relative z-20 mx-auto max-w-7xl px-6">
        {/* 3. Hero Header Section */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-[1px] w-12 bg-blue-500" />
            <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-xs">Capabilities</span>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-7xl md:text-9xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.8]"
            >
              CRAFT<span className="text-blue-600">.</span>
            </motion.h2>
            <p className="max-w-md text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed border-l-2 border-blue-500/20 pl-6">
              Engineering digital products where performance meets aesthetics. I build systems that don't just work—they feel alive.
            </p>
          </div>
        </div>

        {/* 4. The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} />
          ))}
        </div>

        {/* 5. Dark "Bento" Feature Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-24 group relative p-12 rounded-[3.5rem] bg-[#080808] border border-white/5 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 text-blue-400">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">Engineering <br/> Philosophy</h3>
              <p className="text-slate-400 text-xl leading-relaxed">
                My process is a feedback loop between <span className="text-white font-bold">Design Thinking</span> and <span className="text-white font-bold">Hard Engineering</span>. I don't compromise on speed, and I never settle for average visuals.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Shield, label: "Bulletproof Security" },
                { icon: Zap, label: "Performance First" },
                { icon: Globe, label: "Global Scale" },
                { icon: Smartphone, label: "Native Feel" }
              ].map((item, idx) => (
                <div key={idx} className="group/item flex flex-col gap-4 p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.08] transition-all">
                  <item.icon className="text-blue-500 w-8 h-8 group-hover/item:scale-110 transition-transform" />
                  <span className="text-white font-bold tracking-tight">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}