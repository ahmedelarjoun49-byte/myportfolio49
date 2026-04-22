"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code2, Globe, Laptop, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    id: "01",
    title: "LuxCart.",
    description: "A high-performance e-commerce mobile application built using React Native and Expo.",
    image: "/assets/project1.png", // Ensure these paths are correct in your public folder
    tags: ["React Native", "Expo", "Firebase"],
    href: "/projects",
    status: "Completed",
    icon: <Laptop size={18} />,
    featured: true,
  },
  {
    id: "02",
    title: "Networked AI.",
    description: "An AI-powered platform designed to simplify event hosting and management.",
    image: "/assets/project2.png",
    tags: ["React Ionic", "TypeScript"],
    href: "/projects",
    status: "Completed",
    icon: <Code2 size={18} />,
  },
  {
    id: "03",
    title: "Waves: Bible Verse.",
    description: "A spiritual growth companion delivering curated verses.",
    image: "/assets/project3.png",
    tags: ["React Native", "Widgets"],
    href: "/projects",
    status: "Completed",
    icon: <Globe size={18} />,
  },
];

export default function ProjectBanner() {
  return (
    <section className="py-24 relative overflow-hidden bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-500">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl lg:text-7xl font-black tracking-tighter uppercase italic"
            >
              Recent Work<span className="text-blue-600">.</span>
            </motion.h2>
            <p className="text-slate-500 dark:text-zinc-400 text-lg font-light tracking-tight">
              Curated digital experiences and technical precision.
            </p>
          </div>
          
          <Link href="/projects" className="group flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
            View Archive <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* The Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((p, index) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900/50 ${
                p.featured ? "lg:col-span-2 min-h-[500px]" : "lg:col-span-1 min-h-[500px]"
              }`}
            >
              {/* Image with fallback background color so it's never empty */}
              <div className="absolute inset-0 z-0 bg-zinc-100 dark:bg-zinc-900">
                {p.image && (
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                )}
                {/* Fixed Gradient for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-black dark:via-black/60 dark:to-transparent" />
              </div>

              {/* Card Content */}
              <div className="relative z-10 h-full p-10 flex flex-col justify-end items-start">
                <div className="flex items-center gap-3 mb-4">
                  <span className="p-2 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                    {p.icon}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                    {p.status}
                  </span>
                </div>

                <h3 className={`font-black tracking-tighter uppercase italic leading-none mb-3 ${
                  p.featured ? "text-4xl lg:text-6xl" : "text-3xl"
                }`}>
                  {p.title}
                </h3>

                <p className="text-slate-600 dark:text-zinc-400 text-sm font-medium mb-6 max-w-sm">
                  {p.description}
                </p>

                <div className="flex items-center justify-between w-full">
                  <div className="flex gap-2">
                    {p.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full text-[9px] font-bold uppercase border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link href={p.href} className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}