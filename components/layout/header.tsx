"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ShieldCheck } from "lucide-react";
import { useLanguage, Languages } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";

/* ---------------- NAV ITEMS ---------------- */
const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "schemes", href: "/schemes" },
  { key: "braveSoldiers", href: "/brave-soldiers" },
  { key: "grievance", href: "/grievance" },
  { key: "gallery", href: "/gallery" },
  { key: "education", href: "/documents" },
];

const LANGUAGES = [
  { code: "en", name: "English", short: "EN" },
  { code: "hi", name: "हिंदी", short: "हि" },
  { code: "mr", name: "मराठी", short: "मर" },
];

/* ---------------- NAV LINK ---------------- */
const NavLink = ({ href, isActive, label }: any) => (
  <li className="flex-shrink-0">
    <Link
      href={href}
      className={`px-2 py-1.5 text-xs md:text-sm font-medium rounded-md whitespace-nowrap transition-all duration-200
      ${
        isActive
          ? "text-primary bg-primary/10"
          : "text-gray-600 hover:text-primary hover:bg-primary/5"
      }`}
    >
      {label}
    </Link>
  </li>
);

/* ---------------- HEADER ---------------- */
const Header = () => {
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = useCallback(() => setIsMenuOpen((v) => !v), []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between h-16">

          {/* ---------------- LOGO + NAME ---------------- */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 min-w-0">
            <Image
              src="/logo.png"
              alt="Gidhadi Gram Connect Logo"
              width={120}
              height={50}
              className="object-contain h-9 sm:h-10 w-auto"
              priority
            />
            <span className="text-sm sm:text-base font-bold text-primary truncate">
              Gidhadi Gram Connect
            </span>
          </Link>

          {/* ---------------- DESKTOP NAV ---------------- */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <ul className="flex items-center gap-0.5 flex-nowrap">
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

          {/* ---------------- RIGHT ---------------- */}
          <div className="flex items-center gap-2 flex-shrink-0">

            {/* 🌐 Language Dropdown */}
            <div className="hidden sm:block">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="px-2 py-1 border rounded-md text-xs font-semibold bg-white cursor-pointer focus:outline-none"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.short} ({lang.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Admin */}
            <Link href="/admin" className="hidden md:block">
              <Button size="sm" className="h-8 text-xs px-2">
                <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                {t("adminLogin")}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <button
              className="lg:hidden w-8 h-8 flex items-center justify-center border rounded-md"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- MOBILE MENU ---------------- */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t px-4 py-4 space-y-3">

          {/* Mobile Language Dropdown */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="w-full px-3 py-2 border rounded-md text-sm font-medium bg-white"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>

          {NAV_ITEMS.map(({ key, href }) => (
            <Link
              key={href}
              href={href}
              className="block py-2 text-sm text-gray-700 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              {t(key)}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;