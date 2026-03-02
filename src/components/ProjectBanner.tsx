"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code2, Globe, Laptop } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    id: "01",
    title: "LuxCart.",
    description: "A high-performance e-commerce mobile application built using React Native and Expo.",
    image: "/assets/project1.png",
    tags: ["React Native", "Expo", "Firebase"],
    href: "/projects",
    status: "Completed",
    icon: <Laptop size={18} />,
  },
  {
    id: "02",
    title: "Networked AI.",
    description: "An AI-powered platform designed to simplify event hosting, management and networking.",
    image: "/assets/project2.png",
    tags: ["React Ionic", "TypeScript", "Tailwind CSS"],
    href: "/projects",
    status: "Completed",
    icon: <Code2 size={18} />,
  },
  {
    id: "03",
    title: "Waves: Bible Verse.",
    description: "A spiritual growth companion that delivers personalized curated Bible verses & support.",
    image: "/assets/project3.png",
    tags: ["React Native", "TypeScript", "Widgets"],
    href: "/projects",
    status: "Completed",
    icon: <Globe size={18} />,
  },
];

export default function ProjectBanner() {
  return (
    <section className="py-24 relative overflow-hidden bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-500">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-black tracking-tighter uppercase italic"
          >
            Recent Work<span className="text-blue-600">.</span>
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             viewport={{ once: true }}
             className="text-slate-500 dark:text-white/50 text-lg max-w-2xl font-light leading-relaxed"
          >
            A curation of digital experiences focused on performance, UI craft, and technical precision.
          </motion.p>
        </div>

        {/* Main Wrapper Container */}
        <div className="rounded-[2.5rem] border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] backdrop-blur-3xl p-4 lg:p-10 shadow-xl dark:shadow-2xl transition-all">
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, index) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative rounded-3xl overflow-hidden bg-white dark:bg-[#050505] border border-slate-200 dark:border-white/5 hover:border-blue-500/50 dark:hover:border-blue-500/30 transition-all duration-500 shadow-sm hover:shadow-xl dark:shadow-none"
              >
                {/* Image Section */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay Gradient: Darker in dark mode, subtle in light mode */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 dark:from-[#050505] to-transparent opacity-60" />
                  
                  {/* Floating ID Tag */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-lg border border-slate-200 dark:border-white/10 text-[10px] font-black tracking-widest text-blue-600 dark:text-blue-400">
                    // 0{p.id}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-500 border border-blue-100 dark:border-blue-500/20">
                      {p.icon}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-white/30 italic">
                      {p.status}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black tracking-tighter uppercase text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-slate-600 dark:text-white/40 text-sm leading-relaxed font-light line-clamp-2">
                    {p.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-tighter bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/60 border border-slate-200 dark:border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      href={p.href}
                      className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400"
                    >
                      Explore Case Study <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* CTA Banner Section */}
          <div className="mt-12 rounded-[2rem] border border-blue-100 dark:border-blue-500/20 p-8 lg:p-12 relative overflow-hidden bg-gradient-to-br from-blue-50 to-white dark:from-blue-600/10 dark:to-transparent text-center group transition-colors">
            {/* Animated blue light beam for both modes */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 dark:via-blue-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-black tracking-tighter uppercase italic text-slate-900 dark:text-white">
                Crave <span className="text-blue-600 italic">More?</span>
              </h3>
              <p className="mt-4 text-slate-500 dark:text-white/40 font-light max-w-xl mx-auto">
                Explore the full archive of my digital experiments and commercial productions.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/projects"
                  className="px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] bg-blue-600 text-white shadow-lg shadow-blue-600/20 dark:shadow-blue-900/30 hover:bg-blue-700 dark:hover:bg-blue-500 hover:scale-105 transition-all"
                >
                  View Full Archive
                </Link>

                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                >
                  Start A Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}