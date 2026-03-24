"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const events = [
  {
    id: 1,
    titleKey: "independenceDay",
    date: "2023-08-15",
    image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1774261609/ChatGPT_Image_Mar_23_2026_03_41_03_PM_rsneh9.png",
  },
  {
    id: 2,
    titleKey: "treePlantation",
    date: "2023-07-05",
    image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1774261608/Gemini_Generated_Image_thq3v9thq3v9thq3_s0fkrt.png",
  },
  {
    id: 3,
    titleKey: "cleanlinessCompaign",
    date: "2023-06-20",
    image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1774262088/DSC_7420.JPG_mhhyly.jpg",
  },
   {
    id: 4,
    titleKey: "cleanlinessCompaigs",
    date: "2023-06-20",
    image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1774262062/DSC_7411.JPG_c1fxoq.jpg",
  },
   {
    id: 5,
    titleKey: "cleanlinessCompaigs",
    date: "2023-06-20",
    image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1774261999/DSC_7400.JPG_c4qnr3.jpg",
  },
   {
    id: 6,
    titleKey: "cleanlinessCompaigs",
    date: "2023-06-20",
    image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1774262032/DSC_7407.JPG_eol5ic.jpg",
  },
   {
    id: 7,
    titleKey: "cleanlinessCompaigs",
    date: "2023-06-20",
    image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1774262020/DSC_7403.JPG_aa2uso.jpg",
  },
   {
    id: 8,
    titleKey: "cleanlinessCompaigs",
    date: "2023-06-20",
    image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1774262062/DSC_7411.JPG_c1fxoq.jpg",
  },
   {
    id: 9,
    titleKey: "cleanlinessCompaigs",
    date: "2023-06-20",
    image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1774261945/DSC_7385.JPG_ezwlrc.jpg",
  },
   {
    id: 10,
    titleKey: "cleanlinessCompaigs",
    date: "2023-06-20",
    image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1774261659/DSC_7032.JPG_cdtluj.jpg",
  },
]

const EventCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { t } = useLanguage()

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === events.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? events.length - 1 : prev - 1))
  }

  return (
    <Card className="border-2 border-sky-700">
      <CardHeader>
        <CardTitle>{t("recentEvents")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="overflow-hidden rounded-md">
            <div className="relative aspect-video">
              <Image
                src={events[currentSlide].image || "/placeholder.svg"}
                alt={t(events[currentSlide].titleKey)}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                <h3 className="text-lg font-semibold">{t(events[currentSlide].titleKey)}</h3>
                <p className="text-sm">{new Date(events[currentSlide].date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white/80"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white/80"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next slide</span>
          </Button>
          <div className="mt-2 flex justify-center space-x-2">
            {events.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full ${currentSlide === index ? "bg-primary" : "bg-gray-300"}`}
                onClick={() => setCurrentSlide(index)}
              >
                <span className="sr-only">Go to slide {index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default EventCarousel
