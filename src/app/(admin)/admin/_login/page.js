"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorStatus, setErrorStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorStatus("");

    setTimeout(() => {
      if (username === "adminhmbd" && password === "Aradhana2026") {
        alert("Login Berhasil! Mengalihkan ke Dashboard...");
      } else {
        setErrorStatus("Username atau Password salah!");
      }
      setIsLoading(false);
    }, 1200);
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row font-sans bg-canvas">
      {/* ─── PANEL KIRI: VISUAL UTAMA (Selaras dengan Tone Gelap / Canvas Beranda) ─── */}
      <div className="hidden md:flex md:w-1/2 bg-canvas border-r border-hairline flex-col items-center justify-center p-12 text-center select-none relative overflow-hidden">
        {/* Aksen Kilau Lampu Halus (Glow Effect) Khas Gradasi HMBD di Background */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-m-blue-dark/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-m-red/10 rounded-full filter blur-3xl" />

        <div className="max-w-md space-y-6 relative z-10">
          {/* Wadah Logo Bulat — Menggunakan token border-hairline and bg-surface-soft */}
          <div className="mx-auto w-60 h-60 flex items-center justify-center bg-surface-soft rounded-full p-6 border border-hairline shadow-2xl">
            <img src="/assets/hitam-hmbd.webp" alt="Logo HMBD" className="w-full h-full object-contain" />
          </div>

          {/* Teks Identitas — Menggunakan warna teks standar beranda */}
          <div className="space-y-3 flex flex-col items-center justify-center w-full">
            <h2 className="text-xl lg:text-2xl font-extrabold uppercase tracking-wider leading-snug text-on-dark text-center">
              WEBSITE HIMPUNAN MAHASISWA
              <br />
              BISNIS DIGITAL
              <br />
              TELKOM UNIVERSITY PURWOKERTO
            </h2>

            {/* Garis Pembatas Gradasi Biru-Merah Identitas Kabinet */}
            <div className="h-[2px] w-24 bg-gradient-to-r from-m-blue-dark via-m-blue-light to-m-red mx-auto rounded-full" />
          </div>
        </div>
      </div>

      {/* ─── PANEL KANAN: KOTAK FORMULIR LOGIN INTEGRATIF ─── */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12 md:p-16 relative bg-canvas">
        {/* Tombol Kembali dengan warna text-muted and hover warna khas beranda */}
        <Link href="/" className="absolute top-6 right-6 inline-flex items-center text-[11px] font-bold uppercase tracking-widest text-muted hover:text-m-blue-light transition-colors duration-150">
          ← Beranda
        </Link>

        <div className="w-full max-w-[360px] space-y-8">
          {/* Bagian Atas: Pasangan Dua Logo Penting & Judul */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 filter drop-shadow-md">
              <img src="/assets/hitam-hmbd.webp" alt="Logo HMBD" className="h-10 w-10 object-contain" />
              <img src="/assets/hitam-aradhana.webp" alt="Logo Kabinet Aradhana" className="h-10 w-10 object-contain" />
            </div>

            <h1 className="text-lg font-black uppercase tracking-widest text-on-dark">LOGIN ADMIN</h1>
          </div>

          {/* BOX UTAMA FORMULIR — Memakai bg-surface-soft and border-hairline agar seragam */}
          <div className="border border-hairline bg-surface-soft p-6 sm:p-8 shadow-xl backdrop-blur-xs">
            <form className="space-y-5" onSubmit={handleLoginSubmit}>
              {/* Alert Error Box Menyesuaikan Tema Merah Kabinet Aradhana */}
              {errorStatus && <div className="border border-m-red/30 bg-m-red/5 p-3 text-center text-xs font-medium text-m-red tracking-wide">{errorStatus}</div>}

              {/* Input Field: Username */}
              <div className="space-y-2">
                <label htmlFor="user-in" className="block text-[10px] font-bold text-body-strong uppercase tracking-wider">
                  Username Akun
                </label>
                <input
                  id="user-in"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan Username"
                  className="w-full border border-hairline bg-canvas px-4 py-2.5 text-xs text-on-dark font-light placeholder:text-muted/50 focus:border-m-blue-dark focus:outline-hidden transition-all duration-150 tracking-wide"
                />
              </div>

              {/* Input Field: Password */}
              <div className="space-y-2">
                <label htmlFor="pass-in" className="block text-[10px] font-bold text-body-strong uppercase tracking-wider">
                  Password Gembok
                </label>
                <input
                  id="pass-in"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full border border-hairline bg-canvas px-4 py-2.5 text-xs text-on-dark font-light placeholder:text-muted/50 focus:border-m-blue-dark focus:outline-hidden transition-all duration-150"
                />
              </div>

              {/* Tombol Otorisasi — Menggunakan gradasi warna resmi HMBD */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 border border-m-blue-dark/50 bg-gradient-to-r from-m-blue-dark to-m-blue-light text-xs font-bold uppercase tracking-[2px] text-white transition-all duration-300 hover:opacity-90 disabled:opacity-50 cursor-pointer shadow-[0_0_15px_rgba(28,105,212,0.15)] disabled:cursor-not-allowed"
                >
                  {isLoading ? "MEMVERIFIKASI..." : "OTORISASI MASUK"}
                </button>
              </div>
            </form>
          </div>

          {/* Bagian Bawah: Sosial Media Terpadu dengan warna text-muted */}
        </div>
      </div>
    </main>
  );
}
