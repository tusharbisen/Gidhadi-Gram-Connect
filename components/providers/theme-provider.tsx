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
import {
  THEME_STORAGE_KEY,
  THEME_STORAGE_VERSION,
  type ResolvedTheme,
  type ThemePreference,
} from "@/lib/theme/constants";

interface ThemeContextType {
  preference: ThemePreference;
  resolvedTheme: ResolvedTheme;
  isSystem: boolean;
  setTheme: (value: ThemePreference) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  return preference === "system" ? getSystemTheme() : preference;
}

function applyResolvedTheme(theme: ResolvedTheme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
}

function readStoredThemePreference(): ThemePreference {
  if (typeof window === "undefined") return "system";

  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (!raw) return "system";

    const parsed = JSON.parse(raw);
    const value = parsed?.value;

    return value === "light" || value === "dark" || value === "system"
      ? value
      : "system";
  } catch {
    return "system";
  }
}

function updateThemeColorMeta(theme: ResolvedTheme) {
  const color = theme === "dark" ? "#08111f" : "#f4f8fb";
  let meta = document.querySelector(
    'meta[name="theme-color"][data-theme-dynamic="true"]'
  ) as HTMLMetaElement | null;

  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.dataset.themeDynamic = "true";
    document.head.appendChild(meta);
  }

  meta.content = color;
}

function persistThemePreference(value: ThemePreference) {
  try {
    window.localStorage.setItem(
      THEME_STORAGE_KEY,
      JSON.stringify({
        value,
        version: THEME_STORAGE_VERSION,
        updatedAt: Date.now(),
      })
    );
  } catch {
    // Ignore quota or privacy-mode errors; theme still works for the session.
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

  useEffect(() => {
    const initialPreference = readStoredThemePreference();
    const initialResolved = resolveTheme(initialPreference);

    setPreference(initialPreference);
    setResolvedTheme(initialResolved);
    applyResolvedTheme(initialResolved);
    updateThemeColorMeta(initialResolved);

    document.documentElement.classList.add("theme-ready");
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (preference !== "system") return;

      const next = getSystemTheme();
      setResolvedTheme(next);
      applyResolvedTheme(next);
      updateThemeColorMeta(next);
    };

    if (media.addEventListener) {
      media.addEventListener("change", handleChange);
      return () => media.removeEventListener("change", handleChange);
    }

    media.addListener(handleChange);
    return () => media.removeListener(handleChange);
  }, [preference]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;

      const nextPreference = readStoredThemePreference();
      const nextResolved = resolveTheme(nextPreference);

      setPreference(nextPreference);
      setResolvedTheme(nextResolved);
      applyResolvedTheme(nextResolved);
      updateThemeColorMeta(nextResolved);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const setTheme = useCallback((value: ThemePreference) => {
    const nextResolved = resolveTheme(value);

    setPreference(value);
    setResolvedTheme(nextResolved);
    applyResolvedTheme(nextResolved);
    updateThemeColorMeta(nextResolved);
    persistThemePreference(value);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const contextValue = useMemo<ThemeContextType>(
    () => ({
      preference,
      resolvedTheme,
      isSystem: preference === "system",
      setTheme,
      toggleTheme,
    }),
    [preference, resolvedTheme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
