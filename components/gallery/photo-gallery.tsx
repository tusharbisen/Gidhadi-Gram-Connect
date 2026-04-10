"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { GalleryItem, Category, Language } from "./types";
import { galleryItems, cldUrl } from "./data";
import { GalleryFilter } from "./gallery-filter";
import { GalleryGrid } from "./gallery-grid";

export default function PhotoGallery() {
  const { t, language } = useLanguage();
  const lang = language as Language;

  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories: Category[] = [
    { key: "all", label: t("allPhotos") || "All" },
    { key: "events", label: t("eventPhotos") || "Events" },
    { key: "festival", label: t("festivalPhotos") || "Festival" },
    { key: "development", label: t("developmentWork") || "Development" },
  ];

  const filteredItems =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((i) => i.category === filter);

  const selectedImage =
    lightboxIndex !== null ? (filteredItems[lightboxIndex] ?? null) : null;

  const openLightbox = useCallback((_item: GalleryItem, index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const navigate = useCallback(
    (dir: "prev" | "next") => {
      setLightboxIndex((prev) => {
        if (prev === null) return null;
        const len = filteredItems.length;
        return dir === "prev" ? (prev - 1 + len) % len : (prev + 1) % len;
      });
    },
    [filteredItems.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, closeLightbox, navigate]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  const handleFilterChange = (value: string) => {
    setFilter(value);
    setLightboxIndex(null);
  };

  return (
    <div className="w-full">
      <GalleryFilter
        categories={categories}
        filter={filter}
        onFilterChange={handleFilterChange}
        title={t("photoGalleryTitle") || "Photo Gallery"}
        totalItems={filteredItems.length}
        placeholder={t("filterByCategory") || "Filter by Category"}
      />

      <GalleryGrid
        items={filteredItems}
        lang={lang}
        onOpen={openLightbox}
        emptyTitle={t("noPhotosFound") || "No Photos Found"}
        emptyHint={t("noPhotosHint") || "Try selecting a different category"}
      />

      {/* Lightbox */}
      {selectedImage && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo: ${selectedImage.title[lang]}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 backdrop-blur-sm sm:p-6"
          onClick={(e) => e.target === e.currentTarget && closeLightbox()}
        >
          <div className="relative flex w-full max-w-4xl flex-col">
            <button
              onClick={closeLightbox}
              className="absolute -top-9 right-0 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close lightbox"
            >
              <X className="h-4 w-4" />
            </button>

            <button
              onClick={() => navigate("prev")}
              className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-3 sm:h-11 sm:w-11"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <button
              onClick={() => navigate("next")}
              className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-3 sm:h-11 sm:w-11"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
              <Image
                src={cldUrl(selectedImage.cloudinaryId, 1200)}
                alt={selectedImage.title[lang] || "Gallery image"}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-contain"
                priority
              />
            </div>

            <div className="mt-2.5 flex items-start justify-between gap-3 rounded-xl bg-white/10 px-3 py-2.5 text-white backdrop-blur-sm sm:px-4 sm:py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold leading-snug sm:text-base">
                  {selectedImage.title[lang]}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/60 sm:gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(selectedImage.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1 capitalize">
                    <Tag className="h-3 w-3" />
                    {selectedImage.category}
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs tabular-nums text-white/40 shrink-0 sm:text-sm">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
