import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollButtons from "@/components/ScrollingUpButton";
import ScrollReset from "@/components/ScrollReset";
import Providers from "./providers";

import { Playwrite_NZ } from "next/font/google";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

/* ✅ Playwrite New Zealand (variable font) */
const playwrite = Playwrite_NZ({
  variable: "--font-playwrite",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ahmed El Arjoun | Web Developer & Multimedia 3D",
  description:
    "Web Developer & Multimedia/3D enthusiast based in Rabat, Morocco. Building modern, responsive, user-centric web experiences with React, Next.js and TypeScript.",
  keywords: [
    "Ahmed El Arjoun",
    "Web Developer Morocco",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Tailwind CSS",
    "UI/UX",
    "Multimedia 3D",
  ],
  robots: { index: true, follow: true },
  themeColor: "#06140f",
  openGraph: {
    title: "Ahmed El Arjoun | Web Developer & Multimedia 3D",
    description:
      "Web Developer & Multimedia/3D enthusiast based in Rabat, Morocco. Building modern, responsive, user-centric web experiences.",
    type: "website",
    images: ["/og.png"], // keep 1 consistent OG image
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed El Arjoun | Web Developer & Multimedia 3D",
    description:
      "Web Developer & Multimedia/3D enthusiast based in Rabat, Morocco. Building modern, responsive, user-centric web experiences.",
    images: ["/og.png"], // match OG for consistency
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={playwrite.variable}>
      <body className="min-h-screen bg-white text-gray-900 dark:bg-[#06140f] dark:text-gray-100 transition-colors duration-300">
        {/* ✅ Skip link (professional accessibility) */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-gray-900 focus:shadow-lg dark:focus:bg-[#0b231c] dark:focus:text-gray-100"
        >
          Skip to content
        </a>

        <ScrollReset />

        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />

            {/* ✅ Main content wrapper */}
            <main id="content" className="flex-1">
              {children}
            </main>

            <Footer />

            {/* keep global UI here so it overlays everything */}
            <ScrollButtons />
          </div>

          <SpeedInsights />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
