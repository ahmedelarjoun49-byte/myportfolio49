"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

interface MenuProps {
  isContactVisible?: boolean;
}

export default function Menubar({ isContactVisible = false }: MenuProps) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const lastScrollY = useRef(0);

  const isActive = (href: string) => pathname === href;
  const isPreloader = pathname === "/preloader";

  const items = useMemo(() => [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    ...(isContactVisible ? [{ href: "/contact", label: "Contact" }] : []),
  ], [isContactVisible]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div className={plusJakarta.className}>
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
        className="fixed left-0 right-0 top-6 z-[999999] pointer-events-none flex justify-end max-w-5xl mx-auto px-6 md:px-12"
        animate={{ y: visible ? 0 : -110, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      >
        <div className="pointer-events-auto">
          <div className="flex items-center rounded-full border border-zinc-200/50 dark:border-white/10 bg-white/70 dark:bg-[#020617]/80 backdrop-blur-xl px-4 py-2 shadow-2xl">
            <ul className="flex items-center gap-1">
              {items.map((it) => (
                <li key={it.href} className="relative">
                  <Link 
                    href={it.href} 
                    className={`px-4 py-2 rounded-full text-[11px] font-medium uppercase tracking-wider transition-colors ${
                      isActive(it.href) 
                        ? "text-blue-600 dark:text-blue-400" 
                        : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                    }`}
                  >
                    {isActive(it.href) && (
                      <motion.span 
                        layoutId="navPill" 
                        className="absolute inset-0 -z-10 rounded-full bg-blue-500/10 border border-blue-500/20" 
                      />
                    )}
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}