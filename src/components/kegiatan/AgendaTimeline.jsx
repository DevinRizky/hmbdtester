"use client";

import { useState } from "react";
import ScrollAnimate from "@/components/ui/ScrollAnimate"; // 🎯 Impor komponen ScrollAnimate

const AGENDA = [
  // --- BULAN SEPTEMBER 2026 ---
  {
    id: "sept-01",
    name: "DIGISTORE — DEPARTEMEN BNE",
    date: "2026-09-01",
    place: "Telkom University Purwokerto Todays, BISDIGVOLUTION 5.0, DIGIFEST, MEDIA SOSIAL (Rutinitas)",
    status: "Mendatang",
    desc: "Kegiatan penjualan dan pemasaran produk dalam berbagai acara yang diselenggarakan oleh BNE HMBD untuk meningkatkan pendapatan organisasi sekaligus sarana mengembangkan keterampilan pemasaran, komunikasi, dan pengelolaan usaha.",
  },
  {
    id: "sept-02",
    name: "BISDIGVOLUTION 5.0 — DEPARTEMEN INTERNAL",
    date: "2026-09-12",
    place: "Telkom University Purwokerto",
    status: "Mendatang",
    desc: "Kegiatan orientasi studi dan pengenalan kampus kepada mahasiswa baru. Langkah awal bagi mahasiswa untuk mengenal lingkungan kampus baik dari segi akademik maupun non-akademik.",
  },
  {
    id: "sept-03",
    name: "BISZPHERE — DEPARTEMEN BNE",
    date: "2026-09-12",
    place: "Telkom University Purwokerto",
    status: "Mendatang",
    desc: "Kegiatan penjualan dan pemasaran produk dalam berbagai acara yang diselenggarakan oleh BNE HMBD untuk melatih pengelolaan stand penjualan serta pelayanan konsumen.",
  },
  {
    id: "sept-04",
    name: "MAKRAB ANGKATAN 26 — DEPARTEMEN INTERNAL",
    date: "2026-09-19",
    place: "Twin Palm Villa",
    status: "Mendatang",
    desc: "Membangun solidaritas antar mahasiswa serta membentuk karakter pemimpin yang adaptif melalui rangkaian Latihan Dasar Kepemimpinan (LDK), kerja sama tim, dan problem solving.",
  },
  {
    id: "sept-05",
    name: "DIGISPORT — DEPARTEMEN HR",
    date: "2026-09-25",
    place: "Telkom University Purwokerto",
    status: "Mendatang",
    desc: "Mewadahi, mengembangkan, dan mengoptimalkan potensi mahasiswa di berbagai bidang non-akademik agar mampu mengenali potensi diri dan meningkatkan kepercayaan diri.",
  },
  {
    id: "sept-06",
    name: "WASMA — DEPARTEMEN ADVO",
    date: "2026-09-30",
    place: "Belum Ditentukan",
    status: "Mendatang",
    desc: "Program kerja Departemen Advocacy. (Detail jadwal pelaksanaan resmi akan segera disesuaikan).",
  },

  // --- BULAN OKTOBER 2026 ---
  {
    id: "okt-01",
    name: "FUN COLLABORATE — DEPARTEMEN EXTERNAL",
    date: "2026-10-03",
    place: "Universitas Muhammadiyah Purwokerto",
    status: "Mendatang",
    desc: "Kegiatan bounding antar himpunan mahasiswa bisnis digital dengan himpunan di luar kampus untuk membangun networking yang dikemas dengan penuh keseruan.",
  },
  {
    id: "okt-02",
    name: "STUDI BANDING HMBD X HMTI — DEPARTEMEN EXTERNAL",
    date: "2026-10-31",
    place: "Telkom University Purwokerto",
    status: "Mendatang",
    desc: "Mempererat ikatan antara HIMA Bisnis Digital dengan HIMA Teknik Industri Telkom University Purwokerto guna bertukar pikiran mengenai struktur organisasi, proker, dan inovasi.",
  },

  // --- BULAN NOVEMBER 2026 ---
  {
    id: "nov-01",
    name: "DIGISTORE — DEPARTEMEN BNE",
    date: "2026-11-01",
    place: "Belum Ditentukan",
    status: "Mendatang",
    desc: "Kegiatan penjualan dan pemasaran produk berkelanjutan oleh Departemen Business & Entrepreneurship HMBD.",
  },
  {
    id: "nov-02",
    name: "DIGIFEST 4.0 — DEPARTEMEN RNE",
    date: "2026-11-15",
    place: "Belum Ditentukan",
    status: "Mendatang",
    desc: "Festival tahunan bertema 'Modern, cinematic, energetic, ethnic festival' yang memadukan kompetisi, seminar, dan pameran UMKM agar adaptif di era digital.",
  },

  // --- BULAN DESEMBER 2026 ---
  {
    id: "des-01",
    name: "DIALPRO (DIALOG PRODI) — DEPARTEMEN ADVO",
    date: "2026-12-01",
    place: "Telkom University Purwokerto",
    status: "Mendatang",
    desc: "Forum diskusi antara mahasiswa dan program studi untuk menyampaikan aspirasi, membahas isu akademik/non-akademik, serta mencari solusi bersama secara terbuka.",
  },
  {
    id: "des-02",
    name: "PEMIRA — KESELURUHAN DEPARTEMEN",
    date: "2026-12-01",
    place: "Telkom University Purwokerto",
    status: "Mendatang",
    desc: "Pemilihan pimpinan baru untuk regenerasi tongkat kepengurusan HMBD di periode selanjutnya.",
  },
  {
    id: "des-03",
    name: "MUSYAWARAH BESAR (MUBES) — KESELURUHAN DEPARTEMEN",
    date: "2026-12-21",
    place: "Telkom University Purwokerto",
    status: "Mendatang",
    desc: "Musyawarah hasil pertanggungjawaban kerja satu periode Himpunan yang akan berakhir and pembentukan amanah kepemimpinan baru.",
  },
  {
    id: "des-04",
    name: "SERTIJAB (SERAH TERIMA JABATAN) — KESELURUHAN DEPARTEMEN",
    date: "2026-12-28",
    place: "Belum Ditentukan",
    status: "Mendatang",
    desc: "Pelantikan resmi fungsionaris dan anggota baru untuk periode kepengurusan yang melanjutkan.",
  },
];

