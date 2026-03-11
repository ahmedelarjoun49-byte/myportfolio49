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
      const timer = setTimeout(() => {
        hasLoaded = true;
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />

      <main id="content" className="flex-1">
        {children}
      </main>

      <Footer />

      <ScrollButtons />
    </div>
  );
}