"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

// ─── Seeded pseudo-random — deterministic on both server & client ─────────────
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// ─── Animated counter hook ────────────────────────────────────────────────────
function useCounter(from: number, to: number, duration: number) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (v) => Math.round(v));
  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return rounded;
}

// ─── Progress arc isolated so useTransform lives in one render scope ──────────
function ProgressArc({
  count,
}: {
  count: ReturnType<typeof useCounter>;
}) {
  const pathLength = useTransform(count, [0, 100], [0, 1]);
  return (
    <svg
      className="absolute"
      width="220"
      height="220"
      viewBox="0 0 220 220"
      style={{ transform: "rotate(-90deg)" }}
    >
      <motion.circle
        cx="110"
        cy="110"
        r="100"
        fill="none"
        stroke="rgba(37,99,235,0.8)"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ pathLength }}
        strokeDasharray="1"
      />
    </svg>
  );
}

// ─── Particle — all values are props, zero runtime randomness ─────────────────
interface ParticleProps {
  delay: number;
  duration: number;
  x: string;
  y: string;
  size: number;
  rise: number;
}

function Particle({ delay, duration, x, y, size, rise }: ParticleProps) {
  return (
    <motion.div
      className="absolute rounded-full bg-blue-500"
      style={{ width: size, height: size, left: x, top: y, opacity: 0 }}
      animate={{ opacity: [0, 0.6, 0], y: [0, -rise], scale: [1, 0.4] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

// ─── Static particle data (seeded, deterministic — no hydration mismatch) ─────
const PARTICLE_COUNT = 18;
const particleData: ParticleProps[] = Array.from(
  { length: PARTICLE_COUNT },
  (_, i) => ({
    delay: i * 0.18,
    duration: 2.2 + seededRandom(i * 5) * 1.2,
    x: `${10 + seededRandom(i * 5 + 1) * 80}%`,
    y: `${40 + seededRandom(i * 5 + 2) * 40}%`,
    size: 2 + seededRandom(i * 5 + 3) * 3,
    rise: 60 + seededRandom(i * 5 + 4) * 40,
  })
);

// ─── Static corner accent styles ──────────────────────────────────────────────
const cornerStyles: React.CSSProperties[] = [
  {
    top: "16px",
    left: "16px",
    borderTop: "1px solid rgba(37,99,235,0.4)",
    borderLeft: "1px solid rgba(37,99,235,0.4)",
  },
  {
    top: "16px",
    right: "16px",
    borderTop: "1px solid rgba(37,99,235,0.4)",
    borderRight: "1px solid rgba(37,99,235,0.4)",
  },
  {
    bottom: "16px",
    left: "16px",
    borderBottom: "1px solid rgba(37,99,235,0.4)",
    borderLeft: "1px solid rgba(37,99,235,0.4)",
  },
  {
    bottom: "16px",
    right: "16px",
    borderBottom: "1px solid rgba(37,99,235,0.4)",
    borderRight: "1px solid rgba(37,99,235,0.4)",
  },
];

// ─── Main Preloader ───────────────────────────────────────────────────────────
export default function Preloader() {
  // Mount guard: render nothing on the server, avoiding any SSR/client mismatch
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<"enter" | "pulse" | "exit">("enter");
  const count = useCounter(0, 100, 2.8);

  useEffect(() => {
    setMounted(true);

    const pulseTimer = setTimeout(() => setPhase("pulse"), 800);
    const exitTimer = setTimeout(() => {
      setPhase("exit");
      setTimeout(() => setIsVisible(false), 1000);
    }, 3200);

    return () => {
      clearTimeout(pulseTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  // Nothing rendered on the server → zero hydration surface
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#020408" }}
          exit={{
            clipPath: ["inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"],
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Radial ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(29,78,216,0.12) 0%, transparent 70%)",
              }}
            />
          </div>

          {/* Scan-line sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(37,99,235,0.04) 50%, transparent 100%)",
              backgroundSize: "100% 200px",
            }}
            animate={{ backgroundPosition: ["0px -200px", "0px 100vh"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {particleData.map((p, i) => (
              <Particle key={i} {...p} />
            ))}
          </div>

          {/* Outer rotating ring */}
          <motion.div
            className="absolute rounded-full border border-blue-900/40"
            initial={{ width: 260, height: 260, opacity: 0 }}
            animate={{
              width: phase === "pulse" ? [260, 280, 260] : 260,
              height: phase === "pulse" ? [260, 280, 260] : 260,
              opacity: 1,
              rotate: 360,
            }}
            transition={{
              width: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              height: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.6 },
              rotate: { duration: 12, repeat: Infinity, ease: "linear" },
            }}
          />

          {/* Counter-rotating dashed ring */}
          <motion.div
            className="absolute"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: -360 }}
            transition={{
              opacity: { duration: 0.6, delay: 0.3 },
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            }}
          >
            <svg width="240" height="240" viewBox="0 0 240 240">
              <circle
                cx="120"
                cy="120"
                r="108"
                fill="none"
                stroke="rgba(37,99,235,0.25)"
                strokeWidth="1"
                strokeDasharray="6 14"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          {/* Progress arc */}
          <ProgressArc count={count} />

          {/* Logo */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              animate={
                phase === "pulse"
                  ? {
                      filter: [
                        "drop-shadow(0 0 18px rgba(37,99,235,0.5))",
                        "drop-shadow(0 0 36px rgba(37,99,235,0.9))",
                        "drop-shadow(0 0 18px rgba(37,99,235,0.5))",
                      ],
                    }
                  : { filter: "drop-shadow(0 0 22px rgba(37,99,235,0.6))" }
              }
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={90}
                height={90}
                priority
              />
            </motion.div>
          </motion.div>

          {/* Name + counter */}
          <motion.div
            className="absolute flex flex-col items-center"
            style={{ top: "calc(50% + 145px)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2">
              <span
                className="text-white/60 text-xs font-light uppercase"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.4em",
                }}
              >
                Ahmed
              </span>
              <span
                className="text-blue-500 text-xs font-black uppercase"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.2em",
                }}
              >
                El Arjoun
              </span>
            </div>

            <div className="mt-3 w-24 h-px bg-gradient-to-r from-transparent via-blue-700/50 to-transparent" />

            <div className="mt-3 flex items-baseline gap-0.5">
              <motion.span
                className="text-white font-thin tabular-nums"
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.05em",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {count}
              </motion.span>
              <span
                className="text-blue-600/70 font-light"
                style={{ fontSize: "10px" }}
              >
                %
              </span>
            </div>
          </motion.div>

          {/* Corner accents */}
          {cornerStyles.map((style, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-6"
              style={style}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.07 }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}