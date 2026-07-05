import MStripe from "@/components/MStripe";
import AgendaTimeline from "@/components/kegiatan/AgendaTimeline";
import ActivityGallery from "@/components/kegiatan/ActivityGallery";
import PageShell from "@/components/PageShell";
import ScrollAnimate from "@/components/ui/ScrollAnimate"; // 🎯 Impor komponen ScrollAnimate

export const metadata = {
  title: "Kegiatan",
};

export default function KegiatanPage() {
  return (
    <>
      {/* HEADER HALAMAN */}
      <PageShell eyebrow="Agenda & dokumentasi resmi" title="Kegiatan">
        <p>Satu jalur bagi perencanaan agenda dan galeri dokumentasi resmi.</p>
      </PageShell>

      {/* SEKSI 1: LINIMASA AGENDA PROKER */}
      <div className="mx-auto max-w-[1440px] px-4 py-section sm:px-6 lg:px-10">
        <ScrollAnimate variant="fadeInUp" speed={0.45}>
          <div className="flex items-center gap-3 mb-10">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-m-blue-dark/10 text-xs font-bold text-m-blue-dark">I</span>
            <h2 className="text-xl font-black uppercase tracking-tight text-on-dark">Linimasa Proker & Agenda Kerja</h2>
          </div>
        </ScrollAnimate>
        <AgendaTimeline />
      </div>

      {/* STRIPE PEMBATAS */}
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <MStripe />
      </div>

      {/* SEKSI 2: GALERI DOKUMENTASI KEGIATAN */}
      <div className="mx-auto max-w-[1440px] px-4 pb-24 sm:px-6 lg:px-10">
        <ScrollAnimate variant="fadeInUp" speed={0.45}>
          <div className="flex items-center gap-3 mb-10">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-m-red/10 text-xs font-bold text-m-red">II</span>
            <h2 className="text-xl font-black uppercase tracking-tight text-on-dark">Galeri & Dokumentasi Aktivitas</h2>
          </div>
        </ScrollAnimate>
        <ActivityGallery />
      </div>
    </>
  );
}
