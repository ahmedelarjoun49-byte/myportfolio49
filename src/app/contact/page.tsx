"use client";

import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useRef } from "react";

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  // Track scroll only in this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smooth progress
  const p = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.6,
  });

  // Parallax / depth
  const y = useTransform(p, [0, 1], prefersReducedMotion ? [0, 0] : [18, -18]);
  const scale = useTransform(
    p,
    [0, 0.5, 1],
    prefersReducedMotion ? [1, 1, 1] : [0.985, 1.01, 0.99]
  );

  // Blur (number) + motion template (no .to usage)
  const blurPx = useTransform(p, [0, 0.35], prefersReducedMotion ? [0, 0] : [10, 0]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  // Fade in slightly
  const opacity = useTransform(p, [0, 0.25], [0.6, 1]);

  return (
    <main className="relative w-full overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Light */}
        <div className="absolute -top-24 left-1/2 h-64 w-[720px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl dark:hidden" />
        <div className="absolute top-32 left-1/3 h-72 w-[760px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl dark:hidden" />

        {/* Dark */}
        <div className="hidden dark:block absolute -top-28 left-1/2 h-72 w-[760px] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="hidden dark:block absolute top-40 left-1/3 h-72 w-[820px] -translate-x-1/2 rounded-full bg-purple-400/10 blur-3xl" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/10 to-transparent dark:from-black/50" />
      </div>

      {/* HERO / CTA SECTION */}
      <section
        ref={sectionRef}
        className="mx-auto max-w-6xl px-4 md:px-8 lg:px-10 pt-24 md:pt-28 pb-28 md:pb-40"
      >
        <motion.div
          style={{
            y,
            scale,
            opacity,
            filter: prefersReducedMotion ? "none" : (filter as unknown as string),
          }}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.985 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Card glow */}
          <div className="pointer-events-none absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-r from-purple-500/15 via-emerald-500/15 to-purple-500/15 blur-2xl dark:from-purple-400/10 dark:via-emerald-400/10 dark:to-purple-400/10" />

          <div className="rounded-3xl border border-black/10 bg-white/70 backdrop-blur-xl px-6 py-12 md:px-10 md:py-14 text-center shadow-sm dark:border-white/10 dark:bg-zinc-950/60">
            {/* Icon */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mb-4 flex justify-center"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-white/60 shadow-sm dark:border-white/10 dark:bg-zinc-950/50">
                <Heart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 0.15, duration: 0.55 }}
              className="text-3xl md:text-4xl font-bold text-zinc-950 dark:text-white"
            >
              Passion for Building
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 0.22, duration: 0.55 }}
              className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-zinc-600 dark:text-zinc-300"
            >
              Every project is a chance to learn and create something polished.
              I focus on clean UI, smooth interactions, and modern performance.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 0.28, duration: 0.55 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Link
                href="/contact"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl
                  bg-zinc-950 px-6 py-3 text-sm font-semibold text-white
                  shadow-sm transition-all
                  hover:-translate-y-0.5 hover:shadow-md active:translate-y-0
                  dark:bg-white dark:text-zinc-950"
              >
                Ready to work together?
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/projects"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl
                  border border-black/15 bg-white/60 px-6 py-3 text-sm font-semibold text-zinc-950
                  transition-all hover:-translate-y-0.5 hover:bg-zinc-950 hover:text-white hover:shadow-md active:translate-y-0
                  dark:border-white/15 dark:bg-zinc-950/50 dark:text-white dark:hover:bg-white dark:hover:text-zinc-950"
              >
                View Projects
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Transition into footer */}
      <div className="pointer-events-none h-16 w-full bg-gradient-to-b from-transparent to-black/10 dark:to-black/40" />
    </main>
  );
}
