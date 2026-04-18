"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";
import ClientLayout from "@/components/ClientLayout"; // Import the fixed layout

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
    >
      {/* Wrapping children in ClientLayout here ensures that 
         everything inside the body follows the Preloader logic.
      */}
      <ClientLayout>
        {children}
      </ClientLayout>
    </ThemeProvider>
  );
}