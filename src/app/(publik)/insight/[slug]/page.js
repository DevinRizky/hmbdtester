// src/app/insight/[slug]/page.js
import { DATA_BERITA } from "@/data/beritaData";
import Link from "next/link";
import ScrollAnimate from "@/components/ui/ScrollAnimate";

export async function generateStaticParams() {
  return DATA_BERITA.filter((item) => item.type === "insight").map((artikel) => ({
    slug: artikel.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const artikel = DATA_BERITA.find((item) => item.slug === slug && item.type === "insight");

  return {
    title: artikel ? `${artikel.title} — HMBD Insight` : "Insight Tidak Ditemukan — HMBD",
  };
}

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function DetailInsightPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const artikel = DATA_BERITA.find((item) => item.slug === slug && item.type === "insight");

  if (!artikel) {
    return (
      <main className="bg-canvas min-h-screen py-24 text-center">
        <div className="mx-auto max-w-[800px] px-4">
          <p className="text-sm text-muted">Aset Insight dengan slug &ldquo;{slug}&rdquo; tidak terdeteksi.</p>
          <Link href="/insight" className="text-xs text-m-blue-dark uppercase mt-4 inline-block font-bold">
            ← Kembali ke Index Insight
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-canvas min-h-screen py-24">
      <div className="mx-auto max-w-[800px] px-4 sm:px-6">
        {/* TOMBOL KEMBALI KEPADA PORTAL INSIGHT */}
        <ScrollAnimate variant="fadeInUp" delay={0.05}>
          <div className="mb-8">
            <Link href="/insight" className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-muted hover:text-m-blue-dark transition-colors duration-150 group">
              <svg className="mr-2 h-3.5 w-3.5 transform transition-transform duration-200 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Insight
            </Link>
          </div>
        </ScrollAnimate>

        {/* METADATA ARTIKEL */}
        <ScrollAnimate variant="fadeInUp" delay={0.1}>
          <header className="border-b border-hairline pb-8 mb-10">
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-m-red">
              <span>{formatDate(artikel.date)}</span>
              <span className="h-1 w-1 rounded-full bg-hairline" />
              <span className="text-muted">Ditulis oleh {artikel.author}</span>
            </div>
            <h1 className="mt-4 text-2xl font-extrabold uppercase tracking-tight text-on-dark sm:text-3xl lg:text-4xl leading-tight">{artikel.title}</h1>
            <div className="h-0.5 w-16 bg-gradient-to-r from-m-blue-dark to-m-red mt-5" />
          </header>
        </ScrollAnimate>

        {/* SPANDUK FOTO UTAMA ARTIKEL (Efek Asimetris Kabinet Aradhana) */}
        <ScrollAnimate variant="fadeInUp" delay={0.15}>
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-black border border-hairline/40 mb-10 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-lg rounded-br-lg">
            <img src={artikel.imgSrc} alt={artikel.title} className="h-full w-full object-cover" />
          </div>
        </ScrollAnimate>

        {/* KONTEN ARTIKEL UTAMA */}
        <ScrollAnimate variant="fadeInUp" delay={0.2}>
          <div className="space-y-6 text-base font-light text-body leading-relaxed text-justify font-sans">
            {artikel.content.split("\n\n").map((paragraf, index) => {
              if (paragraf.startsWith("[") && paragraf.endsWith("]")) {
                const judulSub = paragraf.replace(/[\[\]]/g, "");
                return (
                  <h2 key={index} className="pt-6 pb-2 text-lg sm:text-xl font-bold text-on-dark uppercase tracking-tight border-b border-hairline/30 text-left">
                    {judulSub}
                  </h2>
                );
              }
              return <p key={index}>{paragraf}</p>;
            })}
          </div>
        </ScrollAnimate>

        {/* FOOTER ARTIKEL */}
        <ScrollAnimate variant="fadeInUp" delay={0.25}>
          <footer className="mt-16 pt-6 border-t border-hairline/60 flex justify-between items-center text-[11px] text-muted font-light">
            <span>© 2026 HMBD Purwokerto</span>
            <span className="font-bold uppercase tracking-wider text-m-blue-dark">Kabinet Aradhana</span>
          </footer>
        </ScrollAnimate>
      </div>
    </main>
  );
}
