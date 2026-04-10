"use client";

import Image from "next/image";
import { Calendar } from "lucide-react";
import { GalleryItem, Language } from "./types";
import { cldThumb } from "./data";

const CATEGORY_STYLES: Record<string, { color: string; bg: string }> = {
  events: { color: "text-blue-700", bg: "bg-blue-100" },
  development: { color: "text-green-700", bg: "bg-green-100" },
  environment: { color: "text-primary", bg: "bg-primary/10" },
  meetings: { color: "text-purple-700", bg: "bg-purple-100" },
  festival: { color: "text-orange-700", bg: "bg-orange-100" },
  social: { color: "text-pink-700", bg: "bg-pink-100" },
  default: { color: "text-gray-700", bg: "bg-gray-100" },
};

const getCategoryStyle = (category: string) =>
  CATEGORY_STYLES[category.toLowerCase()] ?? CATEGORY_STYLES.default;

interface GalleryCardProps {
  item: GalleryItem;
  lang: Language;
  index: number;
  onOpen: (item: GalleryItem, index: number) => void;
}

export function GalleryCard({ item, lang, index, onOpen }: GalleryCardProps) {
  const { color, bg } = getCategoryStyle(item.category);
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(item, index)}
      onKeyDown={(e) => e.key === "Enter" && onOpen(item, index)}
      aria-label={`Open photo: ${item.title[lang]}`}
      className="group cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
