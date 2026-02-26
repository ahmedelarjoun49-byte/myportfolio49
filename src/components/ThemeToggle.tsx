"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = (theme === "dark") || (theme === "system" && resolvedTheme === "dark");

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full
                 border border-emerald-200 bg-white hover:bg-emerald-50
                 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/20
                 transition"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-emerald-200" />
      ) : (
        <Moon className="w-5 h-5 text-emerald-900" />
      )}
    </button>
  );
  {isDark ? (
  <Sun className="w-5 h-5 text-emerald-300 transition-transform duration-300 rotate-0" />
) : (
  <Moon className="w-5 h-5 text-emerald-800 transition-transform duration-300 rotate-180" />
)}

}
