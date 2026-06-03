// src/app/layout.js
import "@/app/globals.css";

export const metadata = {
  title: "HMBD Telkom University Purwokerto",
  description: "Himpunan Mahasiswa Bisnis Digital Telkom University Purwokerto Kabinet Aradhana",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased bg-canvas text-on-dark">{children}</body>
    </html>
  );
}
