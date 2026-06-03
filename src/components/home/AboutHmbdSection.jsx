"use client";

import Link from "next/link";

export default function KabinetSection() {
  return (
    <section className="bg-canvas py-16 border-t border-hairline/60">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* KOTAK UTAMA KABINET: Menggunakan Grid 2 Kolom pada Layar Desktop (lg) */}
        <div className="border border-hairline bg-surface-soft p-6 sm:p-10 lg:p-12 grid gap-8 lg:grid-cols-12 items-center">
          {/* KOLOM KIRI: Video Animasi Logo Kabinet */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative aspect-square w-full max-w-[360px] border border-hairline bg-black p-4 overflow-hidden flex items-center justify-center shadow-md">
              {/* FIX: Ubah object-cover menjadi object-contain agar video utuh 100% tidak terpotong zoom */}
              <video src="/AnimasiKabinet.mp4" autoPlay loop muted playsInline className="h-full w-full object-contain" />
            </div>
          </div>

          {/* KOLOM KANAN: Teks Penjelasan Kabinet Aradhana */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-[11px] font-bold uppercase tracking-[2px] text-m-red">Struktur Kepengurusan</span>
            <h2 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-on-dark sm:text-3xl">Kabinet Aradhana</h2>
            <div className="h-0.5 w-16 bg-linear-to-r from-m-blue-dark to-m-red mt-3 rounded-none" />

            <p className="mt-5 text-sm sm:text-base font-light text-body text-justify leading-relaxed">
              Aradhana membawa semangat kolaborasi yang adaptif dan progresif. Nama ini merepresentasikan komitmen seluruh pengurus Himpunan Mahasiswa Bisnis Digital Telkom University Purwokerto untuk menjadi pelopor inovasi, wadah yang
              inklusif bagi aspirasi mahasiswa, serta penggerak internal yang solid demi mewujudkan cita-cita besar rumpun keilmuan digital ekonomi.
            </p>

            {/* Tombol Selengkapnya */}
            <div className="mt-6">
              <Link href="/kabinet" className="inline-block border border-hairline px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-on-dark hover:bg-canvas transition-all duration-200 active:scale-[0.98]">
                Selengkapnya
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
