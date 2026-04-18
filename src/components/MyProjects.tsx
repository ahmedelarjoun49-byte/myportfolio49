"use client";

import { projectData } from "@/data/projectData";
import Image from "next/image";
import React, { useRef } from "react";
import { ExternalLink, Github, Eye, Sparkles, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  useMotionTemplate 
} from "framer-motion";

const MyProjects = () => {
  return (
    <section className="pb-32 relative overflow-hidden bg-transparent">
      {/* Dynamic Background Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[500px] bg-blue-500/5 blur-[140px] rounded-full pointer-events-none" />

      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 relative z-10 max-w-7xl mx-auto px-6">
        {projectData.map((item, index) => (
          <ProjectCard key={index} item={item} index={index} />
        ))}
      </div>

      {/* High-End CTA Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mt-40 max-w-6xl mx-auto px-6"
      >
        <div className="relative group overflow-hidden rounded-[3.5rem] p-[1px] bg-gradient-to-b from-white/20 to-transparent">
          <div className="relative z-10 bg-[#080808]/90 backdrop-blur-3xl rounded-[3.5rem] p-12 sm:p-24 text-center overflow-hidden">
            
            {/* CTA Background Sparkle */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08),transparent_70%)]" />
            
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative inline-flex p-4 rounded-2xl bg-blue-500/10 text-blue-400 mb-8"
            >
              <Sparkles size={32} />
            </motion.div>
            
            <h3 className="text-5xl sm:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
              HAVE A VISION? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-blue-500">
                LET'S BUILD IT.
              </span>
            </h3>
            
            <p className="text-gray-400 text-lg sm:text-xl mb-12 max-w-2xl mx-auto font-medium">
              I’m currently accepting select projects for 2026. If you’re looking for high-end creative development, let’s talk.
            </p>
            
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-4 px-12 py-6 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs overflow-hidden transition-all hover:pr-14"
            >
              <span className="relative z-10">Start a Project</span>
              <ArrowUpRight className="relative z-10 group-hover:rotate-45 transition-transform" size={18} />
              <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

function ProjectCard({ item, index }: { item: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the 3D tilt
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 25 });
  
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(59,130,246,0.15), transparent 80%)`;

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
      viewport={{ once: true }}
      style={{ rotateX, rotateY, perspective: 2000 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-[3rem] bg-[#0A0A0A] border border-white/[0.03] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:border-blue-500/40">
        
        {/* Hover Spotlight Layer */}
        <motion.div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: spotlight }} />

        {/* Media Container */}
        <div className="relative h-80 sm:h-[420px] overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
          />
          
          {/* Creative Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent opacity-90" />
          
          {/* Action Hub - Centered Buttons */}
          <div className="absolute inset-0 flex items-center justify-center translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
             <div className="flex gap-4 p-2 bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10">
                <Link href={item.liveUrl} target="_blank" className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-2xl font-bold text-xs uppercase tracking-tighter hover:bg-blue-500 hover:text-white transition-colors">
                  <Eye size={16} /> Live Demo
                </Link>
                <Link href={item.githubUrl} target="_blank" className="p-3 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-colors">
                  <Github size={20} />
                </Link>
             </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-10 sm:p-12 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em]">
                {item.category || "Development"}
              </span>
              <div className="h-[1px] w-8 bg-white/10" />
            </div>
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
                © 2026
            </span>
          </div>

          <h3 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase group-hover:text-blue-400 transition-colors duration-500">
            {item.title}
          </h3>

          <p className="text-gray-400 text-base leading-relaxed mb-10 font-medium line-clamp-2 max-w-md">
            {item.description}
          </p>

          {/* Tech Stack - Modern Pills */}
          <div className="flex flex-wrap gap-2 mb-12">
            {item.technologies.slice(0, 4).map((tech: string, i: number) => (
              <span 
                key={i}
                className="px-4 py-1.5 bg-neutral-900/50 border border-white/[0.05] rounded-full text-[10px] font-bold text-gray-300 uppercase tracking-tighter"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Persistent Footer CTA */}
          <Link 
            href={item.liveUrl} 
            target="_blank" 
            className="group/btn inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-white/60 hover:text-white transition-all"
          >
            Full Case Study 
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-white/10 group-hover/btn:border-blue-500 transition-colors">
               <ArrowUpRight size={14} className="group-hover/btn:text-blue-500" />
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default MyProjects;