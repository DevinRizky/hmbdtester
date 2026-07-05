"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollAnimate from "@/components/ui/ScrollAnimate"; // 🎯 Impor komponen ScrollAnimate

// DATABASE MACRO REKRUTMEN
const HMBD_RECRUITMENTS = [
  {
    id: "bdv-panitia",
    kategori_rekrutmen: "hmbd",
    title: "Rekrutmen Panitia BDV 5.0",
    status: "DIBUKA",
    closingDate: "2026-06-03",
    image: "/images/rekrutmen/bdv-panitia.jpg",
    googleFormUrl: "https://forms.gle/XyZYourGoogleFormBDVPanitia",
    description: "Mari bergabung menjadi bagian dari sejarah penyambutan mahasiswa baru Bisnis Digital. Dibutuhkan talenta yang tangguh, adaptif, dan siap berkolaborasi dalam struktur pelaksana lingkup prodi.",
    timeline: ["26 Mei – 03 Juni : Open Recruitment", "04 Juni : Seleksi Berkas", "05 Juni : Wawancara"],
    requirements: ["Mahasiswa aktif Bisnis Digital angkatan 2024–2025", "Melampirkan CV format ATS"],
    divisions: ["Sekretaris", "Acara", "Humas", "PDD"],
    tags: ["Internal"],
  },
  {
    id: "bdv-peserta",
    kategori_rekrutmen: "hmbd",
    title: "Rekrutmen Registrasi Peserta BDV 5.0",
    status: "SEGERA",
    closingDate: "2026-06-01",
    image: "/images/rekrutmen/bdv-peserta.jpg",
    googleFormUrl: "https://forms.gle/XyZYourGoogleFormBDVPeserta",
    description: "Gerbang awal integrasi mahasiswa baru angkatan 2026 ke dalam ekosistem Program Studi Bisnis Digital.",
    timeline: ["Linimasa menyusul kalender akademik."],
    requirements: ["Mahasiswa Baru S1 Bisnis Digital Angkatan 2026"],
    divisions: ["Peserta Angkatan 2026"],
    tags: ["Internal"],
  },
];

const LAINNYA_RECRUITMENTS = [
  {
    id: "ukm-basket",
    kategori_rekrutmen: "lainnya",
    title: "Open Recruitment Atlet & Manajer",
    penyelenggara: "UKM Bola Basket",
    status: "DIBUKA",
    closingDate: "2026-06-15",
    image: "/images/rekrutmen/ukm-basket.jpg",
    googleFormUrl: "https://forms.gle/UkmBasketLink",
    description: "Mengembangkan minat bakat di bidang olahraga sekaligus membangun jaringan relasi yang luas di tingkat universitas.",
    timeline: ["01 Juli - 15 Juli : Pendaftaran Olahraga"],
    requirements: ["Mahasiswa aktif Telkom University Purwokerto", "Sehat jasmani dan rohani"],
    divisions: ["Atlet", "Official / Tim Manajer"],
    tags: ["UKM"],
  },
  {
    id: "ukm-futsal",
    kategori_rekrutmen: "lainnya",
    title: "Open Recruitment Atlet & Manajer",
    penyelenggara: "UKM Bola Futsal",
    status: "DIBUKA",
    closingDate: "2026-06-15",
    image: "/images/rekrutmen/ukm-basket.jpg",
    googleFormUrl: "https://forms.gle/UkmBasketLink",
    description: "Mengembangkan minat bakat di bidang olahraga sekaligus membangun jaringan relasi yang luas di tingkat universitas.",
    timeline: ["01 Juli - 15 Juli : Pendaftaran Olahraga"],
    requirements: ["Mahasiswa aktif Telkom University Purwokerto", "Sehat jasmani dan rohani"],
    divisions: ["Atlet", "Official / Tim Manajer"],
    tags: ["UKM"],
  },
  {
    id: "ukm-esport",
    kategori_rekrutmen: "lainnya",
    title: "Pendaftaran Divisi Game & Media",
    penyelenggara: "UKM E-Sport Tel-U",
    status: "DIBUKA",
    closingDate: "2026-06-20",
    image: "/images/rekrutmen/ukm-esport.jpg",
    googleFormUrl: "https://forms.gle/UkmEsportLink",
    description: "Wadah bagi mahasiswa yang ingin serius terjun ke industri e-sport, baik sebagai pro-player maupun tim di balik layar.",
    timeline: ["Awal Juli : Registrasi Mandiri"],
    requirements: ["Memiliki komitmen tinggi dalam tim"],
    divisions: ["Mobile Legends", "Valorant", "Creative Content"],
    tags: ["UKM"],
  },
];

