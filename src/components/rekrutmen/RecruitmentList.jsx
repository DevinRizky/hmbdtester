"use client";

import Link from "next/link";

// DATABASE MACRO UNTUK MATRIKS REKRUTMEN KABINET
const BDV_RECRUITMENTS = [
  {
    id: "bdv-panitia",
    title: "Rekrutmen Panitia BDV 5.0",
    status: "DIBUKA",
    closingDate: "2026-06-03",
    description: "Mari bergabung menjadi bagian dari sejarah penyambutan mahasiswa baru Bisnis Digital. Dibutuhkan talenta yang tangguh, adaptif, dan siap berkolaborasi dalam struktur pelaksana lingkup prodi.",
    timeline: ["26 Mei – 03 Juni : Open Recruitment", "04 Juni : Seleksi Berkas", "05 Juni : Wawancara", "09 Juni : Pengumuman"],
    requirements: [
      "Mahasiswa aktif Program Studi Bisnis Digital angkatan 2024–2025",
      "Tidak terlibat pelanggaran disiplin akademik maupun non-akademik",
      "Melampirkan CV dengan format ATS",
      "Melampirkan sertifikat kelulusan Bisdig Volution",
      "Melampirkan sertifikat kelulusan Todays",
      "Melampirkan portofolio khusus pendaftar divisi PDD",
    ],
    divisions: ["Sekretaris", "Acara", "Humas", "Usdakom", "Sponsor", "Logistik", "PDD", "Keamanan", "Pendamping Kelompok"],
  },
  {
    id: "bdv-peserta",
    title: "Rekrutmen Registrasi Peserta BDV 5.0",
    status: "SEGERA", // Comming Soon
    closingDate: "2026-07-01",
    description: "Gerbang awal integrasi mahasiswa baru angkatan 2026 ke dalam ekosistem Program Studi Bisnis Digital. Pendaftaran ini sekaligus akan terhubung langsung dengan kegiatan MAKRAB LDK kabinet.",
    timeline: ["Informasi detail linimasa akan diperbarui oleh kesekretariatan menyusul kalender akademik."],
    requirements: ["Mahasiswa Baru S1 Bisnis Digital Angkatan 2026", "Menyiapkan berkas registrasi pokok program studi"],
    divisions: ["Peserta Angkatan 2026"],
  },
];

const DIGIFEST_RECRUITMENTS = [
  {
    id: "digi-panitia",
    title: "Rekrutmen Panitia Digifest",
    status: "SEGERA",
    closingDate: "2026-08-01",
    description: "Sinergi pergelaran festival tahunan terbesar Program Studi Bisnis Digital. Persiapkan diri Anda untuk mengonsep ruang pameran, kompetisi digital, dan konferensi teknologi nasional.",
    timeline: ["Ketentuan dan tanggal pelaksana masih dalam tahap perumusan bersama Direktur Creative Media."],
    requirements: ["Mahasiswa aktif S1 Bisnis Digital", "Berkomitmen penuh selama masa produksi proyek festival"],
    divisions: ["Inti Kabinet / SC"],
  },
  {
    id: "digi-peserta",
    title: "Rekrutmen Peserta Digifest",
    status: "SEGERA",
    closingDate: "2026-09-01",
    description: "Pendaftaran delegasi kompetisi dan partisipan ekshibisi Digifest. Pendaftaran peserta nantinya akan dibagi secara spesifik ke dalam beberapa sub-divisi perlombaan.",
    timeline: ["Kategori sub-divisi perlombaan dan regulasi delegasi akan segera dirilis."],
    requirements: ["Terbuka untuk klaster internal maupun eksternal kampus sesuai sub-divisi"],
    divisions: ["Sub-Divisi Perlombaan", "Partisipan Ekshibisi"],
  },
];

