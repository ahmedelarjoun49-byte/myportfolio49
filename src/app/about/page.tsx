"use client";

import Experience from "@/components/Experience";
import Myplace from "@/components/Myplace";
import MyStory from "@/components/MyStory_temp";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { GraduationCap, Sparkles, BadgeCheck, MapPin } from "lucide-react";

/**
 * ✅ Animations
 */
const easeOut = [0.22, 1, 0.36, 1] as const;

const page: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.45, ease: easeOut } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease: easeOut } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.985, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: easeOut } },
};

const floaty: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: easeOut } },
};

function GlowOrb({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      aria-hidden
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -12, 0],
        x: [0, 10, 0],
      }}
      transition={{
        duration: 10,
        delay,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    />
  );
}

export default function About() {
  /**
   * ✅ Put your university logo here
   * - Add the file into /public, for example: /public/ismagi.png
   * - Then set src to "/ismagi.png"
   */
  const UNIVERSITY_LOGO_SRC = "/ismagi.png"; // <-- change this to your logo path

  const cards = [
    {
      title: "Clean Frontend Craft",
      text: "I build modern interfaces that feel fast, smooth, and premium — with attention to small details that users notice.",
      accent: "from-purple-500/15 via-purple-400/10 to-transparent",
      ring: "ring-purple-500/15",
    },
    {
      title: "Goal-Driven Delivery",
      text: "I focus on clear outcomes: performance, accessibility, and a UI that supports the project goals from day one.",
      accent: "from-blue-500/15 via-blue-400/10 to-transparent",
      ring: "ring-blue-500/15",
    },
    {
      title: "User Experience First",
      text: "Every animation and layout choice is made to improve clarity, confidence, and ease of use for real people.",
      accent: "from-emerald-500/15 via-emerald-400/10 to-transparent",
      ring: "ring-emerald-500/15",
    },
    {
      title: "Quality & Consistency",
      text: "I keep code and design consistent, scalable, and maintainable — so the product stays strong over time.",
      accent: "from-orange-500/15 via-orange-400/10 to-transparent",
      ring: "ring-orange-500/15",
    },
  ] as const;

  return (
    <motion.main
      variants={page}
      initial="hidden"
      animate="show"
      className="relative mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12"
    >
      {/* =========================
          HERO
      ========================== */}
      <section className="relative overflow-hidden pt-14 pb-16 md:pt-16 md:pb-20">
        {/* Background gradient wash */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-200/60 via-purple-100/20 to-transparent blur-3xl dark:from-purple-500/20 dark:via-purple-400/10 dark:opacity-80" />
          <div className="absolute -bottom-48 right-[-12rem] h-80 w-[50rem] rounded-full bg-gradient-to-l from-purple-200/45 via-transparent to-transparent blur-3xl dark:from-purple-500/15 dark:opacity-70" />
        </div>

        {/* Animated orbs */}
        <GlowOrb className="absolute top-10 right-10 w-32 h-32 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-xl -z-10" />
        <GlowOrb
          delay={0.6}
          className="absolute bottom-20 left-10 w-24 h-24 bg-purple-300/30 dark:bg-purple-400/10 rounded-full blur-xl -z-10"
        />
        <GlowOrb
          delay={1.2}
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-400/20 dark:bg-purple-300/10 rounded-full blur-lg -z-10"
        />

        {/* Subtle grid texture */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.35] dark:opacity-[0.22]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(124,58,237,0.18) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />

        <motion.div variants={stagger} initial="hidden" animate="show">
          {/* Identity row */}
          <motion.div
            variants={rise}
            className="mx-auto mb-10 flex w-full max-w-5xl flex-col items-center justify-between gap-4 rounded-3xl border border-gray-200/80 bg-white/70 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5 md:flex-row md:px-6"
          >
            {/* Left: logo + name */}
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-white/10">
                {/* University logo slot */}
                <Image
                  src={UNIVERSITY_LOGO_SRC}
                  alt="University Logo"
                  fill
                  className="object-contain p-2"
                  priority
                />
              </div>

              <div className="leading-tight">
                <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Portfolio
                </p>
                <h2 className="text-lg font-extrabold text-gray-900 dark:text-gray-100">
                  Ahmed El Arjoun
                </h2>
              </div>
            </div>

            {/* Right: chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/70 px-3 py-1 text-xs text-gray-800 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
                <GraduationCap className="h-4 w-4 text-purple-600 dark:text-purple-300" />
                ISMAGI Student
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/70 px-3 py-1 text-xs text-gray-800 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
                <BadgeCheck className="h-4 w-4 text-purple-600 dark:text-purple-300" />
                Frontend Developer
              </span>

              {/* Optional location (remove if you want) */}
              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/70 px-3 py-1 text-xs text-gray-800 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
                <MapPin className="h-4 w-4 text-purple-600 dark:text-purple-300" />
                Rabat, Morocco
              </span>
            </div>
          </motion.div>

          {/* Main headline */}
          <div className="text-center">
            <motion.div variants={rise} className="inline-block">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-gray-100">
                About me
                <span className="text-purple-600 dark:text-purple-300">.</span>
              </h1>

              {/* glow underline */}
              <motion.div
                variants={floaty}
                className="mx-auto mt-4 h-[6px] w-28 origin-left rounded-full bg-purple-600/30 dark:bg-purple-300/20 blur-[1px]"
              />
            </motion.div>

            <motion.p
              variants={rise}
              className="mt-7 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed max-w-4xl mx-auto border-l-4 md:border-l-8 border-purple-600 dark:border-purple-300 pl-4 md:pl-8"
            >
              Developing beautiful and functional websites is what I love doing,
              and{" "}
              <span className="text-purple-600 dark:text-purple-300 font-semibold">
                {`that's`} why I give my all
              </span>{" "}
              in every new challenge.
            </motion.p>

            {/* Tech badges */}
            <motion.div
              variants={rise}
              className="mt-7 flex flex-wrap items-center justify-center gap-2"
            >
              {["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-gray-200/80 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-1 text-xs sm:text-sm text-gray-800 dark:text-gray-200 backdrop-blur"
                  >
                    {t}
                  </span>
                )
              )}
            </motion.div>

            {/* CTA row */}
            <motion.div
              variants={rise}
              className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <a
                href="#story"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 hover:shadow-xl hover:shadow-purple-600/25 transition"
              >
                <Sparkles className="h-4 w-4" />
                Explore my story
              </a>

              <a
                href="#experience"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200/80 bg-white/70 px-5 py-3 text-sm font-semibold text-gray-900 backdrop-blur hover:bg-white transition dark:border-white/10 dark:bg-white/5 dark:text-gray-100 dark:hover:bg-white/10"
              >
                See experience
              </a>
            </motion.div>
          </div>

          {/* Cards */}
          <motion.div
            variants={stagger}
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
          >
            {cards.map((c) => (
              <motion.div
                key={c.title}
                variants={card}
                whileHover={{ y: -7, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
                className={[
                  "group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10",
                  "bg-white/90 dark:bg-white/5 backdrop-blur shadow-lg hover:shadow-xl transition-all duration-300 p-6",
                  "ring-1",
                  c.ring,
                ].join(" ")}
              >
                {/* Accent gradient */}
                <div
                  aria-hidden
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${c.accent}`}
                />

                <div className="relative">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                    {c.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mission */}
          <motion.div
            variants={rise}
            className="mt-12 rounded-2xl border border-purple-200 dark:border-purple-400/20 bg-gradient-to-r from-purple-50 to-gray-50 dark:from-white/5 dark:to-white/0 p-8 md:p-12 relative overflow-hidden"
          >
            <motion.div
              aria-hidden
              className="absolute -inset-x-20 -top-20 h-40 bg-purple-300/20 dark:bg-purple-400/10 blur-2xl"
              animate={{ x: [-40, 40, -40] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />

            <div className="relative text-center">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-5">
                My Mission
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
                To create{" "}
                <span className="text-purple-600 dark:text-purple-300 font-semibold">
                  innovative, accessible, and impactful digital solutions
                </span>{" "}
                that not only meet client requirements but exceed expectations.
                I believe in the power of technology to transform businesses and
                enhance user experiences.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* =========================
          SECTIONS
          - Add IDs so CTA buttons work
      ========================== */}
      <section id="place">
        <Myplace />
      </section>

      <section id="story">
        <MyStory />
      </section>

      <section id="experience">
        <Experience />
      </section>
    </motion.main>
  );
}
