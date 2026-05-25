"use client";

import { useEffect } from "react";

export default function ScrollReset() {
  useEffect(() => {
    // Disable historical scroll position snapping
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Force strict return to origin once layout finishes painting
    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    const timeoutId = setTimeout(handleScrollToTop, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  return null;
}