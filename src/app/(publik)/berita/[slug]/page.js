// src/app/berita/[slug]/page.js
import { DATA_BERITA } from "@/data/beritaData";
import Link from "next/link";
import ScrollAnimate from "@/components/ui/ScrollAnimate";

export async function generateStaticParams() {
  return DATA_BERITA.filter((item) => item.type === "berita").map((artikel) => ({
    slug: artikel.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const artikel = DATA_BERITA.find((item) => item.slug === slug);

  return {
    title: artikel ? `${artikel.title} — HMBD` : "Berita Tidak Ditemukan — HMBD",
  };
}

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function DetailBeritaPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const artikel = DATA_BERITA.find((item) => item.slug === slug);

  if (!artikel) {
    return (
      <main className="bg-canvas min-h-screen py-24 text-center">
        <p className="text-sm text-muted">Aset Berita dengan ID slug &ldquo;{slug}&rdquo; tidak terdeteksi.</p>
        <Link href="/berita" className="text-xs text-m-blue-dark uppercase mt-4 inline-block font-bold">
          ← Kembali ke Index Berita
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-canvas min-h-screen py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Tombol Kembali dengan Animasi */}
        <ScrollAnimate variant="fadeInUp" delay={0.05}>
          <Link href="/berita" className="inline-flex items-center text-[11px] font-bold uppercase tracking-[1.5px] text-muted hover:text-m-blue-dark transition-colors duration-150 mb-8 group">
            <span className="mr-2 transform transition-transform group-hover:-translate-x-1">←</span>
            Kembali ke Berita
          </Link>
        </ScrollAnimate>

        {/* METADATA ATAS & JUDUL */}
        <ScrollAnimate variant="fadeInUp" delay={0.1}>
          <div className="border-b border-hairline pb-4">
            <p className="text-[11px] font-bold uppercase tracking-[2px] text-m-blue-dark">
              {formatDate(artikel.date)} • Rilis Oleh {artikel.author}
            </p>
            <h1 className="mt-3 text-2xl font-extrabold uppercase tracking-tight text-on-dark sm:text-4xl leading-tight">{artikel.title}</h1>
          </div>
        </ScrollAnimate>

        {/* KONTANER GAMBAR UTAMA BERITA (Efek Asimetris Kabinet Aradhana) */}
        <ScrollAnimate variant="fadeInUp" delay={0.15}>
          <div className="mt-8 aspect-video w-full overflow-hidden border border-hairline bg-surface-soft rounded-tr-[40px] rounded-bl-[40px] rounded-tl-lg rounded-br-lg">
            <img src={artikel.imgSrc} alt={artikel.title} className="h-full w-full object-cover" />
          </div>
        </ScrollAnimate>

        {/* KONTEN BACAAN (Dibungkus satu animasi halus agar nyaman dibaca) */}
        <ScrollAnimate variant="fadeInUp" delay={0.2}>
          {/* KUTIPAN INTRO */}
          <p className="mt-8 text-sm font-medium leading-relaxed text-on-dark/80 bg-surface-soft/40 border-l-2 border-m-blue-dark p-4 text-justify italic rounded-r-md">&ldquo;{artikel.excerpt}&rdquo;</p>

          {/* KONTEN UTAMA TEKS BERITA */}
          <div className="mt-8 text-[15px] font-light leading-relaxed text-body-strong space-y-6 text-justify whitespace-pre-line">{artikel.content}</div>
        </ScrollAnimate>

        {/* FOOTER ARTIKEL */}
        <ScrollAnimate variant="fadeInUp" delay={0.25}>
          <div className="mt-16 border-t border-hairline pt-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-[2px] text-muted">
            <span>HMBD Telkom University Purwokerto</span>
            <span>Kabinet Aradhana © 2026</span>
          </div>
        </ScrollAnimate>
      </div>
    </main>
  );
}
