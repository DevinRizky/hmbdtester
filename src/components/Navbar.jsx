"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MobileNav from "./MobileNav";
import MStripe from "./MStripe";
import ThemeToggle from "./ThemeToggle";

// Array Nav Utama disaring kembali. Berita, Insight, dan Rekrutmen dikeluarkan karena di-render via dropdown kustom.
const NAV_LEFT = [{ href: "/", label: "Beranda" }];

const NAV_MIDDLE = [
  { href: "/kabinet", label: "Kabinet" },
  { href: "/kegiatan", label: "Kegiatan" },
];

const NAV_RIGHT = [{ href: "/aspirasi", label: "Aspirasi" }];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [pubDropdownOpen, setPubDropdownOpen] = useState(false);
  const [rekDropdownOpen, setRekDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Cek keaktifan rute dropdown untuk indikator garis bawah
  const isPublikasiActive = pathname.startsWith("/berita") || pathname.startsWith("/insight");
  const isRekrutmenActive = pathname.startsWith("/rekrutmen");

  useEffect(() => {
    let isSubscribed = true;
    queueMicrotask(() => {
      if (isSubscribed) setMounted(true);
    });
    return () => {
      isSubscribed = false;
    };
  }, []);

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
    setPubDropdownOpen(false);
    setRekDropdownOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 inset-x-0 z-99999! isolate bg-canvas/95 backdrop-blur-md border-b border-hairline/80 transition-shadow duration-200">
        <MStripe />
        <div className="mx-auto flex h-16 max-w-360 items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6 lg:px-10">
          <Link href="/" className="group flex min-h-11 min-w-0 shrink items-center gap-2 active:opacity-95 sm:gap-3" onClick={handleLinkClick}>
            <Image src="/hitam-hmbd.png" alt="Logo HMBD" width={48} height={48} className="h-12 w-12 object-contain block dark:hidden" priority />
            <Image src="/putih-hmbd.png" alt="Logo HMBD" width={48} height={48} className="h-12 w-12 object-contain hidden dark:block" priority />

            <Image src="/hitam-aradhana.png" alt="Logo Kabinet Aradhana" width={48} height={48} className="hidden h-12 w-12 object-contain sm:block dark:sm:hidden" />
            <Image src="/putih-aradhana.png" alt="Logo Kabinet Aradhana" width={48} height={48} className="hidden h-12 w-12 object-contain dark:sm:block" />

            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-[11px] font-bold uppercase tracking-[1.5px] text-on-dark">HMBD Purwokerto</span>
              <span className="truncate text-[10px] font-light uppercase tracking-[0.5px] text-muted">Kabinet Aradhana</span>
            </span>
          </Link>

          <nav aria-label="Utama" className="hidden items-center gap-1 md:flex">
            {/* 1. Menu Beranda */}
            {NAV_LEFT.map(({ href, label }) => {
              const active = pathname === "/";
              return (
                <Link key={href} href={href} className={`group relative px-4 py-2 text-sm font-normal tracking-wide text-body transition duration-200 ease-out hover:text-on-dark ${active ? "text-on-dark" : ""}`}>
                  <span className="relative z-10">{label}</span>
                  {active && <span className="absolute inset-x-2 bottom-1 h-0.5 bg-linear-to-r from-m-blue-light via-m-blue-dark to-m-red opacity-95" />}
                </Link>
              );
            })}

            {/* 2. DROPDOWN: PUBLIKASI */}
            <div className="relative" onMouseEnter={() => setPubDropdownOpen(true)} onMouseLeave={() => setPubDropdownOpen(false)}>
              <button
                type="button"
                onClick={() => setPubDropdownOpen((prev) => !prev)}
                className={`group relative flex items-center gap-1 px-4 py-2 text-sm font-normal tracking-wide text-body transition duration-200 ease-out hover:text-on-dark ${isPublikasiActive ? "text-on-dark" : ""}`}
              >
                <span className="relative z-10">Publikasi</span>
                <svg className={`w-3 h-3 text-muted group-hover:text-on-dark transition-transform duration-200 ${pubDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {isPublikasiActive && <span className="absolute inset-x-2 bottom-1 h-0.5 bg-linear-to-r from-m-blue-light via-m-blue-dark to-m-red opacity-95" />}
              </button>

              {pubDropdownOpen && (
                <div className="absolute left-0 mt-0 w-52 border border-hairline/80 bg-canvas/98 backdrop-blur-md shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    href="/berita"
                    onClick={handleLinkClick}
                    className={`block px-4 py-2.5 text-sm text-body hover:bg-surface-soft hover:text-on-dark transition ${pathname.startsWith("/berita") ? "bg-surface-soft text-on-dark font-medium" : ""}`}
                  >
                    Berita
                  </Link>
                  <Link
                    href="/insight"
                    onClick={handleLinkClick}
                    className={`block px-4 py-2.5 text-sm text-body hover:bg-surface-soft hover:text-on-dark transition ${pathname.startsWith("/insight") ? "bg-surface-soft text-on-dark font-medium" : ""}`}
                  >
                    Insight
                  </Link>
                </div>
              )}
            </div>

            {/* 3. DROPDOWN: REKRUTMEN */}
            <div className="relative" onMouseEnter={() => setRekDropdownOpen(true)} onMouseLeave={() => setRekDropdownOpen(false)}>
              <button
                type="button"
                onClick={() => setRekDropdownOpen((prev) => !prev)}
                className={`group relative flex items-center gap-1 px-4 py-2 text-sm font-normal tracking-wide text-body transition duration-200 ease-out hover:text-on-dark ${isRekrutmenActive ? "text-on-dark" : ""}`}
              >
                <span className="relative z-10">Rekrutmen</span>
                <svg className={`w-3 h-3 text-muted group-hover:text-on-dark transition-transform duration-200 ${rekDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {isRekrutmenActive && <span className="absolute inset-x-2 bottom-1 h-0.5 bg-linear-to-r from-m-blue-light via-m-blue-dark to-m-red opacity-95" />}
              </button>

              {rekDropdownOpen && (
                <div className="absolute left-0 mt-0 w-52 border border-hairline/80 bg-canvas/98 backdrop-blur-md shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    href="/rekrutmen/hmbd"
                    onClick={handleLinkClick}
                    className={`block px-4 py-2.5 text-sm text-body hover:bg-surface-soft hover:text-on-dark transition ${pathname === "/rekrutmen/hmbd" ? "bg-surface-soft text-on-dark font-medium" : ""}`}
                  >
                    HMBD
                  </Link>
                  <Link
                    href="/rekrutmen/lainnya"
                    onClick={handleLinkClick}
                    className={`block px-4 py-2.5 text-sm text-body hover:bg-surface-soft hover:text-on-dark transition ${pathname === "/rekrutmen/lainnya" ? "bg-surface-soft text-on-dark font-medium" : ""}`}
                  >
                    Ekternal
                  </Link>
                </div>
              )}
            </div>

            {/* 4. Menu Kabinet & Kegiatan */}
            {NAV_MIDDLE.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link key={href} href={href} className={`group relative px-4 py-2 text-sm font-normal tracking-wide text-body transition duration-200 ease-out hover:text-on-dark ${active ? "text-on-dark" : ""}`}>
                  <span className="relative z-10">{label}</span>
                  {active && <span className="absolute inset-x-2 bottom-1 h-0.5 bg-linear-to-r from-m-blue-light via-m-blue-dark to-m-red opacity-95" />}
                </Link>
              );
            })}

            {/* 5. Menu Akhir (Aspirasi) */}
            {NAV_RIGHT.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(`${href}/`);
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

      {/* Array data navigasi rata untuk versi mobile nav agar tampil penuh di drawer */}
      {/* Array data navigasi rata untuk versi mobile nav yang disesuaikan dengan Rekomendasi 1 */}
      {mounted && (
        <MobileNav
          open={open}
          onClose={() => setOpen(false)}
          pathname={pathname}
          navItems={[
            { href: "/", label: "Beranda" },
            // Sub-menu Publikasi diberi penanda visual agar rapi di HP
            { href: "/berita", label: "─ Berita" },
            { href: "/insight", label: "─ Insight" },
            // Sub-menu Rekrutmen diberi penanda visual juga
            { href: "/rekrutmen/hmbd", label: "─ Rekrutmen HMBD" },
            { href: "/rekrutmen/lainnya", label: "─ Rekrutmen Lainnya" },
            // Menu utama lainnya kembali normal
            { href: "/kabinet", label: "Kabinet" },
            { href: "/kegiatan", label: "Kegiatan" },
            { href: "/aspirasi", label: "Aspirasi" },
          ]}
        />
      )}
    </>
  );
}
