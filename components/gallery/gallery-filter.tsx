"use client";

import { Category } from "./types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GalleryFilterProps {
  categories: Category[];
  filter: string;
  onFilterChange: (value: string) => void;
  title: string;
  totalItems: number;
  placeholder: string;
}

export function GalleryFilter({
  categories,
  filter,
  onFilterChange,
  title,
  totalItems,
  placeholder,
}: GalleryFilterProps) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-xl font-extrabold tracking-tight text-gray-800 sm:text-2xl">
          {title}
        </h2>
        <p className="mt-0.5 text-xs text-gray-400 sm:text-sm">
          {totalItems} photo{totalItems !== 1 ? "s" : ""}
        </p>
      </div>

      <Select value={filter} onValueChange={onFilterChange}>
        <SelectTrigger className="w-full border-gray-200 text-sm focus:border-primary focus:ring-primary sm:w-52">
          <SelectValue placeholder={placeholder} />
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
  );
}
