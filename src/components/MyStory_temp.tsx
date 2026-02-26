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
  video?: string;
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
    video: "/PROJETASUS.mp4", 
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
  
  // Spotlight opacity adjusted for light vs dark
  const spotlight = useMotionTemplate`radial-gradient(1000px circle at ${smoothX}px ${smoothY}px, rgba(37, 99, 235, 0.1), transparent 80%)`;

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

      {/* --- FULLSCREEN MODAL --- */}
      <AnimatePresence>
        {selectedProof && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProof(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/90 dark:bg-black/95 backdrop-blur-xl p-4 md:p-10 cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl h-[90vh] rounded-3xl overflow-hidden border border-blue-500/30 shadow-2xl"
            >
              <Image src={selectedProof.src} alt={selectedProof.alt} fill className="object-contain" priority />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 max-w-7xl mx-auto px-6">
        <header className="mb-32 text-center">
          <motion.h2 className="text-7xl md:text-9xl font-black text-black dark:text-white tracking-tighter uppercase leading-none">
            STAGES<span className="text-blue-600">.</span>
          </motion.h2>
          <p className="text-blue-600 dark:text-blue-500 font-bold uppercase tracking-[0.6em] text-[10px] mt-4 opacity-60">Experience Timeline</p>
        </header>

        <div className="flex flex-col gap-32 pb-32">
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

  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const cardOpacity = useTransform(scrollYProgress, [0.2, 0.35, 0.8, 0.95], [0, 1, 1, 0]);
  const cardScale = useTransform(scrollYProgress, [0.2, 0.4], [0.95, 1]);

  return (
    <motion.div ref={cardRef} className="relative w-full flex items-center min-h-[50vh]">
      <motion.div style={{ opacity: cardOpacity, scale: cardScale }} className="relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        
        {/* Media Side */}
        <div className={`lg:col-span-7 ${isVideoLeft ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border-2 border-zinc-200 dark:border-blue-500/40 shadow-xl dark:shadow-[0_0_40px_-15px_rgba(59,130,246,0.4)] bg-zinc-100 dark:bg-black">
            {item.video ? (
              <video src={item.video} autoPlay muted loop playsInline className="w-full h-full object-cover" />
            ) : (
              <Image src={item.preview} alt={item.title} fill className="object-cover" />
            )}
          </div>
        </div>

        {/* Text Side */}
        <div className={`lg:col-span-5 ${isVideoLeft ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="relative p-10 rounded-[2.5rem] bg-white/80 dark:bg-[#030712]/85 border-2 border-zinc-100 dark:border-blue-500/20 backdrop-blur-2xl shadow-xl">
            <div className="space-y-6">
              <span className="inline-block text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">
                {item.label}
              </span>

              <div>
                <h2 className="text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-3">{item.title}</h2>
                <p className="text-blue-600 dark:text-blue-500 font-bold text-[11px] uppercase tracking-[0.2em]">
                  {item.company} <span className="mx-2 text-zinc-300 dark:text-white/20">•</span> {item.location}
                </p>
              </div>

              <p className="text-zinc-600 dark:text-slate-400 text-lg leading-relaxed font-medium">{item.description}</p>

              {/* --- ENHANCED INTERACTIVE PROOFS --- */}
              {item.proofs && (
                <div className="pt-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <p className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest whitespace-nowrap">Official Posts</p>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-blue-500/40 to-transparent"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {item.proofs.map((proof, i) => (
                      <motion.div 
                        key={i} 
                        onClick={() => onOpenProof(proof)}
                        whileHover={{ scale: 1.02 }}
                        className="group relative h-[140px] rounded-2xl overflow-hidden border-2 border-zinc-200 dark:border-blue-500/20 bg-zinc-50 dark:bg-blue-950/20 cursor-pointer"
                      >
                        <div className="absolute top-2 right-2 z-10 bg-blue-600/80 p-1.5 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity">
                            <Maximize2 size={14} className="text-white" />
                        </div>

                        <Image 
                          src={proof.src} 
                          alt={proof.alt} 
                          fill 
                          className="object-cover opacity-60 dark:opacity-50 group-hover:opacity-100 transition-all duration-500"
                        />

                        <div className="absolute inset-0 bg-blue-600/20 dark:bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white uppercase tracking-tighter bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                                Click to View
                            </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-zinc-100 dark:bg-blue-500/5 border border-zinc-200 dark:border-blue-600/30 rounded-full text-[10px] font-bold text-zinc-500 dark:text-blue-300/80 uppercase tracking-tight">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}