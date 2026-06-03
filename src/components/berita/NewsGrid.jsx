"use client"; // 💡 WAJIB: Kita gunakan useState untuk interaksi klik nomor halaman

import { DATA_BERITA } from "@/data/beritaData";
import Link from "next/link";
import { useState } from "react";

function formatIdDateShort(iso) {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NewsGrid({ contentType }) {
  // 1. STATE PAGINASI: Halaman aktif saat ini (dimulai dari halaman 1)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Batasan maksimal konten per halaman

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
      // Opsional: Gulir layar otomatis ke atas grid setelah klik ganti halaman
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  return (
    <section aria-labelledby="berita-daftar-heading" className="py-section">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <h2 id="berita-daftar-heading" className="sr-only">
          Daftar berita
        </h2>

        {/* Jaga-jaga jika data kosong */}
        {totalItems === 0 ? (
          <div className="text-center py-16 border border-dashed border-hairline bg-surface-soft">
            <p className="text-sm text-muted font-light">Belum ada publikasi konten untuk kategori ini.</p>
          </div>
        ) : (
          <>
            {/* GRID KARTU UTAMA (Maksimal 6 Item) */}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {currentItems.map((post) => {
                const detailPath = post.type === "insight" ? `/insight/${post.slug}` : `/berita/${post.slug}`;

                return (
                  <article
                    key={post.slug}
                    className="flex flex-col border border-hairline bg-surface-soft p-6 transition duration-200 ease-out hover:border-m-blue-dark/55 hover:shadow-[0_0_32px_rgba(28,105,212,0.18),inset_0_0_0_1px_rgba(226,39,24,0.08)] group"
                  >
                    {/* Meta Informasi Berita */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <time className="text-[12px] font-normal uppercase tracking-wide text-muted" dateTime={post.date}>
                        {formatIdDateShort(post.date)}
                      </time>

                      <span className="h-1 w-8 bg-gradient-to-r from-m-blue-light via-m-blue-dark to-m-red" />

                      <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-body-strong">{post.author}</span>
                    </div>

                    {/* Judul Berita */}
                    <h3 className="mt-5 text-lg font-bold uppercase leading-snug tracking-tight text-on-dark lg:text-xl line-clamp-2">{post.title}</h3>

                    {/* Foto Utama */}
                    <div className="mt-4 aspect-video w-full overflow-hidden border border-hairline bg-canvas">
                      <img src={post.imgSrc} alt={post.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>

                    {/* Ringkasan Konten (Excerpt) */}
                    <p className="mt-4 flex-1 text-sm font-light leading-relaxed text-body text-justify line-clamp-3">{post.excerpt}</p>

                    {/* Tombol Navigasi Internal */}
                    <div className="mt-6 border-t border-hairline pt-4">
                      <Link href={detailPath} className="inline-flex items-center text-[11px] font-bold uppercase tracking-[1.5px] text-m-blue-dark hover:text-on-dark transition-colors duration-150">
                        Baca Selengkapnya
                        <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* 💡 KOMPONEN NAVIGATION PAGINASI (Hanya muncul jika total halaman lebih dari 1) */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2 border-t border-hairline pt-6">
                {/* Tombol Previous */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex h-10 w-10 items-center justify-center border border-hairline bg-surface-soft text-sm text-body transition hover:border-m-blue-dark hover:text-on-dark disabled:opacity-40 disabled:hover:border-hairline disabled:hover:text-muted cursor-pointer disabled:cursor-not-allowed"
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
                      className={`flex h-10 w-10 items-center justify-center border text-sm font-medium transition cursor-pointer ${
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
                  className="flex h-10 w-10 items-center justify-center border border-hairline bg-surface-soft text-sm text-body transition hover:border-m-blue-dark hover:text-on-dark disabled:opacity-40 disabled:hover:border-hairline disabled:hover:text-muted cursor-pointer disabled:cursor-not-allowed"
                >
                  →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
