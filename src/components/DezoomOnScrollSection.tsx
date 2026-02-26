"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  /** how long the scroll animation lasts (bigger = longer). ex: 180 = 180vh */
  heightVh?: number;
  /** sticky distance from top (tailwind). ex: "top-24" */
  stickyTop?: string;
};

export default function DezoomOnScrollSection({
  children,
  heightVh = 180,
  stickyTop = "top-24",
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);

  // progress of scroll inside this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // ✅ BIG when entering, NORMAL in middle, SMALL when leaving
  const rawScale = useTransform(scrollYProgress, [0, 0.45, 1], [1.08, 1.0, 0.92]);
  const scale = useSpring(rawScale, { stiffness: 140, damping: 26, mass: 0.8 });

  // optional premium lift
  const rawY = useTransform(scrollYProgress, [0, 0.5, 1], [18, 0, 18]);
  const y = useSpring(rawY, { stiffness: 140, damping: 26, mass: 0.8 });

  // optional tiny fade at edges
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.92, 1, 1, 0.92]);

  return (
    <section ref={sectionRef} className="relative" style={{ height: `${heightVh}vh` }}>
      <div className={`sticky ${stickyTop} flex justify-center`}>
        <motion.div style={{ scale, y, opacity }} className="w-full max-w-4xl">
          {children}
        </motion.div>
      </div>
    </section>
  );
}
