"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollButtons from "@/components/ScrollingUpButton";
import Preloader from "@/components/Preloader";

let hasLoaded = false; // prevents double loader

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(!hasLoaded);

  useEffect(() => {
    if (!hasLoaded) {
      // Synchronized to 4000ms (4 seconds) to match your Preloader animation
      const timer = setTimeout(() => {
        hasLoaded = true;
        setLoading(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {/* 1. Show only Preloader when loading */}
      {loading ? (
        <Preloader />
      ) : (
        /* 2. Show Main UI only after 4 seconds is over */
        <div className="relative flex min-h-screen flex-col">
          <Header />

          <main id="content" className="flex-1">
            {children}
          </main>

          <Footer />

          <ScrollButtons />
        </div>
      )}
    </>
  );
}