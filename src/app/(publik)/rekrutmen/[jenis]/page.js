"use client";

import { useParams } from "next/navigation";
import RecruitmentList from "@/components/rekrutmen/RecruitmentList";

export default function RekrutmenJenisPage() {
  const { jenis } = useParams();
  const kategori = jenis || "hmbd";

  return (
    <main className="bg-canvas min-h-screen py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* =========================================================================
            HEADER SECTION: Hanya muncul di halaman HMBD. 
            Di halaman 'lainnya', blok ini akan disembunyikan total.
            ========================================================================= */}
        {kategori === "hmbd" && (
          <div className="mb-12 border-b border-hairline pb-6">
            <span className="text-[11px] font-bold uppercase tracking-[2px] text-m-blue-dark">Open Recruitment</span>
            <h1 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-on-dark lg:text-[32px]">Rekrutmen HMBD</h1>
            <p className="mt-2 text-xs font-light text-muted max-w-xl leading-relaxed">
              Mari berkontribusi aktif bersama Kabinet Aradhana. Pilih salah satu kepanitiaan HMBD yang sedang dibuka di bawah ini untuk memulai langkah pendaftaran Anda.
            </p>
          </div>
        )}

        {/* Hanya menampilkan daftar lowongan */}
        <RecruitmentList kategori={kategori} />
      </div>
    </main>
  );
}
