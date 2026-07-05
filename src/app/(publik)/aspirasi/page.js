import AspirasiForm from "@/components/aspirasi/AspirasiForm";
import PageShell from "@/components/PageShell";
import ScrollAnimate from "@/components/ui/ScrollAnimate"; // 🎯 Impor komponen ScrollAnimate

export const metadata = {
  title: "Aspirasi",
};

export default function AspirasiPage() {
  return (
    <>
      {/* HEADER HALAMAN */}
      <PageShell eyebrow="Saluran kolektif" title="Aspirasi">
        <p>Sampaikan kritik yang membangun, saran konkret untuk peningkatan proses organisasi, atau apresiasi secara terang-terangan. Struktur formulir telah disiapkan agar dapat berganti mode anonim bila dibutuhkan.</p>
      </PageShell>

      {/* FORM UTAMA ASPIRASI */}
      <div className="mx-auto max-w-[1440px] px-4 pb-24 sm:px-6 lg:px-10">
        <ScrollAnimate variant="fadeInUp" speed={0.5}>
          <AspirasiForm />
        </ScrollAnimate>
      </div>
    </>
  );
}
