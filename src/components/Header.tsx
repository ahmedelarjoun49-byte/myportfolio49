"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuProps {
  home?: boolean;
}

export default function Menubar({ home }: MenuProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  // Streamlined items list
  const items = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/projects", label: "Projects" },
      { href: "/about", label: "About" },
    ],
    []
  );

  const [visible, setVisible] = useState(true);
  const lastYRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y <= 50) {
        setVisible(true);
      } else if (y > lastYRef.current + 10) {
        setVisible(false);
      } else if (y < lastYRef.current - 10) {
        setVisible(true);
      }
      lastYRef.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={[
        home ? "hidden md:block" : "",
        "fixed left-0 right-0 top-8 z-[9999] pointer-events-none",
      ].join(" ")}
      initial={false}
      animate={{
        y: visible ? 0 : -100,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="flex justify-center px-4">
        <div className="pointer-events-auto relative group">
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 -z-10 rounded-full bg-blue-500/5 blur-2xl group-hover:bg-blue-500/10 transition-colors duration-700" />

          <div
            className="
              relative flex items-center
              rounded-full px-1.5 py-1.5
              border border-zinc-200/50 dark:border-white/10
              bg-white/80 dark:bg-zinc-950/80
              backdrop-blur-xl
              shadow-[0_8px_30px_rgb(0,0,0,0.04)]
              dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]
            "
          >
            <ul className="flex items-center gap-1">
              {items.map((it) => {
                const active = isActive(it.href);

                return (
                  <li key={it.href} className="relative">
                    <Link
                      href={it.href}
                      className={[
                        "relative flex items-center justify-center",
                        "h-9 px-5 rounded-full",
                        "text-[12px] font-medium tracking-wide",
                        "transition-all duration-300 outline-none",
                        active
                          ? "text-zinc-900 dark:text-white"
                          : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200",
                      ].join(" ")}
                    >
                      {/* Pill Background for Active State */}
                      <AnimatePresence>
                        {active && (
                          <motion.span
                            layoutId="navPill"
                            className="absolute inset-0 rounded-full bg-zinc-100 dark:bg-white/10 border border-zinc-200/50 dark:border-white/5"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </AnimatePresence>

                      <span className="relative z-10">{it.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}