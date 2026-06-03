"use client";

import { useState, useRef } from "react";

export default function FeaturedVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section aria-labelledby="video-utama-heading" className="py-section bg-canvas">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Header Bagian */}
        <div className="mb-10 max-w-3xl">
          <h2 id="video-utama-heading" className="text-xl font-bold uppercase tracking-tight text-on-dark lg:text-[32px] lg:leading-[1.15]">
            Profil & Kilas Balik Himpunan
          </h2>
          <div className="mt-4 text-base font-light text-body block">Saksikan pemaparan visi, struktur kerja, dan dokumentasi perjalanan penuh dedikasi dari Himpunan Mahasiswa Bisnis Digital Telkom University Purwokerto.</div>
        </div>

        {/* Bingkai Video Player Sesuai Standar Desain Fase 1 */}
        <div className="relative overflow-hidden border border-hairline bg-surface-soft aspect-video shadow-2xl group">
          <video
            ref={videoRef}
            src="/ARADHANA-COMPANY-PROFILE.mp4" // <--- SILAKAN SESUAIKAN NAMA FILE DI FOLDER PUBLIC
            controls={isPlaying} // Kontrol bawaan browser baru muncul setelah tombol play diklik
            preload="metadata" // Hanya mengunduh data dasar (durasi/resolusi), menghemat bandwidth!
            className="h-full w-full object-cover transition duration-300"
          />

          {/* Overlay Tombol Play Kustom (Hanya Muncul Sebelum Video Diputar) */}
          {!isPlaying && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 transition duration-300 group-hover:bg-black/40">
              {/* Tombol Play Lingkaran Dinamis */}
              <button
                type="button"
                onClick={handlePlayVideo}
                aria-label="Putar video profil hmbd"
                className="flex size-20 items-center justify-center rounded-full border border-white/20 bg-canvas/10 text-white backdrop-blur-md transition duration-300 ease-out hover:scale-110 hover:border-m-blue-dark hover:bg-m-blue-dark hover:shadow-[0_0_40px_rgba(28,105,212,0.6)] focus:outline-none focus:ring-2 focus:ring-m-blue-dark"
              >
                {/* Ikon Segitiga Play */}
                <svg className="ml-1 size-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>

              {/* Indikator Durasi Ringkas */}
              <span className="mt-4 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white/80 bg-black/40 border border-white/10 backdrop-blur-sm">Durasi · ± 6 Menit</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
