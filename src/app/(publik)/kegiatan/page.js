import MStripe from "@/components/MStripe";
import AgendaTimeline from "@/components/kegiatan/AgendaTimeline";
import ActivityGallery from "@/components/kegiatan/ActivityGallery";
import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Kegiatan",
};

export default function KegiatanPage() {
  return (
    <>
      <PageShell eyebrow="Agenda & dokumentasi resmi" title="Kegiatan">
        <p>
          Satu jalur bagi perencanaan agenda yang mobile-friendly serta galeri
          dokumentasi resmi — struktur foto mengikuti aspek kotak industri tanpa radius.
        </p>
      </PageShell>

      <div className="mx-auto max-w-[1440px] px-4 py-section sm:px-6 lg:px-10">
        <AgendaTimeline />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <MStripe />
      </div>

      <ActivityGallery />
    </>
  );
}
