"use client";

import ScrollAnimate from "@/components/ui/ScrollAnimate";

export default function LecturersSection({ lecturersData }) {
  const defaultLecturers = [
    {
      name: "Alfilia Hilda Rahmatika, S.M., M.M,CPHRM., CHRBP",
      role: "Gugus Kemahasiswaan",
      nip: "NIP · 25000020-3",
      imageSrc: "/assets/Alfilia.webp",
    },
    {
      name: "Imam Adiyana, S.Stat., M.Si",
      role: "Gugus Pengembangan Pembelajaran",
      nip: "NIP · 25920031-3",
      imageSrc: "/assets/Imam.webp",
    },
  ];

  const dataRender = lecturersData && lecturersData.length > 0 ? lecturersData : defaultLecturers;

  return (
    <section className="bg-transparent py-16 pb-24 lg:py-24 border-t border-hairline/60">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 text-center">
        {/* Judul Seksi dengan Scroll Reveal */}
        <ScrollAnimate variant="fadeInUp">
          <h2 className="text-xl font-bold uppercase tracking-tight text-on-dark sm:text-2xl lg:text-[32px] lg:leading-[1.15] max-w-4xl mx-auto">Dosen Pembina Himpunan Mahasiswa Bisnis Digital</h2>
        </ScrollAnimate>

        {/* Grid Kartu Dosen */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center mx-auto max-w-3xl">
          {dataRender.map(({ name, role, nip, imageSrc }, index) => (
            <ScrollAnimate
              key={nip}
              variant="fadeInUp"
              delay={index * 0.15} // Memberikan efek muncul bergantian yang rapi
            >
              <article className="h-full border border-hairline bg-surface-soft p-5 flex flex-col items-center text-center group transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:border-m-blue-light/30 rounded-xl">
                {/* Bingkai Foto dengan Sentuhan Lengkung Asimetris Profesional */}
                <div className="aspect-[4/3] w-full border border-hairline bg-black flex justify-center items-center overflow-hidden shadow-sm rounded-tr-[30px] rounded-bl-[30px] rounded-tl-md rounded-br-md">
                  <img src={imageSrc} alt={`Foto ${name}`} className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.04]" loading="lazy" />
                </div>

                {/* Konten Teks */}
                <div className="mt-5 w-full flex flex-col items-center text-center flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-[1.5px] text-m-blue-dark dark:text-m-blue-light">Pembina HMBD</p>

                  <h3 className="mt-2 min-h-[44px] flex items-center justify-center text-base font-bold uppercase leading-snug tracking-tight text-on-dark text-center">{name}</h3>

                  <p className="mt-2 flex-1 text-sm font-light leading-relaxed text-body text-center">{role}</p>

                  <p className="mt-4 w-full border-t border-hairline/60 pt-4 font-mono text-xs font-light tracking-wide text-muted text-center">{nip}</p>
                </div>
              </article>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  );
}
