"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MobileNav from "./MobileNav";
import MStripe from "./MStripe";
import ThemeToggle from "./ThemeToggle";

// SUSUNAN NAVIGASI BARU: Rapi, Terstruktur, dan Terbagi Jelas
const NAV = [
  { href: "/", label: "Beranda" },
  { href: "/berita", label: "Berita" },
  { href: "/insight", label: "Insight" },
  { href: "/kabinet", label: "Kabinet" },
  { href: "/kegiatan", label: "Kegiatan" },
  { href: "/rekrutmen", label: "Rekrutmen" },
  { href: "/aspirasi", label: "Aspirasi" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Perbaikan Linter: Gunakan trik penundaan render microtask agar tidak memicu cascading renders
  useEffect(() => {
    let isSubscribed = true;
    queueMicrotask(() => {
      if (isSubscribed) setMounted(true);
    });
    return () => {
      isSubscribed = false;
    };
  }, []);

  // Perbaikan Linter: Kontrol overflow body secara kondisional aman
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = open ? "hidden" : "";
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [open]);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 inset-x-0 z-99999! isolate bg-canvas/95 backdrop-blur-md border-b border-hairline/80 transition-shadow duration-200">
        <MStripe />
        <div className="mx-auto flex h-16 max-w-360 items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6 lg:px-10">
          <Link href="/" className="group flex min-h-11 min-w-0 shrink items-center gap-2 active:opacity-95 sm:gap-3" onClick={handleLinkClick}>
            {/* LOGO HMBD */}
            <Image src="/hitam-hmbd.png" alt="Logo HMBD" width={48} height={48} className="h-12 w-12 object-contain block dark:hidden" priority />
            <Image src="/putih-hmbd.png" alt="Logo HMBD" width={48} height={48} className="h-12 w-12 object-contain hidden dark:block" priority />

            {/* LOGO KABINET ARADHANA */}
            <Image src="/hitam-aradhana.png" alt="Logo Kabinet Aradhana" width={48} height={48} className="hidden h-12 w-12 object-contain sm:block dark:sm:hidden" />
            <Image src="/putih-aradhana.png" alt="Logo Kabinet Aradhana" width={48} height={48} className="hidden h-12 w-12 object-contain dark:sm:block" />

            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-[11px] font-bold uppercase tracking-[1.5px] text-on-dark">HMBD Purwokerto</span>
              <span className="truncate text-[10px] font-light uppercase tracking-[0.5px] text-muted">Kabinet Aradhana</span>
            </span>
          </Link>

          <nav aria-label="Utama" className="hidden items-center gap-1 md:flex">
            {NAV.map(({ href, label }) => {
              const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link key={href} href={href} className={`group relative px-4 py-2 text-sm font-normal tracking-wide text-body transition duration-200 ease-out hover:text-on-dark ${active ? "text-on-dark" : ""}`}>
                  <span className="relative z-10">{label}</span>
                  {active && <span className="absolute inset-x-2 bottom-1 h-0.5 bg-linear-to-r from-m-blue-light via-m-blue-dark to-m-red opacity-95" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="relative flex h-11 w-11 shrink-0 items-center justify-center border border-hairline bg-surface-soft text-on-dark md:hidden z-999999"
              onClick={() => setOpen((prev) => !prev)}
            >
              <span className="sr-only">{open ? "Tutup menu" : "Buka menu"}</span>
              <span className="flex flex-col gap-1.5" aria-hidden>
                <span className={`block h-0.5 w-5 bg-on-dark transition-transform duration-200 ${open ? "translate-y-1.25 rotate-45" : ""}`} />
                <span className={`block h-0.5 w-5 bg-on-dark transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-5 bg-on-dark transition-transform duration-200 ${open ? "-translate-y-1.25 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {mounted && <MobileNav open={open} onClose={() => setOpen(false)} pathname={pathname} navItems={NAV} />}
    </>
  );
}
