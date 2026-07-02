"use client";

import ScrollAnimate from "@/components/ui/ScrollAnimate"; // 🛠️ Impor mesin animasi scroll

export default function IntroVideoSection({ videoSrc }) {
  return (
    <section className="bg-transparent py-8 lg:py-12">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Membungkus video agar muncul perlahan dari bawah dengan skala halus saat di-scroll */}
        <ScrollAnimate variant="fadeInUp">
          <div className="relative w-full aspect-video border border-hairline bg-black overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-m-blue-light group rounded-tr-[40px] rounded-bl-[40px] rounded-tl-md rounded-br-md">
            {/* 🎯 src diganti menjadi props dinamis */}
            <video
              src={videoSrc || "/ARADHANA-COMPANY-PROFILE.mp4"}
              autoPlay
              loop
              muted
              playsInline
              controls
              className="h-full w-full object-cover brightness-[0.95] dark:brightness-90 transition-transform duration-700 group-hover:scale-[1.01]"
            >
              Your browser does not support the video tag.
            </video>

            {/* Overlay dekoratif halus di sudut untuk memperkuat karakter desain */}
            <div className="absolute inset-0 pointer-events-none border border-transparent group-hover:border-m-blue-light/20 transition-all duration-500 rounded-tr-[40px] rounded-bl-[40px]" />
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}
