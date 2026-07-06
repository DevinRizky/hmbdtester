"use client";

import { useState } from "react";
import ScrollAnimate from "@/components/ui/ScrollAnimate"; // 🎯 Impor komponen ScrollAnimate

/** * DATABASE GALERI KEGIATAN
 * Sudah dilengkapi dengan properti deskripsi dan tanggal riil untuk kebutuhan popup detail.
 */
const GALLERY_ITEMS = [
  {
    id: "gal-01",
    title: "TEKAD 2025",
    date: "2026-05-23",
    imgSrc: "/tekad2025.jpg",
    description:
      "Temu Keakraban Bisnis Digital. Acara ini berfungsi sebagai ajang untuk: Membangun keakraban, Membina networking, dan Sarana transisi bagi mahasiswa baru untuk beradaptasi dengan lingkungan kampus sebelum memulai perkuliahan aktif.",
  },
  {
    id: "gal-02",
    title: "Studi Banding To UPI Tasikmalaya",
    date: "2026-05-30",
    imgSrc: "/stuban.jpg",
    description:
      "Melalui kegiatan studi banding bersama DIGNITY UPI Tasikmalaya, HMBD TUP mendapatkan banyak wawasan baru, bertukar ide, serta mempererat tali silaturahmi antarhimpunan. Semoga kolaborasi dan semangat untuk terus berkembang ini dapat terus terjaga di masa mendatang. 🤝📚",
  },
];

// Helper pemformat tanggal Indonesia ramah visual
function formatIdDateLong(iso) {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export default function ActivityGallery() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeItem, setActiveItem] = useState(null); // State penyimpan data modal aktif
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = GALLERY_ITEMS.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(GALLERY_ITEMS.length / itemsPerPage);

  return (
    <section aria-labelledby="galeri-heading" className="pt-16 pb-24 lg:pt-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <h2 id="galeri-heading" className="text-xl font-bold uppercase tracking-tight text-on-dark lg:text-[32px] lg:leading-[1.15]">
          Galeri Kegiatan
        </h2>

        {/* LIST GRID FOTO: Jarak antar kartu dibuat proporsional dan rapi */}
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3">
          {currentItems.map((item, index) => (
            /* 🎯 Bungkus elemen li dengan ScrollAnimate menggunakan index stagger delay */
            <ScrollAnimate key={item.id} variant="fadeInUp" delay={index * 0.05} speed={0.4} className="w-full">
              <li className="border border-hairline bg-surface-soft">
                {/* Bingkai foto bertindak sebagai tombol interaktif murni */}
                <button type="button" onClick={() => setActiveItem(item)} className="group relative block w-full overflow-hidden bg-black aspect-[4/5] text-left focus:outline-none">
                  {/* Image Layer */}
                  <img
                    src={item.imgSrc}
                    alt={`Dokumentasi kegiatan: ${item.title}`}
                    className="h-full w-full scale-100 object-cover brightness-95 contrast-[1.02] transition duration-300 ease-out group-hover:scale-[1.03] group-hover:brightness-90"
                  />

                  {/* OVERLAY PANEL */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100 flex items-center justify-center p-4">
                    <span className="w-auto text-center translate-y-4 transition-transform duration-300 group-hover:translate-y-0 group-focus:translate-y-0 border border-white bg-white/10 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-xs lg:hover:bg-white lg:hover:text-black">
                      Selengkapnya &rarr;
                    </span>
                  </div>

                  {/* Garis Aksen Estetik Khas Himpunan */}
                  <span
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-m-blue-light via-m-blue-dark to-m-red opacity-0 translate-y-[2px] transition duration-200 group-hover:translate-y-0 group-hover:opacity-100"
                    aria-hidden
                  />
                </button>
              </li>
            </ScrollAnimate>
          ))}
        </ul>

        {/* CONTROLLER TOMBOL PAGINASI */}
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

        {/* =========================================================================
        POPUP / MODAL DETAIL DOKUMENTASI (LAYOUT DUA KOLOM SIDE-BY-SIDE)
        ========================================================================= */}
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
            activeItem ? "opacity-100 pointer-events-auto backdrop-blur-md bg-black/60" : "opacity-0 pointer-events-none backdrop-blur-none bg-black/0"
          }`}
          onClick={() => setActiveItem(null)}
        >
          <div className={`w-full max-w-4xl my-auto border border-hairline bg-surface-card p-5 sm:p-6 shadow-2xl transition-transform duration-300 ${activeItem ? "scale-100" : "scale-95"}`} onClick={(e) => e.stopPropagation()}>
            {activeItem && (
              <div className="relative">
                {/* Tombol Silang Absolut di Pojok Kanan Atas */}
                <button onClick={() => setActiveItem(null)} className="absolute -top-2 -right-1 sm:-top-1 sm:right-0 text-muted hover:text-on-dark text-lg font-light p-2 z-10" aria-label="Tutup Detail">
                  &#x2715;
                </button>

                {/* CONTEN GRID SPILTER */}
                <div className="grid gap-6 md:grid-cols-2 items-start">
                  {/* KOLOM KIRI: FOTO KEGIATAN */}
                  <div className="w-full flex items-center justify-center border border-hairline bg-black/5 dark:bg-black/40 p-2 min-h-[250px] md:min-h-[350px]">
                    <img src={activeItem.imgSrc} alt={`Detail visual: ${activeItem.title}`} className="w-full h-auto max-h-[320px] md:max-h-[380px] object-contain shadow-sm" />
                  </div>

                  {/* KOLOM KANAN: SELURUH INFO TEKS */}
                  <div className="flex flex-col h-full justify-between pt-2 md:pt-4">
                    <div>
                      {/* Header Info */}
                      <span className="text-[10px] font-bold uppercase tracking-widest text-m-blue-dark">Detail Arsip Dokumentasi</span>
                      <h3 className="mt-1 text-lg font-black uppercase tracking-tight text-on-dark sm:text-xl leading-snug">{activeItem.title}</h3>

                      {/* Meta Waktu Pelaksanaan */}
                      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted font-light uppercase tracking-wider border-b border-hairline/60 pb-3">
                        <span>📅 Terlaksana pada :</span>
                        <time className="font-bold text-body-strong">{formatIdDateLong(activeItem.date)}</time>
                      </div>

                      {/* Deskripsi Kegiatan */}
                      <div className="mt-4">
                        <p className="text-sm font-light leading-relaxed text-body text-justify max-h-[180px] md:max-h-[240px] overflow-y-auto pr-1">{activeItem.description}</p>
                      </div>
                    </div>

                    {/* Footer Modal / Tombol Aksi */}
                    <div className="mt-8 pt-4 border-t border-hairline flex justify-end">
                      <button
                        onClick={() => setActiveItem(null)}
                        className="w-full sm:w-auto border border-on-dark px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-on-dark hover:bg-on-dark hover:text-canvas transition duration-150 text-center"
                      >
                        Kembali Ke Galeri
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
