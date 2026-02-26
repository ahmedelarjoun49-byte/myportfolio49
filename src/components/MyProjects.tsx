"use client";

import { projectData } from "@/data/projectData";
import Image from "next/image";
import React, { useRef } from "react";
import { ExternalLink, Github, Eye } from "lucide-react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const MyProjects = () => {
  return (
    <section className="pb-24 sm:pb-28 lg:pb-32 relative">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05),transparent_70%)] pointer-events-none" />

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 relative z-10">
        {projectData.map((item, index) => (
          <ProjectCard key={index} item={item} index={index} />
        ))}
      </div>

      {/* CTA Section - Clean Royale Blue */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-24 text-center"
      >
        <div className="relative group p-1 rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600/20 via-blue-400/20 to-blue-600/20 border border-blue-500/20 backdrop-blur-xl">
          <div className="bg-[#020617]/90 p-8 sm:p-12 rounded-[1.4rem]">
            <h3 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tighter uppercase">
              Ready to create <span className="text-blue-500">Magic?</span>
            </h3>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto font-medium">
              I am currently available for new opportunities and high-end collaborations.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:scale-105 active:scale-95"
              >
                Let's Talk
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

function ProjectCard({ item, index }: { item: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse movement for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });
  
  // Spotlight effect
  const spotlight = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(37,99,235,0.15), transparent 80%)`;

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[#030712] border border-blue-500/20 shadow-2xl transition-all duration-500 group-hover:border-blue-500/50">
        
        {/* Dynamic Spotlight */}
        <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ background: spotlight }} />

        {/* Image Section */}
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-2"
          />
          {/* Dark overlay that fades on hover */}
          <div className="absolute inset-0 bg-blue-950/20 group-hover:bg-transparent transition-colors duration-500" />
          
          {/* Floating Action Badge on Image */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            <div className="flex gap-4">
              <Link href={item.liveUrl} target="_blank" className="p-4 bg-blue-600 text-white rounded-full shadow-xl hover:scale-110 transition-transform">
                <Eye size={24} />
              </Link>
              <Link href={item.githubUrl} target="_blank" className="p-4 bg-white/10 backdrop-blur-md text-white rounded-full border border-white/20 hover:scale-110 transition-transform">
                <Github size={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 sm:p-10 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20">
              0{index + 1}
            </span>
            <div className="h-[1px] w-8 bg-blue-500/30" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">
              {item.status || "Completed"}
            </span>
          </div>

          <h3 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase group-hover:text-blue-400 transition-colors">
            {item.title}<span className="text-blue-600">.</span>
          </h3>

          <p className="text-slate-400 text-base leading-relaxed mb-8 font-medium line-clamp-2">
            {item.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {item.technologies.map((tech: string, i: number) => (
              <span 
                key={i}
                className="px-3 py-1 bg-blue-500/5 border border-blue-500/20 rounded-md text-[10px] font-bold text-blue-300 uppercase tracking-tighter"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center justify-between pt-6 border-t border-blue-500/10">
            <Link 
              href={item.liveUrl} 
              target="_blank" 
              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white group/btn"
            >
              <span className="group-hover/btn:mr-2 transition-all">View Project</span>
              <ExternalLink size={14} className="text-blue-500" />
            </Link>
            
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-slate-500 uppercase">Live</span>
            </div>
          </div>
        </div>

        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[50px] -mr-16 -mt-16 pointer-events-none" />
      </div>
    </motion.div>
  );
}

// Utility for Framer Motion templates
import { useMotionTemplate } from "framer-motion";