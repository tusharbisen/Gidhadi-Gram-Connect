"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { Button } from "@/components/ui/button"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { t, language, setLanguage } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { name: t("schemes"), href: "/schemes" },
    { name: t("news"), href: "/news" },
    { name: t("grievance"), href: "/grievance" },
    { name: t("gallery"), href: "/gallery" },
    { name: t("documents"), href: "/documents" },
  ]

  const languages = [
    { code: "en", name: "English", shortName: "EN" },
    { code: "hi", name: "हिंदी", shortName: "हि" },
    { code: "mr", name: "मराठी", shortName: "मर" },
  ]

  return (
    <header
       className={`sticky top-0 z-50 w-full transition-all duration-300 ${
    isScrolled
      ?  "backdrop-blur-lg shadow-md"
      : "bg-transparent"
  }`}
    >
      <div className="tricolor-border"></div>
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="GP Gidhadi Logo"
                width={80}
                height={80}
                className="rounded-full  "
              />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gov-blue leading-tight">Gidhadi Gram Connect</h1>
              <p className="text-xs text-gray-600 hidden sm:block">{t("districtState")}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex">
            <ul className="flex space-x-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md transition-colors hover:text-gov-blue hover:bg-blue-50"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Language Buttons */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={language === lang.code ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setLanguage(lang.code as "en" | "hi" | "mr")}
                  className={`h-8 px-2 md:px-3 text-xs md:text-sm font-medium transition-all ${
                    language === lang.code
                      ? "bg-gov-blue text-white shadow-sm"
                      : "text-gray-600 hover:text-gov-blue hover:bg-white"
                  }`}
                >
                  <span className="hidden sm:inline">{lang.name}</span>
                  <span className="sm:hidden">{lang.shortName}</span>
                </Button>
              ))}
            </div>

            <Link href="/admin">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:inline-flex border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white"
              >
                {t("adminLogin")}
              </Button>
            </Link>
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {/* Mobile Language Selector */}
            <div className="mb-3 pb-3 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Language / भाषा / भाषा:</p>
              <div className="flex space-x-2">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={language === lang.code ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage(lang.code as "en" | "hi" | "mr")}
                    className={`flex-1 text-xs ${
                      language === lang.code
                        ? "bg-gov-blue text-white"
                        : "border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white"
                    }`}
                  >
                    {lang.name}
                  </Button>
                ))}
              </div>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-gov-blue"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/admin"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-gov-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("adminLogin")}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
