"use client";

import { useLanguage } from "@/components/providers/language-provider";

type PageTitleProps = {
  titleKey: string;
  fallback: string;
};

export function PageTitle({ titleKey, fallback }: PageTitleProps) {
  const { t } = useLanguage();

  return (
    <h1 className="mb-6 text-2xl font-bold tracking-tight text-primary sm:mb-8 sm:text-3xl md:text-4xl">
      {t(titleKey) || fallback}
    </h1>
  );
}

