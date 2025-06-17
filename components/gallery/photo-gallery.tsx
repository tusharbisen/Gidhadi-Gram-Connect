"use client"

import { useState } from "react"
import { useLanguage } from "@/components/providers/language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from "lucide-react"
import Image from "next/image"

const galleryItems = [
  {
    id: 1,
    title: {
      en: "Independence Day Celebration 2023",
      hi: "स्वतंत्रता दिवस समारोह 2023",
      mr: "स्वातंत्र्य दिन समारंभ 2023",
    },
    category: "events",
    date: "2023-08-15",
    image: "/image1.jpg",
    thumbnail:"/image4.jpg",
  },
  {
    id: 2,
    title: {
      en: "Tree Plantation Drive",
      hi: "वृक्षारोपण अभियान",
      mr: "वृक्षारोपण मोहीम",
    },
    category: "environment",
    date: "2023-07-05",
    image: "/image2.jpg",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: {
      en: "Village Road Construction",
      hi: "गांव सड़क निर्माण",
      mr: "गाव रस्ता बांधकाम",
    },
    category: "development",
    date: "2023-06-20",
    image: "/image3.jpg",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: {
      en: "Gram Sabha Meeting",
      hi: "ग्राम सभा बैठक",
      mr: "ग्रामसभा बैठक",
    },
    category: "meetings",
    date: "2023-06-25",
    image: "image4.jpg",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: {
      en: "Water Tank Installation",
      hi: "पानी की टंकी स्थापना",
      mr: "पाण्याची टाकी बसवणे",
    },
    category: "development",
    date: "2023-05-15",
    image: "/image1.jpg",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: {
      en: "Women's Self Help Group Meeting",
      hi: "महिला स्वयं सहायता समूह बैठक",
      mr: "महिला स्वयंसहायता गट बैठक",
    },
    category: "social",
    date: "2023-05-10",
    image: "image2.jpg",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 7,
    title: {
      en: "Village Cleanliness Drive",
      hi: "गांव स्वच्छता अभियान",
      mr: "गाव स्वच्छता मोहीम",
    },
    category: "environment",
    date: "2023-04-22",
    image: "/image3.jpg",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 8,
    title: {
      en: "School Building Renovation",
      hi: "स्कूल भवन नवीनीकरण",
      mr: "शाळा इमारत नूतनीकरण",
    },
    category: "development",
    date: "2023-04-10",
    image: "/image4.jpg",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
]

const PhotoGallery = () => {
  const { t, language } = useLanguage()
  const [filter, setFilter] = useState("all")
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const categories = [
    { key: "all", label: "All Photos" },
    { key: "events", label: t("eventPhotos") },
    { key: "development", label: t("developmentWork") },
    { key: "environment", label: "Environment" },
    { key: "meetings", label: "Meetings" },
    { key: "social", label: "Social Programs" },
  ]

  const filteredItems = filter === "all" ? galleryItems : galleryItems.filter((item) => item.category === filter)

  const openLightbox = (item: any, index: number) => {
    setSelectedImage(item)
    setCurrentImageIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: "prev" | "next") => {
    const currentFilteredIndex = filteredItems.findIndex((item) => item.id === selectedImage.id)
    let newIndex

    if (direction === "prev") {
      newIndex = currentFilteredIndex > 0 ? currentFilteredIndex - 1 : filteredItems.length - 1
    } else {
      newIndex = currentFilteredIndex < filteredItems.length - 1 ? currentFilteredIndex + 1 : 0
    }

    setSelectedImage(filteredItems[newIndex])
    setCurrentImageIndex(newIndex)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "events":
        return "bg-blue-100 text-blue-800"
      case "development":
        return "bg-green-100 text-green-800"
      case "environment":
        return "bg-emerald-100 text-emerald-800"
      case "meetings":
        return "bg-purple-100 text-purple-800"
      case "social":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div>
      {/* Filter Section */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Photo Gallery</h2>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.key} value={category.key}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item, index) => (
          <Card
            key={item.id}
            className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300"
            onClick={() => openLightbox(item, index)}
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={item.thumbnail || "/placeholder.svg"}
                alt={item.title[language]}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute top-2 right-2">
                <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
              </div>
            </div>
            <CardContent className="p-3">
              <h3 className="font-medium text-sm mb-1 line-clamp-2">{item.title[language]}</h3>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="mr-1 h-3 w-3" />
                {new Date(item.date).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">📷</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No photos found</h3>
          <p className="text-gray-600">Try adjusting your filter to see more photos.</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative max-w-4xl max-h-full w-full">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white"
              onClick={() => navigateImage("prev")}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white"
              onClick={() => navigateImage("next")}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Image */}
            <div className="relative aspect-video w-full">
              <Image
                src={selectedImage.image || "/placeholder.svg"}
                alt={selectedImage.title[language]}
                fill
                className="object-contain"
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{selectedImage.title[language]}</h3>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {new Date(selectedImage.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Tag className="mr-1 h-4 w-4" />
                      {selectedImage.category}
                    </div>
                  </div>
                </div>
                <div className="text-sm opacity-75">
                  {currentImageIndex + 1} / {filteredItems.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PhotoGallery
