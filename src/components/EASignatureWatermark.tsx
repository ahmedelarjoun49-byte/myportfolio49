"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type Props = {
  size?: number;
  opacity?: number;
};

export default function EASignatureWatermark({
  size = 420,
  opacity = 0.05,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle movement
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);

  return (
    <motion.div
      ref={ref}
      style={{ y, scale }}
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <Image
        src="/logo.svg"
        alt="EA Signature"
        width={size}
        height={size}
        className="select-none"
        style={{ opacity }}
        draggable={false}
      />
    </motion.div>
  );
}
