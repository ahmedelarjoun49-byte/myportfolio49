"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

// ── FIX: Clean Next.js Native Font Injections ──
// This removes the need for `@import url(...)` in the style tag which breaks SSR/Framer sync.
import { Imperial_Script, Plus_Jakarta_Sans, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";

const imperialScript = Imperial_Script({ weight: "400", subsets: ["latin"] });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const cormorant = Cormorant_Garamond({ weight: ["300", "400"], style: ["italic", "normal"], subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"] });

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoHref: string;
  githubHref: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "Informations sur Excel.",
    description: "Un tableau de bord Streamlit personnalisé conçu pour analyser, filtrer et extraire des analyses visuelles claires à partir d'ensembles de données RH et financières d'entreprise complexes sans effort.",
    image: "/photooos/excelanalyz.png", 
    tags: ["Python", "Streamlit", "Pandas", "Data Analytics"],
    demoHref: "/projects",
    githubHref: "https://github.com/ahmedelarjoun49-byte/EFM_Streamlit_Python.git",
  },
  {
    id: "02",
    title: "SmartTodo IA.",
    description: "Une application native de gestion des tâches Android dotée d'une planification automatisée des tâches, d'un stockage SQLite local et d'une interface utilisateur fluide adaptée à la productivité quotidienne.",
    image: "/photooos/ai.png",
    tags: ["Android", "Kotlin / Java", "SQLite", "Core UI"],
    demoHref: "/projects",
    githubHref: "https://github.com/ahmedelarjoun49-byte/ToDo-APP-ahmed-el-arjoun-.git",
  },
];

interface Card3DProps {
  p: Project;
  index: number;
}

function Card3D({ p, index }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateXSpring = useSpring(0, { damping: 20, stiffness: 200 });
  const rotateYSpring = useSpring(0, { damping: 20, stiffness: 200 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const rX = ((clientY / height) - 0.5) * -12; 
    const rY = ((clientX / width) - 0.5) * 12;

    mouseX.set(clientX);
    mouseY.set(clientY);
    rotateXSpring.set(rX);
    rotateYSpring.set(rY);
  }

  function handleMouseLeave() {
    rotateXSpring.set(0);
    rotateYSpring.set(0);
  }

  const backgroundGlow = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(37, 99, 235, 0.15), transparent 80%)`;
  const borderGlow = useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(37, 99, 235, 0.4), transparent 70%)`;

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-[560px] md:h-[600px] flex flex-col rounded-2xl overflow-hidden bg-[#0a0d14]/90 backdrop-blur-xl border border-white/[0.04] hover:shadow-[0_30px_60px_rgba(29,78,216,0.12)] transition-all duration-500 cursor-pointer"
    >
      <motion.div 
        className="absolute inset-0 rounded-2xl pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ border: "1px solid transparent", backgroundImage: borderGlow, WebkitMaskImage: "linear-gradient(#fff, #fff), linear-gradient(#fff, #fff)", WebkitMaskComposite: "xor", maskComposite: "exclude" }}
      />

      <motion.div 
        className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: backgroundGlow }}
      />

      {/* ── IMAGE SECTION ── */}
      <div 
        style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }} 
        className="relative h-[48%] w-full overflow-hidden bg-[#04060a] border-b border-white/[0.03]"
      >
        {p.image && (
          <Image
            src={p.image}
            alt={p.title}
            fill
            sizes="(max-w-768px) 100vw, 50vw"
            priority={index === 0}
            className="object-cover opacity-75 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700 ease-out"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent opacity-80" />
      </div>

      {/* ── DETAILS SECTION ── */}
      <div 
        style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
        className="relative z-20 h-[52%] p-6 md:p-8 flex flex-col justify-between items-start bg-[#07090e]/95"
      >
        <div className="w-full" style={{ transform: "translateZ(10px)" }}>
          <div className="mb-4">
            <h3 
              className={`${cormorant.className} font-light italic leading-tight text-3xl sm:text-4xl text-white transform group-hover:translate-x-1 transition-transform duration-300`}
            >
              {p.title}
            </h3>
          </div>

          <p 
            className={`${plusJakarta.className} text-slate-400 text-xs sm:text-sm font-normal leading-relaxed max-w-md line-clamp-4 group-hover:text-slate-300 transition-colors duration-300`}
          >
            {p.description}
          </p>
        </div>

        {/* Footer Layout */}
        <div 
          style={{ transform: "translateZ(25px)" }}
          className="flex items-center justify-between w-full pt-5 border-t border-white/[0.05]"
        >
          <div className="flex flex-wrap gap-1.5 max-w-[60%]">
            {p.tags.map((tag) => (
              <span 
                key={tag} 
                className={`${jetbrains.className} px-2 py-0.5 rounded text-[9px] font-medium uppercase border border-white/[0.06] bg-white/[0.02] text-slate-400 tracking-wider`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs font-medium tracking-wide">
            <Link 
              href={p.demoHref} 
              className="text-slate-400 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:text-white"
            >
              Détails
            </Link>
            
            <a 
              href={p.githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75 hover:text-blue-300 font-semibold"
            >
              Dépôt Code
            </a>
          </div>
        </div>

      </div>
    </motion.article>
  );
}

export default function ProjectBanner() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-[#020408] text-white [perspective:1200px]">
      
      <div className="absolute top-0 right-0 w-[550px] md:w-[750px] h-[550px] md:h-[750px] bg-gradient-to-br from-blue-700/10 via-transparent to-transparent rounded-full blur-[130px] md:blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-blue-800/5 rounded-full blur-[110px] pointer-events-none z-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div className="space-y-3">
            <motion.h2 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`${cormorant.className} text-5xl sm:text-6xl md:text-7xl text-white font-light tracking-tight`}
            >
              Travaux récents<span className="text-blue-500">.</span>
            </motion.h2>
            <div className="w-16 h-[2px] bg-blue-600 opacity-80" />
          </div>
          
          <a 
            href="https://github.com/ahmedelarjoun49-byte" 
            target="_blank"
            rel="noopener noreferrer"
            className={`${imperialScript.className} group text-4xl text-blue-400 normal-case tracking-normal self-start md:self-auto select-none transition-colors duration-300 hover:text-blue-300 drop-shadow-[0_0_15px_rgba(37,99,235,0.2)]`}
          >
            visitez mon github 
          </a>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((p, index) => (
            <Card3D p={p} key={p.id} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}