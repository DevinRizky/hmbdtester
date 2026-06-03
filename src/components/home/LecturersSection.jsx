"use client";

// 🎯 Ditambahkan props: lecturersData
export default function LecturersSection({ lecturersData }) {
  const defaultLecturers = [
    { name: "Alfilia Hilda Rahmatika, S.M., M.M,CPHRM., CHRBP", role: "Digital Business Strategy", nip: "NIP · 25000020-3", imageSrc: "/Alfilia.jpeg" },
    { name: "Imam Adiyana, S.Stat., M.Si", role: "Big Data Processing & Analysis", nip: "NIP · 25920031-3", imageSrc: "/Imam.jpeg" },
  ];

  const dataRender = lecturersData && lecturersData.length > 0 ? lecturersData : defaultLecturers;

  return (
    <section className="bg-canvas py-16 pb-24 lg:py-24 border-t border-hairline/60">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 text-center">
        <h2 className="text-xl font-bold uppercase tracking-tight text-on-dark sm:text-2xl lg:text-[32px] lg:leading-[1.15]">Dosen Pembimbing Himpunan Mahasiswa Bisnis Digital</h2>
        <div className="mx-auto mt-4 max-w-2xl text-base font-light text-body text-center block">Tim Pembimbing HMBD Telkom University Purwokerto — data riil fungsional akademik formal.</div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center mx-auto max-w-3xl">
          {/* 🎯 Map dari dataRender dinamis */}
          {dataRender.map(({ name, role, nip, imageSrc }) => (
            <article key={nip} className="border border-hairline bg-surface-soft text-center flex flex-col items-center p-5 group">
              <div className="aspect-[4/3] w-full border border-hairline bg-black flex justify-center items-center overflow-hidden shadow-sm">
                <img src={imageSrc} alt={`Foto ${name}`} className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.02]" loading="lazy" />
              </div>

              <div className="mt-5 w-full flex flex-col flex-1">
                <p className="text-[11px] font-bold uppercase tracking-[1.5px] text-m-blue-dark dark:text-m-blue-light mx-auto">Pembimbing Bisnis Digital</p>
                <h3 className="mt-2 text-base font-bold uppercase leading-snug tracking-tight text-on-dark min-h-[44px] flex items-center justify-center">{name}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-body text-justify sm:text-center flex-1">{role}</p>
                <p className="mt-4 border-t border-hairline/60 pt-4 font-mono text-xs font-light tracking-wide text-muted w-full">{nip}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
