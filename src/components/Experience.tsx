"use client";

import React from "react";

/**
 * Add to layout.tsx / global CSS:
 * <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Montserrat:wght@300;400;500&family=JetBrains+Mono:wght@400;500;700&family=Mrs+Saint+Delafield&display=swap" rel="stylesheet">
 */

/**
 * Photo: transparent PNG (cutout of you) in the /public folder.
 */
const PHOTO_SRC = "/pngahmed.png";

const serif = { fontFamily: "'Cormorant Garamond', serif" };
const mono = { fontFamily: "'JetBrains Mono', monospace" };
const sans = { fontFamily: "'Montserrat', sans-serif" };
const signature = { fontFamily: "'Mrs Saint Delafield', cursive" };

export default function TornadoJourney() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #050b1f 0%, #02040d 40%, #000000 100%)",
      }}
    >
      {/* Photo covering the right side */}
      <div className="absolute inset-x-0 bottom-0 top-[38%] md:inset-y-0 md:left-auto md:right-[4%] md:w-[38%]">
        <img
          src={PHOTO_SRC}
          alt="Me, currently studying my Master in IoT"
          className="absolute bottom-0 right-0 h-full w-full object-contain object-bottom md:object-right-bottom"
        />
      </div>

      {/* Section bottom fades to pure black */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-40 bg-gradient-to-t from-black to-transparent" />

      {/* Text */}
      <div className="relative z-10 mx-auto flex min-h-[760px] max-w-6xl items-start px-6 pb-20 pt-20 md:min-h-[780px] md:items-center md:py-28">
        <div className="max-w-xl">
          <p
            style={{
              ...signature,
              backgroundImage:
                "linear-gradient(110deg, #ffffff 0%, #d6ecff 22%, #8fc3ff 45%, #f4fbff 62%, #a9d4ff 82%, #ffffff 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              filter: "drop-shadow(0 0 14px rgba(160,205,255,0.35))",
            }}
            className="inline-block pb-3 pr-6 text-6xl leading-none md:text-7xl"
          >
            Master
          </p>
          <h2
            style={serif}
            className="mt-4 text-5xl font-light italic leading-[1.05] text-white md:text-7xl"
          >
            Still <span className="text-[#4169E1]">Learning.</span>
          </h2>
          <p
            style={sans}
            className="mt-6 max-w-md text-sm font-light leading-relaxed text-zinc-300 md:text-base"
          >
            I spent three years on my Licence learning the basics and the
            fundamentals of web development, going deeper into advanced modules
            and backend systems, then stepping into gaming and 3D world
            production. Now I am in my Master in IoT, with two years to complete
            my journey, still learning, building and improving every day.
          </p>
          <p
            style={mono}
            className="mt-8 text-[11px] uppercase tracking-[0.25em] text-zinc-500"
          >
            
          </p>
        </div>
      </div>
    </section>
  );
}