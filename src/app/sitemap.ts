import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hmbd-telupwt.com";

  return [
    // 1. Ini Halaman Utama (Home) - Entry Point dengan prioritas tertinggi (1.0)
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1.0,
    },
    // 2. Ini Halaman Kegiatan - Halaman anak dengan prioritas di bawahnya (0.8)
    {
      url: `${baseUrl}/kegiatan`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
