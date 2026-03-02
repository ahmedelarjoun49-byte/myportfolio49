"use client";

import { projectData } from "@/data/projectData";
import Image from "next/image";
import React, { useRef } from "react";
import { ExternalLink, Github, Eye, Sparkles } from "lucide-react";
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
    <section className="pb-32 relative overflow-hidden">
      {/* Background Ambience - Matches your Hero/Graduation sections */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none opacity-50" />

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 relative z-10 max-w-7xl mx-auto px-6">
        {projectData.map((item, index) => (
          <ProjectCard key={index} item={item} index={index} />
        ))}
      </div>

      {/* CTA Section - Dark & Deep Glassmorphism */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-32 max-w-5xl mx-auto px-6"
      >
        <div className="relative group overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-2xl shadow-2xl">
          {/* Animated glow inside CTA */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/20 blur-[80px] group-hover:bg-blue-600/40 transition-colors duration-700" />
          
          <div className="relative z-10 p-10 sm:p-20 text-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="inline-block mb-6 text-blue-500"
            >
              <Sparkles size={40} />
            </motion.div>
            
            <h3 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tighter uppercase leading-none">
              Ready to create <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                the future?
              </span>
            </h3>
            
            <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto font-light leading-relaxed">
              I am currently available for new opportunities and high-end multimedia collaborations.
            </p>
            
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40 hover:scale-105 active:scale-95"
            >
              Start a Conversation <ExternalLink size={14} />
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

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 100, damping: 20 });
  
  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(37,99,235,0.12), transparent 80%)`;

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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{ rotateX, rotateY, perspective: 1500 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[#050505] border border-white/5 shadow-2xl transition-all duration-700 group-hover:border-blue-500/30">
        
        {/* Dynamic Interactive Spotlight */}
        <motion.div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: spotlight }} />

        {/* Image Display */}
        <div className="relative h-72 sm:h-96 overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Subtle Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
          
          {/* Hover Overlay Buttons */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm bg-blue-900/10">
            <div className="flex gap-6">
              <Link href={item.liveUrl} target="_blank" className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                <Eye size={28} />
              </Link>
              <Link href={item.githubUrl} target="_blank" className="w-16 h-16 bg-white/10 backdrop-blur-xl text-white rounded-full flex items-center justify-center border border-white/20 hover:scale-110 transition-transform">
                <Github size={28} />
              </Link>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-10 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">
                Project // 0{index + 1}
              </span>
              <div className="h-px w-10 bg-white/10" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{item.status || "Deployed"}</span>
            </div>
          </div>

          <h3 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase">
            {item.title}
          </h3>

          <p className="text-white/50 text-base leading-relaxed mb-8 font-light line-clamp-2">
            {item.description}
          </p>

          {/* Minimalist Tech Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {item.technologies.map((tech: string, i: number) => (
              <span 
                key={i}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold text-white/70 uppercase tracking-widest"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Footer Action */}
          <Link 
            href={item.liveUrl} 
            target="_blank" 
            className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white hover:text-blue-400 transition-colors"
          >
            Explore Case Study <div className="w-8 h-px bg-blue-600 group-hover:w-12 transition-all" />
          </Link>
        </div>

        {/* Corner Decor */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 blur-[60px] -mr-20 -mt-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
}

export default MyProjects;