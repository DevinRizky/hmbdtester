// src/app/layout.js (Versi Bersih)
import "@/app/globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export const metadata = {
  title: "HMBD Telkom University Purwokerto",
  description: "Himpunan Mahasiswa Bisnis Digital Telkom University Purwokerto Kabinet Aradhana",
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
