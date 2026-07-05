"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ScrollAnimate from "@/components/ui/ScrollAnimate"; // 🎯 Impor komponen ScrollAnimate

const inputBase =
  "w-full rounded-none border border-hairline bg-surface-soft px-4 py-3 text-[15px] font-light leading-relaxed text-on-dark caret-m-blue-dark transition duration-200 outline-none placeholder:text-muted focus-visible:border-transparent focus-visible:bg-surface-soft focus-visible:shadow-[0_0_0_1px_#1c69d4,0_0_28px_rgba(28,105,212,0.35)] disabled:cursor-not-allowed disabled:opacity-80";

// Daftar pilihan divisi dropdown khusus Panitia BDV 5.0
const DIVISI_BDV = ["Sekretaris", "Acara", "Humas", "Usdakom", "Sponsor", "Logistik", "PDD", "Keamanan", "Pendamping Kelompok"];

function FormRekrutmenKonten() {
  const searchParams = useSearchParams();
  const posisiDipilih = searchParams.get("posisi") || "Umum / Open Recruitment";

  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [kelas, setKelas] = useState("");
  const [divisi, setDivisi] = useState("");
  const [linkPendukung, setLinkPendukung] = useState("");

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Cek apakah posisi ini adalah Panitia BDV 5.0 untuk memunculkan dropdown divisi
  const isPanitiaBDV = posisiDipilih === "Rekrutmen Panitia BDV 5.0";

  async function handleSubmit(e) {
    e.preventDefault();

    // Validasi dasar frontend
    if (!nama.trim() || !nim.trim() || !kelas.trim() || !linkPendukung.trim() || (isPanitiaBDV && !divisi)) {
      setErrorMessage("Mohon lengkapi seluruh kolom formulir dan pilih divisi Anda.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      // Menembak ke API Route internal Next.js (Database Mode)
      const response = await fetch("/api/rekrutmen/daftar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kegiatan: posisiDipilih,
          divisi: isPanitiaBDV ? divisi : "Peserta Umum",
          nama: nama,
          nim: nim,
          kelas: kelas,
          linkPendukung: linkPendukung,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengirim pendaftaran.");
      }

      // Jika response sukses (201)
      setSent(true);
      setNama("");
      setNim("");
      setKelas("");
      setDivisi("");
      setLinkPendukung("");
    } catch (error) {
      setErrorMessage(error.message || "Gagal mengirim data pendaftaran. Silakan coba beberapa saat lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    // 🎯 Menambahkan lengkungan asimetris khas Kabinet Aradhana pada bodi kartu form
    <form onSubmit={handleSubmit} className="border border-hairline bg-surface-soft p-6 lg:p-10 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-lg rounded-br-lg transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.03)]" noValidate>
      {sent && (
        <div role="status" className="mb-8 border border-m-blue-dark/40 bg-canvas px-4 py-3 text-sm font-light text-body-strong rounded-r-md">
          <span className="font-bold text-m-blue-dark uppercase text-[11px] block mb-1">Pendaftaran Berhasil</span>
          Formulir Anda untuk posisi <strong className="font-medium text-on-dark">{posisiDipilih}</strong> telah aman tersimpan.
        </div>
      )}

      {errorMessage && (
        <div role="alert" className="mb-8 border border-m-red/40 bg-canvas px-4 py-3 text-sm font-light text-m-red rounded-r-md">
          {errorMessage}
        </div>
      )}

      <div className="mb-8 border-l-2 border-m-blue-dark bg-canvas/60 p-4 rounded-r-md">
        <span className="block text-[10px] font-bold uppercase tracking-wider text-muted">Kegiatan Utama:</span>
        <span className="text-sm font-medium text-on-dark block mt-1 leading-snug uppercase">{posisiDipilih}</span>
      </div>

      <div className="space-y-8">
        {/* NAMA LENGKAP */}
        <div>
          <label htmlFor="nama" className="block text-[11px] font-bold uppercase tracking-[1.5px] text-on-dark">
            Nama Lengkap
          </label>
          <input id="nama" type="text" required disabled={loading} className={`${inputBase} mt-3`} value={nama} onChange={(e) => setNama(e.target.value)} />
        </div>

        {/* NIM */}
        <div>
          <label htmlFor="nim" className="block text-[11px] font-bold uppercase tracking-[1.5px] text-on-dark">
            NIM
          </label>
          <input id="nim" type="text" inputMode="numeric" required disabled={loading} className={`${inputBase} mt-3`} value={nim} onChange={(e) => setNim(e.target.value)} />
        </div>

        {/* KELAS */}
        <div>
          <label htmlFor="kelas" className="block text-[11px] font-bold uppercase tracking-[1.5px] text-on-dark">
            Kelas Saat Ini
          </label>
          <input id="kelas" type="text" required disabled={loading} className={`${inputBase} mt-3`} value={kelas} onChange={(e) => setKelas(e.target.value)} />
        </div>

        {/* DYNAMIC DROPDOWN SELECT */}
        {isPanitiaBDV && (
          <div>
            <label htmlFor="divisi" className="block text-[11px] font-bold uppercase tracking-[1.5px] text-on-dark">
              Pilihan Divisi Kepanitiaan
            </label>

            <div className="relative mt-3 w-full">
              <select id="divisi" required disabled={loading} className={`${inputBase} appearance-none cursor-pointer pr-10`} value={divisi} onChange={(e) => setDivisi(e.target.value)}>
                <option value="" disabled className="text-muted bg-surface-soft">
                  -- Pilih Salah Satu Divisi --
                </option>
                {DIVISI_BDV.map((div) => (
                  <option key={div} value={div} className="text-on-dark bg-surface-soft">
                    {div}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* LINK DRIVE CV */}
        <div>
          <label htmlFor="link" className="block text-[11px] font-bold uppercase tracking-[1.5px] text-on-dark">
            Tautan Berkas Pendukung (CV / Portofolio)
          </label>
          <input
            id="link"
            type="url"
            required
            disabled={loading}
            className={`${inputBase} mt-3`}
            placeholder="Google Drive / Notion Link (Pastikan akses dibuka publik)"
            value={linkPendukung}
            onChange={(e) => setLinkPendukung(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-12 min-w-37 items-center justify-center rounded-md border border-on-dark bg-transparent px-8 text-[13px] font-bold uppercase tracking-[1.5px] text-on-dark transition duration-200 ease-out hover:border-m-blue-dark hover:bg-on-dark hover:text-canvas hover:shadow-[0_0_36px_rgba(28,105,212,0.45)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Mengirim..." : "Kirim Formulir"}
        </button>
        <p className="max-w-md text-xs font-light leading-relaxed text-muted">
          Pastikan isian data mematuhi aturan etika berkas kampus. Data pendaftaran Anda akan langsung terkirim secara enkripsi ke database panitia seleksi Kabinet Aradhana.
        </p>
      </div>
    </form>
  );
}

export default function HalamanDaftarRekrutmen() {
  return (
    <section className="py-section bg-transparent" aria-labelledby="rekrutmen-form-heading">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-10">
        <h2 id="rekrutmen-form-heading" className="sr-only">
          Form pendaftaran rekrutmen panitia
        </h2>
        {/* 🎯 Membungkus seluruh alur form dengan animasi masuk fadeInUp tunggal yang elegan */}
        <ScrollAnimate variant="fadeInUp" speed={0.45}>
          <Suspense fallback={<div className="text-xs text-muted font-light px-4 py-16 border border-dashed border-hairline bg-surface-soft text-center rounded-lg">Memuat formulir pendaftaran...</div>}>
            <FormRekrutmenKonten />
          </Suspense>
        </ScrollAnimate>
      </div>
    </section>
  );
}
