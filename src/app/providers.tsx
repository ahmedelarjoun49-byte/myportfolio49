"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
      // ❌ REMOVE disableTransitionOnChange to allow smooth transitions
    >
      {children}
    </ThemeProvider>
  );
}
