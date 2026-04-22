"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Instagram } from "lucide-react";

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/ahmedelarjoun49-byte",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ahmed-el-arjoun-639804305/",
    icon: Linkedin,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/el4rjoun/",
    icon: Instagram,
  },
];

const SocialsMenu = () => {
  return (
    <div className="flex items-center gap-4">
      {socials.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          prefetch={false} // Prevents Next.js from treating it like an internal route
          onClick={(e) => {
            // This is the critical fix: stop the event from triggering top-of-page scrolls
            e.stopPropagation(); 
          }}
          className="group relative flex h-12 w-12 items-center justify-center rounded-2xl
            border border-zinc-200 bg-white/50 backdrop-blur-xl
            transition-all duration-500
            hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.25)]
            hover:border-blue-500/40
            dark:border-white/10 dark:bg-zinc-950/50"
        >
          <span
            className="pointer-events-none absolute inset-0 rounded-2xl
              bg-blue-600/10 opacity-0 blur-xl
              transition-opacity duration-500
              group-hover:opacity-100"
          />

          <social.icon
            className="relative z-10 h-5 w-5 text-zinc-500 transition-all duration-500
              group-hover:text-blue-600 group-hover:scale-110
              dark:text-zinc-400 dark:group-hover:text-blue-400"
            strokeWidth={1.5}
          />
        </Link>
      ))}
    </div>
  );
};

export default SocialsMenu;