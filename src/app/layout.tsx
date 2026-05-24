import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import ScrollReset from "@/components/ScrollReset";
import Providers from "./providers";
import { Playwrite_NZ } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const playwrite = Playwrite_NZ({
  variable: "--font-playwrite",
  display: "swap",
});

// Next.js 15 viewport configuration
export const viewport: Viewport = {
  themeColor: "#06140f",
};

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
  openGraph: {
    title: "Ahmed El Arjoun | Web Developer & Multimedia 3D",
    description:
      "Web Developer & Multimedia/3D enthusiast based in Rabat, Morocco. Building modern, responsive, user-centric web experiences.",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed El Arjoun | Web Developer & Multimedia 3D",
    description:
      "Web Developer & Multimedia/3D enthusiast based in Rabat, Morocco. Building modern, responsive, user-centric web experiences.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={playwrite.variable}>
      <body className="min-h-screen bg-white text-gray-900 dark:bg-[#06140f] dark:text-gray-100 transition-colors duration-300">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-gray-900 focus:shadow-lg dark:focus:bg-[#0b231c] dark:focus:text-gray-100"
        >
          Skip to content
        </a>

        <ScrollReset />

        <Providers>
          {/* I removed Header, Footer, and ScrollButtons from here. 
              They now live inside ClientLayout (which is likely called inside Providers)
              so they can be controlled by the Preloader state.
          */}
          {children}
          
          <SpeedInsights />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}