"use client";

export default function IntroVideoSection({ videoSrc }) {
  return (
    <section className="bg-canvas py-8 lg:py-12">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="relative w-full aspect-video border border-hairline bg-black overflow-hidden shadow-xl">
          {/* 🎯 src diganti menjadi props dinamis */}
          <video src={videoSrc || "/ARADHANA-COMPANY-PROFILE.mp4"} autoPlay loop muted playsInline controls className="h-full w-full object-cover brightness-[0.95] dark:brightness-90">
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
