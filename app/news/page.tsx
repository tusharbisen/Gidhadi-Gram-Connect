import EventsList from "@/components/news/events-list"
import NoticeBoard from "@/components/news/notice-board"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "News & Events - Gram Panchayat Gidhadi",
  description: "Latest news, notices and upcoming events in Gidhadi village",
}

export default function NewsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-primary md:text-4xl">News & Events</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        <NoticeBoard />
        <EventsList />
      </div>
    </div>
  )
}
