"use client";

import Image from "next/image";
import { motion, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef, useState } from "react";

type Logo = { src: string; alt: string; isDark?: boolean };

const SKILLS: Logo[] = [
  { src: "/assets/icon/logos/react.svg", alt: "React" },
  { src: "/assets/icon/logos/nextjs.svg", alt: "Next.js", isDark: true },
  { src: "/assets/icon/logos/typescript.svg", alt: "TypeScript" },
  { src: "/assets/icon/logos/tailwind.svg", alt: "Tailwind" },
  { src: "/assets/icon/logos/javascript.svg", alt: "JavaScript" },
  { src: "/assets/icon/logos/pro.svg", alt: "Premiere Pro" },
  { src: "/assets/icon/logos/cinema4d.svg", alt: "Cinema 4D", isDark: true }, 
  { src: "/assets/icon/logos/node.svg", alt: "Node.js" },
  { src: "/assets/icon/logos/github.svg", alt: "GitHub", isDark: true },
  // Setting HTML and CSS to isDark: true will force them to be white, matching the other icons perfectly
  { src: "/assets/icon/logos/html.svg", alt: "HTML", isDark: true },
  { src: "/assets/icon/logos/css.svg", alt: "CSS", isDark: true },
];

export default function SkillsLogoMarquee() {
  const row1 = useMemo(() => [...SKILLS, ...SKILLS, ...SKILLS], []);
  const row2 = useMemo(() => [...SKILLS, ...SKILLS, ...SKILLS].reverse(), []);

  return (
    <div className="relative w-full py-24 overflow-hidden bg-transparent">
      <div className="relative z-10 space-y-16">
        <header className="max-w-7xl mx-auto px-6">
           <motion.div 
             initial={{ opacity: 0, x: -20 }} 
             whileInView={{ opacity: 1, x: 0 }} 
             viewport={{ once: true }}
             className="flex items-center gap-6"
           >
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-[0.3em]">
              Tech Stack<span className="text-blue-500">.</span>
            </h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-blue-500/40 to-transparent" />
          </motion.div>
        </header>

        <div className="flex flex-col gap-12 md:gap-20">
          <MarqueeRow items={row1} direction="left" speed={40} />
          <MarqueeRow items={row2} direction="right" speed={50} />
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
        className="flex gap-8 md:gap-16 px-8 flex-nowrap"
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
      className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center bg-[#080808] rounded-[2rem] md:rounded-[2.5rem] border border-white/10 group cursor-none"
    >
      <div className="absolute z-20 w-16 h-16 bg-blue-500/10 blur-[25px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-[1px] bg-[#0c0c0c] rounded-[1.9rem] md:rounded-[2.4rem] z-10" />

      <div className="relative z-30 w-12 h-12 md:w-16 md:h-16 transition-all duration-500 group-hover:scale-110">
        <Image
          src={logo.src}
          alt={logo.alt}
          fill
          className="object-contain"
          style={{
            // By setting HTML/CSS to isDark: true in the array above, 
            // they now use this high-contrast filter to appear perfectly white.
            filter: logo.isDark 
              ? "brightness(0) invert(1) brightness(1.5)" 
              : "none"
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          y: isHovered ? -15 : 0 
        }}
        className="absolute -top-12 px-3 py-1 bg-zinc-900 border border-white/10 text-white text-[9px] font-bold uppercase tracking-widest rounded shadow-xl z-50 pointer-events-none"
      >
        {logo.alt}
      </motion.div>
    </motion.div>
  );
}