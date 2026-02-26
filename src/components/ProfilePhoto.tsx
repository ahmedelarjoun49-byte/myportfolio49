"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
  src: string;          // "/mee.jpg"
  alt: string;
  hoverSrc?: string;    // "/avatar11.jpg"
};

export default function ProfilePhoto({ src, alt, hoverSrc = "/avatar11.jpg" }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="
        relative mx-auto
        w-[320px] h-[420px]
        md:w-[360px] md:h-[460px]
        lg:w-[420px] lg:h-[520px]
      "
    >
      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-12 rounded-[36px] bg-emerald-400/15 dark:bg-emerald-300/10 blur-3xl"
      />

      {/* Gradient border */}
      <div className="absolute inset-0 rounded-[28px] p-[2px] bg-gradient-to-br from-emerald-400/40 via-emerald-200/10 to-transparent">
        {/* Card */}
        <motion.div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
          className="
            relative w-full h-full overflow-hidden rounded-[26px]
            shadow-2xl cursor-pointer
            bg-black/10 dark:bg-black/20
          "
        >
          {/* REAL PHOTO */}
          <motion.div
            animate={{
              opacity: hovered ? 0 : 1,
              scale: hovered ? 1.05 : 1.03, // <-- helps fill edges
              filter: hovered ? "blur(4px)" : "blur(0px)",
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={src}
              alt={alt}
              fill
              priority
              className="object-cover"
              // More centered face + less head cut
              style={{ objectPosition: "10% 10%" }}
            />
          </motion.div>

          {/* AVATAR */}
          <motion.div
            animate={{
              opacity: hovered ? 1 : 0,
              scale: hovered ? 1.03 : 1.01, // <-- helps fill edges
              filter: hovered ? "blur(0px)" : "blur(8px)",
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={hoverSrc}
              alt="3D Avatar"
              fill
              className="object-cover"
              // Tuned for portraits
              style={{ objectPosition: "0% 0%" }}
            />
          </motion.div>

          {/* Depth vignette */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Shine */}
          <motion.div
            initial={{ x: "-120%" }}
            animate={{ x: hovered ? "120%" : "-120%" }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute top-0 left-0 h-full w-1/3 pointer-events-none rotate-12
                       bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
