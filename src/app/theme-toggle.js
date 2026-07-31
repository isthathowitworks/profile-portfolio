"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") setDark(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="relative h-[28px] w-[56px] rounded-full border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 transition"
      aria-label="Toggle dark mode"
    >
      <span
        className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center h-5 w-5 rounded-full transition-all duration-200 ${
          dark
            ? "bg-orange-400 text-stone-900 left-[calc(100%-24px)]"
            : "bg-[#f5f0e6] text-stone-900 left-1"
        }`}
      >
        {dark ? <Moon size={12} /> : <Sun size={12} />}
      </span>
    </button>
  );
}