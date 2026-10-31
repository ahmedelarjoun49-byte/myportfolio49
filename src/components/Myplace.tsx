"use client";

import { Sparkles, MapPin } from "lucide-react";
import React from "react";
import Marquee from "react-fast-marquee";

export default function Myplace() {
  return (
    <section className="py-20 bg-[#020408] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[45%_55%] items-center">
          
          {/* LEFT: MY STACK */}
          <div className="w-full space-y-4">
            <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
              My Stack<span className="text-blue-500">.</span>
            </h3>

            <div
              className="
                w-full h-64 sm:h-80 lg:h-[260px]
                overflow-hidden rounded-3xl
                bg-[#070b14]/80 backdrop-blur-2xl
                border border-white/[0.08]
                shadow-2xl
                relative
                group
                hover:border-blue-500/40 transition-all duration-500
              "
            >
              <div className="relative z-10 flex flex-col justify-center gap-5 h-full py-4">
                <Marquee speed={35} gradient={false}>
                  <div className="flex gap-4 items-center pr-4">
                    <span className="px-4 py-2 rounded-xl bg-white/[0.03] text-blue-300 text-xs font-semibold tracking-wider uppercase border border-white/[0.08] shadow-sm">
                      React & Next.js
                    </span>
                    <Sparkles className="w-4 h-4 text-blue-500/60" />
                    <span className="px-4 py-2 rounded-xl bg-white/[0.03] text-blue-300 text-xs font-semibold tracking-wider uppercase border border-white/[0.08] shadow-sm">
                      TypeScript
                    </span>
                    <Sparkles className="w-4 h-4 text-blue-500/60" />
                    <span className="px-4 py-2 rounded-xl bg-white/[0.03] text-blue-300 text-xs font-semibold tracking-wider uppercase border border-white/[0.08] shadow-sm">
                      Tailwind CSS
                    </span>
                    <Sparkles className="w-4 h-4 text-blue-500/60" />
                  </div>
                </Marquee>

                <Marquee direction="right" speed={30} gradient={false}>
                  <div className="flex gap-4 items-center pr-4">
                    <span className="px-4 py-2 rounded-xl bg-white/[0.03] text-slate-300 text-xs font-semibold tracking-wider uppercase border border-white/[0.08] shadow-sm">
                      PHP & Laravel
                    </span>
                    <Sparkles className="w-4 h-4 text-blue-500/60" />
                    <span className="px-4 py-2 rounded-xl bg-white/[0.03] text-slate-300 text-xs font-semibold tracking-wider uppercase border border-white/[0.08] shadow-sm">
                      SQL Databases
                    </span>
                    <Sparkles className="w-4 h-4 text-blue-500/60" />
                    <span className="px-4 py-2 rounded-xl bg-white/[0.03] text-slate-300 text-xs font-semibold tracking-wider uppercase border border-white/[0.08] shadow-sm">
                      UI/UX Design Architecture
                    </span>
                    <Sparkles className="w-4 h-4 text-blue-500/60" />
                  </div>
                </Marquee>

                <Marquee speed={32} gradient={false}>
                  <div className="flex gap-4 items-center pr-4">
                    <span className="px-4 py-2 rounded-xl bg-white/[0.03] text-blue-400 text-xs font-semibold tracking-wider uppercase border border-white/[0.08] shadow-sm">
                      Cinema 4D & 3D Motion
                    </span>
                    <Sparkles className="w-4 h-4 text-blue-500/60" />
                    <span className="px-4 py-2 rounded-xl bg-white/[0.03] text-blue-400 text-xs font-semibold tracking-wider uppercase border border-white/[0.08] shadow-sm">
                      Framer Motion
                    </span>
                    <Sparkles className="w-4 h-4 text-blue-500/60" />
                    <span className="px-4 py-2 rounded-xl bg-white/[0.03] text-blue-400 text-xs font-semibold tracking-wider uppercase border border-white/[0.08] shadow-sm">
                      Adobe Creative Suite
                    </span>
                    <Sparkles className="w-4 h-4 text-blue-500/60" />
                  </div>
                </Marquee>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Engineered for high performance, interactive fluid motion, and pixel-perfect design execution.
            </p>
          </div>

          {/* RIGHT: MY SPECIAL PLACE */}
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
                My Special Place<span className="text-blue-500">.</span>
              </h3>

              <span className="inline-flex items-center gap-2 text-xs sm:text-sm px-3.5 py-1.5 rounded-full
                bg-blue-500/10 text-blue-300 border border-blue-500/20 font-medium tracking-wide shadow-sm
              ">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                Rabat, Morocco
              </span>
            </div>

            <div
              className="
                relative w-full h-64 sm:h-80 lg:h-[260px]
                overflow-hidden rounded-3xl
                border border-white/[0.08]
                bg-[#070b14]/80 backdrop-blur-2xl
                shadow-2xl
                group
                hover:border-blue-500/40 transition-all duration-500
              "
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.5181711204646!2d-6.885697823467615!3d33.95282042177309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda71300262738ed%3A0x12814ddab17ce26b!2sPrestigia%20Andalous%2C%20Rabat!5e0!3m2!1sen!2sma!4v1700000000000!5m2!1sen!2sma"
                className="absolute top-0 left-0 w-full h-full filter invert-[90%] hue-rotate-[190deg] contrast-[110%] opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Map - Rabat, Morocco"
              />
            </div>

            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Based in Rabat — available worldwide for remote collaborations and creative engineering.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}