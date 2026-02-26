"use client";

import { useEffect } from "react";

export default function ScrollReset() {
  useEffect(() => {
    // Disable browser scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Force scroll to top on reload / hard refresh
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return null;
}

