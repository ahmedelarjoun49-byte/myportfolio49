"use client";

import React, { useMemo, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

type Props = {
  title?: string;
  subtitle?: string;
  mediaSrc?: string; // "/grad.mp4" or "/mee.jpg"
  chip?: string; // "Class of 2025"
  year?: string; // "2024–2025"
  program?: string; // "Licence • Développement Multimédia 3D & Web"
  details?: string[]; // extra text lines that reveal while scrolling
};

function isVideo(src: string) {
  return /\.(mp4|webm|ogg)$/i.test(src);
}

export default function GraduationSplitReveal({
  title = "GRADUATION",
  subtitle = "Class of 2025",
  mediaSrc = "/mee.jpg",
  chip = "2025",
  year = "2024–2025",
  program = "Licence • Développement Multimédia 3D & Web",
  details,
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const lines = useMemo(
    () =>
      details ?? [
        "Completed a full year focused on modern web development & multimedia.",
        "Worked on real projects: UI systems, performance, and clean architecture.",
        "Built strong foundations in React / Next.js + component-driven design.",
        "Improved workflow: Git, deployments, iteration, and product thinking.",
        "Ready for internships / junior roles with real-world portfolio work.",
      ],
    [details]
  );

  //  ✅ scroll progress for the whole section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // smooth it (important for “premium” feel)
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 22, mass: 0.3 });

  // main split motion
  const mediaX = useTransform(p, [0, 1], [0, 140]);
  const textX = useTransform(p, [0, 1], [0, -140]);

  // slight scale / depth for media
  const mediaScale = useTransform(p, [0, 0.6, 1], [1, 1.03, 1.06]);
  const mediaBlur = useTransform(p, [0, 1], ["blur(0px)", "blur(0.4px)"]);
  const glowOpacity = useTransform(p, [0, 0.5, 1], [0.2, 0.45, 0.25]);

  // text reveal
  const titleOpacity = useTransform(p, [0, 0.12], [0, 1]);
  const titleY = useTransform(p, [0, 0.12], [10, 0]);

  // each line fades in one by one as you scroll
  const lineReveal = (i: number) => {
    const start = 0.22 + i * 0.10;
    const end = start + 0.10;
    return {
      opacity: useTransform(p, [start, end], [0, 1]),
      y: useTransform(p, [start, end], [10, 0]),
    };
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: "220vh" }} // big scroll area (controls the effect)
    >
      {/* background vibes */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ opacity: glowOpacity }}
      >
        <div className="absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-emerald-500/25 blur-[120px]" />
        <div className="absolute -right-40 bottom-10 h-[600px] w-[600px] rounded-full bg-cyan-500/20 blur-[140px]" />
      </motion.div>

      {/* sticky stage */}
      <div className="sticky top-0 h-screen">
        <div className="mx-auto flex h-full max-w-7xl items-center px-4 md:px-8">
          <div className="grid w-full items-center gap-10 md:grid-cols-[1.15fr_0.85fr]">
            {/* MEDIA (moves right) */}
            <motion.div style={{ x: mediaX, scale: mediaScale }} className="relative">
              <motion.div
                className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] shadow-[0_30px_120px_rgba(0,0,0,0.55)]"
                style={{ filter: mediaBlur }}
              >
                <div className="relative aspect-[16/10]">
                  {isVideo(mediaSrc) ? (
                    <video
                      className="h-full w-full object-cover"
                      src={mediaSrc}
                      muted
                      playsInline
                      autoPlay
                      loop
                    />
                  ) : (
                    <Image src={mediaSrc} alt="Graduation" fill className="object-cover" />
                  )}

                  {/* overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                </div>

                <div className="flex items-center justify-between px-5 py-4">
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-[0.24em] text-white/60">
                      {subtitle}
                    </div>
                    <div className="truncate text-sm font-semibold text-white/85">
                      {program} — {year}
                    </div>
                  </div>

                  <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-300/20">
                    {chip}
                  </div>
                </div>
              </motion.div>

              {/* small glow ring */}
              <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[42px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-purple-500/10 blur-3xl" />
            </motion.div>

            {/* TEXT (moves left + reveals) */}
            <motion.div style={{ x: textX }} className="relative">
              <motion.div
                className="rounded-[28px] border border-white/10 bg-white/[0.04] p-7 md:p-9 backdrop-blur-xl shadow-[0_22px_90px_rgba(0,0,0,0.35)]"
                style={{ opacity: titleOpacity, y: titleY }}
              >
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300/90">
                  Education Journey
                </div>

                <h3 className="mt-3 text-4xl md:text-5xl font-black tracking-tight text-white">
                  {title}
                </h3>

                <p className="mt-3 text-white/70 text-base md:text-lg">
                  {subtitle} • {program} • {year}
                </p>

                <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                <div className="space-y-3">
                  {lines.map((t, i) => {
                    const r = lineReveal(i);
                    return (
                      <motion.div
                        key={i}
                        style={{ opacity: r.opacity, y: r.y }}
                        className="flex gap-3 text-white/75"
                      >
                        <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-emerald-300/70" />
                        <p className="leading-relaxed">{t}</p>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.div
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 ring-1 ring-white/10"
                  initial={false}
                  style={{
                    opacity: useTransform(p, [0.68, 0.84], [0, 1]),
                    y: useTransform(p, [0.68, 0.84], [10, 0]),
                  }}
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Scroll to reveal story
                </motion.div>
              </motion.div>

              {/* extra soft behind */}
              <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[42px] bg-gradient-to-b from-emerald-500/8 via-cyan-500/8 to-transparent blur-3xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
