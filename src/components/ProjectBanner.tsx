import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    id: "01",
    title: "LuxCart.",
    description:
      "A high-performance e-commerce mobile application built using React Native and Expo.",
    image: "/assets/project1.png", // change to your image path in /public
    tags: ["React Native", "Expo", "Firebase"],
    href: "/projects",
    status: "Completed",
  },
  {
    id: "02",
    title: "Networked AI.",
    description:
      "An AI-powered platform designed to simplify event hosting, management and networking.",
    image: "/assets/project2.png",
    tags: ["React Ionic", "TypeScript", "Tailwind CSS"],
    href: "/projects",
    status: "Completed",
  },
  {
    id: "03",
    title: "Waves: Bible Verse.",
    description:
      "A spiritual growth companion that delivers personalized curated Bible verses & support.",
    image: "/assets/project3.png",
    tags: ["React Native", "TypeScript", "Widgets"],
    href: "/projects",
    status: "Completed",
  },
];

export default function ProjectBanner() {
  return (
    <section
      className="
        py-24 relative overflow-hidden
        bg-gradient-to-b from-white to-emerald-50
        dark:from-[#06140f] dark:to-[#04100c]
        transition-colors duration-300
      "
    >
      {/* Decorative blobs */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-emerald-800/10 dark:bg-emerald-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-28 h-28 bg-emerald-600/15 dark:bg-emerald-300/10 rounded-full blur-2xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white">
            Recent Work<span className="text-emerald-700 dark:text-emerald-300">.</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            Explore some of my recent work that showcases my expertise in modern web and mobile
            development.
          </p>
        </div>

        {/* Big container (the white box in your screenshot) */}
        <div
          className="
            rounded-3xl border shadow-xl
            bg-white border-gray-200
            dark:bg-[#0b1f18] dark:border-white/10
            transition-colors duration-300
            p-8 lg:p-10
          "
        >
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((p) => (
              <article
                key={p.id}
                className="
                  group rounded-2xl overflow-hidden border
                  bg-white border-gray-200
                  dark:bg-[#071611] dark:border-white/10
                  transition-colors duration-300
                  hover:shadow-2xl
                "
              >
                {/* image */}
                <div className="relative h-52 w-full bg-gray-100 dark:bg-white/5">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="p-6">
                  {/* top row */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span
                      className="
                        px-3 py-1 rounded-full text-xs font-semibold
                        bg-emerald-100 text-emerald-900
                        dark:bg-emerald-400/15 dark:text-emerald-200
                        border border-transparent dark:border-emerald-400/20
                        transition-colors
                      "
                    >
                      {p.status}
                    </span>

                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Project {p.id}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {p.title}
                  </h3>

                  <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                    {p.description}
                  </p>

                  {/* tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="
                          px-3 py-1 rounded-full text-xs font-medium
                          bg-gray-100 text-gray-800
                          dark:bg-white/10 dark:text-gray-200
                          transition-colors
                        "
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* link */}
                  <div className="mt-6">
                    <Link
                      href={p.href}
                      className="
                        inline-flex items-center gap-2 font-semibold
                        text-emerald-800 hover:text-emerald-900
                        dark:text-emerald-200 dark:hover:text-emerald-100
                        transition-colors
                      "
                    >
                      View details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div
            className="
              mt-10 rounded-2xl border p-8
              bg-gradient-to-r from-emerald-50 to-white
              border-emerald-200
              dark:from-white/5 dark:to-white/0 dark:border-white/10
              transition-colors duration-300
              text-center
            "
          >
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              Want to See More?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover my complete portfolio of projects, from web applications to mobile apps.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/projects"
                className="
                  px-7 py-3 rounded-xl font-semibold
                  bg-emerald-800 text-white hover:bg-emerald-900
                  dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400
                  transition-colors
                "
              >
                View All Projects →
              </Link>

              <Link
                href="/contact"
                className="
                  px-7 py-3 rounded-xl font-semibold
                  border-2 border-gray-300 text-gray-900 hover:border-emerald-700 hover:text-emerald-800
                  dark:border-white/15 dark:text-gray-100 dark:hover:border-emerald-400/40 dark:hover:text-emerald-200
                  transition-colors
                "
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
