// src/app/rekrutmen/page.js
import RecruitmentList from "@/components/rekrutmen/RecruitmentList";

export const metadata = {
  title: "Rekrutmen Kepanitiaan — HMBD Telkom University Purwokerto",
  description: "Informasi resmi pembukaan lowongan kepanitiaan dan pengurus Kabinet Aradhana Himpunan Mahasiswa Bisnis Digital.",
};

export default function RekrutmenPage() {
  return (
    <main className="bg-canvas min-h-screen py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Header Section List Lowongan */}
        <div className="mb-12 border-b border-hairline pb-6">
          <span className="text-[11px] font-bold uppercase tracking-[2px] text-m-blue-dark">Open Recruitment</span>
          <h1 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-on-dark lg:text-[32px]">Kepanitiaan & Organisasi</h1>
          <p className="mt-2 text-xs font-light text-muted max-w-xl leading-relaxed">Mari berkontribusi aktif bersama Kabinet Aradhana. Pilih salah satu kepanitiaan yang sedang dibuka di bawah ini untuk memulai langkah pendaftaran Anda.</p>
        </div>

        {/* Memanggil komponen list kepanitiaan pilihan */}
        <RecruitmentList />
      </div>
    </main>
  );
}
