"use client";

import { useState, useCallback, useEffect } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, ChevronLeft, ChevronRight, Calendar, Tag, Images } from "lucide-react";
import Image from "next/image";

// ─────────────────────────────────────────────
// HOW TO ADD IMAGES FROM CLOUDINARY:
//
// 1. Go to your Cloudinary dashboard → Media Library
// 2. Upload your images
// 3. Click on any image → copy its "Public ID"
//    e.g. "gidhadi/independence-day-2023"
// 4. Replace the `cloudinaryId` values below with your real Public IDs
//
// The helper `cldUrl()` auto-builds optimised URLs.
// ─────────────────────────────────────────────

const CLOUD_NAME = "YOUR_CLOUD_NAME"; // 👈 Replace with your Cloudinary cloud name

const cldUrl = (publicId: string, width = 800, quality = "auto") =>
  `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_${quality},w_${width}/${publicId}`;

const cldThumb = (publicId: string, size = 400) =>
  `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_${size},h_${size},c_fill,g_auto/${publicId}`;

// ─── Types ────────────────────────────────────────────────────────────────────

type Language = "en" | "hi" | "mr";

interface GalleryItem {
  id: number;
  title: Record<Language, string>;
  category: string;
  date: string;
  cloudinaryId: string;
}

interface Category {
  key: string;
  label: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: {
      en: "Independence Day Celebration 2023",
      hi: "स्वतंत्रता दिवस समारोह 2023",
      mr: "स्वातंत्र्य दिन समारंभ 2023",
    },
    category: "events",
    date: "2023-08-15",
    cloudinaryId: "gidhadi/sample1",
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
    cloudinaryId: "gidhadi/sample2",
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
    cloudinaryId: "gidhadi/sample3",
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
    cloudinaryId: "gidhadi/sample4",
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
    cloudinaryId: "gidhadi/sample5",
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
    cloudinaryId: "gidhadi/sample6",
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
    cloudinaryId: "gidhadi/sample7",
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
    cloudinaryId: "gidhadi/sample8",
  },
];

// ─── Category config ──────────────────────────────────────────────────────────

const CATEGORY_STYLES: Record<string, { color: string; bg: string }> = {
  events:      { color: "text-blue-700",    bg: "bg-blue-100" },
  development: { color: "text-green-700",   bg: "bg-green-100" },
  environment: { color: "text-emerald-700", bg: "bg-emerald-100" },
  meetings:    { color: "text-purple-700",  bg: "bg-purple-100" },
  social:      { color: "text-pink-700",    bg: "bg-pink-100" },
  default:     { color: "text-gray-700",    bg: "bg-gray-100" },
};

const getCategoryStyle = (category: string) =>
  CATEGORY_STYLES[category] ?? CATEGORY_STYLES.default;

// ─── Sub-components ───────────────────────────────────────────────────────────

interface GalleryCardProps {
  item: GalleryItem;
  lang: Language;
  index: number;
  onOpen: (item: GalleryItem, index: number) => void;
}

function GalleryCard({ item, lang, index, onOpen }: GalleryCardProps) {
  const { color, bg } = getCategoryStyle(item.category);
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(item, index)}
      onKeyDown={(e) => e.key === "Enter" && onOpen(item, index)}
      aria-label={`Open photo: ${item.title[lang]}`}
      className="group cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
    >
      {/* Thumbnail */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        <Image
          src={cldThumb(item.cloudinaryId)}
          alt={item.title[lang]}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
        <div className="absolute right-2 top-2">
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${bg} ${color}`}
          >
            {item.category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="mb-1 line-clamp-2 text-sm font-semibold leading-snug text-gray-800">
          {item.title[lang]}
        </p>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Calendar className="h-3 w-3 flex-shrink-0" />
          {new Date(item.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

const PhotoGallery = () => {
  const { t, language } = useLanguage();
  const lang = language as Language;

  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories: Category[] = [
    { key: "all",         label: t("allPhotos") },
    { key: "events",      label: t("eventPhotos") },
    { key: "development", label: t("developmentWork") },
    { key: "environment", label: t("environmentCategory") },
    { key: "meetings",    label: t("meetingsCategory") },
    { key: "social",      label: t("socialProgramsCategory") },
  ];

  const filteredItems =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((i) => i.category === filter);

  const selectedImage =
    lightboxIndex !== null ? filteredItems[lightboxIndex] ?? null : null;

  const openLightbox = useCallback((item: GalleryItem, index: number) => {
    // find index in filteredItems (handle filter change edge case)
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

  // Keyboard navigation
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

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  // Reset lightbox when filter changes
  const handleFilterChange = (value: string) => {
    setFilter(value);
    setLightboxIndex(null);
  };

  return (
    <div className="w-full">

      {/* ── Header + Filter ──────────────────────────────────────────────── */}
      <div className="mb-5 sm:mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 tracking-tight">
            {t("photoGalleryTitle")}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            {filteredItems.length} photo{filteredItems.length !== 1 ? "s" : ""}
          </p>
        </div>

        <Select value={filter} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-full sm:w-52 border-gray-200 focus:border-emerald-400 focus:ring-emerald-400 text-sm">
            <SelectValue placeholder={t("filterByCategory")} />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c.key} value={c.key} className="text-sm">
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredItems.map((item, index) => (
          <GalleryCard
            key={item.id}
            item={item}
            lang={lang}
            index={index}
            onOpen={openLightbox}
          />
        ))}
      </div>

      {/* ── Empty State ───────────────────────────────────────────────────── */}
      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Images className="mb-3 h-12 w-12 text-gray-200" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-600">
            {t("noPhotosFound")}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-gray-400">{t("noPhotosHint")}</p>
        </div>
      )}

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      {selectedImage && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo: ${selectedImage.title[lang]}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && closeLightbox()}
        >
          <div className="relative flex w-full max-w-4xl flex-col">

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute -top-9 right-0 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close lightbox"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Prev */}
            <button
              onClick={() => navigate("prev")}
              className="absolute left-2 sm:left-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Next */}
            <button
              onClick={() => navigate("next")}
              className="absolute right-2 sm:right-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Full image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
              <Image
                src={cldUrl(selectedImage.cloudinaryId, 1200)}
                alt={selectedImage.title[lang]}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-contain"
                priority
              />
            </div>

            {/* Info bar */}
            <div className="mt-2.5 flex items-start justify-between rounded-xl bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-white backdrop-blur-sm gap-3">
              <div className="min-w-0">
                <p className="text-sm sm:text-base font-semibold leading-snug truncate">
                  {selectedImage.title[lang]}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-white/60">
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
              <span className="shrink-0 text-xs sm:text-sm text-white/40 font-mono tabular-nums">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;