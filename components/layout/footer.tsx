"use client";

import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, ArrowUpRight, Leaf } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";

// ─── Data ─────────────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { href: "/about",     key: "about" },
  { href: "/schemes",   key: "schemes" },
  { href: "/news",      key: "news" },
  { href: "/grievance", key: "grievance" },
  { href: "/documents", key: "documents" },
] as const;

const IMPORTANT_LINKS = [
  { href: "https://rural.nic.in",      key: "ministryRuralDevelopment" },
  { href: "https://panchayat.gov.in",  key: "ministryPanchayatiRaj" },
  { href: "https://india.gov.in",      key: "nationalPortal" },
] as const;

const CONTACT_ITEMS = [
  { icon: MapPin, value: "gramPanchayatAddress", isTranslation: true },
  { icon: Phone,  value: "+91 9168383674",        isTranslation: false },
  { icon: Mail,   value: "gidhadigramconnect@gmail.com", isTranslation: false },
] as const;

const SOCIAL_LINKS = [
  { icon: Facebook,  href: "#", label: "Facebook" },
  { icon: Twitter,   href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

const Footer = () => {
  const { t } = useLanguage();

  return (
    <>
      {/* Google Fonts — Playfair Display for headings, DM Sans for body */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');
        .footer-heading { font-family: 'Playfair Display', Georgia, serif; }
        .footer-body    { font-family: 'DM Sans', sans-serif; }
        .footer-link-hover {
          background-size: 0% 1px;
          background-image: linear-gradient(90deg, #6ee7b7, #2dd4bf);
          background-repeat: no-repeat;
          background-position: left bottom;
          transition: background-size 0.3s ease, color 0.2s ease;
        }
        .footer-link-hover:hover { background-size: 100% 1px; color: #a7f3d0; }
        .social-btn {
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .social-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #059669, #0d9488);
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .social-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(16,185,129,0.35); }
        .social-btn:hover::before { opacity: 1; }
        .social-btn svg { position: relative; z-index: 1; }
        .pattern-dots {
          background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>

      <footer className="footer-body relative bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900 overflow-hidden">
        {/* Decorative dot grid */}
        <div className="absolute inset-0 pattern-dots pointer-events-none" />

        {/* Top accent bar */}
        <div className="h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500" />

        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-6">

          {/* ── Grid ──────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-12">

            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-900/40">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <h3 className="footer-heading text-xl text-white leading-tight">
                  Gidhadi
                  <span className="block text-sm font-normal text-emerald-400 tracking-widest uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Gram Connect
                  </span>
                </h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-xs">
                {t("footerDescription")}
              </p>
              {/* Social */}
              <div className="flex gap-2.5">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="social-btn w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="footer-heading text-base text-white mb-5 flex items-center gap-2">
                {t("quickLinks")}
                <span className="flex-1 h-px bg-gradient-to-r from-emerald-700/60 to-transparent ml-1" />
              </h3>
              <ul className="space-y-2.5">
                {QUICK_LINKS.map(({ href, key }) => (
                  <li key={key}>
                    <Link
                      href={href}
                      className="footer-link-hover text-sm text-gray-400 hover:text-emerald-300 flex items-center gap-1.5 group transition-colors"
                    >
                      <span className="w-1 h-1 rounded-full bg-emerald-600 group-hover:bg-emerald-400 transition-colors flex-shrink-0" />
                      {t(key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Important Links */}
            <div>
              <h3 className="footer-heading text-base text-white mb-5 flex items-center gap-2">
                {t("importantLinks")}
                <span className="flex-1 h-px bg-gradient-to-r from-emerald-700/60 to-transparent ml-1" />
              </h3>
              <ul className="space-y-2.5">
                {IMPORTANT_LINKS.map(({ href, key }) => (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-400 hover:text-emerald-300 flex items-center gap-1.5 group transition-colors"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5 text-emerald-700 group-hover:text-emerald-400 transition-colors flex-shrink-0 -ml-0.5" />
                      {t(key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="footer-heading text-base text-white mb-5 flex items-center gap-2">
                {t("contactUs")}
                <span className="flex-1 h-px bg-gradient-to-r from-emerald-700/60 to-transparent ml-1" />
              </h3>
              <ul className="space-y-3">
                {CONTACT_ITEMS.map(({ icon: Icon, value, isTranslation }) => (
                  <li key={value} className="flex items-start gap-3 group">
                    <div className="w-7 h-7 rounded-lg bg-emerald-900/60 border border-emerald-800/60 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-emerald-600 transition-colors">
                      <Icon size={13} className="text-emerald-400" />
                    </div>
                    <span className="text-sm text-gray-400 leading-snug group-hover:text-gray-300 transition-colors">
                      {isTranslation ? t(value) : value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Divider ───────────────────────────────────────────────── */}
          <div className="h-px bg-gradient-to-r from-transparent via-emerald-800/60 to-transparent mb-6" />

          {/* ── Bottom bar ────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()}{" "}
              <span className="text-emerald-500 font-medium">{t("gramPanchayat")} {t("gidhadi")}</span>.{" "}
              {t("allRightsReserved")}
            </p>
            <p className="text-xs text-gray-600 flex items-center gap-1">
              {t("builtWithLove")}
              <span className="text-emerald-500 mx-0.5">♥</span>
              {t("forGidhadiVillage")}
            </p>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;
