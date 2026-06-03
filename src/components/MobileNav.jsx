"use client";

import Link from "next/link";
import { useEffect } from "react";
import MStripe from "./MStripe";

export default function MobileNav({ open, onClose, pathname, navItems }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  // Cek apakah di dalam navItems sudah ada rute "/" (Beranda)
  const hasHome = navItems.some((item) => item.href === "/");

  return (
    <div id="mobile-nav" className="fixed inset-0 z-9999 select-none md:hidden" role="dialog" aria-modal="true" aria-label="Menu navigasi">
      {/* Backdrop */}
      <button type="button" className="absolute inset-0 touch-manipulation bg-black/50 backdrop-blur-xs" onClick={onClose} aria-label="Tutup menu" />

      <aside className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-hairline bg-canvas shadow-[0_0_48px_rgba(28,105,212,0.15)]" onClick={(e) => e.stopPropagation()}>
        <MStripe />
        {/* SEBELUMNYA: px-6 py-8 */}
        {/* SEKARANG: px-6 pt-20 pb-8 (Kita tambahkan pt-20 agar menu Beranda turun dan lolos dari jeratan Navbar) */}

        <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 overflow-y-auto bg-canvas px-6 pt-20 pb-8">
          {navItems.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`touch-manipulation border-l-2 px-4 py-4 text-sm font-normal tracking-[0.5px] transition duration-200 ease-out active:bg-surface-soft ${
                  active ? "border-m-blue-dark bg-surface-soft text-on-dark shadow-[inset_0_0_24px_rgba(28,105,212,0.08)]" : "border-transparent text-body hover:border-m-blue-light hover:text-body-strong"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
