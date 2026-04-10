import AboutUs from "@/components/about/about-us";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Village & Panchayat Members",
  description: "Learn about the rich history of Gidhadi village, our community vision, and meet the dedicated Gram Panchayat members working for rural development.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutUs />;
}
