import PhotoGallery from "@/components/gallery/photo-gallery"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery - Gram Panchayat Gidhadi",
  description: "Photos and videos of events and activities in Gidhadi village",
}

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-primary md:text-4xl">Gallery</h1>
      <PhotoGallery />
    </div>
  )
}
