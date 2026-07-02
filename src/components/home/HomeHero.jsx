"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const HERO_IMAGES = ["/intro-pic-primary.jpg", "/gallery-02.jpg", "/gallery-03.jpg"];

const FOREGROUND_NODES = [
  { id: 1, cx: "10%", cy: "20%", r: 3, duration: 10, delay: 0, color: "var(--color-m-blue-light)" },
  { id: 2, cx: "85%", cy: "25%", r: 4, duration: 12, delay: 1, color: "var(--color-m-red)" },
  { id: 3, cx: "70%", cy: "75%", r: 3.5, duration: 11, delay: 3, color: "var(--color-m-blue-dark)" },
  { id: 4, cx: "25%", cy: "85%", r: 2.5, duration: 9, delay: 2, color: "var(--color-m-blue-light)" },
];

const BACKGROUND_NODES = [
  { id: 5, cx: "40%", cy: "15%", r: 7, duration: 22, delay: 0, color: "var(--color-m-red)" },
  { id: 6, cx: "90%", cy: "60%", r: 9, duration: 26, delay: 4, color: "var(--color-m-blue-light)" },
  { id: 7, cx: "15%", cy: "55%", r: 8, duration: 24, delay: 2, color: "var(--color-m-blue-dark)" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0] },
  },
};

export default function HomeHero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prevIdx) => (prevIdx + 1) % HERO_IMAGES.length);
    }, 6000);

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      clearInterval(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-transparent py-12 lg:py-24 min-h-[90vh] flex items-center">
      {/* ================= INTERACTIVE HERO BACKGROUND (HANYA AKTIF DI HERO) ================= */}
      <div className="absolute inset-0 -z-10 pointer-events-none select-none transform-gpu">
        {/* Glow Blobs */}
        <motion.div
          animate={{ x: [0, 40, -30, 0], y: [0, -40, 40, 0], scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ backgroundColor: "var(--color-m-blue-light)" }}
          className="absolute -top-20 -left-20 h-[500px] w-[500px] rounded-full opacity-[0.09] dark:opacity-[0.06] blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -40, 30, 0], y: [0, 40, -30, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          style={{ backgroundColor: "var(--color-m-red)" }}
          className="absolute bottom-5 right-5 h-[450px] w-[450px] rounded-full opacity-[0.08] dark:opacity-[0.05] blur-[100px]"
        />

        {/* Grid Matrix */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Network Connections */}
        <motion.svg animate={{ x: mousePos.x, y: mousePos.y }} transition={{ type: "tween", ease: "easeOut", duration: 0.5 }} className="absolute inset-0 h-full w-full opacity-60 dark:opacity-45">
          <g stroke="currentColor" className="text-hairline" strokeWidth="0.5">
            <line x1="10%" y1="20%" x2="40%" y2="15%" strokeDasharray="3 3" />
            <line x1="40%" y1="15%" x2="85%" y2="25%" />
            <line x1="85%" y1="25%" x2="70%" y2="75%" strokeDasharray="4 4" />
            <line x1="70%" y1="75%" x2="25%" y2="85%" />
            <line x1="25%" y1="85%" x2="15%" y2="55%" />
            <line x1="15%" y1="55%" x2="10%" y2="20%" strokeDasharray="2 2" />
          </g>

          {FOREGROUND_NODES.map((node) => (
            <g key={node.id}>
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r={node.r * 2.5}
                style={{ fill: node.color }}
                className="opacity-[0.05]"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: node.delay }}
              />
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                style={{ fill: node.color }}
                animate={{ y: [0, -20, 15, 0], x: [0, 10, -10, 0] }}
                transition={{ duration: node.duration, repeat: Infinity, ease: "easeInOut", delay: node.delay }}
              />
            </g>
          ))}
        </motion.svg>
      </div>
      {/* ===================================================================================== */}

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 grid gap-12 lg:grid-cols-12 items-center w-full relative z-10">
        {/* KOLOM KIRI: TEKS & CALL TO ACTION */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="lg:col-span-7 flex flex-col justify-center">
          <motion.span variants={itemVariants} className="text-[11px] font-bold uppercase tracking-[2px] text-m-blue-dark dark:text-m-blue-light">
            Selamat Datang di Website Resmi
          </motion.span>

          <motion.h1 variants={itemVariants} className="mt-3 text-3xl font-extrabold uppercase tracking-tight text-on-dark sm:text-4xl lg:text-5xl lg:leading-[1.2] flex flex-col min-h-[3.6em] sm:min-h-[2.4em] lg:min-h-[2.2em]">
            <span>Himpunan Mahasiswa</span>
            <div className="inline-flex items-center flex-wrap">
              <span className="bg-linear-to-r from-m-blue-dark via-m-blue-light to-m-red bg-clip-text text-transparent">
                {"Bisnis Digital".split("").map((char, index) => (
                  <motion.span key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.05, delay: 0.5 + index * 0.08, ease: "easeIn" }}>
                    {char}
                  </motion.span>
                ))}
              </span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="inline-block ml-1 h-[0.9em] w-[3px] bg-m-red transform translate-y-[2px]"
              />
            </div>
          </motion.h1>

          <motion.p variants={itemVariants} className="mt-6 text-base font-light text-body max-w-xl text-justify leading-relaxed">
            Wadah yang menghimpun dan mengoordinasikan seluruh kegiatan mahasiswa Program Studi Bisnis Digital untuk mempererat persatuan, mengembangkan karakter dan kepemimpinan yang berintegritas, meningkatkan kompetensi, serta
            memperjuangkan aspirasi mahasiswa agar dapat memberikan kontribusi positif bagi pengembangan Bisnis Digital dan pembangunan Indonesia.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4">
            <Link href="/rekrutmen" className="bg-on-dark text-canvas px-6 py-3 text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]">
              Daftar Sekarang
            </Link>
            <Link
              href="/aspirasi"
              className="border border-hairline bg-canvas/30 backdrop-blur-xs px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-surface-soft transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              Sampaikan Aspirasi
            </Link>
          </motion.div>
        </motion.div>

        {/* KOLOM KANAN: SLIDER FOTO */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative aspect-square w-full max-w-lg border border-hairline bg-surface-soft overflow-hidden shadow-2xl group rounded-tr-[80px] rounded-bl-[80px] rounded-tl-xl rounded-br-xl"
          >
            <AnimatePresence mode="popLayout">
              <motion.div key={currentIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2, ease: "easeInOut" }} className="absolute inset-0 w-full h-full">
                <motion.img
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.07 }}
                  transition={{ duration: 6, ease: "linear" }}
                  src={HERO_IMAGES[currentIdx]}
                  alt={`Slide Dokumentasi HMBD ${currentIdx + 1}`}
                  className="h-full w-full object-cover brightness-[0.95] dark:brightness-90 select-none pointer-events-none rounded-tr-[80px] rounded-bl-[80px] rounded-tl-xl rounded-br-xl"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-10 rounded-tr-[80px] rounded-bl-[80px]" />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {HERO_IMAGES.map((_, idx) => (
                <span key={idx} className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIdx ? "w-6 bg-m-red" : "w-1.5 bg-white/40"}`} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
