"use client";

import { Star, MapPin } from "lucide-react";
import React from "react";
import Marquee from "react-fast-marquee";

const Myplace = () => {
  return (
    <section className="pb-16 sm:pb-20">
      <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[40%_60%]">
        {/* LEFT */}
        <div className="w-full">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            My Stack<span className="text-purple-600 dark:text-purple-300">.</span>
          </h3>

          <div
            className="
              w-full h-64 sm:h-80 lg:h-[250px]
              overflow-hidden rounded-2xl
              bg-gray-100/80 dark:bg-white/5
              border border-gray-200/70 dark:border-white/10
              shadow-sm
              relative
            "
          >
            {/* subtle glow */}
            <div
              className="
                pointer-events-none absolute -inset-20 opacity-70
                bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.16),transparent_55%)]
                dark:bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.22),transparent_60%)]
              "
            />

            <div className="relative z-10 flex flex-col justify-center gap-5 h-full py-4">
              <Marquee speed={30} gradient gradientWidth={40}>
                <div className="flex gap-5 items-center pr-5">
                  <span className="px-4 py-2 rounded-lg bg-gray-900 text-white dark:bg-white/10 dark:text-gray-100 border border-gray-800/40 dark:border-white/10">
                    Responsive Design
                  </span>
                  <Star className="text-purple-600 dark:text-purple-300" />
                  <span className="px-4 py-2 rounded-lg bg-gray-900 text-white dark:bg-white/10 dark:text-gray-100 border border-gray-800/40 dark:border-white/10">
                    HTML5 / CSS3 Mastery
                  </span>
                  <Star className="text-purple-600 dark:text-purple-300" />
                  <span className="px-4 py-2 rounded-lg bg-gray-900 text-white dark:bg-white/10 dark:text-gray-100 border border-gray-800/40 dark:border-white/10">
                    UI / UX Expertise
                  </span>
                  <Star className="text-purple-600 dark:text-purple-300" />
                </div>
              </Marquee>

              <Marquee direction="right" speed={30} gradient gradientWidth={40}>
                <div className="flex gap-5 items-center pr-5">
                  <span className="px-4 py-2 rounded-lg bg-gray-900 text-white dark:bg-white/10 dark:text-gray-100 border border-gray-800/40 dark:border-white/10">
                    JavaScript Proficiency
                  </span>
                  <Star className="text-purple-600 dark:text-purple-300" />
                  <span className="px-4 py-2 rounded-lg bg-gray-900 text-white dark:bg-white/10 dark:text-gray-100 border border-gray-800/40 dark:border-white/10">
                    Collaborative Team Player
                  </span>
                  <Star className="text-purple-600 dark:text-purple-300" />
                  <span className="px-4 py-2 rounded-lg bg-gray-900 text-white dark:bg-white/10 dark:text-gray-100 border border-gray-800/40 dark:border-white/10">
                    Design Tools Mastery
                  </span>
                  <Star className="text-purple-600 dark:text-purple-300" />
                </div>
              </Marquee>

              <Marquee speed={30} gradient gradientWidth={40}>
                <div className="flex gap-5 items-center pr-5">
                  <span className="px-4 py-2 rounded-lg bg-gray-900 text-white dark:bg-white/10 dark:text-gray-100 border border-gray-800/40 dark:border-white/10">
                    Keeping Abreast of Trends
                  </span>
                  <Star className="text-purple-600 dark:text-purple-300" />
                  <span className="px-4 py-2 rounded-lg bg-gray-900 text-white dark:bg-white/10 dark:text-gray-100 border border-gray-800/40 dark:border-white/10">
                    Problem Solving
                  </span>
                  <Star className="text-purple-600 dark:text-purple-300" />
                  <span className="px-4 py-2 rounded-lg bg-gray-900 text-white dark:bg-white/10 dark:text-gray-100 border border-gray-800/40 dark:border-white/10">
                    Attention to Detail
                  </span>
                  <Star className="text-purple-600 dark:text-purple-300" />
                </div>
              </Marquee>
            </div>
          </div>

          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
            Fast, clean UI — with a strong focus on performance and responsive layouts.
          </p>
        </div>

        {/* RIGHT */}
        <div className="w-full">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              My Special Place<span className="text-purple-600 dark:text-purple-300">.</span>
            </h3>

            <span className="inline-flex items-center gap-2 text-xs sm:text-sm px-3 py-1 rounded-full
              bg-purple-50 text-purple-700 border border-purple-100
              dark:bg-purple-400/10 dark:text-purple-200 dark:border-purple-400/20
            ">
              <MapPin className="w-4 h-4" />
              Rabat, Morocco
            </span>
          </div>

          <div
            className="
              relative w-full h-64 sm:h-80 lg:h-[250px]
              overflow-hidden rounded-2xl
              border border-gray-200/70 dark:border-white/10
              bg-white dark:bg-white/5
              shadow-sm
            "
          >
            <iframe
              // ✅ Rabat, Morocco (replace your old Surat embed)
              src="https://www.google.com/maps/place/Prestigia+Andalous/@33.952816,-6.8835091,17z/data=!3m1!4b1!4m6!3m5!1s0xda71300262738ed:0x12814ddab17ce26b!8m2!3d33.952816!4d-6.8835091!16s%2Fg%2F11y7ck6jy7?entry=ttu&g_ep=EgoyMDI2MDEyNi4wIKXMDSoASAFQAw%3D%3D"
              className="absolute top-0 left-0 w-full h-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Map - Rabat, Morocco"
            />
          </div>

          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
            Based in Rabat — open to remote work and collaborations worldwide.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Myplace;
