"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

const inputBase =
  "w-full rounded-none border border-hairline bg-surface-soft px-4 py-3 text-[15px] font-light leading-relaxed text-on-dark caret-m-blue-dark transition duration-200 outline-none placeholder:text-muted focus-visible:border-transparent focus-visible:bg-surface-soft focus-visible:shadow-[0_0_0_1px_#1c69d4,0_0_28px_rgba(28,105,212,0.35)]";

export default function RecruitmentForm({ kategori = "hmbd" }) {
  const searchParams = useSearchParams();
  const posisiDipilih = searchParams.get("posisi") || "Umum / Open Recruitment";

  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [kelas, setKelas] = useState("");
  const [linkPendukung, setLinkPendukung] = useState("");

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nama.trim() || !nim.trim() || !kelas.trim() || !linkPendukung.trim()) {
      setErrorMessage("Mohon lengkapi seluruh kolom formulir rekrutmen.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const GOOGLE_SCRIPT_URL = "PASANG_URL_WEB_APP_APPS_SCRIPT_KAMU_DI_SINI";

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetSheet: "Rekrutmen",
          kategori_rekrutmen: kategori,
          posisi: posisiDipilih,
          nama: nama,
          nim: nim,
          kelas: kelas,
          linkPendukung: linkPendukung,
        }),
      });

      setSent(true);
      setNama("");
      setNim("");
      setKelas("");
      setLinkPendukung("");
    } catch (error) {
      setErrorMessage("Gagal mengirim data pendaftaran. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border border-hairline bg-surface-soft p-6 lg:p-10" noValidate>
      {sent && (
        <div role="status" className="mb-8 border border-m-blue-dark/40 bg-canvas px-4 py-3 text-sm font-light text-body-strong">
          <span className="font-bold text-m-blue-dark uppercase text-[11px] block mb-1">Pendaftaran Berhasil!</span>
          Pendaftaran Anda untuk posisi <strong className="font-medium text-on-dark">{posisiDipilih}</strong> telah aman tersimpan.
        </div>
      )}

      {errorMessage && (
        <div role="alert" className="mb-8 border border-m-red/40 bg-canvas px-4 py-3 text-sm font-light text-m-red">
          {errorMessage}
        </div>
      )}

      <div className="space-y-8">
        <div>
          <label htmlFor="nama" className="block text-[11px] font-bold uppercase tracking-[1.5px] text-on-dark">
            Nama Lengkap
          </label>
          <input id="nama" type="text" required disabled={loading} className={`${inputBase} mt-3`} value={nama} onChange={(e) => setNama(e.target.value)} />
        </div>

        <div>
          <label htmlFor="nim" className="block text-[11px] font-bold uppercase tracking-[1.5px] text-on-dark">
            NIM
          </label>
          <input id="nim" type="text" inputMode="numeric" required disabled={loading} className={`${inputBase} mt-3`} value={nim} onChange={(e) => setNim(e.target.value)} />
        </div>

        <div>
          <label htmlFor="kelas" className="block text-[11px] font-bold uppercase tracking-[1.5px] text-on-dark">
            Kelas
          </label>
          <input id="kelas" type="text" required disabled={loading} className={`${inputBase} mt-3`} value={kelas} onChange={(e) => setKelas(e.target.value)} />
        </div>

        <div>
          <label htmlFor="link" className="block text-[11px] font-bold uppercase tracking-[1.5px] text-on-dark">
            Tautan Berkas Pendukung (CV / Portofolio)
          </label>
          <input id="link" type="url" required disabled={loading} className={`${inputBase} mt-3`} placeholder="Google Drive / Notion Link" value={linkPendukung} onChange={(e) => setLinkPendukung(e.target.value)} />
        </div>
      </div>

      <div className="mt-10 border-t border-hairline pt-8">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto inline-flex h-12 min-w-[148px] items-center justify-center border border-on-dark bg-transparent px-8 text-[13px] font-bold uppercase tracking-[1.5px] text-on-dark hover:bg-on-dark hover:text-canvas transition-all disabled:opacity-50"
        >
          {loading ? "Mengirim..." : "Kirim Formulir"}
        </button>
      </div>
    </form>
  );
}
