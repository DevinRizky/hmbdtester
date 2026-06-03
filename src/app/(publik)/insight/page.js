// src/app/insight/page.js
import NewsGrid from "@/components/berita/NewsGrid";

export const metadata = {
  title: "Insight — HMBD Telkom University Purwokerto",
  description: "Arsip berita resmi, pers rilis kegiatan, dan artikel edukasi digital Himpunan Mahasiswa Bisnis Digital.",
};

export default function InsightPage() {
  return (
    <main className="bg-canvas min-h-screen py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Header Section */}
        <div className="mb-4 border-b border-hairline pb-6">
          <span className="text-[11px] font-bold uppercase tracking-[2px] text-m-blue-dark">Media Resmi HMBD</span>
          <h1 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-on-dark lg:text-[32px]">Research & Education</h1>
          <p className="mt-2 text-xs font-light text-muted max-w-xl leading-relaxed">Ikuti perkembangan informasi seputar insight edukasi industri digital langsung dari internal prodi.</p>
        </div>

        {/* Memanggil file NewsGrid yang sudah kita buat dinamis */}
        <NewsGrid contentType="insight" />
      </div>
    </main>
  );
}
