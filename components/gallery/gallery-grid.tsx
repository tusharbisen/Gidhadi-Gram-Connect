"use client";

import { Images } from "lucide-react";
import { GalleryItem, Language } from "./types";
import { GalleryCard } from "./gallery-card";

interface GalleryGridProps {
  items: GalleryItem[];
  lang: Language;
  onOpen: (item: GalleryItem, index: number) => void;
  emptyTitle: string;
  emptyHint: string;
}

export function GalleryGrid({
  items,
  lang,
  onOpen,
  emptyTitle,
  emptyHint,
}: GalleryGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Images className="mb-3 h-12 w-12 text-gray-200" />
        <h3 className="text-base sm:text-lg font-semibold text-gray-600">
          {emptyTitle}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-gray-400">{emptyHint}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item, index) => (
        <GalleryCard
          key={item.id}
          item={item}
          lang={lang}
          index={index}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}
