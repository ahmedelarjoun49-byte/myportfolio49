"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function GraduationRoyaleHero() {
  return (
    <section className="relative w-full bg-black py-24 lg:py-32 overflow-hidden border-b border-white/5">
      
      {/* 1. Background with subtle Parallax-lite */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image 
          src="/photooos/micro3.png" 
          alt="Background" 
          fill 
          className="object-cover blur-[1px]" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Portrait & Logo Reveal */}
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            {/* Logo Slot */}
            <div className="mb-8 h-16 w-32 relative">
               <Image 
                src="/campus-logo.png" 
                alt="Logo"
                fill
                className="object-contain brightness-200"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>

            <div className="relative w-full max-w-[380px] aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
              <Image 
                src="/yassine.jpg" 
                alt="Ahmed Portrait" 
                fill 
                className="object-cover" 
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Right Side: Text Staggered Reveal */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            >
              {/* Professional Editorial Typography Header */}
              <div className="mb-8">
                <h1 className="text-5xl md:text-7xl font-serif tracking-tight leading-none">
                  <span className="bg-gradient-to-r from-[#fef08a] via-[#d4af37] to-[#ca8a04] bg-clip-text text-transparent font-medium tracking-normal drop-shadow-[0_2px_10px_rgba(212,175,55,0.15)]">
                    Licence
                  </span>
                  <span className="block mt-3 text-3xl md:text-5xl font-light italic font-serif text-zinc-300">
                    Multimédia <span className="text-blue-400 not-italic font-sans font-medium tracking-wide">3D</span>
                  </span>
                </h1>
              </div>

              <div className="space-y-8">
                {/* Academic Quote in French */}
                <motion.p 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-white text-xl md:text-2xl font-serif leading-relaxed italic border-l-2 border-blue-500/80 pl-6 max-w-xl text-zinc-200"
                >
                  &quot;À l&apos;intersection du design spatial et de la logique numérique.&quot;
                </motion.p>
                
                <motion.div 
                   initial={{ width: 0 }}
                   whileInView={{ width: 80 }}
                   transition={{ duration: 0.8, delay: 0.4 }}
                   className="h-px bg-blue-500/40" 
                />

                <p className="text-zinc-300 text-lg md:text-xl leading-relaxed font-sans font-light max-w-2xl">
                  Fondé sur <span className="text-white font-medium">2 années de bases en développement web</span>, ce parcours combine la rigueur technique avec l&apos;univers de la création vidéoludique et du monde de la <span className="text-white font-medium text-blue-300">3D</span>.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}