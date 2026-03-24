import PhotoGallery from "@/components/gallery/photo-gallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery - Gram Panchayat Gidhadi",
  description: "Photos and videos of events and activities in Gidhadi village",
};

export default function GalleryPage() {
  return <PhotoGallery />;
}
