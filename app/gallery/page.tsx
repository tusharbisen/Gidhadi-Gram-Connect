import PhotoGallery from "@/components/gallery/photo-gallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Village Photo Gallery & Event Media",
  description: "View photos and videos from recent Gidhadi Gram Panchayat events, rural development projects, social programs, and community gatherings.",
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <>
      <h1 className="sr-only">Gidhadi Village Photo Gallery & Event Media</h1>
      <PhotoGallery />
    </>
  );
}
