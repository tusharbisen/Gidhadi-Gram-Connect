import EmergencyContact from "@/components/home/emergency-contact"
import EventCarousel from "@/components/home/event-carousel"
import HeroSection from "@/components/home/hero-carousel"
import AnnouncementCarousel from "@/components/home/announcement-carousel"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home - GP Gidhadi",
  description: "Official website of Gram Panchayat Gidhadi",
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <HeroSection/>
      <AnnouncementCarousel />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <EventCarousel />
        </div>
        <div className="lg:col-span-1">
          <EmergencyContact />
        </div>
      </div>
    </div>
  )
}
