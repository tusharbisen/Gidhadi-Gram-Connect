import EmergencyContact from "@/components/home/emergency-contact";
import EventCarousel from "@/components/home/event-carousel";
import HeroSection from "@/components/home/hero-carousel";
import AnnouncementCarousel from "@/components/home/announcement-carousel";
import BraveSoldiersSection from "@/components/brave-soldiers/brave-soldiers-section";
import VideoIntroSection from "@/components/video-section/video-intro-section";
import VillageInfo from "@/components/viilage-info/village-info";
import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";

// ─── Page Metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  // "Home" uses the layout's template → "Home | Gidhadi Gram Connect"
  title: "Home",
  description: SITE_CONFIG.description,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title:       "Gidhadi Gram Connect | गिधाडी ग्राम कनेक्ट",
    description: SITE_CONFIG.description,
    url:         SITE_CONFIG.url,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-8 md:space-y-12">

      {/* Hero banner */}
      <HeroSection />

      {/* Scrolling announcements */}
      <AnnouncementCarousel />

      {/* Events + Emergency contact side-by-side on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2">
          <EventCarousel />
        </div>
        <div className="lg:col-span-1">
          <EmergencyContact />
        </div>
      </div>

      {/* Village statistics & map */}
      <VillageInfo />

      {/* Brave soldiers tribute */}
      <BraveSoldiersSection />

      {/* Intro video */}
      <VideoIntroSection />

    </div>
  );
}
