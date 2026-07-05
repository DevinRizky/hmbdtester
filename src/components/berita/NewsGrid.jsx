"use client"; // 💡 WAJIB: Kita gunakan useState untuk interaksi klik nomor halaman

import { DATA_BERITA } from "@/data/beritaData";
import Link from "next/link";
import { useState, useEffect } from "react";
import ScrollAnimate from "@/components/ui/ScrollAnimate"; // 🎯 Import komponen ScrollAnimate

function formatIdDateShort(iso) {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NewsGrid({ contentType }) {
  // 💡 STATE PENGAMAN HIDRASI NEXT.JS
  const [mounted, setMounted] = useState(false);

  // 1. STATE PAGINASI: Halaman aktif saat ini (dimulai dari halaman 1)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Batasan maksimal konten per halaman

  // 💡 Pemicu siklus pasang komponen di sisi client murni (Aman dari amukan ESLint)
  useEffect(() => {
    let isSubscribed = true;
    queueMicrotask(() => {
      if (isSubscribed) {
        setMounted(true);
      }
    });
    return () => {
      isSubscribed = false;
    };
  }, []);

  // 2. LOGIKA PENYARING DATA KATEGORI
  const dataTersaring = contentType ? DATA_BERITA.filter((post) => post.type === contentType) : DATA_BERITA;

  // 3. LOGIKA MATEMATIKA PAGINASI
  const totalItems = dataTersaring.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Ambil indeks data awal dan akhir untuk halaman yang aktif saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Memotong array data agar HANYA berisi maksimal 6 item sesuai halaman aktif
  const currentItems = dataTersaring.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi pembantu untuk berpindah halaman dengan aman
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 300, behavior: "smooth" });
      }
    }
  };

  // 🛠️ JIKA BELUM MOUNTED (SSR SEDANG BERJALAN), RENDER SKELETON PENYANGGA BERSAMA
  if (!mounted) {
    return (
      <section className="py-section">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="text-center py-16 border border-dashed border-hairline bg-surface-soft rounded-lg">
            <p className="text-sm text-muted font-light">Memuat daftar konten publikasi...</p>
          </div>
        </div>
      </section>
    );
  }

  // KODE DI BAWAH INI AKAN DIEKSEKUSI 100% AMAN DI SISI CLIENT SETELAH HIDRASI SELESAI
  return (
    <section aria-labelledby="berita-daftar-heading" className="py-section bg-transparent">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <h2 id="berita-daftar-heading" className="sr-only">
          Daftar berita
        </h2>

        {/* Jaga-jaga jika data kosong */}
        {totalItems === 0 ? (
          <ScrollAnimate variant="fadeInUp">
            <div className="text-center py-16 border border-dashed border-hairline bg-surface-soft rounded-lg">
              <p className="text-sm text-muted font-light">Belum ada publikasi konten untuk kategori ini.</p>
            </div>
          </ScrollAnimate>
        ) : (
          <>
            {/* GRID KARTU UTAMA (Maksimal 6 Item) */}
            {/* 🎯 Key diikat ke currentPage agar animasi reset berjalan ulang saat ganti page */}
            <div key={currentPage} className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {currentItems.map((post, index) => {
                const detailPath = post.type === "insight" ? `/insight/${post.slug}` : `/berita/${post.slug}`;

                return (
                  <ScrollAnimate
                    key={post.slug}
                    variant="fadeInUp"
                    delay={index * 0.08} // Efek stagger: kartu muncul berurutan tipis-tipis
                  >
                    <article className="flex h-full flex-col border border-hairline bg-surface-soft p-6 rounded-xl transition-all duration-300 ease-out hover:border-m-blue-dark/55 hover:scale-[1.01] hover:shadow-[0_15px_35px_rgba(28,105,212,0.12),inset_0_0_0_1px_rgba(226,39,24,0.04)] group">
                      {/* Meta Informasi Berita */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <time className="text-[12px] font-normal uppercase tracking-wide text-muted" dateTime={post.date}>
                          {formatIdDateShort(post.date)}
                        </time>

                        <span className="h-1 w-8 bg-gradient-to-r from-m-blue-light via-m-blue-dark to-m-red transition-all duration-300 group-hover:w-12" />

                        <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-body-strong">{post.author}</span>
                      </div>

                      {/* Judul Berita */}
                      <h3 className="mt-5 text-lg font-bold uppercase leading-snug tracking-tight text-on-dark lg:text-xl line-clamp-2 min-h-[56px] flex items-start transition-colors duration-200 group-hover:text-m-blue-light">
                        {post.title}
                      </h3>

                      {/* Foto Utama dengan Efek Asimetris Kabinet Aradhana */}
                      <div className="mt-4 aspect-video w-full overflow-hidden border border-hairline bg-canvas rounded-tr-[24px] rounded-bl-[24px] rounded-tl-md rounded-br-md">
                        <img src={post.imgSrc} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>

                      {/* Ringkasan Konten (Excerpt) */}
                      <p className="mt-4 flex-1 text-sm font-light leading-relaxed text-body text-justify line-clamp-3">{post.excerpt}</p>

                      {/* Tombol Navigasi Internal */}
                      <div className="mt-6 border-t border-hairline pt-4">
                        <Link href={detailPath} className="inline-flex items-center text-[11px] font-bold uppercase tracking-[1.5px] text-m-blue-dark hover:text-m-blue-light transition-colors duration-150">
                          Baca Selengkapnya
                          <span className="ml-2 transform transition-transform duration-200 group-hover:translate-x-1.5">→</span>
                        </Link>
                      </div>
                    </article>
                  </ScrollAnimate>
                );
              })}
            </div>

            {/* 💡 KOMPONEN NAVIGATION PAGINASI (Hanya muncul jika total halaman lebih dari 1) */}
            {totalPages > 1 && (
              <ScrollAnimate variant="fadeInUp" delay={0.2}>
                <div className="mt-12 flex items-center justify-center gap-2 border-t border-hairline pt-6">
                  {/* Tombol Previous */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-hairline bg-surface-soft text-sm text-body transition hover:border-m-blue-dark hover:text-on-dark disabled:opacity-40 disabled:hover:border-hairline disabled:hover:text-muted cursor-pointer disabled:cursor-not-allowed"
                  >
                    ←
                  </button>

                  {/* Looping Angka Halaman */}
                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNum = index + 1;
                    const isActive = currentPage === pageNum;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium transition cursor-pointer ${
                          isActive ? "border-m-blue-dark bg-m-blue-dark text-white font-bold" : "border-hairline bg-surface-soft text-body hover:border-m-blue-dark hover:text-on-dark"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {/* Tombol Next */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-hairline bg-surface-soft text-sm text-body transition hover:border-m-blue-dark hover:text-on-dark disabled:opacity-40 disabled:hover:border-hairline disabled:hover:text-muted cursor-pointer disabled:cursor-not-allowed"
                  >
                    →
                  </button>
                </div>
              </ScrollAnimate>
            )}
          </>
        )}
      </div>
    </section>
  );
}
