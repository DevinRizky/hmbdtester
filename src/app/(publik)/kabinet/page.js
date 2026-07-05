"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollAnimate from "@/components/ui/ScrollAnimate";

// 1. DATA MASTER ANGGOTA KABINET ARADHANA
const DATA_KABINET = [
  { id: 1, name: "Nabiel Syafiq Mu'jizan Achda", role: "Chief Excecutive Officer", category: "Inti Kabinet", image: "/50.jpg" },
  { id: 2, name: "Ananda Farrel Tyass Shidiq", role: "Managing Director", category: "Inti Kabinet", image: "/49.jpg" },
  { id: 3, name: "Siti Athiyyah", role: "Chief Administrative Officer", category: "Inti Kabinet", image: "/45.jpg" },
  { id: 4, name: "Della Aulya Kusumawati", role: "Secretary", category: "Inti Kabinet", image: "/46.jpg" },
  { id: 5, name: "Septi Aulia Toharoh", role: "Chief Financial Officer", category: "Inti Kabinet", image: "/47.jpg" },
  { id: 6, name: "Ariani Nezalia Zhafira", role: "Finance", category: "Inti Kabinet", image: "/48.jpg" },

  // Anggota Divisi Human Resources Development
  { id: 7, name: "Nailal Husna Khairul Bariyyah", role: "Manager of Human Resources Development", category: "Human Resources Development", image: "/14.jpg" },
  { id: 8, name: "Aditya Putra Trihantoro", role: "Staff Human Resources Development", category: "Human Resources Development", image: "/18.jpg" },
  { id: 9, name: "Daffa Aqilla Hanip", role: "Staff Human Resources Development", category: "Human Resources Development", image: "/15.jpg" },
  { id: 10, name: "M. Fahri Sofan", role: "Staff Human Resources Development", category: "Human Resources Development", image: "/16.jpg" },
  { id: 11, name: "Nailla Rahmah Widodo", role: "Staff Human Resources Development", category: "Human Resources Development", image: "/17.jpg" },

  // Anggota Divisi Internal Relations
  { id: 12, name: "Raynaldi Raton Racitra", role: "Manager of Internal Relations", category: "Internal Relations", image: "/33.jpg" },
  { id: 13, name: "Adelia Devina Putri", role: "Internal Relations Staf", category: "Internal Relations", image: "/Adel.png" },
  { id: 14, name: "Agil Nisa Permata", role: "Internal Relations Staf", category: "Internal Relations", image: "/37.jpg" },
  { id: 15, name: "Syahdan Dwi Zakaria", role: "Internal Relations Staf", category: "Internal Relations", image: "/36.jpg" },
  { id: 16, name: "Kizzyta Yosanda Sihite", role: "Internal Relations Staf", category: "Internal Relations", image: "/34.jpg" },
  { id: 17, name: "Yaslam Khoirun Najmudin", role: "Internal Relations Staf", category: "Internal Relations", image: "/38.jpg" },

  // Anggota Divisi External Relations
  { id: 18, name: "Vania Yolanda Br Sembiring", role: "Manager of External Relations", category: "External Relations", image: "/27.jpg" },
  { id: 19, name: "Amelia Carolien", role: "External Relations Staf", category: "External Relations", image: "/32.jpg" },
  { id: 20, name: "Delvin Ardani Nareswara", role: "External Relations Staf", category: "External Relations", image: "/28.jpg" },
  { id: 21, name: "Hanafi", role: "External Relations Staf", category: "External Relations", image: "/30.jpg" },
  { id: 22, name: "Ibnu Bahy Mufadhol", role: "External Relations Staf", category: "External Relations", image: "/29.jpg" },
  { id: 23, name: "Regard Rysakti", role: "External Relations Staf", category: "External Relations", image: "/31.jpg" },

  // Anggota Divisi Democratic Advocacy
  { id: 24, name: "Muhammad Irsyad Al Fikri", role: "Manager of Democratic Advocacy", category: "Democratic Advocacy", image: "/39.jpg" },
  { id: 25, name: "Agung Wichaksono Tamin", role: "Democratic Advocacy Staf", category: "Democratic Advocacy", image: "/41.jpg" },
  { id: 26, name: "Radista Al Amadis Zarrariva", role: "Democratic Advocacy Staf", category: "Democratic Advocacy", image: "/44.jpg" },
  { id: 27, name: "Shalsabilla Pramudita", role: "Democratic Advocacy Staf", category: "Democratic Advocacy", image: "/42.jpg" },
  { id: 28, name: "Tude Yolan Emanuella Tugiyanto", role: "Democratic Advocacy Staf", category: "Democratic Advocacy", image: "/40.jpg" },
  { id: 29, name: "Tiara Nova Kharisma", role: "Democratic Advocacy Staf", category: "Democratic Advocacy", image: "/43.jpg" },

  // Anggota Divisi Research and Education
  { id: 30, name: "Bayu Satrio Wibowo", role: "Manager of Research and Education", category: "Research and Education", image: "/19.jpg" },
  { id: 31, name: "Andhika Luthfi Mabruri", role: "Research and Education Staf", category: "Research and Education", image: "/21.jpg" },
  { id: 32, name: "Fatimah Dewi Wulansari", role: "Research and Education Staf", category: "Research and Education", image: "/23.jpg" },
  { id: 33, name: "Marfiany Pradnya Paramitha", role: "Research and Education Staf", category: "Research and Education", image: "/Marfiany.png" },
  { id: 34, name: "Naila Alifa", role: "Research and Education Staf", category: "Research and Education", image: "/22.jpg" },
  { id: 35, name: "Rasya Belva Putri Ramadhani", role: "Research and Education Staf", category: "Research and Education", image: "/25.jpg" },
  { id: 36, name: "Sandrina Alya Farosa", role: "Research and Education Staf", category: "Research and Education", image: "/26.jpg" },
  { id: 37, name: "Zasckia Nayla Sahara", role: "Research and Education Staf", category: "Research and Education", image: "/20.jpg" },

  // Anggota Divisi Business and Enterpreneur
  { id: 38, name: "Inayah Syahril Maulidiyah", role: "Manager of Business and Enterpreneur", category: "Business and Enterpreneur", image: "/9.jpg" },
  { id: 39, name: "Jeremy Dave Pratama Sembiring", role: "Business and Enterpreneur Staf", category: "Business and Enterpreneur", image: "/11.jpg" },
  { id: 40, name: "Nopal Rusdiana", role: "Business and Enterpreneur Staf", category: "Business and Enterpreneur", image: "/12.jpg" },
  { id: 41, name: "Silvia Arifa Cahyani", role: "Business and Enterpreneur Staf", category: "Business and Enterpreneur", image: "/10.jpg" },
  { id: 42, name: "Widya Dwi Rahmania", role: "Business and Enterpreneur Staf", category: "Business and Enterpreneur", image: "/13.jpg" },

  // Anggota Divisi Creative Media
  { id: 43, name: "Rafly Putra Pratama", role: "Manager of Creative Media", category: "Creative Media", image: "/1.jpg" },
  { id: 44, name: "Rivky Evandeto Teguh Afandy", role: "Co-Director of Creative Media", category: "Creative Media", image: "/2.jpg" },
  { id: 45, name: "Azevedo Ardhani", role: "Creative Media Staf", category: "Creative Media", image: "/7.jpg" },
  { id: 46, name: "Baidzaki Adham Hibatullah", role: "Creative Media Staf", category: "Creative Media", image: "/8.jpg" },
  { id: 47, name: "Melvin Safaraz Ghaisan Syah", role: "Creative Media Staf", category: "Creative Media", image: "/6.jpg" },
  { id: 48, name: "Muhammad Faris Ardiyanto", role: "Creative Media Staf", category: "Creative Media", image: "/5.jpg" },
  { id: 49, name: "Muhamad Bagus Dwi Prabowo", role: "Creative Media Staf", category: "Creative Media", image: "/4.jpg" },
  { id: 50, name: "Nabilah Zahra Yasmin Salsabila", role: "Creative Media Staf", category: "Creative Media", image: "/Nabilah.jpg" },
  { id: 51, name: "Wildan Nurcahyandi Nugraha", role: "Creative Media Staf", category: "Creative Media", image: "/Wildan.jpg" },

  // 🎯 DATA DIRIMU: Diposisikan di bawah Creative Media dengan role spesifik & tag penanda Intern
  {
    id: 52,
    name: "Devin Rizky Danendra",
    role: "Intern Staff — Web Developer",
    category: "Creative Media",
    image: "/idcarddevin.jpg", // Sesuaikan path foto aslimu di sini
    isIntern: true,
  },
];

