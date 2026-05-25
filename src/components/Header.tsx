"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

interface MenuProps {
  home?: boolean;
}

export default function Menubar({ home }: MenuProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  const items = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/projects", label: "Projects" },
      { href: "/about", label: "About" },
    ],
    []
  );

  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    setMounted(true);

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

  if (!mounted) return null;

  return (
    <motion.nav
      className={`
        fixed left-0 right-0 top-10 z-[9999] pointer-events-none 
        flex justify-center
        ${home ? "hidden md:flex" : "flex"}
        ${plusJakarta.className}
      `}
      initial={false}
      animate={{
        y: visible ? 0 : -80,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="pointer-events-auto">
        {/* Horizontal Text Row with wide layout separation */}
        <ul className="flex items-center gap-14">
          {items.map((it) => {
            const active = isActive(it.href);

            return (
              <li key={it.href} className="relative flex flex-col items-center group">
                <Link
                  href={it.href}
                  className={`
                    text-[13px] font-medium uppercase tracking-[0.25em]
                    transition-colors duration-300 outline-none pb-2
                    ${active 
                      ? "text-blue-500 font-bold" 
                      : "text-slate-500 hover:text-slate-200"
                    }
                  `}
                >
                  {it.label}
                </Link>

                {/* Shared Layout Underline Effect */}
                {active && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
}