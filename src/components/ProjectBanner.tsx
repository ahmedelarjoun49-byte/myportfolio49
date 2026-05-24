"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Smartphone, FileSpreadsheet, Github } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

const projects = [
  {
    id: "01",
    title: "Excel Insights.",
    description: "A custom Streamlit dashboard built to parse, filter, and extract clear visual analytics from complex HR and corporate financial datasets effortlessly.",
    image: "/photooos/excelanalyz.png", 
    tags: ["Python", "Streamlit", "Pandas", "Data Analytics"],
    demoHref: "/projects",
    githubHref: "https://github.com/ahmedelarjoun49-byte/EFM_Streamlit_Python.git",
    icon: <FileSpreadsheet size={18} />,
  },
  {
    id: "02",
    title: "SmartTodo AI.",
    description: "A native Android task management app featuring automated task scheduling, local SQLite storage, and a fluid user interface tailored for daily productivity.",
    image: "/photooos/ai.png",
    tags: ["Android Studio", "Kotlin / Java", "SQLite", "Core UI"],
    demoHref: "/projects",
    githubHref: "https://github.com/ahmedelarjoun49-byte/ToDo-APP-ahmed-el-arjoun-.git",
    icon: <Smartphone size={18} />,
  },
];

function Card3D({ p, index }: { p: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateXSpring = useSpring(0, { damping: 25, stiffness: 150 });
  const rotateYSpring = useSpring(0, { damping: 25, stiffness: 150 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const rX = ((clientY / height) - 0.5) * -15; 
    const rY = ((clientX / width) - 0.5) * 15;

    mouseX.set(clientX);
    mouseY.set(clientY);
    rotateXSpring.set(rX);
    rotateYSpring.set(rY);
  }

  function handleMouseLeave() {
    rotateXSpring.set(0);
    rotateYSpring.set(0);
  }

  const backgroundGlow = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, rgba(65, 105, 225, 0.15), transparent 80%)`;
  const borderGlow = useMotionTemplate`radial-gradient(180px circle at ${mouseX}px ${mouseY}px, rgba(65, 105, 225, 0.4), transparent 70%)`;

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-[480px] sm:h-[520px] md:h-[560px] flex flex-col rounded-3xl overflow-hidden bg-[#0d0d0d]/90 backdrop-blur-3xl transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(65,105,225,0.15)] cursor-pointer"
    >
      <motion.div 
        className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none z-30 transition-colors"
        style={{ backgroundImage: borderGlow }}
      />

      <motion.div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: backgroundGlow }}
      />

      <div 
        style={{ transform: "translateZ(-20px)" }} 
        className="absolute inset-0 z-0 bg-[#080808]"
      >
        {p.image && (
          <Image
            src={p.image}
            alt={p.title}
            fill
            sizes="(max-w-768px) 100vw, 50vw"
            priority={index === 0}
            className="object-cover opacity-[0.55] group-hover:opacity-[0.75] group-hover:scale-[1.03] transition-all duration-700 filter contrast-[1.08] brightness-[0.95]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/85 to-transparent/30" />
      </div>

      <div 
        style={{ transform: "translateZ(30px)" }}
        className="relative z-20 h-full p-6 sm:p-8 lg:p-10 flex flex-col justify-end items-start transition-transform duration-500"
      >
        <div className="flex items-center mb-5 sm:mb-6 transform group-hover:translate-y-[-4px] transition-transform duration-500">
          <span className="p-2.5 rounded-xl bg-[#121212]/95 text-[#4169E1] border border-white/10 shadow-lg group-hover:border-[#4169E1]/40 transition-colors">
            {p.icon}
          </span>
        </div>

        <h3 
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className="font-medium italic leading-none mb-3 sm:mb-4 text-3xl sm:text-4xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] transform group-hover:translate-y-[-2px] transition-transform duration-500"
        >
          {p.title}
        </h3>

        <p className="text-zinc-300 text-sm sm:text-[15px] font-normal leading-relaxed mb-6 sm:mb-8 max-w-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          {p.description}
        </p>

        <div className="flex items-center justify-between w-full mt-auto pt-5 border-t border-white/10 transform group-hover:border-white/20 transition-colors duration-500">
          <div className="flex flex-wrap gap-1.5 max-w-[65%] sm:max-w-[70%]">
            {p.tags.map((tag) => (
              <span 
                key={tag} 
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                className="px-2.5 py-1 rounded-md text-[9px] font-medium uppercase border border-white/10 bg-white/5 text-zinc-300 backdrop-blur-md group-hover:border-[#4169E1]/20 transition-colors duration-500"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link 
              href={p.demoHref} 
              title="View Project Details"
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-[#121212] text-white border border-white/5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:text-[#4169E1] hover:border-[#4169E1]/30 shadow-md"
            >
              <Github size={16} className="sm:w-[18px] sm:h-[18px]" />
            </Link>
            
            <a 
              href={p.githubHref}
              target="_blank"
              rel="noopener noreferrer"
              title="Open GitHub Repository"
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-[#4169E1] text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 font-bold tracking-tight shadow-lg shadow-[#4169E1]/20 hover:bg-[#3156cd]"
            >
              <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
            </a>
          </div>
        </div>

      </div>
    </motion.article>
  );
}

export default function ProjectBanner() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-[#050505] text-white transition-colors duration-500 [perspective:1000px]">
      
      <div className="absolute top-0 right-0 w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-gradient-to-br from-[#4169E1]/15 via-[#4169E1]/5 to-transparent rounded-full blur-[120px] md:blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#4169E1]/5 rounded-full blur-[100px] md:blur-[130px] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-5xl sm:text-6xl md:text-8xl text-white font-light tracking-tight"
            >
              Recent Work<span className="text-[#4169E1]">.</span>
            </motion.h2>
            <div className="w-24 h-px bg-[#4169E1] opacity-60 mt-2" />
          </div>
          
          {/* UPDATED: Playful, flashing link styled to match home creative accents */}
          <a 
            href="https://github.com/ahmedelarjoun49-byte" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "'Imperial Script', cursive" }}
            className="group flex items-center gap-1 text-3xl md:text-4xl text-blue-400 normal-case tracking-normal self-start md:self-auto select-none animate-strobe-glow drop-shadow-[0_0_15px_rgba(65,105,225,0.4)]"
          >
            visit my github 
            <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300 text-blue-400 pt-1" />
          </a>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((p, index) => (
            <Card3D p={p} key={p.id} index={index} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Imperial+Script&display=swap');

        @keyframes strobe-glow {
          0%, 100% {
            opacity: 1;
            filter: drop-shadow(0 0 15px rgba(65, 105, 225, 0.5)) brightness(1.2);
          }
          50% {
            opacity: 0.5;
            filter: drop-shadow(0 0 2px rgba(65, 105, 225, 0.1)) brightness(0.8);
          }
        }

        .animate-strobe-glow {
          animation: strobe-glow 2.5s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}