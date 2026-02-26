"use client";

import Image from "next/image";
import { motion, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef, useState } from "react";

// The 'isDark' flag ensures black SVGs become white/bright in your dark UI
type Logo = { src: string; alt: string; isDark?: boolean };

const SKILLS: Logo[] = [
  { src: "/logos/react.svg", alt: "React" },
  { src: "/logos/nextjs.svg", alt: "Next.js", isDark: true },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript" },
  { src: "/logos/tailwind.svg", alt: "Tailwind" },
  { src: "/logos/javascript.svg", alt: "JavaScript" },
  { src: "/logos/pro.svg", alt: "Premiere Pro" },
  // Marked Cinema 4D/Blender as isDark to ensure it pops against the black background
  { src: "/logos/cinema4d.svg", alt: "Cinema 4D", isDark: true }, 
  { src: "/logos/node.svg", alt: "Node.js" },
  { src: "/logos/github.svg", alt: "GitHub", isDark: true },
  { src: "/logos/html.svg", alt: "HTML" },
  { src: "/logos/css.svg", alt: "CSS" },
];

export default function SkillsLogoMarquee() {
  const row1 = useMemo(() => [...SKILLS, ...SKILLS, ...SKILLS], []);
  const row2 = useMemo(() => [...SKILLS, ...SKILLS, ...SKILLS].reverse(), []);

  return (
    <div className="relative w-full py-24 overflow-hidden bg-transparent">
      <div className="relative z-10 space-y-16">
        <header className="max-w-7xl mx-auto px-6">
           <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex items-center gap-6">
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-[0.3em]">
              Tech Stack<span className="text-blue-500">.</span>
            </h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-blue-500/40 to-transparent" />
          </motion.div>
        </header>

        <div className="flex flex-col gap-20">
          <MarqueeRow items={row1} direction="left" speed={50} />
          <MarqueeRow items={row2} direction="right" speed={60} />
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, direction, speed }: { items: Logo[], direction: "left" | "right", speed: number }) {
  return (
    <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
      <motion.div
        animate={{ x: direction === "left" ? [0, -1800] : [-1800, 0] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex gap-16 px-8 flex-nowrap"
      >
        {items.map((logo, i) => (
          <SkillCard key={`${logo.alt}-${i}`} logo={logo} />
        ))}
      </motion.div>
    </div>
  );
}

function SkillCard({ logo }: { logo: Logo }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useSpring(0, { stiffness: 400, damping: 30 });
  const y = useSpring(0, { stiffness: 400, damping: 30 });
  
  const rotateX = useTransform(y, [-100, 100], [25, -25]);
  const rotateY = useTransform(x, [-100, 100], [-25, 25]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      x.set(e.clientX - rect.left - rect.width / 2);
      y.set(e.clientY - rect.top - rect.height / 2);
    }
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-32 h-32 md:w-36 md:h-36 flex items-center justify-center bg-[#080808] rounded-[2.5rem] border border-white/10 group"
    >
      {/* Dynamic Background Glow to ensure silhouette visibility */}
      <div className="absolute z-20 w-16 h-16 bg-blue-500/20 blur-[20px] rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Inner Card Body */}
      <div className="absolute inset-[1.5px] bg-[#0c0c0c] rounded-[2.4rem] z-10" />

      {/* Logo Container */}
      <div className="relative z-30 w-16 h-16 transition-all duration-500 group-hover:scale-110">
        <Image
          src={logo.src}
          alt={logo.alt}
          fill
          className="object-contain"
          style={{
            // filter: brightness(0) invert(1) turns black SVGs into white.
            // brightness(2) makes them glow slightly more.
            filter: logo.isDark 
              ? "brightness(0) invert(1) brightness(2) drop-shadow(0 0 3px rgba(255,255,255,0.3))" 
              : "drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))"
          }}
        />
      </div>

      {/* Floating Tooltip */}
      <motion.div
        animate={{ 
          opacity: isHovered ? 1 : 0,
          y: isHovered ? -12 : 0 
        }}
        className="absolute -top-10 px-3 py-1 bg-blue-950/40 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-md z-50 backdrop-blur-md pointer-events-none"
      >
        {logo.alt}
      </motion.div>
    </motion.div>
  );
}