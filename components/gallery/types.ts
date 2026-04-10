export type Language = "en" | "hi" | "mr";

export interface GalleryItem {
  id: number;
  title: Record<Language, string>;
  category: string;
  date: string;
  cloudinaryId: string;
}

export interface Category {
  key: string;
  label: string;
}
