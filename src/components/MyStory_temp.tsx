"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionValue, 
  useMotionTemplate, 
  useSpring,
  AnimatePresence
} from "framer-motion";
import { Maximize2 } from "lucide-react";

interface Internship {
  label: string;
  title: string;
  company: string;
  location: string;
  description: string;
  preview: string;
  videoUrl?: string; 
  tags: string[];
  proofs?: { src: string; alt: string }[];
}

const INTERNSHIPS: Internship[] = [
  {
    label: "1st Year Project",
    title: "Agency Interface Design",
    company: "Geek Culture Agency",
    location: "Casablanca",
    description: "Designed the initial visual interface for the agency's own website. I focused on translating the 'Geek' identity into a clean, modern UI, establishing the foundational layout used for their digital presence.",
    preview: "/photooos/geek.png", 
    tags: ["UI/UX", "Visual Design", "Casablanca"],
  },
  {
    label: "2nd Year Stage",
    title: "Intern Management System",
    company: "Media Zone (NetHub)",
    location: "Rabat Agdal",
    description: "Developed a comprehensive 'Gestionnaire des Stagiaires' using PHP and Laravel. This involved architecting a relational SQL database to streamline the agency's internal administration workflow.",
    preview: "/photooos/mediazone.jpg", 
    tags: ["PHP", "Laravel", "SQL Database", "Backend"],
  },
  {
    label: "3rd Year Graduation",
    title: "Cinematic ROG Commercial",
    company: "Next Level",
    location: "Rabat",
    description: "Directed a high-end 3D commercial for the Asus ROG Strix. This work was officially recognized and featured by Asus Maroc and Next Level as a primary promotional asset for the ROG Strix SCAR series.",
    videoUrl: "https://www.youtube.com/watch?v=SOeqmcSRUlE", 
    preview: "/photos11/webdesign.jpg", 
    tags: ["3D Animation", "C4D", "Adobe Premiere"],
    proofs: [
      { src: "/rogproof.png", alt: "Asus Maroc Official Post" },
      { src: "/rogproof2.png", alt: "Next Level Official Post" }
    ]
  },
];

export default function MyStory() {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedProof, setSelectedProof] = useState<{ src: string; alt: string } | null>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  const spotlight = useMotionTemplate`radial-gradient(1000px circle at ${smoothX}px ${smoothY}px, rgba(37, 99, 235, 0.12), transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent) => {
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
      className="relative py-24 bg-white dark:bg-[#020617] transition-colors duration-700 overflow-hidden"
    >
      <motion.div className="absolute inset-0 pointer-events-none z-10" style={{ background: spotlight }} />

      <AnimatePresence>
        {selectedProof && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProof(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-square md:aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <Image src={selectedProof.src} alt={selectedProof.alt} fill className="object-contain" priority />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 max-w-7xl mx-auto px-6">
        <header className="mb-32 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black text-black dark:text-white tracking-tighter uppercase leading-none"
          >
            STAGES<span className="text-blue-600">.</span>
          </motion.h2>
          <p className="text-blue-600 dark:text-blue-500 font-bold uppercase tracking-[0.5em] text-xs mt-6 opacity-80">Experience Timeline</p>
        </header>

        <div className="flex flex-col gap-40 pb-32">
          {INTERNSHIPS.map((item, idx) => (
            <InternshipCard 
              key={idx} 
              item={item} 
              index={idx} 
              onOpenProof={(proof) => setSelectedProof(proof)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function InternshipCard({ item, index, onOpenProof }: { 
  item: Internship; 
  index: number; 
  onOpenProof: (proof: { src: string; alt: string }) => void 
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVideoLeft = index % 2 !== 0;

  const { scrollYProgress } = useScroll({ 
    target: cardRef, 
    offset: ["start end", "end start"] 
  });

  const cardOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 0.9], [0, 1, 1, 0]);
  const cardScale = useTransform(scrollYProgress, [0.1, 0.3], [0.92, 1]);

  // --- PC Dynamic Transformations ---
  // Moves right as you scroll down
  const pcX = useTransform(scrollYProgress, [0, 1], [0, 150]); 
  // Grows significantly bigger
  const pcSizeScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.8]);
  // Intensifies blur as it moves/scales
  const pcBlur = useTransform(scrollYProgress, [0.4, 1], [0, 15]);
  const pcBlurFilter = useMotionTemplate`blur(${pcBlur}px)`;

  return (
    <motion.div ref={cardRef} style={{ opacity: cardOpacity, scale: cardScale }} className="relative w-full flex items-center">
      
      {/* --- ASUS PC BACKGROUND EFFECT --- */}
      {item.company === "Next Level" && (
        <motion.div 
          style={{ 
            x: pcX, 
            scale: pcSizeScale,
            filter: pcBlurFilter
          }}
          className="absolute -top-40 -right-40 w-[800px] h-[800px] opacity-30 dark:opacity-60 pointer-events-none z-0 hidden lg:block"
        >
          <Image 
            src="/pictures/asus.png" 
            alt="Asus ROG Background" 
            fill 
            className="object-contain"
            style={{
                maskImage: 'radial-gradient(circle, black 30%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 80%)'
            }}
          />
        </motion.div>
      )}

      <div className="relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
        <div className={`lg:col-span-7 ${isVideoLeft ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="group relative aspect-video rounded-[2rem] overflow-hidden border border-zinc-200 dark:border-blue-500/30 shadow-2xl bg-zinc-100 dark:bg-black">
            <MediaDisplay videoUrl={item.videoUrl} preview={item.preview} title={item.title} />
          </div>
        </div>

        <div className={`lg:col-span-5 ${isVideoLeft ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                {item.label}
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">{item.title}</h2>
              <div className="flex flex-col gap-1">
                <p className="text-blue-600 dark:text-blue-500 font-extrabold text-sm uppercase tracking-wider">{item.company}</p>
                <p className="text-zinc-400 dark:text-zinc-500 text-xs font-medium uppercase tracking-widest">{item.location}</p>
              </div>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">{item.description}</p>

            {item.proofs && (
              <div className="pt-4 space-y-4">
                <p className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em]">Validation & Recognition</p>
                <div className="grid grid-cols-2 gap-4">
                  {item.proofs.map((proof, i) => (
                    <motion.div 
                      key={i} 
                      onClick={() => onOpenProof(proof)}
                      whileHover={{ y: -5 }}
                      className="group relative h-28 rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 cursor-pointer bg-zinc-50 dark:bg-zinc-900"
                    >
                      <Image src={proof.src} alt={proof.alt} fill className="object-cover opacity-50 group-hover:opacity-100 transition-all duration-500" />
                      <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 className="text-white w-5 h-5 drop-shadow-lg" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-zinc-100 dark:bg-blue-500/5 border border-zinc-200 dark:border-blue-500/20 rounded-lg text-[10px] font-bold text-zinc-500 dark:text-blue-400/80 uppercase">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MediaDisplay({ videoUrl, preview, title }: { videoUrl?: string; preview: string; title: string }) {
  if (videoUrl?.includes("youtube.com") || videoUrl?.includes("youtu.be")) {
    const videoId = videoUrl.includes("v=") ? videoUrl.split("v=")[1].split("&")[0] : videoUrl.split("/").pop();
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1`}
        title={title}
        className="w-full h-full scale-105 pointer-events-none" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    );
  }
  if (videoUrl) {
    return <video src={videoUrl} autoPlay muted loop playsInline className="w-full h-full object-cover" />;
  }
  return <Image src={preview} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />;
}