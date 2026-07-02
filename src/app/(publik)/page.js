// src/app/(publik)/page.js
import MStripe from "@/components/MStripe";
import FeaturedVideo from "@/components/FeaturedVideo";
import AboutHmbdSection from "@/components/home/AboutHmbdSection";
import HomeHero from "@/components/home/HomeHero";
import LecturersSection from "@/components/home/LecturersSection";
import VisionMissionOrgSection from "@/components/home/VisionMissionOrgSection";
import ScrollAnimate from "@/components/ui/ScrollAnimate"; // 🛠️ Impor komponen penggerak

export const metadata = {
  title: "Beranda",
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section tidak perlu dibungkus ScrollAnimate karena posisinya paling atas 
          dan animasinya sudah kita atur berjalan otomatis saat pertama kali dimuat (on-mount) */}
      <HomeHero />

      <MStripe />

      {/* 2. Seksi Video Unggulan muncul halus dari bawah */}
      <ScrollAnimate variant="fadeInUp">
        <FeaturedVideo />
      </ScrollAnimate>

      <AboutHmbdSection />
      <MStripe />
      {/* 3. Seksi Visi Misi muncul dengan efek skala (pop-up lembut) */}
      <ScrollAnimate variant="scaleUp">
        <VisionMissionOrgSection />
      </ScrollAnimate>

      <MStripe />

      {/* 4. Seksi Dosen Pembina muncul dari bawah */}
      <ScrollAnimate variant="fadeInUp">
        <LecturersSection />
      </ScrollAnimate>
    </>
  );
}
