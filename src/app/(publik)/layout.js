// src/app/(publik)/layout.js
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Hapus baris ini kalau kamu belum buat komponen Footer

export default function PublikLayout({ children }) {
  return (
    <>
      {/* 1. Navbar dipasang di sini sekali untuk semua halaman publik */}
      <Navbar />

      {/* 2. Tempat page.js Beranda, Berita, & Insight muncul */}
      {children}

      {/* 3. Footer global publik */}
      <Footer />
    </>
  );
}
