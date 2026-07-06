// src/app/layout.js
import "@/app/globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export const metadata = {
  title: "HMBD Telkom University Purwokerto - Kabinet Aradhana",
  description: "Website resmi Himpunan Mahasiswa Bisnis Digital (HMBD) Telkom University Kampus Purwokerto. Temukan informasi kegiatan, aspirasi mahasiswa, dan dokumentasi kabinet di sini.",
  keywords: ["HMBD", "Bisnis Digital", "Telkom University Purwokerto", "Kabinet Aradhana"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="antialiased bg-canvas text-on-dark min-h-screen relative">
        <ThemeProvider>
          <main className="relative z-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
