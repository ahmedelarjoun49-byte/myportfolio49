"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code, Gamepad2, Brain, Sun, Moon } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 transition-colors duration-500 font-sans selection:bg-blue-500/30">
        
        {/* Navbar / Theme Toggle */}
        <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50">
          <span className="font-black tracking-tighter text-xl">EL4RJOUN.</span>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-3 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:scale-105 transition-all"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        <main className="max-w-3xl mx-auto px-6 py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-12"
          >
            {/* Header */}
            <div>
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-[0.3em] mb-4">About Me</h3>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-6">
                Creator & <br/><span className="text-blue-600">Learner.</span>
              </h1>
            </div>

            {/* Main Card */}
            <div className="p-8 md:p-12 rounded-[2rem] border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl shadow-slate-200/50 dark:shadow-none">
              <p className="text-2xl md:text-3xl font-light mb-10 leading-snug">
                I love <span className="font-bold text-blue-600">coding</span>, exploring new technologies, and constantly expanding my knowledge.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 text-slate-600 dark:text-zinc-400">
                <div className="flex items-start gap-4">
                  <Code className="text-blue-600 mt-1 shrink-0" />
                  <p className="text-sm md:text-base">Focused on building clean, scalable applications with a modern stack.</p>
                </div>
                <div className="flex items-start gap-4">
                  <Brain className="text-blue-600 mt-1 shrink-0" />
                  <p className="text-sm md:text-base">Passionate learner who thrives on solving complex challenges.</p>
                </div>
                <div className="flex items-start gap-4">
                  <Gamepad2 className="text-blue-600 mt-1 shrink-0" />
                  <p className="text-sm md:text-base">A competitive gamer at heart, bringing that same strategic focus to my projects.</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <Link href="/" className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-blue-600 hover:text-blue-500 transition-colors w-fit">
              <ArrowRight className="rotate-180" /> 
              Back to Home
            </Link>
          </motion.div>
        </main>
      </div>
    </div>
  );
}