function formatIdDateShort(iso) {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function RecruitmentList() {
  // Fungsi helper render blok list kartu rekrutmen
  const renderList = (items) => (
    <ul className="grid gap-8 lg:grid-cols-2">
      {items.map((job) => {
        const isOpen = job.status === "DIBUKA";
        return (
          <li key={job.id} className="flex flex-col border border-hairline bg-surface-soft p-6 transition duration-200 ease-out hover:border-m-blue-dark/35 hover:shadow-[0_0_28px_rgba(28,105,212,0.14)] lg:p-8">
            {/* Header Kartu */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <span className={`border px-3 py-1 text-[11px] font-bold uppercase tracking-[1.5px] ${isOpen ? "border-m-blue-dark bg-m-blue-dark/10 text-body-strong" : "border-muted bg-surface/50 text-muted"}`}>{job.status}</span>
              <p className="text-[12px] font-light uppercase tracking-wide text-muted">
                Batas Akhir · <time dateTime={job.closingDate}>{formatIdDateShort(job.closingDate)}</time>
              </p>
            </div>

            {/* Judul Kepanitiaan */}
            <h3 className="mt-6 text-xl font-bold uppercase leading-snug tracking-tight text-on-dark">{job.title}</h3>

            {/* Deskripsi */}
            <div className="mt-4 text-sm font-light leading-relaxed text-body text-justify">{job.description}</div>

            {/* Sesi Detail: Timeline & Persyaratan (Hanya muncul jika berstatus DIBUKA atau memiliki info detail) */}
            <div className="mt-6 grid gap-4 border-t border-hairline pt-4 sm:grid-cols-2 text-xs">
              <div>
                <span className="block font-bold uppercase tracking-wider text-[10px] text-on-dark mb-2">📌 Linimasa:</span>
                <ul className="space-y-1 font-light text-muted list-inside list-disc">
                  {job.timeline.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="block font-bold uppercase tracking-wider text-[10px] text-on-dark mb-2">📋 Persyaratan Dasar:</span>
                <ul className="space-y-1 font-light text-muted list-inside list-disc">
                  {job.requirements.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Alokasi Pilihan Divisi */}
            <div className="mt-6">
              <span className="block font-bold uppercase tracking-wider text-[10px] text-on-dark mb-2">👥 Divisi/Klaster Tersedia:</span>
              <div className="flex flex-wrap gap-1.5">
                {job.divisions.map((d) => (
                  <span key={`${job.id}-${d}`} className="border border-hairline bg-canvas/60 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[1px] text-body">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="mt-8 mt-auto flex flex-wrap items-center gap-4 border-t border-hairline pt-6">
              {isOpen ? (
                <Link
                  href={`/rekrutmen/daftar?posisi=${encodeURIComponent(job.title)}`}
                  className="inline-flex h-11 min-w-[168px] items-center justify-center border border-on-dark bg-transparent px-6 text-[12px] font-bold uppercase tracking-[1.5px] text-on-dark transition duration-200 ease-out hover:border-m-blue-dark hover:bg-on-dark hover:text-canvas hover:shadow-[0_0_36px_rgba(28,105,212,0.45)]"
                >
                  Daftar sekarang
                </Link>
              ) : (
                <button type="button" disabled className="inline-flex h-11 cursor-not-allowed items-center justify-center border border-hairline bg-canvas/20 px-6 text-[12px] font-bold uppercase tracking-[1.5px] text-muted/50">
                  Belum Dibuka
                </button>
              )}

              <div className="text-[11px] font-light text-muted flex-1 leading-normal">
                {isOpen ? "Formulir internal aktif. Mohon lengkapi seluruh lampiran dokumen sesuai regulasi tim seleksi." : "Gerbang pendaftaran masih dikunci atau telah melewati batas masa retensi administrasi."}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="space-y-16">
      {/* SEKSI UTAMA A: BISDIG VOLUTION (BDV) */}
      <div className="border-t-2 border-m-blue-dark pt-8">
        <div className="mb-6">
          <h2 className="text-2xl font-black uppercase tracking-tight text-on-dark">I. Bisdig Volution (BDV)</h2>
          <p className="text-xs font-light text-muted mt-1">Matriks orientasi resmi dan pembekalan kultur akademik mahasiswa baru tingkat rumpun Program Studi Bisnis Digital.</p>
        </div>
        {renderList(BDV_RECRUITMENTS)}
      </div>

      {/* SEKSI UTAMA B: DIGIFEST */}
      <div className="border-t-2 border-hairline pt-8">
        <div className="mb-6">
          <h2 className="text-2xl font-black uppercase tracking-tight text-on-dark/70">II. Digital Festival (Digifest)</h2>
          <p className="text-xs font-light text-muted mt-1">Eksibisi akbar dan ruang unjuk kreativitas inovasi teknologi digital tahunan berskala nasional.</p>
        </div>
        {renderList(DIGIFEST_RECRUITMENTS)}
      </div>
    </div>
  );
}