function formatIdDateShort(iso) {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

// 🎯 REFAKTOR: Memisahkan Komponen Card Agar Efek Staggered Berjalan Mulus Berbasis Index
function RecruitmentCard({ job, index, imgErrors, handleImageError }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const closingDateTime = new Date(`${job.closingDate}T23:59:59`);
  const isClosed = today > closingDateTime;
  const isOpen = !isClosed;
  const diffTime = closingDateTime - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const calculatedStatus = isClosed ? "CLOSED" : "DIBUKA";

  const isEksternal = job.kategori_rekrutmen === "lainnya";
  const hasImageError = imgErrors[job.id];

  return (
    <ScrollAnimate variant="fadeInUp" delay={index * 0.08} speed={0.4}>
      <li className="flex h-full flex-col border border-hairline bg-surface-soft p-5 transition duration-300 ease-out hover:border-m-blue-dark/40 hover:shadow-[0_12px_40px_rgba(28,105,212,0.12)] rounded-tr-[24px] rounded-bl-[24px] rounded-tl-sm rounded-br-sm group/card">
        {/* BINGKAI FOTO / POSTER */}
        <div className={`relative w-full overflow-hidden border border-hairline bg-canvas p-2 ${isEksternal ? "aspect-square" : "aspect-[16/10]"}`}>
          <div className="relative h-full w-full overflow-hidden border border-hairline">
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-br from-canvas via-surface-soft to-canvas p-4 text-center">
              <span className="text-[9px] font-bold uppercase tracking-[3px] text-m-blue-dark/60 mb-1">{isEksternal ? job.penyelenggara : "HMBD Official"}</span>
              <p className="text-xs font-semibold text-on-dark/70 uppercase max-w-[80%] truncate">{job.title}</p>
            </div>

            {!hasImageError && job.image && (
              <Image src={job.image} alt={job.title} fill sizes="(max-w: 768px) 100vw, 50vw" className="object-cover opacity-90 transition duration-500 ease-out group-hover/card:scale-105" onError={() => handleImageError(job.id)} />
            )}

            <div className="absolute left-3 top-3 z-10">
              <span className={`border px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[1.5px] ${isOpen ? "border-m-blue-dark bg-m-blue-dark/90 text-white" : "border-muted bg-surface/90 text-muted"}`}>{calculatedStatus}</span>
            </div>
          </div>
        </div>

        {/* PENYELENGGARA & JUDUL */}
        <div className="mt-5 border-b border-hairline pb-3">
          {isEksternal && <span className="block text-[10px] font-bold uppercase tracking-wider text-m-blue-dark mb-0.5">{job.penyelenggara}</span>}
          <h3 className="text-base font-black uppercase tracking-tight text-on-dark">{job.title}</h3>
        </div>

        {/* KETENTUAN & TAGS */}
        <div className="mt-4 flex-1 space-y-4">
          <p className="text-xs font-light leading-relaxed text-body text-justify">{job.description}</p>

          <div className="flex flex-wrap gap-1">
            {job.tags?.map((tag) => (
              <span key={tag} className="bg-m-blue-dark/10 border border-m-blue-dark/20 text-body-strong px-2 py-0.5 text-[9px] font-bold uppercase">
                #{tag}
              </span>
            ))}
          </div>

          <div className="grid gap-4 border-t border-hairline pt-4 sm:grid-cols-2 text-[11px]">
            <div>
              <span className="block font-bold uppercase tracking-wider text-[9px] text-on-dark mb-1">📌 Linimasa:</span>
              <ul className="space-y-1 font-light text-muted list-none">
                {job.timeline.map((t, idx) => (
                  <li key={idx} className="pl-3 relative before:absolute before:left-0 before:top-1.5 before:h-1 before:w-1 before:bg-m-blue-dark">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="block font-bold uppercase tracking-wider text-[9px] text-on-dark mb-1">📋 Syarat Pokok:</span>
              <ul className="space-y-1 font-light text-muted list-none">
                {job.requirements.map((r, idx) => (
                  <li key={idx} className="pl-3 relative before:absolute before:left-0 before:top-1.5 before:h-1 before:w-1 before:bg-muted">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* FOOTER KARTU */}
        <div className="mt-6 border-t border-hairline pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-[10px] font-light uppercase tracking-wide text-muted">
            Batas Akhir: {isOpen && diffDays <= 3 && <span className="text-m-red font-bold animate-pulse text-[9px] ml-1">({diffDays === 1 ? "Hari ini!" : `${diffDays} hari lagi!`})</span>}
            <br />
            <time className="font-medium text-on-dark">{formatIdDateShort(job.closingDate)}</time>
          </div>

          {isOpen ? (
            <a
              href={job.googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center border border-on-dark bg-transparent px-5 text-[11px] font-bold uppercase tracking-[1.5px] text-on-dark transition duration-200 hover:bg-on-dark hover:text-canvas"
            >
              Daftar Sekarang &rarr;
            </a>
          ) : (
            <button type="button" disabled className="inline-flex h-10 cursor-not-allowed items-center justify-center border border-hairline bg-canvas/30 px-5 text-[11px] font-bold uppercase tracking-[1.5px] text-muted/40">
              Closed
            </button>
          )}
        </div>
      </li>
    </ScrollAnimate>
  );
}

export default function RecruitmentList({ kategori = "hmbd" }) {
  const [selectedTag, setSelectedTag] = useState("Semua");
  const [imgErrors, setImgErrors] = useState({});

  const ALL_RECRUITMENTS = [...HMBD_RECRUITMENTS, ...LAINNYA_RECRUITMENTS];
  const baseFiltered = ALL_RECRUITMENTS.filter((item) => item.kategori_rekrutmen === kategori);
  const filteredByTag = selectedTag === "Semua" ? baseFiltered : baseFiltered.filter((item) => item.tags?.includes(selectedTag));

  const BDV_ITEMS = filteredByTag.filter((item) => item.id.startsWith("bdv-"));
  const DIGIFEST_ITEMS = filteredByTag.filter((item) => item.id.startsWith("digi-"));
  const availableTags = ["Semua", "UKM", "Organisasi", "Kepanitiaan", "Komunitas"];

  const handleImageError = (id) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-12">
      {/* COMPONENT DROPDOWN FILTER */}
      {kategori === "lainnya" && (
        <ScrollAnimate variant="fadeInUp" delay={0.05}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-hairline pb-8 mb-4 gap-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[2px] text-m-blue-dark">Rekrutmen Eksternal</span>
              <h2 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-on-dark sm:text-3xl">Eksplorasi Aktivitas</h2>
              <div className="h-0.5 w-16 bg-gradient-to-r from-m-blue-dark to-m-blue-light mt-3" />
            </div>

            <div className="flex flex-col gap-1.5 w-full md:w-72">
              <label htmlFor="filter-kegiatan" className="text-[10px] font-bold uppercase tracking-wider text-muted">
                Pilih Kategori Kegiatan
              </label>
              <div className="relative w-full">
                <select
                  id="filter-kegiatan"
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full appearance-none rounded-none border border-hairline bg-surface-soft px-4 py-3 pr-10 text-xs font-bold uppercase tracking-wider text-on-dark transition duration-200 outline-none cursor-pointer focus-visible:border-m-blue-dark focus-visible:ring-1 focus-visible:ring-m-blue-dark"
                >
                  {availableTags.map((tag) => (
                    <option key={tag} value={tag} className="bg-surface-soft text-on-dark font-sans normal-case text-sm">
                      {tag === "Semua" ? "✨ Tampilkan Semua Aktivitas" : tag}
                    </option>
                  ))}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted border-l border-hairline/30">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimate>
      )}

      {/* VIEW KATEGORI HMBD */}
      {kategori === "hmbd" && (
        <div className="space-y-16">
          {BDV_ITEMS.length > 0 && (
            <div className="border-t-2 border-m-blue-dark pt-6">
              <ScrollAnimate variant="fadeInUp" delay={0.1}>
                <h2 className="text-xl font-black uppercase tracking-tight text-on-dark mb-6">I. Bisdig Volution (BDV)</h2>
              </ScrollAnimate>
              <ul className="grid gap-8 md:grid-cols-2">
                {BDV_ITEMS.map((job, index) => (
                  <RecruitmentCard key={job.id} job={job} index={index} imgErrors={imgErrors} handleImageError={handleImageError} />
                ))}
              </ul>
            </div>
          )}
          {DIGIFEST_ITEMS.length > 0 && (
            <div className="border-t-2 border-hairline pt-6">
              <ScrollAnimate variant="fadeInUp" delay={0.1}>
                <h2 className="text-xl font-black uppercase tracking-tight text-on-dark/70 mb-6">II. Digital Festival (Digifest)</h2>
              </ScrollAnimate>
              <ul className="grid gap-8 md:grid-cols-2">
                {DIGIFEST_ITEMS.map((job, index) => (
                  <RecruitmentCard key={job.id} job={job} index={index} imgErrors={imgErrors} handleImageError={handleImageError} />
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* VIEW KATEGORI LAINNYA */}
      {kategori === "lainnya" && (
        <div>
          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredByTag.map((job, index) => (
              <RecruitmentCard key={job.id} job={job} index={index} imgErrors={imgErrors} handleImageError={handleImageError} />
            ))}
          </ul>
        </div>
      )}

      {/* Notifikasi data kosong */}
      {filteredByTag.length === 0 && (
        <ScrollAnimate variant="fadeInUp">
          <div className="border border-hairline bg-surface-soft p-12 text-center rounded-md">
            <p className="text-xs font-light text-muted">
              {"Tidak ada aktivitas aktif yang ditemukan untuk kategori filter "}
              <strong className="font-medium text-on-dark uppercase">&quot;{selectedTag}&quot;</strong>.
            </p>
          </div>
        </ScrollAnimate>
      )}
    </div>
  );
}
