"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollAnimate from "@/components/ui/ScrollAnimate";

export default function FeaturedVideo() {
  const [isPlaying, setIsPlaying] = useState(false);

  // 🛠️ Masukkan ID video YouTube kamu di sini
  const YOUTUBE_VIDEO_ID = "EpSwJ3mBFP8";

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <section aria-labelledby="video-utama-heading" className="py-section bg-transparent">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Header Bagian dengan Scroll Reveal */}
        <ScrollAnimate variant="fadeInUp">
          <div className="mb-10 max-w-3xl">
            <h2 id="video-utama-heading" className="text-xl font-bold uppercase tracking-tight text-on-dark lg:text-[32px] lg:leading-[1.15]">
              Profil & Kilas Balik Himpunan
            </h2>
            <div className="mt-4 text-base font-light text-body block">Saksikan pemaparan visi, struktur kerja, dan documentation perjalanan penuh dedikasi dari Himpunan Mahasiswa Bisnis Digital Telkom University Purwokerto.</div>
          </div>
        </ScrollAnimate>

        {/* Bingkai Video Player dengan Efek Kelengkungan Asimetris & Hover Elevasi */}
        <ScrollAnimate variant="fadeInUp" delay={0.2}>
          <div className="relative overflow-hidden border border-hairline bg-surface-soft aspect-video shadow-2xl group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-m-blue-light/50 rounded-tr-lg rounded-bl-lg rounded-tl-lg rounded-br-lg">
            {/* Render Iframe YouTube hanya jika tombol play ditekan, menghemat resource loading awal! */}
            {isPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="Profil & Kilas Balik Himpunan Mahasiswa Bisnis Digital"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full object-cover"
              />
            ) : (
              // Thumbnail placeholder sebelum diputar (bisa diganti gambar kustom jika mau)
              <div className="absolute inset-0 bg-black/40 transition duration-500 group-hover:scale-[1.005]" />
            )}

            {/* Overlay Tombol Play Kustom */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 transition duration-300 group-hover:bg-black/50 pointer-events-auto"
                >
                  {/* Container Tombol dengan Efek Denyut Lingkaran Cahaya */}
                  <div className="relative flex items-center justify-center">
                    {/* Ring Denyut Luar */}
                    <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 rounded-full bg-m-blue-light/30 blur-xs" />

                    {/* Tombol Utama */}
                    <button
                      type="button"
                      onClick={handlePlayVideo}
                      aria-label="Putar video profil hmbd"
                      className="relative z-10 flex size-20 items-center justify-center rounded-full border border-white/20 bg-canvas/10 text-white backdrop-blur-md transition duration-300 ease-out hover:scale-110 hover:border-m-blue-dark hover:bg-m-blue-dark hover:shadow-[0_0_40px_rgba(28,105,212,0.6)] focus:outline-none focus:ring-2 focus:ring-m-blue-dark"
                    >
                      <svg className="ml-1 size-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>

                  {/* Indikator Durasi Ringkas */}
                  <span className="mt-6 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white/80 bg-black/40 border border-white/10 backdrop-blur-xs rounded-xs select-none">Durasi · ± 6 Menit</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}
