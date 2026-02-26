"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuProps {
  home?: boolean;
  isContactVisible?: boolean;
}

type ThemeMode = "light" | "dark";

function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 14.5A8.5 8.5 0 0 1 9.5 3a7 7 0 1 0 11.5 11.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Menubar({ home, isContactVisible = false }: MenuProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  const items = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/projects", label: "Projects" },
      { href: "/about", label: "About" },
      ...(isContactVisible ? [{ href: "/contact", label: "Contact" }] : []),
    ],
    [isContactVisible]
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

  // ---------------- THEME TOGGLE (RESTORED) ----------------
  const [mode, setMode] = useState<ThemeMode>("dark");

  const applyTheme = (next: ThemeMode) => {
    const root = document.documentElement;

    // Tailwind dark mode
    root.classList.toggle("dark", next === "dark");

    // Helpful for your other components that read data-theme
    root.setAttribute("data-theme", next);

    // Native UI hint
    root.style.colorScheme = next;

    localStorage.setItem("theme", next);
    setMode(next);
  };

  useEffect(() => {
    const root = document.documentElement;

    const saved = localStorage.getItem("theme") as ThemeMode | null;
    if (saved === "dark" || saved === "light") {
      applyTheme(saved);
      return;
    }

    const domDark =
      root.classList.contains("dark") || root.getAttribute("data-theme") === "dark";
    if (domDark) {
      applyTheme("dark");
      return;
    }

    const prefersDark =
      window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
    applyTheme(prefersDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => applyTheme(mode === "dark" ? "light" : "dark");
  // ---------------------------------------------------------

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
          {/* Outer glow */}
          <div className="absolute inset-0 -z-10 rounded-full bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-colors duration-500" />

          <div
            className="
              relative flex items-center gap-2
              rounded-full px-2 py-2
              border border-zinc-200/50 dark:border-white/10
              bg-white/70 dark:bg-[#0c0c0c]/80
              backdrop-blur-xl
              shadow-[0_20px_50px_rgba(0,0,0,0.1)]
              dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]
            "
          >
            {/* LINKS */}
            <ul className="relative flex items-center gap-1">
              {items.map((it) => {
                const active = isActive(it.href);

                return (
                  <li key={it.href} className="relative">
                    <Link
                      href={it.href}
                      className={[
                        "relative flex items-center justify-center",
                        "h-10 px-6 rounded-full",
                        "text-[11px] font-bold uppercase tracking-[0.2em]",
                        "transition-all duration-300 outline-none",
                        active
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white",
                      ].join(" ")}
                    >
                      <AnimatePresence mode="wait">
                        {active && (
                          <motion.span
                            layoutId="navPill"
                            className="absolute inset-0 rounded-full bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                      </AnimatePresence>

                      <span className="relative z-10">{it.label}</span>

                      {active && (
                        <motion.span
                          layoutId="activeDot"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* DIVIDER */}
            <div className="mx-1 h-8 w-px bg-zinc-200/70 dark:bg-white/10" />

            {/* TOGGLE BUTTON (NOW IT WILL SHOW) */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="
                relative inline-flex h-10 w-10 items-center justify-center rounded-full
                border border-zinc-200/60 dark:border-white/10
                bg-white/60 dark:bg-white/5
                text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500/40
              "
            >
              <motion.span
                key={mode}
                initial={{ opacity: 0, rotate: -25, scale: 0.9 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ duration: 0.15 }}
                className="grid place-items-center"
              >
                {mode === "dark" ? (
                  <MoonIcon className="h-5 w-5" />
                ) : (
                  <SunIcon className="h-5 w-5" />
                )}
              </motion.span>

              <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-black/5 dark:ring-white/10" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}