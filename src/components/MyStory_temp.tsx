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

// Native Font Optimization Layer
import { Imperial_Script, Plus_Jakarta_Sans, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";

const imperialScript = Imperial_Script({ weight: "400", subsets: ["latin"] });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const cormorant = Cormorant_Garamond({ weight: ["300", "400"], style: ["italic", "normal"], subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"] });

interface Internship {
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
  
  const spotlight = useMotionTemplate`radial-gradient(1000px circle at ${smoothX}px ${smoothY}px, rgba(37, 99, 235, 0.08), transparent 80%)`;

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
      className="relative py-32 bg-[#020408] text-white overflow-hidden [perspective:1200px]"
    >
      <motion.div className="absolute inset-0 pointer-events-none z-10" style={{ background: spotlight }} />

      {/* Lightbox Backdrop View */}
      <AnimatePresence>
        {selectedProof && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProof(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-square md:aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <Image src={selectedProof.src} alt={selectedProof.alt} fill className="object-contain" priority />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 max-w-7xl mx-auto px-6">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.04] pb-12">
          <div className="space-y-2">
            <motion.h2 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`${cormorant.className} text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-white`}
            >
              Parcours & Expériences<span className="text-blue-500">.</span>
            </motion.h2>
            <div className="w-16 h-[2px] bg-blue-600 opacity-80" />
          </div>
          
          <span 
            className={`${imperialScript.className} text-4xl text-blue-400 select-none drop-shadow-[0_0_15px_rgba(37,99,235,0.2)]`}
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
      className="relative w-full flex items-center min-h-[500px]"
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
                className="object-contain drop-shadow-[0_0_80px_rgba(37,99,235,0.2)]"
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
          <div className="group relative aspect-video rounded-2xl overflow-hidden border border-white/[0.04] bg-[#0a0d14]/60 backdrop-blur-xl shadow-2xl">
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
              
              <div className="flex items-baseline gap-2.5">
                <span className={`${plusJakarta.className} text-blue-400 font-semibold text-xs uppercase tracking-wider`}>
                  {item.company}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className={`${plusJakarta.className} text-slate-500 text-[11px] font-medium uppercase tracking-widest`}>
                  {item.location}
                </span>
              </div>
            </div>

            <p className={`${plusJakarta.className} text-slate-400 text-sm font-normal leading-relaxed max-w-md`}>
              {item.description}
            </p>

            {/* Validation Layer */}
            {item.proofs && (
              <div className="pt-2 space-y-3">
                <p className={`${jetbrains.className} text-[9px] font-medium text-slate-500 uppercase tracking-wider`}>
                  Validation & Presse
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {item.proofs.map((proof, i) => (
                    <motion.div 
                      key={i} 
                      onClick={() => onOpenProof(proof)}
                      whileHover={{ y: -3 }}
                      className="group relative h-20 rounded-lg overflow-hidden border border-white/[0.06] cursor-pointer bg-white/[0.01]"
                    >
                      <Image src={proof.src} alt={proof.alt} fill className="object-cover opacity-40 group-hover:opacity-100 transition-all duration-500" />
                      <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 className="text-white w-4 h-4 drop-shadow-md" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags Layer */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {item.tags.map((tag) => (
                <span 
                  key={tag} 
                  className={`${jetbrains.className} px-2 py-0.5 border border-white/[0.05] bg-white/[0.02] rounded text-[9px] font-medium text-slate-400 uppercase tracking-wider`}
                >
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
        className="w-full h-full scale-[1.02] pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    );
  }
  if (videoUrl) {
    return <video src={videoUrl} autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80" />;
  }
  return (
    <Image 
      src={preview} 
      alt={title} 
      fill 
      className="object-cover opacity-75 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out" 
    />
  );
}