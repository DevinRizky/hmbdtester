"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Layer 1: Partikel Kecil & Cepat (Latar Depan / Foreground Parallax)
const FOREGROUND_NODES = [
  { id: 1, cx: "15%", cy: "15%", r: 3, duration: 10, delay: 0, color: "var(--color-m-blue-light)" },
  { id: 2, cx: "80%", cy: "25%", r: 4, duration: 12, delay: 1, color: "var(--color-m-red)" },
  { id: 3, cx: "65%", cy: "75%", r: 3.5, duration: 11, delay: 3, color: "var(--color-m-blue-dark)" },
  { id: 4, cx: "30%", cy: "85%", r: 2.5, duration: 9, delay: 2, color: "var(--color-m-blue-light)" },
];

// Layer 2: Partikel Besar & Lambat (Latar Belakang / Background Parallax)
const BACKGROUND_NODES = [
  { id: 5, cx: "45%", cy: "20%", r: 7, duration: 22, delay: 0, color: "var(--color-m-red)" },
  { id: 6, cx: "90%", cy: "65%", r: 9, duration: 26, delay: 4, color: "var(--color-m-blue-light)" },
  { id: 7, cx: "10%", cy: "60%", r: 8, duration: 24, delay: 2, color: "var(--color-m-blue-dark)" },
  { id: 8, cx: "55%", cy: "80%", r: 6, duration: 20, delay: 1, color: "var(--color-m-red)" },
];

export default function AnimatedBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Menangkap pergerakan mouse untuk interaksi paralaks kursor halus
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Mengubah koordinat piksel menjadi persentase pergeseran (-15px sampai 15px)
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-canvas select-none pointer-events-none transform-gpu">
      {/* 1. LAYER BLOB ABSTRAK RAKSASA (MULTIPLED GLOW EFFECT) */}
      <motion.div
        animate={{
          x: [0, 80, -50, 0],
          y: [0, -60, 70, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        style={{ backgroundColor: "var(--color-m-blue-light)" }}
        className="absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full opacity-[0.08] dark:opacity-[0.05] blur-[150px]"
      />
      <motion.div
        animate={{
          x: [0, -70, 60, 0],
          y: [0, 80, -40, 0],
          scale: [1, 1.1, 1.2, 1],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        style={{ backgroundColor: "var(--color-m-red)" }}
        className="absolute bottom-10 right-10 h-[600px] w-[600px] rounded-full opacity-[0.07] dark:opacity-[0.04] blur-[140px]"
      />
      <motion.div
        animate={{
          x: [-30, 40, -10, -30],
          y: [40, -20, 50, 40],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        style={{ backgroundColor: "var(--color-m-blue-dark)" }}
        className="absolute top-1/3 left-1/3 h-[500px] w-[500px] rounded-full opacity-[0.04] dark:opacity-[0.02] blur-[160px]"
      />

      {/* 2. BACKGROUND GRID MATRIX */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* 3. INTERACTIVE NETWORK MATRIX LAYER (Merespons Gerakan Mouse) */}
      <motion.svg animate={{ x: mousePos.x, y: mousePos.y }} transition={{ type: "tween", ease: "easeOut", duration: 0.5 }} className="absolute inset-0 h-full w-full opacity-70 dark:opacity-40" xmlns="http://www.w3.org/2000/svg">
        {/* Rangkaian Garis Hubung Antar Node Lebih Padat */}
        <g stroke="currentColor" className="text-hairline" strokeWidth="0.5">
          <line x1="15%" y1="15%" x2="45%" y2="20%" strokeDasharray="3 3" />
          <line x1="45%" y1="20%" x2="50%" y2="40%" />
          <line x1="50%" y1="40%" x2="80%" y2="25%" strokeDasharray="5 5" />
          <line x1="80%" y1="25%" x2="90%" y2="65%" />
          <line x1="90%" y1="65%" x2="55%" y2="80%" strokeDasharray="4 4" />
          <line x1="55%" y1="80%" x2="65%" y2="75%" />
          <line x1="65%" y1="75%" x2="30%" y2="85%" />
          <line x1="30%" y1="85%" x2="10%" y2="60%" strokeDasharray="2 2" />
          <line x1="10%" y1="60%" x2="15%" y2="15%" />

          {/* Garis Silang Jaringan Internal */}
          <line x1="45%" y1="20%" x2="65%" y2="75%" opacity="0.5" />
          <line x1="10%" y1="60%" x2="50%" y2="40%" opacity="0.5" />
        </g>

        {/* LAYER A: PARTIKEL UTAMA (Mempunyai Efek Pulse Denyut) */}
        {FOREGROUND_NODES.map((node) => (
          <g key={node.id}>
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r={node.r * 3}
              style={{ fill: node.color }}
              className="opacity-[0.06]"
              animate={{ scale: [1, 1.5, 1], opacity: [0.02, 0.08, 0.02] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: node.delay }}
            />
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              style={{ fill: node.color }}
              animate={{
                y: [0, -25, 20, 0],
                x: [0, 15, -15, 0],
              }}
              transition={{ duration: node.duration, repeat: Infinity, ease: "easeInOut", delay: node.delay }}
            />
          </g>
        ))}
      </motion.svg>

      {/* 4. LAYER B: PARALLAX FLOATING BLOBS DEEPER LEVEL (Kecepatan & Arah Berbeda) */}
      <motion.svg
        animate={{ x: mousePos.x * -0.5, y: mousePos.y * -0.5 }} // Bergerak berlawanan arah mouse untuk efek kedalaman 3D
        transition={{ type: "tween", ease: "easeOut", duration: 0.7 }}
        className="absolute inset-0 h-full w-full opacity-40 dark:opacity-20 blur-[1px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {BACKGROUND_NODES.map((node) => (
          <g key={node.id}>
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              style={{ fill: node.color }}
              className="opacity-40"
              animate={{
                y: [0, 35, -25, 0],
                x: [0, -20, 25, 0],
              }}
              transition={{ duration: node.duration, repeat: Infinity, ease: "easeInOut", delay: node.delay }}
            />
          </g>
        ))}
      </motion.svg>
    </div>
  );
}
