// src/app/berita/[slug]/page.js
import { DATA_BERITA } from "@/data/beritaData";
import { notFound } from "next/navigation";
import Link from "next/link";

// Tambahkan fungsi ini agar Next.js tahu daftar slug apa saja yang akan dibuat menjadi HTML statis
export async function generateStaticParams() {
  // Mengambil semua data slug yang ada di file beritaData lokalmu
  return DATA_BERITA.map((artikel) => ({
    slug: artikel.slug,
  }));
}

export async function generateMetadata({ params }) {
  // Mengantisipasi perubahan router asinkron Next.js terbaru
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

// Menambahkan 'async' pada fungsi komponen utama
export default async function DetailBeritaPage({ params }) {
  // Wajib di-await agar parameter slug dari URL browser cair dengan sempurna
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Mencari data artikel
  const artikel = DATA_BERITA.find((item) => item.slug === slug);

  // Jika tetap tidak ketemu, kita amankan jalurnya agar tidak langsung zonk kosong
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
        {/* Tombol Kembali */}
        <Link href="/berita" className="inline-flex items-center text-[11px] font-bold uppercase tracking-[1.5px] text-muted hover:text-m-blue-dark transition-colors duration-150 mb-8 group">
          <span className="mr-2 transform transition-transform group-hover:-translate-x-1">←</span>
          Kembali ke Berita
        </Link>

        {/* METADATA ATAS */}
        <div className="border-b border-hairline pb-4">
          <p className="text-[11px] font-bold uppercase tracking-[2px] text-m-blue-dark">
            {formatDate(artikel.date)} • Rilis Oleh {artikel.author}
          </p>

          <h1 className="mt-3 text-2xl font-extrabold uppercase tracking-tight text-on-dark sm:text-4xl leading-tight">{artikel.title}</h1>
        </div>

        {/* KONTANER GAMBAR UTAMA BERITA */}
        <div className="mt-8 aspect-video w-full overflow-hidden border border-hairline bg-surface-soft">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={artikel.imgSrc} alt={artikel.title} className="h-full w-full object-cover" />
        </div>

        {/* CUTIPAN INTRO */}
        <p className="mt-8 text-sm font-medium leading-relaxed text-on-dark/80 bg-surface-soft/40 border-l-2 border-m-blue-dark p-4 text-justify italic">&ldquo;{artikel.excerpt}&rdquo;</p>

        {/* KONTEN UTAMA TEKS BERITA */}
        <div className="mt-8 text-[15px] font-light leading-relaxed text-body-strong space-y-6 text-justify whitespace-pre-line">{artikel.content}</div>

        {/* FOOTER ARTIKEL */}
        <div className="mt-16 border-t border-hairline pt-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-[2px] text-muted">
          <span>HMBD Telkom University Purwokerto</span>
          <span>Kabinet Aradhana © 2026</span>
        </div>
      </div>
    </main>
  );
}
