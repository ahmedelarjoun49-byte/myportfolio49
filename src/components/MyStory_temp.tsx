"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionValue, 
  useMotionTemplate, 
  useSpring
} from "framer-motion";

// Native Font Optimization Layer
import { Imperial_Script, Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";

const imperialScript = Imperial_Script({ weight: "400", subsets: ["latin"] });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const cormorant = Cormorant_Garamond({ weight: ["300", "400"], style: ["italic", "normal"], subsets: ["latin"] });

interface Internship {
  title: string;
  company: string;
  location: string;
  description: string;
  preview: string;
  videoUrl?: string; 
  tags: string[];
}

const INTERNSHIPS: Internship[] = [
  {
    title: "Agency Interface Design",
    company: "Geek Culture Agency",
    location: "Casablanca",
    description: "Designed the initial visual interface for the agency's own website. I focused on translating the 'Geek' identity into a clean, modern UI, establishing the foundational layout used for their digital presence.",
    preview: "/photooos/geek.png", 
    tags: ["UI/UX", "Visual Design", "Casablanca"],
  },
  {
    title: "Intern Management System",
    company: "Media Zone (NetHub)",
    location: "Rabat Agdal",
    description: "Developed a comprehensive 'Gestionnaire des Stagiaires' using PHP and Laravel. This involved architecting a relational SQL database to streamline the agency's internal administration workflow.",
    preview: "/photooos/mediazone.jpg", 
    tags: ["PHP", "Laravel", "SQL Database", "Backend"],
  },
  {
    title: "Cinematic ROG Commercial",
    company: "Next Level",
    location: "Rabat",
    description: "Directed a high-end 3D commercial for the Asus ROG Strix. This work was officially recognized and featured by Asus Maroc and Next Level as a primary promotional asset for the ROG Strix SCAR series.",
    videoUrl: "https://www.youtube.com/watch?v=SOeqmcSRUlE", 
    preview: "/photos11/webdesign.jpg", 
    tags: [],
  },
];

export default function MyStory() {
  const containerRef = useRef<HTMLElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  const spotlight = useMotionTemplate`radial-gradient(1000px circle at ${smoothX}px ${smoothY}px, rgba(37, 99, 235, 0.08), transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove} 
      className="relative py-32 bg-[#020408] text-white overflow-hidden [perspective:1200px]"
    >
      <motion.div className="absolute inset-0 pointer-events-none z-10" style={{ background: spotlight }} />

      <div className="relative z-20 max-w-7xl mx-auto px-6">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-12">
          <div className="space-y-3">
            <motion.h2 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`${cormorant.className} text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-white`}
            >
              Parcours & Expériences<span className="text-blue-500">.</span>
            </motion.h2>
            <div className="w-20 h-[2px] bg-blue-500" />
          </div>
          
          <span 
            className={`${imperialScript.className} text-4xl text-blue-400/90 select-none drop-shadow-[0_0_15px_rgba(37,99,235,0.3)]`}
          >
            histoire de projet
          </span>
        </header>

        <div className="flex flex-col gap-36 md:gap-48 pb-16 max-w-5xl mx-auto">
          {INTERNSHIPS.map((item, idx) => (
            <InternshipCard 
              key={idx} 
              item={item} 
              index={idx} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface InternshipCardProps {
  item: Internship;
  index: number;
}

function InternshipCard({ item, index }: InternshipCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isLayoutInverted = index % 2 !== 0;

  const { scrollYProgress } = useScroll({ 
    target: cardRef, 
    offset: ["start end", "end start"] 
  });

  const cardOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.85, 0.95], [0, 1, 1, 0]);
  const cardScale = useTransform(scrollYProgress, [0.1, 0.25], [0.96, 1]);

  const pcX = useSpring(useTransform(scrollYProgress, [0, 1], [-50, 120]), { stiffness: 25, damping: 25 });
  const pcY = useSpring(useTransform(scrollYProgress, [0, 1], [80, -80]), { stiffness: 25, damping: 25 });
  const pcRotate = useSpring(useTransform(scrollYProgress, [0, 1], [-8, 6]), { stiffness: 25, damping: 25 });
  const pcScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.4, 1.6]);
  const pcOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.4, 0.4, 0]);

  return (
    <motion.div 
      ref={cardRef} 
      style={{ opacity: cardOpacity, scale: cardScale }} 
      className="relative w-full flex items-center min-h-[500px] p-6 md:p-8 rounded-3xl transition-all duration-500 hover:bg-white/[0.015] hover:backdrop-blur-sm border border-transparent hover:border-white/[0.04]"
    >
      {/* ── ASUS IMMERSIVE PARALLAX DECK ── */}
      {item.company === "Next Level" && (
        <div className="absolute inset-0 pointer-events-none overflow-visible z-0 hidden lg:block">
           <motion.div 
            style={{ 
              x: pcX,
              y: pcY,
              rotateZ: pcRotate,
              scale: pcScale,
              opacity: pcOpacity,
            }}
            className="absolute top-0 right-[-15%] w-[800px] h-[800px]"
          >
            <div className="relative w-full h-full">
              <Image 
                src="/pictures/asus.png" 
                alt="Asus ROG Asset" 
                fill 
                className="object-contain drop-shadow-[0_0_80px_rgba(37,99,235,0.25)]"
                style={{
                  maskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
                  WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 80%)'
                }}
              />
            </div>
          </motion.div>
        </div>
      )}

      <div className="relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Media Port Layer */}
        <div className={`lg:col-span-7 ${isLayoutInverted ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="group relative aspect-video rounded-2xl overflow-hidden border border-white/[0.08] bg-[#070b14]/80 backdrop-blur-2xl shadow-2xl transition-all duration-500 hover:border-blue-500/40 hover:shadow-blue-500/10">
            <MediaDisplay videoUrl={item.videoUrl} preview={item.preview} title={item.title} />
          </div>
        </div>

        {/* Core Meta Details */}
        <div className={`lg:col-span-5 ${isLayoutInverted ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 
                className={`${cormorant.className} text-3xl sm:text-4xl font-light italic text-white tracking-tight leading-tight`}
              >
                {item.title}
              </h3>
              
              <div className="flex items-center gap-2.5">
                <span className={`${plusJakarta.className} text-blue-400 font-semibold text-xs uppercase tracking-wider`}>
                  {item.company}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span className={`${plusJakarta.className} text-slate-400 text-[11px] font-medium uppercase tracking-widest`}>
                  {item.location}
                </span>
              </div>
            </div>

            <p className={`${plusJakarta.className} text-slate-300 text-sm font-normal leading-relaxed max-w-md`}>
              {item.description}
            </p>

            {/* Tags Layer */}
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {item.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className={`${plusJakarta.className} px-2.5 py-1 border border-blue-500/20 bg-blue-500/5 rounded-md text-[10px] font-semibold text-blue-300 uppercase tracking-wider`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface MediaDisplayProps {
  videoUrl?: string;
  preview: string;
  title: string;
}

function MediaDisplay({ videoUrl, preview, title }: MediaDisplayProps) {
  if (videoUrl?.includes("youtube.com") || videoUrl?.includes("youtu.be")) {
    const videoId = videoUrl.includes("v=") ? videoUrl.split("v=")[1].split("&")[0] : videoUrl.split("/").pop();
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1`}
        title={title}
        className="w-full h-full scale-[1.02] pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity duration-500" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    );
  }
  if (videoUrl) {
    return <video src={videoUrl} autoPlay muted loop playsInline className="w-full h-full object-cover opacity-85" />;
  }
  return (
    <Image 
      src={preview} 
      alt={title} 
      fill 
      className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out" 
    />
  );
}