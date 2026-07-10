"use client";

import { motion } from "framer-motion";
import ScrollAnimate from "@/components/ui/ScrollAnimate";

export default function VisionMissionOrgSection({ visi, misi, kahim, wakahim }) {
  const defaultMisi = [
    "Mengadakan Program untuk Mendongkrak Pengembangan Soft Skill, Hard Skill dan Teamwork Mahasiswa agar siap & mampu untuk bersaing di era digital.",
    "Mengadakan Lomba, Seminar dan workshop yang memacu kreativitas, keterampilan, dan memperluas wawasan serta pengalaman untuk Mahasiswa.",
    "Memperkuat Kolaborasi dan Hubungan dengan Organisasi lain, Komunitas, serta lingkungan Himpunan untuk memperluas peluang karir, kolaborasi, dan Keuntungan Bisnis.",
    "Menciptakan lingkungan kolaboratif dan suportif untuk seluruh anggota dengan kegiatan yang membangun empati, teamwork, serta saling percaya untuk mencapai solidaritas.",
  ];

  return (
    <section id="visi-misi" className="bg-transparent py-16 lg:py-24 border-t border-hairline/60">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* ================= BARIS 1: VISI & MISI ================= */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* KOTAK VISI */}
          <ScrollAnimate variant="fadeInLeft">
            <div className="h-full border border-hairline bg-surface-soft p-6 sm:p-8 transition-all duration-300 hover:border-m-blue-light/40 hover:shadow-xl rounded-tr-[40px] rounded-bl-[40px] rounded-tl-md rounded-br-md">
              <span className="text-[11px] font-bold uppercase tracking-[2px] text-m-blue-dark dark:text-m-blue-light">Arah Juang</span>
              <h2 className="mt-2 text-xl font-extrabold uppercase tracking-tight text-on-dark sm:text-2xl">Visi HMBD</h2>
              <div className="h-0.5 w-12 bg-m-blue-dark mt-3" />
              <p className="mt-5 text-sm sm:text-base font-light text-body text-justify leading-relaxed">
                {visi ||
                  "Menjadikan Himpunan Mahasiswa Bisnis Digital sebagai wadah berekspresi, kreatif, serta profesional, dengan mendukung seluruh jenis potensi, baik akademik dan non akademik untuk mahasiswa Program Studi S1 Bisnis Digital. Dengan Koordinasi, Kolaborasi, dan Profesionalisme. Kami berkomitmen untuk menciptakan mahasiswa yang unggul, kreatif, cerdas, profesional dan kompeten untuk menghadapi tantangan di era Digital."}
              </p>
            </div>
          </ScrollAnimate>

          {/* KOTAK MISI */}
          <ScrollAnimate variant="fadeInRight">
            <div className="h-full border border-hairline bg-surface-soft p-6 sm:p-8 transition-all duration-300 hover:border-m-red/30 hover:shadow-xl rounded-tl-[40px] rounded-br-[40px] rounded-tr-md rounded-bl-md">
              <span className="text-[11px] font-bold uppercase tracking-[2px] text-m-red">Langkah Nyata</span>
              <h2 className="mt-2 text-xl font-extrabold uppercase tracking-tight text-on-dark sm:text-2xl">Misi HMBD</h2>
              <div className="h-0.5 w-12 bg-m-red mt-3" />
              <ul className="mt-5 space-y-3 text-sm sm:text-base font-light text-body text-justify list-none">
                {(misi && misi.length > 0 ? misi : defaultMisi).map((item, index) => (
                  <motion.li key={index} whileHover={{ x: 4 }} transition={{ type: "tween", duration: 0.2 }} className="flex items-start gap-1">
                    <strong className="text-on-dark font-medium min-w-[1.5em]">{index + 1}.</strong>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </ScrollAnimate>
        </div>

        {/* ================= BARIS 2: PROFIL KAHIM & WAKAHIM ================= */}
        <div className="mt-16 lg:mt-24">
          <ScrollAnimate variant="fadeInUp">
            <div className="text-center mb-10">
              <span className="text-[11px] font-bold uppercase tracking-[2px] text-muted">Struktur Pimpinan</span>
              <h3 className="mt-2 text-xl font-extrabold uppercase tracking-tight text-on-dark sm:text-2xl">Ketua & Wakil Ketua Himpunan</h3>
              <div className="mx-auto h-0.5 w-16 bg-linear-to-r from-m-blue-light via-m-blue-dark to-m-red mt-3" />
            </div>
          </ScrollAnimate>

          <div className="mx-auto max-w-4xl grid gap-8 sm:grid-cols-2 justify-center">
            {/* KARTU KETUA HIMPUNAN */}
            <ScrollAnimate variant="fadeInUp" delay={0.15}>
              <div className="border border-hairline bg-surface-soft p-4 flex flex-col items-center text-center group rounded-tr-md rounded-bl-md rounded-tl-md rounded-br-md transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_15px_30px_rgba(28,105,212,0.1)] hover:border-m-blue-light/30">
                <div className="relative aspect-[3/4] w-full max-w-[240px] border border-hairline bg-black overflow-hidden shadow-md rounded-tr-md rounded-bl-md">
                  <img src={kahim?.foto || "/assets/Nabiel.webp"} alt="Foto Ketua Himpunan" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]" loading="lazy" />
                </div>
                <h4 className="mt-4 text-base font-bold uppercase tracking-tight text-on-dark">{kahim?.nama || "Nabiel Syafiq Mujizan A"}</h4>
                <p className="text-[11px] font-medium uppercase tracking-[1px] text-m-blue-dark dark:text-m-blue-light mt-1">Ketua Himpunan</p>
              </div>
            </ScrollAnimate>

            {/* KARTU WAKIL KETUA HIMPUNAN */}
            <ScrollAnimate variant="fadeInUp" delay={0.3}>
              <div className="border border-hairline bg-surface-soft p-4 flex flex-col items-center text-center group rounded-tl-md rounded-br-md rounded-tr-md rounded-bl-md transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_15px_30px_rgba(226,39,24,0.1)] hover:border-m-red/30">
                <div className="relative aspect-[3/4] w-full max-w-[240px] border border-hairline bg-black overflow-hidden shadow-md rounded-tl-md rounded-br-md">
                  <img src={wakahim?.foto || "/assets/Farrel.webp"} alt="Foto Wakil Ketua Himpunan" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]" loading="lazy" />
                </div>
                <h4 className="mt-4 text-base font-bold uppercase tracking-tight text-on-dark">{wakahim?.nama || "Ananda Farrel Tyass Shidiq"}</h4>
                <p className="text-[11px] font-medium uppercase tracking-[1px] text-m-red mt-1">Wakil Ketua Himpunan</p>
              </div>
            </ScrollAnimate>
          </div>
        </div>

        {/* ================= BARIS 3: BAGAN STRUKTUR ORGANISASI ================= */}
        <div className="mt-20 lg:mt-28 border-t border-hairline/40 pt-16">
          <ScrollAnimate variant="fadeInUp">
            <div className="text-center mb-14">
              <span className="text-[11px] font-bold uppercase tracking-[2px] text-muted">Struktur Fungsionaris</span>
              <h3 className="mt-2 text-xl font-extrabold uppercase tracking-tight text-on-dark sm:text-2xl">Bagan Organisasi Himpunan</h3>
              <div className="mx-auto h-0.5 w-16 bg-linear-to-r from-m-blue-light via-m-blue-dark to-m-red mt-3" />
            </div>
          </ScrollAnimate>

          <div className="w-full flex flex-col items-center font-mono">
            {/* TINGKAT 1: CEO */}
            <ScrollAnimate variant="scaleUp" delay={0.1}>
              <div className="flex flex-col items-center w-full">
                <div className="bg-surface-soft border-2 border-m-blue-dark p-5 text-center shadow-[4px_4px_0px_0px_rgba(226,39,24,0.2)] max-w-sm w-full transition duration-300 hover:scale-[1.02] hover:shadow-[4px_4px_12px_rgba(28,105,212,0.2)]">
                  <div className="text-[10px] font-bold tracking-widest text-m-blue-light uppercase">Chief Executive Officer</div>
                  <div className="mt-1.5 text-sm font-extrabold uppercase tracking-wide text-on-dark">Nabiel Syafiq Mujizan Achda</div>
                </div>
                <div className="h-8 w-0.5 bg-hairline" />
              </div>
            </ScrollAnimate>

            {/* TINGKAT 2: MANAGING DIRECTOR */}
            <ScrollAnimate variant="scaleUp" delay={0.2}>
              <div className="flex flex-col items-center w-full">
                <div className="bg-surface-soft border-2 border-m-red p-5 text-center shadow-[4px_4px_0px_0px_rgba(28,105,212,0.2)] max-w-sm w-full transition duration-300 hover:scale-[1.02] hover:shadow-[4px_4px_12px_rgba(226,39,24,0.2)]">
                  <div className="text-[10px] font-bold tracking-widest text-m-red uppercase">Managing Director</div>
                  <div className="mt-1.5 text-sm font-extrabold uppercase tracking-wide text-on-dark">Ananda Farrel Tyass Shidiq</div>
                </div>
                <div className="h-8 w-0.5 bg-hairline relative">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[2px] border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-hairline" />
                </div>
              </div>
            </ScrollAnimate>

            {/* TINGKAT 3: CORE MANAGEMENT */}
            <ScrollAnimate variant="fadeInUp" delay={0.3}>
              <div className="w-full max-w-5xl relative mt-2 flex flex-col items-center">
                <div className="hidden lg:block absolute top-0 left-[12%] right-[12%] h-0.5 bg-hairline" />

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full pt-4 lg:pt-8">
                  {/* 1. CAO */}
                  <div className="flex flex-col items-center relative group">
                    <div className="hidden lg:block absolute -top-8 w-0.5 h-8 bg-hairline" />
                    <div className="w-full bg-surface-soft border border-hairline p-4 text-center shadow-[2px_2px_0px_rgba(0,0,0,0.05)] transition-transform duration-200 group-hover:-translate-y-1">
                      <div className="text-[9px] font-bold tracking-wide text-muted uppercase">Chief Administrative Officer</div>
                      <div className="mt-1 text-xs font-bold text-on-dark truncate">Siti Athiyyah</div>
                    </div>
                  </div>

                  {/* 2. Secretary */}
                  <div className="flex flex-col items-center relative group">
                    <div className="hidden lg:block absolute -top-8 w-0.5 h-8 bg-hairline" />
                    <div className="w-full bg-surface-soft border border-hairline p-4 text-center shadow-[2px_2px_0px_rgba(0,0,0,0.05)] transition-transform duration-200 group-hover:-translate-y-1">
                      <div className="text-[9px] font-bold tracking-wide text-muted uppercase">Secretary</div>
                      <div className="mt-1 text-xs font-bold text-on-dark truncate">Della Aulya Kusumawati</div>
                    </div>
                  </div>

                  {/* 3. CFO */}
                  <div className="flex flex-col items-center relative group">
                    <div className="hidden lg:block absolute -top-8 w-0.5 h-8 bg-hairline" />
                    <div className="w-full bg-surface-soft border border-hairline p-4 text-center shadow-[2px_2px_0px_rgba(0,0,0,0.05)] transition-transform duration-200 group-hover:-translate-y-1">
                      <div className="text-[9px] font-bold tracking-wide text-muted uppercase">Chief Financial Officer</div>
                      <div className="mt-1 text-xs font-bold text-on-dark truncate">Septi Aulia Toharoh</div>
                    </div>
                  </div>

                  {/* 4. Finance */}
                  <div className="flex flex-col items-center relative group">
                    <div className="hidden lg:block absolute -top-8 w-0.5 h-8 bg-hairline" />
                    <div className="w-full bg-surface-soft border border-hairline p-4 text-center shadow-[2px_2px_0px_rgba(0,0,0,0.05)] transition-transform duration-200 group-hover:-translate-y-1">
                      <div className="text-[9px] font-bold tracking-wide text-muted uppercase">Finance</div>
                      <div className="mt-1 text-xs font-bold text-on-dark truncate">Ariani Nezalia Zhafira</div>
                    </div>
                  </div>
                </div>

                <div className="h-10 w-0.5 bg-hairline mt-6 lg:mt-4" />
                <div className="bg-surface-soft border border-m-blue-dark px-6 py-1.5 text-[11px] font-bold uppercase tracking-[2px] text-m-blue-light shadow-[3px_3px_0px_rgba(28,105,212,0.15)]">Divisi - Divisi</div>
                <div className="h-10 w-0.5 bg-hairline relative">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[2px] border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-hairline" />
                </div>
              </div>
            </ScrollAnimate>

            {/* TINGKAT 4: 8 DIVISI MANAGERS */}
            <ScrollAnimate variant="fadeInUp" delay={0.45}>
              <div className="w-full max-w-[1440px] relative mt-2">
                <div className="hidden lg:block absolute top-0 left-[6%] w-[75.25%] h-0.5 bg-hairline" />

                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 w-full pt-4 lg:pt-8">
                  {/* 1. HRD */}
                  <div className="flex flex-col items-center relative group">
                    <div className="hidden lg:block absolute -top-8 w-0.5 h-8 bg-hairline" />
                    <div className="w-full h-full bg-surface-soft border border-m-blue-light p-3 text-center shadow-[2px_2px_0px_rgba(28,105,212,0.1)] min-h-[110px] flex flex-col justify-center transition-all duration-200 group-hover:-translate-y-1 group-hover:bg-m-blue-light/[0.03]">
                      <div className="text-[8px] font-bold uppercase text-m-blue-light tracking-wide leading-tight">HRD</div>
                      <div className="mt-1 text-[11px] font-bold text-on-dark leading-tight break-words">Nailal Husna K. B.</div>
                    </div>
                  </div>

                  {/* 2. Internal Relations */}
                  <div className="flex flex-col items-center relative group">
                    <div className="hidden lg:block absolute -top-8 w-0.5 h-8 bg-hairline" />
                    <div className="w-full h-full bg-surface-soft border border-m-blue-light p-3 text-center shadow-[2px_2px_0px_rgba(28,105,212,0.1)] min-h-[110px] flex flex-col justify-center transition-all duration-200 group-hover:-translate-y-1 group-hover:bg-m-blue-light/[0.03]">
                      <div className="text-[8px] font-bold uppercase text-m-blue-light tracking-wide leading-tight">Internal</div>
                      <div className="mt-1 text-[11px] font-bold text-on-dark leading-tight break-words">Raynaldi Raton R.</div>
                    </div>
                  </div>

                  {/* 3. External Relations */}
                  <div className="flex flex-col items-center relative group">
                    <div className="hidden lg:block absolute -top-8 w-0.5 h-8 bg-hairline" />
                    <div className="w-full h-full bg-surface-soft border border-m-blue-dark p-3 text-center shadow-[2px_2px_0px_rgba(20,74,150,0.1)] min-h-[110px] flex flex-col justify-center transition-all duration-200 group-hover:-translate-y-1 group-hover:bg-m-blue-dark/[0.03]">
                      <div className="text-[8px] font-bold uppercase text-m-blue-dark tracking-wide leading-tight">External</div>
                      <div className="mt-1 text-[11px] font-bold text-on-dark leading-tight break-words">Vania Yolanda S.</div>
                    </div>
                  </div>

                  {/* 4. Democratic Advocacy */}
                  <div className="flex flex-col items-center relative group">
                    <div className="hidden lg:block absolute -top-8 w-0.5 h-8 bg-hairline" />
                    <div className="w-full h-full bg-surface-soft border border-m-blue-dark p-3 text-center shadow-[2px_2px_0px_rgba(20,74,150,0.1)] min-h-[110px] flex flex-col justify-center transition-all duration-200 group-hover:-translate-y-1 group-hover:bg-m-blue-dark/[0.03]">
                      <div className="text-[8px] font-bold uppercase text-m-blue-dark tracking-wide leading-tight">Advocacy</div>
                      <div className="mt-1 text-[11px] font-bold text-on-dark leading-tight break-words">M. Irsyad Al Fikri</div>
                    </div>
                  </div>

                  {/* 5. Research and Education */}
                  <div className="flex flex-col items-center relative group">
                    <div className="hidden lg:block absolute -top-8 w-0.5 h-8 bg-hairline" />
                    <div className="w-full h-full bg-surface-soft border border-m-blue-dark p-3 text-center shadow-[2px_2px_0px_rgba(226,39,24,0.1)] min-h-[110px] flex flex-col justify-center transition-all duration-200 group-hover:-translate-y-1 group-hover:bg-m-blue-dark/[0.03]">
                      <div className="text-[8px] font-bold uppercase text-m-blue-dark tracking-wide leading-tight">RnE</div>
                      <div className="mt-1 text-[11px] font-bold text-on-dark leading-tight break-words">Bayu Satrio W.</div>
                    </div>
                  </div>

                  {/* 6. Business and Entrepreneur */}
                  <div className="flex flex-col items-center relative group">
                    <div className="hidden lg:block absolute -top-8 w-0.5 h-8 bg-hairline" />
                    <div className="w-full h-full bg-surface-soft border border-m-blue-dark p-3 text-center shadow-[2px_2px_0px_rgba(226,39,24,0.1)] min-h-[110px] flex flex-col justify-center transition-all duration-200 group-hover:-translate-y-1 group-hover:bg-m-blue-dark/[0.03]">
                      <div className="text-[8px] font-bold uppercase text-m-blue-dark tracking-wide leading-tight">Entrepreneur</div>
                      <div className="mt-1 text-[11px] font-bold text-on-dark leading-tight break-words">Inayah Syahril M.</div>
                    </div>
                  </div>

                  {/* 7. Director of Creative Media */}
                  <div className="flex flex-col items-center relative group">
                    <div className="hidden lg:block absolute -top-8 w-0.5 h-8 bg-hairline" />
                    <div className="w-full h-full bg-surface-soft border border-m-blue-dark p-3 text-center shadow-[2px_2px_0px_rgba(28,105,212,0.1)] min-h-[110px] flex flex-col justify-center relative transition-all duration-200 group-hover:-translate-y-1 group-hover:bg-m-blue-dark/[0.03]">
                      <div className="text-[8px] font-bold uppercase text-m-blue-dark tracking-wide leading-tight">Dir. CM</div>
                      <div className="mt-1 text-[11px] font-bold text-on-dark leading-tight break-words">Rafly Putra P.</div>
                      <div className="hidden lg:block absolute top-1/2 right-[-14px] w-[14px] h-0.5 bg-hairline -translate-y-1/2 z-0" />
                    </div>
                  </div>

                  {/* 8. Co-Director of Creative Media */}
                  <div className="flex flex-col items-center relative group">
                    <div className="w-full h-full bg-surface-soft border-2 border-dashed border-m-blue-dark p-3 text-center shadow-[2px_2px_0px_rgba(28,105,212,0.05)] min-h-[110px] flex flex-col justify-center relative transition-all duration-200 group-hover:-translate-y-1 group-hover:bg-m-blue-dark/[0.01]">
                      <div className="hidden lg:block absolute top-1/2 left-[-14px] w-[14px] h-0.5 bg-hairline -translate-y-1/2 z-0" />
                      <div className="text-[8px] font-bold uppercase text-m-blue-dark tracking-wide leading-tight">Co-Dir. CM</div>
                      <div className="mt-1 text-[11px] font-bold text-on-dark leading-tight break-words">Rivky Evandeto T.</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </div>
    </section>
  );
}