function sortedAgenda() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = AGENDA.filter((x) => {
    const itemDate = new Date(`${x.date}T12:00:00`);
    return itemDate >= today;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  const done = AGENDA.filter((x) => {
    const itemDate = new Date(`${x.date}T12:00:00`);
    return itemDate < today;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  return [...upcoming, ...done];
}

function formatIdDate(iso) {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function relativeDayLabel(delta, status) {
  if (status === "Mendatang") {
    if (delta === 0) return "hari ini";
    if (delta === 1) return "besok";
    if (delta > 1) return `${delta} hari lagi`;
    return "jadwal akan disesuaikan";
  }
  const past = Math.abs(delta);
  if (past === 0) return "hari yang sama · selesai";
  return `${past} hari lalu`;
}

function daysFromToday(iso) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const t = new Date(`${iso}T12:00:00`);
  return Math.round((t - today) / (1000 * 60 * 60 * 24));
}

export default function AgendaTimeline() {
  const timeline = sortedAgenda();
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section aria-labelledby="agenda-heading">
      <h2 id="agenda-heading" className="text-xl font-bold uppercase tracking-tight text-on-dark lg:text-[32px] lg:leading-[1.15]">
        Kalender kegiatan
      </h2>

      <ol className="mt-12 grid gap-px border border-hairline bg-hairline">
        {timeline.map((item, i) => {
          const delta = daysFromToday(item.date);
          const isExpanded = expandedId === item.id;

          return (
            /* 🎯 Bungkus li dengan ScrollAnimate menggunakan index stagger delay */
            <ScrollAnimate key={item.id} variant="fadeInUp" delay={i * 0.05} speed={0.4} className="w-full">
              <li className="group relative border border-hairline bg-surface-soft transition duration-200 ease-out hover:bg-surface-card hover:shadow-[inset_0_0_0_1px_rgba(28,105,212,0.18)]">
                <button onClick={() => toggleExpand(item.id)} className="w-full text-left p-6 sm:p-8 flex gap-6 pl-6 sm:pl-8 focus:outline-none focus:bg-surface-card" aria-expanded={isExpanded}>
                  <span className={`absolute inset-y-0 left-0 w-1 bg-linear-to-b from-m-blue-light via-m-blue-dark to-m-red opacity-60 transition duration-200 group-hover:opacity-100 ${isExpanded ? "opacity-100" : ""}`} aria-hidden />

                  <span className="hidden w-10 shrink-0 pt-1 font-bold tabular-nums text-muted sm:block">{String(i + 1).padStart(2, "0")}</span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <time className="text-[13px] font-bold uppercase tracking-[1.5px] text-body-strong" dateTime={item.date}>
                        {formatIdDate(item.date)}
                      </time>
                      <span className={`border px-2 py-0.5 text-[11px] font-bold uppercase tracking-[1.5px] ${item.status === "Mendatang" ? "border-m-blue-dark/70 text-body-strong" : "border-hairline-strong text-muted"}`}>
                        {item.status}
                      </span>
                      <span className="text-[11px] font-light uppercase tracking-wide text-muted">{relativeDayLabel(delta, item.status)}</span>
                    </div>

                    <div className="mt-4 flex items-start justify-between gap-4">
                      <p className="text-lg font-bold uppercase leading-snug tracking-tight text-on-dark sm:text-xl">{item.name}</p>
                      <svg
                        className={`w-5 h-5 text-muted shrink-0 mt-1 transition-transform duration-300 motion-reduce:transition-none ${isExpanded ? "rotate-180 text-m-blue-light" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden">
                        {item.desc && <p className="mt-4 text-sm font-light text-body leading-relaxed bg-surface-soft/50 p-3 border-l-2 border-hairline">{item.desc}</p>}
                        <p className="mt-3 text-base font-light text-body">
                          <span className="text-muted">Tempat · </span>
                          {item.place}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            </ScrollAnimate>
          );
        })}
      </ol>
    </section>
  );
}
