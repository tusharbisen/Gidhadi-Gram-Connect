"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import en from "./locales/en.json";
import hi from "./locales/hi.json";
import mr from "./locales/mr.json";

// ─── Types ────────────────────────────────────────────────────────────────────

type Language = "en" | "hi" | "mr";
export type Languages = "en" | "hi" | "mr";

type LocaleMap = Record<string, string>;

interface TranslationEntry {
  en?: string;
  hi?: string;
  mr?: string;
}

type Translations = Record<string, TranslationEntry>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "ggc_language";
const SUPPORTED_LANGUAGES = new Set<Language>(["en", "hi", "mr"]);

// ─── Build translations map once at module level (not inside the component) ───

const translations: Translations = {};
const locales: Record<Language, LocaleMap> = {
  en: en as LocaleMap,
  hi: hi as LocaleMap,
  mr: mr as LocaleMap,
};

const allKeys = new Set<string>([
  ...Object.keys(locales.en),
  ...Object.keys(locales.hi),
  ...Object.keys(locales.mr),
]);

for (const key of allKeys) {
  translations[key] = {
    en: locales.en[key],
    hi: locales.hi[key],
    mr: locales.mr[key],
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getSavedLanguage(): Language {
  if (typeof window === "undefined") return "en";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.has(saved as Language)) {
      return saved as Language;
    }
  } catch {
    // localStorage may be blocked in some environments
  }
  return "en";
}

// ─── Context ──────────────────────────────────────────────────────────────────

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");

  // Read the saved language after mount so the first client render
  // matches the server-rendered HTML and avoids hydration errors.
  useEffect(() => {
    setLanguageState(getSavedLanguage());
  }, []);

  // Persist language choice to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Silently ignore if localStorage is unavailable
    }
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    if (!SUPPORTED_LANGUAGES.has(lang)) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`⚠️ Unsupported language: "${lang}"`);
      }
      return;
    }
    setLanguageState(lang);
  }, []);

  // Memoize `t` per language so child components don't re-render unless
  // the language actually changes
  const t = useCallback(
    (key: string): string => {
      const entry = translations[key];
      if (!entry) {
        if (process.env.NODE_ENV === "development") {
          console.warn(`⚠️ Missing translation key: "${key}"`);
        }
        return key;
      }
      return entry[language] ?? entry.en ?? key;
    },
    [language]
  );

  const value = useMemo<LanguageContextType>(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
