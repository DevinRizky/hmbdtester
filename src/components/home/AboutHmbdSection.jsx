"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ScrollAnimate from "@/components/ui/ScrollAnimate";

export default function KabinetSection() {
  return (
    <section className="bg-transparent py-16 border-t border-hairline/60">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Pembungkus Scroll Animate untuk Kotak Utama Kabinet */}
        <ScrollAnimate variant="scaleUp">
          {/* 💡 SENTUHAN ASIMETRIS TERBALIK: 
            Jika sebelumnya Kanan-Atas melengkung, sekarang kita balik menjadi Kiri-Atas (rounded-tl-[60px]) 
            dan Kanan-Bawah (rounded-br-[60px]) agar layout terasa dinamis saat di-scroll.
          */}
          <div className="border border-hairline bg-surface-soft p-6 sm:p-10 lg:p-12 grid gap-8 lg:grid-cols-12 items-center shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-m-red/30 rounded-tl-[60px] rounded-br-[60px] rounded-tr-xl rounded-bl-xl">
            {/* KOLOM KIRI: Video Animasi Logo Kabinet */}
            <div className="lg:col-span-5 flex justify-center w-full">
              {/* Bingkai Video Logo mengikuti bahasa desain lengkung asimetris terbalik */}
              <div className="relative aspect-square w-full max-w-[360px] border border-hairline bg-black p-4 overflow-hidden flex items-center justify-center shadow-md rounded-tl-[40px] rounded-br-[40px] rounded-tr-md rounded-bl-md transition-transform duration-500 hover:scale-[1.02]">
                <video src="/assets/AnimasiKabinet.mp4" autoPlay loop muted playsInline className="h-full w-full object-contain" />
              </div>
            </div>

            {/* KOLOM KANAN: Teks Penjelasan Kabinet Aradhana */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-[11px] font-bold uppercase tracking-[2px] text-m-red">Struktur Kepengurusan</span>
              <h2 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-on-dark sm:text-3xl">Kabinet Aradhana</h2>

              {/* Garis Dekoratif dengan Efek Lebar Dinamis */}
              <div className="h-0.5 w-16 bg-linear-to-r from-m-blue-dark to-m-red mt-3 rounded-none transition-all duration-500 group-hover:w-24" />

              <p className="mt-5 text-sm sm:text-base font-light text-body text-justify leading-relaxed">
                Kabinet Aradhana terbangun dari keresahan masing masing dari kita terkait dengan kepemimpinan dan arah gerak organisasi. Kabinet Aradhana terbangun dengan tiga nilai, yang pertama kreatif, kedua ekspresif, ketiga
                professional. Nama Aradhana diambil dari bahasa Sansekerta yang berarti perdamaian dan penghormatan.
              </p>

              {/* Tombol Selengkapnya dengan Efek Hover Micro-Interaction */}
              <div className="mt-6">
                <Link
                  href="/kabinet"
                  className="inline-block border border-hairline px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-on-dark bg-canvas/40 backdrop-blur-xs transition-all duration-300 hover:bg-on-dark hover:text-canvas hover:scale-[1.05] active:scale-[0.98] rounded-xs"
                >
                  Selengkapnya
                </Link>
              </div>
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}
