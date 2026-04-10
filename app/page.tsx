import EmergencyContact from "@/components/home/emergency-contact";
import EventCarousel from "@/components/home/event-carousel";
import HeroSection from "@/components/home/hero-carousel";
import AnnouncementCarousel from "@/components/home/announcement-carousel";
import BraveSoldiersSection from "@/components/brave-soldiers/brave-soldiers-section";
import VideoIntroSection from "@/components/video-section/video-intro-section";
import VillageInfo from "@/components/viilage-info/village-info";
import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";

// ─── Page Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Gidhadi Village Portal | Schemes & Updates",
  description: "Access official Gidhadi Gram Panchayat services, government schemes, local news, and grievance redressal in one place. Explore our village portal today!",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title:       "Gidhadi Village Portal | Schemes & Updates",
    description: "Access official Gidhadi Gram Panchayat services, government schemes, local news, and grievance redressal in one place.",
    url:         SITE_CONFIG.url,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    // Full-width wrapper — no horizontal overflow on any screen
    <main className="w-full min-h-screen">
      <h1 className="sr-only">Gidhadi Village Portal: Gram Panchayat Services, Schemes & Local News</h1>

      {/* ── Hero: edge-to-edge on mobile, contained on desktop ── */}
      <section className="w-full">
        <HeroSection />
      </section>

      {/* ── SEO Intro & Internal Links ── */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 text-center">
        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Welcome to the official <strong>Gidhadi Village Portal</strong>. Our mission is to empower residents by providing continuous access to critical Gram Panchayat services. Discover active <a href="/schemes" className="text-primary font-semibold hover:underline">government schemes</a>, stay updated with local news, or use our digital <a href="/grievance" className="text-primary font-semibold hover:underline">grievance redressal</a> system to report community issues.
        </p>
      </section>

      {/* ── All remaining sections share consistent horizontal padding ── */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Scrolling announcements — tight top gap after hero */}
        <section className="mt-4 sm:mt-6 lg:mt-8">
          <AnnouncementCarousel />
        </section>

        {/* Events + Emergency contact */}
        <section className="mt-6 sm:mt-8 lg:mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Event carousel takes 2/3 width on large screens */}
            <div className="lg:col-span-2 min-w-0">
              <EventCarousel />
            </div>

            {/* Emergency contact takes 1/3 width; stacks below on mobile */}
            <div className="lg:col-span-1 min-w-0">
              <EmergencyContact />
            </div>
          </div>
        </section>

        {/* Village statistics & map */}
        <section className="mt-6 sm:mt-8 lg:mt-10">
          <VillageInfo />
        </section>

        {/* Brave soldiers tribute */}
        <section className="mt-6 sm:mt-8 lg:mt-10">
          <BraveSoldiersSection />
        </section>

        {/* Intro video — extra bottom padding for mobile nav clearance */}
        <section className="mt-6 sm:mt-8 lg:mt-10 pb-8 sm:pb-10 lg:pb-12">
          <VideoIntroSection />
        </section>

      </div>
    </main>
  );
}