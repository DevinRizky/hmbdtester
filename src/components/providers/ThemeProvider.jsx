// src/components/providers/ThemeProvider.jsx
"use client";

import { useEffect, useState, createContext, useContext } from "react";

const ThemeContext = createContext({
  theme: "dark",
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  // Satukan state untuk menghindari multiple cascading updates
  const [state, setState] = useState({
    theme: "dark",
    mounted: false,
  });

  useEffect(() => {
    let isSubscribed = true;

    // Alihkan eksekusi ke antrean microtask agar terpisah dari siklus render utama
    queueMicrotask(() => {
      if (!isSubscribed) return;

      const savedTheme = localStorage.getItem("theme") || "dark";

      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(savedTheme);

      setState({
        theme: savedTheme,
        mounted: true,
      });
    });

    return () => {
      isSubscribed = false;
    };
  }, []);

  const setTheme = (newTheme) => {
    setState((prev) => ({ ...prev, theme: newTheme }));
    localStorage.setItem("theme", newTheme);

    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(newTheme);
  };

  // Tahan rendering hingga state mounted bernilai true
  if (!state.mounted) {
    return <>{children}</>;
  }

  return <ThemeContext.Provider value={{ theme: state.theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
