"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { 
  ArrowRight, Github, Linkedin, Instagram, 
  MessageCircle, Copy, Check, MapPin, ArrowUpRight 
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const [copied, setCopied] = useState(false);
  const email = "ahmed.elarjoun49@gmail.com";

  // Magnetic Cursor Effect for the Name
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    { name: "GitHub", href: "https://github.com/ahmedelarjoun49-byte", icon: <Github size={20} /> },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/ahmed-el-arjoun-639804305/", icon: <Linkedin size={20} /> },
    { name: "Instagram", href: "https://www.instagram.com/el4rjoun/", icon: <Instagram size={20} /> },
    { name: "WhatsApp", href: "https://wa.me/212691243592?text=Hello%20Ahmed!", icon: <MessageCircle size={20} /> },
  ];

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#030303] text-zinc-100 font-sans selection:bg-blue-600/30 overflow-x-hidden relative"
    >
      
      {/* 1. MOUSE-FOLLOWING SPOTLIGHT (Makes your name visible) */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-30 rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(37, 99, 235, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Background Texture */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <nav className="fixed top-0 w-full p-8 md:p-12 flex justify-between items-center z-50 mix-blend-difference">
        <Link href="/" className="font-black text-xl tracking-tighter uppercase">
          EL4RJOUN<span className="text-blue-600">.</span>
        </Link>
        <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase">
          <MapPin size={12} className="text-blue-600" /> Rabat
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-44 pb-32">
        
        {/* REPAIRED NAME HEADER */}
        <section className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[12vw] md:text-[9vw] font-black uppercase leading-[0.8] tracking-tighter">
              <span className="text-white">Ahmed</span> <br />
              <span className="text-zinc-900 outline-text-fixed">El Arjoun.</span>
            </h1>
          </motion.div>
        </section>

        <div className="flex flex-col gap-6">
          
          {/* EMAIL BLOCK (Responsive text size to prevent cutoff) */}
          <motion.div 
            onClick={copyToClipboard}
            whileHover={{ borderColor: "rgba(37,99,235,0.3)", y: -4 }}
            className="w-full p-8 md:p-16 rounded-[2.5rem] bg-zinc-900/20 border border-white/5 backdrop-blur-3xl cursor-pointer group relative overflow-hidden transition-all duration-500"
          >
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-500 block mb-6 italic">Direct Link</span>
              <h2 className="text-lg sm:text-2xl md:text-5xl lg:text-6xl font-bold tracking-tight transition-all duration-500 group-hover:text-blue-500">
                {email}
              </h2>
              
              <div className="mt-12 flex items-center justify-between">
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div 
                      key="copied"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 text-green-500 font-bold text-[10px] uppercase tracking-widest"
                    >
                      <Check size={14} /> Ready to Paste
                    </motion.div>
                  ) : (
                    <div className="flex items-center gap-2 text-zinc-600 group-hover:text-zinc-300 transition-colors font-bold text-[10px] uppercase tracking-widest">
                      <Copy size={14} /> Copy to Clipboard
                    </div>
                  )}
                </AnimatePresence>
                <ArrowUpRight size={20} className="opacity-20 group-hover:opacity-100 group-hover:text-blue-500 transition-all" />
              </div>
            </div>
          </motion.div>

          {/* SOCIALS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {socials.map((s, i) => (
              <motion.a 
                key={i}
                href={s.href}
                target="_blank"
                whileHover={{ y: -5, backgroundColor: "rgba(37,99,235,0.05)", borderColor: "rgba(37,99,235,0.2)" }}
                className="flex items-center justify-between p-7 rounded-[1.8rem] border border-white/5 bg-zinc-900/10 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-zinc-600 group-hover:text-blue-500 transition-colors">{s.icon}</span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 group-hover:text-white">{s.name}</span>
                </div>
                <ArrowRight size={14} className="-rotate-45 opacity-0 group-hover:opacity-100 transition-all text-blue-500" />
              </motion.a>
            ))}
          </div>

        </div>

        {/* FOOTER */}
        <footer className="mt-40 pt-10 border-t border-white/5 flex justify-between items-center">
          <Link href="/" className="group flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
              <ArrowRight size={16} className="rotate-180" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 group-hover:text-zinc-100 transition-colors">Return</span>
          </Link>
          <span className="text-[9px] font-bold text-zinc-800 uppercase tracking-[0.5em]">
            Ahmed El Arjoun // Rabat, MA
          </span>
        </footer>

      </main>

      <style jsx global>{`
        .outline-text-fixed {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.02);
          transition: all 0.5s ease;
        }
        h1:hover .outline-text-fixed {
          -webkit-text-stroke: 1px rgba(37,99,235,0.5);
          color: rgba(37,99,235,0.05);
        }
      `}</style>
    </div>
  );
}