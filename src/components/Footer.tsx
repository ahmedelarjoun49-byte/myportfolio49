"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const socials = [
    { Icon: Github, href: "https://github.com/ahmedelarjoun49-byte", label: "GitHub" },
    { Icon: Linkedin, href: "https://www.linkedin.com/in/ahmed-el-arjoun-639804305/", label: "LinkedIn" },
    { Icon: Instagram, href: "https://www.instagram.com/el4rjoun/", label: "Instagram" },
  ];

  return (
    <footer className="relative w-full pt-32 pb-20 px-4 bg-white dark:bg-[#030303] transition-colors duration-700 overflow-hidden">
      
      {/* Soft Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-[radial-gradient(100%_100%_at_50%_0%,rgba(37,99,235,0.02)_0%,transparent_90%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setOpacity(1)}
          onMouseLeave={() => setOpacity(0)}
          className="relative rounded-[3rem] bg-zinc-50/30 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-white/5 backdrop-blur-3xl overflow-hidden py-16 px-8 md:px-20 group transition-all duration-700 hover:border-blue-500/10"
        >
          
          {/* Subtle Mouse-Tracking Glow */}
          <div 
            className="pointer-events-none absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity,
              background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37,99,235,0.04), transparent 60%)`
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            
            {/* Identity Block */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter dark:text-white text-zinc-900 uppercase">
                Ahmed El Arjoun<span className="text-blue-600">.</span>
              </h2>
              <p className="mt-1 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.4em]">
                Multimedia Developer
              </p>
            </div>

            {/* Clean Social Icons */}
            <div className="flex items-center gap-4">
              {socials.map((social, idx) => (
                <Link 
                  key={idx} 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 w-12 flex items-center justify-center bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 rounded-2xl hover:border-blue-600/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(37,99,235,0.1)] group/icon"
                >
                  <social.Icon size={20} strokeWidth={1.5} className="text-zinc-500 dark:text-zinc-400 group-hover/icon:text-blue-600 transition-colors" />
                   <span className="sr-only">{social.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Minimal Copyright Bottom Right */}
          <div className="absolute bottom-6 right-10">
             <span className="text-[9px] font-medium text-zinc-400 dark:text-zinc-600 uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity duration-700">
               © 2026
             </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;