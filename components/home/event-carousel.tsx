"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState, useRef, useCallback } from "react"

// ─── Data ─────────────────────────────────────────────────────────────────────

const events = [
  {
    id: 1,
    titleKey: "Mahila Samuh Celebrating Shiv Jayant 2026 Ganesh Chawok Gidhadi",
    date: "2026-02-19",
    image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1775817163/Untitled_design_2_qnj3qt.jpg",
  },
  {
    id: 2,
    titleKey: "Savitribai Phule Jayanti Celebration Ceremony",
    date: "2026-01-04",
    image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1775817163/Untitled_design_1_esirm1.jpg",
  },
  {
    id: 3,
    titleKey: "Honoring Social Reformers and LeadernCeremony – Shiv Jayanti",
    date: "2026-02-19",
    image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1775817163/Untitled_design_kdia2z.jpg",
  },
  {
    id: 4,
    titleKey: "Honoring Social Reformers and LeadernCeremony – Shiv Jayanti",
    date: "2026-02-19",
    image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1775817163/Untitled_design_kdia2z.jpg",
  },
  {
    id: 5,
    titleKey: "Celebrating 150 Years of ZP School Gidhadi & Felicitation of Chief Guests",
    date: "2023-02-29",
    image:"https://res.cloudinary.com/dy1w6zqom/image/upload/q_auto/f_auto/v1774261608/Gemini_Generated_Image_thq3v9thq3v9thq3_s0fkrt.png",
  },
  {
    id: 6,
    titleKey: "Celebrating 150 Years of ZP School Gidhadi & Felicitation of Chief Guests",
    date: "2023-02-29",
    image: "https://res.cloudinary.com/dy1w6zqom/image/upload/q_auto/f_auto/v1774261995/DSC_7398.JPG_tjyvok.jpg",
  },
  {
    id: 7,
    titleKey: "Celebrating 150 Years of ZP School Gidhadi & Felicitation of Chief Guests",
    date: "2023-02-29",
    image: "https://res.cloudinary.com/dy1w6zqom/image/upload/q_auto/f_auto/v1774261801/DSC_7125.JPG_lgurvu.jpg",
  },
  {
    id: 8,
    titleKey: "Celebrating 150 Years of ZP School Gidhadi & Felicitation of Chief Guests",
    date: "2023-02-29",
    image: "https://res.cloudinary.com/dy1w6zqom/image/upload/q_auto/f_auto/v1774261783/DSC_7110.JPG_nzigti.jpg",
  },
  {
    id: 9,
    titleKey: "Celebrating 150 Years of ZP School Gidhadi & Felicitation of Chief Guests",
    date: "2023-02-29",
    image: "https://res.cloudinary.com/dy1w6zqom/image/upload/q_auto/f_auto/v1774261890/DSC_7378.JPG_sduz8y.jpg",
  },
  {
    id: 10,
    titleKey: "Celebrating 150 Years of ZP School Gidhadi & Felicitation of Chief Guests",
    date: "2023-02-29",
    image: "https://res.cloudinary.com/dy1w6zqom/image/upload/q_auto/f_auto/v1774262014/DSC_7401.JPG_dotxuq.jpg",
  }
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

// ─── Component ────────────────────────────────────────────────────────────────

const EventCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { t } = useLanguage()

  // ── Touch / swipe tracking ──────────────────────────────────────────────────
  const touchStartX = useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return
      const delta = touchStartX.current - e.changedTouches[0].clientX
      // Require at least 40px swipe to change slide — avoids accidental triggers
      if (Math.abs(delta) < 40) return
      if (delta > 0) {
        // Swipe left → next
        setCurrentSlide((prev) => (prev === events.length - 1 ? 0 : prev + 1))
      } else {
        // Swipe right → prev
        setCurrentSlide((prev) => (prev === 0 ? events.length - 1 : prev - 1))
      }
      touchStartX.current = null
    },
    []
  )

  const goTo = (index: number) => setCurrentSlide(index)
  const prev = () => setCurrentSlide((p) => (p === 0 ? events.length - 1 : p - 1))
  const next = () => setCurrentSlide((p) => (p === events.length - 1 ? 0 : p + 1))

  const current = events[currentSlide]

  // ── Dot indicator strategy:
  //    With 10 slides, showing all 10 dots overflows on 360px screens.
  //    Show a max of 5 dots using a sliding window centred on currentSlide.
  const MAX_DOTS = 5
  const half = Math.floor(MAX_DOTS / 2)
  let dotStart = Math.max(0, currentSlide - half)
  const dotEnd = Math.min(events.length, dotStart + MAX_DOTS)
  if (dotEnd - dotStart < MAX_DOTS) dotStart = Math.max(0, dotEnd - MAX_DOTS)
  const visibleDotIndices = Array.from({ length: dotEnd - dotStart }, (_, i) => dotStart + i)

  return (
    <Card className="border-2 border-sky-700 rounded-2xl overflow-hidden shadow-md">

      {/* Header — responsive title size */}
      <CardHeader className="px-4 pt-4 pb-2 sm:px-5 sm:pt-5">
        <CardTitle className="text-base sm:text-lg font-bold text-gray-900">
          {t("recentEvents")}
        </CardTitle>
      </CardHeader>

      {/* Remove shadcn's default CardContent padding so image goes edge-to-edge */}
      <CardContent className="p-0">

        {/* ── Image + overlay ──────────────────────────────────────────────── */}
        <div
          className="relative select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* 
            aspect-[4/3] on mobile (taller frame, shows more of portrait photos).
            aspect-video (16/9) on sm+ for a cinematic feel on larger screens.
          */}
          <div className="relative aspect-[4/3] sm:aspect-video w-full">
            <Image
              src={current.image || "/placeholder.svg"}
              alt={t(current.titleKey)}
              fill
              className="object-cover"
              priority={currentSlide === 0}
              sizes="(max-width: 768px) 100vw, 66vw"
            />

            {/* Dark gradient — stronger at bottom for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Event title + date — sits above gradient */}
            <div className="absolute bottom-0 left-0 right-0 px-3 py-3 sm:px-4 sm:py-4">
              {/*
                text-sm (14px) on mobile — clear without dominating the image.
                Scales to text-base (16px) on sm+.
              */}
              <h3 className="text-sm sm:text-base font-semibold text-white leading-snug line-clamp-2">
                {t(current.titleKey)}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 mt-0.5">
                {formatDate(current.date)}
              </p>
            </div>

            {/* Slide counter badge — top right, always visible */}
            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs font-medium px-2 py-0.5 rounded-full">
              {currentSlide + 1} / {events.length}
            </div>
          </div>

          {/* ── Prev / Next buttons ──────────────────────────────────────────
              h-10 w-10 (40px) — minimum comfortable tap target.
              Semi-transparent so they don't cover key image content.
          ── */}
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 border border-gray-200 flex items-center justify-center shadow-sm active:bg-white transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>

          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 border border-gray-200 flex items-center justify-center shadow-sm active:bg-white transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* ── Dot indicators ───────────────────────────────────────────────────
            Sliding window of MAX_DOTS dots so they never overflow.
            Each dot is h-2.5 w-2.5 (10px) — still small but tappable when spaced.
        ── */}
        <div className="flex items-center justify-center gap-2 py-3">
          {/* Left ellipsis hint when window doesn't start at 0 */}
          {dotStart > 0 && (
            <span className="text-gray-300 text-xs leading-none">…</span>
          )}

          {visibleDotIndices.map((index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`rounded-full transition-all duration-200 ${
                currentSlide === index
                  ? "h-2.5 w-6 bg-sky-600"      // active: pill shape
                  : "h-2.5 w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}

          {/* Right ellipsis hint when window doesn't reach the end */}
          {dotEnd < events.length && (
            <span className="text-gray-300 text-xs leading-none">…</span>
          )}
        </div>

      </CardContent>
    </Card>
  )
}

export default EventCarousel