"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import translationsData from "@/components/providers/translations.json"; // Keep translations in JSON

type Language = "en" | "hi" | "mr";

type Translations = {
  [key: string]: {
    en?: string;
    hi?: string;
    mr?: string;
  };
};

const translations: Translations = translationsData;

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    const translationEntry = translations[key];

    if (!translationEntry) {
      // If translation key not found, show key name (optional console warning in dev)
      if (process.env.NODE_ENV === "development") {
        console.warn(`⚠️ Missing translation key: "${key}"`);
      }
      return key;
    }

    // Return translation for current language, fallback to English if missing
    return translationEntry[language] || translationEntry["en"] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
