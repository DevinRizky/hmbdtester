// src/components/providers/ThemeProvider.jsx
"use client"; // <-- TAMBAHKAN BARIS INI DI PALING ATAS

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </NextThemesProvider>
  );
}
