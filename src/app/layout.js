// src/app/layout.js
import "@/app/globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export const metadata = {
  title: "HMBD Telkom University Purwokerto | S1 Bisnis Digital",
  description: "Website resmi Himpunan Mahasiswa S1 Bisnis Digital Telkom University Kampus Purwokerto. Informasi kegiatan akademik, aspirasi, dan program kerja Kabinet Aradhana.",
  keywords: ["Telkom University", "Telkom University Purwokerto", "Bisnis Digital Telkom University Purwokerto", "S1 Bisnis Digital Purwokerto", "HMBD Telkom Purwokerto", "Kabinet Aradhana"],
};

export default function RootLayout({ children }) {
  // Skema JSON-LD untuk memancing Sitelinks Google
  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "SiteNavigationElement",
        position: 1,
        name: "Berita",
        url: "https://hmbd-telupwt.com/berita",
      },
      {
        "@type": "SiteNavigationElement",
        position: 2,
        name: "Insight",
        url: "https://hmbd-telupwt.com/insight",
      },
      {
        "@type": "SiteNavigationElement",
        position: 3,
        name: "Rekrutmen HMBD",
        url: "https://hmbd-telupwt.com/rekrutmen",
      },
      {
        "@type": "SiteNavigationElement",
        position: 4,
        name: "Kabinet",
        url: "https://hmbd-telupwt.com/kabinet",
      },
      {
        "@type": "SiteNavigationElement",
        position: 5,
        name: "Kegiatan",
        url: "https://hmbd-telupwt.com/kegiatan",
      },
      {
        "@type": "SiteNavigationElement",
        position: 6,
        name: "Aspirasi",
        url: "https://hmbd-telupwt.com/aspirasi",
      },
    ],
  };

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }} />
      </head>
      <body className="antialiased bg-canvas text-on-dark min-h-screen relative">
        <ThemeProvider>
          <main className="relative z-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
