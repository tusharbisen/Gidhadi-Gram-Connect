import AboutUs from "@/components/about/about-us";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Gram Panchayat Gidhadi",
  description:
    "Learn about Gram Panchayat Gidhadi, its history and elected members",
};

export default function AboutPage() {
  return <AboutUs />;
}
