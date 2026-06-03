"use client";

// 🎯 Ditambahkan props: visi, misi, kahim, wakahim
export default function VisionMissionOrgSection({ visi, misi, kahim, wakahim }) {
  // Data fallback jika database belum terisi
  const defaultMisi = [
    "Membangun internal organisasi yang solid, harmonis, dan berasaskan kekeluargaan demi kelancaran roda kerja himpunan.",
    "Menyelenggarakan program kerja yang focus pada peningkatan kompetensi akademik dan non-akademik di bidang bisnis digital.",
    "Mengoptimalkan sistem advokasi dan penyaluran aspirasi yang responsif, solutif, dan transparan bagi seluruh mahasiswa.",
  ];

  return (
    <section id="visi-misi" className="bg-canvas py-16 lg:py-24 border-t border-hairline/60">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* VISI & MISI */}
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="border border-hairline bg-surface-soft p-6 sm:p-8">
            <span className="text-[11px] font-bold uppercase tracking-[2px] text-m-blue-dark dark:text-m-blue-light">Arah Juang</span>
            <h2 className="mt-2 text-xl font-extrabold uppercase tracking-tight text-on-dark sm:text-2xl">Visi HMBD</h2>
            <div className="h-0.5 w-12 bg-m-blue-dark mt-3" />
            {/* 🎯 Menggunakan props visi */}
            <p className="mt-5 text-sm sm:text-base font-light text-body text-justify leading-relaxed">{visi || "Menjadikan Himpunan Mahasiswa Bisnis Digital sebagai lembaga yang adaptif, inovatif, dan inklusif..."}</p>
          </div>

          <div className="border border-hairline bg-surface-soft p-6 sm:p-8">
            <span className="text-[11px] font-bold uppercase tracking-[2px] text-m-red">Langkah Nyata</span>
            <h2 className="mt-2 text-xl font-extrabold uppercase tracking-tight text-on-dark sm:text-2xl">Misi HMBD</h2>
            <div className="h-0.5 w-12 bg-m-red mt-3" />
            <ul className="mt-5 space-y-3 text-sm sm:text-base font-light text-body text-justify list-none">
              {/* 🎯 Render array misi secara dinamis */}
              {(misi && misi.length > 0 ? misi : defaultMisi).map((item, index) => (
                <li key={index}>
                  <strong className="text-on-dark font-medium">{index + 1}.</strong> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* PROFIL KAHIM & WAKAHIM */}
        <div className="mt-16 lg:mt-24">
          <div className="text-center mb-10">
            <span className="text-[11px] font-bold uppercase tracking-[2px] text-muted">Struktur Pimpinan</span>
            <h3 className="mt-2 text-xl font-extrabold uppercase tracking-tight text-on-dark sm:text-2xl">Ketua & Wakil Ketua Himpunan</h3>
            <div className="mx-auto h-0.5 w-16 bg-linear-to-r from-m-blue-light via-m-blue-dark to-m-red mt-3" />
          </div>

          <div className="mx-auto max-w-4xl grid gap-8 sm:grid-cols-2 justify-center">
            {/* KARTU KETUA HIMPUNAN */}
            <div className="border border-hairline bg-surface-soft p-4 flex flex-col items-center text-center group">
              <div className="relative aspect-[3/4] w-full max-w-[240px] border border-hairline bg-black overflow-hidden shadow-md">
                <img src={kahim?.foto || "/Nabiel.jpg"} alt="Foto Ketua Himpunan" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" loading="lazy" />
              </div>
              <h4 className="mt-4 text-base font-bold uppercase tracking-tight text-on-dark">{kahim?.nama || "Nabiel Syafiq Mujizan A"}</h4>
              <p className="text-[11px] font-medium uppercase tracking-[1px] text-m-blue-dark dark:text-m-blue-light mt-1">Ketua Himpunan</p>
            </div>

            {/* KARTU WAKIL KETUA HIMPUNAN */}
            <div className="border border-hairline bg-surface-soft p-4 flex flex-col items-center text-center group">
              <div className="relative aspect-[3/4] w-full max-w-[240px] border border-hairline bg-black overflow-hidden shadow-md">
                <img src={wakahim?.foto || "/Farrel.jpg"} alt="Foto Wakil Ketua Himpunan" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" loading="lazy" />
              </div>
              <h4 className="mt-4 text-base font-bold uppercase tracking-tight text-on-dark">{wakahim?.nama || "Ananda Farrel Tyass Shidiq"}</h4>
              <p className="text-[11px] font-medium uppercase tracking-[1px] text-m-red mt-1">Wakil Ketua Himpunan</p>
            </div>
          </div>
        </div>

        {/* ================= BARIS 3: BAGAN STRUKTUR ORGANISASI (REVISI STRUKTUR INTERNASIONAL) ================= */}
        <div className="mt-20 lg:mt-28 border-t border-hairline/40 pt-16">
          <div className="text-center mb-14">
            <span className="text-[11px] font-bold uppercase tracking-[2px] text-muted">Struktur Fungsionaris</span>
            <h3 className="mt-2 text-xl font-extrabold uppercase tracking-tight text-on-dark sm:text-2xl">Bagan Organisasi Himpunan</h3>
            <div className="mx-auto h-0.5 w-16 bg-linear-to-r from-m-blue-light via-m-blue-dark to-m-red mt-3" />
          </div>

          {/* CONTAINER UTAMA DIAGRAM */}
          <div className="w-full flex flex-col items-center font-mono">
            {/* TINGKAT 1: CHIEF EXECUTIVE OFFICER */}
            <div className="flex flex-col items-center w-full">
              <div className="bg-surface-soft border-2 border-m-red p-5 text-center shadow-[4px_4px_0px_0px_rgba(226,39,24,0.2)] max-w-sm w-full transition duration-200 hover:scale-[1.02]">
                <div className="text-[10px] font-bold tracking-widest text-m-red uppercase">Chief Executive Officer</div>
                <div className="mt-1.5 text-sm font-extrabold uppercase tracking-wide text-on-dark">Nabiel Syafiq Mujizan Achda</div>
              </div>

              {/* Garis Penghubung Vertikal */}
              <div className="h-8 w-0.5 bg-hairline" />
            </div>

            {/* TINGKAT 2: MANAGING DIRECTOR */}
            <div className="flex flex-col items-center w-full">
              <div className="bg-surface-soft border-2 border-m-blue-dark p-5 text-center shadow-[4px_4px_0px_0px_rgba(28,105,212,0.2)] max-w-sm w-full transition duration-200 hover:scale-[1.02]">
                <div className="text-[10px] font-bold tracking-widest text-m-blue-light uppercase">Managing Director</div>
                <div className="mt-1.5 text-sm font-extrabold uppercase tracking-wide text-on-dark">Ananda Farrel Tyass Shidiq</div>
              </div>

              {/* Garis Penghubung Vertikal Ke Jalur Core Team */}
              <div className="h-8 w-0.5 bg-hairline relative">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[2px] border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-hairline" />
              </div>
            </div>

            {/* TINGKAT 3: CORE MANAGEMENT (SECRETARIES & FINANCES) */}
            <div className="w-full max-w-5xl relative mt-2 flex flex-col items-center">
              {/* Garis Horizontal Penghubung (Hanya Desktop) */}
              <div className="hidden lg:block absolute top-0 left-[12%] right-[12%] h-0.5 bg-hairline" />

              {/* Grid 4 Kolom */}
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full pt-4 lg:pt-8">
                {/* 1. CAO */}
                <div className="flex flex-col items-center relative">
                  <div className="hidden lg:block absolute -top-8 w-0.5 h-8 bg-hairline" />
                  <div className="w-full bg-surface-soft border border-hairline p-4 text-center shadow-[2px_2px_0px_rgba(0,0,0,0.05)]">
                    <div className="text-[9px] font-bold tracking-wide text-muted uppercase">Chief Administrative Officer</div>
                    <div className="mt-1 text-xs font-bold text-on-dark truncate">Siti Athiyyah</div>
                  </div>
                </div>

                {/* 2. Secretary */}
                <div className="flex flex-col items-center relative">
                  <div className="hidden lg:block absolute -top-8 w-0.5 h-8 bg-hairline" />
                  <div className="w-full bg-surface-soft border border-hairline p-4 text-center shadow-[2px_2px_0px_rgba(0,0,0,0.05)]">
                    <div className="text-[9px] font-bold tracking-wide text-muted uppercase">Secretary</div>
                    <div className="mt-1 text-xs font-bold text-on-dark truncate">Della Aulya Kusumawati</div>
                  </div>
                </div>

                {/* 3. CFO */}
                <div className="flex flex-col items-center relative">
                  <div className="hidden lg:block absolute -top-8 w-0.5 h-8 bg-hairline" />
                  <div className="w-full bg-surface-soft border border-hairline p-4 text-center shadow-[2px_2px_0px_rgba(0,0,0,0.05)]">
                    <div className="text-[9px] font-bold tracking-wide text-muted uppercase">Chief Financial Officer</div>
                    <div className="mt-1 text-xs font-bold text-on-dark truncate">Septi Aulia Toharoh</div>
                  </div>
                </div>

                {/* 4. Finance */}
                <div className="flex flex-col items-center relative">
                  <div className="hidden lg:block absolute -top-8 w-0.5 h-8 bg-hairline" />
                  <div className="w-full bg-surface-soft border border-hairline p-4 text-center shadow-[2px_2px_0px_rgba(0,0,0,0.05)]">
                    <div className="text-[9px] font-bold tracking-wide text-muted uppercase">Finance</div>
                    <div className="mt-1 text-xs font-bold text-on-dark truncate">Ariani Nezalia Zhafira</div>
                  </div>
                </div>
              </div>

              {/* JALUR PEMBAGI MENUJU DEPARTEMEN */}
              <div className="h-10 w-0.5 bg-hairline mt-6 lg:mt-4" />
              <div className="bg-surface-soft border border-m-blue-dark px-6 py-1.5 text-[11px] font-bold uppercase tracking-[2px] text-m-blue-light shadow-[3px_3px_0px_rgba(28,105,212,0.15)]">Divisi - Divisi</div>
              <div className="h-10 w-0.5 bg-hairline relative">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[2px] border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-hairline" />
              </div>
            </div>

            {/* TINGKAT 4: JAJARAN 8 MANAGER / DIRECTORS */}
            <div className="w-full max-w-[1440px] relative mt-2">
              {/* Garis Horizontal Panjang Pembagi Divisi (Hanya Desktop) */}
              <div className="hidden lg:block absolute top-0 left-[6%] right-[6%] h-0.5 bg-hairline" />

              {/* Grid Responsif: Pas 4 kolom di desktop, membagi rata 8 komponen */}
              <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full pt-4 lg:pt-8">
                {/* 1. HRD */}
                <div className="flex flex-col items-center relative">
                  <div className="hidden lg:block absolute -top-8 w-0.5 h-8 bg-hairline" />
                  <div className="w-full h-full bg-surface-soft border border-m-blue-light p-4 text-center shadow-[3px_3px_0px_rgba(28,105,212,0.12)] min-h-[96px] flex flex-col justify-center">
                    <div className="text-[9px] font-bold uppercase text-m-blue-light tracking-wide">Manager of Human Resources Development</div>
                    <div className="mt-1.5 text-xs font-bold text-on-dark leading-tight">Nailal Husna Khairul Bariyyah</div>
                  </div>
                </div>

                {/* 2. Internal Relations */}
                <div className="flex flex-col items-center relative">
                  <div className="hidden lg:block absolute -top-8 w-0.5 h-8 bg-hairline" />
                  <div className="w-full h-full bg-surface-soft border border-m-blue-light p-4 text-center shadow-[3px_3px_0px_rgba(28,105,212,0.12)] min-h-[96px] flex flex-col justify-center">
                    <div className="text-[9px] font-bold uppercase text-m-blue-light tracking-wide">Manager of Internal Relations</div>
                    <div className="mt-1.5 text-xs font-bold text-on-dark leading-tight">Raynaldi Raton Racitra</div>
                  </div>
                </div>

                {/* 3. External Relations */}
                <div className="flex flex-col items-center relative">
                  <div className="hidden lg:block absolute -top-8 w-0.5 h-8 bg-hairline" />
                  <div className="w-full h-full bg-surface-soft border border-m-blue-dark p-4 text-center shadow-[3px_3px_0px_rgba(20,74,150,0.12)] min-h-[96px] flex flex-col justify-center">
                    <div className="text-[9px] font-bold uppercase text-m-blue-dark tracking-wide">Manager of External Relations</div>
                    <div className="mt-1.5 text-xs font-bold text-on-dark leading-tight">Vania Yolanda Br Sembiring</div>
                  </div>
                </div>

                {/* 4. Democratic Advocacy */}
                <div className="flex flex-col items-center relative">
                  <div className="hidden lg:block absolute -top-8 w-0.5 h-8 bg-hairline" />
                  <div className="w-full h-full bg-surface-soft border border-m-blue-dark p-4 text-center shadow-[3px_3px_0px_rgba(20,74,150,0.12)] min-h-[96px] flex flex-col justify-center">
                    <div className="text-[9px] font-bold uppercase text-m-blue-dark tracking-wide">Manager of Democratic Advocacy</div>
                    <div className="mt-1.5 text-xs font-bold text-on-dark leading-tight">Muhammad Irsyad Al Fikri</div>
                  </div>
                </div>

                {/* 5. Research and Education */}
                <div className="flex flex-col items-center relative lg:mt-4">
                  <div className="hidden lg:block absolute -top-12 w-0.5 h-12 bg-hairline" />
                  <div className="w-full h-full bg-surface-soft border border-m-red p-4 text-center shadow-[3px_3px_0px_rgba(226,39,24,0.12)] min-h-[96px] flex flex-col justify-center">
                    <div className="text-[9px] font-bold uppercase text-m-red tracking-wide">Manager of Research and Education</div>
                    <div className="mt-1.5 text-xs font-bold text-on-dark leading-tight">Bayu Satrio Wibowo</div>
                  </div>
                </div>

                {/* 6. Business and Entrepreneur */}
                <div className="flex flex-col items-center relative lg:mt-4">
                  <div className="hidden lg:block absolute -top-12 w-0.5 h-12 bg-hairline" />
                  <div className="w-full h-full bg-surface-soft border border-m-red p-4 text-center shadow-[3px_3px_0px_rgba(226,39,24,0.12)] min-h-[96px] flex flex-col justify-center">
                    <div className="text-[9px] font-bold uppercase text-m-red tracking-wide">Manager of Business and Entrepreneur</div>
                    <div className="mt-1.5 text-xs font-bold text-on-dark leading-tight">Inayah Syahril Maulidiyah</div>
                  </div>
                </div>

                {/* 7. Director of Creative Media */}
                <div className="flex flex-col items-center relative lg:mt-4">
                  <div className="hidden lg:block absolute -top-12 w-0.5 h-12 bg-hairline" />
                  <div className="w-full h-full bg-surface-soft border-2 border-dashed border-m-red/40 p-4 text-center shadow-[3px_3px_0px_rgba(226,39,24,0.06)] min-h-[96px] flex flex-col justify-center">
                    <div className="text-[9px] font-bold uppercase text-m-red tracking-wide">Director of Creative Media</div>
                    <div className="mt-1.5 text-xs font-bold text-on-dark leading-tight">Rafly Putra Pratama</div>
                  </div>
                </div>

                {/* 8. Co-Director of Creative Media */}
                <div className="flex flex-col items-center relative lg:mt-4">
                  <div className="hidden lg:block absolute -top-12 w-0.5 h-12 bg-hairline" />
                  <div className="w-full h-full bg-surface-soft border-2 border-dashed border-hairline p-4 text-center shadow-[3px_3px_0px_rgba(0,0,0,0.04)] min-h-[96px] flex flex-col justify-center">
                    <div className="text-[9px] font-bold uppercase text-muted tracking-wide">Co-Director of Creative Media</div>
                    <div className="mt-1.5 text-xs font-bold text-on-dark leading-tight">Rivky Evandeto Teguh Afandy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
