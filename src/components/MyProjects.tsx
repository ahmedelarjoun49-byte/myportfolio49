"use client";

import { projectData } from "@/data/projectData";
import Image from "next/image";
import React, { useRef } from "react";
import { Github, Eye, Sparkles, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const MyProjects = () => {
  return (
    <section className="py-32 relative bg-transparent">
      {/* Ambient background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] -right-[10%] w-[30%] h-[30%] bg-indigo-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-32">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-500 font-black tracking-[0.4em] text-[10px] uppercase block mb-4"
          >
            Selected Works
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter"
          >
            CRAFTING DIGITAL <br /> <span className="text-zinc-500">EXPERIENCES.</span>
          </motion.h2>
        </div>

        {/* Projects List - Vertical Feature Layout */}
        <div className="flex flex-col gap-40 md:gap-64">
          {projectData.map((item, index) => (
            <ProjectRow key={index} item={item} index={index} />
          ))}
        </div>

        {/* Minimal High-End CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-64 text-center"
        >
          <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent w-full max-w-4xl mb-20" />
          <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-12">
            Ready to start your <span className="italic text-blue-500">next chapter?</span>
          </h3>
          <Link
            href="/contact"
            className="inline-flex items-center gap-6 px-10 py-5 bg-white text-black rounded-full font-bold uppercase text-[11px] tracking-widest hover:scale-105 transition-transform"
          >
            Get in touch <ArrowUpRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

function ProjectRow({ item, index }: { item: any; index: number }) {
  const container = useRef(null);
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  return (
    <div ref={container} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}>
      
      {/* Media Column */}
      <motion.div 
        style={{ scale }}
        className="relative w-full md:w-[60%] aspect-[16/10] group cursor-pointer"
      >
        <div className="absolute inset-0 bg-blue-600 rounded-[2rem] translate-x-4 translate-y-4 -z-10 opacity-0 group-hover:opacity-20 transition-all duration-500" />
        <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] border border-white/5 bg-zinc-900 shadow-2xl">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-6">
            <Link href={item.liveUrl} target="_blank" className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform">
              <Eye size={24} />
            </Link>
            <Link href={item.githubUrl} target="_blank" className="p-4 bg-zinc-800 text-white rounded-full hover:scale-110 transition-transform">
              <Github size={24} />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Content Column */}
      <motion.div style={{ y }} className="w-full md:w-[40%] flex flex-col items-start">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-blue-500 font-bold text-[10px] uppercase tracking-widest">
            {item.category || "Project"}
          </span>
          <span className="h-px w-8 bg-zinc-800" />
          <span className="text-zinc-600 font-bold text-[10px]">0{index + 1}</span>
        </div>

        <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter uppercase leading-none">
          {item.title}
        </h3>

        <p className="text-zinc-400 text-lg leading-relaxed mb-8">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {item.technologies.map((tech: string, i: number) => (
            <span key={i} className="text-[10px] font-bold text-zinc-500 uppercase border border-zinc-800 px-3 py-1 rounded-md">
              {tech}
            </span>
          ))}
        </div>

        <Link 
          href={item.liveUrl} 
          target="_blank"
          className="group flex items-center gap-4 text-white font-bold text-xs uppercase tracking-[0.3em] transition-all"
        >
          View Project
          <span className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
            <ArrowUpRight size={16} />
          </span>
        </Link>
      </motion.div>
    </div>
  );
}

export default MyProjects;