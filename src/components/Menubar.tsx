"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { 
  motion, 
  useScroll, 
  useMotionValueEvent, 
  useMotionValue, 
  useSpring, 
  useTransform 
} from "framer-motion";

interface MenuProps {
  isContactVisible?: boolean;
}

export default function Menubar({ isContactVisible = false }: MenuProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  const items = useMemo(() => [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    ...(isContactVisible ? [{ href: "/contact", label: "Contact" }] : []),
  ], [isContactVisible]);

  // Navbar Visibility
  const [visible, setVisible] = useState(true);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest < 50) setVisible(true);
    else if (latest > previous && latest > 150) setVisible(false);
    else if (latest < previous) setVisible(true);
  });

  // ---- Theme State ----
  const [mode, setMode] = useState<"light" | "dark">("dark");

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

  // ---- LAMP PULL CORD LOGIC ----
  const dragY = useMotionValue(0);
  const springY = useSpring(dragY, { stiffness: 600, damping: 30 });
  const stringScale = useTransform(springY, [0, 100], [1, 1.5]);

  const onDragEnd = () => {
    // If you pull it down more than 60 pixels, it triggers
    if (dragY.get() > 60) {
      applyTheme(mode === "dark" ? "light" : "dark");
    }
    dragY.set(0); 
  };

  return (
    <>
      {/* THE CORD: High Z-index (99,999,999) 
          Placed outside the Nav to ensure it's not clipped.
      */}
      <div className="fixed top-0 right-10 md:right-32 z-[99999999] flex flex-col items-center pointer-events-none touch-none">
        {/* The Ceiling Base */}
        <div className="w-6 h-2 bg-zinc-800 dark:bg-zinc-200 rounded-b-sm shadow-2xl" />
        
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 120 }}
          dragElastic={0.1}
          onDragEnd={onDragEnd}
          style={{ y: springY }}
          className="pointer-events-auto cursor-grab active:cursor-grabbing flex flex-col items-center"
        >
          {/* The String (Classic Thin Cord) */}
          <motion.div 
            style={{ scaleY: stringScale, originY: 0 }}
            className="w-[1.5px] h-32 md:h-56 bg-zinc-500 dark:bg-zinc-400"
          />
          
          {/* The Handle (The Bell/Puller) */}
          <div className="relative group">
            <div className="w-5 h-8 bg-zinc-800 dark:bg-zinc-100 rounded-b-full shadow-2xl border border-white/5 flex flex-col items-center justify-end pb-1.5 transition-colors">
              <div className={`w-1.5 h-1.5 rounded-full ${mode === 'dark' ? 'bg-blue-500 shadow-[0_0_8px_cyan]' : 'bg-orange-500 shadow-[0_0_8px_orange]'}`} />
            </div>
            
            {/* Tooltip Label */}
            <span className="absolute left-7 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-black text-zinc-500 whitespace-nowrap tracking-widest pointer-events-none">
              PULL
            </span>
          </div>
        </motion.div>
      </div>

      {/* THE NAVBAR */}
      <motion.nav
        className="fixed left-0 right-0 top-6 z-[999999] pointer-events-none"
        animate={{ y: visible ? 0 : -110, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="pointer-events-auto mx-auto w-full max-w-4xl px-4">
          <div className="flex items-center justify-between rounded-full border border-zinc-200/50 dark:border-white/10 bg-white/70 dark:bg-[#020617]/80 backdrop-blur-xl px-6 py-2.5 shadow-2xl">
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-tighter">
                Ahmed El Arjoun.
              </span>
              <div className={`h-1.5 w-1.5 rounded-full ${mode === 'dark' ? 'bg-blue-500' : 'bg-emerald-500'}`} />
            </div>

            <ul className="flex items-center gap-1">
              {items.map((it) => (
                <li key={it.href} className="relative">
                  <Link
                    href={it.href}
                    className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                      isActive(it.href) 
                      ? "text-blue-600 dark:text-blue-400" 
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    {isActive(it.href) && (
                      <motion.span
                        layoutId="navPill"
                        className="absolute inset-0 -z-10 rounded-full bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20"
                      />
                    )}
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
               <div className="text-[8px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-3 py-1 bg-zinc-100 dark:bg-white/5 rounded-full">
                  {mode}
               </div>
               <a href="/cv.pdf" className="h-9 px-4 flex items-center bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full text-[11px] font-black uppercase hover:scale-105 transition-transform">
                CV
              </a>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}