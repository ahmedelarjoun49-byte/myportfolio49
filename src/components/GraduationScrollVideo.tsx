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
                onError={(e) => (e.currentTarget.style.display = 'none')}
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
              <h1 className="text-6xl md:text-8xl font-serif text-white leading-[1.1] tracking-tight mb-8">
                Licence <br />
                <span className="italic font-light text-blue-400 drop-shadow-sm">
                  Multimédia 3D
                </span>
              </h1>

              <div className="space-y-8">
                {/* Academic Quote */}
                <motion.p 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-white text-xl md:text-2xl font-serif leading-relaxed italic border-l-4 border-blue-500 pl-8 max-w-xl"
                >
                  "The intersection of spatial design and digital logic."
                </motion.p>
                
                <motion.div 
                   initial={{ width: 0 }}
                   whileInView={{ width: 80 }}
                   transition={{ duration: 0.8, delay: 0.4 }}
                   className="h-px bg-blue-500/40" 
                />

                <p className="text-zinc-100 text-lg md:text-xl leading-relaxed font-sans font-light max-w-2xl">
                  This achievement represents three pivotal years of discipline. By merging 
                  <span className="text-white font-semibold"> 3D Visualization</span> with 
                  <span className="text-white font-semibold text-blue-200"> Web Engineering</span>, 
                  I have built a foundation that treats every interface as a living, immersive experience.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}