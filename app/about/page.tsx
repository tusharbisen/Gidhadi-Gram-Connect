import AboutUs from "@/components/about/about-us";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Gram Panchayat Gidhadi",
  description:
    "Learn about Gram Panchayat Gidhadi, its history and elected members",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-primary md:text-4xl">
        About Us
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        <AboutUs /> {/* ✅ Corrected this line */}
      </div>
    </div>
  );
}
