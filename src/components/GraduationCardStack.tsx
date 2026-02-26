"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";

type Props = {
  src?: string;
  title?: string;
  subtitle?: string;
  year?: string;
};

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function useLineReveal(p: MotionValue<number>, i: number, base = 0.32, step = 0.06) {
  const start = base + i * step;
  const end = start + 0.08;

  const t = useTransform(p, (v) => {
    const x = (v - start) / (end - start);
    return clamp01(x);
  });

  const opacity = useTransform(t, [0, 1], [0, 1]);
  const y = useTransform(t, [0, 1], [10, 0]);
  const blur = useTransform(t, [0, 1], ["blur(10px)", "blur(0px)"]);

  return { opacity, y, blur, t };
}

export default function GraduationScrollVideo({
  src = "/mee.jpg",
  title = "GRADUATION",
  subtitle = "Licence • Développement Multimédia 3D & Web — 2024–2025",
  year = "2025",
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 92%", "end 12%"],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 520,
    damping: 48,
    mass: 0.55,
  });

  const introOpacity = useTransform(p, [0, 0.06], [0, 1]);
  const introY = useTransform(p, [0, 0.07], [14, 0]);
  const introScale = useTransform(p, [0, 0.09], [0.992, 1]);
  const introBlur = useTransform(p, [0, 0.06], ["blur(14px)", "blur(0px)"]);

  const split = useTransform(p, [0.14, 0.28], [0, 1]);

  const mediaX = useTransform(split, [0, 1], [0, 170]);
  const textX = useTransform(split, [0, 1], [0, -170]);

  const mediaScale = useTransform(split, [0, 1], [1, 1.02]);
  const textScale = useTransform(split, [0, 1], [1, 1.01]);

  const storyT = useTransform(p, [0.22, 0.34], [0, 1]);
  const storyOpacity = useTransform(storyT, [0, 1], [0, 1]);
  const storyY = useTransform(storyT, [0, 1], [12, 0]);
  const storyBlur = useTransform(storyT, [0, 1], ["blur(10px)", "blur(0px)"]);

  const barW = useTransform(storyT, [0, 1], ["0%", "100%"]);

  const lines = useMemo(
    () => [
      "In 2024–2025, I completed my Licence in Développement Multimédia 3D & Web.",
      "I learned to mix clean UI engineering with strong fundamentals and creativity.",
      "This year shaped how I build: performance-first, detail-obsessed, and ready for real projects.",
    ],
    []
  );

  const l0 = useLineReveal(p, 0);
  const l1 = useLineReveal(p, 1);
  const l2 = useLineReveal(p, 2);

  const titleGlow = useMotionTemplate`drop-shadow(0 0 26px rgba(16,185,129,0.18))`;
  const hintOpacity = useTransform(p, [0.18, 0.28], [1, 0]);

  /* =========================================================
     HIGH-END SCROLL EFFECTS (bound to storyT)
     Keeps everything else the same.
  ========================================================= */

  // 3D tilt (subtle, expensive)
  const tiltX = useTransform(storyT, [0, 1], [6, 0]); // deg
  const tiltY = useTransform(storyT, [0, 1], [-10, 0]); // deg
  const lift = useTransform(storyT, [0, 1], [10, 0]); // px

  // dynamic shadow depth
  const shadow = useMotionTemplate`0 ${useTransform(storyT, [0, 1], [34, 18])}px ${useTransform(
    storyT,
    [0, 1],
    [110, 70]
  )}px rgba(0,0,0,${useTransform(storyT, [0, 1], [0.28, 0.18])})`;

  // light sweep passing across the card
  const sweepX = useTransform(storyT, [0, 1], ["-60%", "140%"]);
  const sweepOpacity = useTransform(storyT, [0, 0.25, 1], [0, 0.55, 0.18]);
  const sweepBg = useMotionTemplate`linear-gradient(120deg,
    transparent 0%,
    rgba(255,255,255,${sweepOpacity}) 35%,
    rgba(255,255,255,${useTransform(storyT, [0, 1], [0.06, 0.02])}) 50%,
    transparent 70%)`;

  // aurora glow behind the card (grows with scroll)
  const auraOpacity = useTransform(storyT, [0, 1], [0.0, 0.65]);
  const auraBlur = useTransform(storyT, [0, 1], [40, 70]);
  const auraScale = useTransform(storyT, [0, 1], [0.96, 1.02]);

  // progress shine sweep
  const barShineX = useTransform(storyT, [0, 1], ["-40%", "140%"]);
  const barShineOpacity = useTransform(storyT, [0, 1], [0.0, 0.55]);

  return (
    <section ref={sectionRef} className="relative h-[115vh] overflow-hidden">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_30%,rgba(16,185,129,0.14),transparent_60%),radial-gradient(circle_at_80%_58%,rgba(6,182,212,0.10),transparent_62%),radial-gradient(circle_at_60%_75%,rgba(168,85,247,0.08),transparent_65%)] dark:bg-[radial-gradient(circle_at_22%_30%,rgba(16,185,129,0.20),transparent_60%),radial-gradient(circle_at_80%_58%,rgba(6,182,212,0.14),transparent_62%),radial-gradient(circle_at_60%_75%,rgba(168,85,247,0.12),transparent_65%)]" />
        <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)] bg-[linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.55)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      {/* sticky stage */}
      <div className="sticky top-0 flex min-h-screen items-center">
        <motion.div
          className="mx-auto w-full max-w-6xl px-4"
          style={{
            opacity: introOpacity,
            y: introY,
            scale: introScale,
            filter: introBlur as any,
          }}
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_420px]">
            {/* MEDIA CARD */}
            <motion.div className="relative z-20" style={{ x: mediaX, scale: mediaScale }}>
              <div className="pointer-events-none absolute -inset-12 rounded-[34px] bg-emerald-400/10 dark:bg-emerald-300/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-[28px] bg-white/70 dark:bg-black/30 backdrop-blur-2xl border border-black/5 dark:border-white/10 shadow-[0_34px_110px_rgba(0,0,0,0.22)]">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={src}
                    alt="Graduation"
                    fill
                    priority
                    className="object-cover object-[50%_20%]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent" />
                </div>

                <div className="flex items-center justify-between px-5 md:px-6 py-4 border-t border-black/5 dark:border-white/10">
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-gray-500 dark:text-gray-400">
                      Graduation
                    </p>
                    <p className="mt-1 text-sm md:text-[15px] font-medium text-gray-800 dark:text-gray-200 truncate">
                      {subtitle}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold bg-emerald-100 text-emerald-900 dark:bg-emerald-400 dark:text-emerald-950">
                    {year}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* TEXT + STORY */}
            <motion.div className="relative z-10 text-center lg:text-left" style={{ x: textX, scale: textScale }}>
              <motion.h3
                className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white"
                style={{ filter: titleGlow as any }}
              >
                {title}
              </motion.h3>

              <p className="mt-2 text-lg md:text-xl font-semibold text-emerald-800 dark:text-emerald-300">
                Class of {year}
              </p>

              {/* STORY CARD (same logic + high-end scroll effects) */}
              <motion.div
                className="relative mt-6"
                style={{
                  opacity: storyOpacity,
                  y: storyY,
                  filter: storyBlur as any,
                }}
              >
                {/* aurora glow behind */}
                <motion.div
                  className="pointer-events-none absolute -inset-10 rounded-[40px]"
                  style={{
                    opacity: auraOpacity,
                    scale: auraScale,
                    filter: useMotionTemplate`blur(${auraBlur}px)`,
                    background:
                      "radial-gradient(circle at 20% 25%, rgba(16,185,129,0.30), transparent 55%), radial-gradient(circle at 85% 55%, rgba(6,182,212,0.22), transparent 55%), radial-gradient(circle at 60% 80%, rgba(168,85,247,0.18), transparent 60%)",
                  }}
                />

                <motion.div
                  className="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-white/55 dark:bg-white/[0.04] backdrop-blur-2xl p-5 md:p-6"
                  style={{
                    transformStyle: "preserve-3d",
                    rotateX: tiltX,
                    rotateY: tiltY,
                    y: lift,
                    boxShadow: shadow as any,
                  }}
                >
                  {/* soft top shine */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/65 to-transparent dark:from-white/10" />

                  {/* inner ring */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/35 dark:ring-white/10" />

                  {/* accent rail */}
                  <div className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-emerald-400 via-cyan-400 to-purple-400 opacity-80" />

                  {/* micro grain (subtle) */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-[0.05]"
                    style={{
                      backgroundImage:
                        "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
                      backgroundSize: "18px 18px",
                      maskImage:
                        "radial-gradient(80% 70% at 50% 40%, black, transparent)",
                    }}
                  />

                  {/* LIGHT SWEEP (moves with scroll) */}
                  <motion.div
                    className="pointer-events-none absolute inset-y-0 w-[55%] rotate-12"
                    style={{
                      left: sweepX,
                      background: sweepBg as any,
                      mixBlendMode: "overlay",
                      opacity: useTransform(storyT, [0, 1], [0.0, 1.0]),
                    }}
                  />

                  {/* content */}
                  <motion.div className="relative space-y-3 text-left">
                    <motion.p
                      style={{ opacity: l0.opacity, y: l0.y, filter: l0.blur as any }}
                      className="text-[15px] md:text-base font-medium text-gray-900 dark:text-gray-100 leading-relaxed"
                    >
                      {lines[0]}
                    </motion.p>

                    <motion.p
                      style={{ opacity: l1.opacity, y: l1.y, filter: l1.blur as any }}
                      className="text-[14px] md:text-[15px] text-gray-700 dark:text-gray-200 leading-relaxed"
                    >
                      {lines[1]}
                    </motion.p>

                    <motion.p
                      style={{ opacity: l2.opacity, y: l2.y, filter: l2.blur as any }}
                      className="text-[14px] md:text-[15px] text-gray-700 dark:text-gray-200 leading-relaxed"
                    >
                      {lines[2]}
                    </motion.p>
                  </motion.div>

                  {/* modern divider */}
                  <div className="mt-5 h-px w-full bg-black/10 dark:bg-white/10" />

                  {/* progress */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-[11px] tracking-[0.18em] uppercase font-semibold text-gray-500 dark:text-gray-400">
                      <span>Story</span>
                      <span className="text-emerald-700 dark:text-emerald-300">{year}</span>
                    </div>

                    <div className="relative mt-3 h-2.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 shadow-[0_0_18px_rgba(16,185,129,0.25)]"
                        style={{ width: barW }}
                      />
                      {/* moving shine over the bar */}
                      <motion.div
                        className="pointer-events-none absolute inset-y-0 w-[35%] rotate-12"
                        style={{
                          left: barShineX,
                          opacity: barShineOpacity,
                          background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
                          mixBlendMode: "overlay",
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* hint pill */}
              <motion.div
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white/55 dark:bg-white/[0.04] backdrop-blur-xl px-4 py-2 text-sm text-gray-700 dark:text-gray-200 shadow-sm"
                style={{ opacity: hintOpacity }}
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Scroll down to reveal the story</span>
                <span className="ml-1 opacity-70">↓</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
