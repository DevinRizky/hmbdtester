import MStripe from "@/components/MStripe";
import FeaturedVideo from "@/components/FeaturedVideo";
import AboutHmbdSection from "@/components/home/AboutHmbdSection";
import HomeHero from "@/components/home/HomeHero";
import LecturersSection from "@/components/home/LecturersSection";
import VisionMissionOrgSection from "@/components/home/VisionMissionOrgSection";

export const metadata = {
  title: "Beranda",
};

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <MStripe />

      <FeaturedVideo />

      <AboutHmbdSection />

      <MStripe />

      <VisionMissionOrgSection />

      <MStripe />

      <LecturersSection />
    </>
  );
}
