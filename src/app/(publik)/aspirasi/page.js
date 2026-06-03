import AspirasiForm from "@/components/aspirasi/AspirasiForm";
import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Aspirasi",
};

export default function AspirasiPage() {
  return (
    <>
      <PageShell eyebrow="Saluran kolektif" title="Aspirasi">
        <p>
          Sampaikan kritik yang membangun, saran konkret untuk peningkatan proses
          organisasi, atau apresiasi secara terang-terangan — struktur formulir telah
          disiapkan agar Anda dapat berganti mode anonim bila dibutuhkan.
        </p>
      </PageShell>
      <AspirasiForm />
    </>
  );
}
