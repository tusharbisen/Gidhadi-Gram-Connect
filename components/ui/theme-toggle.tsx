"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useTheme } from "@/components/providers/theme-provider";

export function ThemeToggle() {
  const { t } = useLanguage();
  const { preference, resolvedTheme, setTheme, toggleTheme, isSystem } =
    useTheme();

  const switchLabel =
    resolvedTheme === "dark"
      ? t("switchToLightMode")
      : t("switchToDarkMode");

  return (
    <div className="theme-toggle-shell">
      <button
        type="button"
        className="theme-toggle-button"
        onClick={toggleTheme}
        aria-label={switchLabel}
        title={switchLabel}
      >
        {resolvedTheme === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
        <span className="hidden sm:inline">
          {resolvedTheme === "dark" ? t("darkMode") : t("lightMode")}
        </span>
      </button>

      <div className="theme-toggle-group" role="group" aria-label={t("theme")}>
        <button
          type="button"
          className={`theme-toggle-chip ${preference === "light" ? "active" : ""}`}
          onClick={() => setTheme("light")}
          aria-pressed={preference === "light"}
        >
          <Sun className="h-3.5 w-3.5" />
          <span>{t("lightMode")}</span>
        </button>
        <button
          type="button"
          className={`theme-toggle-chip ${preference === "dark" ? "active" : ""}`}
          onClick={() => setTheme("dark")}
          aria-pressed={preference === "dark"}
        >
          <Moon className="h-3.5 w-3.5" />
          <span>{t("darkMode")}</span>
        </button>
        <button
          type="button"
          className={`theme-toggle-chip ${preference === "system" ? "active" : ""}`}
          onClick={() => setTheme("system")}
          aria-pressed={preference === "system"}
        >
          <Laptop className="h-3.5 w-3.5" />
          <span>{t("systemTheme")}</span>
        </button>
      </div>

      <p className="theme-toggle-status" aria-live="polite">
        {isSystem
          ? `${t("followingSystem")} (${resolvedTheme === "dark" ? t("darkMode") : t("lightMode")})`
          : `${t("themeSetTo")} ${resolvedTheme === "dark" ? t("darkMode") : t("lightMode")}`}
      </p>
    </div>
  );
}
