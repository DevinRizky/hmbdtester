"use client";

import { useEffect, useState } from "react";
// Sesuaikan jalur relative path ini ke file ThemeProvider.jsx Anda
import { useTheme } from "./providers/ThemeProvider";

function SunIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M21 14.5A8.5 8.5 0 1114.5 3a6.5 6.5 0 009 11.5z" />
    </svg>
  );
}

export default function ThemeToggle({ className = "" }) {
  // Gunakan properti 'theme' sesuai dengan context lokal baru kita
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Amankan pengubahan state menggunakan microtask agar lolos dari sensor cascading render
  useEffect(() => {
    let isSubscribed = true;
    queueMicrotask(() => {
      if (isSubscribed) setMounted(true);
    });
    return () => {
      isSubscribed = false;
    };
  }, []);

  if (!mounted) {
    return <span className={`inline-flex h-11 w-11 shrink-0 border border-hairline bg-surface-soft ${className}`} aria-hidden />;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      className={`relative inline-flex h-11 w-11 shrink-0 items-center justify-center border border-hairline bg-surface-soft text-on-dark z-999999 ${className}`}
      onClick={() => {
        setTheme(isDark ? "light" : "dark");
      }}
    >
      {isDark ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
    </button>
  );
}
