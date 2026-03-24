"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ShieldCheck, ChevronDown } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  key: string;
  href: string;
}

interface Language {
  code: "en" | "hi" | "mr";
  name: string;
  short: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "schemes", href: "/schemes" },
  { key: "news", href: "/news" },
  { key: "grievance", href: "/grievance" },
  { key: "gallery", href: "/gallery" },
  { key: "documents", href: "/documents" },
];

const LANGUAGES: Language[] = [
  { code: "en", name: "English", short: "EN" },
  { code: "hi", name: "हिंदी", short: "हि" },
  { code: "mr", name: "मराठी", short: "मर" },
];

// ─── NavLink ─────────────────────────────────────────────────────────────────

interface NavLinkProps {
  href: string;
  isActive: boolean;
  label: string;
}

const NavLink = ({ href, isActive, label }: NavLinkProps) => (
  <li>
    <Link
      href={href}
      className={`
        relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 inline-flex items-center
        ${
          isActive
            ? "text-emerald-700 bg-emerald-50"
            : "text-gray-600 hover:text-emerald-700 hover:bg-emerald-50/70"
        }
      `}
    >
      {/* Active indicator dot */}
      {isActive && (
        <span
          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500"
          aria-hidden="true"
        />
      )}
      {label}
    </Link>
  </li>
);

// ─── LanguageDropdown ─────────────────────────────────────────────────────────

interface LanguageDropdownProps {
  language: Language["code"];
  currentLang: Language;
  onSelect: (code: Language["code"]) => void;
  selectLabel: string;
}

const LanguageDropdown = ({
  language,
  currentLang,
  onSelect,
  selectLabel,
}: LanguageDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div ref={ref} className="relative hidden sm:block">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 text-xs font-semibold text-gray-700 transition-all duration-200"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={selectLabel}
      >
        <span className="text-emerald-600 font-bold">{currentLang.short}</span>
        <span className="text-gray-300 hidden md:inline">·</span>
        <span className="hidden md:inline text-gray-600">
          {currentLang.name}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          role="listbox"
          aria-label={selectLabel}
          className="absolute right-0 top-full mt-2 w-36 bg-white rounded-xl border border-gray-100 shadow-xl shadow-gray-200/80 py-1 z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              role="option"
              aria-selected={language === lang.code}
              onClick={() => {
                onSelect(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
                language === lang.code
                  ? "bg-emerald-50 text-emerald-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600"
              }`}
            >
              <span className="w-6 text-center text-xs font-bold text-emerald-500 flex-shrink-0">
                {lang.short}
              </span>
              {lang.name}
              {language === lang.code && (
                <span
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── MobileMenu ───────────────────────────────────────────────────────────────

interface MobileMenuProps {
  isOpen: boolean;
  pathname: string;
  language: Language["code"];
  onSelectLanguage: (code: Language["code"]) => void;
  onClose: () => void;
  t: (key: string) => string;
}

const MobileMenu = ({
  isOpen,
  pathname,
  language,
  onSelectLanguage,
  onClose,
  t,
}: MobileMenuProps) => (
  <div
    role="dialog"
    aria-modal="true"
    aria-label="Mobile navigation"
    className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
      isOpen
        ? "max-h-[calc(100vh-4rem)] opacity-100"
        : "max-h-0 opacity-0 pointer-events-none"
    }`}
  >
    <div className="border-t border-gray-100 bg-white shadow-lg px-4 pb-6 pt-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
      {/* Language selector */}
      <div className="mb-4 pb-4 border-b border-gray-100">
        <p className="text- font-semibold text-gray-400 uppercase tracking-widest mb-2.5">
          {t("languageLabel")}
        </p>
        <div className="flex gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onSelectLanguage(lang.code)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                language === lang.code
                  ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                  : "border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50"
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      {/* Nav links */}
      <nav aria-label="Mobile navigation">
        <ul className="space-y-1">
          {NAV_ITEMS.map(({ key, href }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-emerald-700"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
                      isActive ? "bg-emerald-500" : "bg-gray-300"
                    }`}
                    aria-hidden="true"
                  />
                  {t(key)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Admin CTA */}
      <Link
        href="/admin"
        onClick={onClose}
        className="mt-5 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-semibold transition-colors shadow-sm"
      >
        <ShieldCheck className="h-4 w-4" aria-hidden="true" />
        {t("adminLogin")}
      </Link>
    </div>
  </div>
);

// ─── Header ───────────────────────────────────────────────────────────────────

const Header = () => {
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => setIsMenuOpen((v) => !v), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const currentLang =
    LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md shadow-emerald-900/8 border-b border-gray-100"
          : "bg-white border-b border-gray-100/60"
      }`}
    >
      {/* Indian tricolour top bar */}
      <div
        className="h-0.5 w-full bg-gradient-to-r from-orange-500 via-white to-green-600"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-15 md:h-[68px] items-center justify-between gap-3">
          {/* ── Brand ───────────────────────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 group"
            aria-label="Gidhadi Gram Connect — Home"
          >
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden ring-2 ring-emerald-200 group-hover:ring-emerald-400 transition-all duration-200 shadow-sm flex-shrink-0">
              <Image
                src="/logo.png"
                alt=""
                fill
                className="object-contain"
                priority
                sizes="(max-width: 640px) 36px, 44px"
              />
            </div>
            <div className="leading-tight min-w-0">
              <p className="text-sm sm:text-base font-bold text-emerald-700 truncate leading-tight">
                Gidhadi Gram Connect
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400 hidden sm:block font-medium tracking-wide truncate">
                {t("districtState")}
              </p>
            </div>
          </Link>

          {/* ── Desktop Nav ─────────────────────────────────────────── */}
          <nav
            className="hidden lg:block flex-1 min-w-0"
            aria-label="Main navigation"
          >
            <ul className="flex items-center justify-center gap-0.5 flex-wrap">
              {NAV_ITEMS.map(({ key, href }) => (
                <NavLink
                  key={href}
                  href={href}
                  isActive={pathname === href}
                  label={t(key)}
                />
              ))}
            </ul>
          </nav>

          {/* ── Right Controls ──────────────────────────────────────── */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Language dropdown — hidden on mobile (handled in mobile menu) */}
            <LanguageDropdown
              language={language}
              currentLang={currentLang}
              onSelect={setLanguage}
              selectLabel={t("selectLanguage")}
            />

            {/* Admin button — md+ only */}
            <Link href="/admin" className="hidden md:block">
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-semibold h-9 px-3.5 rounded-lg gap-1.5 shadow-sm transition-colors"
              >
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                {t("adminLogin")}
              </Button>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 active:bg-emerald-100 transition-all duration-200"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ─────────────────────────────────────────────── */}
      <div id="mobile-menu">
        <MobileMenu
          isOpen={isMenuOpen}
          pathname={pathname}
          language={language}
          onSelectLanguage={setLanguage}
          onClose={closeMenu}
          t={t}
        />
      </div>
    </header>
  );
};

export default Header;
