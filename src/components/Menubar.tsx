"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { User, Mail, MessageSquare, Tag, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface MenuProps {
  isContactVisible?: boolean;
}

export default function Menubar({ isContactVisible = false }: MenuProps) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const isActive = (href: string) => pathname === href;
  const isPreloader = pathname === "/preloader";

  const items = useMemo(() => [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    ...(isContactVisible ? [{ href: "/contact", label: "Contact" }] : []),
  ], [isContactVisible]);

  // 1. Mouse Proximity & Mobile Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Show if mouse is in the top 150px
      setVisible(e.clientY < 150);
    };

    // Mobile: Always visible on touch devices
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) {
      setVisible(true);
    } else {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 2. Theme & Drag Logic (Lamp Cord)
  const applyTheme = (next: "light" | "dark") => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(next);
    localStorage.setItem("theme", next);
    setMode(next);
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    applyTheme(saved || "dark");
  }, []);

  const dragY = useMotionValue(0);
  const springY = useSpring(dragY, { stiffness: 600, damping: 30 });
  const stringScale = useTransform(springY, [0, 100], [1, 1.5]);

  if (isPreloader) return null;

  return (
    <>
      {/* LAMP CORD */}
      <div className="fixed top-0 right-10 md:right-32 z-[99999999] flex flex-col items-center pointer-events-none touch-none">
        <div className="w-6 h-2 bg-zinc-800 dark:bg-zinc-200 rounded-b-sm shadow-2xl" />
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 120 }}
          onDragEnd={() => { if (dragY.get() > 60) applyTheme(mode === "dark" ? "light" : "dark"); dragY.set(0); }}
          style={{ y: springY }}
          className="pointer-events-auto cursor-grab active:cursor-grabbing flex flex-col items-center"
        >
          <motion.div style={{ scaleY: stringScale, originY: 0 }} className="w-[1.5px] h-32 md:h-56 bg-zinc-500 dark:bg-zinc-400" />
          <div className="w-5 h-8 bg-zinc-800 dark:bg-zinc-100 rounded-b-full flex items-center justify-center">
            <div className={`w-1.5 h-1.5 rounded-full ${mode === 'dark' ? 'bg-blue-500' : 'bg-orange-500'}`} />
          </div>
        </motion.div>
      </div>

      {/* NAVBAR */}
      <motion.nav
        className="fixed left-0 right-0 top-6 z-[999999] pointer-events-none"
        animate={{ y: visible ? 0 : -110, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="pointer-events-auto mx-auto w-full max-w-4xl px-4">
          <div className="flex items-center justify-between rounded-full border border-zinc-200/50 dark:border-white/10 bg-white/70 dark:bg-[#020617]/80 backdrop-blur-xl px-6 py-2.5 shadow-2xl">
            <span className="text-sm font-black uppercase tracking-tighter">Ahmed El Arjoun.</span>
            <ul className="flex items-center gap-1">
              {items.map((it) => (
                <li key={it.href} className="relative">
                  <Link href={it.href} className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${isActive(it.href) ? "text-blue-600 dark:text-blue-400" : "text-zinc-500"}`}>
                    {isActive(it.href) && <motion.span layoutId="navPill" className="absolute inset-0 -z-10 rounded-full bg-blue-500/10 border border-blue-500/20" />}
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a href="/cv.pdf" className="h-9 px-4 flex items-center bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full text-[11px] font-black uppercase">CV</a>
          </div>
        </div>
      </motion.nav>
    </>
  );
}