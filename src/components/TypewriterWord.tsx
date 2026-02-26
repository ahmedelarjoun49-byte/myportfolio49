"use client";

import React, { useEffect, useMemo, useState } from "react";

type Props = {
  words: string[];          // e.g. ["Developer", "Designer", "3D Artist"]
  className?: string;
  typeSpeed?: number;       // ms per char
  deleteSpeed?: number;     // ms per char
  pauseTime?: number;       // pause at end of word
};

export default function TypewriterWord({
  words,
  className = "",
  typeSpeed = 80,
  deleteSpeed = 45,
  pauseTime = 900,
}: Props) {
  const safeWords = useMemo(() => words.filter(Boolean), [words]);

  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!safeWords.length) return;

    const current = safeWords[i % safeWords.length];

    // finished typing
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pauseTime);
      return () => clearTimeout(t);
    }

    // finished deleting
    if (deleting && text === "") {
      setDeleting(false);
      setI((v) => (v + 1) % safeWords.length);
      return;
    }

    const nextText = deleting
      ? current.slice(0, text.length - 1)
      : current.slice(0, text.length + 1);

    const speed = deleting ? deleteSpeed : typeSpeed;

    const timer = setTimeout(() => setText(nextText), speed);
    return () => clearTimeout(timer);
  }, [text, deleting, i, safeWords, typeSpeed, deleteSpeed, pauseTime]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{text}</span>
      <span className="ml-1 inline-block w-[2px] h-[0.9em] bg-current animate-pulse" />
    </span>
  );
}
