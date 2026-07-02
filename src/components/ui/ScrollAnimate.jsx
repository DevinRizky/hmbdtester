"use client";

import { motion } from "framer-motion";

// Variasi animasi standar industri untuk kemudahan konsistensi UI
const variants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0] } },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }, // Efek kartu muncul bergantian otomatis
    },
  },
};

export default function ScrollAnimate({ children, variant = "fadeInUp", className }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }} // Animasi terpicu 100px sebelum elemen masuk viewport layar
      variants={variants[variant]}
      className={className}
    >
      {children}
    </motion.div>
  );
}
