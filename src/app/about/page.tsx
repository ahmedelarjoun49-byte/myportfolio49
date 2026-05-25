"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Github, Linkedin, Instagram, MessageCircle, Copy, Check, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Plus_Jakarta_Sans, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const cormorant = Cormorant_Garamond({ weight: ["300", "400"], style: ["italic", "normal"], subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"] });

export default function AboutPage() {
  const [copied, setCopied] = useState(false);
  const email = "ahmed.elarjoun49@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    { name: "GitHub", href: "https://github.com/ahmedelarjoun49-byte", icon: <Github size={18} /> },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/ahmed-el-arjoun-639804305/", icon: <Linkedin size={18} /> },
    { name: "Instagram", href: "https://www.instagram.com/el4rjoun/", icon: <Instagram size={18} /> },
    { name: "WhatsApp", href: "https://wa.me/212691243592?text=Hello%20Ahmed!", icon: <MessageCircle size={18} /> },
  ];

  return (
    <div className={`${plusJakarta.className} min-h-screen bg-[#020408] text-zinc-100 selection:bg-blue-600/30 overflow-x-hidden relative`}>
      
      <nav className="fixed top-0 w-full p-8 md:p-12 flex justify-between items-center z-50">
        <Link href="/" className="font-bold text-lg tracking-tighter uppercase text-white">
          EL4RJOUN<span className="text-blue-500">.</span>
        </Link>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-44 pb-32">
        
        {/* HEADER NAME */}
        <section className="mb-20">
          <h1 className={`${cormorant.className} text-[13vw] md:text-[9vw] font-light leading-[0.85] tracking-tight`}>
            <span className="text-white">Ahmed</span> <br />
            <span className="text-white/10" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>
              El Arjoun<span className="text-blue-500">.</span>
            </span>
          </h1>
        </section>

        <div className="flex flex-col gap-4">
          
          {/* EMAIL SELECTION CARD */}
          <div 
            onClick={copyToClipboard}
            className="w-full p-8 md:p-14 rounded-xl bg-[#0a0d14]/40 border border-white/[0.04] cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-colors duration-300 hover:border-blue-500/30"
          >
            <h2 className="text-xl sm:text-2xl md:text-4xl font-light tracking-tight text-slate-200 group-hover:text-blue-400 transition-colors duration-300">
              {email}
            </h2>
            
            <div className={`${jetbrains.className} min-w-[130px] flex items-center gap-2 text-[10px] uppercase tracking-wider text-slate-500`}>
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span 
                    key="copied"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex items-center gap-1.5 text-green-500"
                  >
                    <Check size={12} /> Copié
                  </motion.span>
                ) : (
                  <span className="flex items-center gap-1.5 group-hover:text-slate-300 transition-colors">
                    <Copy size={12} /> Copier
                  </span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* SOCIAL LINKS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {socials.map((s, i) => (
              <a 
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 rounded-xl border border-white/[0.04] bg-[#0a0d14]/20 hover:border-blue-500/20 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 group-hover:text-blue-400 transition-colors duration-300">{s.icon}</span>
                  <span className={`${jetbrains.className} text-[10px] uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors duration-300`}>
                    {s.name}
                  </span>
                </div>
                <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-blue-400" />
              </a>
            ))}
          </div>

        </div>

        {/* MINIMAL FOOTER LINK */}
        <footer className="mt-40 pt-8 border-t border-white/[0.04] flex justify-between items-center">
          <Link href="/" className="group flex items-center gap-2 text-xs text-slate-500 hover:text-slate-200 transition-colors">
            <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span className={`${jetbrains.className} text-[9px] uppercase tracking-wider`}>Retour</span>
          </Link>
          <span className={`${jetbrains.className} text-[9px] text-slate-600 uppercase tracking-wider`}>
            © {new Date().getFullYear()}
          </span>
        </footer>

      </main>
    </div>
  );
}