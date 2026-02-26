"use client";

import Link from "next/link";
import { Download, ArrowUpRight, Github, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative w-full pt-20 pb-10 px-4 bg-white dark:bg-[#020617] transition-colors duration-700">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-[2.5rem] bg-zinc-50 dark:bg-[#020617] border border-zinc-200 dark:border-blue-500/20 shadow-2xl overflow-hidden transition-colors duration-700">
          
          {/* Main Content Area */}
          <div className="p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Left: Navigation & Socials */}
            <div className="space-y-10">
              <div>
                <h4 className="text-[10px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-[0.3em] mb-6">Navigation</h4>
                <nav className="flex flex-col gap-3 text-sm font-bold text-zinc-500 dark:text-slate-400 uppercase tracking-widest">
                  <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Home</Link>
                  <Link href="/projects" className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Projects</Link>
                  <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors">About</Link>
                </nav>
              </div>
              <div>
                <h4 className="text-[10px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-[0.3em] mb-6">Socials</h4>
                <div className="flex gap-4">
                  {[Github, Linkedin, Instagram].map((Icon, idx) => (
                    <Link 
                      key={idx} 
                      href="#" 
                      className="p-3 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl hover:bg-blue-600 dark:hover:bg-blue-600 group transition-all hover:-translate-y-1 shadow-sm dark:shadow-none"
                    >
                      <Icon size={18} className="text-zinc-700 dark:text-white group-hover:text-white transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Center: CTA */}
            <div className="text-center lg:border-x border-zinc-200 dark:border-white/5 lg:px-10">
              <h3 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white uppercase leading-tight mb-4">
                Let's Craft The <br /><span className="text-blue-600 italic">Future.</span>
              </h3>
              <p className="text-zinc-600 dark:text-slate-400 text-sm font-medium mb-8 max-w-[280px] mx-auto">
                Ready to translate your vision into a high-end digital reality?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="bg-blue-600 px-8 py-4 rounded-2xl text-white font-black uppercase tracking-widest text-xs shadow-[0_10px_20px_rgba(37,99,235,0.3)] hover:scale-105 transition-all flex items-center gap-2 justify-center">
                  Get In Touch <ArrowUpRight size={16} />
                </Link>
                <Link href="#" className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-8 py-4 rounded-2xl text-zinc-900 dark:text-white font-black uppercase tracking-widest text-xs hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all flex items-center gap-2 justify-center shadow-sm dark:shadow-none">
                  <Download size={16} /> CV
                </Link>
              </div>
            </div>

            {/* Right: Copyright & Stack */}
            <div className="lg:text-right flex flex-col justify-between h-full">
              <div>
                <p className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-widest">© 2026 AHMED EL ARJOUN.</p>
                <p className="text-xs text-zinc-500 dark:text-slate-500 mt-2 font-medium">Built with 💙 in Morocco</p>
              </div>
              <div className="mt-12">
                <span className="text-[10px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-widest block mb-2">Stack</span>
                <p className="text-[10px] text-zinc-500 dark:text-slate-500 font-bold uppercase tracking-tighter">
                  Next.js • Tailwind • Framer Motion
                </p>
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-blue-50 dark:bg-blue-600/5 border-t border-zinc-200 dark:border-white/5 py-4 px-8 flex items-center justify-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 dark:bg-blue-500"></span>
            </span>
            <span className="text-[10px] font-black text-blue-600 dark:text-blue-400/80 uppercase tracking-[0.2em]">
              Open for Internships • Freelance • Partnerships
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;