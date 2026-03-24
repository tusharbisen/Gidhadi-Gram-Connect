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
  { key: "home",      href: "/" },
  { key: "about",     href: "/about" },
  { key: "schemes",   href: "/schemes" },
  { key: "news",      href: "/news" },
  { key: "grievance", href: "/grievance" },
  { key: "gallery",   href: "/gallery" },
  { key: "documents", href: "/documents" },
];

const LANGUAGES: Language[] = [
  { code: "en", name: "English", short: "EN" },
  { code: "hi", name: "हिंदी",   short: "हि" },
  { code: "mr", name: "मराठी",   short: "मर" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface NavLinkProps {
  href: string;
  isActive: boolean;
  label: string;
}

const NavLink = ({ href, isActive, label }: NavLinkProps) => (
  <li>
    <Link
      href={href}
      className={`nav-link-line px-3 py-2 text-sm font-medium rounded-lg transition-colors inline-block ${
        isActive
          ? "text-emerald-700 active"
          : "text-gray-600 hover:text-emerald-700 hover:bg-emerald-50/60"
      }`}
    >
      {label}
    </Link>
  </li>
);

// ─────────────────────────────────────────────────────────────────────────────

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

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative hidden sm:block">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 text-xs font-semibold text-gray-700 transition-all"
        aria-expanded={isOpen}
        aria-label={selectLabel}
      >
        <span className="text-emerald-600">{currentLang.short}</span>
        <span className="text-gray-400 hidden md:inline">·</span>
        <span className="hidden md:inline">{currentLang.name}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-36 bg-white rounded-xl border border-gray-100 shadow-xl shadow-gray-200/80 py-1 z-50 overflow-hidden">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { onSelect(lang.code); setIsOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
                language === lang.code
                  ? "bg-emerald-50 text-emerald-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600"
              }`}
            >
              <span className="w-6 text-center text-xs font-bold text-emerald-500">
                {lang.short}
              </span>
              {lang.name}
              {language === lang.code && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

interface MobileMenuProps {
  isOpen: boolean;
  pathname: string;
  language: Language["code"];
  onSelectLanguage: (code: Language["code"]) => void;
  t: (key: string) => string;
}

const MobileMenu = ({
  isOpen,
  pathname,
  language,
  onSelectLanguage,
  t,
}: MobileMenuProps) => (
  <div
    className={`lg:hidden overflow-y-auto transition-all duration-300 ease-in-out ${
      isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
    }`}
  >
    <div className="border-t border-gray-100 bg-white/95 backdrop-blur-lg px-4 pb-5 pt-3">
      {/* Language selector */}
      <div className="mb-4 pb-4 border-b border-gray-100">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
          {t("languageLabel")}
        </p>
        <div className="flex gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onSelectLanguage(lang.code)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                language === lang.code
                  ? "lang-btn-active border-transparent"
                  : "border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-700"
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
                  className={`mobile-nav-item flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-emerald-700"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      isActive ? "bg-emerald-500" : "bg-gray-300"
                    }`}
                  />
                  {t(key)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Admin link */}
      <Link
        href="/admin"
        className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
      >
        <ShieldCheck className="h-4 w-4" />
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

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsMenuOpen(false); }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => setIsMenuOpen((v) => !v), []);

  const currentLang = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  return (
    <header
      className={`header-nav sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "header-glass shadow-md shadow-emerald-900/10"
          : "bg-[color:var(--header-nav-bg)]"
      }`}
    >
      {/* Indian tricolour top bar */}
      <div className="header-top-bar h-1 w-full" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-[70px] items-center justify-between gap-3">

          {/* ── Brand ───────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-emerald-200 group-hover:ring-emerald-400 transition-all duration-200 shadow-sm">
              <Image
                src="/logo.png"
                alt="Gidhadi Gram Connect Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="leading-tight">
              <h1 className="header-brand text-base sm:text-lg font-bold text-emerald-700 leading-tight">
                Gidhadi Gram Connect
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-400 hidden sm:block font-medium tracking-wide">
                {t("districtState")}
              </p>
            </div>
          </Link>

          {/* ── Desktop Nav ─────────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center max-w-[52vw]" aria-label="Main navigation">
            <ul className="flex items-center gap-0.5 flex-wrap justify-end">
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
            <LanguageDropdown
              language={language}
              currentLang={currentLang}
              onSelect={setLanguage}
              selectLabel={t("selectLanguage")}
            />

            {/* Admin button */}
            <Link href="/admin" className="hidden md:block">
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold h-9 px-3.5 rounded-lg gap-1.5 shadow-sm"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                {t("adminLogin")}
              </Button>
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-all"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ─────────────────────────────────────────────── */}
      <MobileMenu
        isOpen={isMenuOpen}
        pathname={pathname}
        language={language}
        onSelectLanguage={setLanguage}
        t={t}
      />
    </header>
  );
};

export default Header;