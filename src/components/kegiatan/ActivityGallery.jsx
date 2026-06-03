"use client";

import { useState } from "react";

/** Data galeri kegiatan lengkap dengan gambar, judul, dan link Instagramnya */
const GALLERY_ITEMS = [
  {
    label: "Workshop dokumentasi multimedia",
    imgSrc: "/gallery-01.jpg",
    // Ganti dengan link IG asli
  },
  {
    label: "Rapat divisi akademik rutin",
    imgSrc: "/gallery-02.jpg",
  },
  {
    label: "Diskusi penyusunan program kerja bersama fakultas",
    imgSrc: "/gallery-03.jpg",
  },
  {
    label: "Kuliah tamu industri digital bersama asosiasi kampus Purwokerto",
    imgSrc: "/gallery-04.jpg",
  },
  {
    label: "Sosialisasi rekrutmen divisi komunikasi kemahasiswaan",
    imgSrc: "/gallery-05.jpg",
  },
  {
    label: "Arsip kolektif kegiatan PSDM dan dokumentasi foto tahunan",
    imgSrc: "/gallery-06.jpg",
  },
  // Tambahkan item ke-7 sampai ke-10 ke bawah untuk ngetes paginasinya jalan atau tidak
  {
    label: "Contoh kegiatan halaman ke dua pancingan",
    imgSrc: "/gallery-01.jpg",
  },
  {
    label: "Rapat divisi akademik rutin",
    imgSrc: "/gallery-02.jpg",
  },
  {
    label: "Diskusi penyusunan program kerja bersama fakultas",
    imgSrc: "/gallery-03.jpg",
  },
  {
    label: "Kuliah tamu industri digital bersama asosiasi kampus Purwokerto",
    imgSrc: "/gallery-04.jpg",
  },
  {
    label: "Sosialisasi rekrutmen divisi komunikasi kemahasiswaan",
    imgSrc: "/gallery-05.jpg",
  },
  {
    label: "Arsip kolektif kegiatan PSDM dan dokumentasi foto tahunan",
    imgSrc: "/gallery-06.jpg",
  },
];

export default function ActivityGallery() {
  // 1. STATE & KONFIGURASI PAGINASI (9 DATA PER HALAMAN)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Rumus memotong array data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = GALLERY_ITEMS.slice(indexOfFirstItem, indexOfLastItem);

  // Menghitung total halaman pembulatan ke atas
  const totalPages = Math.ceil(GALLERY_ITEMS.length / itemsPerPage);

  return (
    <section aria-labelledby="galeri-heading" className="pt-12 pb-section lg:pt-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <h2 id="galeri-heading" className="text-xl font-bold uppercase tracking-tight text-on-dark lg:text-[32px] lg:leading-[1.15]">
          Galeri kegiatan
        </h2>

        <div className="mt-4 max-w-2xl text-base font-light text-body block">Dokumentasi resmi aktivitas kemahasiswaan HMBD Telkom University Purwokerto.</div>

        {/* LIST GRID FOTO */}
        <ul className="mt-12 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 xl:grid-cols-3">
          {currentItems.map((item, idx) => {
            // Hitung nomor arsip asli agar nomor urutnya tidak reset ke #01 saat pindah halaman
            const originalIndex = indexOfFirstItem + idx + 1;

            return (
              <li key={`g-${idx}`} className="bg-surface-soft">
                <div className="group relative block overflow-hidden border border-hairline bg-black aspect-[4/5]">
                  <img
                    src={item.imgSrc}
                    alt={`Dokumentasi kegiatan: ${item.label}`}
                    width={800}
                    height={1000}
                    className="h-full w-full scale-100 object-cover brightness-[0.94] contrast-[1.02] transition duration-200 ease-out group-hover:scale-[1.04] group-hover:brightness-105"
                  />

                  {/* Efek hover garis */}
                  <span className="pointer-events-none absolute inset-0 opacity-0 shadow-[inset_0_0_0_1px_rgba(226,39,24,0.25)] transition duration-200 group-hover:opacity-100" aria-hidden />

                  <span
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-m-blue-light via-m-blue-dark to-m-red opacity-0 translate-y-[2px] transition duration-200 group-hover:translate-y-0 group-hover:opacity-100"
                    aria-hidden
                  />
                </div>

                {/* INFO JUDUL */}
                <div className="border-t border-hairline px-5 py-4">
                  <span className="block text-[11px] font-bold uppercase tracking-[1.5px] text-muted">Arsip dokumentasi #{String(originalIndex).padStart(2, "0")}</span>

                  <span className="mt-2 block text-sm font-light leading-snug text-body-strong">{item.label}</span>
                </div>
              </li>
            );
          })}
        </ul>

        {/* CONTROLLER TOMBOL PAGINASI MODERN (Hanya muncul jika total data lebih dari 9) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-16 border-t border-hairline pt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="border border-hairline px-4 py-2 text-xs font-bold uppercase tracking-wider text-on-dark hover:bg-surface-soft disabled:opacity-30 disabled:hover:bg-transparent transition-all active:scale-95"
            >
              Prev
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all active:scale-95 ${
                    currentPage === index + 1 ? "bg-on-dark text-canvas border-on-dark" : "border-hairline text-body hover:bg-surface-soft"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="border border-hairline px-4 py-2 text-xs font-bold uppercase tracking-wider text-on-dark hover:bg-surface-soft disabled:opacity-30 disabled:hover:bg-transparent transition-all active:scale-95"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
