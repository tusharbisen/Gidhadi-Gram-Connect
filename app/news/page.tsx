import EventsList from "@/components/news/events-list";
import NoticeBoard from "@/components/news/notice-board";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Events - Gram Panchayat Gidhadi",
  description: "Latest news, notices and upcoming events in Gidhadi village",
};

export default function NewsPage() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
      <NoticeBoard />
      <EventsList />
    </div>
  );
}