const LIST_DIVISI = [
  "Semua",
  "Inti Kabinet",
  "Human Resources Development",
  "Internal Relations",
  "External Relations",
  "Democratic Advocacy",
  "Research and Education",
  "Business and Enterpreneur",
  "Creative Media",
  "Intern", // Menetap di bawah Creative Media sesuai instruksi awal
];

function CardAnggota({ anggota, index }) {
  return (
    <ScrollAnimate variant="fadeInUp" delay={index * 0.04} speed={0.4}>
      <div className="group relative flex flex-col border border-hairline bg-surface-soft p-4 transition-all duration-300 hover:shadow-lg hover:border-m-blue-dark/30 rounded-tr-[24px] rounded-bl-[24px] rounded-tl-sm rounded-br-sm">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-black border border-hairline/40 rounded-tr-[16px] rounded-bl-[16px] rounded-tl-sm rounded-br-sm">
          <img src={anggota.image} alt={anggota.name} className="h-full w-full object-cover opacity-90 transition-transform duration-500 ease-out group-hover:scale-105" />
          {/* Badge Penanda Intern yang Menghias Pojok Atas Kartu */}
          {anggota.isIntern && (
            <div className="absolute right-3 top-3 z-10">
              <span className="bg-m-red border border-m-red/50 text-white px-2 py-0.5 text-[8px] font-black tracking-widest uppercase">Intern</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col flex-1 justify-end">
          <span className="text-[10px] font-bold uppercase tracking-wider text-m-blue-dark">{anggota.role}</span>
          <h3 className="mt-1 text-sm sm:text-base font-bold text-on-dark uppercase tracking-tight leading-tight truncate">{anggota.name}</h3>
        </div>
      </div>
    </ScrollAnimate>
  );
}

export default function KabinetPage() {
  const [divisiAktif, setDivisiAktif] = useState("Semua");

  // 🎯 LOGIKA FILTER REKAYASA: Jika memilih "Intern", cari seluruh data berproperti isIntern
  const anggotaTersaring = divisiAktif === "Semua" ? DATA_KABINET : divisiAktif === "Intern" ? DATA_KABINET.filter((anggota) => anggota.isIntern) : DATA_KABINET.filter((anggota) => anggota.category === divisiAktif);

  return (
    <main className="bg-canvas min-h-screen py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <ScrollAnimate variant="fadeInUp" speed={0.45}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-hairline pb-8 mb-12 gap-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[2px] text-m-red">Fungsionaris Himpunan</span>
              <h1 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-on-dark sm:text-4xl">Pengurus Kabinet</h1>
              <div className="h-0.5 w-16 bg-gradient-to-r from-m-blue-dark to-m-red mt-3" />
            </div>

            {/* COMPONENT DROPDOWN FILTER */}
            <div className="flex flex-col gap-1.5 w-full md:w-72">
              <label htmlFor="filter-divisi" className="text-[10px] font-bold uppercase tracking-wider text-muted">
                Pilih Divisi / Departemen
              </label>
              <div className="relative w-full">
                <select
                  id="filter-divisi"
                  value={divisiAktif}
                  onChange={(e) => setDivisiAktif(e.target.value)}
                  className="w-full appearance-none rounded-none border border-hairline bg-surface-soft px-4 py-3 pr-10 text-xs font-bold uppercase tracking-wider text-on-dark transition duration-200 outline-none cursor-pointer focus-visible:border-m-blue-dark focus-visible:ring-1 focus-visible:ring-m-blue-dark"
                >
                  {LIST_DIVISI.map((divisi) => (
                    <option key={divisi} value={divisi} className="bg-surface-soft text-on-dark font-sans normal-case text-sm">
                      {divisi === "Semua" ? "✨ Tampilkan Semua Divisi" : divisi === "Intern" ? "💼 Program Magang (Intern)" : divisi}
                    </option>
                  ))}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted border-l border-hairline/30">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimate>

        {/* GRID FOTO ANGGOTA KABINET DENGAN EFEK STAGGERED */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {anggotaTersaring.map((anggota, index) => (
            <CardAnggota key={anggota.id} anggota={anggota} index={index} />
          ))}
        </div>

        {/* Notifikasi jika data kosong */}
        {anggotaTersaring.length === 0 && (
          <ScrollAnimate variant="fadeInUp">
            <div className="border border-hairline bg-surface-soft p-12 text-center rounded-tr-[24px] rounded-bl-[24px]">
              <p className="text-xs font-light text-muted">
                Belum ada data fungsionaris aktif untuk kategori <strong className="font-medium text-on-dark uppercase">&quot;{divisiAktif}&quot;</strong> saat ini.
              </p>
            </div>
          </ScrollAnimate>
        )}
      </div>
    </main>
  );
}
